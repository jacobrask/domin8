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

```
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

 * **name** String - The property or attribute to access. Can be nested with a dot: `style.background`.
 * **target** Node


### D8.set(name, value, target) & D8.setOn(target, name, value)

Returns **Node** (target)

Sets a property or an attribute. Treats `name` as an attribute unless `target` is a non-Element Node, or `name` is in a list of known Element direct properties.

 * **name** String - The property or attribute to access. Can be nested with a dot: `style.background`.
 * **value** Anything
 * **target** Node


### D8.getAttr(attr, target) & D8.getAttrFrom(target, attr)

Returns **String**

 * **attr** String
 * **target** Element


### D8.setAttr(attr, value, target) & D8.setAttrOn(target, attr, value)

Returns **Element** (target)

 * **name** String
 * **value** String
 * **target** Element


### D8.removeAttr(attr, target) & D8.removeAttrFrom(target, attr)

Returns **Element** (target)

 * **attr** String
 * **target** Element
 

### D8.getProp(name, target) & D8.getPropFrom(target, name)

Returns **Anything**

 * **name** String - Can be nested with a dot: `firstChild.tagName`.
 * **target** Node


### D8.setProp(name, value, target) & D8.setPropOn(target, name, value)

Returns **Node** (target)

 * **name** String - Can be nested with a dot: `style.background`.
 * **value** Anything
 * **target** Node


### D8.getHtml(target) & D8.getHtmlFrom(target)

Returns **String**

 * **target** Element


### D8.setHtml(html, target) & D8.setHtmlOn(target, html)

Returns **Element** (target)

 * **html** String
 * **target** Element


### D8.getText(target) & D8.getTextFrom(target)

Returns **String**

 * **target** Node


### D8.setText(text, target) & D8.setTextOn(target, text)

Returns **Element**

 * **text** String
 * **target** Node


### D8.getValue(target) & D8.getValueFrom(target)

Returns **String**

 * **target** Element


### D8.setValue(value, target) & D8.setValueOn(target, value)

Returns **Element**

 * **value** String
 * **target** Element


### D8.getData(key, target) & D8.getDataFrom(target, key)

Returns **String**

Wraps the HTML5 data API, and fallbacks to data attributes for unsupporting browsers.

 * **key** String - camelCased dataset key.
 * **target** Element


### D8.setData(key, value, ref) & D8.setDataOn(target, key, value)

Returns **Element** (target)

Wraps the HTML5 data API, and fallbacks to data attributes for unsupporting browsers.

 * **key** String - camelCased dataset key.
 * **value** String
 * **target** Element


### D8.addClass(className, target) & D8.addClassTo(target, className)

Returns **Element** (target)

 * **className** String
 * **target** Element 


### D8.removeClass(className, target) & D8.removeClassFrom(target, className)

Returns **Element** (target)

 * **className** String
 * **target** Element 


### D8.toggleClass(className, target) & D8.toggleClassOn(target, className)

Returns **Element** (target)

#### Parameters

 * **className** String
 * **target** Element 


### D8.hasClass(condition, elem) & D8.hasClassOn(target, condition)

Returns **Boolean**

 * **condition** String | Function | RegExp - Tests if any of the element's class names match the condition.
 * **target** Element 



## Manipulation

If `content` is a string, it will be converted to a text node, automatically
escaping all HTML. Functions will be evaluated. Content can be inside Arrays,
NodeLists or HTMLCollections.


### D8.after(content, reference) & D8.insertAfter(reference, content)

Returns **Element** (reference)

Insert `content` after `reference`. 

 * **content** Node | String | Function | [Node] | [String] | [Function]
 * **reference** Element 


### D8.before(content, reference) & D8.insertBefore(reference, content)

Returns **Element** (reference)

Insert `content` before `reference`

 * **content** Node | String | Function | [Node] | [String] | [Function]
 * **reference** Element 


### D8.prepend(content, reference) & D8.prependTo(reference, content)

Returns **Element** (reference)

Insert `content` before `reference`

 * **content** Node | String | Function | [Node] | [String] | [Function]
 * **reference** Element 


### D8.append(content, reference) D8.appendTo(reference, content)

Returns **Element** (reference)

Insert `content` before `reference`

 * **content** Node | String | Function | [Node] | [String] | [Function]
 * **reference** Element 


### D8.replace(reference, content) & D8.replaceWith(content, reference)

Returns **Element** (reference)

Replace `reference` with `content`

 * **content** Node | String | Function | [Node] | [String] | [Function]
 * **reference** Element 


### D8.clone(elem[, shallow])

Returns **Element**

Clone an element.

 * **elem** Element
 * **shallow** (optional) Boolean - Don't include child nodes.


### D8.cloner(elem[, shallow])

Returns **Function**

A function that clones `elem` every time it is called.

 * **elem** Element
 * **shallow** (optional) Boolean - Don't include child nodes.

```
var lis = D8.find('li', menu);
var icon = D8.make('i');
lis.map(D8.append(D8.cloner(icon)));
```


### D8.remove(elem)

Returns **Element**

Remove an element from the DOM.

 * **elem** Element



## Traversal

`condition` can be either a CSS selector, an Element or a test function.


### D8.matches(elem, condition) & D8.matchedBy(condition, elem)

Returns: **Boolean*

 * **elem** Element
 * **condition** String | Element | Function

```
D8.matches(function (el) { return el.tagName === 'BODY'), document.body);
// => true
```


### D8.find(condition[, parent]) & D8.findIn(parent, condition)

Returns **[ Element ]**

 * **parent** (optional) Element - defaults to `document`
 * **condition** String | Element | Function


### D8.findOne(condition[, parent]) & D8.findOneIn(parent, condition)

Returns **Element**

 * **parent** (optional) Element - defaults to `document`
 * **condition** String | Element | Function


### D8.findByTag(tagName[, parent]) & D8.findByTagIn(parent, tagName)

Returns **[ Element ]**

 * **parent** (optional) Element - defaults to `document`
 * **tagName** String


### D8.findByClass(className[, parent]) & D8.findByClassIn(parent, className)

Returns **[ Element ]**

 * **parent** (optional) Element - defaults to `document`
 * **className** String


### D8.contains(condition, parent)

Returns: **Boolean**

 * **parent** Element
 * **condition** String | Element | Function


### D8.next(reference)

Returns **Element**

Next Element sibling.

 * **reference** Element


### D8.prev(reference)

Returns **Element**

Previous Element sibling.

 * **reference** Element


### D8.childrenOf(parent[, condition])

Returns **[ Element ]**

Immediate children of `parent`, optionally matching `condition`.

 * **parent** Element
 * **condition** (optional) String | Element | Function


### D8.parentsOf(elem[, condition])

Returns **[ Element ]**

All parents of `elem`, optionally filtered by `condition`.

 * **elem** Element
 * **condition** (optional) String | Element | Function


### D8.parentOf(elem[, condition])

Returns **Element**

First parent of `elem`. If `condition` is given, returns the first
parent matching `condition`, if any.

 * **elem** Element
 * **condition** (optional) String | Element | Function


### D8.containedBy(condition, child)

Returns: **Boolean**

 * **child** Element
 * **condition** String | Element | Function

```
var imageLinks = images.filter(D8.containedBy('a'));
```


## Element creation

### D8.make(tag[, properties, content])

Returns **Element**

 * **tag** String - Tag name and optionally ID and class name: `tagName#id.class1.class2`
 * **properties** (optional) Object - Properties and attributes to set on the new element.
 * **content** (optional) Node | String | Function | [Node] | [String] | [Function] - Nodes, text strings (or functions returning these) to append to the new element.

```
D8.make('a.big', { tabIndex: -1, href: '#', 'style.color': 'red' }, "Link text");
// => <a href="#" tabindex="-1" class="big" style="color:red">Link text</a>
```

### D8.maker(tag[, properties, children])

Returns **Function**

Creates a new element from the given arguments every time it is called.


## Style

### D8.getStyle(property, elem) & D8.getStyleFrom(elem, property)

Returns **String**

 * **property** String - CSS Property

 * **elem** Element


### D8.setStyle(property, value, elem) & D8.setStyleFrom(elem, value, property)

Returns **Element** (elem)

 * **property** String - CSS Property

 * **value** String - For position and dimension properties, the `px` unit will be assumed.

 * **elem** Element


### D8.hide(elem)

Returns **Element** (elem)

Shorthand for `D8.setStyle('display', 'none')`


### D8.show(elem)

Returns **Element** (elem)

Shorthand for `D8.setStyle('display', 'block')`
