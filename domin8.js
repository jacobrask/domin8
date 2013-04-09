/* domin8.js 0.0.2
   (c) 2013 Jacob Rask
   DOMin8 may be freely distributed under the MIT license. */

(function () {

var D8 = window.D8 = {};

// Internal helpers
// ================

var ArrayProto = Array.prototype;
var slice = ArrayProto.slice;
var isArray = Array.isArray;
var isString = function (obj) { return obj && typeof obj == 'string'; };
var isElement = function (obj) { return obj && obj.nodeType === 1; };

var matchesSelector = (function () {
  var props = [ 'matches', 'webkitMatchesSelector', 'mozMatchesSelector',
                'msMatchesSelector', 'oMatchesSelector' ];
  for (var i = 0; i < props.length; i++) {
    if (HTMLElement.prototype[props[i]]) return props[i];
  }
})();

// Accept an element, a function or a string and return an HTML Node
var elementify = function (obj) {
  if (typeof obj == 'function') obj = obj();
  if (isString(obj)) obj = document.createTextNode(obj);
  if (obj == null || isNaN(obj.nodeType)) throw new TypeError();
  return obj;
};

// Returns new functions until all arguments (fn.length or fnLength) are filled
var curry = function (fn, fnLength /*, args */) {
  var origArgs = slice.call(arguments, 2);
  fnLength || (fnLength = fn.length);
  return function () {
    var args = origArgs.concat(slice.call(arguments));
    return args.length < fnLength
      ? curry.apply(this, [ fn, fnLength ].concat(args))
      : fn.apply(this, args);
  };
};

// Flip the argument order of a function
var flip = function (fn) {
  return function () {
    var args = slice.call(arguments);
    if (fn.length > 0) args = args.splice(0, fn.length);
    args = args.reverse();
    return fn.apply(this, args);
  };
};

var toDashCase = function (str) {
  return str.replace(/([A-Z])/g, function (letter) {
    return '-' + letter.toLowerCase();
  });
};


// Properties and attributes
// =========================

(function () {

// Properties that should be set directly and not as attributes.
// Also used as map for case insensitive property names and for aliases
// Some of these can probably be removed and fall back to attributes
var propFix = "acceptCharset,accessKey,attributes,autocomplete,autofocus,autoplay,buffered,cellIndex,cellPadding,cellSpacing,cells,challenge,checked,childElementCount,childNodes,children,classList,className,clear,clientHeight,clientLeft,clientTop,clientWidth,colSpan,cols,compact,complete,content,contentDocument,contentEditable,contentWindow,control,controller,controls,coords,crossOrigin,currentSrc,currentTime,data,dataset,dateTime,declare,default,defaultChecked,defaultMuted,defaultPlaybackRate,defaultSelected,defaultValue,dirName,disabled,download,draggable,duration,elements,encoding,enctype,ended,error,event,files,firstChild,firstElementChild,form,formAction,formEnctype,formMethod,formNoValidate,formTarget,frame,frameBorder,hash,headers,height,hidden,high,host,hostname,htmlFor,httpEquiv,incremental,indeterminate,index,initialTime,innerHTML,innerText,isContentEditable,isMap,keytype,kind,label,labels,lastChild,lastElementChild,length,link,list,localName,longDesc,loop,low,max,maxLength,media,mediaGroup,multiple,muted,namespaceURI,naturalHeight,naturalWidth,networkState,nextElementSibling,nextSibling,noHref,noShade,noValidate,noWrap,nodeName,nodeType,nodeValue,nonce,offsetHeight,offsetLeft,offsetParent,offsetTop,offsetWidth,open,optimum,options,origin,outerHTML,outerText,ownerDocument,parentElement,parentNode,pathname,paused,ping,playbackRate,played,port,position,poster,prefix,preload,previousElementSibling,previousSibling,profile,protocol,readOnly,readyState,required,reversed,rowIndex,rowSpan,rows,rules,sandbox,scheme,scope,scrollHeight,scrollLeft,scrollTop,scrollWidth,scrolling,seamless,search,sectionRowIndex,seekable,seeking,selected,selectedIndex,selectedOptions,selectionDirection,selectionEnd,selectionStart,shape,sheet,size,sizes,span,standby,start,startTime,step,style,summary,tabIndex,tagName,text,textContent,textLength,textTracks,track,translate,type,useMap,validationMessage,validity,value,valueAsDate,valueAsNumber,valueType,version,videoHeight,videoWidth,volume,width,willValidate,wrap,x,y"
  .split(',').reduce(function (map, key) {
    map[key.toLowerCase()] = key;
    return map;
  }, {});

// Aliases for common shorthands/mistakes
var aliasedProps = {
  'class': 'className', 'for': 'htmlFor', 'html': 'innerHTML', 'text': 'textContent' };
for (var key in aliasedProps) {
  propFix[key] = aliasedProps[key];
}

function attrOrProp (obj, name, val) {
  if ((/\./).test(name)) return prop(obj, name, val);
  var direct = propFix[name.toLowerCase()];
  if (direct) return prop(obj, direct, val, true);
  else return attr(obj, name, val);
};

D8.get = curry(function (name, elem) {
  return attrOrProp(elem, name);
});
D8.set = curry(function (name, val, elem) {
  return attrOrProp(elem, name, val);
});



// Attributes
// ----------

function attr (elem, name, val) {
  if (name == null || !isElement(elem)) return;
  name = name.toLowerCase();
  if (typeof val === 'undefined') {
    return elem.getAttribute(name);
  }
  if (val === false || val === null) {
    elem.removeAttribute(name);
  } else {
    elem.setAttribute(name, val + "");
  }
  return elem;
};
D8.getAttr = curry(function (name, elem) {
  return attr(elem, name);
});
D8.removeAttr = curry(function (name, elem) {
  return attr(elem, name, false);
});
D8.setAttr = curry(function (name, val, elem) {
  return attr(elem, name, val);
});


// Properties
// ----------

function prop (obj, name, val, isNormalized) {
  if (obj == null || name == null) return;

  // Nested property access/assignment with .
  name = name.split('.');
  while (name.length > 1) obj = prop(obj, name.shift());

  name = name[0];
  if (!isNormalized) name = propFix[name.toLowerCase()] || name;

  // Get
  if (typeof val === 'undefined') {
    return obj[name];
  }
  // Set
  obj[name] = val;
  return obj;
};

D8.getProp = curry(function (name, obj) {
  return prop(obj, name);
});
D8.setProp = curry(function (name, val, obj) {
  return prop(obj, name, val);
});

D8.getHtml = D8.getProp('innerHTML');
D8.setHtml = D8.setProp('innerHTML');
D8.getText = D8.getProp('textContent');
D8.setText = D8.setProp('textContent');
D8.getValue = D8.getProp('value');
D8.setValue = D8.setProp('value');
D8.getData = curry(function (key, elem) {
  if (elem.datalist) {
    return D8.getProp('datalist.' + key, elem);
  } else {
    return D8.getAttr('data-' + toDashCase(key), elem);
  }
});
D8.setData = curry(function (key, val, elem) {
  if (elem.datalist) {
    D8.setProp('datalist.' + key, val, elem);
  } else {
    D8.setAttr('data-' + key, toDashCase(val), elem);
  }
  return elem;
});

D8.addClass = curry(function (className, elem) {
  elem.classList.add(className);
  return elem;
});
D8.removeClass = curry(function (className, elem) {
  elem.classList.remove(className);
  return elem;
});
D8.toggleClass = curry(function (className, elem) {
  elem.classList.toggle(className);
  return elem;
});
D8.hasClass = curry(function (className, elem) {
  return elem.classList.contains(className);
});

})();


// Manipulation

var after = function (content, elem) {
  content = elementify(content);
  elem.parentNode.insertBefore(content, elem.nextSibling); 
  return elem;
};
D8.after = curry(after);
D8.insertAfter = curry(flip(after), 2);

var before = function (content, elem) {
  content = elementify(content);
  elem.parentNode.insertBefore(content, elem); 
  return elem;
};
D8.before = curry(before);
D8.insertBefore = curry(flip(before), 2);

var prepend = curry(function (content, elem) {
  content = elementify(content);
  elem.insertBefore(content, elem.firstChild); 
  return elem;
});
D8.prepend = curry(prepend);
D8.prependTo = curry(flip(prepend), 2);

var append = function (content, elem) {
  content = elementify(content);
  elem.appendChild(content);
  return elem;
};
D8.append = curry(append);
D8.appendTo = curry(flip(append), 2);

var replace = function (oldElem, newContent) {
  newContent = elementify(newContent);
  oldElem.parentNode.replaceChild(oldElem, newContent);
  return oldElem;
};
D8.replace = curry(replace);
D8.replaceWith = curry(flip(replace), 2);

D8.clone = curry(function (elem, shallow) {
  return elem.cloneNode(!shallow);
}, 1);
D8.remove = curry(function (elem) {
  return elem.parentNode.removeChild(elem);
});


// Traversal

D8.matches = curry(function (sel, elem) {
  return elem[matchesSelector](sel);
});
D8.has = curry(function (sel, elem) {
  return !!elem.querySelector(sel);
});

var contains = function (child, parent) {
  return parent.contains(child);
};
D8.contains = curry(contains);
D8.containedBy = curry(flip(D8.contains), 2);

var find = function (sel, elem) {
  return elem.querySelectorAll(sel);
};
D8.find = curry(find);
D8.findIn = curry(flip(find), 2);

var findOne = function (sel, elem) {
  return elem.querySelector(sel);
};
D8.findOne = curry(findOne);
D8.findOneIn = curry(flip(findOne), 2);

var findByTag = function (tag, elem) {
  return elem.getElementsByTagName(tag);
};
D8.findByTag = curry(findByTag);
D8.findByTagIn = curry(flip(findByTag), 2);

var findByClass = function (className, elem) {
  return elem.getElementsByClassName(className);
};
D8.findByClass = curry(findByClass);
D8.findByClassIn = curry(flip(findByClass), 2);


D8.next = D8.getProp('nextElementSibling');
D8.prev = D8.getProp('previousElementSibling');
D8.parent = D8.getProp('parentNode');
D8.childrenOf = curry(function (elem, sel) {
  if (sel == null) return elem.children;
  return slice.call(elem.children).filter(D8.matches(sel));
}, 1);
D8.parentsOf = curry(function (elem, sel) {
  var parents = [];
  while (elem = elem.parentNode) {
    if (sel == null || (elem[matchesSelector] && elem[matchesSelector](sel))) {
      parents[parents.length] = elem;
    }
  }
  return parents;
}, 1);



// Element creation

D8.make = function (tag, props, children) {
  if (isArray(props)) {
    children = props;
    props = {};
  }
  props || (props = {});
  if (isString(tag) && (/(#|\.)/).test(tag)) {
    var parts = tag.split(/(#|\.)/);
    tag = parts[0];
    for (var i = 1, j = 2, name; j < parts.length; i += 2, j += 2) {
      name = parts[j];
      if (parts[i] === '#') props.id = name;
      else props.className = props.className ? props.className + ' ' + name : name;
    }
  }
  tag || (tag = 'div');
  var elem = isElement(tag) ? tag : document.createElement(tag);
  for (var prop in props) D8.set(prop, props[prop], elem);
  if (isArray(children)) children.forEach(D8.appendTo(elem));
  return elem;
};



// Style

D8.getStyle = curry(function (prop, elem) {
  return elem.ownerDocument.defaultView.getComputedStyle(elem)[prop];
});
D8.setStyle = curry(function (prop, val, elem) {
  D8.setProp('style.' + prop, val, elem);
  return elem;
});
D8.hide = D8.setStyle('display', 'none');
D8.show = D8.setStyle('display', 'block');

})();
