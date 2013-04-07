/* domin8.js 0.0.1
   (c) 2013 Jacob Rask
   domin8 may be freely distributed under the MIT license. */

(function () {

var D8 = window.D8 = {};


// Internal helpers

var ArrayProto = Array.prototype;
var slice = ArrayProto.slice;
var slice = ArrayProto.slice;

var elementify = function (obj) {
  if (typeof obj == 'function') obj = obj();
  if (typeof obj == 'string') obj = document.createTextNode(obj);
  if (isNaN(obj.nodeType)) throw new TypeError();
  return obj;
};

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
  elem.setAttribute(attr, val);
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

D8.clone = curry(function (elem) {
  return elem.cloneNode(deep);
  return this;
});
D8.remove = curry(function (elem) {
  return elem.parentNode.removeChild(elem);
});
D8.wrap = curry(function (wrapper, elem) {
  elem.parentNode.insertBefore(wrapper, elem);
  elem.parentNode.removeChild(elem);
  wrapper.appendChild(elem);
  return this;
});


// Style

D8.getStyle = curry(function (prop, elem) {
  return elem.ownerDocument.defaultView.getComputedStyle(elem)[prop];
});
D8.setStyle = curry(function (prop, val, elem) {
  D8.setProp('style.' + prop, val, elem);
});

})();
