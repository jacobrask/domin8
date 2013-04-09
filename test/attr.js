var elem = document.getElementById('test-elem');

test("Attributes", function () {
  elem.setAttribute('attr1', 'bar');
  equal(D8.getAttr('attr1', elem), 'bar', "Get attribute");

  equal(D8.getAttr('nosuchattribute', elem), null, "Get nonexistant attribute");

  D8.setAttr('attr2', 'foo', elem);
  equal(elem.getAttribute('attr2'), 'foo', "Set attribute");

  elem.setAttribute('attr3', 'foo');
  D8.setAttr('attr3', null, elem);
  equal(elem.getAttribute('attr3'), null, "Set attribute to null");

  elem.setAttribute('attr4', 'foo');
  D8.setAttr('attr4', false, elem);
  equal(elem.getAttribute('attr4'), null, "Set attribute to false");

  elem.setAttribute('attr5', 'foo');
  D8.removeAttr('attr5', elem);
  equal(elem.getAttribute('attr5'), null, "Remove attribute");
});

test("Regular properties", function () {
  elem.title = 'foo';
  equal(D8.getProp('title', elem), 'foo', "Get property");

  D8.setProp('className', 'bar', elem);
  equal(elem.className, 'bar', "Set property");

  D8.setProp('class', 'foo', elem);
  equal(elem.className, 'foo', "Set aliased property");
  
  D8.setProp('tabindex', 5, elem);
  equal(elem.tabIndex, 5, "Set case sensitive property");
});

test("Nested properties", function () {
  elem.dataset.foo = 'bar';
  equal(D8.get('dataset.foo', elem), 'bar', "Get property");

  D8.setProp('style.width', '10px', elem);
  equal(elem.style.width, '10px', "Set property");
});

test("Smart get/set", function () {
  elem.setAttribute('attr1', 'bar');
  equal(D8.get('attr1', elem), 'bar', "Get attribute");

  equal(D8.get('nosuchattribute', elem), null, "Get nonexistant attribute");

  D8.set('attr2', 'foo', elem);
  equal(elem.getAttribute('attr2'), 'foo', "Set attribute");

  elem.setAttribute('attr3', 'foo');
  D8.set('attr3', null, elem);
  equal(elem.getAttribute('attr3'), null, "Set attribute to null");

  elem.setAttribute('attr4', 'foo');
  D8.set('attr4', false, elem);
  equal(elem.getAttribute('attr4'), null, "Set attribute to false");

  elem.title = 'foo';
  equal(D8.get('title', elem), 'foo', "Get property");

  D8.set('className', 'bar', elem);
  equal(elem.className, 'bar', "Set property");

  D8.set('class', 'foo', elem);
  equal(elem.className, 'foo', "Set aliased property");
});
