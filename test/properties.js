var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Get property", function (t) {
  var elem = document.createElement('div');
  elem.title = 'foo';

  t.ok(!D8.getProp('nosuchprop', elem), "Non-existant property");

  t.equal(D8.getProp('title', elem), elem.title, "Get");
  t.equal(D8.getProp('title')(elem), elem.title, "Get (curried)");

  t.equal(D8.getPropFrom(elem, 'title'), elem.title, "Get from");
  t.equal(D8.getPropFrom(elem)('title'), elem.title, "Get from (curried)");

  t.end();
});


test("Set property", function (t) {
  var elem = document.createElement('input');

  t.equal(D8.setProp('hidden', true, elem), elem, "Set returns element");
  t.equal(elem.hidden, true, "Set");

  t.equal(D8.setProp('hidden')(false)(elem), elem, "Set (curried) returns element");
  t.equal(elem.hidden, false, "Set (curried)");

  t.equal(D8.setPropOn(elem, 'value', 'baz'), elem, "Set on returns element");
  t.equal(elem.value, 'baz', "Set on");

  t.equal(D8.setProp('value', 'fizz')(elem), elem, "Set on (curried) returns element");
  t.equal(elem.value, 'fizz', "Set on (curried)");

  t.equal(D8.setProp('size')(5)(elem), elem, "Set on (curried) returns element");
  t.equal(elem.size, 5, "Set on (curried)");

  t.end();
});

