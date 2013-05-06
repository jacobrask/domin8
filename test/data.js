var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Set data", function (t) {
  var div = document.createElement('div');

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

test("Set data with object", function (t) {
  var div = document.createElement('div');

  t.equal(D8.setData({ fooBar: 'fizz', fizzBuzz: true }, div), div, "Set data returns element");
  if (div.dataset) {
    t.equal(div.dataset.fooBar, 'fizz', "Set data");
  } else {
    t.equal(div.getAttribute('data-foo-bar'), 'fizz', "Set data");
  }
  t.equal(D8.setDataOn(div, { fooBar: 'buzz' }), div, "Set data on returns element");
  if (div.dataset) {
    t.equal(div.dataset.fooBar, 'buzz', "Set data on");
  } else {
    t.equal(div.getAttribute('data-foo-bar'), 'buzz', "Set data on");
  }
  t.equal(D8.setData({ fooBar: 'boo' })(div), div, "Set data (curried) returns element");
  if (div.dataset) {
    t.equal(div.dataset.fooBar, 'boo', "Set data (curried)");
  } else {
    t.equal(div.getAttribute('data-foo-bar'), 'boo', "Set data (curried)");
  }
  t.end();
});


test("Get data", function (t) {
  var div = document.createElement('div');
  if (div.dataset) {
    div.dataset.fooBar = 'foo';
  } else {
    div.setAttribute('data-foo-bar', 'foo');
  }
  t.equal(D8.getData('fooBar', div), 'foo', "Get data");

  t.end();
});
