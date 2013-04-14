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

### D8.get(name, target) & D8.getFrom(target, name)

Returns **Anything**

Gets a property or an attribute. Treats `name` as an attribute unless `target` is a non-Element Node, or `name` is in a list of known Element direct properties.

#### Parameters

 * **name** String - The property or attribute to access. Can be nested with a dot: `style.background`.

 * **target** Node


### D8.set(name, value, target) & D8.setOn(target, name, value)

Returns **Node** (target)

Sets a property or an attribute. Treats `name` as an attribute unless `target` is a non-Element Node, or `name` is in a list of known Element direct properties.

#### Parameters

 * **name** String - The property or attribute to access. Can be nested with a dot: `style.background`.

 * **value** Anything

 * **target** Node


### D8.getAttr(attr, target) & D8.getAttrFrom(target, attr)

Returns **String**

#### Parameters

 * **attr** String

 * **target** Element


### D8.setAttr(attr, value, target) & D8.setAttrOn(target, attr, value)

Returns **Element** (target)

#### Parameters

 * **name** String

 * **value** String

 * **target** Element


### D8.removeAttr(attr, target) & D8.removeAttrFrom(target, attr)

Returns **Element** (target)

#### Parameters

 * **attr** String

 * **target** Element
 

### D8.getProp(name, target) & D8.getPropFrom(target, name)

Returns **Anything**

#### Parameters

 * **name** String - Can be nested with a dot: `firstChild.tagName`.

 * **target** Node


### D8.setProp(name, value, target) & D8.setPropOn(target, name, value)

Returns **Node** (target)

#### Parameters

 * **name** String - Can be nested with a dot: `style.background`.

 * **value** Anything

 * **target** Node


### D8.getHtml(target) & D8.getHtmlFrom(target)

Returns **String**

#### Parameters

 * **target** Element


### D8.setHtml(html, target) & D8.setHtmlOn(target, html)

Returns **Element** (target)

#### Parameters

 * **html** String

 * **target** Element


### D8.getText(target) & D8.getTextFrom(target)

Returns **String**

#### Parameters

 * **target** Node


### D8.setText(text, target) & D8.setTextOn(target, text)

Returns **Element**

#### Parameters

 * **text** String

 * **target** Node


### D8.getValue(target) & D8.getValueFrom(target)

Returns **String**

#### Parameters

 * **target** Element


### D8.setValue(value, target) & D8.setValueOn(target, value)

Returns **Element**

#### Parameters

 * **value** String

 * **target** Element


### D8.getData(key, target) & D8.getDataFrom(target, key)

Returns **String**

Wraps the HTML5 data API, and fallbacks to data attributes for unsupporting browsers.

#### Parameters

 * **key** String - camelCased dataset key.

 * **target** Element


### D8.setData(key, value, ref) & D8.setDataOn(target, key, value)

Returns **Element** (target)

Wraps the HTML5 data API, and fallbacks to data attributes for unsupporting browsers.

#### Parameters

 * **key** String - camelCased dataset key.
 
 * **value** String

 * **target** Element


### D8.addClass(className, target) & D8.addClassTo(target, className)

Returns **Element** (target)

#### Parameters

 * **className** String

 * **target** Element 


### D8.removeClass(className, target) & D8.removeClassFrom(target, className)

Returns **Element** (target)

#### Parameters

 * **className** String

 * **target** Element 


### D8.toggleClass(className, target) & D8.toggleClassOn(target, className)

Returns **Element** (target)

#### Parameters

 * **className** String

 * **target** Element 


### D8.hasClass(className, elem) & D8.hasClassOn(target, className)

Returns **Boolean**

#### Parameters

 * **className** String

 * **target** Element 


## Manipulation

### `D8.after(content, reference)` & D8.insertAfter(reference, content)

Insert `content` after `reference`

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

### `D8.cloner(elem[, shallow])`

Return a function which clones `elem` every time it is called.

### `D8.remove(elem)`

Remove an element from the DOM.
 

## Traversal

`condition` can be either a CSS selector, an HTML element or a test function.

### `D8.matches(condition, elem)`

Returns: **`Boolean`*

### `D8.contains(condition, parent)`

Returns: **`Boolean`*

### `D8.containedBy(condition, child)`

Returns **`Boolean`**

### D8.find(condition, elem) & D8.findIn(elem, condition)

Returns **`Array`**

### D8.findOne(condition, elem) & D8.findOneIn(elem, condition)

Returns **`Element`**

### `D8.findByTag(tagName, elem)`

Returns **`Array`**

### `D8.findByTagIn(tagName, elem)`

Returns **`Array`**

### `D8.findByClass(className, elem)`

Returns **`Array`**

### `D8.findByClassIn(className, elem)`

Returns **`Array`**

### `D8.next(elem)`

Returns **`Element`**

### `D8.prev(elem)`

Returns **`Element`**

### `D8.childrenOf(elem[, condition])`

Returns **`Array`**

Immediate children of `elem`, optionally matching `condition`.

### `D8.parentOf(elem)`

Returns **`Element`**

### `D8.parentsOf(elem[, condition])`

All parents of `elem`, optionally matching `condition`.

Returns **`Array`**

## Element creation

### `D8.make(tag, props, children)`

Returns **`Element`**

 * `tag` is a string with an optional ID and class names: `tagname#id.class1.class2`
 * `props` is an object with properties and attributes to set on the new element.
 * `children` is an array of DOM nodes or text strings to append to the new element.

### `D8.maker(tag, props, children)`

Returns **Function** creating a new element every time it is called.

## Style

### `D8.getStyle(prop, elem)`

### `D8.setStyle(prop, val, elem)`

### `D8.hide(elem)`

### `D8.show(elem)`
