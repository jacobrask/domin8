var fixEl = document.getElementById('qunit-fixture');

test("Attributes and properties", function () {
  var elem = document.getElementById('test-attr');
  equal(D8.getAttr('foo', elem), 'bar', "Get attribute");
  equal(D8.getProp('id', elem), 'test-attr', "Get property");
  D8.setAttr('bar', 'foo', elem);
  equal(D8.getAttr('bar', elem), 'foo', "Set attribute");
  D8.setProp('id', 'test-bar-foo', elem);
  equal(D8.getProp('id', elem), 'test-bar-foo', "Set property");
  D8.setProp('style.color', 'red', elem);
  equal(D8.getProp('style.color', elem), 'red', "Set nested property");
  D8.removeAttr('bar', elem);
  equal(D8.getAttr('bar', elem), null, "Remove attribute");

  equal(D8.getText(elem), 'Text html', "Get text");
  equal(D8.getHtml(elem), 'Text <b>html</b>', "Get HTML");

  D8.setText('<script>alert()</script>', elem);
  equal(D8.getHtml(elem), '&lt;script&gt;alert()&lt;/script&gt;', "Set text");

  D8.setHtml('<b>HTML</b>', elem);
  equal(D8.getHtml(elem), '<b>HTML</b>', "Set HTML");

});

test("Manipulation", function () {
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
  equal(elem.previousSibling.textContent, 'Bar', "Before element, insert before");

  D8.append(document.createElement('strong'), elem);
  equal(elem.lastChild.tagName, 'STRONG', "Append to element");
  D8.appendTo(elem, 'FOOBAR');
  equal(elem.lastChild.textContent, 'FOOBAR', "To element, append");

  D8.prepend(document.createElement('small'), elem);
  equal(elem.firstChild.tagName, 'SMALL', "Prepend to element");
  D8.prependTo(elem, 'BARFOO');
  equal(elem.firstChild.textContent, 'BARFOO', "To element, prepend");

  D8.wrap(document.createElement('section'), elem);
  equal(elem.parentNode.tagName, 'SECTION', "Wrap element in element");

});
