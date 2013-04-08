/* domin8.js 0.0.1
   (c) 2013 Jacob Rask
   domin8 may be freely distributed under the MIT license. */

(function () {

var ArrayProto = Array.prototype;
var NodeListProto = NodeList.prototype;
var HTMLCollProto = HTMLCollection.prototype;

var addMethod = function (obj, name, fn) {
  if (obj.hasOwnProperty(name)) {
    return console.warn(obj.constructor.name + " already has a '" + name + "' method or property.");
  }
  Object.defineProperty(obj, name, { value: fn });
};

var collectionMethods = {};
var nodeListMethods = {};

// Non-destructive iteration methods
nodeListMethods.forEach = function (iterator, context) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (iterator.call(context, this[i], i, this) === false) break;
  }
  return this;
};

// Invoke a method or function (with arguments) on every element
collectionMethods.invoke = function (fn) {
  var args = ArrayProto.slice.call(arguments, 1);
  var isFunc = typeof fn == 'function';
  return this.forEach(function (elem) {
    (isFunc ? fn : elem[fn}).apply(elem, args);
  });
};

[ 'addEventListener', 'normalize', 'removeAttribute',
  'removeEventListener', 'setAttribute' ].forEach(function (method) {
  nodeListMethods[method] = function () {
    var args = [ method ].concat(arguments);
    return this.invoke.apply(this, arguments);
  };
});

// newEl is either an element that will be cloned for each iteration,
// or a function returning an element
nodeListMethods.appendChild = function (newEl) {
  var isFunc = typeof newEl == 'function';
  return this.forEach(function (el) {
    el.appendChild(isFunc ? newEl(el) : newEl.cloneNode(true));
  });
};

nodeListMethods.removeChild = function (fn) {
  return this.forEach(function (el) {
    el.removeChild(fn(el));
  });
};


// Methods not returning collections
nodeListMethods.indexOf = ArrayProto.indexOf;
nodeListMethods.lastIndexOf = ArrayProto.lastIndexOf;
nodeListMethods.every = ArrayProto.every;
nodeListMethods.some = ArrayProto.some;

nodeListMethods.every = ArrayProto.every;
nodeListMethods.some = ArrayProto.some;

elems.every(function (el) { return el.classList.contains('foo'); });

nodeListMethods.join = function () {
  var text = this.pluck('textContent');
  return text.join.apply(text, arguments);
};

// Determine if the collection includes a given item
collectionMethods.include = function (item) {
  return this.indexOf(item) != -1;
};

// Return the first element which passes a truth test.
nodeListMethods.find = function (iterator, context) {
  var result;
  this.some(function (value, idx, list) {
    if (iterator.call(context, value, idx, list)) {
      result = value;
      return true;
    }
  });
  return result;
});


// Mutating methods, will convert live NodeLists to Arrays
nodeListMethods.toArray = function () {
  return ArrayProto.slice.call(this);
};

nodeListMethods.filter = ArrayProto.filter;
nodeListMethods.map = ArrayProto.map;
nodeListMethods.reduce = ArrayProto.reduce;
nodeListMethods.reduceRight = ArrayProto.reduceRight;

// Return all the elements for which a truth test fails.
// The opposite of filter.
nodeListMethods.reject = function (iterator, context) {
  return this.filter(function (value, idx, list) {
    return !iterator.call(this, value, idx, list);
  }, context);
});

// Returns a list of lists of n items each
collectionMethods.partition = function (n, step, pad) {
  return this.reduce(function (tot, cur, idx) {
    if (idx % n === 0) tot.push([]);
    tot[res.length-1].push(cur);
    return tot;
  }, []);
};

for (var name in nodeListMethods) {
  addMethod(NodeListProto, name, nodeListMethods[name]);
  addMethod(HTMLCollProto, name, nodeListMethods[name]);
}
for (var name in collectionMethods) {
  addMethod(NodeListProto, name, nodeListMethods[name]);
  addMethod(HTMLCollProto, name, nodeListMethods[name]);
  addMethod(ArrayProto, name, nodeListMethods[name]);
}

})();
