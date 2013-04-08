# Domin8 JavaScript DOM manipulation library

Both the native DOM APIs and most libraries such as jQuery use an
Object Oriented style which make them inconvenient to use together with
concepts from *Functional Programming*, like function composition, currying
and partial application.

Domin8's functions are more suitable for this, and also work very well
together with iteration functions such as `forEach`, `map` and `reduce`.

All functions are curried, which means that if they are called without all
required arguments, they return a new function accepting the remaining
arguments.

This lets you do things like:

```JavaScript
D8.removeClass('highlight', elem);

var removeHighlight = D8.removeClass('highlight');
map(elems, removeHighlight);

var deactive = compose(removeHighlight, D8.setText("Inactive"));
deactivate(elem);

```

# API

## Attributes and properties

### `D8.getAttr(attr, elem)`*

### `D8.setAttr(attr, val, elem)`

### `D8.getProp(prop, obj)`

Property access can be nested: `D8.getProp('style.background')`

### `D8.setProp(prop, val, obj)`

Property assignment can be nested: `D8.setProp('dataset.foo', 'bar')`

### `D8.removeAttr(attr)`

### `D8.getHtml(elem)`

### `D8.setHtml(elem, html)`

### `D8.getText(elem)`

### `D8.setText(elem, text)`

### `D8.getValue(elem)`

### `D8.setValue(val, elem)`

### `D8.getData(key, elem)`

### `D8.setData(key, val, elem)`

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

### `D8.matches(selector, elem)`

Does `elem` match `selector`?

### `D8.has(selector, elem)`

Does `elem` have a child matching `selector`?

### `D8.contains(child, parent)`

### `D8.containedBy(parent, child)`

### `D8.find(selector, elem)`

Return all `elem`'s children matching `selector`.

### `D8.findIn(elem, selector)`

### `D8.next(elem)`

### `D8.prev(elem)`

### `D8.parent(elem)`

### `D8.childrenOf(elem[, selector])`

Return immediate children of `elem`, optionally matching `selector`.

### `D8.parentsOf(elem[, selector])`

Return parents of `elem`, optionally matching `selector`.


## Style

### `D8.getStyle(prop, elem)`

### `D8.setStyle(prop, val, elem)`

### `D8.hide(elem)`

### `D8.show(elem)`
