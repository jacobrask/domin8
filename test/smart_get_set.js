var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Get attribute", function (t) {
  var elem = document.createElement('div');
  elem.setAttribute('getattr', 'bar');

  t.ok(!D8.get('nosuchattribute', elem), "Non-existant attribute");

  t.equal(D8.get('getattr', elem), elem.getAttribute('getattr'), "Get");
  t.equal(D8.get('getattr')(elem), elem.getAttribute('getattr'), "Get (curried)");

  t.equal(D8.getFrom(elem, 'getattr'), elem.getAttribute('getattr'), "Get from");
  t.equal(D8.getFrom(elem)('getattr'), elem.getAttribute('getattr'), "Get from (curried)");

  t.end();
});


test("Set attribute", function (t) {
  var elem = document.createElement('div');

  t.equal(D8.set('setattr', 'foo', elem), elem, "Set returns element");
  t.equal(elem.getAttribute('setattr'), 'foo', "Set");

  t.equal(D8.set('setattr')('bar')(elem), elem, "Set (curried) returns element");
  t.equal(elem.getAttribute('setattr'), 'bar', "Set (curried)");

  t.equal(D8.setOn(elem, 'setattr', 'baz'), elem, "Set on returns element");
  t.equal(elem.getAttribute('setattr'), 'baz', "Set on");

  t.equal(D8.set('setattr', 'fizz')(elem), elem, "Set on (curried) returns element");
  t.equal(elem.getAttribute('setattr'), 'fizz', "Set on (curried)");

  t.end();
});


test("Get property", function (t) {
  var elem = document.createElement('span');
  elem.title = 'bar';

  t.ok(!D8.get('nosuchproperty', elem), "Non-existant");

  t.equal(D8.get('title', elem), elem.title, "Get");
  t.equal(D8.get('title')(elem), elem.title, "Get (curried)");

  t.equal(D8.getFrom(elem, 'title'), elem.title, "Get from");
  t.equal(D8.getFrom(elem)('title'), elem.title, "Get from (curried)");

  t.end();
});


test("Set property", function (t) {
  var elem = document.createElement('span');

  t.equal(D8.set('title', 'foo', elem), elem, "Set returns element");
  t.equal(elem.title, 'foo', "Set");

  t.equal(D8.set('title', 'bar')(elem), elem, "Set (curried) returns element");
  t.equal(elem.title, 'bar', "Set (curried)");

  t.equal(D8.setOn(elem, 'title', 'baz'), elem, "Set on returns element");
  t.equal(elem.title, 'baz', "Set on");

  t.equal(D8.setOn(elem, 'title', 'fizz'), elem, "Set on (curried) returns element");
  t.equal(elem.title, 'fizz', "Set on (curried)");

  t.end();
});


test("Get aliased property", function (t) {
  var elem = document.createElement('span');
  elem.className = 'foo';
  elem.innerHTML = '<b>bar</b>';

  t.equal(D8.get('text', elem), elem.textContent, "Get text alias");
  t.equal(D8.get('html', elem), elem.innerHTML, "Get html alias");
  t.equal(D8.get('classname', elem), elem.className, "Get classname case insensitive");

  t.end();
});


test("Set aliased property", function (t) {
  var elem = document.createElement('span');

  D8.set('text', '<script>', elem);
  t.equal(elem.textContent, '<script>', "Set text alias");
  D8.set('html', '<b></b>', elem);
  t.equal(elem.innerHTML, '<b></b>', "Set html alias");
  D8.set('classname', 'foo', elem);
  t.equal(elem.className, 'foo', "Set classname case insensitive");

  t.end();
});


test("Get nested property", function (t) {
  var elem = document.createElement('span');
  elem.foo = { bar: 'baz' };
  elem.style.width = '10px';

  t.equal(D8.get('foo.bar', elem), elem.foo.bar, "Get");
  t.equal(D8.get('style.width', elem), elem.style.width, "Get");

  t.end();
});


test("Set nested property", function (t) {
  var elem = document.createElement('span');

  t.equal(D8.set('style.height', '20px', elem), elem, "Set returns element");
  t.equal(elem.style.height, '20px', "Set");

  t.end();
});


test("Get with property shorthands", function (t) {
  var div = document.createElement('div');
  div.innerHTML = '<p>\n<b>foo</b>';
  div.dataset || (div.dataset = {});
  div.dataset.fooBar = 'foo';
  var input = document.createElement('input');
  input.value = 'foo';

  t.equal(D8.getHtml(div), div.innerHTML, "Get HTML");
  t.equal(D8.getText(div), div.textContent, "Get text");

  t.equal(D8.getValue(input), input.value, "Get value");
  t.equal(D8.getData('fooBar', div), div.dataset.fooBar, "Get data");

  t.end();
});


test("Set with property shorthands", function (t) {
  var div = document.createElement('div');
  var input = document.createElement('input');

  t.equal(D8.setHtml('<b></b>', div), div, "Set HTML returns element");
  t.equal(div.innerHTML, '<b></b>', "Set HTML");
  t.equal(D8.setHtmlOn(div, '<p></p>'), div, "Set HTML on returns element");
  t.equal(div.innerHTML, '<p></p>', "Set HTML on");

  t.equal(D8.setText('foo', div), div, "Set text returns element");
  t.equal(div.textContent, 'foo', "Set text");
  t.equal(D8.setTextOn(div, 'bar'), div, "Set text on returns element");
  t.equal(div.textContent, 'bar', "Set text on");

  t.equal(D8.setValue('bar', input), input, "Set value returns element");
  t.equal(input.value, 'bar', "Set value");
  t.equal(D8.setValueOn(input, 'foo'), input, "Set value on returns element");
  t.equal(input.value, 'foo', "Set value on");

  t.equal(D8.setData('fooBar', 'fizz', div), div, "Set data returns element");
  if (div.dataset) {
    t.equal(div.dataset.fooBar, 'fizz', "Set data");
  } else {
    t.equal(div.getAttribute('data-foo-bar'), 'fizz', "Set data");
  }
  t.equal(D8.setDataOn(div, 'fooBar', 'buzz'), div, "Set data on returns element");
  if (div.dataset) {
    t.equal(div.dataset.fooBar, 'buzz', "Set data on");
  } else {
    t.equal(div.getAttribute('data-foo-bar'), 'buzz', "Set data on");
  }
  t.equal(D8.setData('fooBar')('boo')(div), div, "Set data (curried) returns element");
  if (div.dataset) {
    t.equal(div.dataset.fooBar, 'boo', "Set data (curried)");
  } else {
    t.equal(div.getAttribute('data-foo-bar'), 'boo', "Set data (curried)");
  }
  t.end();
});


test("Set with object", function (t) {
  var div = document.createElement('div');
  var input = document.createElement('input');

  t.equal(D8.set({ title: 'bar', attr: 'foo' }, div), div, "Set properties with object returns element");
  t.equal(div.title, 'bar', "Set properties with object");
  t.equal(div.getAttribute('attr'), 'foo', "Set properties with object");

  t.end();
});
