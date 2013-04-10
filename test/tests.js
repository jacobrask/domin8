var fixEl = document.getElementById('qunit-fixture');

test("Traversal", function () {
  var elem = document.getElementById('test-traverse');
  var child = elem.getElementsByTagName('strong')[0];
  ok(D8.matches('#test-traverse', elem), "Matches selector");
  ok(D8.contains('strong', elem), "Has child matching selector");
  equal(D8.find('strong', elem)[0], elem.children[0], "Find");

  equal(D8.next(elem.getElementsByTagName('i')[0]).tagName, 'SPAN', "Next sibling");
  equal(D8.prev(elem.getElementsByTagName('span')[0]).tagName, 'I', "Previous sibling");

  equal(D8.childrenOf(elem)[0], elem.children[0], "Children of");
  equal(D8.childrenOf(elem, 'strong')[0], elem.children[0], "Children of - filtered");

  equal(D8.parent(elem), elem.parentNode, "Parent");

  equal(D8.parentsOf(child)[0], elem, "Parents of");
  equal(D8.parentsOf(child, '#test-traverse')[0], elem, "Parents of - filtered");
});

test("Element creation", function () {
  equal(D8.make('b').tagName, 'B', "Create element");
  equal(D8.make('div.foo').className, 'foo', "Class name");
  equal(D8.make('#foo').id, 'foo', "Id");

  var elem = D8.make('div#foo.bar');
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
});

test("Style", function () {
  var elem = document.getElementById('test-style');
  equal(D8.getStyle('width', elem), '100px', "Get style");
  D8.setStyle('width', '200px', elem);
  equal(D8.getStyle('width', elem), '200px', "Set style");
});
