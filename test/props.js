test("Attributes", function () {
  var elem = document.getElementById('test-elem');
  elem.setAttribute('attr1', 'bar');
  equal(D8.getAttr('attr1', elem), 'bar', "Get attribute");
  equal(D8.getAttr('attr1')(elem), 'bar', "Get attribute (curried)");

  ok(D8.hasAttr('attr1', elem), "Has attribute");
  ok(D8.hasAttr('attr1')(elem), "Has attribute (curried)");

  ok(!D8.hasAttr('nosuchattribute', elem), "Has attribute");
  equal(D8.getAttr('nosuchattribute', elem), null, "Get nonexistant attribute");

  D8.setAttr('attr2', 'foo', elem);
  equal(elem.getAttribute('attr2'), 'foo', "Set attribute");
  D8.setAttr('attr3', 'foo')(elem);
  equal(elem.getAttribute('attr3'), 'foo', "Set attribute (curried)");

  elem.setAttribute('attr4', 'foo');
  D8.setAttr('attr4', null, elem);
  equal(elem.getAttribute('attr4'), null, "Set attribute to null");

  elem.setAttribute('attr5', 'foo');
  D8.setAttr('attr5', false, elem);
  equal(elem.getAttribute('attr5'), null, "Set attribute to false");

  elem.setAttribute('attr6', 'foo');
  D8.removeAttr('attr6', elem);
  equal(elem.getAttribute('attr6'), null, "Remove attribute");

  elem.setAttribute('attr7', 'foo');
  D8.removeAttr('attr7')(elem);
  equal(elem.getAttribute('attr7'), null, "Remove attribute (curried)");
});

test("Regular properties", function () {
  var elem = document.getElementById('test-elem');
  elem.title = 'foo';
  equal(D8.getProp('title', elem), 'foo', "Get property");
  equal(D8.getProp('title')(elem), 'foo', "Get property (curried)");

  D8.setProp('className', 'bar', elem);
  equal(elem.className, 'bar', "Set property");

  D8.setProp('className', 'baz')(elem);
  equal(elem.className, 'baz', "Set property (curried)");

  D8.setProp('class', 'foo', elem);
  equal(elem.className, 'foo', "Set aliased property");
  
  D8.setProp('tabindex', 5, elem);
  equal(elem.tabIndex, 5, "Set case sensitive property");
});

test("Nested properties", function () {
  var elem = document.getElementById('test-elem');
  elem.dataset.foo = 'bar';
  equal(D8.getProp('dataset.foo', elem), 'bar', "Get property");

  D8.setProp('style.width', '10px', elem);
  equal(elem.style.width, '10px', "Set property");
});

test("Smart get/set", function () {
  var elem = document.getElementById('test-elem');
  elem.setAttribute('attr1', 'bar');
  equal(D8.get('attr1', elem), 'bar', "Get attribute");
  equal(D8.get('attr1')(elem), 'bar', "Get attribute (curried)");

  equal(D8.get('tagName', elem), 'DIV', "Get property");
  equal(D8.get('tagName')(elem), 'DIV', "Get property (curried)");

  equal(D8.get('nosuchattribute', elem), null, "Get nonexistant attribute");

  D8.set('attr2', 'foo', elem);
  equal(elem.getAttribute('attr2'), 'foo', "Set attribute");
  D8.set('attr3', 'foo')(elem);
  equal(elem.getAttribute('attr3'), 'foo', "Set attribute (curried)");

  D8.set('className', 'bar', elem);
  equal(elem.className, 'bar', "Set property");
  D8.set('className', 'baz')(elem);
  equal(elem.className, 'baz', "Set property (curried)");

  D8.set('class', 'foo', elem);
  equal(elem.className, 'foo', "Set aliased property");
});

test("Property shorthands", function () {
  var elem = document.getElementById('test-elem');
  equal(D8.getHtml(elem), '\n      <p>Text <b>html</b></p>\n      <p>\n    </p>', "Get HTML");
  equal(D8.getText(elem), '\n      Text html\n      \n    ', "Get text");
  D8.setHtml('<b>', elem);
  equal(elem.innerHTML, '<b></b>', "Set HTML");
  D8.setText('<b>', elem);
  equal(elem.textContent, '<b>', "Set text");
  equal(elem.innerHTML, '&lt;b&gt;', "Set text");

  var input = document.getElementById('qunit-fixture').getElementsByTagName('input')[0];
  input.value = "foo";
  equal(D8.getValue(input), 'foo', "Get value");
  D8.setValue('bar', input);
  equal(input.value, 'bar', "Set value");
});
