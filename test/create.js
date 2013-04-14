test("Element creation", function () {
  var elem, maker;

  equal(D8.make('b').tagName, 'B', "Create element");
  equal(D8.make('div.foo').className, 'foo', "Class name");
  equal(D8.make('#foo').id, 'foo', "Id");

  elem = D8.make('div#foo.bar');
  equal(elem.id, 'foo', "Id and class name");
  equal(elem.className, 'bar', "Id and class name");

  elem = D8.make('div.bar.baz#foo');
  equal(elem.id, 'foo', "Id and class name");
  equal(elem.className, 'bar baz', "Id and class name");

  elem = D8.make('p', { hidden: true, foobar: 'barfoo', title: "BAR" });
  equal(elem.title, "BAR", "Property");
  equal(elem.hidden, true, "Boolean property");
  equal(elem.getAttribute('foobar'), 'barfoo', "Attribute");

  elem = D8.make('p', [ 'Text' ]);
  equal(elem.textContent, 'Text', "Text child");

  elem = D8.make('div', { id: 'foo' }, [ document.createElement('span') ]);
  equal(elem.id, 'foo');
  equal(elem.firstChild.tagName, 'SPAN');

  maker = D8.maker('div#foo', [ document.createElement('span') ]);
  equal(typeof maker, 'function', "Element creation function");
  equal(maker().id, 'foo');
  equal(maker().firstChild.tagName, 'SPAN');
});
