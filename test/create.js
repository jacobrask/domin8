var test = test || require('tape');
var D8 = D8 || require('../domin8.js');


test("Element creation - properties", function (t) {
  t.equal(D8.make('b').tagName, 'B', "Create element");
  t.equal(D8.make('div.foo').className, 'foo', "Class name");
  t.equal(D8.make('#foo').id, 'foo', "Id");

  t.equal(D8.make('div#foo.bar').id, 'foo', "Id and class");
  t.equal(D8.make('div#foo.bar.baz').className, 'bar baz', "Id and class");
  t.equal(D8.make('div', { title: 'foo' }).title, 'foo', "Property");
  t.equal(D8.make('a', { title: 'foo', href: "bar" }).title, 'foo', "Property");
  t.equal(D8.make('p', { attr: 'foo' }).getAttribute('attr'), 'foo', "Attribute");
  
  t.end();
});

test("Element creation - children", function (t) {
  var child = document.createElement('span');
  var child2 = document.createElement('span');

  t.equal(D8.make('p', 'Text').textContent, 'Text', "Text child");
  t.equal(D8.make('p', { foo: 'bar' }, 'Text').textContent, 'Text', "Text child");
  t.equal(D8.make('p', [ 'Text1', 'Text2' ]).textContent, 'Text1Text2', "Text children");

  t.equal(D8.make('div', child).firstChild, child, "Element child");
  t.equal(D8.make('div', [ child, child2]).lastChild, child2, "Element children");

  t.equal(D8.make('div', function () { return 'b'; }).textContent, 'b', "Function child");

  t.end();
});


test("Element creation function", function (t) {
  t.equal(D8.maker('p', 'Text')().textContent, 'Text', "Text child");
  t.equal(D8.maker('div.foo')().className, 'foo', "Class name");
  t.equal(D8.maker('div', { title: 'foo' }, 'Bar')().title, 'foo', "Property");

  t.end();
});
