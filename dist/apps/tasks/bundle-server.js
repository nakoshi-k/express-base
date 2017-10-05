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
    /******/ return __webpack_require__(__webpack_require__.s = 3);
    /******/ 
})({
    /***/ 0: 
    /***/ (function (module, exports) {
        module.exports = require("vue");
        /***/ 
    }),
    /***/ 1: 
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
    /***/ 10: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f848136_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Navi_vue__ = __webpack_require__(11);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        var __vue_script__ = null;
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "5d402368";
        var Component = normalizeComponent(__vue_script__, __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f848136_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Navi_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/spa/vue/Navi.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] Navi.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /***/ 11: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("nav", { staticClass: "navigation column" }, [
                _vm._ssrNode('<div class="container"><div class="row"><ul class="navigation-list"><li><a href="/tasks/aaa">menu 1</a></li> <li><a href="/tasks/aaa">menu 2</a></li> <li><a href="/tasks/aaa">menu 3</a></li> <li><a href="/tasks/aaa">menu 4</a></li></ul></div></div>')
            ]);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /***/ 15: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(16);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(60);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Interface__ = __webpack_require__(61);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);
        let increment = (state) => {
            state.count++;
        };
        function createStore(options = __WEBPACK_IMPORTED_MODULE_3__Interface__["a" /* createOptions */]) {
            let api = new __WEBPACK_IMPORTED_MODULE_2__api__["a" /* Internal */]({
                host: options.host,
                entities: options.entities,
                entity: options.entity,
                request: options.request
            });
            let vuex = {
                state: {
                    domain: options.entities
                },
                actions: {
                    fetchEntities({ commit }, query = { page: 1, search: "" }) {
                        return api.entities(query).then((entities) => {
                            commit("setEntities", entities);
                        });
                    }
                },
                mutations: {
                    setEntities: (state, entities) => {
                        let tasks = entities.tasks;
                        state.tasks = entities.tasks;
                        state.page = entities.page;
                    },
                }
            };
            return new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store(vuex);
        }
        /***/ 
    }),
    /***/ 16: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export Store */
        /* unused harmony export install */
        /* unused harmony export mapState */
        /* unused harmony export mapMutations */
        /* unused harmony export mapGetters */
        /* unused harmony export mapActions */
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
    /***/ 17: 
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
    }),
    /***/ 18: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Page_vue__ = __webpack_require__(19);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c3a1ec64_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Page_vue__ = __webpack_require__(20);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "f15d8e96";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Page_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c3a1ec64_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Page_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/spa/vue/Page.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] Page.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /***/ 19: 
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
        let Page = class Page extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
            asyncData({ store, route }) {
                return store.dispatch('fetchEntities');
            }
            view(id) {
                return `/tasks/${id}`;
            }
            edit(id) {
                return `/tasks/${id}/edit`;
            }
            get tasks() {
                return this.$store.state.tasks;
            }
        };
        Page = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: "Page"
            })
        ], Page);
        /* harmony default export */ __webpack_exports__["a"] = (Page);
        /***/ 
    }),
    /***/ 2: 
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
    /***/ 20: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "resource column column-75" }, [
                _vm._ssrNode("<h2>aaa</h2> "),
                _vm._ssrNode("<div>", "</div>", _vm._l(_vm.tasks, function (task) {
                    return _vm._ssrNode("<div>", "</div>", [
                        _vm._ssrNode("<h3>", "</h3>", [
                            _c("router-link", { attrs: { to: _vm.view(task.id) } }, [
                                _vm._v(_vm._s(task.title))
                            ])
                        ], 1),
                        _vm._ssrNode(" "),
                        _c("router-link", {
                            staticClass: "button small",
                            attrs: { to: _vm.edit(task.id) }
                        }, [_vm._v("edit")])
                    ], 2);
                }))
            ], 2);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /***/ 263: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Sub_vue__ = __webpack_require__(265);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_72fadbd1_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Sub_vue__ = __webpack_require__(264);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "48f3b40a";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Sub_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_72fadbd1_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Sub_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/spa/vue/Sub.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] Sub.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /***/ 264: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "column column-25" }, [
                _vm._ssrNode("<ul>", "</ul>", [
                    _vm._ssrNode("<li>", "</li>", [
                        _c("router-link", { attrs: { to: "/" + _vm.domain + "/" } }, [
                            _vm._v("Index")
                        ])
                    ], 1),
                    _vm._ssrNode(" "),
                    _vm._ssrNode("<li>", "</li>", [
                        _c("router-link", { attrs: { to: "/" + _vm.domain + "/add" } }, [
                            _vm._v("Add")
                        ])
                    ], 1)
                ], 2)
            ]);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /***/ 265: 
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
        let Sub = class Sub extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
            get domain() {
                return this.$store.state.domain;
            }
        };
        Sub = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: 'Sub'
            })
        ], Sub);
        /* harmony default export */ __webpack_exports__["a"] = (Sub);
        /***/ 
    }),
    /***/ 266: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Add_vue__ = __webpack_require__(267);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c437049c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Add_vue__ = __webpack_require__(268);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "73dd55eb";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Add_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c437049c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Add_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/spa/vue/Add.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] Add.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /***/ 267: 
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
        let Add = class Add extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
            get domain() {
                return this.$store.state.domain;
            }
        };
        Add = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({})
        ], Add);
        /* harmony default export */ __webpack_exports__["a"] = (Add);
        /***/ 
    }),
    /***/ 268: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "resource column column-75" }, []);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /***/ 3: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(4);
        /* harmony default export */ __webpack_exports__["default"] = (context => {
            let server = (resolve, reject) => {
                const { app, router, store } = Object(__WEBPACK_IMPORTED_MODULE_0__app__["a" /* createApp */])(context.serverOptions);
                router.push(context.url);
                router.onReady(() => {
                    const matchedComponents = router.getMatchedComponents();
                    if (!matchedComponents.length) {
                        reject({ code: 404 });
                    }
                    Promise.all(matchedComponents.map((Component) => {
                        if (Component.asyncData) {
                            return Component.asyncData({
                                store,
                                route: router.currentRoute
                            });
                        }
                        if (!Component.extendOptions) {
                            return;
                        }
                        if (Component.extendOptions.asyncData) {
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
    /***/ 4: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createApp;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_App_vue__ = __webpack_require__(5);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(8);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(15);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(17);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Interface__ = __webpack_require__(61);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.mixin({
            beforeMount() {
                let alias = this;
                const { asyncData } = alias.$options;
                if (asyncData) {
                    alias.dataPromise = asyncData({
                        store: this.$store,
                        route: this.$route
                    });
                }
            }
        });
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.mixin({
            beforeRouteUpdate(to, from, next) {
                const { asyncData } = this.$options;
                if (asyncData) {
                    asyncData({
                        store: this.$store,
                        route: to
                    }).then(next).catch(next);
                }
                else {
                    next();
                }
            }
        });
        function createApp(options = __WEBPACK_IMPORTED_MODULE_5__Interface__["a" /* createOptions */]) {
            const router = Object(__WEBPACK_IMPORTED_MODULE_2__router__["a" /* createRouter */])(options);
            const store = Object(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* createStore */])(options);
            Object(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(store, router);
            const app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
                router,
                store,
                render: h => h(__WEBPACK_IMPORTED_MODULE_1__vue_App_vue__["a" /* default */])
            });
            return { app, router, store };
        }
        /***/ 
    }),
    /***/ 5: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(6);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99f0819c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(7);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "edfed12a";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99f0819c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/spa/vue/App.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /***/ 6: 
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
        let App = class App extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
        };
        App = __decorate([
            __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
                name: 'App'
            })
        ], App);
        /* harmony default export */ __webpack_exports__["a"] = (App);
        /***/ 
    }),
    /***/ 60: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface__ = __webpack_require__(61);
        class Internal {
            constructor(options = __WEBPACK_IMPORTED_MODULE_0__Interface__["a" /* createOptions */]) {
                this.options = {
                    credentials: 'same-origin',
                    method: "get",
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json'
                    }
                };
                this.name = "";
                this.names = "";
                this.host = "";
                this.client = (url, options) => {
                    let client = (resolve, reject) => {
                        options = Object.assign(this.options, options);
                        fetch(url, options)
                            .then((response) => {
                            if (response.status === 201) {
                                return response.json();
                            }
                            ;
                            throw Error;
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
                            }
                            resolve(JSON.parse(body));
                        });
                    };
                    return new Promise(server);
                };
                this.entities = (query = { page: 1, search: "" }) => {
                    let url = `/${this.names}/page/${query.page}${query.search}`;
                    if (typeof window === "undefined") {
                        return this.server(url, {});
                    }
                    return this.client(url, {});
                };
                this.entity = (query = { page: 1, search: "" }) => {
                    let url = `/${this.names}/page/${query.page}${query.search}`;
                    if (typeof window === "undefined") {
                        return this.server(url, {});
                    }
                    return this.client(url, {});
                };
                this.name = options.entity;
                this.names = options.entities;
                this.host = options.host;
                this.request = options.request;
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = Internal;
        /***/ 
    }),
    /***/ 61: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function () { return createOptions; });
        let createOptions = {
            host: "",
            entities: "",
            entity: "",
            request: {}
        };
        /***/ 
    }),
    /***/ 7: 
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
                ])
            ], 2);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /***/ 8: 
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createRouter;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(9);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_Navi_vue__ = __webpack_require__(10);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_Page_vue__ = __webpack_require__(18);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_Sub_vue__ = __webpack_require__(263);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_Add_vue__ = __webpack_require__(266);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Interface__ = __webpack_require__(61);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);
        function createRouter(options = __WEBPACK_IMPORTED_MODULE_6__Interface__["a" /* createOptions */]) {
            let opt = options;
            return new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
                mode: 'history',
                routes: [
                    { path: `/${opt.entities}/`, components: { main: __WEBPACK_IMPORTED_MODULE_3__vue_Page_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_2__vue_Navi_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_4__vue_Sub_vue__["a" /* default */] } },
                    { path: `/${opt.entities}/add`, components: { main: __WEBPACK_IMPORTED_MODULE_5__vue_Add_vue__["a" /* default */], navi: __WEBPACK_IMPORTED_MODULE_2__vue_Navi_vue__["a" /* default */], sub: __WEBPACK_IMPORTED_MODULE_4__vue_Sub_vue__["a" /* default */] } },
                ]
            });
        }
        /***/ 
    }),
    /***/ 9: 
    /***/ (function (module, exports) {
        module.exports = require("vue-router");
        /***/ 
    })
    /******/ 
})));
