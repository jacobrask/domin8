var test = test || require('tape');
var D8 = D8 || require('../domin8.js');

test("Find siblings", function (t) {
  var wrap = document.createElement('div');
  var first = document.createElement('span');
  var second = document.createElement('span');
  wrap.appendChild(first);
  wrap.appendChild(document.createTextNode('hi2u'));
  wrap.appendChild(second);

  t.equal(D8.next(first), second, "Next element");
  t.equal(D8.prev(second), first, "Previous element");

  t.end();
});


test("Find children", function (t) {
  var wrap = document.createElement('div');
  var first = document.createElement('span');
  var second = document.createElement('p');
  wrap.appendChild(first);
  wrap.appendChild(document.createTextNode('hi2u'));
  wrap.appendChild(second);

  t.ok(Array.isArray(D8.childrenOf(wrap)), "Children of returns array");
  t.equal(D8.childrenOf(wrap)[0], first, "Children of");
  t.equal(D8.childrenOf(wrap, 'span')[0], first, "Children matching selector");
  t.equal(D8.childrenOf(wrap, 'span').length, 1, "Children matching selector");
  t.equal(D8.childrenOf(wrap, function (el) { return el.tagName == 'P'; })[0], second, "Children matching test function");

  t.end();
});


test("Find parents", function (t) {
  var wrap = document.createElement('div');
  var first = document.createElement('p');
  var second = document.createElement('span');
  wrap.appendChild(first);
  first.appendChild(second);

  t.ok(Array.isArray(D8.parentsOf(second)), "Parents of of returns array");
  t.equal(D8.parentsOf(second)[1], wrap, "Parents of");
  t.equal(D8.parentsOf(second, 'div')[0], wrap, "Parents of matching selector");
  t.equal(D8.childrenOf(wrap, Boolean)[0], first, "Parents matching test function");

  t.end();
});
