// Domin8 0.0.3
// ============
// > (c) 2013 Jacob Rask
// > domin8 may be freely distributed under the MIT license. */


// Setup
// -----

(function (doc, undefined) {

'use strict';

// Allows setting non-`window` root objects.
var root = this || window;

// Export
var D8 = root.D8 = {};

var fns = {};

D8.VERSION = '0.0.3';



// Internal helpers
// ================

// Often used prototype methods
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

// Type checking functions
var isArray = Array.isArray;
var isFunction = function (obj) { return obj && typeof obj == 'function'; };
var isString = function (obj) { return obj != null && typeof obj == 'string'; };
var isElement = function (obj) { return obj && obj.nodeType === 1; };
var isNode = function (obj) { return obj && !isNaN(obj.nodeType); };


// Higher order functions
// ----------------------

// Placeholder object
var ___ = D8.___ = {};

// Returns new functions until all required arguments (`fn.length` or `arity`) are filled.
var partialize = function (fn, arity /*, [args] */) {
  var origArgs = slice.call(arguments, 2);
  arity || (arity = fn.length);
  return function () {
    var args = slice.call(arguments);
    for (var i = 0; i < origArgs.length; i++) {
      if (origArgs[i] === ___) origArgs[i] = args.shift();
    }
    args = origArgs.concat(args);
    return args.length < arity
      ? partialize.apply(this, [ fn, arity ].concat(args))
      : fn.apply(this, args);
  };
};

// Flip the argument order of a function
var flip = function (fn) {
  return function () {
    var args = slice.call(arguments);
    if (fn.length > 0) args = args.splice(0, fn.length);
    args = args.reverse();
    return fn.apply(this, args);
  };
};



// Miscelleanous helpers
// ---------------------

var eq = partialize(function eq (a, b) { return a === b; });

var toDashCase = function (str) {
  return str.replace(/([A-Z])/g, function (letter) {
    return '-' + letter.toLowerCase();
  });
};

// Accept a function, a string or a HTML Node and return an HTML Node
var elementify = function (obj) {
  if (isFunction(obj)) obj = obj();
  if (isString(obj)) obj = doc.createTextNode(obj);
  if (!isNode(obj)) obj = doc.createTextNode(obj + "");
  return obj;
};



// Properties and attributes
// =========================

// Properties that should be set directly and not as attributes.
// Also used as map for case insensitive property names and for aliases.
// Some of these can probably be removed and fall back to attributes.
var propertyMap = "acceptCharset,accessKey,attributes,autocomplete,autofocus,autoplay,buffered,cellPadding,cellSpacing,cells,challenge,checked,childElementCount,childNodes,children,classList,className,clear,clientHeight,clientLeft,clientTop,clientWidth,colSpan,cols,compact,complete,content,contentDocument,contentEditable,contentWindow,control,controller,controls,coords,crossOrigin,currentSrc,currentTime,data,dataset,dateTime,declare,default,defaultChecked,defaultMuted,defaultPlaybackRate,defaultSelected,defaultValue,dirName,disabled,download,draggable,duration,elements,encoding,enctype,ended,error,event,files,firstChild,firstElementChild,form,formAction,formEnctype,formMethod,formNoValidate,formTarget,frame,frameBorder,hash,headers,height,hidden,high,host,hostname,htmlFor,httpEquiv,incremental,indeterminate,index,initialTime,innerHTML,innerText,isContentEditable,isMap,keytype,kind,label,labels,lastChild,lastElementChild,length,link,list,localName,loop,low,max,media,mediaGroup,multiple,muted,naturalHeight,naturalWidth,networkState,nextElementSibling,nextSibling,noHref,noShade,noValidate,noWrap,nodeName,nodeType,nodeValue,nonce,offsetHeight,offsetLeft,offsetParent,offsetTop,offsetWidth,open,optimum,options,origin,outerHTML,outerText,ownerDocument,parentElement,parentNode,pathname,paused,ping,playbackRate,played,port,position,poster,prefix,preload,previousElementSibling,previousSibling,profile,protocol,readOnly,readyState,required,reversed,rowIndex,rowSpan,rows,rules,sandbox,scheme,scope,scrollHeight,scrollLeft,scrollTop,scrollWidth,scrolling,seamless,search,sectionRowIndex,seekable,seeking,selected,selectedIndex,selectedOptions,selectionDirection,selectionEnd,selectionStart,shape,sheet,size,sizes,span,standby,start,startTime,step,style,summary,tabIndex,tagName,text,textContent,textLength,textTracks,track,translate,type,useMap,validationMessage,validity,value,valueAsDate,valueAsNumber,valueType,version,videoHeight,videoWidth,volume,width,willValidate,wrap,x,y"
  .split(',').reduce(function (map, key) {
    map[key.toLowerCase()] = key;
    return map;
  }, {});

// Aliases for common shorthands/mistakes
var aliasedProps = { 'class': 'className', 'for': 'htmlFor', 'html': 'innerHTML', 'text': 'textContent' };
for (var key in aliasedProps) propertyMap[key] = aliasedProps[key];


// Generic getters and setters
// ---------------------------
// If ambigous, determine whether a string is likely to be a property key
// or an attribute.

fns.attrOrProp = function (elem, name, value) {
  // Nested property access or non-Element node
  if ((/\./).test(name) || (elem.nodeType && elem.nodeType !== 1)) {
    return fns.prop(elem, name, value);
  }
  var direct = propertyMap[name.toLowerCase()];
  if (direct) return fns.prop(elem, direct, value, true);
  else return fns.attr(elem, name, value);
};

D8.get = partialize(function (name, elem) {
  return fns.attrOrProp(elem, name);
});
D8.getFrom = partialize(fns.attrOrProp, 2);

D8.set = partialize(function (name, value, elem) {
  return fns.attrOrProp(elem, name, value);
});
D8.setOn = partialize(fns.attrOrProp);


// Attributes
// ----------

fns.attr = function (elem, name, value) {
  if (name == null || !isElement(elem)) return;
  name = name.toLowerCase();
  if (typeof value === 'undefined') {
    return elem.getAttribute(name);
  }
  if (value === false || value === null) {
    elem.removeAttribute(name);
  } else {
    elem.setAttribute(name, value + "");
  }
  return elem;
};
fns.hasAttr = function (elem, name) {
  if (name == null || !isElement(elem)) return;
  return elem.hasAttribute(name.toLowerCase());
};

D8.getAttr = partialize(function (name, elem) {
  return fns.attr(elem, name);
});
D8.getAttrFrom = partialize(fns.attr, 2);

D8.setAttr = partialize(function (name, value, elem) {
  return fns.attr(elem, name, value);
});
D8.setOn = partialize(fns.attr);

D8.hasAttr = partialize(flip(fns.hasAttr), 2);
D8.hasAttrOn = partialize(fns.hasAttr);

D8.removeAttr = partialize(function (name, elem) {
  return fns.attr(elem, name, false);
});
D8.removeAttrFrom = partialize(function (elem, name) {
  return fns.attr(elem, name, false);
});


// Properties
// ----------

fns.prop = function (elem, name, value, isNormalized) {
  if (name == null || !isNode(elem)) return;
  if (!isNormalized) {
    // Nested property access/assignment with .
    name = name.split('.');
    while (name.length > 1) elem = fns.prop(elem, name.shift());
    name = name[0];
    name = propertyMap[name.toLowerCase()] || name;
  }
  // Get
  if (typeof value === 'undefined') {
    return elem[name];
  }
  // Set
  elem[name] = value;
  return elem;
};
fns.getData = function getData (key, elem) {
  return doc.documentElement.dataset
    ? fns.prop(elem, 'dataset.' + key, undefined, true)
    : fns.attr(elem, 'data-' + toDashCase(key));
};
fns.setData = function setData (key, value, elem) {
  return doc.documentElement.dataset
    ? fns.prop(elem, 'dataset.' + key, value, true)
    : fns.attr(elem, 'data-' + toDashCase(key), value);
};
fns.className = function (elem, action, name) {
  if (name == null || !isElement(elem) || !elem.classList) return;
  return elem.classList[action](name);
};

D8.getProp = partialize(function (name, elem) {
  return fns.prop(elem, name);
});
D8.getPropFrom = partialize(fns.prop, 2);

D8.setProp = partialize(function (name, value, elem) {
  return fns.prop(elem, name, value);
});
D8.setPropOn = partialize(fns.prop, 3);

D8.getHtml = D8.getProp('innerHTML');
D8.getHtmlFrom = D8.getProp('innerHTML');

D8.setHtml = D8.setProp('innerHTML');
D8.setHtmlOn = D8.setPropOn(___, 'innerHTML');

D8.getText = D8.getProp('textContent');
D8.getTextFrom = D8.getProp('textContent');

D8.setText = D8.setProp('textContent');
D8.setTextOn = D8.setPropOn(___, 'textContent');

D8.getValue = D8.getProp('value');
D8.getValueFrom = D8.getProp('value');

D8.setValue = D8.setProp('value');
D8.setValueOn = D8.setPropOn(___, 'value');

D8.addClass = partialize(function (name, elem) {
  fns.className(elem, 'add', name);
  return elem;
});
D8.addClassTo = partialize(function (elem, name) {
  fns.className(elem, 'add', name);
  return elem;
});

D8.removeClass = partialize(function (name, elem) {
  fns.className(elem, 'remove', name);
  return elem;
});
D8.removeClassFrom = partialize(function (elem, name) {
  fns.className(elem, 'remove', name);
  return elem;
});

D8.toggleClass = partialize(function (name, elem) {
  fns.className(elem, 'toggle', name);
  return elem;
});
D8.toggleClassOn = partialize(function (elem, name) {
  fns.className(elem, 'toggle', name);
  return elem;
});

D8.hasClass = partialize(function (name, elem) {
  return fns.className(elem, 'has', name);
});
D8.hasClassOn = partialize(function (elem, name) {
  return fns.className(elem, 'has', name);
});


// Style
// -----

D8.getStyle = partialize(function (name, elem) {
  return elem.ownerDocument.defaultView.getComputedStyle(elem)[name];
});
D8.getStyleFrom = partialize(function (elem, name) {
  return elem.ownerDocument.defaultView.getComputedStyle(elem)[name];
});
D8.setStyle = partialize(function (name, value, elem) {
  return fns.prop(elem, 'style.' + name, value);
});
D8.setStyleOn = partialize(function (elem, name, value) {
  return fns.prop(elem, 'style.' + name, value);
});
D8.hide = D8.setStyle('display', 'none');
D8.show = D8.setStyle('display', 'block');



// Manipulation
// ============

fns.after = function (content, elem) {
  content = elementify(content);
  elem.parentNode.insertBefore(content, elem.nextSibling); 
  return elem;
};
fns.before = function (content, elem) {
  content = elementify(content);
  elem.parentNode.insertBefore(content, elem); 
  return elem;
};
fns.prepend = function (content, elem) {
  content = elementify(content);
  elem.insertBefore(content, elem.firstChild); 
  return elem;
};
fns.append = function (content, elem) {
  content = elementify(content);
  elem.appendChild(content);
  return elem;
};
fns.replace = function (elem, content) {
  content = elementify(content);
  elem.parentNode.replaceChild(content, elem);
  return elem;
};
fns.clone = function (elem, shallow) {
  return elem.cloneNode(!shallow);
};
fns.empty = function (elem) {
  fns.prop(elem, 'textContent', '', true);
  return elem;
};
fns.remove = function (elem) {
  return elem.parentNode.removeChild(elem);
};

D8.after = partialize(fns.after);
D8.insertAfter = partialize(flip(fns.after), 2);

D8.before = partialize(fns.before);
D8.insertBefore = partialize(flip(fns.before), 2);

D8.prepend = partialize(fns.prepend);
D8.prependTo = partialize(flip(fns.prepend), 2);

D8.append = partialize(fns.append);
D8.appendTo = partialize(flip(fns.append), 2);

D8.clone = fns.clone;
D8.cloner = function (elem, shallow) {
  return function () { return fns.clone(elem, shallow); };
};

D8.replace = partialize(fns.replace);
D8.replaceWith = partialize(flip(fns.replace), 2);

D8.empty = fns.empty;

D8.remove = fns.remove;



// Traversal
// =========

var matchesSelector = (function () {
  var props = [ 'matches', 'webkitMatchesSelector', 'mozMatchesSelector',
                'msMatchesSelector', 'oMatchesSelector' ];
  for (var i = 0; i < props.length; i++) {
    if (HTMLElement.prototype[props[i]]) return props[i];
  }
})();

fns.matches = function (cond, elem) {
  if (cond == null) return true;
  if (isFunction(cond)) return cond(elem);
  if (isString(cond)) {
    return elem[matchesSelector] && elem[matchesSelector](cond);
  }
  return eq(cond, elem);
};
fns.contains = function (cond, parent) {
  return !!fns.findOne(cond, parent);
};
fns.find = function (cond, elem) {
  elem || (elem = document);
  if (cond == null || cond === '') return slice.call(elem.getElementsByTagName('*'));
  if (isString(cond)) return slice.call(elem.querySelectorAll(cond));
  if (!isFunction(cond)) cond = eq(cond);
  return slice.call(elem.getElementsByTagName('*')).filter(cond);
};
fns.findOne = function (cond, elem) {
  elem || (elem = document);
  if (isString(cond)) return elem.querySelector(cond);
  if (!isFunction(cond)) cond = eq(cond);
  var match = null;
  slice.call(elem.getElementsByTagName('*')).some(function (cand) {
    if (cond(cand)) {
      match = cand;
      return true;
    }
  });
  return match;
};
fns.findByTag = function (tag, elem) {
  elem || (elem = document);
  return slice.call(elem.getElementsByTagName(tag));
};
fns.findByClass = function (className, elem) {
  elem || (elem = document);
  return slice.call(elem.getElementsByClassName(className));
};
fns.children = function (elem, cond) {
  var children = fns.prop(elem, 'children', undefined, true);
  if (cond == null) return children;
  return slice.call(children).filter(partialize(fns.matches)(cond));
};
fns.parents = function (elem, cond, max) {
  if (isString(cond)) {
    var sel = cond;
    cond = function (elem) { return elem[matchesSelector] && elem[matchesSelector](sel); };
  } else if (cond != null && !isFunction(cond)) {
    cond = eq(elem);
  }
  var results = [];
  while ((elem = elem.parentNode) && !(max && results.length >= max)) {
    if (fns.matches(cond, elem)) results[results.length] = elem;
  }
  return results;
};

D8.matches = partialize(fns.matches);
D8.matchedBy = partialize(flip(fns.matches), 2);

D8.contains = partialize(fns.contains);
D8.containedBy = partialize(function (cond, child) {
  return !!fns.parents(child, cond, 1);
});
 
D8.find = partialize(fns.find);
D8.findIn = partialize(flip(fns.find));

D8.findOne = partialize(fns.findOne);
D8.findOneIn = partialize(flip(fns.findOne));

D8.findByTag = partialize(fns.findByTag);
D8.findByTagIn = partialize(flip(fns.findByTag));

D8.findByClass = partialize(fns.findByClass);
D8.findByClassIn = partialize(flip(fns.findByClass));

D8.next = D8.getProp('nextElementSibling');
D8.prev = D8.getProp('previousElementSibling');

D8.childrenOf = fns.children;

D8.parentOf = function (elem, cond) {
  return fns.parents(elem, cond, 1)[0];
};

D8.parentsOf = fns.parents;



// Element creation
// ================

fns.make = function (tag, props, children) {
  if (isArray(props)) {
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
      else props.className = props.className ? props.className + ' ' + name : name;
    }
  }
  tag || (tag = 'div');
  var elem = isElement(tag) ? tag : doc.createElement(tag);
  for (var prop in props) D8.set(prop, props[prop], elem);
  if (isArray(children)) children.forEach(D8.appendTo(elem));
  return elem;
};

D8.make = fns.make;
D8.maker = function () {
  var args = arguments;
  return function () { return fns.make.apply(this, args); };
};


})(document, undefined);
