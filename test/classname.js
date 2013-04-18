var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Add class", function (t) {
  var elem = document.createElement('div');

  t.equal(D8.addClass('foo', elem), elem, "Add class returns element");
  t.ok(elem.classList.contains('foo'), "Add class");

  t.equal(D8.addClass('bar')(elem), elem, "Add class (curried) returns element");
  t.ok(elem.classList.contains('bar'), "Add class (curried)");

  t.equal(D8.addClassTo(elem, 'fizz'), elem, "Add class to returns element");
  t.ok(elem.classList.contains('fizz'), "Add class to (curried)");

  t.equal(D8.addClassTo(elem)('buzz'), elem, "Add class to (curried) returns element");
  t.ok(elem.classList.contains('buzz'), "Add class to (curried)");

  t.end();
});


test("Remove class", function (t) {
  var elem = document.createElement('div');
  elem.className = 'foo bar fizz buzz';

  t.equal(D8.removeClass('foo', elem), elem, "Remove class returns element");
  t.ok(!elem.classList.contains('foo'), "Remove class");

  t.equal(D8.removeClass('bar')(elem), elem, "Remove class (curried) returns element");
  t.ok(!elem.classList.contains('bar'), "Remove class (curried)");

  t.equal(D8.removeClassFrom(elem, 'fizz'), elem, "Remove class from returns element");
  t.ok(!elem.classList.contains('fizz'), "Remove class from");

  t.equal(D8.removeClassFrom(elem)('buzz'), elem, "Remove class from (curried) returns element");
  t.ok(!elem.classList.contains('buzz'), "Remove class from (curried)");

  t.end();
});


test("Toggle class", function (t) {
  var elem = document.createElement('div');

  t.equal(D8.toggleClass('foo', elem), elem, "Toggle class returns element");
  t.ok(elem.classList.contains('foo'), "Toggle class");

  t.equal(D8.toggleClass('bar')(elem), elem, "Toggle class (curried) returns element");
  t.ok(elem.classList.contains('bar'), "Toggle class (curried)");

  t.equal(D8.toggleClassFrom(elem, 'fizz'), elem, "Toggle class from returns element");
  t.ok(elem.classList.contains('fizz'), "Toggle class from");

  t.equal(D8.toggleClassFrom(elem)('buzz'), elem, "Toggle class from (curried) returns element");
  t.ok(elem.classList.contains('buzz'), "Toggle class from (curried)");

  t.end();
});


test("Has class", function (t) {
  var elem = document.createElement('div');
  elem.className = 'exists two';

  t.ok(D8.hasClass('exists', elem), "Has class, string");
  t.ok(!D8.hasClass('not-set', elem), "Has not class, string");
  t.ok(D8.hasClass('exists')(elem), "Has class (curried)");
  t.ok(D8.hasClassOn(elem, 'exists'), "Has class on");
  t.ok(D8.hasClassOn(elem)('exists'), "Has class on (curried)");

  t.ok(D8.hasClass(/exist/, elem), "Has class, regular expression");
  t.ok(!D8.hasClass(/exists two/, elem), "Has class, regexp matches one class");
  t.ok(!D8.hasClass(/foo/, elem), "Has not class, regular expression");

  t.ok(D8.hasClass(function (c) { return c == 'exists'; }, elem), "Has class, function");

  t.end();
});
