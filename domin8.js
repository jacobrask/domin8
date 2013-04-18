// Domin8 0.0.3
// ============
// (c) 2013 Jacob Rask
// domin8 may be freely distributed under the MIT license


// Setup
// -----

(function (doc, undefined) {

'use strict';

var D8 = {};

// Export to calling context, CommonJS export or window.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = D8;
} else {
  (this || window).D8 = D8;
}

D8.VERSION = '0.0.3';



// Internal helpers
// ================

// Often used prototype methods
// ----------------------------

var slice = Array.prototype.slice;
var toString = Object.prototype.toString;


// Type checking functions
// -----------------------

var isColl = function (obj) {
  return (/(Array|HTMLCollection|NodeList)/).test(toString.call(obj));
};
var isElement = function (obj) {
  return obj && obj.nodeType === 1;
};
var isFunction = function (obj) {
  return typeof obj == 'function';
};
var isNode = function (obj) {
  return obj && !isNaN(obj.nodeType);
};
var isObject = function (obj) {
  return toString.call(obj) === '[object Object]';
};
var isRegExp = function (obj) {
  return toString.call(obj) == '[object RegExp]';
};
var isString = function (obj) {
  return typeof obj == 'string';
};


// Higher order functions
// ----------------------

// Returns new functions until all required arguments (`fn.length` or `arity`)
// are filled. `___` can be used as a placeholder argument. 
var ___ = D8.___ = {};
function curry (fn, arity /*, origArgs */) {
  var origArgs = slice.call(arguments, 2);
  arity || (arity = fn.length);
  return function curried () {
    var args = slice.call(arguments);
    var newArgs = origArgs.concat([]);
    for (var i = 0; i < origArgs.length; i++) {
      if (newArgs[i] === ___) newArgs[i] = args.shift();
    }
    args = newArgs.concat(args);
    return (args.indexOf(___) > -1) || args.length < arity
        ? curry.apply(this, [ fn, arity ].concat(args))
        : fn.apply(this, args);
  };
}

// Return a new function with fixed arguments, ignoring its own arguments
// Replaces `curry` for functions like `make` where all but 1 arguments are optional
function saturate (fn) {
  return function saturator (/* args */) {
    var args = arguments;
    return function saturated (/* ignored */) {
      return fn.apply(this, args);
    };
  };
}

// Flip the argument order of a function
function flip (fn) {
  return function flipper () {
    var args = slice.call(arguments);
    if (fn.length > 0) args = args.splice(0, fn.length);
    args = args.reverse();
    return fn.apply(this, args);
  };
}

// Rotate the argument order of a function
function rotate (fn, reverse) {
  return function rotator () {
    var args = slice.call(arguments);
    if (reverse) args.unshift(args.pop());
    else args.push(args.shift());
    return fn.apply(this, args);
  };
}


// Miscelleanous helpers
// ---------------------

var equals = curry(function equals (a, b) {
  return a === b;
});

var toDashCase = function (str) {
  return str.replace(/([A-Z])/g, function (letter) {
    return '-' + letter.toLowerCase();
  });
};

// Return a Node from a Node, String, Function, or a list of those.
var nodeify = function (obj) {
  if (isFunction(obj)) obj = obj();
  if (isString(obj)) obj = doc.createTextNode(obj);
  if (isColl(obj)) {
    obj = slice.call(obj).reduce(function (frag, el) {
      frag.appendChild(nodeify(el));
      return frag;
    }, document.createDocumentFragment());
  }
  if (!isNode(obj)) obj = doc.createTextNode(obj + "");
  return obj;
};



// Properties and attributes
// =========================

// Properties that should be set directly and not as attributes.
// Also used as map for case insensitive property names and for aliases.
var propertyFix = "acceptCharset accessKey attributes autocomplete autofocus autoplay buffered cellPadding cellSpacing cells challenge checked childElementCount childNodes children classList className clientHeight clientLeft clientTop clientWidth colSpan cols compact complete content contentDocument contentEditable contentWindow control controls coords crossOrigin currentSrc currentTime data dataset dateTime declare default defaultChecked defaultMuted defaultPlaybackRate defaultSelected defaultValue dirName disabled download draggable duration elements encoding enctype ended error event files firstChild firstElementChild form formAction formEnctype formMethod formNoValidate formTarget frame frameBorder hash headers hidden high host hostname htmlFor httpEquiv incremental indeterminate index initialTime innerHTML innerText isContentEditable isMap keytype kind label labels lastChild lastElementChild length link list localName loop low max media mediaGroup multiple muted naturalHeight naturalWidth networkState nextElementSibling nextSibling noValidate nodeName nodeType nodeValue nonce offsetHeight offsetLeft offsetParent offsetTop offsetWidth open optimum options origin outerHTML outerText ownerDocument parentElement parentNode pathname paused ping playbackRate played port position poster prefix preload previousElementSibling previousSibling profile protocol readOnly readyState required reversed rowIndex rowSpan rows rules sandbox scheme scope scrollHeight scrollLeft scrollTop scrollWidth scrolling seamless search sectionRowIndex seekable seeking selected selectedIndex selectedOptions selectionDirection selectionEnd selectionStart shape sheet size sizes span standby start startTime step style summary tabIndex tagName textContent textTracks track translate type useMap validationMessage validity value valueAsDate valueAsNumber valueType version videoHeight videoWidth volume willValidate wrap"
  .split(' ').reduce(function (props, key) {
    props[key.toLowerCase()] = key;
    return props;
  }, {});

// Aliases for common shorthands/mistakes
var aliasedProps = { 'class': 'className', 'for': 'htmlFor', 'html': 'innerHTML', 'text': 'textContent' };
for (var key in aliasedProps) propertyFix[key] = aliasedProps[key];


// Generic getters and setters
// ---------------------------

D8.get = curry(getAny);
D8.getFrom = curry(flip(getAny), 2);

D8.set = curry(setAny, 2);
D8.setOn = curry(rotate(setAny), 2);

// Use either the attribute or property getter/setter
function attributeOrProperty (name, value, elem) {
  // Always use `prop` for deep properties and non-Element nodes
  if ((/\./).test(name) || elem.nodeType !== 1) {
    return property(name, value, elem);
  }
  var direct = propertyFix[name.toLowerCase()];
  if (direct) return property(direct, value, elem);
  else return attribute(name, value, elem);
}

function getAny (name, elem) {
  return attributeOrProperty(name, undefined, elem);
}

function setAny (name, value, elem) {
  if (isObject(name)) {
    elem = value;
    if (elem == null) {
      return curry(setAny).apply(this, arguments);
   } else {
      for (var key in name) {
        attributeOrProperty(key, name[key], elem);
      }
    }
  } else {
    if (arguments.length < setAny.length) {
      return curry(setAny).apply(this, arguments);
    } else {
      attributeOrProperty(name, value, elem);
    }
  }
  return elem;
}


// Attributes
// ----------

D8.getAttr = curry(attribute)(___, undefined);
D8.getAttrFrom = curry(flip(attribute), 3)(___, undefined);

D8.setAttr = curry(attribute);
D8.setAttrOn = curry(rotate(attribute), 3);

D8.hasAttr = curry(hasAttribute);
D8.hasAttrOn = curry(flip(hasAttribute), 2);

D8.removeAttr = curry(attribute)(___, false);
D8.removeAttrFrom = curry(flip(attribute), 3)(___, false);

function attribute (name, value, elem) {
  name = name.toLowerCase();
  if (typeof value === 'undefined') {
    return elem.getAttribute(name);
  }
  if (value === false || value === null) {
    elem.removeAttribute(name);
  } else {
    elem.setAttribute(name, "" + value);
  }
  return elem;
}

function hasAttribute (name, elem) {
  return elem.hasAttribute(name.toLowerCase());
}


// Properties
// ----------

D8.getProp = curry(property)(___, undefined);
D8.getPropFrom = curry(flip(property), 3)(___, undefined);

D8.setProp = curry(property);
D8.setPropOn = curry(rotate(property), 3);

D8.getHtml = D8.getHtmlFrom = D8.getProp('innerHTML');

D8.setHtml = D8.setProp('innerHTML');
D8.setHtmlOn = D8.setPropOn(___, 'innerHTML');

D8.getText = D8.getTextFrom = D8.getProp('textContent');

D8.setText = D8.setProp('textContent');
D8.setTextOn = D8.setPropOn(___, 'textContent');

D8.getValue = D8.getValueFrom = D8.getProp('value');

D8.setValue = D8.setProp('value');
D8.setValueOn = D8.setPropOn(___, 'value');

function property (name, value, elem) {
  // Nested property access/assignment with .
  name = name.split('.');
  while (name.length > 1) elem = property(name.shift(), undefined, elem);
  name = name[0];
  name = propertyFix[name.toLowerCase()] || name;
  // Get
  if (typeof value === 'undefined') {
    return elem[name];
  }
  // Set
  elem[name] = value;
  return elem;
}


// Class names
// -----------

D8.addClass = curry(className)('add');
D8.addClassTo = curry(rotate(className), 3)(___, 'add');

D8.removeClass = curry(className)('remove');
D8.removeClassFrom = curry(rotate(className), 3)(___, 'remove');

D8.toggleClass = curry(className)('toggle');
D8.toggleClassFrom = curry(rotate(className), 3)(___, 'toggle');

D8.hasClass = curry(hasClass);
D8.hasClassOn = curry(flip(hasClass), 2);

function className (action, name, elem) {
  elem.classList[action](name);
  return elem;
}
function hasClass (cond, elem) {
  if (isString(cond)) return elem.classList.contains(cond);
  if (isRegExp(cond)) {
    var re = cond;
    cond = function (el) { return re.test(el); };
  }
  if (isFunction(cond)) {
    return elem.className.split(' ').some(cond);
  }
  return false;
}


// Data
// ----

D8.getData = curry(dataset)(___, undefined);
D8.getDataFrom = curry(flip(dataset), 3)(___, undefined);

D8.setData = curry(dataset);
D8.setDataOn = curry(rotate(dataset), 3);

function dataset (key, value, elem) {
  key = doc.documentElement.dataset
      ? 'dataset.' + key
      : 'data-' + toDashCase(key);
  var ret = attributeOrProperty(key, value, elem);
  return typeof value === 'undefined' ? ret : elem;
}


// Style
// -----

D8.getStyle = curry(style)(___, undefined);
D8.getStyleFrom = curry(flip(style), 3)(___, undefined);

D8.setStyle = curry(style);
D8.setStyleOn = curry(rotate(style), 3);

D8.hide = D8.setStyle('display', 'none');
D8.show = D8.setStyle('display', 'block');

function style (name, value, elem) {
  var unitlessValues = [ 'bottom', 'height', 'left', 'max-height', 'max-width',
      'min-height', 'min-width', 'right', 'top', 'width' ];
  // Assume px on unitless positiona/dimensional property values
  if (unitlessValues.indexOf(name) !== -1
      && parseFloat(value, 10) == value) {
    value += 'px';
  }
  if (typeof value === 'undefined') {
    return elem.ownerDocument.defaultView.getComputedStyle(elem)
        .getPropertyValue(name);
  }
  property('style.' + name, value, elem);
  return elem;
}



// Manipulation
// ============

D8.after = curry(manipulator('insertBefore', 'parentNode', 'nextSibling'), 2);
D8.insertAfter = curry(flip(manipulator('insertBefore', 'parentNode', 'nextSibling')), 2);

D8.before = curry(manipulator('insertBefore', 'parentNode'), 2);
D8.insertBefore = curry(flip(manipulator('insertBefore', 'parentNode')), 2);

D8.prepend = curry(manipulator('insertBefore', '', 'firstChild'), 2);
D8.prependTo = curry(flip(manipulator('insertBefore', '', 'firstChild')), 2);

D8.append = curry(manipulator('appendChild'), 2);
D8.appendTo = curry(flip(manipulator('appendChild')), 2);

D8.replace = curry(flip(manipulator('replaceChild', 'parentNode')), 2);
D8.replaceWith = curry(manipulator('replaceChild', 'parentNode'), 2);

D8.remove = function (elem) { return elem.parentNode.removeChild(elem); };

D8.clone = function (elem, shallow) { return elem.cloneNode(!shallow); };
D8.cloner = saturate(D8.clone);

D8.empty = D8.setProp('textContent', '');

// Invokes `method` on `elem[parent]` with arguments `content` and `elem[rel]`
function manipulator (method, parent, rel) {
  return function manipulator (content, elem) {
    content = nodeify(content);
    (parent ? elem[parent] : elem)[method](content, (rel ? elem[rel] : elem));
    return elem;
  };
}



// Traversal
// =========

D8.matches = curry(matches);
D8.matchedBy = curry(flip(matches), 2);

D8.find = find;
D8.findIn = curry(flip(find), 2);

D8.findOne = findOne;
D8.findOneIn = curry(flip(findOne), 2);

D8.findByTag = findByTag;
D8.findByTagIn = curry(flip(findByTag), 2);

D8.findByClass = findByClass;
D8.findByClassIn = curry(flip(findByClass), 2);

D8.contains = curry(contains);

D8.childrenOf = childrenOf;

D8.next = D8.getProp('nextElementSibling');
D8.prev = D8.getProp('previousElementSibling');

D8.parentsOf = parentsOf;
D8.parentOf = function (elem, cond) {
  return parentsOf(elem, cond, 1)[0];
};
D8.containedBy = curry(function (cond, child) {
  return !!parentsOf(child, cond, 1);
});

var matchesSelector = (function () {
  var props = [ 'matches', 'webkitMatchesSelector', 'mozMatchesSelector',
                'msMatchesSelector', 'oMatchesSelector' ];
  for (var i = 0; i < props.length; i++) {
    if (HTMLElement.prototype[props[i]]) return props[i];
  }
})();
function matches (cond, elem) {
  if (isFunction(cond)) return cond(elem);
  if (isString(cond)) {
    return elem[matchesSelector] && elem[matchesSelector](cond);
  }
  return equals(cond, elem);
}
function find (cond, elem) {
  elem || (elem = document);
  if (cond == null || cond === '') {
    return slice.call(elem.getElementsByTagName('*'));
  }
  if (isString(cond)) {
    return slice.call(elem.querySelectorAll(cond));
  }
  if (!isFunction(cond)) cond = equals(cond);
  return slice.call(elem.getElementsByTagName('*')).filter(cond);
}
function findOne (cond, elem) {
  elem || (elem = document);
  if (isString(cond)) return elem.querySelector(cond);
  if (!isFunction(cond)) cond = equals(cond);
  var match = null;
  slice.call(elem.getElementsByTagName('*')).some(function (cand) {
    if (cond(cand)) {
      match = cand;
      return true;
    }
  });
  return match;
}
function findByTag (tag, elem) {
  elem || (elem = document);
  return slice.call(elem.getElementsByTagName(tag));
}
function findByClass (name, elem) {
  elem || (elem = document);
  return slice.call(elem.getElementsByClassName(name));
}
function contains (cond, parent) {
  return !!findOne(cond, parent);
}
function childrenOf (elem, cond) {
  var children = slice.call(property('children', undefined, elem));
  if (cond == null) return children;
  return children.filter(curry(matches)(cond));
}
function parentsOf (elem, cond, max) {
  if (isString(cond)) {
    var sel = cond;
    cond = function (elem) {
      return elem[matchesSelector] && elem[matchesSelector](sel);
    };
  } else if (cond != null && !isFunction(cond)) {
    cond = equals(elem);
  }
  var results = [];
  while ((elem = elem.parentNode) && !(max && results.length >= max)) {
    if (matches(cond, elem)) results[results.length] = elem;
  }
  return results;
}

 

// Element creation
// ================

D8.make = makeElement;
D8.maker = saturate(makeElement);

function makeElement (tag, props, children) {
  if (props != null && !isObject(props)) {
    children = props;
    props = {};
  }
  props || (props = {});
  if (isString(tag) && (/(#|\.)/).test(tag)) {
    var parts = tag.split(/(#|\.)/);
    tag = parts[0];
    for (var i = 1, j = 2, name; j < parts.length; i += 2, j += 2) {
      name = parts[j];
      if (parts[i] === '#') props.id = name;
      else props.className = props.className ? props.className+' '+name : name;
    }
  }
  tag || (tag = 'div');
  var elem = isElement(tag) ? tag : doc.createElement(tag);
  for (var prop in props) D8.set(prop, props[prop], elem);
  if (children != null) D8.appendTo(elem, children);
  return elem;
}

})(document);
