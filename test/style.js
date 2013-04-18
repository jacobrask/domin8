var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Get style", function (t) {
  var elem = document.createElement('div');
  document.body.appendChild(elem);
  elem.style.fontFamily = 'serif';

  t.equal(D8.getStyle('font-family', elem), 'serif', "Get style");
  t.equal(D8.getStyleFrom(elem)('font-family'), 'serif', "Get style");
  
  document.body.removeChild(elem);
  t.end();
});


test("Set style", function (t) {
  var elem = document.createElement('div');

  t.equal(D8.setStyle('font-family', 'serif', elem), elem, "Set style returns element");
  t.equal(elem.style.fontFamily, 'serif', "Set style");
  t.equal(D8.setStyle('font-family', 'cursive')(elem), elem, "Set style (curried) returns element");
  t.equal(elem.style.fontFamily, 'cursive', "Set style (curried)");

  t.equal(D8.setStyleOn(elem, 'font-family', 'serif'), elem, "Set style on returns element");
  t.equal(elem.style.fontFamily, 'serif', "Set style");

  D8.setStyle('height', 10, elem);
  t.equal(elem.style.height, '10px', "Set style without unit");

  t.end();
});


test("Set style with aliases", function (t) {
  var elem = document.createElement('div');

  t.equal(D8.hide(elem), elem, "Hide returns element");
  t.equal(elem.style.display, 'none', "Hide element");
  t.equal(D8.show(elem), elem, "Show returns element");
  t.equal(elem.style.display, 'block', "Show element");

  t.end();
});
