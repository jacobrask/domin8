var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Get attribute", function (t) {
  var elem = document.createElement('div');
  elem.setAttribute('getattr', 'bar');

  t.ok(!D8.getAttr('nosuchattribute', elem), "Non-existant attribute");

  t.equal(D8.getAttr('getattr', elem), elem.getAttribute('getattr'), "Get");
  t.equal(D8.getAttr('getattr')(elem), elem.getAttribute('getattr'), "Get (curried)");

  t.equal(D8.getAttrFrom(elem, 'getattr'), elem.getAttribute('getattr'), "Get from");
  t.equal(D8.getAttrFrom(elem)('getattr'), elem.getAttribute('getattr'), "Get from (curried)");

  t.end();
});


test("Set attribute", function (t) {
  var elem = document.createElement('div');

  t.equal(D8.setAttr('setattr', 'foo', elem), elem, "Set returns element");
  t.equal(elem.getAttribute('setattr'), 'foo', "Set");

  t.equal(D8.setAttr('setattr')('bar')(elem), elem, "Set (curried) returns element");
  t.equal(elem.getAttribute('setattr'), 'bar', "Set (curried)");

  t.equal(D8.setAttrOn(elem, 'setattr', 'baz'), elem, "Set on returns element");
  t.equal(elem.getAttribute('setattr'), 'baz', "Set on");

  t.equal(D8.setAttr('setattr', 'fizz')(elem), elem, "Set on (curried) returns element");
  t.equal(elem.getAttribute('setattr'), 'fizz', "Set on (curried)");

  t.equal(D8.setAttr('setattr')('buzz')(elem), elem, "Set on (curried) returns element");
  t.equal(elem.getAttribute('setattr'), 'buzz', "Set on (curried)");
  t.end();
});


test("Has attribute", function (t) {
  var elem = document.createElement('div');
  elem.setAttribute('hasattr', 'bar');

  t.ok(!D8.hasAttr('nosuchattribute', elem), "Non-existant attribute");

  t.ok(D8.hasAttr('hasattr', elem), "Has");
  t.ok(D8.hasAttr('hasattr')(elem), "Has (curried)");

  t.ok(D8.hasAttrOn(elem, 'hasattr'), "Has on");
  t.ok(D8.hasAttrOn(elem)('hasattr'), "Has on(curried)");

  t.end();
});


test("Remove attribute", function (t) {
  var elem = document.createElement('div');

  elem.setAttribute('removeattr', 'bar');
  t.equal(D8.removeAttr('removeattr', elem), elem, "Remove returns element");
  t.ok(!elem.hasAttribute('removeattr'), "Remove");

  elem.setAttribute('removeattr', 'foo');
  t.equal(D8.removeAttr('removeattr')(elem), elem, "Remove (curried) returns element");
  t.ok(!elem.hasAttribute('removeattr'), "Remove (curried)");

  elem.setAttribute('removeattr', 'bar');
  t.equal(D8.removeAttrFrom(elem, 'removeattr'), elem, "Remove from returns element");
  t.ok(!elem.hasAttribute('removeattr'), "Remove from");

  elem.setAttribute('removeattr', 'foo');
  t.equal(D8.removeAttrFrom(elem)('removeattr'), elem, "Remove from (curried) returns element");
  t.ok(!elem.hasAttribute('removeattr'), "Remove from (curried)");

  t.end();
});

