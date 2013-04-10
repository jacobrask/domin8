test("Insert", function () {
  var elem = document.getElementById('test-manip');
  D8.after('Foo', elem);
  equal(elem.nextSibling.textContent, 'Foo', "Insert text after element");

  var after = document.createElement('tt');
  D8.after(after, elem);
  equal(elem.nextSibling.tagName, 'TT', "Insert element after element");

  D8.after(function () { return document.createElement('marquee'); }, elem);
  equal(elem.nextSibling.tagName, 'MARQUEE', "Insert element from function after element");
  D8.insertAfter(elem, 'Foo');
  equal(elem.nextSibling.textContent, 'Foo', "After element, insert");

  D8.before('Bar', elem);
  equal(elem.previousSibling.textContent, 'Bar', "Insert text before");
  D8.insertBefore(elem, 'Bar');
  equal(elem.previousSibling.textContent, 'Bar', "Before element, insert");

  D8.append(document.createElement('strong'), elem);
  equal(elem.lastChild.tagName, 'STRONG', "Append to element");
  D8.appendTo(elem, 'FOOBAR');
  equal(elem.lastChild.textContent, 'FOOBAR', "To element, append");

  D8.prepend(document.createElement('small'), elem);
  equal(elem.firstChild.tagName, 'SMALL', "Prepend to element");
  D8.prependTo(elem, 'BARFOO');
  equal(elem.firstChild.textContent, 'BARFOO', "To element, prepend");

  equal(D8.clone(elem).id, 'test-manip', "Clone node");

  D8.remove(elem);
  equal(elem.parentNode, null, "Remove element from DOM");
});


