var fixEl = document.getElementById('qunit-fixture');

test("Element tests", function () {
  var elem = document.getElementById('test-elem');
  var tagName = elem.firstElementChild.tagName;

  ok(D8.matches('#test-elem', elem), "Matches selector");
  ok(D8.matches('#test-elem')(elem), "Matches selector (curried)");
  ok(D8.matches(function (el) { return el.tagName === elem.tagName; }, elem), "Matches test");
  ok(D8.matches(elem, elem), "Matches exact element");

  ok(D8.matchedBy(elem, '#test-elem'), "Matched by selector");
  ok(D8.matchedBy(elem)(elem), "Matched by element (curried)");

  ok(D8.contains(tagName, elem), "Has child matching selector");
  ok(D8.contains(tagName)(elem), "Has child matching selector (curried)");
  ok(D8.contains(elem.firstElementChild)(elem), "Has exact child");
  ok(D8.contains(function (el) { return el.tagName === tagName; }, elem), "Has child matching test");

  ok(D8.containedBy(elem.parentNode, elem), "Is contained by");
  ok(D8.containedBy(elem.parentNode)(elem), "Is contained by (curried)");
});


test("Find in element", function () {
  var elem = document.getElementById('test-elem');
  var firstEl = elem.firstElementChild;
  var tagName = firstEl.tagName;
  var className = firstEl.className = 'foo';

  ok(Array.isArray(D8.find('foo', elem)), "Find returns array");
  equal(D8.find(tagName, elem)[0], firstEl, "Find element");
  equal(D8.find(function (el) { return el == firstEl; }, elem)[0], firstEl, "Find element by test");
  equal(D8.find('.'+className)(elem)[0], firstEl, "Find element (curried)"); 
  equal(D8.findIn(elem, tagName)[0], firstEl, "Find element in element");

  equal(D8.findOne(tagName, elem), firstEl, "Find one element");
  equal(D8.findOne('.'+className)(elem), firstEl, "Find one element (curried)");
  equal(D8.findOne(function (el) { return el == firstEl; }, elem), firstEl, "Find one element by test");
  equal(D8.findOneIn(elem, tagName), firstEl, "Find one element in element");

  equal(D8.findByTag(tagName, elem)[0], firstEl, "Find element by tag name");
  equal(D8.findByTag(tagName)(elem)[0], firstEl, "Find element by tag name (curried)"); 
  equal(D8.findByTagIn(elem, tagName)[0], firstEl, "Find element by tag name in element");

  equal(D8.findByClass(className, elem)[0], firstEl, "Find element by class name");
  equal(D8.findByClass(className)(elem)[0], firstEl, "Find element by class name (curried)"); 
  equal(D8.findByClassIn(elem, className)[0], firstEl, "Find element by class name in element");
});


test("Get relative to element", function () {
  var elem = document.getElementById('test-elem');
  var child = elem.getElementsByTagName('b')[0];
  var children, parent, parents;

  equal(D8.next(elem), elem.nextElementSibling, "Next element");
  equal(D8.prev(elem), elem.previousElementSibling, "Previous element");

  children = D8.childrenOf(elem);
  equal(children[0], elem.firstElementChild, "Get children");
  equal(children[children.length-1], elem.lastElementChild, "Get children");

  equal(D8.childrenOf(elem, 'foobar').length, 0, "Get children matching selector");
  equal(D8.childrenOf(elem, 'p').length, 2, "Get children matching selector");

  equal(D8.parentOf(child), child.parentNode, "Get first parent");
  equal(D8.parentOf(child, '#test-elem'), elem, "Get first parent matching selector");
  equal(D8.parentOf(child, function (el) { return el == elem; }), elem, "Get first parent matching test");

  parents = D8.parentsOf(child);
  equal(parents[0], child.parentNode, "Get parents");
  equal(parents[parents.length-1], document, "Get parents");

  equal(D8.parentsOf(child, 'div')[0], elem, "Get parents matching selector");
  equal(D8.parentsOf(child, function (el) { return el.tagName === 'BODY'; })[0], document.body, "Get parents matching test");
});
