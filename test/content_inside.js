var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Append element", function (t) {
  var ref = document.createElement('div');
  ref.appendChild(document.createElement('p'));
  var inserted = document.createElement('span');
  
  t.equal(D8.append(inserted, ref), ref, "Append and return reference node");
  t.equal(ref.lastChild, inserted, "Append element");

  inserted = inserted.cloneNode();
  t.equal(D8.append(inserted)(ref), ref, "Append (curried) and return reference node");
  t.equal(ref.lastChild, inserted, "Append element (curried)");

  inserted = inserted.cloneNode();
  t.equal(D8.appendTo(ref, inserted), ref, "Append to and return reference node");
  t.equal(ref.lastChild, inserted, "Append to element");

  inserted = inserted.cloneNode();
  t.equal(D8.appendTo(ref)(inserted), ref, "Append to (curried) and return reference node");
  t.equal(ref.lastChild, inserted, "Append to element (curried)");

  t.end();
});


test("Append list", function (t) {
  var ref = document.createElement('div');
  var last;
  var list = [ 'foo', document.createElement('span'),
               last = document.createElement('p') ];

  D8.append(list, ref);
  t.equal(ref.lastChild, last, "Append Array of elements");
  ref.innerHTML = '';

  D8.appendTo(ref, list);
  t.equal(ref.lastChild, last, "Append to element, Array of elements");
  ref.innerHTML = '';

  ref.appendChild(document.createElement('span'));
  ref.appendChild(last = document.createElement('span'));

  list = ref.getElementsByTagName('*');
  D8.append(list, ref);
  t.equal(ref.lastChild, last, "Append NodeList");

  list = ref.children;
  D8.append(list, ref);
  t.equal(ref.lastChild, last, "Append HTMLCollection");

  t.end();
});


test("Append other", function (t) {
  var elem = document.createElement('div');

  D8.append('Foo', elem);
  t.equal(elem.lastChild.nodeValue, 'Foo', "Append string");

  D8.append('', elem);
  t.equal(elem.lastChild.nodeValue, '', "Append empty string");

  D8.append(true, elem);
  t.equal(elem.lastChild.textContent, 'true', "Append primitive");

  D8.append(null, elem);
  t.equal(elem.lastChild.textContent, 'null', "Append primitive");

  var appended;
  D8.append(function () { return appended = document.createElement('i'); }, elem);
  t.equal(elem.lastChild, appended, "Append with function");

  t.end();
});


test("Prepend", function (t) {
  var ref = document.createElement('div');
  ref.appendChild(document.createElement('p'));
  var elem;
  
  elem = document.createElement('span');
  t.equal(D8.prepend(elem, ref), ref, "Prepend element and return reference node");
  t.equal(ref.firstChild, elem, "Prepend element");

  t.equal(D8.prepend('foo')(ref), ref, "Prepend string (curried) and return reference node");
  t.equal(ref.firstChild.nodeValue, 'foo', "Prepend string (curried)");

  var list = [ elem = document.createElement('span'),
               'foo', document.createElement('p') ];
  t.equal(D8.prependTo(ref, list), ref, "Prepend list to and return reference node");
  t.equal(ref.firstChild, elem, "Prepend list to element");

  t.end();
});
