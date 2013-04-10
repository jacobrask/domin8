# DOMin8 JavaScript DOM manipulation library

Both the native DOM APIs and most libraries such as jQuery use an
Object Oriented style which make them inconvenient to use together with
concepts from *Functional Programming*, like function composition, currying
and partial application.

Domin8's functions are more suitable for this, and also work very well
together with iteration functions such as `forEach`, `map` and `reduce`.

All functions are curried (or "automatically partially applied" if you wish),
which means that if they are called without all required arguments, they
return a new function accepting the remaining arguments.

This lets you do things like:

```JavaScript
D8.removeClass('highlight', elem);

var removeHighlight = D8.removeClass('highlight');
map(elems, removeHighlight);

var deactive = compose(removeHighlight, D8.setText("Inactive"));
deactivate(elem);

```

Domin8 is currently not tested in many browsers, but the goal is compatibility
with the two latest versions of major browsers.

# API

## Attributes and properties

### `D8.get(prop, elem)`

Returns the property value for known element properties, otherwise the attribute.
Property access can be nested: `D8.get('style.background')`

### `D8.set(prop, val, elem)`

Sets the property value for known element properties, otherwise the attribute.
Property assignment can be nested: `D8.set('style.background')`

### `D8.getAttr(attr, elem)`

### `D8.setAttr(attr, val, elem)`

### `D8.removeAttr(attr)`

### `D8.getProp(prop, obj)`

### `D8.setProp(prop, val, obj)`

### `D8.getHtml(elem)`

### `D8.setHtml(elem, html)`

### `D8.getText(elem)`

### `D8.setText(elem, text)`

### `D8.getValue(elem)`

### `D8.setValue(val, elem)`

### `D8.getData(key, elem)`

### `D8.setData(key, data, elem)`

### `D8.addClass(className, elem)`

### `D8.removeClass(className, elem)`

### `D8.toggleClass(className, elem)`

### `D8.hasClass(className, elem)`



## Manipulation

### `D8.after(content, elem)`

Insert `content` after `elem`

### `D8.insertAfter(elem, content)`

After `elem`, insert `content`.

### `D8.before(content, elem)`

Insert `content` before `elem`

### `D8.insertBefore(elem, content)`

Before `elem`, insert `content`.

### `D8.prepend(content, elem)`

Prepend `content` to `elem`.

### `D8.prependTo(elem, content)`

To `elem`, prepend `content`.

### `D8.append(content, elem)`

Append `content` to `elem`.

### `D8.appendTo(elem, content)`

To `elem`, append `content`.

### `D8.replace(oldElem, newContent)`

### `D8.replaceWith(newContent, oldElem)`

### `D8.clone(elem[, shallow])`

Clone an element.

### `D8.remove(elem)`

Remove an element from the DOM.
 

## Traversal

`condition` can be either a CSS selector, an HTML element or a test function.

### `D8.matches(condition, elem)`

Returns: *`Boolean`*

### `D8.contains(condition, parent)`

Returns: *`Boolean`*

### `D8.containedBy(condition, child)`

Returns: *`Boolean`*

### `D8.find(condition, elem)`

Returns *`Array`*

### `D8.findIn(elem, condition)`

Returns *`Array`*

### `D8.findOne(condition, elem)`

Returns *`Element`*

### `D8.findOneIn(elem, condition)`

Returns *`Element`*

### `D8.findByTag(tagName, elem)`

Returns *`Array`*

### `D8.findByTagIn(tagName, elem)`

Returns *`Array`*

### `D8.findByClass(className, elem)`

Returns *`Array`*

### `D8.findByClassIn(className, elem)`

Returns *`Array`*

### `D8.next(elem)`

Returns *`Element`*

### `D8.prev(elem)`

Returns *`Element`*

### `D8.parent(elem)`

Returns *`Element`*

### `D8.childrenOf(elem[, condition])`

Returns *`Array`*

Immediate children of `elem`, optionally matching `condition`.

### `D8.parentsOf(elem[, condition])`

All parents of `elem`, optionally matching `condition`.

Returns *`Array`*

## Element creation

### `D8.make(tag, props, children)`

 * `tag` is a string with an optional ID and class names: `tagname#id.class1.class2`
 * `props` is an object with properties and attributes to set on the new element.
 * `children` is an array of DOM nodes or text strings to append to the new element.


## Style

### `D8.getStyle(prop, elem)`

### `D8.setStyle(prop, val, elem)`

### `D8.hide(elem)`

### `D8.show(elem)`
