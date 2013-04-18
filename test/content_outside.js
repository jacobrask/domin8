var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Insert before", function (t) {
  var wrap = document.createElement('div');
  var ref = document.createElement('div');
  wrap.appendChild(ref);
  var inserted = document.createElement('span');
  
  t.equal(D8.before(inserted, ref), ref, "Before and return reference node");
  t.equal(ref.previousSibling, inserted, "Before");

  inserted = inserted.cloneNode();
  t.equal(D8.before(inserted)(ref), ref, "Before (curried) and return reference node");
  t.equal(ref.previousSibling, inserted, "Before (curried)");
  
  t.equal(D8.insertBefore(ref, inserted), ref, "Insert before and return reference node");
  t.equal(ref.previousSibling, inserted, "Insert before");

  inserted = inserted.cloneNode();
  t.equal(D8.insertBefore(ref)(inserted), ref, "Insert before (curried) and return reference node");
  t.equal(ref.previousSibling, inserted, "Insert before (curried)");

  t.end();
});

test("Insert after", function (t) {
  var wrap = document.createElement('div');
  var ref = document.createElement('div');
  wrap.appendChild(ref);
  var inserted = document.createElement('span');
  
  elem = document.createElement('span');
  t.equal(D8.after(elem, ref), ref, "After and return reference node");
  t.equal(ref.nextSibling, elem, "After element");

  t.equal(D8.after('foo')(ref), ref, "After string (curried) and return reference node");
  t.equal(ref.nextSibling.nodeValue, 'foo', "After string (curried)");

  var list = [ elem = document.createElement('span'),
               'foo', document.createElement('p') ];
  t.equal(D8.after(list, ref), ref, "After list to and return reference node");
  t.equal(ref.nextSibling, elem, "After list to element");

  t.end();
});
