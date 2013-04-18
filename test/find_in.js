var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Element matches test", function (t) {
  var elem = document.createElement('div');
  elem.id = 'test-id';
  elem.className = 'test-class';

  t.ok(D8.matches('#test-id.test-class', elem), "Selector");
  t.ok(D8.matches('#test-id.test-class')(elem), "Selector (curried)");
  t.ok(D8.matches(function (el) { return el.tagName === elem.tagName; }, elem), "Test function");
  t.ok(D8.matches(elem, elem), "Exact element");

  t.ok(D8.matchedBy(elem, '#test-id'), "By selector");
  t.ok(D8.matchedBy(elem)(elem), "By element (curried)");

  t.end();
});


test("Element contains", function (t) {
  var wrap = document.createElement('div');
  var elem = document.createElement('p');
  elem.id = 'test-id';
  elem.className = 'test-class';
  wrap.appendChild(elem);

  t.ok(D8.contains('#test-id.test-class', wrap), "Selector");
  t.ok(D8.contains('#test-id.test-class')(wrap), "Selector (curried)");
  t.ok(D8.contains(function (el) { return el.tagName === elem.tagName; }, wrap), "Test function");
  t.ok(D8.contains(elem, wrap), "Element");

  t.end();
});


test("Element is contained by", function (t) {
  var elem = document.createElement('p');
  elem.id = 'test-id';
  elem.className = 'test-class';
  var child = document.createElement('div');
  elem.appendChild(child);

  t.ok(D8.containedBy('#test-id.test-class', child), "Selector");
  t.ok(D8.containedBy('#test-id.test-class')(child), "Selector (curried)");
  t.ok(D8.containedBy(function (el) { return el.tagName === elem.tagName; }, child), "Test function");
  t.ok(D8.containedBy(elem, child), "Element");

  t.end();
});


test("Find in element", function (t) {
  var elem = document.createElement('p');
  elem.id = 'test-bar';
  document.body.appendChild(elem);
  var first = document.createElement('span');
  first.foo = 'bar';
  elem.appendChild(first);
  elem.appendChild(document.createElement('b'));
  elem.appendChild(document.createElement('i'));

  t.ok(Array.isArray(D8.find('foo', elem)), "Find returns array");
  t.equal(D8.find('span', elem)[0], first, "Find by selector");
  t.equal(D8.findIn(elem, 'span')[0], first, "Find by selector in");
  t.equal(D8.findIn(elem)('span')[0], first, "Find by selector in (curried)");

  t.equal(D8.findOne('span', elem), first, "Find one by selector");
  t.equal(D8.findOneIn(elem, 'span'), first, "Find one in by selector");
  t.equal(D8.findOneIn(elem)('span'), first, "Find one in by selector (curried)");

  t.equal(D8.find('#test-bar')[0], elem, "Fallback to document as root");
  t.equal(D8.findOne('#test-bar'), elem, "Fallback to document as root");

  t.equal(D8.find(function (el) { return el.foo == 'bar'; }, elem)[0], first, "Find by test function");
  t.equal(D8.findOne(function (el) { return el.foo == 'bar'; }, elem), first, "Find one by test function");

  document.body.removeChild(elem);
  t.end();
});


test("Find by tag in element", function (t) {
  var elem = document.createElement('p');
  var first = document.createElement('span');
  elem.appendChild(first);
  elem.appendChild(document.createElement('b'));
  elem.appendChild(document.createElement('i'));

  t.ok(Array.isArray(D8.findByTag('foo', elem)), "Returns array");
  t.equal(D8.findByTag('span', elem)[0], first, "Find by tag");
  t.equal(D8.findByTagIn(elem, 'span')[0], first, "Find by tag in");
  t.equal(D8.findByTagIn(elem)('span')[0], first, "Find by tag in (curried)");

  t.end();
});


test("Find by class in element", function (t) {
  var elem = document.createElement('p');
  var first = document.createElement('span');
  first.className = 'foo';
  elem.appendChild(first);
  elem.appendChild(document.createElement('b'));
  elem.appendChild(document.createElement('i'));

  t.ok(Array.isArray(D8.findByClass('bar', elem)), "Returns array");
  t.equal(D8.findByClass('foo', elem)[0], first, "Find by class");
  t.equal(D8.findByClassIn(elem, 'foo')[0], first, "Find by class in");
  t.equal(D8.findByClassIn(elem)('foo')[0], first, "Find by class in (curried)");

  t.end();
});
