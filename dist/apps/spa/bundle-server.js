(function (e, a) { for (var i in a)
    e[i] = a[i]; }(exports, /******/ (function (modules) {
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/ }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/ 
        };
        /******/
        /******/ // Execute the module function
        /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/ module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/ 
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/ __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/ __webpack_require__.d = function (exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
                /******/ 
            });
            /******/ }
        /******/ 
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function (module) {
        /******/ var getter = module && module.__esModule ?
            /******/ function getDefault() { return module['default']; } :
            /******/ function getModuleExports() { return module; };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/ 
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ // __webpack_public_path__
    /******/ __webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/ return __webpack_require__(__webpack_require__.s = 14);
    /******/ 
})([
    /* 0 */
    /***/ (function (module, exports) {
        module.exports = require("vue");
        /***/ 
    }),
    /* 1 */
    /***/ (function (module, exports) {
        /* globals __VUE_SSR_CONTEXT__ */
        // this module is a runtime utility for cleaner component module output and will
        // be included in the final webpack user bundle
        module.exports = function normalizeComponent(rawScriptExports, compiledTemplate, injectStyles, scopeId, moduleIdentifier /* server only */) {
            var esModule;
            var scriptExports = rawScriptExports = rawScriptExports || {};
            // ES6 modules interop
            var type = typeof rawScriptExports.default;
            if (type === 'object' || type === 'function') {
                esModule = rawScriptExports;
                scriptExports = rawScriptExports.default;
            }
            // Vue.extend constructor export interop
            var options = typeof scriptExports === 'function'
                ? scriptExports.options
                : scriptExports;
            // render functions
            if (compiledTemplate) {
                options.render = compiledTemplate.render;
                options.staticRenderFns = compiledTemplate.staticRenderFns;
            }
            // scopedId
            if (scopeId) {
                options._scopeId = scopeId;
            }
            var hook;
            if (moduleIdentifier) {
                hook = function (context) {
                    // 2.3 injection
                    context =
                        context || // cached call
                            (this.$vnode && this.$vnode.ssrContext) || // stateful
                            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                    // 2.2 with runInNewContext: true
                    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                        context = __VUE_SSR_CONTEXT__;
                    }
                    // inject component styles
                    if (injectStyles) {
                        injectStyles.call(this, context);
                    }
                    // register component module identifier for async chunk inferrence
                    if (context && context._registeredComponents) {
                        context._registeredComponents.add(moduleIdentifier);
                    }
                };
                // used by ssr in case component is cached and beforeCreate
                // never gets called
                options._ssrRegister = hook;
            }
            else if (injectStyles) {
                hook = injectStyles;
            }
            if (hook) {
                var functional = options.functional;
                var existing = functional
                    ? options.render
                    : options.beforeCreate;
                if (!functional) {
                    // inject component registration as beforeCreate hook
                    options.beforeCreate = existing
                        ? [].concat(existing, hook)
                        : [hook];
                }
                else {
                    // register for functioal component in vue file
                    options.render = function renderWithStyleInjection(h, context) {
                        hook.call(context);
                        return existing(h, context);
                    };
                }
            }
            return {
                esModule: esModule,
                exports: scriptExports,
                options: options
            };
        };
        /***/ 
    }),
    /* 2 */
    /***/ (function (module, exports, __webpack_require__) {
        "use strict";
        /**
          * vue-class-component v5.0.2
          * (c) 2015-2017 Evan You
          * @license MIT
          */
        Object.defineProperty(exports, '__esModule', { value: true });
        function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
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
            if (options === void 0) {
                options = {};
            }
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
        /***/ 
    }),
    /* 3 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export Store */
        /* unused harmony export install */
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function () { return mapState; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function () { return mapMutations; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function () { return mapGetters; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function () { return mapActions; });
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
            }
            else {
                // override init and inject vuex init procedure
                // for 1.x backwards compatibility.
                var _init = Vue.prototype._init;
                Vue.prototype._init = function (options) {
                    if (options === void 0)
                        options = {};
                    options.init = options.init
                        ? [vuexInit].concat(options.init)
                        : vuexInit;
                    _init.call(this, options);
                };
            }
            /**
             * Vuex init hook, injected into each instances init hooks list.
             */
            function vuexInit() {
                var options = this.$options;
                // store injection
                if (options.store) {
                    this.$store = typeof options.store === 'function'
                        ? options.store()
                        : options.store;
                }
                else if (options.parent && options.parent.$store) {
                    this.$store = options.parent.$store;
                }
            }
        };
        var devtoolHook = typeof window !== 'undefined' &&
            window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
        function devtoolPlugin(store) {
            if (!devtoolHook) {
                return;
            }
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
        function forEachValue(obj, fn) {
            Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
        }
        function isObject(obj) {
            return obj !== null && typeof obj === 'object';
        }
        function isPromise(val) {
            return val && typeof val.then === 'function';
        }
        function assert(condition, msg) {
            if (!condition) {
                throw new Error(("[vuex] " + msg));
            }
        }
        var Module = function Module(rawModule, runtime) {
            this.runtime = runtime;
            this._children = Object.create(null);
            this._rawModule = rawModule;
            var rawState = rawModule.state;
            this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
        };
        var prototypeAccessors$1 = { namespaced: { configurable: true } };
        prototypeAccessors$1.namespaced.get = function () {
            return !!this._rawModule.namespaced;
        };
        Module.prototype.addChild = function addChild(key, module) {
            this._children[key] = module;
        };
        Module.prototype.removeChild = function removeChild(key) {
            delete this._children[key];
        };
        Module.prototype.getChild = function getChild(key) {
            return this._children[key];
        };
        Module.prototype.update = function update(rawModule) {
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
        Module.prototype.forEachChild = function forEachChild(fn) {
            forEachValue(this._children, fn);
        };
        Module.prototype.forEachGetter = function forEachGetter(fn) {
            if (this._rawModule.getters) {
                forEachValue(this._rawModule.getters, fn);
            }
        };
        Module.prototype.forEachAction = function forEachAction(fn) {
            if (this._rawModule.actions) {
                forEachValue(this._rawModule.actions, fn);
            }
        };
        Module.prototype.forEachMutation = function forEachMutation(fn) {
            if (this._rawModule.mutations) {
                forEachValue(this._rawModule.mutations, fn);
            }
        };
        Object.defineProperties(Module.prototype, prototypeAccessors$1);
        var ModuleCollection = function ModuleCollection(rawRootModule) {
            // register root module (Vuex.Store options)
            this.register([], rawRootModule, false);
        };
        ModuleCollection.prototype.get = function get(path) {
            return path.reduce(function (module, key) {
                return module.getChild(key);
            }, this.root);
        };
        ModuleCollection.prototype.getNamespace = function getNamespace(path) {
            var module = this.root;
            return path.reduce(function (namespace, key) {
                module = module.getChild(key);
                return namespace + (module.namespaced ? key + '/' : '');
            }, '');
        };
        ModuleCollection.prototype.update = function update$1(rawRootModule) {
            update([], this.root, rawRootModule);
        };
        ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
            var this$1 = this;
            if (runtime === void 0)
                runtime = true;
            if (process.env.NODE_ENV !== 'production') {
                assertRawModule(path, rawModule);
            }
            var newModule = new Module(rawModule, runtime);
            if (path.length === 0) {
                this.root = newModule;
            }
            else {
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
        ModuleCollection.prototype.unregister = function unregister(path) {
            var parent = this.get(path.slice(0, -1));
            var key = path[path.length - 1];
            if (!parent.getChild(key).runtime) {
                return;
            }
            parent.removeChild(key);
        };
        function update(path, targetModule, newModule) {
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
                            console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, " +
                                'manual reload is needed');
                        }
                        return;
                    }
                    update(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
                }
            }
        }
        function assertRawModule(path, rawModule) {
            ['getters', 'actions', 'mutations'].forEach(function (key) {
                if (!rawModule[key]) {
                    return;
                }
                forEachValue(rawModule[key], function (value, type) {
                    assert(typeof value === 'function', makeAssertionMessage(path, key, type, value));
                });
            });
        }
        function makeAssertionMessage(path, key, type, value) {
            var buf = key + " should be function but \"" + key + "." + type + "\"";
            if (path.length > 0) {
                buf += " in module \"" + (path.join('.')) + "\"";
            }
            buf += " is " + (JSON.stringify(value)) + ".";
            return buf;
        }
        var Vue; // bind on install
        var Store = function Store(options) {
            var this$1 = this;
            if (options === void 0)
                options = {};
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
            var plugins = options.plugins;
            if (plugins === void 0)
                plugins = [];
            var strict = options.strict;
            if (strict === void 0)
                strict = false;
            var state = options.state;
            if (state === void 0)
                state = {};
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
            this.dispatch = function boundDispatch(type, payload) {
                return dispatch.call(store, type, payload);
            };
            this.commit = function boundCommit(type, payload, options) {
                return commit.call(store, type, payload, options);
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
            return this._vm._data.$$state;
        };
        prototypeAccessors.state.set = function (v) {
            if (process.env.NODE_ENV !== 'production') {
                assert(false, "Use store.replaceState() to explicit replace store state.");
            }
        };
        Store.prototype.commit = function commit(_type, _payload, _options) {
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
                return;
            }
            this._withCommit(function () {
                entry.forEach(function commitIterator(handler) {
                    handler(payload);
                });
            });
            this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });
            if (process.env.NODE_ENV !== 'production' &&
                options && options.silent) {
                console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. " +
                    'Use the filter functionality in the vue-devtools');
            }
        };
        Store.prototype.dispatch = function dispatch(_type, _payload) {
            // check object-style dispatch
            var ref = unifyObjectStyle(_type, _payload);
            var type = ref.type;
            var payload = ref.payload;
            var entry = this._actions[type];
            if (!entry) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(("[vuex] unknown action type: " + type));
                }
                return;
            }
            return entry.length > 1
                ? Promise.all(entry.map(function (handler) { return handler(payload); }))
                : entry[0](payload);
        };
        Store.prototype.subscribe = function subscribe(fn) {
            var subs = this._subscribers;
            if (subs.indexOf(fn) < 0) {
                subs.push(fn);
            }
            return function () {
                var i = subs.indexOf(fn);
                if (i > -1) {
                    subs.splice(i, 1);
                }
            };
        };
        Store.prototype.watch = function watch(getter, cb, options) {
            var this$1 = this;
            if (process.env.NODE_ENV !== 'production') {
                assert(typeof getter === 'function', "store.watch only accepts a function.");
            }
            return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options);
        };
        Store.prototype.replaceState = function replaceState(state) {
            var this$1 = this;
            this._withCommit(function () {
                this$1._vm._data.$$state = state;
            });
        };
        Store.prototype.registerModule = function registerModule(path, rawModule) {
            if (typeof path === 'string') {
                path = [path];
            }
            if (process.env.NODE_ENV !== 'production') {
                assert(Array.isArray(path), "module path must be a string or an Array.");
                assert(path.length > 0, 'cannot register the root module by using registerModule.');
            }
            this._modules.register(path, rawModule);
            installModule(this, this.state, path, this._modules.get(path));
            // reset store to update getters...
            resetStoreVM(this, this.state);
        };
        Store.prototype.unregisterModule = function unregisterModule(path) {
            var this$1 = this;
            if (typeof path === 'string') {
                path = [path];
            }
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
        Store.prototype.hotUpdate = function hotUpdate(newOptions) {
            this._modules.update(newOptions);
            resetStore(this, true);
        };
        Store.prototype._withCommit = function _withCommit(fn) {
            var committing = this._committing;
            this._committing = true;
            fn();
            this._committing = committing;
        };
        Object.defineProperties(Store.prototype, prototypeAccessors);
        function resetStore(store, hot) {
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
        function resetStoreVM(store, state, hot) {
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
        function installModule(store, rootState, path, module, hot) {
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
        function makeLocalContext(store, namespace, path) {
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
                            return;
                        }
                    }
                    return store.dispatch(type, payload);
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
                            return;
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
            return local;
        }
        function makeLocalGetters(store, namespace) {
            var gettersProxy = {};
            var splitPos = namespace.length;
            Object.keys(store.getters).forEach(function (type) {
                // skip if the target getter is not match this namespace
                if (type.slice(0, splitPos) !== namespace) {
                    return;
                }
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
            return gettersProxy;
        }
        function registerMutation(store, type, handler, local) {
            var entry = store._mutations[type] || (store._mutations[type] = []);
            entry.push(function wrappedMutationHandler(payload) {
                handler.call(store, local.state, payload);
            });
        }
        function registerAction(store, type, handler, local) {
            var entry = store._actions[type] || (store._actions[type] = []);
            entry.push(function wrappedActionHandler(payload, cb) {
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
                        throw err;
                    });
                }
                else {
                    return res;
                }
            });
        }
        function registerGetter(store, type, rawGetter, local) {
            if (store._wrappedGetters[type]) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(("[vuex] duplicate getter key: " + type));
                }
                return;
            }
            store._wrappedGetters[type] = function wrappedGetter(store) {
                return rawGetter(local.state, // local state
                local.getters, // local getters
                store.state, // root state
                store.getters // root getters
                );
            };
        }
        function enableStrictMode(store) {
            store._vm.$watch(function () { return this._data.$$state; }, function () {
                if (process.env.NODE_ENV !== 'production') {
                    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
                }
            }, { deep: true, sync: true });
        }
        function getNestedState(state, path) {
            return path.length
                ? path.reduce(function (state, key) { return state[key]; }, state)
                : state;
        }
        function unifyObjectStyle(type, payload, options) {
            if (isObject(type) && type.type) {
                options = payload;
                payload = type;
                type = type.type;
            }
            if (process.env.NODE_ENV !== 'production') {
                assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
            }
            return { type: type, payload: payload, options: options };
        }
        function install(_Vue) {
            if (Vue && _Vue === Vue) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
                }
                return;
            }
            Vue = _Vue;
            applyMixin(Vue);
        }
        var mapState = normalizeNamespace(function (namespace, states) {
            var res = {};
            normalizeMap(states).forEach(function (ref) {
                var key = ref.key;
                var val = ref.val;
                res[key] = function mappedState() {
                    var state = this.$store.state;
                    var getters = this.$store.getters;
                    if (namespace) {
                        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
                        if (!module) {
                            return;
                        }
                        state = module.context.state;
                        getters = module.context.getters;
                    }
                    return typeof val === 'function'
                        ? val.call(this, state, getters)
                        : state[val];
                };
                // mark vuex getter for devtools
                res[key].vuex = true;
            });
            return res;
        });
        var mapMutations = normalizeNamespace(function (namespace, mutations) {
            var res = {};
            normalizeMap(mutations).forEach(function (ref) {
                var key = ref.key;
                var val = ref.val;
                res[key] = function mappedMutation() {
                    var args = [], len = arguments.length;
                    while (len--)
                        args[len] = arguments[len];
                    var commit = this.$store.commit;
                    if (namespace) {
                        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
                        if (!module) {
                            return;
                        }
                        commit = module.context.commit;
                    }
                    return typeof val === 'function'
                        ? val.apply(this, [commit].concat(args))
                        : commit.apply(this.$store, [val].concat(args));
                };
            });
            return res;
        });
        var mapGetters = normalizeNamespace(function (namespace, getters) {
            var res = {};
            normalizeMap(getters).forEach(function (ref) {
                var key = ref.key;
                var val = ref.val;
                val = namespace + val;
                res[key] = function mappedGetter() {
                    if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
                        return;
                    }
                    if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
                        console.error(("[vuex] unknown getter: " + val));
                        return;
                    }
                    return this.$store.getters[val];
                };
                // mark vuex getter for devtools
                res[key].vuex = true;
            });
            return res;
        });
        var mapActions = normalizeNamespace(function (namespace, actions) {
            var res = {};
            normalizeMap(actions).forEach(function (ref) {
                var key = ref.key;
                var val = ref.val;
                res[key] = function mappedAction() {
                    var args = [], len = arguments.length;
                    while (len--)
                        args[len] = arguments[len];
                    var dispatch = this.$store.dispatch;
                    if (namespace) {
                        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
                        if (!module) {
                            return;
                        }
                        dispatch = module.context.dispatch;
                    }
                    return typeof val === 'function'
                        ? val.apply(this, [dispatch].concat(args))
                        : dispatch.apply(this.$store, [val].concat(args));
                };
            });
            return res;
        });
        var createNamespacedHelpers = function (namespace) {
            return ({
                mapState: mapState.bind(null, namespace),
                mapGetters: mapGetters.bind(null, namespace),
                mapMutations: mapMutations.bind(null, namespace),
                mapActions: mapActions.bind(null, namespace)
            });
        };
        function normalizeMap(map) {
            return Array.isArray(map)
                ? map.map(function (key) { return ({ key: key, val: key }); })
                : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); });
        }
        function normalizeNamespace(fn) {
            return function (namespace, map) {
                if (typeof namespace !== 'string') {
                    map = namespace;
                    namespace = '';
                }
                else if (namespace.charAt(namespace.length - 1) !== '/') {
                    namespace += '/';
                }
                return fn(namespace, map);
            };
        }
        function getModuleByNamespace(store, helper, namespace) {
            var module = store._modulesNamespaceMap[namespace];
            if (process.env.NODE_ENV !== 'production' && !module) {
                console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
            }
            return module;
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
        /***/ 
    }),
    /* 4 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        class vue_module {
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
            create() {
                return {
                    namespaced: true,
                    state: this._state,
                    actions: this._actions,
                    mutations: this._mutations,
                    getters: this._getters,
                };
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
        /* harmony export (immutable) */ __webpack_exports__["a"] = vue_module;
        /***/ 
    }),
    /* 5 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
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
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = mutations;
        /***/ 
    }),
    /* 6 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
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
        /***/ 
    }),
    /* 7 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
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
        /***/ 
    }),
    /* 8 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
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
        /***/ 
    }),
    /* 9 */
    /***/ (function (module, exports) {
        /*
            MIT License http://www.opensource.org/licenses/mit-license.php
            Author Tobias Koppers @sokra
        */
        // css base code, injected by the css-loader
        module.exports = function (useSourceMap) {
            var list = [];
            // return the list of modules as css string
            list.toString = function toString() {
                return this.map(function (item) {
                    var content = cssWithMappingToString(item, useSourceMap);
                    if (item[2]) {
                        return "@media " + item[2] + "{" + content + "}";
                    }
                    else {
                        return content;
                    }
                }).join("");
            };
            // import a list of modules into the list
            list.i = function (modules, mediaQuery) {
                if (typeof modules === "string")
                    modules = [[null, modules, ""]];
                var alreadyImportedModules = {};
                for (var i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    if (typeof id === "number")
                        alreadyImportedModules[id] = true;
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    // skip already imported module
                    // this implementation is not 100% perfect for weird media query combinations
                    //  when a module is imported multiple times with different media queries.
                    //  I hope this will never occur (Hey this way we have smaller bundles)
                    if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                        if (mediaQuery && !item[2]) {
                            item[2] = mediaQuery;
                        }
                        else if (mediaQuery) {
                            item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
                        }
                        list.push(item);
                    }
                }
            };
            return list;
        };
        function cssWithMappingToString(item, useSourceMap) {
            var content = item[1] || '';
            var cssMapping = item[3];
            if (!cssMapping) {
                return content;
            }
            if (useSourceMap && typeof btoa === 'function') {
                var sourceMapping = toComment(cssMapping);
                var sourceURLs = cssMapping.sources.map(function (source) {
                    return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
                });
                return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
            }
            return [content].join('\n');
        }
        // Adapted from convert-source-map (MIT)
        function toComment(sourceMap) {
            // eslint-disable-next-line no-undef
            var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
            var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
            return '/*# ' + data + ' */';
        }
        /***/ 
    }),
    /* 10 */
    /***/ (function (module, exports, __webpack_require__) {
        var listToStyles = __webpack_require__(23);
        module.exports = function (parentId, list, isProduction, context) {
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            if (context) {
                if (!context.hasOwnProperty('styles')) {
                    Object.defineProperty(context, 'styles', {
                        enumerable: true,
                        get: function () {
                            return renderStyles(context._styles);
                        }
                    });
                    // expose renderStyles for vue-server-renderer (vuejs/#6353)
                    context._renderStyles = renderStyles;
                }
                var styles = context._styles || (context._styles = {});
                list = listToStyles(parentId, list);
                if (isProduction) {
                    addStyleProd(styles, list);
                }
                else {
                    addStyleDev(styles, list);
                }
            }
        };
        // In production, render as few style tags as possible.
        // (mostly because IE9 has a limit on number of style tags)
        function addStyleProd(styles, list) {
            for (var i = 0; i < list.length; i++) {
                var parts = list[i].parts;
                for (var j = 0; j < parts.length; j++) {
                    var part = parts[j];
                    // group style tags by media types.
                    var id = part.media || 'default';
                    var style = styles[id];
                    if (style) {
                        if (style.ids.indexOf(part.id) < 0) {
                            style.ids.push(part.id);
                            style.css += '\n' + part.css;
                        }
                    }
                    else {
                        styles[id] = {
                            ids: [part.id],
                            css: part.css,
                            media: part.media
                        };
                    }
                }
            }
        }
        // In dev we use individual style tag for each module for hot-reload
        // and source maps.
        function addStyleDev(styles, list) {
            for (var i = 0; i < list.length; i++) {
                var parts = list[i].parts;
                for (var j = 0; j < parts.length; j++) {
                    var part = parts[j];
                    styles[part.id] = {
                        ids: [part.id],
                        css: part.css,
                        media: part.media
                    };
                }
            }
        }
        function renderStyles(styles) {
            var css = '';
            for (var key in styles) {
                var style = styles[key];
                css += '<style data-vue-ssr-id="' + style.ids.join(' ') + '"' +
                    (style.media ? (' media="' + style.media + '"') : '') + '>' +
                    style.css + '</style>';
            }
            return css;
        }
        /***/ 
    }),
    /* 11 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        class build_query {
            http(query) {
                let prts = query;
                if (prts.length === 0) {
                    return "";
                }
                let q = "";
                Object.keys(prts).forEach(function (key) {
                    q += `&${encodeURIComponent(key)}=${encodeURIComponent(prts[key])}`;
                });
                return q.replace("&", "?");
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = build_query;
        /***/ 
    }),
    /* 12 */
    /***/ (function (module, exports, __webpack_require__) {
        var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        } return target; };
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
                if (!self.isMobile)
                    build();
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
                if (!self.isMobile)
                    positionCalendar();
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
                if (!self.selectedDates.length)
                    return;
                if (!self.minDateHasTime || e.type !== "input" || e.target.value.length >= 2) {
                    setHoursFromInputs();
                    updateValue();
                }
                else {
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
                if (!self.config.enableTime)
                    return;
                var hours = (parseInt(self.hourElement.value, 10) || 0) % (self.amPM ? 12 : 24), minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.config.enableSeconds ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
                if (self.amPM !== undefined)
                    hours = hours % 12 + 12 * (self.amPM.textContent === "PM");
                if (self.minDateHasTime && compareDates(self.latestSelectedDateObj, self.config.minDate) === 0) {
                    hours = Math.max(hours, self.config.minDate.getHours());
                    if (hours === self.config.minDate.getHours())
                        minutes = Math.max(minutes, self.config.minDate.getMinutes());
                }
                if (self.maxDateHasTime && compareDates(self.latestSelectedDateObj, self.config.maxDate) === 0) {
                    hours = Math.min(hours, self.config.maxDate.getHours());
                    if (hours === self.config.maxDate.getHours())
                        minutes = Math.min(minutes, self.config.maxDate.getMinutes());
                }
                setHours(hours, minutes, seconds);
            }
            /**
          * Syncs time input values with a date
          * @param {Date} dateObj the date to sync with
          */
            function setHoursFromDate(dateObj) {
                var date = dateObj || self.latestSelectedDateObj;
                if (date)
                    setHours(date.getHours(), date.getMinutes(), date.getSeconds());
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
                if (!self.config.enableTime || self.isMobile)
                    return;
                self.hourElement.value = self.pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * (hours % 12 === 0) : hours);
                self.minuteElement.value = self.pad(minutes);
                if (!self.config.time_24hr)
                    self.amPM.textContent = hours >= 12 ? "PM" : "AM";
                if (self.config.enableSeconds === true)
                    self.secondElement.value = self.pad(seconds);
            }
            /**
          * Handles the year input and incrementing events
          * @param {Event} event the keyup or increment event
          */
            function onYearInput(event) {
                var year = event.target.value;
                if (event.delta)
                    year = (parseInt(year) + event.delta).toString();
                if (year.length === 4 || event.key === "Enter") {
                    self.currentYearElement.blur();
                    if (!/[^\d]/.test(year))
                        changeYear(year);
                }
            }
            /**
          * Essentially addEventListener + tracking
          * @param {Element} element the element to addEventListener to
          * @param {String} event the event name
          * @param {Function} handler the event handler
          */
            function bind(element, event, handler) {
                if (event instanceof Array)
                    return event.forEach(function (ev) {
                        return bind(element, ev, handler);
                    });
                if (element instanceof Array)
                    return element.forEach(function (el) {
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
                if (self.isMobile)
                    return setupMobile();
                self.debouncedResize = debounce(onResize, 50);
                self.triggerChange = function () {
                    triggerEvent("Change");
                };
                self.debouncedChange = debounce(self.triggerChange, 300);
                if (self.config.mode === "range" && self.daysContainer)
                    bind(self.daysContainer, "mouseover", function (e) {
                        return onMouseOver(e.target);
                    });
                bind(window.document.body, "keydown", onKeyDown);
                if (!self.config.static)
                    bind(self._input, "keydown", onKeyDown);
                if (!self.config.inline && !self.config.static)
                    bind(window, "resize", self.debouncedResize);
                if (window.ontouchstart !== undefined)
                    bind(window.document, "touchstart", documentClick);
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
                    if (self.secondElement !== undefined)
                        bind(self.secondElement, "focus", function () {
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
                        }
                        while (nav.previousSibling && /curr/.test(nav.previousSibling.className)) {
                            self.monthNav.removeChild(nav.previousSibling);
                        }
                        self.oldCurMonth = null;
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
                }
                catch (e) {
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
                if (~e.target.className.indexOf("arrow"))
                    incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
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
                var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
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
                    if (self.config.weekNumbers)
                        self.innerContainer.appendChild(buildWeeks());
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
                if (self.config.enableTime)
                    fragment.appendChild(buildTime());
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
                        if (self.altInput)
                            wrapper.appendChild(self.altInput);
                        wrapper.appendChild(self.calendarContainer);
                        return;
                    }
                }
                (customAppend ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
            }
            function createDay(className, date, dayNumber, i) {
                var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate());
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
                }
                else {
                    dayElement.classList.add("disabled");
                    if (self.selectedDates[0] && date > self.minRangeDate && date < self.selectedDates[0])
                        self.minRangeDate = date;
                    else if (self.selectedDates[0] && date < self.maxRangeDate && date > self.selectedDates[0])
                        self.maxRangeDate = date;
                }
                if (self.config.mode === "range") {
                    if (isDateInRange(date) && !isDateSelected(date))
                        dayElement.classList.add("inRange");
                    if (self.selectedDates.length === 1 && (date < self.minRangeDate || date > self.maxRangeDate))
                        dayElement.classList.add("notAllowed");
                }
                if (self.config.weekNumbers && className !== "prevMonthDay" && dayNumber % 7 === 1) {
                    self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" + self.config.getWeek(date) + "</span>");
                }
                triggerEvent("DayCreate", dayElement);
                return dayElement;
            }
            function focusOnDay(currentIndex, offset) {
                var newIndex = currentIndex + offset || 0, targetNode = currentIndex !== undefined ? self.days.childNodes[newIndex] : self.selectedDateElem || self.todayDateElem || self.days.childNodes[0], focus = function focus() {
                    targetNode = targetNode || self.days.childNodes[newIndex];
                    targetNode.focus();
                    if (self.config.mode === "range")
                        onMouseOver(targetNode);
                };
                if (targetNode === undefined && offset !== 0) {
                    if (offset > 0) {
                        self.changeMonth(1);
                        newIndex = newIndex % 42;
                    }
                    else if (offset < 0) {
                        self.changeMonth(-1);
                        newIndex += 42;
                    }
                    return afterDayAnim(focus);
                }
                focus();
            }
            function afterDayAnim(fn) {
                if (self.config.animate === true)
                    return self._animationLoop.push(fn);
                fn();
            }
            function buildDays(delta) {
                var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7, isRangeMode = self.config.mode === "range";
                self.prevMonthDays = self.utils.getDaysinMonth((self.currentMonth - 1 + 12) % 12);
                self.selectedDateElem = undefined;
                self.todayDateElem = undefined;
                var daysInMonth = self.utils.getDaysinMonth(), days = window.document.createDocumentFragment();
                var dayNumber = self.prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
                if (self.config.weekNumbers && self.weekNumbers.firstChild)
                    self.weekNumbers.textContent = "";
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
                }
                else
                    updateNavigationCurrentMonth();
                var dayContainer = createElement("div", "dayContainer");
                dayContainer.appendChild(days);
                if (!self.config.animate || delta === undefined)
                    clearNode(self.daysContainer);
                else {
                    while (self.daysContainer.childNodes.length > 1) {
                        self.daysContainer.removeChild(self.daysContainer.firstChild);
                    }
                }
                if (delta >= 0)
                    self.daysContainer.appendChild(dayContainer);
                else
                    self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);
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
                if (self.config.minDate)
                    self.currentYearElement.min = self.config.minDate.getFullYear();
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
                        if (this.__hidePrevMonthArrow !== bool)
                            self.prevMonthNav.style.display = bool ? "none" : "block";
                        this.__hidePrevMonthArrow = bool;
                    }
                });
                Object.defineProperty(self, "_hideNextMonthArrow", {
                    get: function get() {
                        return this.__hideNextMonthArrow;
                    },
                    set: function set(bool) {
                        if (this.__hideNextMonthArrow !== bool)
                            self.nextMonthNav.style.display = bool ? "none" : "block";
                        this.__hideNextMonthArrow = bool;
                    }
                });
                updateNavigationCurrentMonth();
                return self.monthNav;
            }
            function buildTime() {
                self.calendarContainer.classList.add("hasTime");
                if (self.config.noCalendar)
                    self.calendarContainer.classList.add("noCalendar");
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
                if (self.config.time_24hr)
                    self.timeContainer.classList.add("time24hr");
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
                if (!self.weekdayContainer)
                    self.weekdayContainer = createElement("div", "flatpickr-weekdays");
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
                if (delta < 0 && self._hidePrevMonthArrow || delta > 0 && self._hideNextMonthArrow)
                    return;
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
                }
                else if (delta > 0) {
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
                }
                else if (delta < 0) {
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
                if (self.altInput)
                    self.altInput.value = "";
                if (self.mobileInput)
                    self.mobileInput.value = "";
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
                if (self.config !== undefined)
                    triggerEvent("Destroy");
                for (var i = self._handlers.length; i--;) {
                    var h = self._handlers[i];
                    h.element.removeEventListener(h.event, h.handler);
                }
                self._handlers = [];
                if (self.mobileInput) {
                    if (self.mobileInput.parentNode)
                        self.mobileInput.parentNode.removeChild(self.mobileInput);
                    self.mobileInput = null;
                }
                else if (self.calendarContainer && self.calendarContainer.parentNode)
                    self.calendarContainer.parentNode.removeChild(self.calendarContainer);
                if (self.altInput) {
                    self.input.type = "text";
                    if (self.altInput.parentNode)
                        self.altInput.parentNode.removeChild(self.altInput);
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
                    }
                    catch (e) { }
                });
            }
            function isCalendarElem(elem) {
                if (self.config.appendTo && self.config.appendTo.contains(elem))
                    return true;
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
                if (!newYear || self.currentYearElement.min && newYear < self.currentYearElement.min || self.currentYearElement.max && newYear > self.currentYearElement.max)
                    return;
                var newYearNum = parseInt(newYear, 10), isNewYear = self.currentYear !== newYearNum;
                self.currentYear = newYearNum || self.currentYear;
                if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
                    self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
                }
                else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
                    self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
                }
                if (isNewYear) {
                    self.redraw();
                    triggerEvent("YearChange");
                }
            }
            function isEnabled(date, timeless) {
                if (self.config.minDate && compareDates(date, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && compareDates(date, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0)
                    return false;
                if (!self.config.enable.length && !self.config.disable.length)
                    return true;
                var dateToCheck = self.parseDate(date, null, true); // timeless
                var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
                for (var i = 0, d; i < array.length; i++) {
                    d = array[i];
                    if (d instanceof Function && d(dateToCheck))
                        return bool;
                    else if (d instanceof Date && d.getTime() === dateToCheck.getTime())
                        // disabled by date
                        return bool;
                    else if (typeof d === "string" && self.parseDate(d, null, true).getTime() === dateToCheck.getTime())
                        // disabled by date string
                        return bool;
                    else if ((typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" && d.from && d.to && dateToCheck >= d.from && dateToCheck <= d.to)
                        return bool;
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
                }
                else if (calendarElem || allowKeydown || allowInlineKeydown) {
                    var isTimeObj = self.timeContainer && self.timeContainer.contains(e.target);
                    switch (e.key) {
                        case "Enter":
                            if (isTimeObj)
                                updateValue();
                            else
                                selectDate(e);
                            break;
                        case "Escape":
                            // escape
                            e.preventDefault();
                            self.close();
                            break;
                        case "Backspace":
                        case "Delete":
                            if (!self.config.allowInput)
                                self.clear();
                            break;
                        case "ArrowLeft":
                        case "ArrowRight":
                            if (!isTimeObj) {
                                e.preventDefault();
                                if (self.daysContainer) {
                                    var _delta = e.key === "ArrowRight" ? 1 : -1;
                                    if (!e.ctrlKey)
                                        focusOnDay(e.target.$i, _delta);
                                    else
                                        changeMonth(_delta, true);
                                }
                                else if (self.config.enableTime && !isTimeObj)
                                    self.hourElement.focus();
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
                                }
                                else if (!isTimeObj)
                                    focusOnDay(e.target.$i, delta * 7);
                            }
                            else if (self.config.enableTime) {
                                if (!isTimeObj)
                                    self.hourElement.focus();
                                updateTime(e);
                                self.debouncedChange();
                            }
                            break;
                        case "Tab":
                            if (e.target === self.hourElement) {
                                e.preventDefault();
                                self.minuteElement.select();
                            }
                            else if (e.target === self.minuteElement && (self.secondElement || self.amPM)) {
                                e.preventDefault();
                                (self.secondElement || self.amPM).focus();
                            }
                            else if (e.target === self.secondElement) {
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
                if (self.selectedDates.length !== 1 || !elem.classList.contains("flatpickr-day"))
                    return;
                var hoverDate = elem.dateObj, initialDate = self.parseDate(self.selectedDates[0], null, true), rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()), containsDisabled = false;
                for (var t = rangeStartDate; t < rangeEndDate; t += self.utils.duration.DAY) {
                    if (!isEnabled(new Date(t))) {
                        containsDisabled = true;
                        break;
                    }
                }
                var _loop = function _loop(timestamp, i) {
                    var outOfRange = timestamp < self.minRangeDate.getTime() || timestamp > self.maxRangeDate.getTime(), dayElem = self.days.childNodes[i];
                    if (outOfRange) {
                        self.days.childNodes[i].classList.add("notAllowed");
                        ["inRange", "startRange", "endRange"].forEach(function (c) {
                            dayElem.classList.remove(c);
                        });
                        return "continue";
                    }
                    else if (containsDisabled && !outOfRange)
                        return "continue";
                    ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                        dayElem.classList.remove(c);
                    });
                    var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate), maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);
                    elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");
                    if (initialDate < hoverDate && timestamp === initialDate.getTime())
                        dayElem.classList.add("startRange");
                    else if (initialDate > hoverDate && timestamp === initialDate.getTime())
                        dayElem.classList.add("endRange");
                    if (timestamp >= minRangeDate && timestamp <= maxRangeDate)
                        dayElem.classList.add("inRange");
                };
                for (var timestamp = self.days.childNodes[0].dateObj.getTime(), i = 0; i < 42; i++, timestamp += self.utils.duration.DAY) {
                    var _ret = _loop(timestamp, i);
                    if (_ret === "continue")
                        continue;
                }
            }
            function onResize() {
                if (self.isOpen && !self.config.static && !self.config.inline)
                    positionCalendar();
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
                if (self.isOpen || self._input.disabled || self.config.inline)
                    return;
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
                        if (!self.selectedDates.length && type === "min")
                            setHoursFromDate(dateObj);
                        updateValue();
                    }
                    if (self.daysContainer) {
                        redraw();
                        if (isValidDate)
                            self.currentYearElement[type] = dateObj.getFullYear();
                        else
                            self.currentYearElement.removeAttribute(type);
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
                }
                for (var _i = hooks.length; _i--;) {
                    if (self.config[hooks[_i]] !== undefined) {
                        self.config[hooks[_i]] = arrayify(self.config[hooks[_i]] || []).map(bindToInstance);
                    }
                }
                for (var _i2 = 0; _i2 < self.config.plugins.length; _i2++) {
                    var pluginConf = self.config.plugins[_i2](self) || {};
                    for (var key in pluginConf) {
                        if (self.config[key] instanceof Array || ~hooks.indexOf(key)) {
                            self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
                        }
                        else if (typeof userConfig[key] === "undefined")
                            self.config[key] = pluginConf[key];
                    }
                }
                triggerEvent("ParseConfig");
            }
            function setupLocale() {
                if (_typeof(self.config.locale) !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined")
                    console.warn("flatpickr: invalid locale " + self.config.locale);
                self.l10n = _extends(Object.create(flatpickr.l10ns.default), _typeof(self.config.locale) === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] || {} : {});
            }
            function positionCalendar() {
                var positionElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self._positionElement;
                if (self.calendarContainer === undefined)
                    return;
                var calendarHeight = self.calendarContainer.offsetHeight, calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPos === "above" || configPos !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
                var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
                toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
                toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
                if (self.config.inline)
                    return;
                var left = window.pageXOffset + inputBounds.left;
                var right = window.document.body.offsetWidth - inputBounds.right;
                var rightMost = left + calendarWidth > window.document.body.offsetWidth;
                toggleClass(self.calendarContainer, "rightMost", rightMost);
                if (self.config.static)
                    return;
                self.calendarContainer.style.top = top + "px";
                if (!rightMost) {
                    self.calendarContainer.style.left = left + "px";
                    self.calendarContainer.style.right = "auto";
                }
                else {
                    self.calendarContainer.style.left = "auto";
                    self.calendarContainer.style.right = right + "px";
                }
            }
            function redraw() {
                if (self.config.noCalendar || self.isMobile)
                    return;
                buildWeekdays();
                updateNavigationCurrentMonth();
                buildDays();
            }
            function selectDate(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!e.target.classList.contains("flatpickr-day") || e.target.classList.contains("disabled") || e.target.classList.contains("notAllowed"))
                    return;
                var selectedDate = self.latestSelectedDateObj = new Date(e.target.dateObj.getTime());
                var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth && self.config.mode !== "range";
                self.selectedDateElem = e.target;
                if (self.config.mode === "single")
                    self.selectedDates = [selectedDate];
                else if (self.config.mode === "multiple") {
                    var selectedIndex = isDateSelected(selectedDate);
                    if (selectedIndex)
                        self.selectedDates.splice(selectedIndex, 1);
                    else
                        self.selectedDates.push(selectedDate);
                }
                else if (self.config.mode === "range") {
                    if (self.selectedDates.length === 2)
                        self.clear();
                    self.selectedDates.push(selectedDate);
                    // unless selecting same date twice, sort ascendingly
                    if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                        self.selectedDates.sort(function (a, b) {
                            return a.getTime() - b.getTime();
                        });
                }
                setHoursFromInputs();
                if (shouldChangeMonth) {
                    var isNewYear = self.currentYear !== selectedDate.getFullYear();
                    self.currentYear = selectedDate.getFullYear();
                    self.currentMonth = selectedDate.getMonth();
                    if (isNewYear)
                        triggerEvent("YearChange");
                    triggerEvent("MonthChange");
                }
                buildDays();
                if (self.minDateHasTime && self.config.enableTime && compareDates(selectedDate, self.config.minDate) === 0)
                    setHoursFromDate(self.config.minDate);
                updateValue();
                if (self.config.enableTime)
                    setTimeout(function () {
                        return self.showTimeInput = true;
                    }, 50);
                if (self.config.mode === "range") {
                    if (self.selectedDates.length === 1) {
                        onMouseOver(e.target);
                        self._hidePrevMonthArrow = self._hidePrevMonthArrow || self.minRangeDate > self.days.childNodes[0].dateObj;
                        self._hideNextMonthArrow = self._hideNextMonthArrow || self.maxRangeDate < new Date(self.currentYear, self.currentMonth + 1, 1);
                    }
                    else
                        updateNavigationCurrentMonth();
                }
                triggerEvent("Change");
                // maintain focus
                if (!shouldChangeMonth)
                    focusOnDay(e.target.$i, 0);
                else
                    afterDayAnim(function () {
                        return self.selectedDateElem && self.selectedDateElem.focus();
                    });
                if (self.config.enableTime)
                    setTimeout(function () {
                        return self.hourElement.select();
                    }, 451);
                if (self.config.closeOnSelect) {
                    var single = self.config.mode === "single" && !self.config.enableTime;
                    var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
                    if (single || range)
                        self.close();
                }
            }
            function set(option, value) {
                if (option !== null && (typeof option === "undefined" ? "undefined" : _typeof(option)) === "object")
                    _extends(self.config, option);
                else
                    self.config[option] = value;
                self.redraw();
                jumpToDate();
            }
            function setSelectedDate(inputDate, format) {
                if (inputDate instanceof Array)
                    self.selectedDates = inputDate.map(function (d) {
                        return self.parseDate(d, format);
                    });
                else if (inputDate instanceof Date || !isNaN(inputDate))
                    self.selectedDates = [self.parseDate(inputDate, format)];
                else if (inputDate && inputDate.substring) {
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
                if (date !== 0 && !date)
                    return self.clear(triggerChange);
                setSelectedDate(date, format);
                self.showTimeInput = self.selectedDates.length > 0;
                self.latestSelectedDateObj = self.selectedDates[0];
                self.redraw();
                jumpToDate();
                setHoursFromDate();
                updateValue(triggerChange);
                if (triggerChange)
                    triggerEvent("Change");
            }
            function parseDateRules(arr) {
                for (var i = arr.length; i--;) {
                    if (typeof arr[i] === "string" || +arr[i])
                        arr[i] = self.parseDate(arr[i], null, true);
                    else if (arr[i] && arr[i].from && arr[i].to) {
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
                if (preloadedDate)
                    setSelectedDate(preloadedDate, self.config.dateFormat);
                var initialDate = self.selectedDates.length ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now ? self.config.maxDate : self.now;
                self.currentYear = initialDate.getFullYear();
                self.currentMonth = initialDate.getMonth();
                if (self.selectedDates.length)
                    self.latestSelectedDateObj = self.selectedDates[0];
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
                            if (self.calendarContainer)
                                toggleClass(self.calendarContainer, "showTimeInput", bool);
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
                        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0))
                            return 29;
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
                if (!self.input)
                    return console.warn("Error: invalid input element specified", self.input);
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
                    if (!self.config.static && self.input.parentNode)
                        self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
                }
                if (!self.config.allowInput)
                    self._input.setAttribute("readonly", "readonly");
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
                if (self.config.minDate)
                    self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
                if (self.config.maxDate)
                    self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
                self.input.type = "hidden";
                if (self.config.altInput)
                    self.altInput.type = "hidden";
                try {
                    self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
                }
                catch (e) {
                    //
                }
                self.mobileInput.addEventListener("change", function (e) {
                    self.setDate(e.target.value, false, self.mobileFormatStr);
                    triggerEvent("Change");
                    triggerEvent("Close");
                });
            }
            function toggle() {
                if (self.isOpen)
                    return self.close();
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
                if (self._supportsEvents)
                    return new Event(name, { bubbles: true });
                self._[name + "Event"] = document.createEvent("Event");
                self._[name + "Event"].initEvent(name, true, true);
                return self._[name + "Event"];
            }
            function isDateSelected(date) {
                for (var i = 0; i < self.selectedDates.length; i++) {
                    if (compareDates(self.selectedDates[i], date) === 0)
                        return "" + i;
                }
                return false;
            }
            function isDateInRange(date) {
                if (self.config.mode !== "range" || self.selectedDates.length < 2)
                    return false;
                return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
            }
            function updateNavigationCurrentMonth() {
                if (self.config.noCalendar || self.isMobile || !self.monthNav)
                    return;
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
                if (!self.selectedDates.length)
                    return self.clear(triggerChange);
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
                if (triggerChange !== false)
                    triggerEvent("ValueUpdate");
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
                    }
                    else
                        self.changeMonth(delta, true, false);
                }
            }
            function onMonthNavClick(e) {
                var isPrevMonth = self.prevMonthNav.contains(e.target);
                var isNextMonth = self.nextMonthNav.contains(e.target);
                if (isPrevMonth || isNextMonth)
                    changeMonth(isPrevMonth ? -1 : 1);
                else if (e.target === self.currentYearElement) {
                    e.preventDefault();
                    self.currentYearElement.select();
                }
                else if (e.target.className === "arrowUp")
                    self.changeYear(self.currentYear + 1);
                else if (e.target.className === "arrowDown")
                    self.changeYear(self.currentYear - 1);
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
                if (content !== undefined)
                    e.textContent = content;
                return e;
            }
            function arrayify(obj) {
                if (obj instanceof Array)
                    return obj;
                return [obj];
            }
            function toggleClass(elem, className, bool) {
                if (bool)
                    return elem.classList.add(className);
                elem.classList.remove(className);
            }
            /* istanbul ignore next */
            function debounce(func, wait, immediate) {
                var timeout = void 0;
                return function () {
                    var context = this, args = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        timeout = null;
                        if (!immediate)
                            func.apply(context, args);
                    }, wait);
                    if (immediate && !timeout)
                        func.apply(context, args);
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
                if (!(date1 instanceof Date) || !(date2 instanceof Date))
                    return false;
                if (timeless !== false) {
                    return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
                }
                return date1.getTime() - date2.getTime();
            }
            function timeWrapper(e) {
                e.preventDefault();
                var isKeyDown = e.type === "keydown", isWheel = e.type === "wheel", isIncrement = e.type === "increment", input = e.target;
                if (self.amPM && e.target === self.amPM)
                    return e.target.textContent = ["AM", "PM"][e.target.textContent === "AM" | 0];
                var min = Number(input.min), max = Number(input.max), step = Number(input.step), curValue = parseInt(input.value, 10), delta = e.delta || (!isKeyDown ? Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) || 0 : e.which === 38 ? 1 : -1);
                var newValue = curValue + step * delta;
                if (typeof input.value !== "undefined" && input.value.length === 2) {
                    var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                    if (newValue < min) {
                        newValue = max + newValue + !isHourElem + (isHourElem && !self.amPM);
                        if (isMinuteElem)
                            incrementNumInput(null, -1, self.hourElement);
                    }
                    else if (newValue > max) {
                        newValue = input === self.hourElement ? newValue - max - !self.amPM : min;
                        if (isMinuteElem)
                            incrementNumInput(null, 1, self.hourElement);
                    }
                    if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step))
                        self.amPM.textContent = self.amPM.textContent === "PM" ? "AM" : "PM";
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
                if (this.config !== undefined && this.config.formatDate !== undefined)
                    return this.config.formatDate(dateObj, frmt);
                return frmt.split("").map(function (c, i, arr) {
                    return _this.formats[c] && arr[i - 1] !== "\\" ? _this.formats[c](dateObj) : c !== "\\" ? c : "";
                }).join("");
            },
            revFormat: {
                D: function D() { },
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
                    if (hours !== 12)
                        dateObj.setHours(hours % 12 + 12 * /pm/i.test(amPM));
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
                l: function l() { },
                m: function m(dateObj, month) {
                    dateObj.setMonth(parseFloat(month) - 1);
                },
                n: function n(dateObj, month) {
                    dateObj.setMonth(parseFloat(month) - 1);
                },
                s: function s(dateObj, seconds) {
                    dateObj.setSeconds(parseFloat(seconds));
                },
                w: function w() { },
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
                if (date !== 0 && !date)
                    return null;
                var date_orig = date;
                if (date instanceof Date)
                    date = new Date(date.getTime()); // create a copy
                else if (date.toFixed !== undefined)
                    date = new Date(date);
                else {
                    // date string
                    var format = givenFormat || (this.config || flatpickr.defaultConfig).dateFormat;
                    date = String(date).trim();
                    if (date === "today") {
                        date = new Date();
                        timeless = true;
                    }
                    else if (/Z$/.test(date) || /GMT$/.test(date))
                        date = new Date(date);
                    else if (this.config && this.config.parseDate)
                        date = this.config.parseDate(date, format);
                    else {
                        (function () {
                            var parsedDate = !_this2.config || !_this2.config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
                            var matched = void 0, ops = [];
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
                                }
                                else if (!isBackSlash)
                                    regexStr += "."; // don't really care
                                ops.forEach(function (_ref) {
                                    var fn = _ref.fn, val = _ref.val;
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
                if (timeless === true)
                    date.setHours(0, 0, 0, 0);
                return date;
            }
        };
        /* istanbul ignore next */
        function _flatpickr(nodeList, config) {
            var nodes = Array.prototype.slice.call(nodeList); // static list
            var instances = [];
            for (var i = 0; i < nodes.length; i++) {
                try {
                    if (nodes[i].getAttribute("data-fp-omit") !== null)
                        continue;
                    if (nodes[i]._flatpickr) {
                        nodes[i]._flatpickr.destroy();
                        nodes[i]._flatpickr = null;
                    }
                    nodes[i]._flatpickr = new FlatpickrInstance(nodes[i], config || {});
                    instances.push(nodes[i]._flatpickr);
                }
                catch (e) {
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
            if (selector instanceof NodeList)
                return _flatpickr(selector, config);
            else if (!(selector instanceof HTMLElement))
                return _flatpickr(window.document.querySelectorAll(selector), config);
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
            altFormat: "F j, Y",
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
            onClose: undefined,
            // onChange callback when user selects a date or time
            onChange: undefined,
            // called for every day element
            onDayCreate: undefined,
            // called every time the month is changed
            onMonthChange: undefined,
            // called every time calendar is opened
            onOpen: undefined,
            // called after the configuration has been parsed
            onParseConfig: undefined,
            // called after calendar is ready
            onReady: undefined,
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
                    if (s > 3 && s < 21)
                        return "th";
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
        if (true)
            module.exports = flatpickr;
        /***/ 
    }),
    /* 13 */
    /***/ (function (module, exports, __webpack_require__) {
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
            return function (fp) {
                const hooks = {
                    onKeyDown(_, __, ___, e) {
                        if (fp.config.enableTime && e.key === "Tab" && e.target === fp.amPM) {
                            e.preventDefault();
                            fp.confirmContainer.focus();
                        }
                        else if (e.key === "Enter" && e.target === fp.confirmContainer)
                            fp.close();
                    },
                    onReady() {
                        if (fp.calendarContainer === undefined)
                            return;
                        fp.confirmContainer = fp._createElement("div", `flatpickr-confirm ${config.showAlways ? "visible" : ""} ${config.theme}Theme`, config.confirmText);
                        fp.confirmContainer.tabIndex = -1;
                        fp.confirmContainer.innerHTML += config.confirmIcon;
                        fp.confirmContainer.addEventListener("click", fp.close);
                        fp.calendarContainer.appendChild(fp.confirmContainer);
                    }
                };
                if (!config.showAlways) {
                    hooks.onChange = function (dateObj, dateStr) {
                        const showCondition = fp.config.enableTime || fp.config.mode === "multiple";
                        if (dateStr && !fp.config.inline && showCondition)
                            return fp.confirmContainer.classList.add("visible");
                        fp.confirmContainer.classList.remove("visible");
                    };
                }
                return hooks;
            };
        }
        if (true)
            module.exports = confirmDatePlugin;
        /***/ 
    }),
    /* 14 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(15);
        /* harmony default export */ __webpack_exports__["default"] = (context => {
            let server = (resolve, reject) => {
                let server = context.server;
                const { app, router, store } = Object(__WEBPACK_IMPORTED_MODULE_0__app__["a" /* createApp */])(server);
                router.push(context.url);
                router.onReady(() => {
                    const matchedComponents = router.getMatchedComponents();
                    if (!matchedComponents.length) {
                        reject({ code: 404 });
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
                    });
                }, reject);
            };
            return new Promise(server);
        });
        /***/ 
    }),
    /* 15 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createApp;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app_vue__ = __webpack_require__(16);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(34);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(62);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(79);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.mixin({
            beforeMount() {
                const asyncData = this.$options["asyncData"];
                if (asyncData) {
                    let ad = Promise.resolve(this.$store.commit("loading/loading"));
                    ad.then(() => asyncData({ store: this.$store, route: this.$route }))
                        .then(res => {
                        setTimeout(() => {
                            this.$store.commit("loading/endLoading");
                        }, 240);
                    }).catch(err => {
                        let domain = this.$store.state["domain"];
                        this.$router.push({ path: `/${domain}` });
                    });
                    this["dataPromise"] = ad;
                }
            },
            beforeRouteUpdate(to, from, next) {
                const { asyncData } = this.$options;
                if (asyncData) {
                    this.$store.commit("loading/loading");
                    asyncData({
                        store: this.$store,
                        route: to
                    }).then(() => {
                        setTimeout(() => {
                            this.$store.commit("loading/endLoading");
                        }, 240);
                        next();
                    }).catch(next);
                }
                else {
                    next();
                }
            }
        });
        function createApp(server) {
            const router = Object(__WEBPACK_IMPORTED_MODULE_2__router__["a" /* createRouter */])();
            const store = Object(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* createStore */])(server);
            Object(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(store, router);
            const app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
                router,
                store,
                render: h => h(__WEBPACK_IMPORTED_MODULE_1__components_app_vue__["a" /* default */])
            });
            return { app, router, store };
        }
        /***/ 
    }),
    /* 16 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__ = __webpack_require__(17);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7608d186_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__ = __webpack_require__(33);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "a3c473b8";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7608d186_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/app.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 17 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__over_lay_vue__ = __webpack_require__(18);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal__ = __webpack_require__(27);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
                    "app-overlay": __WEBPACK_IMPORTED_MODULE_2__over_lay_vue__["a" /* default */],
                    "app-modal": __WEBPACK_IMPORTED_MODULE_3__modal__["a" /* default */]
                }
            })
        ], app);
        /* harmony default export */ __webpack_exports__["a"] = (app);
        /***/ 
    }),
    /* 18 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_over_lay_vue__ = __webpack_require__(19);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6316dd66_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_over_lay_vue__ = __webpack_require__(26);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "53ae9ac6";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_over_lay_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6316dd66_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_over_lay_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/over_lay.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] over_lay.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 19 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading__ = __webpack_require__(20);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
        let over_lay = class over_lay extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
        };
        over_lay = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "orver_lay",
                components: {
                    "app-loading": __WEBPACK_IMPORTED_MODULE_3__loading__["a" /* default */],
                },
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
                    'domain', 'token'
                ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("loading", {
                    overLay: ({ overLay }) => overLay,
                })),
            })
        ], over_lay);
        /* harmony default export */ __webpack_exports__["a"] = (over_lay);
        /***/ 
    }),
    /* 20 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__ = __webpack_require__(24);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_124ad6d8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_loading_vue__ = __webpack_require__(25);
        function injectStyle(ssrContext) {
            var i;
            (i = __webpack_require__(21), i.__inject__ && i.__inject__(ssrContext), i);
        }
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = injectStyle;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "2f5d3a3f";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_124ad6d8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_loading_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/loading.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] loading.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 21 */
    /***/ (function (module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(22);
        if (typeof content === 'string')
            content = [[module.i, content, '']];
        if (content.locals)
            module.exports = content.locals;
        // add CSS to SSR context
        var add = __webpack_require__(10);
        module.exports.__inject__ = function (context) {
            add("12feb4d1", content, false, context);
        };
        /***/ 
    }),
    /* 22 */
    /***/ (function (module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(9)(undefined);
        // imports
        // module
        exports.push([module.i, "", ""]);
        // exports
        /***/ 
    }),
    /* 23 */
    /***/ (function (module, exports) {
        /**
         * Translates the list format produced by css-loader into something
         * easier to manipulate.
         */
        module.exports = function listToStyles(parentId, list) {
            var styles = [];
            var newStyles = {};
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var id = item[0];
                var css = item[1];
                var media = item[2];
                var sourceMap = item[3];
                var part = {
                    id: parentId + ':' + i,
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                if (!newStyles[id]) {
                    styles.push(newStyles[id] = { id: id, parts: [part] });
                }
                else {
                    newStyles[id].parts.push(part);
                }
            }
            return styles;
        };
        /***/ 
    }),
    /* 24 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
        let loading = class loading extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
            constructor() {
                super(...arguments);
                this.blockNum = 5;
                this.blocks = [];
                this.entry = () => {
                    let e = (resolve, reject) => {
                        let l = this.blockNum;
                        let blocks = this.blocks;
                        for (let i = 0; i <= l; i++) {
                            blocks.push({ class: "" });
                        }
                        resolve(true);
                    };
                    return new Promise(e);
                };
                this.animate = () => {
                    let l = this.blockNum;
                    let blocks = this.blocks;
                    let i = 0;
                    let loading = () => {
                        blocks[i].class = (blocks[i].class === "pop") ? "" : "pop";
                        i++;
                        if (i === l) {
                            i = 0;
                        }
                        setTimeout(loading, 160);
                    };
                    loading();
                };
            }
            mounted() {
                this.entry().then(r => this.animate());
            }
        };
        loading = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "loading",
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
                    'domain', 'token'
                ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("loading", {
                    loading: ({ loading }) => loading,
                    overLay: ({ overLay }) => overLay
                })),
            })
        ], loading);
        /* harmony default export */ __webpack_exports__["a"] = (loading);
        /***/ 
    }),
    /* 25 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _vm.loading
                ? _c("div", { staticClass: "loading" }, [
                    _vm._ssrNode(_vm._ssrList(_vm.blocks, function (block) {
                        return "<div" + _vm._ssrClass("block", block.class) + "></div>";
                    }))
                ])
                : _vm._e();
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 26 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", [
                _c("transition", { attrs: { name: "orverlay" } }, [
                    _vm.overLay
                        ? _c("div", { staticClass: "over-lay", attrs: { id: "over-lay" } }, [_c("app-loading", [_vm._v("ローディング")])], 1)
                        : _vm._e()
                ])
            ], 1);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 27 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_modal_vue__ = __webpack_require__(28);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49537e6e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_modal_vue__ = __webpack_require__(32);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "04a851f0";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_modal_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49537e6e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_modal_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/modal.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] modal.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 28 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_destroy__ = __webpack_require__(29);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
        let modal = class modal extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
            close() {
                if (this._close) {
                    this.closeModal();
                }
            }
            get isDisable() {
                return !this.close;
            }
        };
        modal = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "modal",
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
                    'domain', 'token'
                ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('modal', {
                    'show': ({ show }) => show,
                    '_close': ({ close }) => close
                })),
                methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("modal", ["closeModal"])),
                components: {
                    "modal-destroy": __WEBPACK_IMPORTED_MODULE_3__modal_destroy__["a" /* default */]
                }
            })
        ], modal);
        /* harmony default export */ __webpack_exports__["a"] = (modal);
        /***/ 
    }),
    /* 29 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destroy_vue__ = __webpack_require__(30);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_764def34_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_destroy_vue__ = __webpack_require__(31);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "4f6be95b";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destroy_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_764def34_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_destroy_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/modal/destroy.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] destroy.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 30 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
        let Destroy = class Destroy extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
            constructor() {
                super(...arguments);
                this.button = {
                    done: true,
                    cancel: true
                };
                this.name = "Destroy";
            }
            get show() {
                return this.template === this.name;
            }
            disable() {
                let disable = (resolve, reject) => {
                    resolve(true);
                };
                return new Promise(disable);
            }
            delete() {
            }
            cancel() {
                let plot = this.disable();
                plot.then(res => {
                    this.closeModal();
                });
            }
        };
        Destroy = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "destroy",
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
                    'domain', 'token'
                ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('modal', {
                    'close': ({ close }) => close,
                    'data': ({ data }) => data,
                    'template': ({ template }) => template,
                })),
                methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])('modal', ["setModal", "toggleModal", "closeModal"]))
            })
        ], Destroy);
        /* harmony default export */ __webpack_exports__["a"] = (Destroy);
        /***/ 
    }),
    /* 31 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _vm.show
                ? _c("div", [
                    _vm._ssrNode("<h3>" +
                        _vm._ssrEscape("Delete #" + _vm._s(_vm.data.id)) +
                        "</h3>" +
                        _vm._ssrEscape('\n  "' +
                            _vm._s(_vm.data.name) +
                            '" を削除します。一度削除されたデータは元に戻す事ができません。\n  ') +
                        '<div class="margin text-right"><button' +
                        _vm._ssrAttr("disabled", !_vm.button.done) +
                        ' class="button primary">Apply</button> <button' +
                        _vm._ssrAttr("disabled", !_vm.button.cancel) +
                        ' class="button warning">Cancel</button></div>')
                ])
                : _vm._e();
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 32 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _vm.show
                ? _c("div", {
                    attrs: { id: "modal-container" },
                    on: {
                        click: function ($event) {
                            if ($event.target !== $event.currentTarget) {
                                return null;
                            }
                            _vm.close();
                        }
                    }
                }, [
                    _vm._ssrNode('<div class="modal">', "</div>", [
                        _vm._ssrNode("<span" +
                            _vm._ssrClass("close typcn typcn-delete large", {
                                disabled: _vm.isDisable
                            }) +
                            "></span> "),
                        _vm._ssrNode('<div class="content">', "</div>", [_c("modal-destroy")], 1)
                    ], 2)
                ])
                : _vm._e();
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 33 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { attrs: { id: "application" } }, [
                _c("router-view", { attrs: { name: "navi" } }),
                _vm._ssrNode(" "),
                _vm._ssrNode('<div class="wrap container">', "</div>", [
                    _vm._ssrNode('<div class="row">', "</div>", [
                        _c("router-view", { attrs: { name: "sub" } }),
                        _vm._ssrNode(" "),
                        _c("router-view", { attrs: { name: "main" } })
                    ], 2)
                ]),
                _vm._ssrNode(" "),
                _c("app-modal"),
                _vm._ssrNode(" "),
                _c("app-overlay")
            ], 2);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 34 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createRouter;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(35);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_navi_vue__ = __webpack_require__(36);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_sub_vue__ = __webpack_require__(44);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tasks_components_page_vue__ = __webpack_require__(47);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tasks_components_add_vue__ = __webpack_require__(53);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tasks_components_view_vue__ = __webpack_require__(56);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tasks_components_edit_vue__ = __webpack_require__(59);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);
        function createRouter() {
            return new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
                mode: 'history',
                routes: [
                    { name: "page", path: `/tasks/page/:page*`, components: { main: __WEBPACK_IMPORTED_MODULE_4__tasks_components_page_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_2__components_navi_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_3__components_sub_vue__["a" /* default */] } },
                    { name: "index", path: `/tasks/page/1`, alias: `/tasks/` },
                    { name: "add", path: `/tasks/add`, components: { main: __WEBPACK_IMPORTED_MODULE_5__tasks_components_add_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_2__components_navi_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_3__components_sub_vue__["a" /* default */] } },
                    { name: "view", path: `/tasks/:id`, components: { main: __WEBPACK_IMPORTED_MODULE_6__tasks_components_view_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_2__components_navi_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_3__components_sub_vue__["a" /* default */] } },
                    { name: "edit", path: `/tasks/:id/edit`, components: { main: __WEBPACK_IMPORTED_MODULE_7__tasks_components_edit_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_2__components_navi_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_3__components_sub_vue__["a" /* default */] } },
                ]
            });
        }
        /***/ 
    }),
    /* 35 */
    /***/ (function (module, exports) {
        module.exports = require("vue-router");
        /***/ 
    }),
    /* 36 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navi_vue__ = __webpack_require__(37);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14c4e8ba_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_navi_vue__ = __webpack_require__(43);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "4fe896b3";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navi_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14c4e8ba_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_navi_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/navi.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] navi.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 37 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__indicator__ = __webpack_require__(38);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
        };
        navi = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "navi",
                components: {
                    "app-indicater": __WEBPACK_IMPORTED_MODULE_3__indicator__["a" /* default */],
                },
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
                    'domain', 'token'
                ])),
            })
        ], navi);
        /* harmony default export */ __webpack_exports__["a"] = (navi);
        /***/ 
    }),
    /* 38 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_indicator_vue__ = __webpack_require__(41);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8be63daa_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_indicator_vue__ = __webpack_require__(42);
        function injectStyle(ssrContext) {
            var i;
            (i = __webpack_require__(39), i.__inject__ && i.__inject__(ssrContext), i);
        }
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = injectStyle;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "47d7f25c";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_indicator_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8be63daa_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_indicator_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/indicator.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] indicator.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 39 */
    /***/ (function (module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(40);
        if (typeof content === 'string')
            content = [[module.i, content, '']];
        if (content.locals)
            module.exports = content.locals;
        // add CSS to SSR context
        var add = __webpack_require__(10);
        module.exports.__inject__ = function (context) {
            add("663d49c6", content, false, context);
        };
        /***/ 
    }),
    /* 40 */
    /***/ (function (module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(9)(undefined);
        // imports
        // module
        exports.push([module.i, "", ""]);
        // exports
        /***/ 
    }),
    /* 41 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
        let indicator = class indicator extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
            constructor() {
                super(...arguments);
                this.light = true;
                this.beat = (self) => {
                    let i = 0;
                    self._beat = () => {
                        let prosess = self.indicator.prosess;
                        if (prosess === true) {
                            self.light = (self.light) ? false : true;
                            setTimeout(self._beat, 2000);
                            return;
                        }
                        if (prosess === false && self.light === false) {
                            self.light = true;
                        }
                        setTimeout(self._beat, 2000);
                    };
                    self._beat();
                };
            }
            get width() {
                return this.indicator.complate;
            }
            get css() {
                let css = { light: false };
                css[this.indicator.status] = true;
                css.light = this.light;
                return css;
            }
            mounted() {
                let self = this;
                this.beat(self);
            }
        };
        indicator = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "indicator",
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
                    'domain', 'token'
                ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("loading", {
                    indicator: (state) => state.indicator
                })),
            })
        ], indicator);
        /* harmony default export */ __webpack_exports__["a"] = (indicator);
        /***/ 
    }),
    /* 42 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _vm.indicator.show
                ? _c("div", {
                    staticClass: "indicator",
                    class: _vm.css,
                    style: { width: _vm.width + "%" }
                }, [])
                : _vm._e();
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 43 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", [
                _vm._ssrNode('<nav class="navigation column">', "</nav>", [
                    _vm._ssrNode('<div class="container"><div class="row"><ul class="navigation-list"><li><a href="/tasks/aaa">menu 1</a></li> <li><a href="/tasks/aaa">menu 2</a></li> <li><a href="/tasks/aaa">menu 3</a></li> <li><a href="/tasks/aaa">menu 4</a></li></ul></div></div> '),
                    _c("app-indicater")
                ], 2)
            ]);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 44 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sub_vue__ = __webpack_require__(45);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f6229848_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_sub_vue__ = __webpack_require__(46);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "6e10e2c3";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sub_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f6229848_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_sub_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/sub.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] sub.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 45 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
                name: 'sub'
            })
        ], sub);
        /* harmony default export */ __webpack_exports__["a"] = (sub);
        /***/ 
    }),
    /* 46 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "column column-25" }, [
                _vm._ssrNode("<ul>", "</ul>", [
                    _vm._ssrNode("<li>", "</li>", [_c("router-link", { attrs: { to: "/tasks" } }, [_vm._v("Index")])], 1),
                    _vm._ssrNode(" "),
                    _vm._ssrNode("<li>", "</li>", [_c("router-link", { attrs: { to: "/tasks/add" } }, [_vm._v("Add")])], 1)
                ], 2)
            ]);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 47 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_vue__ = __webpack_require__(48);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49a92c8d_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_page_vue__ = __webpack_require__(52);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "4a994046";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_page_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49a92c8d_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_page_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/components/page.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] page.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 48 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spa_components_pagination_vue__ = __webpack_require__(49);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(3);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
        let Page = class Page extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
            asyncData({ store, route }) {
                return store.dispatch("tasks/fetchEntities", route);
            }
            mounted() {
                let pg = this.pagination;
                if (pg.currentPage > pg.totalPage) {
                    this.$router.push({ path: `${this.mount}/page/${pg.totalPage}` });
                }
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
                        name: title
                    }
                };
                this.setModal(modal);
                this.toggleModal();
            }
        };
        Page = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "page",
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["c" /* mapGetters */])([
                    'domain'
                ]), Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["e" /* mapState */])('tasks', {
                    entities: ({ entities }) => entities,
                    pagination: ({ page }) => page,
                    mount: ({ mount }) => mount
                })),
                methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["d" /* mapMutations */])("modal", ["setModal", "toggleModal"]), Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapActions */])("tasks", ["fetchEntities"])),
                components: { pagination: __WEBPACK_IMPORTED_MODULE_2__spa_components_pagination_vue__["a" /* default */] }
            })
        ], Page);
        /* harmony default export */ __webpack_exports__["a"] = (Page);
        /***/ 
    }),
    /* 49 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pagination_vue__ = __webpack_require__(50);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21d304a4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_pagination_vue__ = __webpack_require__(51);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "0df40ce7";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pagination_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21d304a4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_pagination_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/components/pagination.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] pagination.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 50 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_sideless_build_query__ = __webpack_require__(11);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        let bq = new __WEBPACK_IMPORTED_MODULE_2__base_sideless_build_query__["a" /* build_query */]();
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
                return `${this.mount}/page/${number}/${httpQuery}`;
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
        /***/ 
    }),
    /* 51 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _vm.check
                ? _c("div", [
                    _vm._ssrNode('<nav class="pagination clearfix">', "</nav>", [
                        _vm._ssrNode('<ul class="pagination-list">', "</ul>", [
                            _vm.special.first
                                ? _vm._ssrNode("<li>", "</li>", [
                                    _c("router-link", {
                                        class: _vm.first.css,
                                        attrs: { to: _vm.first.link }
                                    }, [_vm._v("« First")])
                                ], 1)
                                : _vm._e(),
                            _vm._ssrNode(" "),
                            _vm.special.prev
                                ? _vm._ssrNode("<li>", "</li>", [
                                    _c("router-link", { class: _vm.prev.css, attrs: { to: _vm.prev.link } }, [_vm._v("‹ Prev")])
                                ], 1)
                                : _vm._e(),
                            _vm._ssrNode(" "),
                            _vm._l(_vm.numbers, function (list) {
                                return _vm._ssrNode("<li" + _vm._ssrClass(null, list.active) + ">", "</li>", [
                                    _c("router-link", { attrs: { to: list.link } }, [
                                        _vm._v(_vm._s(list.num))
                                    ])
                                ], 1);
                            }),
                            _vm._ssrNode(" "),
                            _vm.special.prev
                                ? _vm._ssrNode("<li>", "</li>", [
                                    _c("router-link", { class: _vm.next.css, attrs: { to: _vm.next.link } }, [_vm._v("Next ›")])
                                ], 1)
                                : _vm._e(),
                            _vm._ssrNode(" "),
                            _vm.special.prev
                                ? _vm._ssrNode("<li>", "</li>", [
                                    _c("router-link", { class: _vm.last.css, attrs: { to: _vm.last.link } }, [_vm._v("Last »")])
                                ], 1)
                                : _vm._e()
                        ], 2)
                    ]),
                    _vm._ssrNode(' <div class="text-right text-medium">' +
                        _vm._ssrEscape(" Page " +
                            _vm._s(_vm.pagination.currentPage) +
                            " / " +
                            _vm._s(_vm.pagination.totalPage) +
                            " ") +
                        "</div>")
                ], 2)
                : _vm._e();
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 52 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "resource column column-75" }, [
                _vm._ssrNode("<h2>Index</h2> "),
                _vm._ssrNode("<div>", "</div>", _vm._l(_vm.entities, function (entity) {
                    return _vm._ssrNode("<div>", "</div>", [
                        _vm._ssrNode("<h3>", "</h3>", [
                            _c("router-link", { attrs: { to: _vm.view(entity.id) } }, [
                                _vm._v(_vm._s(entity.title))
                            ])
                        ], 1),
                        _vm._ssrNode(" "),
                        _c("router-link", {
                            staticClass: "button small",
                            attrs: { to: _vm.edit(entity.id) }
                        }, [_vm._v("edit")]),
                        _vm._ssrNode(' <button class="button small">delete</button>')
                    ], 2);
                })),
                _vm._ssrNode(" "),
                _c("pagination", {
                    attrs: { pagination: _vm.pagination, mount: _vm.mount }
                })
            ], 2);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 53 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_add_vue__ = __webpack_require__(54);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1f4b8713_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_add_vue__ = __webpack_require__(55);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "489d983a";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_add_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1f4b8713_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_add_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/components/add.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] add.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 54 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(12);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(13);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
                this.task = {
                    title: "",
                    priod: ""
                };
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
        add = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "add",
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
                    'domain', 'token'
                ])),
            })
        ], add);
        /* harmony default export */ __webpack_exports__["a"] = (add);
        /***/ 
    }),
    /* 55 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "resource column column-75" }, [
                _vm._ssrNode('<h2>Add</h2> <form action="./" method="post"><input type="hidden" name="_csrf"' +
                    _vm._ssrAttr("value", _vm.token) +
                    '> <div class="form-item"><label for="title">title</label> <input type="text" name="title" placeholder="title"' +
                    _vm._ssrAttr("value", _vm.task.title) +
                    '></div> <div class="form-item"><label for="priod">priod</label> <input type="text" name="priod" placeholder="priod"' +
                    _vm._ssrAttr("value", _vm.task.priod) +
                    ' class="calendar"></div> <button type="submit">submit</button></form>')
            ]);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 56 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__ = __webpack_require__(57);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5db609a3_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__ = __webpack_require__(58);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "5ea61d5c";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5db609a3_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/components/view.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] view.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 57 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
        /***/ 
    }),
    /* 58 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "resource column column-75" }, [
                _vm._ssrNode("<h2>View</h2> <h3>Id</h3> <div>" +
                    _vm._ssrEscape(_vm._s(_vm.entity.id)) +
                    "</div> <h3>Title</h3> <div>" +
                    _vm._ssrEscape(_vm._s(_vm.entity.title)) +
                    "</div> <h3>Priod</h3> <div>" +
                    _vm._ssrEscape(_vm._s(_vm.entity.priod)) +
                    "</div> <h3>Created</h3> <div>" +
                    _vm._ssrEscape(_vm._s(_vm.entity.created_at)) +
                    "</div> <h3>Updated</h3> <div>" +
                    _vm._ssrEscape(_vm._s(_vm.entity.updated_at)) +
                    "</div>")
            ]);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 59 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__ = __webpack_require__(60);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_75ec0288_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__ = __webpack_require__(61);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "76dc1641";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_75ec0288_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/components/edit.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] edit.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 60 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(12);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(13);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
        var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
            }
            asyncData({ store, route }) {
                return store.dispatch('tasks/fetchEntity', route);
            }
            get action() {
                return `/${this.domain}/${this.entity.id}`;
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
        edit = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "edit",
                computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
                    'domain', 'token'
                ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("tasks", {
                    entity: ({ entity }) => entity
                })),
                methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("tasks", ["fetchEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("tasks", ["updateEntity"]))
            })
        ], edit);
        /* harmony default export */ __webpack_exports__["a"] = (edit);
        /***/ 
    }),
    /* 61 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "resource column column-75" }, [
                _vm._ssrNode("<h2>Edit</h2> <form" +
                    _vm._ssrAttr("action", _vm.action) +
                    ' method="post"><input type="hidden" name="id"' +
                    _vm._ssrAttr("value", _vm.entity.id) +
                    '> <input type="hidden" name="_csrf"' +
                    _vm._ssrAttr("value", _vm.token) +
                    '> <input type="hidden" name="_method" value="put"> <div class="form-item"><label for="title">title</label> <input type="text" name="title" placeholder="title"' +
                    _vm._ssrAttr("value", _vm.entity.title) +
                    '></div> <div class="form-item"><label for="priod">priod</label> <input type="text" name="priod" placeholder="priod"' +
                    _vm._ssrAttr("value", _vm.entity.priod) +
                    ' class="calendar"></div> <button type="submit">submit</button></form>')
            ]);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 62 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_loading_vue_module__ = __webpack_require__(63);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_modal_vue_module__ = __webpack_require__(68);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_crud_vue_module__ = __webpack_require__(73);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);
        function createStore(server) {
            let getters = {
                domain: (state) => {
                    return state.domain;
                },
                token: (state) => {
                    if (typeof window === "undefined") {
                        return "";
                    }
                    let body = document.getElementsByTagName("body")[0];
                    let csrfToken = body.attributes["data-csrf-token"].value;
                    return csrfToken;
                }
            };
            let tasks = new __WEBPACK_IMPORTED_MODULE_4__store_crud_vue_module__["a" /* vue_module */](Object.assign({ entities: "tasks", endPoint: "/tasks" }, server)).store();
            let loading = new __WEBPACK_IMPORTED_MODULE_2__store_loading_vue_module__["a" /* vue_module */]({ server }).store();
            let modal = new __WEBPACK_IMPORTED_MODULE_3__store_modal_vue_module__["a" /* vue_module */]({ server }).store();
            let vuex = {
                getters: getters,
                modules: {
                    "loading": loading,
                    "modal": modal,
                    "tasks": tasks
                }
            };
            return new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store(vuex);
        }
        /***/ 
    }),
    /* 63 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_module__ = __webpack_require__(4);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(64);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(65);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(66);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters__ = __webpack_require__(67);
        class vue_module extends __WEBPACK_IMPORTED_MODULE_0__vue_module__["a" /* vue_module */] {
            constructor(options) {
                super();
                this.state = new __WEBPACK_IMPORTED_MODULE_3__state__["a" /* state */](options).map("all");
                this.actions = new __WEBPACK_IMPORTED_MODULE_2__actions__["a" /* actions */](options).map("all");
                this.mutations = new __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* mutations */](options).map("all");
                this.getters = new __WEBPACK_IMPORTED_MODULE_4__getters__["a" /* getters */](options).map("all");
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = vue_module;
        /***/ 
    }),
    /* 64 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations__ = __webpack_require__(5);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__mutations__["a" /* mutations */] {
            constructor(options) {
                super();
                this.setIndicator = ({ indicator }, { status, complate }) => {
                    let before = indicator.complate;
                    indicator.status = status;
                    if (complate >= 100) {
                        indicator.prosess = false;
                        setTimeout(() => {
                            indicator.status = "primary";
                        }, 500);
                    }
                    else {
                        indicator.prosess = true;
                    }
                    if (before > complate) {
                        indicator.show = false;
                        indicator.complate = 0;
                        setTimeout(() => {
                            indicator.show = true;
                            indicator.complate = complate;
                        }, 1);
                        return;
                    }
                    indicator.show = true;
                    indicator.complate = complate;
                };
                this.loading = (state) => {
                    this.setIndicator(state, { status: "success", complate: 8 });
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
        /***/ 
    }),
    /* 65 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(6);
        class actions extends __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* actions */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = actions;
        /***/ 
    }),
    /* 66 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(7);
        class state extends __WEBPACK_IMPORTED_MODULE_0__state__["a" /* state */] {
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
        /***/ 
    }),
    /* 67 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getters__ = __webpack_require__(8);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 68 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_module__ = __webpack_require__(4);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(69);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(70);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(71);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters__ = __webpack_require__(72);
        class vue_module extends __WEBPACK_IMPORTED_MODULE_0__vue_module__["a" /* vue_module */] {
            constructor(options) {
                super();
                this.state = new __WEBPACK_IMPORTED_MODULE_3__state__["a" /* state */](options).map("all");
                this.actions = new __WEBPACK_IMPORTED_MODULE_2__actions__["a" /* actions */](options).map("all");
                this.mutations = new __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* mutations */](options).map("all");
                this.getters = new __WEBPACK_IMPORTED_MODULE_4__getters__["a" /* getters */](options).map("all");
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = vue_module;
        /***/ 
    }),
    /* 69 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations__ = __webpack_require__(5);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__mutations__["a" /* mutations */] {
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
                    state.show = true;
                };
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = mutations;
        /***/ 
    }),
    /* 70 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(6);
        class actions extends __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* actions */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = actions;
        /***/ 
    }),
    /* 71 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(7);
        class state extends __WEBPACK_IMPORTED_MODULE_0__state__["a" /* state */] {
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
        /***/ 
    }),
    /* 72 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getters__ = __webpack_require__(8);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 73 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_module__ = __webpack_require__(4);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(74);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(75);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(77);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters__ = __webpack_require__(78);
        class vue_module extends __WEBPACK_IMPORTED_MODULE_0__vue_module__["a" /* vue_module */] {
            constructor(options) {
                super();
                this.state = new __WEBPACK_IMPORTED_MODULE_3__state__["a" /* state */](options).map("all");
                this.actions = new __WEBPACK_IMPORTED_MODULE_2__actions__["a" /* actions */](options).map("all");
                this.mutations = new __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* mutations */](options).map("all");
                this.getters = new __WEBPACK_IMPORTED_MODULE_4__getters__["a" /* getters */](options).map("all");
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = vue_module;
        /***/ 
    }),
    /* 74 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations__ = __webpack_require__(5);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__mutations__["a" /* mutations */] {
            constructor(options) {
                super();
                this.setEntities = (state, paginate) => {
                    state.entities = paginate[this._entities];
                    state.page = paginate.page;
                };
                this.setEntity = (state, response) => {
                    state.entity = response;
                };
                this.updateEntity = (state, kv) => {
                    state.entity[kv.key] = kv.value;
                };
                this._mount = options.mount;
                this._entities = options.entities;
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = mutations;
        /***/ 
    }),
    /* 75 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(6);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_internal__ = __webpack_require__(76);
        let api;
        class actions extends __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* actions */] {
            constructor(options) {
                super();
                this.fetchEntities = ({ commit }, route) => {
                    return api.paginate(route).then((paginate) => {
                        commit("setEntities", paginate);
                    });
                };
                this.fetchEntity = ({ commit }, route) => {
                    return api.entity(route).then((entity) => {
                        commit("setEntity", entity);
                    });
                };
                this.insertEntity = ({ commit }, route) => {
                    return api.entity(route).then((entity) => {
                        commit("setEntity", entity);
                    });
                };
                this.saveEntity = ({ commit }, route) => {
                    return api.entity(route).then((entity) => {
                        commit("setEntity", entity);
                    });
                };
                api = new __WEBPACK_IMPORTED_MODULE_1__api_internal__["a" /* internal */]({
                    host: options.host,
                    endPoint: options.endPoint,
                    request: options.request,
                });
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = actions;
        /***/ 
    }),
    /* 76 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_sideless_build_query__ = __webpack_require__(11);
        class internal {
            constructor(options) {
                this.options = {
                    credentials: 'same-origin',
                    method: "get",
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json'
                    }
                };
                this.endPoint = "";
                this.host = "";
                this.client = (url, options) => {
                    let client = (resolve, reject) => {
                        options = Object.assign(this.options, options);
                        fetch(url, options)
                            .then((response) => {
                            if (response.status !== 201) {
                                reject(response.status);
                            }
                            ;
                            return response.json();
                        }).then((data) => {
                            resolve(data);
                        }).catch((err) => {
                            reject(err);
                        });
                    };
                    return new Promise(client);
                };
                this.server = (url, options = {}) => {
                    let req = this.request;
                    let srvOptions = Object.assign(this.options, options);
                    let server = (resolve, reject) => {
                        let options = {
                            url: `${this.host}${url}`,
                            method: srvOptions.method,
                            headers: srvOptions.headers
                        };
                        req(options, (error, response, body) => {
                            if (error) {
                                reject(true);
                                return;
                            }
                            resolve(JSON.parse(body));
                        });
                    };
                    return new Promise(server);
                };
                this.paginate = (route) => {
                    let bq = new __WEBPACK_IMPORTED_MODULE_0__base_sideless_build_query__["a" /* build_query */]();
                    let URI = `${this.endPoint}/${this.routeParse(route)}${bq.http(route.query)}`;
                    if (typeof window === "undefined") {
                        return this.server(URI, {});
                    }
                    return this.client(URI, {});
                };
                this.entity = (route) => {
                    let id = route.params.id;
                    let URI = `${this.endPoint}/${id}`;
                    if (typeof window === "undefined") {
                        return this.server(URI, {});
                    }
                    return this.client(URI, {});
                };
                this.insert = () => {
                };
                this.delete = () => {
                };
                this.endPoint = options.endPoint;
                this.host = options.host;
                this.request = options.request;
            }
            routeParse(route) {
                let params = route.params;
                let paramsStr = "";
                for (let key in params) {
                    paramsStr = `${key}/${params[key]}`;
                }
                return paramsStr;
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = internal;
        /***/ 
    }),
    /* 77 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(7);
        class state extends __WEBPACK_IMPORTED_MODULE_0__state__["a" /* state */] {
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
                this.mount = options.endPoint;
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = state;
        /***/ 
    }),
    /* 78 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getters__ = __webpack_require__(8);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 79 */
    /***/ (function (module, exports) {
        exports.sync = function (store, router, options) {
            var moduleName = (options || {}).moduleName || 'route';
            store.registerModule(moduleName, {
                namespaced: true,
                state: cloneRoute(router.currentRoute),
                mutations: {
                    'ROUTE_CHANGED': function ROUTE_CHANGED(state, transition) {
                        store.state[moduleName] = cloneRoute(transition.to, transition.from);
                    }
                }
            });
            var isTimeTraveling = false;
            var currentPath;
            // sync router on store change
            var storeUnwatch = store.watch(function (state) { return state[moduleName]; }, function (route) {
                var fullPath = route.fullPath;
                if (fullPath === currentPath) {
                    return;
                }
                if (currentPath != null) {
                    isTimeTraveling = true;
                    router.push(route);
                }
                currentPath = fullPath;
            }, { sync: true });
            // sync store on router navigation
            var afterEachUnHook = router.afterEach(function (to, from) {
                if (isTimeTraveling) {
                    isTimeTraveling = false;
                    return;
                }
                currentPath = to.fullPath;
                store.commit(moduleName + '/ROUTE_CHANGED', { to: to, from: from });
            });
            return function unsync() {
                // On unsync, remove router hook
                if (afterEachUnHook != null) {
                    afterEachUnHook();
                }
                // On unsync, remove store watch
                if (storeUnwatch != null) {
                    storeUnwatch();
                }
                // On unsync, unregister Module with store
                store.unregisterModule(moduleName);
            };
        };
        function cloneRoute(to, from) {
            var clone = {
                name: to.name,
                path: to.path,
                hash: to.hash,
                query: to.query,
                params: to.params,
                fullPath: to.fullPath,
                meta: to.meta
            };
            if (from) {
                clone.from = cloneRoute(from);
            }
            return Object.freeze(clone);
        }
        /***/ 
    })
    /******/ 
])));
