var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Clone content", function (t) {
  var orig = document.createElement('div');
  orig.className = 'abc';
  orig.textContent = 'def';
  var cloned;

  cloned = D8.clone(orig);
  t.notEqual(cloned, orig, "Cloned node is not original");
  t.equal(cloned.className, orig.className, "Clone node (deep)");
  t.equal(cloned.textContent, orig.textContent, "Clone node (deep)");
 
  cloned = D8.clone(orig, true);
  t.equal(cloned.textContent, '', "Clone node (shallow)");

  t.end();
});


test("Cloner function", function (t) {
  var orig = document.createElement('div');
  orig.className = 'abc';
  orig.textContent = 'def';
  var cloner;

  cloner = D8.cloner(orig);
  t.equal(typeof cloner, 'function', "Cloner function (deep)");
  t.notEqual(cloner(), orig, "Cloner function (deep)");
  t.equal(cloner().textContent, orig.textContent, "Clone function (deep)");

  cloner = D8.cloner(orig, true);
  t.equal(cloner().textContent, '', "Clone function (shallow)");

  t.end();
});


test("Replace content", function (t) {
  var elem = document.createElement('div');
  var elA = document.createElement('div');
  var elB = document.createElement('div');
  elem.appendChild(elA);

  t.equal(D8.replace(elA, elB), elA, "Return replaced node");
  t.equal(elem.firstChild, elB, "Replace element");

  t.equal(D8.replace(elB)(elA), elB, "Return replaced node");
  t.equal(elem.firstChild, elA, "Replace element (curried)");

  t.equal(D8.replaceWith(elB, elA), elA, "Return replaced node");
  t.equal(elem.firstChild, elB, "Replace with element");

  t.equal(D8.replaceWith(elA)(elB), elB, "Return replaced node");
  t.equal(elem.firstChild, elA, "Replace with element (curried)");

  t.end();
});


test("Remove content", function (t) {
  var wrap = document.createElement('div');
  var elem;

  wrap.appendChild(elem = document.createElement('b'));
  elem.innerHTML = '<span></span>';

  t.equal(D8.empty(wrap), wrap, "Return container");
  t.equal(wrap.textContent, '', "Empty element");
  t.equal(wrap.children.length, 0, "Empty element");
  
  wrap.innerText = '';
  wrap.appendChild(el = document.createElement('b'));
  t.equal(D8.remove(el), el, "Return removed element");
  t.ok(!el.parentNode, "Element removed from DOM");

  t.end();
});
