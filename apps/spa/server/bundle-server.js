(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		7: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + chunkId + ".bundle-server.js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncatched error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using System.import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
  * vue-class-component v5.0.2
  * (c) 2015-2017 Evan You
  * @license MIT
  */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(__webpack_require__(0));

function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    Component.prototype._init = function () {
        var _this = this;
        var keys = Object.getOwnPropertyNames(vm);
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { return vm[key] = value; }
                });
            }
        });
    };
    var data = new Component();
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (process.env.NODE_ENV !== 'production') {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render'
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        }
        else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
    }
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    return Super.extend(options);
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
(function (Component) {
    function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    }
    Component.registerHooks = registerHooks;
})(Component || (Component = {}));
var Component$1 = Component;

exports['default'] = Component$1;
exports.createDecorator = createDecorator;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapActions; });
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v2.4.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

function assertRawModule (path, rawModule) {
  ['getters', 'actions', 'mutations'].forEach(function (key) {
    if (!rawModule[key]) { return }

    forEachValue(rawModule[key], function (value, type) {
      assert(
        typeof value === 'function',
        makeAssertionMessage(path, key, type, value)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value) {
  var buf = key + " should be function but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";

  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state();
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.4.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! flatpickr v3.0.6, @license MIT */
function FlatpickrInstance(element, config) {
	var self = this;

	self._ = {};
	self._.afterDayAnim = afterDayAnim;
	self._bind = bind;
	self._compareDates = compareDates;
	self._setHoursFromDate = setHoursFromDate;
	self.changeMonth = changeMonth;
	self.changeYear = changeYear;
	self.clear = clear;
	self.close = close;
	self._createElement = createElement;
	self.destroy = destroy;
	self.isEnabled = isEnabled;
	self.jumpToDate = jumpToDate;
	self.open = open;
	self.redraw = redraw;
	self.set = set;
	self.setDate = setDate;
	self.toggle = toggle;

	function init() {
		self.element = self.input = element;
		self.instanceConfig = config || {};
		self.parseDate = FlatpickrInstance.prototype.parseDate.bind(self);
		self.formatDate = FlatpickrInstance.prototype.formatDate.bind(self);

		setupFormats();
		parseConfig();
		setupLocale();
		setupInputs();
		setupDates();
		setupHelperFunctions();

		self.isOpen = false;

		self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable.length && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		if (!self.isMobile) build();

		bindEvents();

		if (self.selectedDates.length || self.config.noCalendar) {
			if (self.config.enableTime) {
				setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj || self.config.minDate : null);
			}
			updateValue(false);
		}

		self.showTimeInput = self.selectedDates.length > 0 || self.config.noCalendar;

		if (self.config.weekNumbers) {
			self.calendarContainer.style.width = self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
		}

		if (!self.isMobile) positionCalendar();

		triggerEvent("Ready");
	}

	/**
  * Binds a function to the current flatpickr instance
  * @param {Function} fn the function
  * @return {Function} the function bound to the instance
  */
	function bindToInstance(fn) {
		return fn.bind(self);
	}

	/**
  * The handler for all events targeting the time inputs
  * @param {Event} e the event - "input", "wheel", "increment", etc
  */
	function updateTime(e) {
		if (self.config.noCalendar && !self.selectedDates.length)
			// picking time only
			self.selectedDates = [self.now];

		timeWrapper(e);

		if (!self.selectedDates.length) return;

		if (!self.minDateHasTime || e.type !== "input" || e.target.value.length >= 2) {
			setHoursFromInputs();
			updateValue();
		} else {
			setTimeout(function () {
				setHoursFromInputs();
				updateValue();
			}, 1000);
		}
	}

	/**
  * Syncs the selected date object time with user's time input
  */
	function setHoursFromInputs() {
		if (!self.config.enableTime) return;

		var hours = (parseInt(self.hourElement.value, 10) || 0) % (self.amPM ? 12 : 24),
		    minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60,
		    seconds = self.config.enableSeconds ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;

		if (self.amPM !== undefined) hours = hours % 12 + 12 * (self.amPM.textContent === "PM");

		if (self.minDateHasTime && compareDates(self.latestSelectedDateObj, self.config.minDate) === 0) {

			hours = Math.max(hours, self.config.minDate.getHours());
			if (hours === self.config.minDate.getHours()) minutes = Math.max(minutes, self.config.minDate.getMinutes());
		}

		if (self.maxDateHasTime && compareDates(self.latestSelectedDateObj, self.config.maxDate) === 0) {
			hours = Math.min(hours, self.config.maxDate.getHours());
			if (hours === self.config.maxDate.getHours()) minutes = Math.min(minutes, self.config.maxDate.getMinutes());
		}

		setHours(hours, minutes, seconds);
	}

	/**
  * Syncs time input values with a date
  * @param {Date} dateObj the date to sync with
  */
	function setHoursFromDate(dateObj) {
		var date = dateObj || self.latestSelectedDateObj;

		if (date) setHours(date.getHours(), date.getMinutes(), date.getSeconds());
	}

	/**
  * Sets the hours, minutes, and optionally seconds
  * of the latest selected date object and the
  * corresponding time inputs
  * @param {Number} hours the hour. whether its military
  *                 or am-pm gets inferred from config
  * @param {Number} minutes the minutes
  * @param {Number} seconds the seconds (optional)
  */
	function setHours(hours, minutes, seconds) {
		if (self.selectedDates.length) {
			self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
		}

		if (!self.config.enableTime || self.isMobile) return;

		self.hourElement.value = self.pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * (hours % 12 === 0) : hours);

		self.minuteElement.value = self.pad(minutes);

		if (!self.config.time_24hr) self.amPM.textContent = hours >= 12 ? "PM" : "AM";

		if (self.config.enableSeconds === true) self.secondElement.value = self.pad(seconds);
	}

	/**
  * Handles the year input and incrementing events
  * @param {Event} event the keyup or increment event
  */
	function onYearInput(event) {
		var year = event.target.value;
		if (event.delta) year = (parseInt(year) + event.delta).toString();

		if (year.length === 4 || event.key === "Enter") {
			self.currentYearElement.blur();
			if (!/[^\d]/.test(year)) changeYear(year);
		}
	}

	/**
  * Essentially addEventListener + tracking
  * @param {Element} element the element to addEventListener to
  * @param {String} event the event name
  * @param {Function} handler the event handler
  */
	function bind(element, event, handler) {
		if (event instanceof Array) return event.forEach(function (ev) {
			return bind(element, ev, handler);
		});

		if (element instanceof Array) return element.forEach(function (el) {
			return bind(el, event, handler);
		});

		element.addEventListener(event, handler);
		self._handlers.push({ element: element, event: event, handler: handler });
	}

	/**
  * A mousedown handler which mimics click.
  * Minimizes latency, since we don't need to wait for mouseup in most cases.
  * Also, avoids handling right clicks.
  *
  * @param {Function} handler the event handler
  */
	function onClick(handler) {
		return function (evt) {
			return evt.which === 1 && handler(evt);
		};
	}

	/**
  * Adds all the necessary event listeners
  */
	function bindEvents() {
		self._handlers = [];
		self._animationLoop = [];
		if (self.config.wrap) {
			["open", "close", "toggle", "clear"].forEach(function (evt) {
				Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
					return bind(el, "mousedown", onClick(self[evt]));
				});
			});
		}

		if (self.isMobile) return setupMobile();

		self.debouncedResize = debounce(onResize, 50);
		self.triggerChange = function () {
			triggerEvent("Change");
		};
		self.debouncedChange = debounce(self.triggerChange, 300);

		if (self.config.mode === "range" && self.daysContainer) bind(self.daysContainer, "mouseover", function (e) {
			return onMouseOver(e.target);
		});

		bind(window.document.body, "keydown", onKeyDown);

		if (!self.config.static) bind(self._input, "keydown", onKeyDown);

		if (!self.config.inline && !self.config.static) bind(window, "resize", self.debouncedResize);

		if (window.ontouchstart !== undefined) bind(window.document, "touchstart", documentClick);

		bind(window.document, "mousedown", onClick(documentClick));
		bind(self._input, "blur", documentClick);

		if (self.config.clickOpens === true) {
			bind(self._input, "focus", self.open);
			bind(self._input, "mousedown", onClick(self.open));
		}

		if (!self.config.noCalendar) {
			self.monthNav.addEventListener("wheel", function (e) {
				return e.preventDefault();
			});
			bind(self.monthNav, "wheel", debounce(onMonthNavScroll, 10));
			bind(self.monthNav, "mousedown", onClick(onMonthNavClick));

			bind(self.monthNav, ["keyup", "increment"], onYearInput);
			bind(self.daysContainer, "mousedown", onClick(selectDate));

			if (self.config.animate) {
				bind(self.daysContainer, ["webkitAnimationEnd", "animationend"], animateDays);
				bind(self.monthNav, ["webkitAnimationEnd", "animationend"], animateMonths);
			}
		}

		if (self.config.enableTime) {
			var selText = function selText(e) {
				return e.target.select();
			};
			bind(self.timeContainer, ["wheel", "input", "increment"], updateTime);
			bind(self.timeContainer, "mousedown", onClick(timeIncrement));

			bind(self.timeContainer, ["wheel", "increment"], self.debouncedChange);
			bind(self.timeContainer, "input", self.triggerChange);

			bind([self.hourElement, self.minuteElement], "focus", selText);

			if (self.secondElement !== undefined) bind(self.secondElement, "focus", function () {
				return self.secondElement.select();
			});

			if (self.amPM !== undefined) {
				bind(self.amPM, "mousedown", onClick(function (e) {
					updateTime(e);
					self.triggerChange(e);
				}));
			}
		}
	}

	function processPostDayAnimation() {
		for (var i = self._animationLoop.length; i--;) {
			self._animationLoop[i]();
			self._animationLoop.splice(i, 1);
		}
	}

	/**
  * Removes the day container that slided out of view
  * @param {Event} e the animation event
  */
	function animateDays(e) {
		if (self.daysContainer.childNodes.length > 1) {
			switch (e.animationName) {
				case "fpSlideLeft":
					self.daysContainer.lastChild.classList.remove("slideLeftNew");
					self.daysContainer.removeChild(self.daysContainer.firstChild);
					self.days = self.daysContainer.firstChild;
					processPostDayAnimation();

					break;

				case "fpSlideRight":
					self.daysContainer.firstChild.classList.remove("slideRightNew");
					self.daysContainer.removeChild(self.daysContainer.lastChild);
					self.days = self.daysContainer.firstChild;
					processPostDayAnimation();

					break;

				default:
					break;
			}
		}
	}

	/**
  * Removes the month element that animated out of view
  * @param {Event} e the animation event
  */
	function animateMonths(e) {
		switch (e.animationName) {
			case "fpSlideLeftNew":
			case "fpSlideRightNew":
				self.navigationCurrentMonth.classList.remove("slideLeftNew");
				self.navigationCurrentMonth.classList.remove("slideRightNew");
				var nav = self.navigationCurrentMonth;

				while (nav.nextSibling && /curr/.test(nav.nextSibling.className)) {
					self.monthNav.removeChild(nav.nextSibling);
				}while (nav.previousSibling && /curr/.test(nav.previousSibling.className)) {
					self.monthNav.removeChild(nav.previousSibling);
				}self.oldCurMonth = null;
				break;
		}
	}

	/**
  * Set the calendar view to a particular date.
  * @param {Date} jumpDate the date to set the view to
  */
	function jumpToDate(jumpDate) {
		jumpDate = jumpDate ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);

		try {
			self.currentYear = jumpDate.getFullYear();
			self.currentMonth = jumpDate.getMonth();
		} catch (e) {
			/* istanbul ignore next */
			console.error(e.stack);
			/* istanbul ignore next */
			console.warn("Invalid date supplied: " + jumpDate);
		}

		self.redraw();
	}

	/**
  * The up/down arrow handler for time inputs
  * @param {Event} e the click event
  */
	function timeIncrement(e) {
		if (~e.target.className.indexOf("arrow")) incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
	}

	/**
  * Increments/decrements the value of input associ-
  * ated with the up/down arrow by dispatching an
  * "increment" event on the input.
  *
  * @param {Event} e the click event
  * @param {Number} delta the diff (usually 1 or -1)
  * @param {Element} inputElem the input element
  */
	function incrementNumInput(e, delta, inputElem) {
		var input = inputElem || e.target.parentNode.childNodes[0];
		var event = createEvent("increment");
		event.delta = delta;
		input.dispatchEvent(event);
	}

	function createNumberInput(inputClassName) {
		var wrapper = createElement("div", "numInputWrapper"),
		    numInput = createElement("input", "numInput " + inputClassName),
		    arrowUp = createElement("span", "arrowUp"),
		    arrowDown = createElement("span", "arrowDown");

		numInput.type = "text";
		numInput.pattern = "\\d*";

		wrapper.appendChild(numInput);
		wrapper.appendChild(arrowUp);
		wrapper.appendChild(arrowDown);

		return wrapper;
	}

	function build() {
		var fragment = window.document.createDocumentFragment();
		self.calendarContainer = createElement("div", "flatpickr-calendar");
		self.calendarContainer.tabIndex = -1;

		if (!self.config.noCalendar) {
			fragment.appendChild(buildMonthNav());
			self.innerContainer = createElement("div", "flatpickr-innerContainer");

			if (self.config.weekNumbers) self.innerContainer.appendChild(buildWeeks());

			self.rContainer = createElement("div", "flatpickr-rContainer");
			self.rContainer.appendChild(buildWeekdays());

			if (!self.daysContainer) {
				self.daysContainer = createElement("div", "flatpickr-days");
				self.daysContainer.tabIndex = -1;
			}

			buildDays();
			self.rContainer.appendChild(self.daysContainer);

			self.innerContainer.appendChild(self.rContainer);
			fragment.appendChild(self.innerContainer);
		}

		if (self.config.enableTime) fragment.appendChild(buildTime());

		toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
		toggleClass(self.calendarContainer, "animate", self.config.animate);

		self.calendarContainer.appendChild(fragment);

		var customAppend = self.config.appendTo && self.config.appendTo.nodeType;

		if (self.config.inline || self.config.static) {
			self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");

			if (self.config.inline && !customAppend) {
				return self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
			}

			if (self.config.static) {
				var wrapper = createElement("div", "flatpickr-wrapper");
				self.element.parentNode.insertBefore(wrapper, self.element);
				wrapper.appendChild(self.element);

				if (self.altInput) wrapper.appendChild(self.altInput);

				wrapper.appendChild(self.calendarContainer);
				return;
			}
		}

		(customAppend ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
	}

	function createDay(className, date, dayNumber, i) {
		var dateIsEnabled = isEnabled(date, true),
		    dayElement = createElement("span", "flatpickr-day " + className, date.getDate());

		dayElement.dateObj = date;
		dayElement.$i = i;
		dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));

		if (compareDates(date, self.now) === 0) {
			self.todayDateElem = dayElement;
			dayElement.classList.add("today");
		}

		if (dateIsEnabled) {
			dayElement.tabIndex = -1;
			if (isDateSelected(date)) {
				dayElement.classList.add("selected");
				self.selectedDateElem = dayElement;
				if (self.config.mode === "range") {
					toggleClass(dayElement, "startRange", compareDates(date, self.selectedDates[0]) === 0);

					toggleClass(dayElement, "endRange", compareDates(date, self.selectedDates[1]) === 0);
				}
			}
		} else {
			dayElement.classList.add("disabled");
			if (self.selectedDates[0] && date > self.minRangeDate && date < self.selectedDates[0]) self.minRangeDate = date;else if (self.selectedDates[0] && date < self.maxRangeDate && date > self.selectedDates[0]) self.maxRangeDate = date;
		}

		if (self.config.mode === "range") {
			if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");

			if (self.selectedDates.length === 1 && (date < self.minRangeDate || date > self.maxRangeDate)) dayElement.classList.add("notAllowed");
		}

		if (self.config.weekNumbers && className !== "prevMonthDay" && dayNumber % 7 === 1) {
			self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" + self.config.getWeek(date) + "</span>");
		}

		triggerEvent("DayCreate", dayElement);

		return dayElement;
	}

	function focusOnDay(currentIndex, offset) {
		var newIndex = currentIndex + offset || 0,
		    targetNode = currentIndex !== undefined ? self.days.childNodes[newIndex] : self.selectedDateElem || self.todayDateElem || self.days.childNodes[0],
		    focus = function focus() {
			targetNode = targetNode || self.days.childNodes[newIndex];
			targetNode.focus();

			if (self.config.mode === "range") onMouseOver(targetNode);
		};

		if (targetNode === undefined && offset !== 0) {
			if (offset > 0) {
				self.changeMonth(1);
				newIndex = newIndex % 42;
			} else if (offset < 0) {
				self.changeMonth(-1);
				newIndex += 42;
			}

			return afterDayAnim(focus);
		}

		focus();
	}

	function afterDayAnim(fn) {
		if (self.config.animate === true) return self._animationLoop.push(fn);
		fn();
	}

	function buildDays(delta) {
		var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7,
		    isRangeMode = self.config.mode === "range";

		self.prevMonthDays = self.utils.getDaysinMonth((self.currentMonth - 1 + 12) % 12);
		self.selectedDateElem = undefined;
		self.todayDateElem = undefined;

		var daysInMonth = self.utils.getDaysinMonth(),
		    days = window.document.createDocumentFragment();

		var dayNumber = self.prevMonthDays + 1 - firstOfMonth,
		    dayIndex = 0;

		if (self.config.weekNumbers && self.weekNumbers.firstChild) self.weekNumbers.textContent = "";

		if (isRangeMode) {
			// const dateLimits = self.config.enable.length || self.config.disable.length || self.config.mixDate || self.config.maxDate;
			self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
			self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
		}

		// prepend days from the ending of previous month
		for (; dayNumber <= self.prevMonthDays; dayNumber++, dayIndex++) {
			days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
		}

		// Start at 1 since there is no 0th day
		for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
			days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
		}

		// append days from the next month
		for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
			days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
		}

		if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
			self._hidePrevMonthArrow = self._hidePrevMonthArrow || self.minRangeDate > days.childNodes[0].dateObj;

			self._hideNextMonthArrow = self._hideNextMonthArrow || self.maxRangeDate < new Date(self.currentYear, self.currentMonth + 1, 1);
		} else updateNavigationCurrentMonth();

		var dayContainer = createElement("div", "dayContainer");
		dayContainer.appendChild(days);

		if (!self.config.animate || delta === undefined) clearNode(self.daysContainer);else {
			while (self.daysContainer.childNodes.length > 1) {
				self.daysContainer.removeChild(self.daysContainer.firstChild);
			}
		}

		if (delta >= 0) self.daysContainer.appendChild(dayContainer);else self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);

		self.days = self.daysContainer.firstChild;
		return self.daysContainer;
	}

	function clearNode(node) {
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}

	function buildMonthNav() {
		var monthNavFragment = window.document.createDocumentFragment();
		self.monthNav = createElement("div", "flatpickr-month");

		self.prevMonthNav = createElement("span", "flatpickr-prev-month");
		self.prevMonthNav.innerHTML = self.config.prevArrow;

		self.currentMonthElement = createElement("span", "cur-month");
		self.currentMonthElement.title = self.l10n.scrollTitle;

		var yearInput = createNumberInput("cur-year");
		self.currentYearElement = yearInput.childNodes[0];
		self.currentYearElement.title = self.l10n.scrollTitle;

		if (self.config.minDate) self.currentYearElement.min = self.config.minDate.getFullYear();

		if (self.config.maxDate) {
			self.currentYearElement.max = self.config.maxDate.getFullYear();

			self.currentYearElement.disabled = self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
		}

		self.nextMonthNav = createElement("span", "flatpickr-next-month");
		self.nextMonthNav.innerHTML = self.config.nextArrow;

		self.navigationCurrentMonth = createElement("span", "flatpickr-current-month");
		self.navigationCurrentMonth.appendChild(self.currentMonthElement);
		self.navigationCurrentMonth.appendChild(yearInput);

		monthNavFragment.appendChild(self.prevMonthNav);
		monthNavFragment.appendChild(self.navigationCurrentMonth);
		monthNavFragment.appendChild(self.nextMonthNav);
		self.monthNav.appendChild(monthNavFragment);

		Object.defineProperty(self, "_hidePrevMonthArrow", {
			get: function get() {
				return this.__hidePrevMonthArrow;
			},
			set: function set(bool) {
				if (this.__hidePrevMonthArrow !== bool) self.prevMonthNav.style.display = bool ? "none" : "block";
				this.__hidePrevMonthArrow = bool;
			}
		});

		Object.defineProperty(self, "_hideNextMonthArrow", {
			get: function get() {
				return this.__hideNextMonthArrow;
			},
			set: function set(bool) {
				if (this.__hideNextMonthArrow !== bool) self.nextMonthNav.style.display = bool ? "none" : "block";
				this.__hideNextMonthArrow = bool;
			}
		});

		updateNavigationCurrentMonth();

		return self.monthNav;
	}

	function buildTime() {
		self.calendarContainer.classList.add("hasTime");
		if (self.config.noCalendar) self.calendarContainer.classList.add("noCalendar");
		self.timeContainer = createElement("div", "flatpickr-time");
		self.timeContainer.tabIndex = -1;
		var separator = createElement("span", "flatpickr-time-separator", ":");

		var hourInput = createNumberInput("flatpickr-hour");
		self.hourElement = hourInput.childNodes[0];

		var minuteInput = createNumberInput("flatpickr-minute");
		self.minuteElement = minuteInput.childNodes[0];

		self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;

		self.hourElement.value = self.pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.defaultHour % (self.time_24hr ? 24 : 12));

		self.minuteElement.value = self.pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : self.config.defaultMinute);

		self.hourElement.step = self.config.hourIncrement;
		self.minuteElement.step = self.config.minuteIncrement;

		self.hourElement.min = self.config.time_24hr ? 0 : 1;
		self.hourElement.max = self.config.time_24hr ? 23 : 12;

		self.minuteElement.min = 0;
		self.minuteElement.max = 59;

		self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;

		self.timeContainer.appendChild(hourInput);
		self.timeContainer.appendChild(separator);
		self.timeContainer.appendChild(minuteInput);

		if (self.config.time_24hr) self.timeContainer.classList.add("time24hr");

		if (self.config.enableSeconds) {
			self.timeContainer.classList.add("hasSeconds");

			var secondInput = createNumberInput("flatpickr-second");
			self.secondElement = secondInput.childNodes[0];

			self.secondElement.value = self.pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : self.config.defaultSeconds);

			self.secondElement.step = self.minuteElement.step;
			self.secondElement.min = self.minuteElement.min;
			self.secondElement.max = self.minuteElement.max;

			self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
			self.timeContainer.appendChild(secondInput);
		}

		if (!self.config.time_24hr) {
			// add self.amPM if appropriate
			self.amPM = createElement("span", "flatpickr-am-pm", ["AM", "PM"][(self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11 | 0]);
			self.amPM.title = self.l10n.toggleTitle;
			self.amPM.tabIndex = -1;
			self.timeContainer.appendChild(self.amPM);
		}

		return self.timeContainer;
	}

	function buildWeekdays() {
		if (!self.weekdayContainer) self.weekdayContainer = createElement("div", "flatpickr-weekdays");

		var firstDayOfWeek = self.l10n.firstDayOfWeek;
		var weekdays = self.l10n.weekdays.shorthand.slice();

		if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
			weekdays = [].concat(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
		}

		self.weekdayContainer.innerHTML = "\n\t\t<span class=flatpickr-weekday>\n\t\t\t" + weekdays.join("</span><span class=flatpickr-weekday>") + "\n\t\t</span>\n\t\t";

		return self.weekdayContainer;
	}

	/* istanbul ignore next */
	function buildWeeks() {
		self.calendarContainer.classList.add("hasWeeks");
		self.weekWrapper = createElement("div", "flatpickr-weekwrapper");
		self.weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
		self.weekNumbers = createElement("div", "flatpickr-weeks");
		self.weekWrapper.appendChild(self.weekNumbers);

		return self.weekWrapper;
	}

	function changeMonth(value, is_offset, animate) {
		is_offset = is_offset === undefined || is_offset;
		var delta = is_offset ? value : value - self.currentMonth;
		var skipAnimations = !self.config.animate || animate === false;

		if (delta < 0 && self._hidePrevMonthArrow || delta > 0 && self._hideNextMonthArrow) return;

		self.currentMonth += delta;

		if (self.currentMonth < 0 || self.currentMonth > 11) {
			self.currentYear += self.currentMonth > 11 ? 1 : -1;
			self.currentMonth = (self.currentMonth + 12) % 12;

			triggerEvent("YearChange");
		}

		buildDays(!skipAnimations ? delta : undefined);

		if (skipAnimations) {
			triggerEvent("MonthChange");
			return updateNavigationCurrentMonth();
		}

		// remove possible remnants from clicking too fast
		var nav = self.navigationCurrentMonth;
		if (delta < 0) {
			while (nav.nextSibling && /curr/.test(nav.nextSibling.className)) {
				self.monthNav.removeChild(nav.nextSibling);
			}
		} else if (delta > 0) {
			while (nav.previousSibling && /curr/.test(nav.previousSibling.className)) {
				self.monthNav.removeChild(nav.previousSibling);
			}
		}

		self.oldCurMonth = self.navigationCurrentMonth;

		self.navigationCurrentMonth = self.monthNav.insertBefore(self.oldCurMonth.cloneNode(true), delta > 0 ? self.oldCurMonth.nextSibling : self.oldCurMonth);

		if (delta > 0) {
			self.daysContainer.firstChild.classList.add("slideLeft");
			self.daysContainer.lastChild.classList.add("slideLeftNew");

			self.oldCurMonth.classList.add("slideLeft");
			self.navigationCurrentMonth.classList.add("slideLeftNew");
		} else if (delta < 0) {
			self.daysContainer.firstChild.classList.add("slideRightNew");
			self.daysContainer.lastChild.classList.add("slideRight");

			self.oldCurMonth.classList.add("slideRight");
			self.navigationCurrentMonth.classList.add("slideRightNew");
		}

		self.currentMonthElement = self.navigationCurrentMonth.firstChild;
		self.currentYearElement = self.navigationCurrentMonth.lastChild.childNodes[0];

		updateNavigationCurrentMonth();
		self.oldCurMonth.firstChild.textContent = self.utils.monthToStr(self.currentMonth - delta);

		triggerEvent("MonthChange");

		if (document.activeElement && document.activeElement.$i) {
			var index = document.activeElement.$i;
			afterDayAnim(function () {
				focusOnDay(index, 0);
			});
		}
	}

	function clear(triggerChangeEvent) {
		self.input.value = "";

		if (self.altInput) self.altInput.value = "";

		if (self.mobileInput) self.mobileInput.value = "";

		self.selectedDates = [];
		self.latestSelectedDateObj = undefined;
		self.showTimeInput = false;

		self.redraw();

		if (triggerChangeEvent !== false)
			// triggerChangeEvent is true (default) or an Event
			triggerEvent("Change");
	}

	function close() {
		self.isOpen = false;

		if (!self.isMobile) {
			self.calendarContainer.classList.remove("open");
			self._input.classList.remove("active");
		}

		triggerEvent("Close");
	}

	function destroy() {
		if (self.config !== undefined) triggerEvent("Destroy");

		for (var i = self._handlers.length; i--;) {
			var h = self._handlers[i];
			h.element.removeEventListener(h.event, h.handler);
		}

		self._handlers = [];

		if (self.mobileInput) {
			if (self.mobileInput.parentNode) self.mobileInput.parentNode.removeChild(self.mobileInput);
			self.mobileInput = null;
		} else if (self.calendarContainer && self.calendarContainer.parentNode) self.calendarContainer.parentNode.removeChild(self.calendarContainer);

		if (self.altInput) {
			self.input.type = "text";
			if (self.altInput.parentNode) self.altInput.parentNode.removeChild(self.altInput);
			delete self.altInput;
		}

		if (self.input) {
			self.input.type = self.input._type;
			self.input.classList.remove("flatpickr-input");
			self.input.removeAttribute("readonly");
			self.input.value = "";
		}

		["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function (k) {
			try {
				delete self[k];
			} catch (e) {}
		});
	}

	function isCalendarElem(elem) {
		if (self.config.appendTo && self.config.appendTo.contains(elem)) return true;

		return self.calendarContainer.contains(elem);
	}

	function documentClick(e) {
		if (self.isOpen && !self.config.inline) {
			var isCalendarElement = isCalendarElem(e.target);
			var isInput = e.target === self.input || e.target === self.altInput || self.element.contains(e.target) ||
			// web components
			e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));

			var lostFocus = e.type === "blur" ? isInput && e.relatedTarget && !isCalendarElem(e.relatedTarget) : !isInput && !isCalendarElement;

			if (lostFocus && self.config.ignoredFocusElements.indexOf(e.target) === -1) {
				self.close();

				if (self.config.mode === "range" && self.selectedDates.length === 1) {
					self.clear(false);
					self.redraw();
				}
			}
		}
	}

	function changeYear(newYear) {
		if (!newYear || self.currentYearElement.min && newYear < self.currentYearElement.min || self.currentYearElement.max && newYear > self.currentYearElement.max) return;

		var newYearNum = parseInt(newYear, 10),
		    isNewYear = self.currentYear !== newYearNum;

		self.currentYear = newYearNum || self.currentYear;

		if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
			self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
		} else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
			self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
		}

		if (isNewYear) {
			self.redraw();
			triggerEvent("YearChange");
		}
	}

	function isEnabled(date, timeless) {
		if (self.config.minDate && compareDates(date, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && compareDates(date, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0) return false;

		if (!self.config.enable.length && !self.config.disable.length) return true;

		var dateToCheck = self.parseDate(date, null, true); // timeless

		var bool = self.config.enable.length > 0,
		    array = bool ? self.config.enable : self.config.disable;

		for (var i = 0, d; i < array.length; i++) {
			d = array[i];

			if (d instanceof Function && d(dateToCheck)) // disabled by function
				return bool;else if (d instanceof Date && d.getTime() === dateToCheck.getTime())
				// disabled by date
				return bool;else if (typeof d === "string" && self.parseDate(d, null, true).getTime() === dateToCheck.getTime())
				// disabled by date string
				return bool;else if ( // disabled by range
			(typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" && d.from && d.to && dateToCheck >= d.from && dateToCheck <= d.to) return bool;
		}

		return !bool;
	}

	function onKeyDown(e) {
		var isInput = e.target === self._input;
		var calendarElem = isCalendarElem(e.target);
		var allowInput = self.config.allowInput;
		var allowKeydown = self.isOpen && (!allowInput || !isInput);
		var allowInlineKeydown = self.config.inline && isInput && !allowInput;

		if (e.key === "Enter" && allowInput && isInput) {
			self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
			return e.target.blur();
		} else if (calendarElem || allowKeydown || allowInlineKeydown) {
			var isTimeObj = self.timeContainer && self.timeContainer.contains(e.target);
			switch (e.key) {
				case "Enter":
					if (isTimeObj) updateValue();else selectDate(e);

					break;

				case "Escape":
					// escape
					e.preventDefault();
					self.close();
					break;

				case "Backspace":
				case "Delete":
					if (!self.config.allowInput) self.clear();
					break;

				case "ArrowLeft":
				case "ArrowRight":
					if (!isTimeObj) {
						e.preventDefault();

						if (self.daysContainer) {
							var _delta = e.key === "ArrowRight" ? 1 : -1;

							if (!e.ctrlKey) focusOnDay(e.target.$i, _delta);else changeMonth(_delta, true);
						} else if (self.config.enableTime && !isTimeObj) self.hourElement.focus();
					}

					break;

				case "ArrowUp":
				case "ArrowDown":
					e.preventDefault();
					var delta = e.key === "ArrowDown" ? 1 : -1;

					if (self.daysContainer) {
						if (e.ctrlKey) {
							changeYear(self.currentYear - delta);
							focusOnDay(e.target.$i, 0);
						} else if (!isTimeObj) focusOnDay(e.target.$i, delta * 7);
					} else if (self.config.enableTime) {
						if (!isTimeObj) self.hourElement.focus();
						updateTime(e);
						self.debouncedChange();
					}

					break;

				case "Tab":
					if (e.target === self.hourElement) {
						e.preventDefault();
						self.minuteElement.select();
					} else if (e.target === self.minuteElement && (self.secondElement || self.amPM)) {
						e.preventDefault();
						(self.secondElement || self.amPM).focus();
					} else if (e.target === self.secondElement) {
						e.preventDefault();
						self.amPM.focus();
					}

					break;

				case "a":
					if (e.target === self.amPM) {
						self.amPM.textContent = "AM";
						setHoursFromInputs();
						updateValue();
					}
					break;

				case "p":
					if (e.target === self.amPM) {
						self.amPM.textContent = "PM";
						setHoursFromInputs();
						updateValue();
					}
					break;

				default:
					break;

			}

			triggerEvent("KeyDown", e);
		}
	}

	function onMouseOver(elem) {
		if (self.selectedDates.length !== 1 || !elem.classList.contains("flatpickr-day")) return;

		var hoverDate = elem.dateObj,
		    initialDate = self.parseDate(self.selectedDates[0], null, true),
		    rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()),
		    rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()),
		    containsDisabled = false;

		for (var t = rangeStartDate; t < rangeEndDate; t += self.utils.duration.DAY) {
			if (!isEnabled(new Date(t))) {
				containsDisabled = true;
				break;
			}
		}

		var _loop = function _loop(timestamp, i) {
			var outOfRange = timestamp < self.minRangeDate.getTime() || timestamp > self.maxRangeDate.getTime(),
			    dayElem = self.days.childNodes[i];

			if (outOfRange) {
				self.days.childNodes[i].classList.add("notAllowed");
				["inRange", "startRange", "endRange"].forEach(function (c) {
					dayElem.classList.remove(c);
				});
				return "continue";
			} else if (containsDisabled && !outOfRange) return "continue";

			["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
				dayElem.classList.remove(c);
			});

			var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate),
			    maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);

			elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");

			if (initialDate < hoverDate && timestamp === initialDate.getTime()) dayElem.classList.add("startRange");else if (initialDate > hoverDate && timestamp === initialDate.getTime()) dayElem.classList.add("endRange");

			if (timestamp >= minRangeDate && timestamp <= maxRangeDate) dayElem.classList.add("inRange");
		};

		for (var timestamp = self.days.childNodes[0].dateObj.getTime(), i = 0; i < 42; i++, timestamp += self.utils.duration.DAY) {
			var _ret = _loop(timestamp, i);

			if (_ret === "continue") continue;
		}
	}

	function onResize() {
		if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
	}

	function open(e, positionElement) {
		if (self.isMobile) {
			if (e) {
				e.preventDefault();
				e.target.blur();
			}

			setTimeout(function () {
				self.mobileInput.click();
			}, 0);

			triggerEvent("Open");
			return;
		}

		if (self.isOpen || self._input.disabled || self.config.inline) return;

		self.isOpen = true;
		self.calendarContainer.classList.add("open");
		positionCalendar(positionElement);
		self._input.classList.add("active");

		triggerEvent("Open");
	}

	function minMaxDateSetter(type) {
		return function (date) {
			var dateObj = self.config["_" + type + "Date"] = self.parseDate(date);

			var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
			var isValidDate = date && dateObj instanceof Date;

			if (isValidDate) {
				self[type + "DateHasTime"] = dateObj.getHours() || dateObj.getMinutes() || dateObj.getSeconds();
			}

			if (self.selectedDates) {
				self.selectedDates = self.selectedDates.filter(function (d) {
					return isEnabled(d);
				});
				if (!self.selectedDates.length && type === "min") setHoursFromDate(dateObj);
				updateValue();
			}

			if (self.daysContainer) {
				redraw();

				if (isValidDate) self.currentYearElement[type] = dateObj.getFullYear();else self.currentYearElement.removeAttribute(type);

				self.currentYearElement.disabled = inverseDateObj && dateObj && inverseDateObj.getFullYear() === dateObj.getFullYear();
			}
		};
	}

	function parseConfig() {
		var boolOpts = ["wrap", "weekNumbers", "allowInput", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"];

		var hooks = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange"];

		self.config = Object.create(flatpickr.defaultConfig);

		var userConfig = _extends({}, self.instanceConfig, JSON.parse(JSON.stringify(self.element.dataset || {})));

		self.config.parseDate = userConfig.parseDate;
		self.config.formatDate = userConfig.formatDate;

		Object.defineProperty(self.config, "enable", {
			get: function get() {
				return self.config._enable || [];
			},
			set: function set(dates) {
				return self.config._enable = parseDateRules(dates);
			}
		});

		Object.defineProperty(self.config, "disable", {
			get: function get() {
				return self.config._disable || [];
			},
			set: function set(dates) {
				return self.config._disable = parseDateRules(dates);
			}
		});

		_extends(self.config, userConfig);

		if (!userConfig.dateFormat && userConfig.enableTime) {
			self.config.dateFormat = self.config.noCalendar ? "H:i" + (self.config.enableSeconds ? ":S" : "") : flatpickr.defaultConfig.dateFormat + " H:i" + (self.config.enableSeconds ? ":S" : "");
		}

		if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
			self.config.altFormat = self.config.noCalendar ? "h:i" + (self.config.enableSeconds ? ":S K" : " K") : flatpickr.defaultConfig.altFormat + (" h:i" + (self.config.enableSeconds ? ":S" : "") + " K");
		}

		Object.defineProperty(self.config, "minDate", {
			get: function get() {
				return this._minDate;
			},
			set: minMaxDateSetter("min")
		});

		Object.defineProperty(self.config, "maxDate", {
			get: function get() {
				return this._maxDate;
			},
			set: minMaxDateSetter("max")
		});

		self.config.minDate = userConfig.minDate;
		self.config.maxDate = userConfig.maxDate;

		for (var i = 0; i < boolOpts.length; i++) {
			self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
		}for (var _i = hooks.length; _i--;) {
			if (self.config[hooks[_i]] !== undefined) {
				self.config[hooks[_i]] = arrayify(self.config[hooks[_i]] || []).map(bindToInstance);
			}
		}

		for (var _i2 = 0; _i2 < self.config.plugins.length; _i2++) {
			var pluginConf = self.config.plugins[_i2](self) || {};
			for (var key in pluginConf) {

				if (self.config[key] instanceof Array || ~hooks.indexOf(key)) {
					self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
				} else if (typeof userConfig[key] === "undefined") self.config[key] = pluginConf[key];
			}
		}

		triggerEvent("ParseConfig");
	}

	function setupLocale() {
		if (_typeof(self.config.locale) !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined") console.warn("flatpickr: invalid locale " + self.config.locale);

		self.l10n = _extends(Object.create(flatpickr.l10ns.default), _typeof(self.config.locale) === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] || {} : {});
	}

	function positionCalendar() {
		var positionElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self._positionElement;

		if (self.calendarContainer === undefined) return;

		var calendarHeight = self.calendarContainer.offsetHeight,
		    calendarWidth = self.calendarContainer.offsetWidth,
		    configPos = self.config.position,
		    inputBounds = positionElement.getBoundingClientRect(),
		    distanceFromBottom = window.innerHeight - inputBounds.bottom,
		    showOnTop = configPos === "above" || configPos !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;

		var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);

		toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
		toggleClass(self.calendarContainer, "arrowBottom", showOnTop);

		if (self.config.inline) return;

		var left = window.pageXOffset + inputBounds.left;
		var right = window.document.body.offsetWidth - inputBounds.right;
		var rightMost = left + calendarWidth > window.document.body.offsetWidth;

		toggleClass(self.calendarContainer, "rightMost", rightMost);

		if (self.config.static) return;

		self.calendarContainer.style.top = top + "px";

		if (!rightMost) {
			self.calendarContainer.style.left = left + "px";
			self.calendarContainer.style.right = "auto";
		} else {
			self.calendarContainer.style.left = "auto";
			self.calendarContainer.style.right = right + "px";
		}
	}

	function redraw() {
		if (self.config.noCalendar || self.isMobile) return;

		buildWeekdays();
		updateNavigationCurrentMonth();
		buildDays();
	}

	function selectDate(e) {
		e.preventDefault();
		e.stopPropagation();

		if (!e.target.classList.contains("flatpickr-day") || e.target.classList.contains("disabled") || e.target.classList.contains("notAllowed")) return;

		var selectedDate = self.latestSelectedDateObj = new Date(e.target.dateObj.getTime());

		var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth && self.config.mode !== "range";

		self.selectedDateElem = e.target;

		if (self.config.mode === "single") self.selectedDates = [selectedDate];else if (self.config.mode === "multiple") {
			var selectedIndex = isDateSelected(selectedDate);
			if (selectedIndex) self.selectedDates.splice(selectedIndex, 1);else self.selectedDates.push(selectedDate);
		} else if (self.config.mode === "range") {
			if (self.selectedDates.length === 2) self.clear();

			self.selectedDates.push(selectedDate);

			// unless selecting same date twice, sort ascendingly
			if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort(function (a, b) {
				return a.getTime() - b.getTime();
			});
		}

		setHoursFromInputs();

		if (shouldChangeMonth) {
			var isNewYear = self.currentYear !== selectedDate.getFullYear();
			self.currentYear = selectedDate.getFullYear();
			self.currentMonth = selectedDate.getMonth();

			if (isNewYear) triggerEvent("YearChange");

			triggerEvent("MonthChange");
		}

		buildDays();

		if (self.minDateHasTime && self.config.enableTime && compareDates(selectedDate, self.config.minDate) === 0) setHoursFromDate(self.config.minDate);

		updateValue();

		if (self.config.enableTime) setTimeout(function () {
			return self.showTimeInput = true;
		}, 50);

		if (self.config.mode === "range") {
			if (self.selectedDates.length === 1) {
				onMouseOver(e.target);

				self._hidePrevMonthArrow = self._hidePrevMonthArrow || self.minRangeDate > self.days.childNodes[0].dateObj;

				self._hideNextMonthArrow = self._hideNextMonthArrow || self.maxRangeDate < new Date(self.currentYear, self.currentMonth + 1, 1);
			} else updateNavigationCurrentMonth();
		}

		triggerEvent("Change");

		// maintain focus
		if (!shouldChangeMonth) focusOnDay(e.target.$i, 0);else afterDayAnim(function () {
			return self.selectedDateElem && self.selectedDateElem.focus();
		});

		if (self.config.enableTime) setTimeout(function () {
			return self.hourElement.select();
		}, 451);

		if (self.config.closeOnSelect) {
			var single = self.config.mode === "single" && !self.config.enableTime;
			var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;

			if (single || range) self.close();
		}
	}

	function set(option, value) {
		if (option !== null && (typeof option === "undefined" ? "undefined" : _typeof(option)) === "object") _extends(self.config, option);else self.config[option] = value;

		self.redraw();
		jumpToDate();
	}

	function setSelectedDate(inputDate, format) {
		if (inputDate instanceof Array) self.selectedDates = inputDate.map(function (d) {
			return self.parseDate(d, format);
		});else if (inputDate instanceof Date || !isNaN(inputDate)) self.selectedDates = [self.parseDate(inputDate, format)];else if (inputDate && inputDate.substring) {
			switch (self.config.mode) {
				case "single":
					self.selectedDates = [self.parseDate(inputDate, format)];
					break;

				case "multiple":
					self.selectedDates = inputDate.split("; ").map(function (date) {
						return self.parseDate(date, format);
					});
					break;

				case "range":
					self.selectedDates = inputDate.split(self.l10n.rangeSeparator).map(function (date) {
						return self.parseDate(date, format);
					});

					break;

				default:
					break;
			}
		}

		self.selectedDates = self.selectedDates.filter(function (d) {
			return d instanceof Date && isEnabled(d, false);
		});

		self.selectedDates.sort(function (a, b) {
			return a.getTime() - b.getTime();
		});
	}

	function setDate(date, triggerChange, format) {
		if (date !== 0 && !date) return self.clear(triggerChange);

		setSelectedDate(date, format);

		self.showTimeInput = self.selectedDates.length > 0;
		self.latestSelectedDateObj = self.selectedDates[0];

		self.redraw();
		jumpToDate();

		setHoursFromDate();
		updateValue(triggerChange);

		if (triggerChange) triggerEvent("Change");
	}

	function parseDateRules(arr) {
		for (var i = arr.length; i--;) {
			if (typeof arr[i] === "string" || +arr[i]) arr[i] = self.parseDate(arr[i], null, true);else if (arr[i] && arr[i].from && arr[i].to) {
				arr[i].from = self.parseDate(arr[i].from);
				arr[i].to = self.parseDate(arr[i].to);
			}
		}

		return arr.filter(function (x) {
			return x;
		}); // remove falsy values
	}

	function setupDates() {
		self.selectedDates = [];
		self.now = new Date();

		var preloadedDate = self.config.defaultDate || self.input.value;
		if (preloadedDate) setSelectedDate(preloadedDate, self.config.dateFormat);

		var initialDate = self.selectedDates.length ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now ? self.config.maxDate : self.now;

		self.currentYear = initialDate.getFullYear();
		self.currentMonth = initialDate.getMonth();

		if (self.selectedDates.length) self.latestSelectedDateObj = self.selectedDates[0];

		self.minDateHasTime = self.config.minDate && (self.config.minDate.getHours() || self.config.minDate.getMinutes() || self.config.minDate.getSeconds());

		self.maxDateHasTime = self.config.maxDate && (self.config.maxDate.getHours() || self.config.maxDate.getMinutes() || self.config.maxDate.getSeconds());

		Object.defineProperty(self, "latestSelectedDateObj", {
			get: function get() {
				return self._selectedDateObj || self.selectedDates[self.selectedDates.length - 1];
			},
			set: function set(date) {
				self._selectedDateObj = date;
			}
		});

		if (!self.isMobile) {
			Object.defineProperty(self, "showTimeInput", {
				get: function get() {
					return self._showTimeInput;
				},
				set: function set(bool) {
					self._showTimeInput = bool;
					if (self.calendarContainer) toggleClass(self.calendarContainer, "showTimeInput", bool);
					positionCalendar();
				}
			});
		}
	}

	function setupHelperFunctions() {
		self.utils = {
			duration: {
				DAY: 86400000
			},
			getDaysinMonth: function getDaysinMonth(month, yr) {
				month = typeof month === "undefined" ? self.currentMonth : month;

				yr = typeof yr === "undefined" ? self.currentYear : yr;

				if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;

				return self.l10n.daysInMonth[month];
			},
			monthToStr: function monthToStr(monthNumber, shorthand) {
				shorthand = typeof shorthand === "undefined" ? self.config.shorthandCurrentMonth : shorthand;

				return self.l10n.months[(shorthand ? "short" : "long") + "hand"][monthNumber];
			}
		};
	}

	/* istanbul ignore next */
	function setupFormats() {
		self.formats = Object.create(FlatpickrInstance.prototype.formats);
		["D", "F", "J", "M", "W", "l"].forEach(function (f) {
			self.formats[f] = FlatpickrInstance.prototype.formats[f].bind(self);
		});

		self.revFormat.F = FlatpickrInstance.prototype.revFormat.F.bind(self);
		self.revFormat.M = FlatpickrInstance.prototype.revFormat.M.bind(self);
	}

	function setupInputs() {
		self.input = self.config.wrap ? self.element.querySelector("[data-input]") : self.element;

		/* istanbul ignore next */
		if (!self.input) return console.warn("Error: invalid input element specified", self.input);

		self.input._type = self.input.type;
		self.input.type = "text";

		self.input.classList.add("flatpickr-input");
		self._input = self.input;

		if (self.config.altInput) {
			// replicate self.element
			self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
			self._input = self.altInput;
			self.altInput.placeholder = self.input.placeholder;
			self.altInput.disabled = self.input.disabled;
			self.altInput.required = self.input.required;
			self.altInput.type = "text";
			self.input.type = "hidden";

			if (!self.config.static && self.input.parentNode) self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
		}

		if (!self.config.allowInput) self._input.setAttribute("readonly", "readonly");

		self._positionElement = self.config.positionElement || self._input;
	}

	function setupMobile() {
		var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";

		self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
		self.mobileInput.step = self.input.getAttribute("step") || "any";
		self.mobileInput.tabIndex = 1;
		self.mobileInput.type = inputType;
		self.mobileInput.disabled = self.input.disabled;
		self.mobileInput.placeholder = self.input.placeholder;

		self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";

		if (self.selectedDates.length) {
			self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
		}

		if (self.config.minDate) self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");

		if (self.config.maxDate) self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");

		self.input.type = "hidden";
		if (self.config.altInput) self.altInput.type = "hidden";

		try {
			self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
		} catch (e) {
			//
		}

		self.mobileInput.addEventListener("change", function (e) {
			self.setDate(e.target.value, false, self.mobileFormatStr);
			triggerEvent("Change");
			triggerEvent("Close");
		});
	}

	function toggle() {
		if (self.isOpen) return self.close();
		self.open();
	}

	function triggerEvent(event, data) {
		var hooks = self.config["on" + event];

		if (hooks !== undefined && hooks.length > 0) {
			for (var i = 0; hooks[i] && i < hooks.length; i++) {
				hooks[i](self.selectedDates, self.input.value, self, data);
			}
		}

		if (event === "Change") {
			self.input.dispatchEvent(createEvent("change"));

			// many front-end frameworks bind to the input event
			self.input.dispatchEvent(createEvent("input"));
		}
	}

	/**
  * Creates an Event, normalized across browsers
  * @param {String} name the event name, e.g. "click"
  * @return {Event} the created event
  */
	function createEvent(name) {
		if (self._supportsEvents) return new Event(name, { bubbles: true });

		self._[name + "Event"] = document.createEvent("Event");
		self._[name + "Event"].initEvent(name, true, true);
		return self._[name + "Event"];
	}

	function isDateSelected(date) {
		for (var i = 0; i < self.selectedDates.length; i++) {
			if (compareDates(self.selectedDates[i], date) === 0) return "" + i;
		}

		return false;
	}

	function isDateInRange(date) {
		if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
		return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
	}

	function updateNavigationCurrentMonth() {
		if (self.config.noCalendar || self.isMobile || !self.monthNav) return;

		self.currentMonthElement.textContent = self.utils.monthToStr(self.currentMonth) + " ";
		self.currentYearElement.value = self.currentYear;

		self._hidePrevMonthArrow = self.config.minDate && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());

		self._hideNextMonthArrow = self.config.maxDate && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
	}

	/**
  * Updates the values of inputs associated with the calendar
  * @return {void}
  */
	function updateValue(triggerChange) {
		if (!self.selectedDates.length) return self.clear(triggerChange);

		if (self.isMobile) {
			self.mobileInput.value = self.selectedDates.length ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
		}

		var joinChar = self.config.mode !== "range" ? "; " : self.l10n.rangeSeparator;

		self.input.value = self.selectedDates.map(function (dObj) {
			return self.formatDate(dObj, self.config.dateFormat);
		}).join(joinChar);

		if (self.config.altInput) {
			self.altInput.value = self.selectedDates.map(function (dObj) {
				return self.formatDate(dObj, self.config.altFormat);
			}).join(joinChar);
		}

		if (triggerChange !== false) triggerEvent("ValueUpdate");
	}

	function mouseDelta(e) {
		return Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
	}

	function onMonthNavScroll(e) {
		e.preventDefault();
		var isYear = self.currentYearElement.parentNode.contains(e.target);

		if (e.target === self.currentMonthElement || isYear) {

			var delta = mouseDelta(e);

			if (isYear) {
				changeYear(self.currentYear + delta);
				e.target.value = self.currentYear;
			} else self.changeMonth(delta, true, false);
		}
	}

	function onMonthNavClick(e) {
		var isPrevMonth = self.prevMonthNav.contains(e.target);
		var isNextMonth = self.nextMonthNav.contains(e.target);

		if (isPrevMonth || isNextMonth) changeMonth(isPrevMonth ? -1 : 1);else if (e.target === self.currentYearElement) {
			e.preventDefault();
			self.currentYearElement.select();
		} else if (e.target.className === "arrowUp") self.changeYear(self.currentYear + 1);else if (e.target.className === "arrowDown") self.changeYear(self.currentYear - 1);
	}

	/**
  * Creates an HTMLElement with given tag, class, and textual content
  * @param {String} tag the HTML tag
  * @param {String} className the new element's class name
  * @param {String} content The new element's text content
  * @return {HTMLElement} the created HTML element
  */
	function createElement(tag, className, content) {
		var e = window.document.createElement(tag);
		className = className || "";
		content = content || "";

		e.className = className;

		if (content !== undefined) e.textContent = content;

		return e;
	}

	function arrayify(obj) {
		if (obj instanceof Array) return obj;
		return [obj];
	}

	function toggleClass(elem, className, bool) {
		if (bool) return elem.classList.add(className);
		elem.classList.remove(className);
	}

	/* istanbul ignore next */
	function debounce(func, wait, immediate) {
		var timeout = void 0;
		return function () {
			var context = this,
			    args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			}, wait);
			if (immediate && !timeout) func.apply(context, args);
		};
	}

	/**
  * Compute the difference in dates, measured in ms
  * @param {Date} date1
  * @param {Date} date2
  * @param {Boolean} timeless whether to reset times of both dates to 00:00
  * @return {Number} the difference in ms
  */
	function compareDates(date1, date2, timeless) {
		if (!(date1 instanceof Date) || !(date2 instanceof Date)) return false;

		if (timeless !== false) {
			return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
		}

		return date1.getTime() - date2.getTime();
	}

	function timeWrapper(e) {
		e.preventDefault();

		var isKeyDown = e.type === "keydown",
		    isWheel = e.type === "wheel",
		    isIncrement = e.type === "increment",
		    input = e.target;

		if (self.amPM && e.target === self.amPM) return e.target.textContent = ["AM", "PM"][e.target.textContent === "AM" | 0];

		var min = Number(input.min),
		    max = Number(input.max),
		    step = Number(input.step),
		    curValue = parseInt(input.value, 10),
		    delta = e.delta || (!isKeyDown ? Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) || 0 : e.which === 38 ? 1 : -1);

		var newValue = curValue + step * delta;

		if (typeof input.value !== "undefined" && input.value.length === 2) {
			var isHourElem = input === self.hourElement,
			    isMinuteElem = input === self.minuteElement;

			if (newValue < min) {
				newValue = max + newValue + !isHourElem + (isHourElem && !self.amPM);

				if (isMinuteElem) incrementNumInput(null, -1, self.hourElement);
			} else if (newValue > max) {
				newValue = input === self.hourElement ? newValue - max - !self.amPM : min;

				if (isMinuteElem) incrementNumInput(null, 1, self.hourElement);
			}

			if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) self.amPM.textContent = self.amPM.textContent === "PM" ? "AM" : "PM";

			input.value = self.pad(newValue);
		}
	}

	init();
	return self;
}

FlatpickrInstance.prototype = {
	formats: {
		// get the date in UTC
		Z: function Z(date) {
			return date.toISOString();
		},

		// weekday name, short, e.g. Thu
		D: function D(date) {
			return this.l10n.weekdays.shorthand[this.formats.w(date)];
		},

		// full month name e.g. January
		F: function F(date) {
			return this.utils.monthToStr(this.formats.n(date) - 1, false);
		},

		// padded hour 1-12
		G: function G(date) {
			return FlatpickrInstance.prototype.pad(FlatpickrInstance.prototype.formats.h(date));
		},

		// hours with leading zero e.g. 03
		H: function H(date) {
			return FlatpickrInstance.prototype.pad(date.getHours());
		},

		// day (1-30) with ordinal suffix e.g. 1st, 2nd
		J: function J(date) {
			return date.getDate() + this.l10n.ordinal(date.getDate());
		},

		// AM/PM
		K: function K(date) {
			return date.getHours() > 11 ? "PM" : "AM";
		},

		// shorthand month e.g. Jan, Sep, Oct, etc
		M: function M(date) {
			return this.utils.monthToStr(date.getMonth(), true);
		},

		// seconds 00-59
		S: function S(date) {
			return FlatpickrInstance.prototype.pad(date.getSeconds());
		},

		// unix timestamp
		U: function U(date) {
			return date.getTime() / 1000;
		},

		W: function W(date) {
			return this.config.getWeek(date);
		},

		// full year e.g. 2016
		Y: function Y(date) {
			return date.getFullYear();
		},

		// day in month, padded (01-30)
		d: function d(date) {
			return FlatpickrInstance.prototype.pad(date.getDate());
		},

		// hour from 1-12 (am/pm)
		h: function h(date) {
			return date.getHours() % 12 ? date.getHours() % 12 : 12;
		},

		// minutes, padded with leading zero e.g. 09
		i: function i(date) {
			return FlatpickrInstance.prototype.pad(date.getMinutes());
		},

		// day in month (1-30)
		j: function j(date) {
			return date.getDate();
		},

		// weekday name, full, e.g. Thursday
		l: function l(date) {
			return this.l10n.weekdays.longhand[date.getDay()];
		},

		// padded month number (01-12)
		m: function m(date) {
			return FlatpickrInstance.prototype.pad(date.getMonth() + 1);
		},

		// the month number (1-12)
		n: function n(date) {
			return date.getMonth() + 1;
		},

		// seconds 0-59
		s: function s(date) {
			return date.getSeconds();
		},

		// number of the day of the week
		w: function w(date) {
			return date.getDay();
		},

		// last two digits of year e.g. 16 for 2016
		y: function y(date) {
			return String(date.getFullYear()).substring(2);
		}
	},

	/**
  * Formats a given Date object into a string based on supplied format
  * @param {Date} dateObj the date object
  * @param {String} frmt a string composed of formatting tokens e.g. "Y-m-d"
  * @return {String} The textual representation of the date e.g. 2017-02-03
  */
	formatDate: function formatDate(dateObj, frmt) {
		var _this = this;

		if (this.config !== undefined && this.config.formatDate !== undefined) return this.config.formatDate(dateObj, frmt);

		return frmt.split("").map(function (c, i, arr) {
			return _this.formats[c] && arr[i - 1] !== "\\" ? _this.formats[c](dateObj) : c !== "\\" ? c : "";
		}).join("");
	},


	revFormat: {
		D: function D() {},
		F: function F(dateObj, monthName) {
			dateObj.setMonth(this.l10n.months.longhand.indexOf(monthName));
		},
		G: function G(dateObj, hour) {
			dateObj.setHours(parseFloat(hour));
		},
		H: function H(dateObj, hour) {
			dateObj.setHours(parseFloat(hour));
		},
		J: function J(dateObj, day) {
			dateObj.setDate(parseFloat(day));
		},
		K: function K(dateObj, amPM) {
			var hours = dateObj.getHours();

			if (hours !== 12) dateObj.setHours(hours % 12 + 12 * /pm/i.test(amPM));
		},
		M: function M(dateObj, shortMonth) {
			dateObj.setMonth(this.l10n.months.shorthand.indexOf(shortMonth));
		},
		S: function S(dateObj, seconds) {
			dateObj.setSeconds(seconds);
		},
		U: function U(dateObj, unixSeconds) {
			return new Date(parseFloat(unixSeconds) * 1000);
		},

		W: function W(dateObj, weekNumber) {
			weekNumber = parseInt(weekNumber);
			return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0, 0);
		},
		Y: function Y(dateObj, year) {
			dateObj.setFullYear(year);
		},
		Z: function Z(dateObj, ISODate) {
			return new Date(ISODate);
		},

		d: function d(dateObj, day) {
			dateObj.setDate(parseFloat(day));
		},
		h: function h(dateObj, hour) {
			dateObj.setHours(parseFloat(hour));
		},
		i: function i(dateObj, minutes) {
			dateObj.setMinutes(parseFloat(minutes));
		},
		j: function j(dateObj, day) {
			dateObj.setDate(parseFloat(day));
		},
		l: function l() {},
		m: function m(dateObj, month) {
			dateObj.setMonth(parseFloat(month) - 1);
		},
		n: function n(dateObj, month) {
			dateObj.setMonth(parseFloat(month) - 1);
		},
		s: function s(dateObj, seconds) {
			dateObj.setSeconds(parseFloat(seconds));
		},
		w: function w() {},
		y: function y(dateObj, year) {
			dateObj.setFullYear(2000 + parseFloat(year));
		}
	},

	tokenRegex: {
		D: "(\\w+)",
		F: "(\\w+)",
		G: "(\\d\\d|\\d)",
		H: "(\\d\\d|\\d)",
		J: "(\\d\\d|\\d)\\w+",
		K: "(am|AM|Am|aM|pm|PM|Pm|pM)",
		M: "(\\w+)",
		S: "(\\d\\d|\\d)",
		U: "(.+)",
		W: "(\\d\\d|\\d)",
		Y: "(\\d{4})",
		Z: "(.+)",
		d: "(\\d\\d|\\d)",
		h: "(\\d\\d|\\d)",
		i: "(\\d\\d|\\d)",
		j: "(\\d\\d|\\d)",
		l: "(\\w+)",
		m: "(\\d\\d|\\d)",
		n: "(\\d\\d|\\d)",
		s: "(\\d\\d|\\d)",
		w: "(\\d\\d|\\d)",
		y: "(\\d{2})"
	},

	pad: function pad(number) {
		return ("0" + number).slice(-2);
	},

	/**
  * Parses a date(+time) string into a Date object
  * @param {String} date the date string, e.g. 2017-02-03 14:45
  * @param {String} givenFormat the date format, e.g. Y-m-d H:i
  * @param {Boolean} timeless whether to reset the time of Date object
  * @return {Date} the parsed Date object
  */
	parseDate: function parseDate(date, givenFormat, timeless) {
		var _this2 = this;

		if (date !== 0 && !date) return null;

		var date_orig = date;

		if (date instanceof Date) date = new Date(date.getTime()); // create a copy

		else if (date.toFixed !== undefined) // timestamp
				date = new Date(date);else {
				// date string
				var format = givenFormat || (this.config || flatpickr.defaultConfig).dateFormat;
				date = String(date).trim();

				if (date === "today") {
					date = new Date();
					timeless = true;
				} else if (/Z$/.test(date) || /GMT$/.test(date)) // datestrings w/ timezone
					date = new Date(date);else if (this.config && this.config.parseDate) date = this.config.parseDate(date, format);else {
					(function () {
						var parsedDate = !_this2.config || !_this2.config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));

						var matched = void 0,
						    ops = [];

						for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
							var token = format[i];
							var isBackSlash = token === "\\";
							var escaped = format[i - 1] === "\\" || isBackSlash;

							if (_this2.tokenRegex[token] && !escaped) {
								regexStr += _this2.tokenRegex[token];
								var match = new RegExp(regexStr).exec(date);
								if (match && (matched = true)) {
									ops[token !== "Y" ? "push" : "unshift"]({
										fn: _this2.revFormat[token],
										val: match[++matchIndex]
									});
								}
							} else if (!isBackSlash) regexStr += "."; // don't really care

							ops.forEach(function (_ref) {
								var fn = _ref.fn,
								    val = _ref.val;
								return parsedDate = fn(parsedDate, val) || parsedDate;
							});
						}

						date = matched ? parsedDate : null;
					})();
				}
			}

		/* istanbul ignore next */
		if (!(date instanceof Date)) {
			console.warn("flatpickr: invalid date " + date_orig);
			console.info(this.element);
			return null;
		}

		if (timeless === true) date.setHours(0, 0, 0, 0);

		return date;
	}
};

/* istanbul ignore next */
function _flatpickr(nodeList, config) {
	var nodes = Array.prototype.slice.call(nodeList); // static list
	var instances = [];
	for (var i = 0; i < nodes.length; i++) {
		try {
			if (nodes[i].getAttribute("data-fp-omit") !== null) continue;

			if (nodes[i]._flatpickr) {
				nodes[i]._flatpickr.destroy();
				nodes[i]._flatpickr = null;
			}

			nodes[i]._flatpickr = new FlatpickrInstance(nodes[i], config || {});
			instances.push(nodes[i]._flatpickr);
		} catch (e) {
			console.warn(e, e.stack);
		}
	}

	return instances.length === 1 ? instances[0] : instances;
}

/* istanbul ignore next */
if (typeof HTMLElement !== "undefined") {
	// browser env
	HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
		return _flatpickr(this, config);
	};

	HTMLElement.prototype.flatpickr = function (config) {
		return _flatpickr([this], config);
	};
}

/* istanbul ignore next */
function flatpickr(selector, config) {
	if (selector instanceof NodeList) return _flatpickr(selector, config);else if (!(selector instanceof HTMLElement)) return _flatpickr(window.document.querySelectorAll(selector), config);

	return _flatpickr([selector], config);
}

/* istanbul ignore next */
flatpickr.defaultConfig = FlatpickrInstance.defaultConfig = {
	mode: "single",

	position: "auto",

	animate: typeof window !== "undefined" && window.navigator.userAgent.indexOf("MSIE") === -1,

	// wrap: see https://chmln.github.io/flatpickr/examples/#flatpickr-external-elements
	wrap: false,

	// enables week numbers
	weekNumbers: false,

	// allow manual datetime input
	allowInput: false,

	/*
 	clicking on input opens the date(time)picker.
 	disable if you wish to open the calendar manually with .open()
 */
	clickOpens: true,

	/*
 	closes calendar after date selection,
 	unless 'mode' is 'multiple' or enableTime is true
 */
	closeOnSelect: true,

	// display time picker in 24 hour mode
	time_24hr: false,

	// enables the time picker functionality
	enableTime: false,

	// noCalendar: true will hide the calendar. use for a time picker along w/ enableTime
	noCalendar: false,

	// more date format chars at https://chmln.github.io/flatpickr/#dateformat
	dateFormat: "Y-m-d",

	// date format used in aria-label for days
	ariaDateFormat: "F j, Y",

	// altInput - see https://chmln.github.io/flatpickr/#altinput
	altInput: false,

	// the created altInput element will have this class.
	altInputClass: "form-control input",

	// same as dateFormat, but for altInput
	altFormat: "F j, Y", // defaults to e.g. June 10, 2016

	// defaultDate - either a datestring or a date object. used for datetimepicker"s initial value
	defaultDate: null,

	// the minimum date that user can pick (inclusive)
	minDate: null,

	// the maximum date that user can pick (inclusive)
	maxDate: null,

	// dateparser that transforms a given string to a date object
	parseDate: null,

	// dateformatter that transforms a given date object to a string, according to passed format
	formatDate: null,

	getWeek: function getWeek(givenDate) {
		var date = new Date(givenDate.getTime());
		var onejan = new Date(date.getFullYear(), 0, 1);
		return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
	},


	// see https://chmln.github.io/flatpickr/#disable
	enable: [],

	// see https://chmln.github.io/flatpickr/#disable
	disable: [],

	// display the short version of month names - e.g. Sep instead of September
	shorthandCurrentMonth: false,

	// displays calendar inline. see https://chmln.github.io/flatpickr/#inline-calendar
	inline: false,

	// position calendar inside wrapper and next to the input element
	// leave at false unless you know what you"re doing
	"static": false,

	// DOM node to append the calendar to in *static* mode
	appendTo: null,

	// code for previous/next icons. this is where you put your custom icon code e.g. fontawesome
	prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
	nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",

	// enables seconds in the time picker
	enableSeconds: false,

	// step size used when scrolling/incrementing the hour element
	hourIncrement: 1,

	// step size used when scrolling/incrementing the minute element
	minuteIncrement: 5,

	// initial value in the hour element
	defaultHour: 12,

	// initial value in the minute element
	defaultMinute: 0,

	// initial value in the seconds element
	defaultSeconds: 0,

	// disable native mobile datetime input support
	disableMobile: false,

	// default locale
	locale: "default",

	plugins: [],

	ignoredFocusElements: [],

	// called every time calendar is closed
	onClose: undefined, // function (dateObj, dateStr) {}

	// onChange callback when user selects a date or time
	onChange: undefined, // function (dateObj, dateStr) {}

	// called for every day element
	onDayCreate: undefined,

	// called every time the month is changed
	onMonthChange: undefined,

	// called every time calendar is opened
	onOpen: undefined, // function (dateObj, dateStr) {}

	// called after the configuration has been parsed
	onParseConfig: undefined,

	// called after calendar is ready
	onReady: undefined, // function (dateObj, dateStr) {}

	// called after input value updated
	onValueUpdate: undefined,

	// called every time the year is changed
	onYearChange: undefined,

	onKeyDown: undefined,

	onDestroy: undefined
};

/* istanbul ignore next */
flatpickr.l10ns = {
	en: {
		weekdays: {
			shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		},
		months: {
			shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		},
		daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		firstDayOfWeek: 0,
		ordinal: function ordinal(nth) {
			var s = nth % 100;
			if (s > 3 && s < 21) return "th";
			switch (s % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		},
		rangeSeparator: " to ",
		weekAbbreviation: "Wk",
		scrollTitle: "Scroll to increment",
		toggleTitle: "Click to toggle"
	}
};

flatpickr.l10ns.default = Object.create(flatpickr.l10ns.en);
flatpickr.localize = function (l10n) {
	return _extends(flatpickr.l10ns.default, l10n || {});
};
flatpickr.setDefaults = function (config) {
	return _extends(flatpickr.defaultConfig, config || {});
};

/* istanbul ignore next */
if (typeof jQuery !== "undefined") {
	jQuery.fn.flatpickr = function (config) {
		return _flatpickr(this, config);
	};
}

Date.prototype.fp_incr = function (days) {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(days, 10));
};

if (true) module.exports = flatpickr;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

function confirmDatePlugin(pluginConfig) {
	const defaultConfig = {
		confirmIcon: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='17' height='17' viewBox='0 0 17 17'> <g> </g> <path d='M15.418 1.774l-8.833 13.485-4.918-4.386 0.666-0.746 4.051 3.614 8.198-12.515 0.836 0.548z' fill='#000000' /> </svg>",
		confirmText: "OK ",
		showAlways: false,
		theme: "light"
	};

	const config = {};
	for (let key in defaultConfig) {
		config[key] = pluginConfig && pluginConfig[key] !== undefined 
			? pluginConfig[key] 
			: defaultConfig[key];
	}

	return function(fp) {
		const hooks = {
			onKeyDown (_, __, ___, e) {
				if (fp.config.enableTime && e.key === "Tab" && e.target === fp.amPM) {
					e.preventDefault();
					fp.confirmContainer.focus();
				}

				else if (e.key === "Enter" && e.target === fp.confirmContainer)
					fp.close();
			},

			onReady () {
				if (fp.calendarContainer === undefined)
					return;

				fp.confirmContainer = fp._createElement(
					"div", 
					`flatpickr-confirm ${config.showAlways ? "visible" : ""} ${config.theme}Theme`, 
					config.confirmText
				);

				fp.confirmContainer.tabIndex = -1;
				fp.confirmContainer.innerHTML += config.confirmIcon;

				fp.confirmContainer.addEventListener("click", fp.close);
				fp.calendarContainer.appendChild(fp.confirmContainer);
			}
		};

		if (!config.showAlways)			{
			hooks.onChange = function(dateObj, dateStr) {
				const showCondition = fp.config.enableTime || fp.config.mode === "multiple";
				if(dateStr && !fp.config.inline && showCondition)
					return fp.confirmContainer.classList.add("visible");
				fp.confirmContainer.classList.remove("visible");
			}
		}

		return hooks;
	}
}

if (true)
	module.exports = confirmDatePlugin;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(159);

class form_validation_class extends __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* utility */] {
    constructor() {
        super(...arguments);
        this.validationSubmit = (errors) => {
            if (Object.keys(errors).length > 0) {
                let clss = "";
                for (let k in errors) {
                    if (typeof errors[k] === "string") {
                        clss = "warning";
                        break;
                    }
                    return this.validationSubmit(errors[k]);
                }
                return clss;
            }
            else {
                return "";
            }
        };
        this.validationClass = (errors, name, sub = []) => {
            if (name === "submit") {
                return this.validationSubmit(errors);
            }
            if (errors[name]) {
                return "warning";
            }
            let clss = "";
            sub.forEach((v) => {
                if (errors[v]) {
                    clss = "warning";
                }
            });
            return clss;
        };
    }
}
/* harmony default export */ __webpack_exports__["a"] = (new form_validation_class());


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class store_module {
    set state(state) {
        this._state = state;
    }
    set actions(actions) {
        this._actions = actions;
    }
    set mutations(mutations) {
        this._mutations = mutations;
    }
    set getters(getters) {
        this._getters = getters;
    }
    store() {
        return {
            namespaced: true,
            state: this._state,
            actions: this._actions,
            mutations: this._mutations,
            getters: this._getters,
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = store_module;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class mutations {
    constructor() {
        this.map = (call) => {
            if (call === "all") {
                call = Object.keys(this);
            }
            let map = {};
            for (let idx in call) {
                if (typeof this[call[idx]] === 'undefined') {
                    continue;
                }
                if (call[idx].charAt(0) === '_') {
                    continue;
                }
                if (call[idx] === 'map') {
                    continue;
                }
                if (call[idx] === 'constructor') {
                    continue;
                }
                if (typeof idx === 'number') {
                    map[call[String(idx)]] = this[call[String(idx)]];
                    continue;
                }
                map[call[idx]] = this[call[idx]];
            }
            return map;
        };
    }
    isServer() {
        if (typeof window === "undefined") {
            return true;
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class actions {
    constructor() {
        this.map = (call) => {
            if (call === "all") {
                call = Object.keys(this);
            }
            let map = {};
            for (let idx in call) {
                if (typeof this[call[idx]] === 'undefined') {
                    continue;
                }
                if (call[idx].charAt(0) === '_') {
                    continue;
                }
                if (call[idx] === 'map') {
                    continue;
                }
                if (call[idx] === 'constructor') {
                    continue;
                }
                if (typeof idx === 'number') {
                    map[call[String(idx)]] = this[call[String(idx)]];
                    continue;
                }
                map[call[idx]] = this[call[idx]];
            }
            return map;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actions;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class state {
    constructor() {
        this.map = (call) => {
            if (call === "all") {
                call = Object.keys(this);
            }
            let map = {};
            for (let idx in call) {
                if (typeof this[call[idx]] === 'undefined') {
                    continue;
                }
                if (call[idx].charAt(0) === '_') {
                    continue;
                }
                if (call[idx] === 'map') {
                    continue;
                }
                if (call[idx] === 'constructor') {
                    continue;
                }
                if (typeof idx === 'number') {
                    map[call[String(idx)]] = this[call[String(idx)]];
                    continue;
                }
                map[call[idx]] = this[call[idx]];
            }
            return map;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = state;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class getters {
    constructor() {
        this.map = (call) => {
            if (call === "all") {
                call = Object.keys(this);
            }
            let map = {};
            for (let idx in call) {
                if (typeof this[call[idx]] === 'undefined') {
                    continue;
                }
                if (call[idx].charAt(0) === '_') {
                    continue;
                }
                if (call[idx] === 'map') {
                    continue;
                }
                if (call[idx] === 'constructor') {
                    continue;
                }
                if (typeof idx === 'number') {
                    map[call[String(idx)]] = this[call[String(idx)]];
                    continue;
                }
                map[call[idx]] = this[call[idx]];
            }
            return map;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getters;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class build_query {
    http(query) {
        let prts = query;
        if (prts.length === 0) {
            return "";
        }
        let q = "";
        Object.keys(prts).forEach(function (key) {
            if (!prts[key]) {
                return;
            }
            q += `&${encodeURIComponent(key)}=${encodeURIComponent(prts[key])}`;
        });
        return q.replace("&", "?");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = build_query;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navigation_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59631247_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_navigation_vue__ = __webpack_require__(28);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "3053f56e"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navigation_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59631247_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_navigation_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/navigation/components/navigation.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] navigation.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pagination_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_64abbed3_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_pagination_vue__ = __webpack_require__(38);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "3b9ca1fa"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pagination_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_64abbed3_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_pagination_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/pagination/components/pagination.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pagination.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_lib_build_query__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__client_fetch__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_route_parse__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resource__ = __webpack_require__(18);




let client = new __WEBPACK_IMPORTED_MODULE_1__client_fetch__["a" /* client_fetch */]();
class internal_crud extends __WEBPACK_IMPORTED_MODULE_3__resource__["a" /* resource */] {
    constructor(options) {
        super();
        this.endPoint = "";
        this.client = (url, options) => {
            return client.fetch(url, options);
        };
        this.paginate = (route) => {
            let bq = new __WEBPACK_IMPORTED_MODULE_0__core_lib_build_query__["a" /* build_query */]();
            let URI = `${this.endPoint}/${__WEBPACK_IMPORTED_MODULE_2__utilities_route_parse__["a" /* default */].parse(route)}${bq.http(route.query)}`;
            if (this.is_server()) {
                let service = this.feeds.service(this.resource);
                return service.pagination(route);
            }
            return this.client(URI, {});
        };
        this.entity = (route) => {
            let id = route.params.id;
            let URI = `${this.endPoint}/${id}`;
            if (this.is_server()) {
                let service = this.feeds.service(this.resource);
                return service.get_entity(route.params.id);
            }
            return this.client(URI, {});
        };
        this.insert = (entity, token) => {
            entity = JSON.stringify(entity);
            let URI = this.endPoint;
            let insert = (resolve, reject) => {
                this.client(URI, {
                    body: entity,
                    method: "post",
                    headers: {
                        'X-XSRF-Token': token
                    }
                }).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(insert);
        };
        this.update = (entity, token) => {
            let URI = this.endPoint + "/" + entity.id;
            entity = JSON.stringify(entity);
            let insert = (resolve, reject) => {
                this.client(URI, {
                    body: entity,
                    method: "put",
                    headers: {
                        'X-XSRF-Token': token
                    }
                }).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(insert);
        };
        this.delete = (id, token) => {
            let URI = this.endPoint + "/" + id;
            let del = (resolve, reject) => {
                this.client(URI, {
                    method: "delete",
                    headers: {
                        'X-XSRF-Token': token
                    }
                }).then(r => {
                    resolve("api delete ok");
                }).catch(e => {
                    reject("api delete error");
                });
            };
            return new Promise(del);
        };
        this.list = () => {
            let URI = `${this.endPoint}/list`;
            if (this.is_server()) {
                let service = this.feeds.service(this.resource);
                return service.get_list();
            }
            return this.client(URI, {});
        };
        this.endPoint = options.endPoint;
        this.resource = options.resource;
        this.feeds = options.feeds;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = internal_crud;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_fetch__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resource__ = __webpack_require__(18);


let client = new __WEBPACK_IMPORTED_MODULE_0__client_fetch__["a" /* client_fetch */]();
class auth extends __WEBPACK_IMPORTED_MODULE_1__resource__["a" /* resource */] {
    constructor(options) {
        super();
        this.end_point = "/api/users";
        this.login = (user, token) => {
            let login = (resolve, reject) => {
                let url = this.end_point + "/login";
                let opt = {
                    body: JSON.stringify(user),
                    method: "post",
                    headers: {
                        "X-XSRF-Token": token
                    }
                };
                client.fetch(url, opt).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(login);
        };
        this.user_client = () => {
            let user = (resolve, reject) => {
                let url = this.end_point + "/auth";
                client.fetch(url, {}).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject("login user undefined");
                });
            };
            return new Promise(user);
        };
        this.user_server = () => {
            let user_server = (resolve, reject) => {
                if (this.feeds.user["id"]) {
                    resolve(this.feeds.user);
                    return;
                }
                reject("login user undefined");
            };
            return new Promise(user_server);
        };
        this.user = () => {
            if (this.is_server()) {
                return this.user_server();
            }
            return this.user_client();
        };
        this.logout = () => {
            let logout = (resolve, reject) => {
                let url = this.end_point + "/logout";
                client.fetch(url, {}).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            };
            return new Promise(logout);
        };
        this.feeds = options.feeds;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = auth;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class client_fetch {
    constructor() {
        this._options = {
            credentials: 'same-origin',
            method: "get",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        };
        this.fetch = (url, options) => {
            let base = this.options;
            if (options.headers) {
                options.headers = Object.assign(base.headers, options.headers);
            }
            options = Object.assign(base, options);
            let client = (resolve, reject) => {
                fetch(url, options)
                    .then((response) => {
                    //deleted
                    if (response.status === 204) {
                        resolve(response.status);
                        return;
                    }
                    response.json().then(r => {
                        if (response.status < 200 || response.status > 300) {
                            reject(r);
                            return;
                        }
                        resolve(r);
                    });
                }).catch((err) => {
                    reject(err);
                });
            };
            return new Promise(client);
        };
    }
    get options() {
        return Object.create(this._options);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = client_fetch;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class resource {
    is_server() {
        if (typeof window === "undefined") {
            return true;
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = resource;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application__ = __webpack_require__(20);

/* harmony default export */ __webpack_exports__["default"] = (context => {
    let server = (resolve, reject) => {
        let feeds = context.feeds;
        const { app, router, store } = Object(__WEBPACK_IMPORTED_MODULE_0__application__["a" /* createApp */])(feeds);
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                let err = new Error("Not Found (( ；ﾟДﾟ))");
                err["code"] = 404;
                reject(err);
                return;
            }
            Promise.all(matchedComponents.map((Component) => {
                if (Component.asyncData) {
                    store.commit("loading");
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
                if (!Component.extendOptions) {
                    return;
                }
                if (Component.extendOptions.asyncData) {
                    store.commit("loading/loading");
                    return Component.extendOptions.asyncData({
                        store, route: router.currentRoute
                    });
                }
            })).then(() => {
                context.state = store.state;
                resolve(app);
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        }, reject);
    };
    return new Promise(server);
});


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createApp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__client_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);





__WEBPACK_IMPORTED_MODULE_0_vue___default.a.mixin({
    beforeMount() {
        const asyncData = this.$options["asyncData"];
        if (asyncData) {
            let ad = Promise.resolve(this.$store.commit("loading/loading", "success"));
            ad.then(() => asyncData({ store: this.$store, route: this.$route }))
                .then(res => {
                if (this["resolveAsyncData"]) {
                    this["resolveAsyncData"]();
                }
                setTimeout(() => {
                    this.$store.commit("loading/endLoading", "success");
                }, 240);
            }).catch(err => {
                console.log(err);
                this.$router.push({ path: `/tasks` });
            });
            this["dataPromise"] = ad;
        }
    },
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            this.$store.commit("loading/loading", "success");
            asyncData({
                store: this.$store,
                route: to
            }).then(() => {
                if (this["resolveAsyncData"]) {
                    this["resolveAsyncData"]();
                }
                setTimeout(() => {
                    this.$store.commit("loading/endLoading", "success");
                }, 240);
                next();
            }).catch(next);
        }
        else {
            next();
        }
    }
});
function createApp(feeds) {
    const router = Object(__WEBPACK_IMPORTED_MODULE_2__client_router__["a" /* createRouter */])();
    const store = Object(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* createStore */])(feeds);
    Object(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(store, router);
    const app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
        router,
        store,
        render: h => h(__WEBPACK_IMPORTED_MODULE_1__app_vue__["a" /* default */])
    });
    return { app, router, store };
}


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dba65148_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__ = __webpack_require__(23);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "4e9a1a56"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dba65148_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let app = class app extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
};
app = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: 'app',
        components: {
            "app-overlay": () => __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 128)),
            "app-modal": () => __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 129)),
            "app-offset": () => __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 130))
        }
    })
], app);
/* harmony default export */ __webpack_exports__["a"] = (app);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "application" } },
    [
      _c("router-view", { attrs: { name: "navi" } }),
      _vm._ssrNode(" "),
      _vm._ssrNode(
        '<div class="wrap container">',
        "</div>",
        [
          _vm._ssrNode(
            '<div class="row row-center">',
            "</div>",
            [_c("router-view", { attrs: { name: "single" } })],
            1
          ),
          _vm._ssrNode(" "),
          _vm._ssrNode(
            '<div class="row row-md-reverse">',
            "</div>",
            [
              _vm._ssrNode(
                '<div class="column column-lg-75 column-md-70">',
                "</div>",
                [_c("router-view", { attrs: { name: "main" } })],
                1
              ),
              _vm._ssrNode(" "),
              _vm._ssrNode(
                '<div class="column column-lg-25 column-md-30">',
                "</div>",
                [_c("router-view", { attrs: { name: "sub" } })],
                1
              )
            ],
            2
          )
        ],
        2
      ),
      _vm._ssrNode(" "),
      _c("app-offset"),
      _vm._ssrNode(" "),
      _c("app-modal"),
      _vm._ssrNode(" "),
      _c("app-overlay")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createRouter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tasks_spa_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_spa_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__groups_spa_router__ = __webpack_require__(71);


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);



function createRouter() {
    return new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
        mode: 'history',
        routes: [
            ...__WEBPACK_IMPORTED_MODULE_2__tasks_spa_router__["a" /* default */],
            ...__WEBPACK_IMPORTED_MODULE_4__groups_spa_router__["a" /* default */],
            ...__WEBPACK_IMPORTED_MODULE_3__users_spa_router__["a" /* default */]
        ]
    });
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("vue-router");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_idx_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_add_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_view_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_edit_vue__ = __webpack_require__(46);






const mount = "/tasks";
/* harmony default export */ __webpack_exports__["a"] = ([
    { name: "tasks_page", path: `${mount}/page/:page*`, components: { main: __WEBPACK_IMPORTED_MODULE_2__components_idx_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "tasks_index", path: `${mount}/page/1`, alias: `${mount}/` },
    { name: "tasks_add", path: `${mount}/add`, components: { main: __WEBPACK_IMPORTED_MODULE_3__components_add_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "tasks_view", path: `${mount}/:id`, components: { main: __WEBPACK_IMPORTED_MODULE_4__components_view_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "tasks_edit", path: `${mount}/:id/edit`, components: { main: __WEBPACK_IMPORTED_MODULE_5__components_edit_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
]);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let navi = class navi extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    asyncData({ store, route }) {
        return store.dispatch('auth/fetchAuthUser');
    }
    toggle() {
        this.toggleOffset();
    }
    m_login() {
        this.setModal({ "template": "login_modal" });
        this.openModal();
    }
    h_logout() {
        this.logout();
        return false;
    }
};
navi = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "navi",
        components: {
            "app-indicater": () => __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 131)),
        },
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("offset", {
            show: ({ show }) => show
        }), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("auth", {
            auth_user: ({ user }) => user,
            auth_status: ({ auth_status }) => auth_status
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("offset", ["toggleOffset"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("auth", [
            "logout"
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("modal", ["setModal", "toggleModal", "openModal"]))
    })
], navi);
/* harmony default export */ __webpack_exports__["a"] = (navi);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm._ssrNode(
      '<nav class="navigation column">',
      "</nav>",
      [
        _vm._ssrNode('<div class="container">', "</div>", [
          _vm._ssrNode(
            '<div class="row row-md-reverse">',
            "</div>",
            [
              _vm._ssrNode(
                '<div class="hidden-md column text-right">',
                "</div>",
                [
                  _vm._ssrNode(
                    '<ul class="navigation-list navigation-list-reverse">',
                    "</ul>",
                    [
                      _vm._ssrNode(
                        '<li class="show-lg show-xl show-md">',
                        "</li>",
                        [
                          _vm._ssrNode(
                            "<h1>",
                            "</h1>",
                            [
                              _c("router-link", { attrs: { to: "/tasks" } }, [
                                _vm._v("Apprication")
                              ])
                            ],
                            1
                          )
                        ]
                      ),
                      _vm._ssrNode(
                        " " +
                          (!_vm.auth_status
                            ? '<li class="show-lg show-xl show-md"><a title="login"><span class="typcn typcn-key"></span> Login</a></li>'
                            : "<!---->") +
                          " " +
                          (_vm.auth_status
                            ? '<li class="show-lg show-xl show-md"><a title="logout"><span class="typcn typcn-export"></span> Logout</a></li>'
                            : "<!---->")
                      )
                    ],
                    2
                  )
                ]
              ),
              _vm._ssrNode(" "),
              _vm._ssrNode('<div class="column">', "</div>", [
                _vm._ssrNode(
                  '<ul class="navigation-list">',
                  "</ul>",
                  [
                    _vm._ssrNode(
                      '<li><a href="#" title="open offset menu"' +
                        _vm._ssrClass("offset-toggle", { active: _vm.show }) +
                        '><span class="typcn typcn-th-menu"></span></a></li> '
                    ),
                    _vm._ssrNode(
                      "<li>",
                      "</li>",
                      [
                        _c(
                          "router-link",
                          { attrs: { to: "/tasks", title: "Tasks" } },
                          [_vm._v("Tasks")]
                        )
                      ],
                      1
                    ),
                    _vm._ssrNode(" "),
                    _vm._ssrNode(
                      "<li>",
                      "</li>",
                      [
                        _c(
                          "router-link",
                          { attrs: { to: "/users", title: "Users" } },
                          [_vm._v("Users")]
                        )
                      ],
                      1
                    ),
                    _vm._ssrNode(" "),
                    _vm._ssrNode(
                      "<li>",
                      "</li>",
                      [
                        _c(
                          "router-link",
                          { attrs: { to: "/groups", title: "Groups" } },
                          [_vm._v("Groups")]
                        )
                      ],
                      1
                    ),
                    _vm._ssrNode(
                      " " +
                        (!_vm.auth_status
                          ? '<li class="show-sm"><a title="login"><span class="typcn typcn-key"></span> Login</a></li>'
                          : "<!---->") +
                        " " +
                        (_vm.auth_status
                          ? '<li class="show-sm"><a title="logout"><span class="typcn typcn-export"></span> Logout</a></li>'
                          : "<!---->")
                    )
                  ],
                  2
                )
              ])
            ],
            2
          )
        ]),
        _vm._ssrNode(" "),
        _c("app-indicater")
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sub_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4c7c7b86_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_sub_vue__ = __webpack_require__(34);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "086e3038"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sub_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4c7c7b86_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_sub_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/tasks/components/sub.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sub.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_vue__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let sub = class sub extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
};
sub = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: 'sub',
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('tasks', {
            mount: ({ mount }) => mount
        })),
        components: { "app-search": __WEBPACK_IMPORTED_MODULE_3__search_vue__["a" /* default */] }
    })
], sub);
/* harmony default export */ __webpack_exports__["a"] = (sub);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4aa0468a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__ = __webpack_require__(33);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "8f32fc98"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4aa0468a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/tasks/components/search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] search.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_lib_build_query__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let bq = new __WEBPACK_IMPORTED_MODULE_5__core_lib_build_query__["a" /* build_query */]();
__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let search = class search extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.frm = {
            "id": "",
            "title": "",
            "priod": "",
            "created_at": "",
            "updated_at": "",
        };
    }
    search() {
        let q = bq.http(this.frm);
        this.$router.push(`/${this.mount}?${q}`);
    }
    reset() {
        let frm = this.frm;
        for (let key in frm) {
            frm[key] = null;
        }
    }
    get action() {
        return this.mount;
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
    }
};
search = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: 'find',
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('tasks', {
            mount: ({ mount }) => mount
        }))
    })
], search);
/* harmony default export */ __webpack_exports__["a"] = (search);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "search" }, [
    _vm._ssrNode(
      "<form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="get"><fieldset><label for="id">Id</label> <input type="text" name="id" placeholder="id"' +
        _vm._ssrAttr("value", _vm.frm.id) +
        '> <label for="title">Title</label> <input type="text" name="title" placeholder="title"' +
        _vm._ssrAttr("value", _vm.frm.title) +
        '> <label for="priod">Priod</label> <input type="datetime-local" name="priod" placeholder="priod"' +
        _vm._ssrAttr("value", _vm.frm.priod) +
        ' class="calendar"> <label for="created_at">Created at</label> <input type="datetime-local" name="created_at" placeholder="created_at"' +
        _vm._ssrAttr("value", _vm.frm.created_at) +
        ' class="calendar"> <label for="updated_at">Updated at</label> <input type="datetime-local" name="updated_at" placeholder="updated_at"' +
        _vm._ssrAttr("value", _vm.frm.updated_at) +
        ' class="calendar"></fieldset> <div class="text-right"><button type="button" class="button small warning"><span class="typcn typcn-minus"></span> clear</button> <button type="submit" class="button small "><span class="typcn typcn-zoom"></span> search</button></div></form>'
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "sub" },
    [
      _vm._ssrNode(
        '<div class="panel">',
        "</div>",
        [_vm._ssrNode("<h4>Search</h4> "), _c("app-search")],
        2
      ),
      _vm._ssrNode(" "),
      _vm._ssrNode(
        '<div class="panel">',
        "</div>",
        [
          _vm._ssrNode("<h4>Menu</h4> "),
          _vm._ssrNode('<nav class="navigation-stack">', "</nav>", [
            _vm._ssrNode(
              '<ul class="navigation-list">',
              "</ul>",
              [
                _vm._ssrNode(
                  "<li>",
                  "</li>",
                  [
                    _c("router-link", { attrs: { to: _vm.mount } }, [
                      _vm._v("Index")
                    ])
                  ],
                  1
                ),
                _vm._ssrNode(" "),
                _vm._ssrNode(
                  "<li>",
                  "</li>",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/" + _vm.mount + "/add" } },
                      [_vm._v("Add")]
                    )
                  ],
                  1
                )
              ],
              2
            )
          ])
        ],
        2
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_idx_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a611d78c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_idx_vue__ = __webpack_require__(39);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "62038c3e"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_idx_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a611d78c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_idx_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/tasks/components/idx.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] idx.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let idx = class idx extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    asyncData({ store, route }) {
        return store.dispatch("tasks/fetchEntities", route);
    }
    view(id) {
        return `/${this.mount}/${id}`;
    }
    edit(id) {
        return `/${this.mount}/${id}/edit`;
    }
    destroy(id, title) {
        let modal = {
            template: "Destroy",
            data: {
                id: id,
                name: title,
                mount: this.mount
            }
        };
        this.setModal(modal);
        this.openModal();
    }
    copy(id) {
        return `/${this.mount}/add?copy=${id}`;
    }
};
idx = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "page",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('tasks', {
            entities: ({ entities }) => entities,
            pagination: ({ page }) => page,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("modal", ["setModal", "toggleModal", "openModal"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("tasks", ["fetchEntities"])),
        components: {
            pagination: () => new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 14))
        }
    })
], idx);
/* harmony default export */ __webpack_exports__["a"] = (idx);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_lib_build_query__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let bq = new __WEBPACK_IMPORTED_MODULE_2__core_lib_build_query__["a" /* build_query */]();
let pagintaion = class pagintaion extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.special = {
            first: true,
            last: true,
            next: true,
            prev: true
        };
    }
    get check() {
        let pg = this.pagination;
        if (pg.currentPage > pg.totalPage) {
            return false;
        }
        return true;
    }
    get prev() {
        let cr = this.pagination.currentPage;
        let link = (cr > 1) ? this.format(cr - 1) : this.format(1);
        let css = (cr === 1) ? "disable" : "";
        return {
            link: link,
            css: css
        };
    }
    get next() {
        let cr = this.pagination.currentPage;
        let tr = this.pagination.totalPage;
        let link = (tr <= cr) ? this.format(tr) : this.format(cr + 1);
        let css = (tr <= cr) ? "disable" : "";
        return {
            link: link,
            css: css
        };
    }
    get first() {
        let cr = this.pagination.currentPage;
        let link = this.format(1);
        let css = (cr === 1) ? "disable" : "";
        return {
            link: link,
            css: css
        };
    }
    get last() {
        let cr = this.pagination.currentPage;
        let tr = this.pagination.totalPage;
        let link = this.format(tr);
        let css = (tr <= cr) ? "disable" : "";
        return {
            link: link,
            css: css
        };
    }
    format(number) {
        let query = this.pagination.queryPrams;
        let httpQuery = bq.http(query);
        return `/${this.mount}/page/${number}/${httpQuery}`;
    }
    get numbers() {
        let total = this.pagination.totalPage;
        let numbers = [];
        for (let i = 1; i <= total; i++) {
            let active = (i === this.pagination.currentPage) ? "active" : "";
            numbers.push({ link: this.format(i), num: i, active: active });
        }
        return numbers;
    }
};
pagintaion = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: 'pagination',
        computed: {},
        props: {
            pagination: {},
            mount: String,
        }
    })
], pagintaion);
/* harmony default export */ __webpack_exports__["a"] = (pagintaion);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.check
    ? _c(
        "div",
        [
          _vm._ssrNode('<nav class="pagination clearfix">', "</nav>", [
            _vm._ssrNode(
              '<ul class="pagination-list">',
              "</ul>",
              [
                _vm.special.first
                  ? _vm._ssrNode(
                      "<li>",
                      "</li>",
                      [
                        _c(
                          "router-link",
                          {
                            class: _vm.first.css,
                            attrs: { to: _vm.first.link }
                          },
                          [_vm._v("« First")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._ssrNode(" "),
                _vm.special.prev
                  ? _vm._ssrNode(
                      "<li>",
                      "</li>",
                      [
                        _c(
                          "router-link",
                          { class: _vm.prev.css, attrs: { to: _vm.prev.link } },
                          [_vm._v("‹ Prev")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._ssrNode(" "),
                _vm._l(_vm.numbers, function(list) {
                  return _vm._ssrNode(
                    "<li" + _vm._ssrClass(null, list.active) + ">",
                    "</li>",
                    [
                      _c("router-link", { attrs: { to: list.link } }, [
                        _vm._v(_vm._s(list.num))
                      ])
                    ],
                    1
                  )
                }),
                _vm._ssrNode(" "),
                _vm.special.prev
                  ? _vm._ssrNode(
                      "<li>",
                      "</li>",
                      [
                        _c(
                          "router-link",
                          { class: _vm.next.css, attrs: { to: _vm.next.link } },
                          [_vm._v("Next ›")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._ssrNode(" "),
                _vm.special.prev
                  ? _vm._ssrNode(
                      "<li>",
                      "</li>",
                      [
                        _c(
                          "router-link",
                          { class: _vm.last.css, attrs: { to: _vm.last.link } },
                          [_vm._v("Last »")]
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ],
              2
            )
          ]),
          _vm._ssrNode(
            ' <div class="column text-right text-md">' +
              _vm._ssrEscape(
                " Page " +
                  _vm._s(_vm.pagination.currentPage) +
                  " / " +
                  _vm._s(_vm.pagination.totalPage) +
                  " "
              ) +
              "</div>"
          )
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "idx" },
    [
      _vm._ssrNode("<h2>Index</h2> "),
      _c("pagination", {
        attrs: { pagination: _vm.pagination, mount: _vm.mount }
      }),
      _vm._ssrNode(" "),
      _vm._l(_vm.entities, function(entity) {
        return _vm._ssrNode(
          '<div class="row border-bottom margin-top">',
          "</div>",
          [
            _vm._ssrNode('<div class="column">', "</div>", [
              _vm._ssrNode(
                "<h3>",
                "</h3>",
                [
                  _c("router-link", { attrs: { to: _vm.view(entity.id) } }, [
                    _vm._v(_vm._s(entity.title))
                  ])
                ],
                1
              )
            ]),
            _vm._ssrNode(" "),
            _vm._ssrNode(
              '<div class="column">',
              "</div>",
              [
                _c(
                  "router-link",
                  {
                    staticClass: "button small",
                    attrs: { to: _vm.edit(entity.id) }
                  },
                  [
                    _c("span", { staticClass: "typcn typcn-edit" }),
                    _vm._v(" edit")
                  ]
                ),
                _vm._ssrNode(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "button small",
                    attrs: { to: _vm.copy(entity.id) }
                  },
                  [
                    _c("span", { staticClass: "typcn typcn-document-add" }),
                    _vm._v(" copy")
                  ]
                ),
                _vm._ssrNode(
                  ' <button class="button small"><span class="typcn typcn-document-delete"></span> delete</button>'
                )
              ],
              2
            )
          ],
          2
        )
      }),
      _vm._ssrNode(" "),
      _c("pagination", {
        attrs: { pagination: _vm.pagination, mount: _vm.mount }
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_add_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_04ab641e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_add_vue__ = __webpack_require__(42);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "26b289c5"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_add_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_04ab641e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_add_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/tasks/components/add.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] add.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_validation__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let add = class add extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.change = (e) => {
            let kv = {};
            kv["key"] = e.target.name;
            kv["value"] = e.target.value;
            this.updateEntity(kv);
        };
        this.errors = {};
    }
    get action() {
        return `${this.mount}`;
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
        this.clearEntity();
        let query = this.$store.state.route.query;
        if (query["copy"]) {
            this.copyEntity({ id: query["copy"], mount: this.mount });
        }
    }
    beforeDestroy() {
        this.clearEntity();
    }
    save() {
        this.loading();
        this.insertEntity(this.token).then(r => {
            this.endLoading("success");
            this.$router.push({ path: this.mount });
        }).catch(e => {
            this.errors = e;
            this.endLoading("warning");
        });
        return false;
    }
};
add = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "add",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("tasks", {
            entity: ({ entity }) => entity,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("tasks", ["insertEntity", "clearEntity", "copyEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("tasks", ["updateEntity", "setErrors"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("loading", ["loading", "endLoading"]), __WEBPACK_IMPORTED_MODULE_5__utilities_validation__["a" /* default */].map(["validationClass"]))
    })
], add);
/* harmony default export */ __webpack_exports__["a"] = (add);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "add" }, [
    _vm._ssrNode(
      "<h2>Add</h2> <form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="post"><fieldset><div class="form-item"><label for="title">Title</label> <input type="text" name="title" placeholder="title"' +
        _vm._ssrAttr("value", _vm.entity.title) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "title")) +
        "> " +
        _vm._ssrList(_vm.errors.title, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="priod">Priod</label> <input type="datetime-local" name="priod" placeholder="priod"' +
        _vm._ssrAttr("value", _vm.entity.priod) +
        _vm._ssrClass("calendar", _vm.validationClass(_vm.errors, "priod")) +
        "> " +
        _vm._ssrList(_vm.errors.priod, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div></fieldset> <button type="submit"' +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "submit")) +
        ">add</button></form>"
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2451cdf8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__ = __webpack_require__(45);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "432f5d31"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2451cdf8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/tasks/components/view.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] view.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let view = class view extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    asyncData({ store, route }) {
        return store.dispatch('tasks/fetchEntity', route);
    }
};
view = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "view",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("tasks", {
            entity: ({ entity }) => entity
        })),
    })
], view);
/* harmony default export */ __webpack_exports__["a"] = (view);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.entity.id
    ? _c("div", { staticClass: "view" }, [
        _vm._ssrNode(
          "<h2>View</h2> <h3>Id</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.id)) +
            "</div> <h3>Title</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.title)) +
            "</div> <h3>Priod</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.priod)) +
            "</div> <h3>Created at</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.created_at)) +
            "</div> <h3>Updated at</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.updated_at)) +
            "</div>"
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c87c6dd_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__ = __webpack_require__(48);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "5b655616"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c87c6dd_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/tasks/components/edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] edit.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_validation__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let edit = class edit extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.change = (e) => {
            let kv = {};
            kv["key"] = e.target.name;
            kv["value"] = e.target.value;
            this.updateEntity(kv);
        };
        this.errors = {};
    }
    asyncData({ store, route }) {
        return store.dispatch('tasks/fetchEntity', route);
    }
    get action() {
        return `${this.mount}/${this.entity.id}`;
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
    }
    save() {
        this.loading();
        this.saveEntity(this.token).then(r => {
            this.errors = {};
            this.endLoading("success");
        }).catch(e => {
            this.errors = e;
            this.endLoading("warning");
        });
    }
};
edit = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "edit",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("tasks", {
            entity: ({ entity }) => entity,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("tasks", ["fetchEntity", "saveEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("tasks", ["updateEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("loading", ["loading", "endLoading"]), __WEBPACK_IMPORTED_MODULE_5__utilities_validation__["a" /* default */].map(["validationClass"]))
    })
], edit);
/* harmony default export */ __webpack_exports__["a"] = (edit);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "edit" }, [
    _vm._ssrNode(
      "<h2>Edit</h2> <form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="post"><fieldset><input type="hidden" name="id"' +
        _vm._ssrAttr("value", _vm.entity.id) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "id")) +
        '> <div class="form-item"><label for="title">Title</label> <input type="text" name="title" placeholder="title"' +
        _vm._ssrAttr("value", _vm.entity.title) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "title")) +
        "> " +
        _vm._ssrList(_vm.errors.title, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="priod">Priod</label> <input type="datetime-local" name="priod" placeholder="priod"' +
        _vm._ssrAttr("value", _vm.entity.priod) +
        _vm._ssrClass("calendar", _vm.validationClass(_vm.errors, "priod")) +
        "> " +
        _vm._ssrList(_vm.errors.priod, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div></fieldset> <button type="submit"' +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "submit")) +
        ">update</button></form>"
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_idx_vue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_add_vue__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_view_vue__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_edit_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_login_vue__ = __webpack_require__(68);







const mount = "/users";
/* harmony default export */ __webpack_exports__["a"] = ([
    { name: "users_login", path: `${mount}/login`, components: { single: __WEBPACK_IMPORTED_MODULE_6__components_login_vue__["a" /* default */] } },
    { name: "users_page", path: `${mount}/page/:page*`, components: { main: __WEBPACK_IMPORTED_MODULE_2__components_idx_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "users_index", path: `${mount}/page/1`, alias: `${mount}/` },
    { name: "users_add", path: `${mount}/add`, components: { main: __WEBPACK_IMPORTED_MODULE_3__components_add_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "users_view", path: `${mount}/:id`, components: { main: __WEBPACK_IMPORTED_MODULE_4__components_view_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "users_edit", path: `${mount}/:id/edit`, components: { main: __WEBPACK_IMPORTED_MODULE_5__components_edit_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
]);


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sub_vue__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a1e9983_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_sub_vue__ = __webpack_require__(55);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "2c25bf2a"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sub_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a1e9983_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_sub_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/users/components/sub.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sub.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_vue__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let sub = class sub extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
};
sub = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: 'sub',
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('users', {
            mount: ({ mount }) => mount
        })),
        components: { "app-search": __WEBPACK_IMPORTED_MODULE_3__search_vue__["a" /* default */] }
    })
], sub);
/* harmony default export */ __webpack_exports__["a"] = (sub);


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42a11096_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__ = __webpack_require__(54);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "8733c6a4"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42a11096_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/users/components/search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] search.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_lib_build_query__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let bq = new __WEBPACK_IMPORTED_MODULE_5__core_lib_build_query__["a" /* build_query */]();
__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let search = class search extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.frm = {
            "id": "",
            "name": "",
            "mail": "",
            "group_id": "",
            "access_token": "",
            "refresh_token": "",
            "new_password": "",
            "confirm_password": "",
            "created_at": "",
            "updated_at": "",
        };
    }
    search() {
        let q = bq.http(this.frm);
        this.$router.push(`${this.mount}?${q}`);
    }
    reset() {
        let frm = this.frm;
        for (let key in frm) {
            frm[key] = null;
        }
    }
    get action() {
        return this.mount;
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
    }
};
search = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: 'find',
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('users', {
            mount: ({ mount }) => mount
        }))
    })
], search);
/* harmony default export */ __webpack_exports__["a"] = (search);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "search" }, [
    _vm._ssrNode(
      "<form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="get"><fieldset><label for="id">Id</label> <input type="text" name="id" placeholder="id"' +
        _vm._ssrAttr("value", _vm.frm.id) +
        '> <label for="name">Name</label> <input type="text" name="name" placeholder="name"' +
        _vm._ssrAttr("value", _vm.frm.name) +
        '> <label for="mail">Mail</label> <input type="email" name="mail" placeholder="mail"' +
        _vm._ssrAttr("value", _vm.frm.mail) +
        '> <label for="group_id">Group</label> <input type="text" name="group_id" placeholder="group_id"' +
        _vm._ssrAttr("value", _vm.frm.group_id) +
        '> <label for="created_at">Created at</label> <input type="datetime-local" name="created_at" placeholder="created_at"' +
        _vm._ssrAttr("value", _vm.frm.created_at) +
        ' class="calendar"> <label for="updated_at">Updated at</label> <input type="datetime-local" name="updated_at" placeholder="updated_at"' +
        _vm._ssrAttr("value", _vm.frm.updated_at) +
        ' class="calendar"></fieldset> <div class="text-right"><button type="button" class="button small warning"><span class="typcn typcn-minus"></span> clear</button> <button type="submit" class="button small "><span class="typcn typcn-zoom"></span> search</button></div></form>'
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "sub" },
    [
      _vm._ssrNode(
        '<div class="panel">',
        "</div>",
        [_vm._ssrNode("<h4>Search</h4> "), _c("app-search")],
        2
      ),
      _vm._ssrNode(" "),
      _vm._ssrNode(
        '<div class="panel">',
        "</div>",
        [
          _vm._ssrNode("<h4>Menu</h4> "),
          _vm._ssrNode('<nav class="navigation-stack">', "</nav>", [
            _vm._ssrNode(
              '<ul class="navigation-list">',
              "</ul>",
              [
                _vm._ssrNode(
                  "<li>",
                  "</li>",
                  [
                    _c("router-link", { attrs: { to: _vm.mount } }, [
                      _vm._v("Index")
                    ])
                  ],
                  1
                ),
                _vm._ssrNode(" "),
                _vm._ssrNode(
                  "<li>",
                  "</li>",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/" + _vm.mount + "/add" } },
                      [_vm._v("Add")]
                    )
                  ],
                  1
                )
              ],
              2
            )
          ])
        ],
        2
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_idx_vue__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_45582900_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_idx_vue__ = __webpack_require__(58);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "0149ddb2"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_idx_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_45582900_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_idx_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/users/components/idx.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] idx.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let idx = class idx extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    asyncData({ store, route }) {
        return store.dispatch("users/fetchEntities", route);
    }
    view(id) {
        return `${this.mount}/${id}`;
    }
    edit(id) {
        return `${this.mount}/${id}/edit`;
    }
    destroy(id, title) {
        let modal = {
            template: "Destroy",
            data: {
                id: id,
                name: title,
                mount: this.mount
            }
        };
        this.setModal(modal);
        this.openModal();
    }
    copy(id) {
        return `${this.mount}/add?copy=${id}`;
    }
};
idx = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "page",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('users', {
            entities: ({ entities }) => entities,
            pagination: ({ page }) => page,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("modal", ["setModal", "toggleModal", "openModal"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("users", ["fetchEntities"])),
        components: {
            pagination: () => new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 14))
        }
    })
], idx);
/* harmony default export */ __webpack_exports__["a"] = (idx);


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "idx" },
    [
      _vm._ssrNode("<h2>Index</h2> "),
      _c("pagination", {
        attrs: { pagination: _vm.pagination, mount: _vm.mount }
      }),
      _vm._ssrNode(" "),
      _vm._l(_vm.entities, function(entity) {
        return _vm._ssrNode(
          '<div class="row border-bottom margin-top">',
          "</div>",
          [
            _vm._ssrNode('<div class="column">', "</div>", [
              _vm._ssrNode(
                "<h3>",
                "</h3>",
                [
                  _c("router-link", { attrs: { to: _vm.view(entity.id) } }, [
                    _vm._v(_vm._s(entity.name))
                  ])
                ],
                1
              )
            ]),
            _vm._ssrNode(" "),
            _vm._ssrNode(
              '<div class="column">',
              "</div>",
              [
                _c(
                  "router-link",
                  {
                    staticClass: "button small",
                    attrs: { to: _vm.edit(entity.id) }
                  },
                  [
                    _c("span", { staticClass: "typcn typcn-edit" }),
                    _vm._v(" edit")
                  ]
                ),
                _vm._ssrNode(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "button small",
                    attrs: { to: _vm.copy(entity.id) }
                  },
                  [
                    _c("span", { staticClass: "typcn typcn-document-add" }),
                    _vm._v(" copy")
                  ]
                ),
                _vm._ssrNode(
                  ' <button class="button small"><span class="typcn typcn-document-delete"></span> delete</button>'
                )
              ],
              2
            )
          ],
          2
        )
      }),
      _vm._ssrNode(" "),
      _c("pagination", {
        attrs: { pagination: _vm.pagination, mount: _vm.mount }
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_add_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_35083b64_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_add_vue__ = __webpack_require__(61);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "570f610b"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_add_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_35083b64_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_add_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/users/components/add.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] add.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_validation__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let add = class add extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.errors = {};
    }
    get action() {
        return `${this.mount}`;
    }
    change(e) {
        let kv = {};
        kv["key"] = e.target.name;
        kv["value"] = e.target.value;
        this.updateEntity(kv);
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
        this.clearEntity();
        let query = this.$store.state.route.query;
        if (query["copy"]) {
            this.copyEntity({ id: query["copy"], mount: this.mount });
        }
    }
    beforeDestroy() {
        this.clearEntity();
    }
    save() {
        this.loading();
        this.insertEntity(this.token).then(r => {
            this.endLoading("success");
            this.$router.push({ path: this.mount });
        }).catch(e => {
            this.errors = e;
            this.endLoading("warning");
        });
        return false;
    }
};
add = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "add",
        components: {},
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("users", {
            entity: ({ entity }) => entity,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("users", ["insertEntity", "clearEntity", "copyEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("users", ["updateEntity", "setErrors"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("loading", ["loading", "endLoading"]), __WEBPACK_IMPORTED_MODULE_5__utilities_validation__["a" /* default */].map(["validationClass"]))
    })
], add);
/* harmony default export */ __webpack_exports__["a"] = (add);


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "add" }, [
    _vm._ssrNode(
      "<h2>Add</h2> <form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="post"><fieldset><div class="form-item"><label for="name">Name</label> <input type="text" name="name" placeholder="name"' +
        _vm._ssrAttr("value", _vm.entity.name) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "name")) +
        "> " +
        _vm._ssrList(_vm.errors.name, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="mail">Mail</label> <input type="email" name="mail" placeholder="mail"' +
        _vm._ssrAttr("value", _vm.entity.mail) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "mail")) +
        "> " +
        _vm._ssrList(_vm.errors.mail, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="group_id">Group</label> ' +
        _vm._ssrList(_vm.errors.group_id, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="new_password">Password</label> <input type="password" name="new_password" placeholder="new_password"' +
        _vm._ssrAttr("value", _vm.entity.new_password) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "new_password")) +
        "> " +
        _vm._ssrList(_vm.errors.new_password, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        " " +
        _vm._ssrList(_vm.errors.isEvenPassword, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="confirm_password">Confirm password</label> <input type="password" name="confirm_password" placeholder="confirm_password"' +
        _vm._ssrAttr("value", _vm.entity.confirm_password) +
        _vm._ssrClass(
          null,
          _vm.validationClass(_vm.errors, "confirm_password")
        ) +
        "> " +
        _vm._ssrList(_vm.errors.confirm_password, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        " " +
        _vm._ssrList(_vm.errors.isEvenPassword, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div></fieldset> <button type="submit"' +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "submit")) +
        ">add</button></form>"
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_00e0411c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__ = __webpack_require__(64);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "1e6d6eab"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_00e0411c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/users/components/view.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] view.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let view = class view extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    asyncData({ store, route }) {
        return store.dispatch('users/fetchEntity', route);
    }
};
view = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "view",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("users", {
            entity: ({ entity }) => entity
        })),
    })
], view);
/* harmony default export */ __webpack_exports__["a"] = (view);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.entity.id
    ? _c("div", { staticClass: "view" }, [
        _vm._ssrNode(
          "<h2>View</h2> <h3>Id</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.id)) +
            "</div> <h3>Name</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.name)) +
            "</div> <h3>Mail</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.mail)) +
            "</div> <h3>Group</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.group_id)) +
            "</div> <h3>Created at</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.created_at)) +
            "</div> <h3>Updated at</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.updated_at)) +
            "</div>"
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17c5d857_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__ = __webpack_require__(67);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "36a36790"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17c5d857_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/users/components/edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] edit.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_validation__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utilities_options_lazy_load__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let edit = class edit extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.groups = [];
        this.change = (e) => {
            let kv = {};
            kv["key"] = e.target.name;
            kv["value"] = e.target.value;
            this.updateEntity(kv);
        };
        this.errors = {
            "user_profile": {}
        };
    }
    asyncData({ store, route }) {
        return store.dispatch('users/fetchEntity', route);
    }
    resolveAsyncData() {
        this.set_options_default({
            options: this.groups,
            text: this.entity.group.name,
            value: this.entity.group_id,
            emptyText: "please select one",
            allowNull: true
        });
    }
    get action() {
        return `${this.mount}/${this.entity.id}`;
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
    }
    save() {
        this.loading();
        this.saveEntity(this.token).then(r => {
            let e = {};
            e["user_profile"] = {};
            this.errors = e;
            this.endLoading("success");
        }).catch(e => {
            e["user_profile"] = {};
            this.errors = e;
            this.endLoading("warning");
        });
    }
};
edit = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "edit",
        components: {},
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("users", {
            entity: ({ entity }) => entity,
            association: ({ association }) => association,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("users", ["fetchEntity", "saveEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("users", ["updateEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("loading", ["loading", "endLoading"]), __WEBPACK_IMPORTED_MODULE_5__utilities_validation__["a" /* default */].map(["validationClass"]), __WEBPACK_IMPORTED_MODULE_6__utilities_options_lazy_load__["a" /* default */].map(["options_load", "set_options_default"]))
    })
], edit);
/* harmony default export */ __webpack_exports__["a"] = (edit);


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "edit" }, [
    _vm._ssrNode(
      "<h2>Edit</h2> <form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="post"><fieldset><input type="hidden" name="id"' +
        _vm._ssrAttr("value", _vm.entity.id) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "id")) +
        '> <div class="form-item"><label for="name">Name</label> <input type="text" name="name" placeholder="name"' +
        _vm._ssrAttr("value", _vm.entity.name) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "name")) +
        "> " +
        _vm._ssrList(_vm.errors.name, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="mail">Mail</label> <input type="email" name="mail" placeholder="mail"' +
        _vm._ssrAttr("value", _vm.entity.mail) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "mail")) +
        "> " +
        _vm._ssrList(_vm.errors.mail, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="group_id">Group</label> <div class="form-select"><select name="group_id"' +
        _vm._ssrAttr("value", _vm.entity.group_id) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "group_id")) +
        ">" +
        _vm._ssrList(_vm.groups, function(group) {
          return (
            "<option" +
            _vm._ssrAttr("disabled", group.disabled) +
            _vm._ssrAttr("value", group.value) +
            ">" +
            _vm._ssrEscape(_vm._s(group.text)) +
            "</option>"
          )
        }) +
        "</select></div> " +
        _vm._ssrList(_vm.errors.group_id, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="new_password">New password</label> <input type="password" name="new_password" placeholder="new_password"' +
        _vm._ssrAttr("value", _vm.entity.new_password) +
        _vm._ssrClass(
          null,
          _vm.validationClass(_vm.errors, "new_password", ["isEvenPassword"])
        ) +
        "> " +
        _vm._ssrList(_vm.errors.new_password, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        " " +
        _vm._ssrList(_vm.errors.isEvenPassword, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="confirm_password">Confirm password</label> <input type="password" name="confirm_password" placeholder="confirm_password"' +
        _vm._ssrAttr("value", _vm.entity.confirm_password) +
        _vm._ssrClass(
          null,
          _vm.validationClass(_vm.errors, "confirm_password", [
            "isEvenPassword"
          ])
        ) +
        "> " +
        _vm._ssrList(_vm.errors.confirm_password, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        " " +
        _vm._ssrList(_vm.errors.isEvenPassword, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div> <div class="form-item"><label for="last_name">Last name</label> <input type="text" name="user_profile.last_name" s:value="entity.user_profile.last_name" placeholder="last_name"> ' +
        _vm._ssrList(_vm.errors.user_profile.last_name, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div></fieldset> <button type="submit"' +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "submit")) +
        ">update</button></form>"
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2756e128_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(70);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "adae315a"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2756e128_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/users/components/login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_validation__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resources_auth__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let login = class login extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.user = {
            account: "",
            password: ""
        };
        this.errors = {};
    }
    get action() {
        return "/api/users/login";
    }
    login() {
        let auth = new __WEBPACK_IMPORTED_MODULE_4__resources_auth__["a" /* auth */]();
        auth.login(this.user, this.token).then(r => {
            this.errors = {};
            this.$router.push("/tasks");
        }).catch(e => {
            console.log(e);
            this.errors = e;
            console.log("login failed");
        });
    }
};
login = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "login",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])('auth', ["feeds"])),
        methods: Object.assign({}, __WEBPACK_IMPORTED_MODULE_3__utilities_validation__["a" /* default */].map(["validationClass"]))
    })
], login);
/* harmony default export */ __webpack_exports__["a"] = (login);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "login column column-md-50 column-md-offset-25" },
    [
      _vm._ssrNode(
        '<div class="panel"><h1 class="text-center">Application</h1> <h2>Login</h2> <form' +
          _vm._ssrAttr("action", _vm.action) +
          ' method="post"><fieldset><input type="hidden" name="_csrf"' +
          _vm._ssrAttr("value", _vm.token) +
          '> <div class="form-item"><label for="name">user name or e-mail </label> <input type="text" name="account" placeholder="user name or e-mail"' +
          _vm._ssrAttr("value", _vm.user.account) +
          _vm._ssrClass(null, _vm.validationClass(_vm.errors, "account")) +
          "> " +
          _vm._ssrList(_vm.errors.account, function(e) {
            return (
              '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
              _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
              "</div>"
            )
          }) +
          '</div> <div class="form-item"><label for="password">Password</label> <input type="password" name="password" placeholder="password"' +
          _vm._ssrAttr("value", _vm.user.password) +
          _vm._ssrClass(null, _vm.validationClass(_vm.errors, "password")) +
          "> " +
          _vm._ssrList(_vm.errors.password, function(e) {
            return (
              '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
              _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
              "</div>"
            )
          }) +
          '</div></fieldset> <button type="submit"' +
          _vm._ssrClass(null, _vm.validationClass(_vm.errors, "submit")) +
          ">Login</button></form></div>"
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_idx_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_add_vue__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_view_vue__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_edit_vue__ = __webpack_require__(87);






let mount = "/groups";
/* harmony default export */ __webpack_exports__["a"] = ([
    { name: "groups_page", path: `${mount}/page/:page*`, components: { main: __WEBPACK_IMPORTED_MODULE_2__components_idx_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "groups_index", path: `${mount}/page/1`, alias: `${mount}/` },
    { name: "groups_add", path: `${mount}/add`, components: { main: __WEBPACK_IMPORTED_MODULE_3__components_add_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "groups_view", path: `${mount}/:id`, components: { main: __WEBPACK_IMPORTED_MODULE_4__components_view_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
    { name: "groups_edit", path: `${mount}/:id/edit`, components: { main: __WEBPACK_IMPORTED_MODULE_5__components_edit_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_0__navigation_components_navigation_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_1__components_sub_vue__["a" /* default */] } },
]);


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sub_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30a9db5d_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_sub_vue__ = __webpack_require__(77);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "4f876a96"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sub_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30a9db5d_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_sub_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/groups/components/sub.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sub.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_vue__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let sub = class sub extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
};
sub = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: 'sub',
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('groups', {
            mount: ({ mount }) => mount
        })),
        components: { "app-search": __WEBPACK_IMPORTED_MODULE_3__search_vue__["a" /* default */] }
    })
], sub);
/* harmony default export */ __webpack_exports__["a"] = (sub);


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4633af9b_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__ = __webpack_require__(76);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "1f51a9c2"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4633af9b_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/groups/components/search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] search.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_lib_build_query__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let bq = new __WEBPACK_IMPORTED_MODULE_5__core_lib_build_query__["a" /* build_query */]();
__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let search = class search extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.frm = {
            "id": "",
            "name": "",
            "created_at": "",
            "updated_at": "",
        };
    }
    search() {
        let q = bq.http(this.frm);
        this.$router.push(`${this.mount}?${q}`);
    }
    reset() {
        let frm = this.frm;
        for (let key in frm) {
            frm[key] = null;
        }
    }
    get action() {
        return this.mount;
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
    }
};
search = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: 'find',
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('groups', {
            mount: ({ mount }) => mount
        }))
    })
], search);
/* harmony default export */ __webpack_exports__["a"] = (search);


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "search" }, [
    _vm._ssrNode(
      "<form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="get"><fieldset><label for="id">Id</label> <input type="text" name="id" placeholder="id"' +
        _vm._ssrAttr("value", _vm.frm.id) +
        '> <label for="name">Name</label> <input type="text" name="name" placeholder="name"' +
        _vm._ssrAttr("value", _vm.frm.name) +
        '> <label for="created_at">Created at</label> <input type="datetime-local" name="created_at" placeholder="created_at"' +
        _vm._ssrAttr("value", _vm.frm.created_at) +
        ' class="calendar"> <label for="updated_at">Updated at</label> <input type="datetime-local" name="updated_at" placeholder="updated_at"' +
        _vm._ssrAttr("value", _vm.frm.updated_at) +
        ' class="calendar"></fieldset> <div class="text-right"><button type="button" class="button small warning"><span class="typcn typcn-minus"></span> clear</button> <button type="submit" class="button small "><span class="typcn typcn-zoom"></span> search</button></div></form>'
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "sub" },
    [
      _vm._ssrNode(
        '<div class="panel">',
        "</div>",
        [_vm._ssrNode("<h4>Search</h4> "), _c("app-search")],
        2
      ),
      _vm._ssrNode(" "),
      _vm._ssrNode(
        '<div class="panel">',
        "</div>",
        [
          _vm._ssrNode("<h4>Menu</h4> "),
          _vm._ssrNode('<nav class="navigation-stack">', "</nav>", [
            _vm._ssrNode(
              '<ul class="navigation-list">',
              "</ul>",
              [
                _vm._ssrNode(
                  "<li>",
                  "</li>",
                  [
                    _c("router-link", { attrs: { to: "/" + _vm.mount } }, [
                      _vm._v("Index")
                    ])
                  ],
                  1
                ),
                _vm._ssrNode(" "),
                _vm._ssrNode(
                  "<li>",
                  "</li>",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/" + _vm.mount + "/add" } },
                      [_vm._v("Add")]
                    )
                  ],
                  1
                )
              ],
              2
            )
          ])
        ],
        2
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_idx_vue__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_03df2d5a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_idx_vue__ = __webpack_require__(80);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "22bcbc93"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_idx_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_03df2d5a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_idx_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/groups/components/idx.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] idx.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pagination_components_pagination_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let idx = class idx extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    asyncData({ store, route }) {
        return store.dispatch("groups/fetchEntities", route);
    }
    mounted() {
        this.fetchList();
    }
    view(id) {
        return `/${this.mount}/${id}`;
    }
    edit(id) {
        return `/${this.mount}/${id}/edit`;
    }
    destroy(id, title) {
        let modal = {
            template: "Destroy",
            data: {
                id: id,
                name: title,
                mount: this.mount
            }
        };
        this.setModal(modal);
        this.openModal();
    }
    copy(id) {
        return `/${this.mount}/add?copy=${id}`;
    }
};
idx = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "page",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["c" /* mapGetters */])([
            'domain'
        ]), Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["e" /* mapState */])('groups', {
            entities: ({ entities }) => entities,
            pagination: ({ page }) => page,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["d" /* mapMutations */])("modal", ["setModal", "toggleModal", "openModal"]), Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapActions */])("groups", ["fetchEntities", "fetchList"])),
        components: { pagination: __WEBPACK_IMPORTED_MODULE_2__pagination_components_pagination_vue__["default"] }
    })
], idx);
/* harmony default export */ __webpack_exports__["a"] = (idx);


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "idx" },
    [
      _vm._ssrNode("<h2>Index</h2> "),
      _c("pagination", {
        attrs: { pagination: _vm.pagination, mount: _vm.mount }
      }),
      _vm._ssrNode(" "),
      _vm._l(_vm.entities, function(entity) {
        return _vm._ssrNode(
          '<div class="row border-bottom margin-top">',
          "</div>",
          [
            _vm._ssrNode('<div class="column">', "</div>", [
              _vm._ssrNode(
                "<h3>",
                "</h3>",
                [
                  _c("router-link", { attrs: { to: _vm.view(entity.id) } }, [
                    _vm._v(_vm._s(entity.name))
                  ])
                ],
                1
              )
            ]),
            _vm._ssrNode(" "),
            _vm._ssrNode(
              '<div class="column">',
              "</div>",
              [
                _c(
                  "router-link",
                  {
                    staticClass: "button small",
                    attrs: { to: _vm.edit(entity.id) }
                  },
                  [
                    _c("span", { staticClass: "typcn typcn-edit" }),
                    _vm._v(" edit")
                  ]
                ),
                _vm._ssrNode(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "button small",
                    attrs: { to: _vm.copy(entity.id) }
                  },
                  [
                    _c("span", { staticClass: "typcn typcn-document-add" }),
                    _vm._v(" copy")
                  ]
                ),
                _vm._ssrNode(
                  ' <button class="button small"><span class="typcn typcn-document-delete"></span> delete</button>'
                )
              ],
              2
            )
          ],
          2
        )
      }),
      _vm._ssrNode(" "),
      _c("pagination", {
        attrs: { pagination: _vm.pagination, mount: _vm.mount }
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_add_vue__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b937d3e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_add_vue__ = __webpack_require__(83);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "7a710c77"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_add_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b937d3e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_add_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/groups/components/add.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] add.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_validation__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let add = class add extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.change = (e) => {
            let kv = {};
            kv["key"] = e.target.name;
            kv["value"] = e.target.value;
            this.updateEntity(kv);
        };
        this.errors = {};
    }
    get action() {
        return `${this.mount}`;
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
        this.clearEntity();
        let query = this.$store.state.route.query;
        if (query["copy"]) {
            this.copyEntity({ id: query["copy"], mount: this.mount });
        }
    }
    beforeDestroy() {
        this.clearEntity();
    }
    save() {
        this.loading();
        this.insertEntity(this.token).then(r => {
            this.endLoading("success");
            this.$router.push({ path: this.mount });
        }).catch(e => {
            this.errors = e;
            this.endLoading("warning");
        });
        return false;
    }
};
add = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "add",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("groups", {
            entity: ({ entity }) => entity,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("groups", ["insertEntity", "clearEntity", "copyEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("groups", ["updateEntity", "setErrors"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("loading", ["loading", "endLoading"]), __WEBPACK_IMPORTED_MODULE_5__utilities_validation__["a" /* default */].map(["validationClass"]))
    })
], add);
/* harmony default export */ __webpack_exports__["a"] = (add);


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "add" }, [
    _vm._ssrNode(
      "<h2>Add</h2> <form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="post"><fieldset><div class="form-item"><label for="name">Name</label> <input type="text" name="name" placeholder="name"' +
        _vm._ssrAttr("value", _vm.entity.name) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "name")) +
        "> " +
        _vm._ssrList(_vm.errors.name, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div></fieldset> <button type="submit"' +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "submit")) +
        ">add</button></form>"
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ab264e50_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__ = __webpack_require__(86);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "674130bf"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ab264e50_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/groups/components/view.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] view.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let view = class view extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    asyncData({ store, route }) {
        return store.dispatch('groups/fetchEntity', route);
    }
};
view = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "view",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("groups", {
            entity: ({ entity }) => entity
        })),
    })
], view);
/* harmony default export */ __webpack_exports__["a"] = (view);


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.entity.id
    ? _c("div", { staticClass: "view" }, [
        _vm._ssrNode(
          "<h2>View</h2> <h3>Id</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.id)) +
            "</div> <h3>Name</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.name)) +
            "</div> <h3>Created at</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.created_at)) +
            "</div> <h3>Updated at</h3> <div>" +
            _vm._ssrEscape(_vm._s(_vm.entity.updated_at)) +
            "</div>"
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7aba5c86_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__ = __webpack_require__(89);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "7f7729a4"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7aba5c86_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/groups/components/edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] edit.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_validation__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






__WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'middleware',
    'layout',
    'transition',
    'scrollToTop'
]);
let edit = class edit extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.change = (e) => {
            let kv = {};
            kv["key"] = e.target.name;
            kv["value"] = e.target.value;
            this.updateEntity(kv);
        };
        this.errors = {};
    }
    asyncData({ store, route }) {
        return store.dispatch('groups/fetchEntity', route);
    }
    get action() {
        return `${this.mount}/${this.entity.id}`;
    }
    mounted() {
        if (window) {
            __WEBPACK_IMPORTED_MODULE_3_flatpickr__(".calendar", {
                "enableTime": true,
                "plugins": [__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__({})]
            });
        }
    }
    save() {
        this.loading();
        this.saveEntity(this.token).then(r => {
            this.errors = {};
            this.endLoading("success");
        }).catch(e => {
            this.errors = e;
            this.endLoading("warning");
        });
    }
};
edit = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "edit",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("groups", {
            entity: ({ entity }) => entity,
            mount: ({ mount }) => mount
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("groups", ["fetchEntity", "saveEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("groups", ["updateEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("loading", ["loading", "endLoading"]), __WEBPACK_IMPORTED_MODULE_5__utilities_validation__["a" /* default */].map(["validationClass"]))
    })
], edit);
/* harmony default export */ __webpack_exports__["a"] = (edit);


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "edit" }, [
    _vm._ssrNode(
      "<h2>Edit</h2> <form" +
        _vm._ssrAttr("action", _vm.action) +
        ' method="post"><fieldset><input type="hidden" name="id"' +
        _vm._ssrAttr("value", _vm.entity.id) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "id")) +
        '> <div class="form-item"><label for="name">Name</label> <input type="text" name="name" placeholder="name"' +
        _vm._ssrAttr("value", _vm.entity.name) +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "name")) +
        "> " +
        _vm._ssrList(_vm.errors.name, function(e) {
          return (
            '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
            _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
            "</div>"
          )
        }) +
        '</div></fieldset> <button type="submit"' +
        _vm._ssrClass(null, _vm.validationClass(_vm.errors, "submit")) +
        ">update</button></form>"
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading_store_module__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_store_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__offset_store_module__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tasks_store_module__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__users_store_module__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__groups_store_module__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_store_module__ = __webpack_require__(122);


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);







function createStore(feeds) {
    let getters = {
        token: (state) => {
            if (typeof window === "undefined") {
                return "";
            }
            let body = document.getElementsByTagName("body")[0];
            let csrfToken = body.attributes["data-csrf-token"].value;
            return csrfToken;
        }
    };
    let tasks = new __WEBPACK_IMPORTED_MODULE_5__tasks_store_module__["a" /* store_module */]({ resource: "tasks", endPoint: "/api/tasks", feeds: feeds }).store();
    let users = new __WEBPACK_IMPORTED_MODULE_6__users_store_module__["a" /* store_module */]({ resource: "users", endPoint: "/api/users", feeds: feeds }).store();
    let groups = new __WEBPACK_IMPORTED_MODULE_7__groups_store_module__["a" /* store_module */]({ resource: "groups", endPoint: "/api/groups", feeds: feeds }).store();
    let auth = new __WEBPACK_IMPORTED_MODULE_8__auth_store_module__["a" /* store_module */]({ feeds: feeds }).store();
    let loading = new __WEBPACK_IMPORTED_MODULE_2__loading_store_module__["a" /* store_module */]({ feeds: feeds }).store();
    let modal = new __WEBPACK_IMPORTED_MODULE_3__modal_store_module__["a" /* store_module */]({ feeds: feeds }).store();
    let offset = new __WEBPACK_IMPORTED_MODULE_4__offset_store_module__["a" /* store_module */]({ feeds: feeds }).store();
    let vuex = {
        getters: getters,
        modules: {
            "tasks": tasks,
            "loading": loading,
            "modal": modal,
            "users": users,
            "groups": groups,
            "auth": auth,
            "offset": offset
        }
    };
    return new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store(vuex);
}


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(95);





class store_module extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__["a" /* store_module */] {
    constructor(options) {
        super();
        this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
        this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
        this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
        this.getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = store_module;



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__ = __webpack_require__(8);

class mutations extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__["a" /* mutations */] {
    constructor(options) {
        super();
        this.setIndicator = ({ indicator }, { status, complate }) => {
            let before = indicator.complate;
            indicator.status = status;
            indicator.show = true;
            indicator.complate = complate;
            if (complate >= 100) {
                indicator.prosess = false;
                if (status === "success") {
                    indicator.status = "primary";
                }
            }
            else {
                indicator.prosess = true;
            }
        };
        this.loading = (state, status) => {
            this.setIndicator(state, { status: status, complate: 3 });
            state.overLay = true;
            state.loading = true;
        };
        this.endLoading = (state, status) => {
            this.setIndicator(state, { status: status, complate: 100 });
            state.loading = false;
            state.overLay = false;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__ = __webpack_require__(9);

class actions extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__["a" /* actions */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actions;



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__ = __webpack_require__(10);

class state extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__["a" /* state */] {
    constructor(options) {
        super();
        this.overLay = false;
        this.loading = false;
        this.indicator = {
            show: false,
            status: "success",
            complate: 0,
            prosess: true
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = state;



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__ = __webpack_require__(11);

class getters extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__["a" /* getters */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getters;



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(100);





class store_module extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__["a" /* store_module */] {
    constructor(options) {
        super();
        this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
        this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
        this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
        this.getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = store_module;



/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__ = __webpack_require__(8);

class mutations extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__["a" /* mutations */] {
    constructor(options) {
        super();
        this.setModal = (state, { template, data, show }) => {
            state.template = template;
            state.data = data;
        };
        this.toggleModal = (state) => {
            if (!state.show) {
                state.close = true;
            }
            state.show = (state.show) ? false : true;
        };
        this.closeModal = (state) => {
            state.show = false;
        };
        this.openModal = (state) => {
            state.close = true;
            state.show = true;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;



/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__ = __webpack_require__(9);

class actions extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__["a" /* actions */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actions;



/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__ = __webpack_require__(10);

class state extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__["a" /* state */] {
    constructor(options) {
        super();
        this.close = false;
        this.show = false;
        this.template = "";
        this.data = {
            id: "",
            name: ""
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = state;



/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__ = __webpack_require__(11);

class getters extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__["a" /* getters */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getters;



/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(105);





class store_module extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__["a" /* store_module */] {
    constructor(options) {
        super();
        this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
        this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
        this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
        this.getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = store_module;



/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__ = __webpack_require__(8);

class mutations extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__["a" /* mutations */] {
    constructor(options) {
        super();
        this.setOffset = (state, { template, data, show }) => {
            state.template = template;
            state.data = data;
        };
        this.toggleOffset = (state) => {
            if (!state.show) {
                state.close = true;
            }
            state.show = (state.show) ? false : true;
        };
        this.closeOffset = (state) => {
            state.show = false;
        };
        this.openOffset = (state) => {
            state.close = true;
            state.show = true;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;



/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__ = __webpack_require__(9);

class actions extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__["a" /* actions */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actions;



/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__ = __webpack_require__(10);

class state extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__["a" /* state */] {
    constructor(options) {
        super();
        this.close = false;
        this.show = false;
        this.template = "";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = state;



/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__ = __webpack_require__(11);

class getters extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__["a" /* getters */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getters;



/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__ = __webpack_require__(15);






class store_module extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__["a" /* store_module */] {
    constructor(options) {
        super();
        this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
        this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
        this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
        let local_getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
        let crud = () => {
            return new __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__["a" /* internal_crud */](options);
        };
        this.getters = Object.assign({}, local_getters, { crud: crud });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = store_module;



/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__ = __webpack_require__(8);

class mutations extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__["a" /* mutations */] {
    constructor(options) {
        super();
        this.setEntities = (state, paginate) => {
            state.entities = paginate[this._resource];
            state.page = paginate.page;
        };
        this.setEntity = (state, response) => {
            state.entity = response;
        };
        this.updateEntity = (state, kv) => {
            state.entity[kv.key] = kv.value;
        };
        this.setClearEntity = (state) => {
            let entity = state.entity;
            for (let key in entity) {
                entity[key] = null;
                if (key === "id" || key === "created_at" || key === "updated_at") {
                    delete entity[key];
                }
                if (key === "errors") {
                    entity[key] = [];
                }
            }
        };
        this.setErrors = (state, errors) => {
            state.entity["errors"] = errors;
        };
        this._mount = options.mount;
        this._resource = options.resource;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;



/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__ = __webpack_require__(9);

class actions extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__["a" /* actions */] {
    constructor(feeds) {
        super();
        this.fetchEntities = ({ commit, getters, state }, route) => {
            let crud = getters.crud;
            return crud.paginate(route).then((paginate) => {
                commit("setEntities", paginate);
            });
        };
        this.fetchEntity = ({ commit, getters, state }, route) => {
            let crud = getters.crud;
            return crud.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        };
        this.copyEntity = ({ commit, getters, state }, copy) => {
            let route = {
                params: {
                    id: copy.id,
                },
                path: copy.mount + "/" + copy.id,
            };
            let crud = getters.crud;
            return crud.entity(route).then((entity) => {
                for (let key in entity) {
                    if (key === "id" || key === "updated_at" || key === "created_at") {
                        delete entity[key];
                    }
                }
                commit("setEntity", entity);
            });
        };
        this.insertEntity = ({ state, commit, getters }, token) => {
            let crud = getters.crud;
            return crud.insert(state.entity, token);
        };
        this.saveEntity = ({ state, commit, getters }, token) => {
            let crud = getters.crud;
            return crud.update(state.entity, token);
        };
        this.deleteEntity = ({ state, commit, getters }, delObj) => {
            let crud = getters.crud;
            return crud.delete(delObj.id, delObj.token);
        };
        this.clearEntity = ({ commit }) => {
            return Promise.resolve(commit("setClearEntity"));
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actions;



/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__ = __webpack_require__(10);

class state extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__["a" /* state */] {
    constructor(options) {
        super();
        this.mount = "";
        this.entities = [];
        this.entity = {};
        this.page = {
            totalPage: 1,
            currentPage: 1,
            queryPrams: {}
        };
        this.mount = options.resource;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = state;



/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__ = __webpack_require__(11);

class getters extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__["a" /* getters */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getters;



/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(159);

class route_parse extends __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* utility */] {
    parse(route) {
        let params = route.params;
        let paramsStr = "";
        for (let key in params) {
            paramsStr = `${key}/${params[key]}`;
        }
        return paramsStr;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (new route_parse());


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__ = __webpack_require__(15);






class store_module extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__["a" /* store_module */] {
    constructor(options) {
        super();
        this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
        this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
        this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
        let local_getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
        let crud = () => {
            return new __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__["a" /* internal_crud */](options);
        };
        this.getters = Object.assign({}, local_getters, { crud: crud });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = store_module;



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__ = __webpack_require__(8);

class mutations extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__["a" /* mutations */] {
    constructor(options) {
        super();
        this.setEntities = (state, paginate) => {
            state.entities = paginate[this._resource];
            state.page = paginate.page;
        };
        this.setEntity = (state, entity) => {
            if (this.isServer()) {
                entity = JSON.parse(JSON.stringify(entity));
            }
            for (let k in entity) {
                if (typeof entity[k] === "string") {
                    state.entity[k] = entity[k];
                    continue;
                }
                if (typeof entity[k] === "object" && typeof state.entity[k] === "object") {
                    state.entity[k] = Object.assign(state.entity[k], entity[k]);
                }
            }
        };
        this.updateEntity = (state, kv) => {
            let key = kv.key;
            let value = kv.value;
            if (key.indexOf(".") > -1) {
                let sp = key.split(".");
                key = sp.shift();
                for (let i = 0; i < sp.length; i++) {
                    let ne = {};
                    ne[sp[i]] = value;
                    value = ne;
                }
            }
            state.entity[key] = value;
        };
        this.setClearEntity = (state) => {
            let entity = state.entity;
            for (let key in entity) {
                entity[key] = null;
                if (key === "id" || key === "created_at" || key === "updated_at") {
                    delete entity[key];
                }
                if (key === "errors") {
                    entity[key] = [];
                }
            }
        };
        this.setErrors = (state, errors) => {
            state.entity["errors"] = errors;
        };
        this._mount = options.mount;
        this._resource = options.resource;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;



/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__ = __webpack_require__(9);

class actions extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__["a" /* actions */] {
    constructor(feeds) {
        super();
        this.fetchEntities = ({ commit, getters, state }, route) => {
            let crud = getters.crud;
            return crud.paginate(route).then((paginate) => {
                commit("setEntities", paginate);
            });
        };
        this.fetchEntity = ({ commit, getters, state }, route) => {
            let crud = getters.crud;
            return crud.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        };
        this.copyEntity = ({ commit, getters, state }, copy) => {
            let route = {
                params: {
                    id: copy.id,
                },
                path: copy.mount + "/" + copy.id,
            };
            let crud = getters.crud;
            return crud.entity(route).then((entity) => {
                for (let key in entity) {
                    if (key === "id" || key === "updated_at" || key === "created_at") {
                        delete entity[key];
                    }
                }
                commit("setEntity", entity);
            });
        };
        this.insertEntity = ({ state, commit, getters }, token) => {
            let crud = getters.crud;
            return crud.insert(state.entity, token);
        };
        this.saveEntity = ({ state, commit, getters }, token) => {
            let crud = getters.crud;
            if (state.entity.new_password === "") {
                delete state.entity.new_password;
            }
            if (state.entity.confirm_password === "") {
                delete state.entity.confirm_password;
            }
            return crud.update(state.entity, token);
        };
        this.deleteEntity = ({ state, commit, getters }, delObj) => {
            let crud = getters.crud;
            return crud.delete(delObj.id, delObj.token);
        };
        this.clearEntity = ({ commit }) => {
            return Promise.resolve(commit("setClearEntity"));
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actions;



/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__ = __webpack_require__(10);

class state extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__["a" /* state */] {
    constructor(options) {
        super();
        this.mount = "";
        this.association = {
            hasMany: ["user_profiles"],
            belongsTo: ["groups"]
        };
        this.entities = [];
        this.entity = {
            group: {
                id: null
            },
            user_profile: {
                id: null
            }
        };
        this.page = {
            totalPage: 1,
            currentPage: 1,
            queryPrams: {}
        };
        this.mount = options.resource;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = state;



/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__ = __webpack_require__(11);

class getters extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__["a" /* getters */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getters;



/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__ = __webpack_require__(15);






class store_module extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__["a" /* store_module */] {
    constructor(options) {
        super();
        this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
        this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
        this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
        let local_getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
        let crud = () => {
            return new __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__["a" /* internal_crud */](options);
        };
        this.getters = Object.assign({}, local_getters, { crud: crud });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = store_module;



/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__ = __webpack_require__(8);

class mutations extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__["a" /* mutations */] {
    constructor(options) {
        super();
        this.setEntities = (state, paginate) => {
            state.entities = paginate[this._resource];
            state.page = paginate.page;
        };
        this.setEntity = (state, entity) => {
            state.entity = entity;
        };
        this.setList = (state, list) => {
            state.list = list;
        };
        this.updateEntity = (state, kv) => {
            state.entity[kv.key] = kv.value;
        };
        this.setClearEntity = (state) => {
            let entity = state.entity;
            for (let key in entity) {
                entity[key] = null;
                if (key === "id" || key === "created_at" || key === "updated_at") {
                    delete entity[key];
                }
                if (key === "errors") {
                    entity[key] = [];
                }
            }
        };
        this.setErrors = (state, errors) => {
            state.entity["errors"] = errors;
        };
        this._mount = options.mount;
        this._resource = options.resource;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;



/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__ = __webpack_require__(9);

class actions extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__["a" /* actions */] {
    constructor(feeds) {
        super();
        this.fetchEntities = ({ commit, getters, state }, route) => {
            let crud = getters.crud;
            return crud.paginate(route).then((paginate) => {
                commit("setEntities", paginate);
            });
        };
        this.fetchEntity = ({ commit, getters, state }, route) => {
            let crud = getters.crud;
            return crud.entity(route).then((entity) => {
                commit("setEntity", entity);
            });
        };
        this.fetchList = ({ commit, getters, state }) => {
            let crud = getters.crud;
            return crud.list().then((list) => {
                console.log(list);
                commit("setList", list);
            });
        };
        this.copyEntity = ({ commit, getters, state }, copy) => {
            let route = {
                params: {
                    id: copy.id,
                },
                path: copy.mount + "/" + copy.id,
            };
            let crud = getters.crud;
            return crud.entity(route).then((entity) => {
                for (let key in entity) {
                    if (key === "id" || key === "updated_at" || key === "created_at") {
                        delete entity[key];
                    }
                }
                commit("setEntity", entity);
            });
        };
        this.insertEntity = ({ state, commit, getters }, token) => {
            let crud = getters.crud;
            return crud.insert(state.entity, token);
        };
        this.saveEntity = ({ state, commit, getters }, token) => {
            let crud = getters.crud;
            return crud.update(state.entity, token);
        };
        this.deleteEntity = ({ state, commit, getters }, delObj) => {
            let crud = getters.crud;
            return crud.delete(delObj.id, delObj.token);
        };
        this.clearEntity = ({ commit }) => {
            return Promise.resolve(commit("setClearEntity"));
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actions;



/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__ = __webpack_require__(10);

class state extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__["a" /* state */] {
    constructor(options) {
        super();
        this.mount = "";
        this.entities = [];
        this.entity = {};
        this.page = {
            totalPage: 1,
            currentPage: 1,
            queryPrams: {}
        };
        this.list = {};
        this.mount = options.resource;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = state;



/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__ = __webpack_require__(11);

class getters extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__["a" /* getters */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getters;



/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_auth__ = __webpack_require__(16);






class store_module extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_store_module__["a" /* store_module */] {
    constructor(options) {
        super();
        this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
        this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
        this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
        let lgetters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
        this.getters = Object.assign({}, lgetters, { feeds: function () { return options; } });
        let local_getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
        let api = () => {
            return new __WEBPACK_IMPORTED_MODULE_5__resources_auth__["a" /* auth */](options);
        };
        this.getters = Object.assign({}, local_getters, { api: api });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = store_module;



/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__ = __webpack_require__(8);

class mutations extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_mutations__["a" /* mutations */] {
    constructor(options) {
        super();
        this.setAuthUser = (state, user) => {
            state.auth_status = true;
            state.user = user;
        };
        this.restAuthUser = (state) => {
            state.auth_status = false;
            for (let k in state.user) {
                state.user[k] = null;
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;



/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__ = __webpack_require__(9);

class actions extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_actions__["a" /* actions */] {
    constructor(options) {
        super();
        this.fetchAuthUser = ({ commit, getters, state }) => {
            let api = getters.api;
            return api.user().then(r => {
                commit("setAuthUser", r);
            }).catch(e => {
                console.log(e);
                return Promise.resolve();
            });
        };
        this.logout = ({ commit, getters, state }) => {
            let api = getters.api;
            return api.logout().then(r => {
                commit("restAuthUser");
            });
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actions;



/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__ = __webpack_require__(10);

class state extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_state__["a" /* state */] {
    constructor(options) {
        super();
        this.auth_status = false;
        this.user = {
            id: "",
            name: "",
            mail: ""
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = state;



/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__ = __webpack_require__(11);

class getters extends __WEBPACK_IMPORTED_MODULE_0__core_spa_stores_getters__["a" /* getters */] {
    constructor(options) {
        super();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getters;



/***/ }),
/* 127 */
/***/ (function(module, exports) {

exports.sync = function (store, router, options) {
  var moduleName = (options || {}).moduleName || 'route'

  store.registerModule(moduleName, {
    namespaced: true,
    state: cloneRoute(router.currentRoute),
    mutations: {
      'ROUTE_CHANGED': function ROUTE_CHANGED (state, transition) {
        store.state[moduleName] = cloneRoute(transition.to, transition.from)
      }
    }
  })

  var isTimeTraveling = false
  var currentPath

  // sync router on store change
  var storeUnwatch = store.watch(
    function (state) { return state[moduleName]; },
    function (route) {
      var fullPath = route.fullPath;
      if (fullPath === currentPath) {
        return
      }
      if (currentPath != null) {
        isTimeTraveling = true
        router.push(route)
      }
      currentPath = fullPath
    },
    { sync: true }
  )

  // sync store on router navigation
  var afterEachUnHook = router.afterEach(function (to, from) {
    if (isTimeTraveling) {
      isTimeTraveling = false
      return
    }
    currentPath = to.fullPath
    store.commit(moduleName + '/ROUTE_CHANGED', { to: to, from: from })
  })

  return function unsync () {
    // On unsync, remove router hook
    if (afterEachUnHook != null) {
      afterEachUnHook()
    }

    // On unsync, remove store watch
    if (storeUnwatch != null) {
      storeUnwatch()
    }

    // On unsync, unregister Module with store
    store.unregisterModule(moduleName)
  }
}

function cloneRoute (to, from) {
  var clone = {
    name: to.name,
    path: to.path,
    hash: to.hash,
    query: to.query,
    params: to.params,
    fullPath: to.fullPath,
    meta: to.meta
  }
  if (from) {
    clone.from = cloneRoute(from)
  }
  return Object.freeze(clone)
}



/***/ }),
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class utility {
    constructor() {
        this.map = (call) => {
            if (call === "all") {
                call = Object.keys(this);
            }
            let map = {};
            for (let idx in call) {
                if (typeof this[call[idx]] === 'undefined') {
                    continue;
                }
                if (call[idx].charAt(0) === '_') {
                    continue;
                }
                if (call[idx] === 'map') {
                    continue;
                }
                if (call[idx] === 'constructor') {
                    continue;
                }
                if (typeof idx === 'number') {
                    map[call[String(idx)]] = this[call[String(idx)]];
                    continue;
                }
                map[call[idx]] = this[call[idx]];
            }
            return map;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = utility;



/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources_client_fetch__ = __webpack_require__(17);


let cf = new __WEBPACK_IMPORTED_MODULE_1__resources_client_fetch__["a" /* client_fetch */]();
class options_lazy_load extends __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* utility */] {
    options_load(value, options, url, e) {
        e.target.classList.toggle('loading');
        cf.fetch(url, {}).then((res) => {
            res.forEach((v) => {
                if (v.value === value) {
                    return;
                }
                options.push(v);
            });
            e.target.classList.toggle('loading');
        });
    }
    set_options_default(config) {
        config.options.push({ text: "please select one", value: "", disabled: true });
        config.options.push({ text: config.text, value: config.value });
        if (config.allowNull) {
            config.options.push({ text: "none", value: "" });
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (new options_lazy_load());


/***/ })
/******/ ])));