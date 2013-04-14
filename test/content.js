test("Insert content before", function () {
  var ref = document.getElementById('test-elem');
  var inserted = document.createElement('div');
  var ret;

  D8.before(inserted, ref);
  equal(ref.previousSibling, inserted, "Insert element before reference node");

  inserted = inserted.cloneNode();
  D8.before(inserted)(ref);
  equal(ref.previousSibling, inserted, "Insert element before reference node (curried)");

  D8.before('Foo', ref);
  equal(ref.previousSibling.textContent, 'Foo', "Insert string before reference node");

  D8.before('', ref);
  equal(ref.previousSibling.textContent, '', "Insert empty string before reference node");

  D8.before(function () { return document.createElement('marquee'); }, ref);
  equal(ref.previousSibling.tagName, 'MARQUEE', "Insert element from function before reference node");
  
  D8.before(false, ref);
  equal(ref.previousSibling.textContent, 'false', "Insert native object converted to string before reference node");

  ret = D8.before('Bar', ref);
  equal(ret, ref, "Insert element before - return reference element");

  inserted = inserted.cloneNode();
  D8.insertBefore(ref, inserted);
  equal(ref.previousSibling, inserted, "Before element, insert");

  D8.insertBefore(ref)('Foo');
  equal(ref.previousSibling.textContent, 'Foo', "Before element, insert (curried)");

  ret = D8.insertBefore(ref, 'Foo');
  equal(ret, ref, "Before element, insert - return reference element");
});


test("Insert content after", function () {
  var ref = document.getElementById('test-elem');
  var inserted = document.createElement('div');
  var ret;

  D8.after(inserted, ref);
  equal(ref.nextSibling, inserted, "Insert element after reference node");

  inserted = inserted.cloneNode();
  D8.after(inserted)(ref);
  equal(ref.nextSibling, inserted, "Insert element after reference node (curried)");

  D8.after('Foo', ref);
  equal(ref.nextSibling.textContent, 'Foo', "Insert string after reference node");

  D8.after('', ref);
  equal(ref.nextSibling.textContent, '', "Insert empty string after reference node");

  D8.after(function () { return document.createElement('marquee'); }, ref);
  equal(ref.nextSibling.tagName, 'MARQUEE', "Insert element from function after reference node");
  
  D8.after(false, ref);
  equal(ref.nextSibling.textContent, 'false', "Insert native object converted to string after reference node");

  ret = D8.after('Bar', ref);
  equal(ret, ref, "Insert element after - return reference element");

  inserted = inserted.cloneNode();
  D8.insertAfter(ref, inserted);
  equal(ref.nextSibling, inserted, "After element, insert");

  D8.insertAfter(ref)('Foo');
  equal(ref.nextSibling.textContent, 'Foo', "After element, insert (curried)");

  ret = D8.insertAfter(ref, 'Foo');
  equal(ret, ref, "After element, insert - return reference element");
});


test("Append content", function () {
  var ref = document.getElementById('test-elem');
  var inserted = document.createElement('div');
  var ret;

  D8.append(inserted, ref);
  equal(ref.lastChild, inserted, "Append element to reference node");

  inserted = inserted.cloneNode();
  D8.append(inserted)(ref);
  equal(ref.lastChild, inserted, "Append element to reference node (curried)");

  D8.append('Foo', ref);
  equal(ref.lastChild.nodeValue, 'Foo', "Append string to reference node");

  D8.append('', ref);
  equal(ref.lastChild.nodeValue, '', "Append empty string to reference node");

  D8.append(function () { return document.createElement('marquee'); }, ref);
  equal(ref.lastChild.tagName, 'MARQUEE', "Append element from function to reference node");
  
  D8.append(true, ref);
  equal(ref.lastChild.textContent, 'true', "Append native object converted to string to reference node");

  ret = D8.append('Bar', ref);
  equal(ret, ref, "Append node - return reference element");

  inserted = inserted.cloneNode();
  D8.appendTo(ref, inserted);
  equal(ref.lastChild, inserted, "To element, append");

  D8.appendTo(ref)('Foo');
  equal(ref.lastChild.textContent, 'Foo', "To element, append (curried)");

  ret = D8.appendTo(ref, 'Foo');
  equal(ret, ref, "To element, append - return reference element");
});


test("Prepend content", function () {
  var ref = document.getElementById('test-elem');
  var inserted = document.createElement('div');
  var ret;

  D8.prepend(inserted, ref);
  equal(ref.firstChild, inserted, "Prepend element to reference node");

  inserted = inserted.cloneNode();
  D8.prepend(inserted)(ref);
  equal(ref.firstChild, inserted, "Prepend element to reference node (curried)");

  D8.prepend('Foo', ref);
  equal(ref.firstChild.nodeValue, 'Foo', "Prepend string to reference node");

  D8.prepend('', ref);
  equal(ref.firstChild.nodeValue, '', "Prepend empty string to reference node");

  D8.prepend(function () { return document.createElement('marquee'); }, ref);
  equal(ref.firstChild.tagName, 'MARQUEE', "Prepend element from function to reference node");
  
  D8.prepend([1,2], ref);
  equal(ref.firstChild.textContent, '1,2', "Prepend native object converted to string to reference node");

  ret = D8.prepend('Bar', ref);
  equal(ret, ref, "Prepend node - return reference element");

  inserted = inserted.cloneNode();
  D8.prependTo(ref, inserted);
  equal(ref.firstChild, inserted, "To element, prepend");

  D8.prependTo(ref)('Foo');
  equal(ref.firstChild.textContent, 'Foo', "To element, prepend (curried)");

  ret = D8.prependTo(ref, 'Foo');
  equal(ret, ref, "To element, prepend - return reference element");
});


test("Clone content", function () {
  var ref = document.getElementById('test-elem');
  var cloned = document.createElement('div'), cloner;
  cloned.className = 'cloned';
  cloned.textContent = 'foo';

  cloned = D8.clone(cloned);
  equal(cloned.className, 'cloned', "Clone node (deep)");
  equal(cloned.textContent, 'foo', "Clone node (deep)");
  cloned = D8.clone(cloned, true);
  equal(cloned.className, 'cloned', "Clone node (shallow)");
  equal(cloned.textContent, '', "Clone node (shallow)");

  cloned.textContent = 'foo';
  cloner = D8.cloner(cloned);
  equal(typeof cloner, 'function', "Cloner function (deep)");
  equal(cloner().className, 'cloned', "Cloner function (deep)");
  equal(cloner().textContent, 'foo', "Clone function (deep)");
  cloner = D8.cloner(cloned, true);
  equal(cloner().className, 'cloned', "Clone function (shallow)");
  equal(cloner().textContent, '', "Clone function (shallow)");
});


test("Replace content", function () {
  var ref = document.getElementById('test-elem');
  ref.innerText = '';
  var elA = document.createElement('div');
  var elB = document.createElement('div');
  var ret;

  ref.appendChild(elA);
  ret = D8.replace(elA, elB);
  equal(ref.firstChild, elB, "Replace element");
  equal(ret, elA, "Return replaced node");

  D8.replace(elB)(elA);
  equal(ref.firstChild, elA, "Replace element (curried)");

  ret = D8.replaceWith(elB, elA);
  equal(ref.firstChild, elB, "Replace with element");
  equal(ret, elA, "Return replaced node");

  D8.replaceWith(elA)(elB);
  equal(ref.firstChild, elA, "Replace with element (curried)");
});


test("Remove content", function () {
  var ref = document.getElementById('test-elem');
  var ret, el;

  ref.appendChild(el = document.createElement('b'));
  el.innerHTML = '<span></span>';
  ret = D8.empty(ref);
  equal(ref.textContent, '', "Empty element");
  equal(ref.children.length, 0, "Empty element");
  equal(ret, ref, "Empty element - return container");
  
  ref.innerText = '';
  ref.appendChild(el = document.createElement('b'));
  ret = D8.remove(el);
  equal(ref.textContent, '', "Empty element");
  equal(ref.children.length, 0, "Empty element");
  equal(ret, el, "Remove element - return removed element");
});

