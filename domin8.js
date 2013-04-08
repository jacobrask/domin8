/* domin8.js 0.0.1
   (c) 2013 Jacob Rask
   domin8 may be freely distributed under the MIT license. */

(function () {

var D8 = window.D8 = {};


// Internal helpers

var ArrayProto = Array.prototype;
var slice = ArrayProto.slice;
var isArray = Array.isArray;
var isString = function (obj) { return obj && typeof obj == 'string'; };
var isElement = function (obj) { return obj && obj.nodeType === 1; };

var matchesSelector = (function () {
  var props = [ 'matches', 'webkitMatchesSelector', 'mozMatchesSelector',
                'msMatchesSelector', 'oMatchesSelector' ];
  for (var i = 0; i < props.length; i++) {
    if (HTMLElement.prototype[props[i]]) return props[i];
  }
})();


// Accept an element, a function or a string and return an HTML Node
var elementify = function (obj) {
  if (typeof obj == 'function') obj = obj();
  if (isString(obj)) obj = document.createTextNode(obj);
  if (isNaN(obj.nodeType)) throw new TypeError();
  return obj;
};

// Returns new functions until all arguments (fn.length or fnLength) are filled
var curry = function (fn, fnLength /*, args */) {
  var origArgs = slice.call(arguments, 2);
  fnLength || (fnLength = fn.length);
  return function () {
    var args = origArgs.concat(slice.call(arguments));
    return args.length < fnLength
      ? curry.apply(this, [ fn, fnLength ].concat(args))
      : fn.apply(this, args);
  };
};

// Flip the argument order of a function
var flip = function (fn) {
  return function () {
    return fn.apply(this, ArrayProto.reverse.call(arguments));
  };
};


// Attribute and properties

D8.getAttr = curry(function (attr, elem) {
  return elem.getAttribute(attr);
});
D8.getProp = curry(function (prop, obj) {
  prop = prop.split('.');
  while (prop.length > 1) obj = obj[prop.shift()];
  return obj[prop[0]];
});
D8.setAttr = curry(function (attr, val, elem) {
  elem.setAttribute(attr, "" + val);
  return elem;
});
D8.setProp = curry(function (prop, val, obj) {
  prop = prop.split('.');
  while (obj && prop.length > 1) obj = obj[prop.shift()];
  obj[prop[0]] = val;
  return obj;
});
D8.removeAttr = curry(function (attr, elem) {
  elem.removeAttribute(attr);
  return elem;
});
D8.getHtml = D8.getProp('innerHTML');
D8.setHtml = D8.setProp('innerHTML');
D8.getText = D8.getProp('textContent');
D8.setText = D8.setProp('textContent');
D8.getValue = D8.getProp('value');
D8.setValue = D8.setProp('value');
D8.getData = curry(function (key, elem) {
  D8.getProp('datalist.' + key, elem);
});
D8.setData = curry(function (key, val, elem) {
  D8.setProp('datalist.' + key, val, elem);
});

D8.addClass = curry(function (className, elem) {
  elem.classList.add(className);
  return elem;
});
D8.removeClass = curry(function (className, elem) {
  elem.classList.remove(className);
  return elem;
});
D8.toggleClass = curry(function (className, elem) {
  elem.classList.toggle(className);
  return elem;
});
D8.hasClass = curry(function (className, elem) {
  return elem.classList.contains(className);
});


// Manipulation

D8.after = curry(function (content, elem) {
  content = elementify(content);
  elem.parentNode.insertBefore(content, elem.nextSibling); 
  return elem;
});
D8.insertAfter = flip(D8.after);

D8.before = curry(function (content, elem) {
  content = elementify(content);
  elem.parentNode.insertBefore(content, elem); 
  return elem;
});
D8.insertBefore = flip(D8.before);

D8.prepend = curry(function (content, elem) {
  content = elementify(content);
  elem.insertBefore(content, elem.firstChild); 
  return elem;
});
D8.prependTo = flip(D8.prepend);

D8.append = curry(function (content, elem) {
  content = elementify(content);
  elem.appendChild(content, elem.nextSibling); 
  return elem;
});
D8.appendTo = flip(D8.append);

D8.replace = curry(function (oldElem, newContent) {
  newContent = elementify(newContent);
  oldElem.parentNode.replaceChild(oldElem, newContent);
  return oldElem;
});
D8.replaceWith = flip(D8.replace);

D8.clone = curry(function (elem, shallow) {
  return elem.cloneNode(!shallow);
}, 1);
D8.remove = curry(function (elem) {
  return elem.parentNode.removeChild(elem);
});


// Traversal

D8.matches = curry(function (sel, elem) {
  return elem[matchesSelector](sel);
});
D8.has = curry(function (sel, elem) {
  return !!elem.querySelector(sel);
});
D8.contains = curry(function (child, parent) {
  return parent.contains(child);
});
D8.containedBy = flip(D8.contains);
D8.find = curry(function (sel, elem) {
  return elem.querySelectorAll(sel);
});
D8.findIn = flip(D8.find);
D8.next = D8.getProp('nextElementSibling');
D8.prev = D8.getProp('previousElementSibling');
D8.parent = D8.getProp('parentNode');
D8.childrenOf = curry(function (elem, sel) {
  if (sel == null) return elem.children;
  return slice.call(elem.children).filter(D8.matches(sel));
}, 1);
D8.parentsOf = curry(function (elem, sel) {
  var parents = [], parent;
  while (elem = elem.parentNode) {
    if (sel == null || (elem[matchesSelector] && elem[matchesSelector](sel))) {
      parents[parents.length] = elem;
    }
  }
  return parents;
}, 1);



// Element creation

D8.make = (function () {
  var directProps = {
    'class': 'className', className: 'className',
    defaultValue: 'defaultValue',
    'for': 'htmlFor',
    html: 'innerHTML', innerHTML: 'innerHTML',
    id: 'id',
    name: 'name',
    src: 'src',
    text: 'textContent', textContent: 'textContent',
    title: 'title',
    value: 'value'
  };
  var boolProps = [ 'checked', 'defaultChecked', 'disabled', 'hidden', 'multiple', 'selected' ];
  var setProp = function (elem, key, val) {
    var prop = directProps[key];
    if (prop) D8.setProp(prop, val, elem);
    else if (boolProps.indexOf(key) > -1) D8.setProp(key, !!val, elem);
    else D8.setAttr(key, val, elem);
  };

  var splitter = /(#|\.)/;
  return function make (tag, props) {
    props || (props = {});
    if (isString(tag) && splitter.test(tag)) {
      var parts = tag.split(splitter);
      tag = parts[0];
      for (var i = 1, j = 2, name; j < parts.length; i += 2, j += 2) {
        name = parts[j];
        if (parts[i] === '#') props.id = name;
        else props.className = props.className ? props.className + ' ' + name : name;
      }
    }
    tag || (tag = 'div');
    var elem = isElement(tag) ? tag : document.createElement(tag);
    for (var prop in props) setProp(elem, prop, props[prop]);
    return elem;
  };
})();



// Style

D8.getStyle = curry(function (prop, elem) {
  return elem.ownerDocument.defaultView.getComputedStyle(elem)[prop];
});
D8.setStyle = curry(function (prop, val, elem) {
  D8.setProp('style.' + prop, val, elem);
});
D8.hide = D8.setStyle('display', 'none');
D8.show = D8.setStyle('display', 'block');

})();
