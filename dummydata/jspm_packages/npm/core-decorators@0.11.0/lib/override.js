/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
exports['default'] = override;
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
var _privateUtils = require('./private/utils');
var GENERIC_FUNCTION_ERROR = '{child} does not properly override {parent}';
var FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;
var SyntaxErrorReporter = (function() {
  function SyntaxErrorReporter(parentKlass, childKlass, parentDescriptor, childDescriptor) {
    _classCallCheck(this, SyntaxErrorReporter);
    this.parentKlass = parentKlass;
    this.childKlass = childKlass;
    this.parentDescriptor = parentDescriptor;
    this.childDescriptor = childDescriptor;
  }
  _createClass(SyntaxErrorReporter, [{
    key: 'key',
    get: function() {
      return this.childDescriptor.key;
    }
  }, {
    key: 'parentNotation',
    get: function() {
      return '' + this.parentKlass.constructor.name + '#' + this.parentPropertySignature;
    }
  }, {
    key: 'childNotation',
    get: function() {
      return '' + this.childKlass.constructor.name + '#' + this.childPropertySignature;
    }
  }, {
    key: 'parentTopic',
    get: function() {
      return this._getTopic(this.parentDescriptor);
    }
  }, {
    key: 'childTopic',
    get: function() {
      return this._getTopic(this.childDescriptor);
    }
  }, {
    key: '_getTopic',
    value: function _getTopic(descriptor) {
      if (descriptor === undefined) {
        return null;
      }
      if ('value' in descriptor) {
        return descriptor.value;
      }
      if ('get' in descriptor) {
        return descriptor.get;
      }
      if ('set' in descriptor) {
        return descriptor.set;
      }
    }
  }, {
    key: 'parentPropertySignature',
    get: function() {
      return this._extractTopicSignature(this.parentTopic);
    }
  }, {
    key: 'childPropertySignature',
    get: function() {
      return this._extractTopicSignature(this.childTopic);
    }
  }, {
    key: '_extractTopicSignature',
    value: function _extractTopicSignature(topic) {
      switch (typeof topic) {
        case 'function':
          return this._extractFunctionSignature(topic);
        default:
          return this.key;
      }
    }
  }, {
    key: '_extractFunctionSignature',
    value: function _extractFunctionSignature(fn) {
      var _this = this;
      return fn.toString().replace(FUNCTION_REGEXP, function(match, _x, params) {
        var name = arguments[1] === undefined ? _this.key : arguments[1];
        return name + params;
      });
    }
  }, {
    key: 'assert',
    value: function assert(condition) {
      var msg = arguments[1] === undefined ? '' : arguments[1];
      if (condition !== true) {
        this.error(GENERIC_FUNCTION_ERROR + msg);
      }
    }
  }, {
    key: 'error',
    value: function error(msg) {
      var _this2 = this;
      msg = msg.replace('{parent}', function(m) {
        return _this2.parentNotation;
      }).replace('{child}', function(m) {
        return _this2.childNotation;
      });
      throw new SyntaxError(msg);
    }
  }]);
  return SyntaxErrorReporter;
})();
function getDescriptorType(descriptor) {
  if (descriptor.hasOwnProperty('value')) {
    return 'data';
  }
  if (descriptor.hasOwnProperty('get') || descriptor.hasOwnProperty('set')) {
    return 'accessor';
  }
  return 'data';
}
function checkFunctionSignatures(parent, child, reporter) {
  reporter.assert(parent.length === child.length);
}
function checkDataDescriptors(parent, child, reporter) {
  var parentValueType = typeof parent.value;
  var childValueType = typeof child.value;
  if (parentValueType === 'undefined' && childValueType === 'undefined') {
    reporter.error('descriptor values are both undefined. (class properties are are not currently supported)\'');
  }
  if (parentValueType !== childValueType) {
    var isFunctionOverUndefined = childValueType === 'function' && parentValueType === undefined;
    if (isFunctionOverUndefined || parentValueType !== undefined) {
      reporter.error('value types do not match. {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
    }
  }
  switch (childValueType) {
    case 'function':
      checkFunctionSignatures(parent.value, child.value, reporter);
      break;
    default:
      reporter.error('Unexpected error. Please file a bug with: {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
      break;
  }
}
function checkAccessorDescriptors(parent, child, reporter) {
  var parentHasGetter = typeof parent.get === 'function';
  var childHasGetter = typeof child.get === 'function';
  var parentHasSetter = typeof parent.set === 'function';
  var childHasSetter = typeof child.set === 'function';
  if (parentHasGetter || childHasGetter) {
    if (!parentHasGetter && parentHasSetter) {
      reporter.error('{parent} is setter but {child} is getter');
    }
    if (!childHasGetter && childHasSetter) {
      reporter.error('{parent} is getter but {child} is setter');
    }
    checkFunctionSignatures(parent.get, child.get, reporter);
  }
  if (parentHasSetter || childHasSetter) {
    if (!parentHasSetter && parentHasGetter) {
      reporter.error('{parent} is getter but {child} is setter');
    }
    if (!childHasSetter && childHasGetter) {
      reporter.error('{parent} is setter but {child} is getter');
    }
    checkFunctionSignatures(parent.set, child.set, reporter);
  }
}
function checkDescriptors(parent, child, reporter) {
  var parentType = getDescriptorType(parent);
  var childType = getDescriptorType(child);
  if (parentType !== childType) {
    reporter.error('descriptor types do not match. {parent} is "' + parentType + '", {child} is "' + childType + '"');
  }
  switch (childType) {
    case 'data':
      checkDataDescriptors(parent, child, reporter);
      break;
    case 'accessor':
      checkAccessorDescriptors(parent, child, reporter);
      break;
  }
}
var suggestionTransforms = [function(key) {
  return key.toLowerCase();
}, function(key) {
  return key.toUpperCase();
}, function(key) {
  return key + 's';
}, function(key) {
  return key.slice(0, -1);
}, function(key) {
  return key.slice(1, key.length);
}];
function findPossibleAlternatives(superKlass, key) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;
  try {
    for (var _iterator = suggestionTransforms[Symbol.iterator](),
        _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var fn = _step.value;
      var suggestion = fn(key);
      if (suggestion in superKlass) {
        return suggestion;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return null;
}
function handleDescriptor(target, key, descriptor) {
  descriptor.key = key;
  var superKlass = Object.getPrototypeOf(target);
  var superDescriptor = Object.getOwnPropertyDescriptor(superKlass, key);
  var reporter = new SyntaxErrorReporter(superKlass, target, superDescriptor, descriptor);
  if (superDescriptor === undefined) {
    var suggestedKey = findPossibleAlternatives(superKlass, key);
    var suggestion = suggestedKey ? '\n\n  Did you mean "' + suggestedKey + '"?' : '';
    reporter.error('No descriptor matching {child} was found on the prototype chain.' + suggestion);
  }
  checkDescriptors(superDescriptor, descriptor, reporter);
  return descriptor;
}
function override() {
  for (var _len = arguments.length,
      args = Array(_len),
      _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return (0, _privateUtils.decorate)(handleDescriptor, args);
}
module.exports = exports['default'];
