(function (e, a) { for (var i in a)
    e[i] = a[i]; }(exports, /******/ (function (modules) {
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/
    /******/ // object to store loaded chunks
    /******/ // "0" means "already loaded"
    /******/ var installedChunks = {
        /******/ 20: 0
        /******/ 
    };
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
    /******/ // This file contains only the entry chunk.
    /******/ // The chunk loading function for additional chunks
    /******/ __webpack_require__.e = function requireEnsure(chunkId) {
        /******/ // "0" is the signal for "already loaded"
        /******/ if (installedChunks[chunkId] !== 0) {
            /******/ var chunk = require("./" + chunkId + ".bundle-server.js");
            /******/ var moreModules = chunk.modules, chunkIds = chunk.ids;
            /******/ for (var moduleId in moreModules) {
                /******/ modules[moduleId] = moreModules[moduleId];
                /******/ }
            /******/ for (var i = 0; i < chunkIds.length; i++)
                /******/ installedChunks[chunkIds[i]] = 0;
            /******/ }
        /******/ return Promise.resolve();
        /******/ 
    };
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
    /******/ // uncatched error handler for webpack runtime
    /******/ __webpack_require__.oe = function (err) {
        /******/ process.nextTick(function () {
            /******/ throw err; // catch this error by using System.import().catch()
            /******/ 
        });
        /******/ 
    };
    /******/
    /******/ // Load entry module and return exports
    /******/ return __webpack_require__(__webpack_require__.s = 15);
    /******/ 
})([
    /* 0 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
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
        /***/ 
    }),
    /* 1 */
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
    /* 2 */
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
    /* 3 */
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
    /* 4 */
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
    /* 5 */
    /***/ (function (module, exports) {
        module.exports = require("vue");
        /***/ 
    }),
    /* 6 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
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
        /***/ 
    }),
    /* 7 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
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
        /***/ 
    }),
    /* 8 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_sideless_build_query__ = __webpack_require__(12);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__client_fetch__ = __webpack_require__(6);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_route_parse__ = __webpack_require__(45);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resource__ = __webpack_require__(7);
        let client = new __WEBPACK_IMPORTED_MODULE_1__client_fetch__["a" /* client_fetch */]();
        class internal_crud extends __WEBPACK_IMPORTED_MODULE_3__resource__["a" /* resource */] {
            constructor(options) {
                super();
                this.endPoint = "";
                this.client = (url, options) => {
                    return client.fetch(url, options);
                };
                this.serverPagination = (route) => {
                    let serverPagination = (resolve, reject) => {
                        let service = this.feeds.service(this.resource);
                        let pagination = this.feeds.pagination(this.resource);
                        let conditions = service.conditions(route);
                        let entities = pagination.find(conditions, route.query);
                        let name = this.resource;
                        let data = {};
                        entities.then((result) => {
                            if (result.rows.length === 0) {
                                reject(false);
                            }
                            ;
                            data[name] = result.rows;
                            data["page"] = result.pagination;
                            resolve(data);
                        }).catch((error) => {
                            data[name] = {};
                            data["page"] = {};
                            reject(error);
                        });
                    };
                    return serverPagination;
                };
                this.serverEntity = (route) => {
                    let serverEntity = (resolve, reject) => {
                        let model = this.feeds.model(this.resource);
                        let data = {};
                        model.findById(route.params.id).then((result) => {
                            if (!result) {
                                reject();
                                throw Error;
                            }
                            resolve(result);
                        }).catch((err) => {
                            reject(err);
                        });
                    };
                    return serverEntity;
                };
                this.server = (type, route) => {
                    let server;
                    if (type === "paginate") {
                        server = this.serverPagination(route);
                    }
                    if (type === "entity") {
                        server = this.serverEntity(route);
                    }
                    return new Promise(server);
                };
                this.paginate = (route) => {
                    let bq = new __WEBPACK_IMPORTED_MODULE_0__base_sideless_build_query__["a" /* build_query */]();
                    let URI = `${this.endPoint}/${__WEBPACK_IMPORTED_MODULE_2__utilities_route_parse__["a" /* default */].parse(route)}${bq.http(route.query)}`;
                    if (this.is_server()) {
                        return this.server("paginate", route);
                    }
                    return this.client(URI, {});
                };
                this.entity = (route) => {
                    let id = route.params.id;
                    let URI = `${this.endPoint}/${id}`;
                    if (this.is_server()) {
                        return this.server("entity", route);
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
                this.endPoint = options.endPoint;
                this.resource = options.resource;
                this.feeds = options.feeds;
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = internal_crud;
        /***/ 
    }),
    /* 9 */
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
    /* 10 */
    /***/ (function (module, exports, __webpack_require__) {
        "use strict";
        /**
          * vue-class-component v5.0.2
          * (c) 2015-2017 Evan You
          * @license MIT
          */
        Object.defineProperty(exports, '__esModule', { value: true });
        function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
        var Vue = _interopDefault(__webpack_require__(5));
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
    /* 11 */
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
    /* 12 */
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
                    if (!prts[key]) {
                        return;
                    }
                    q += `&${encodeURIComponent(key)}=${encodeURIComponent(prts[key])}`;
                });
                return q.replace("&", "?");
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = build_query;
        /***/ 
    }),
    /* 13 */ ,
    /* 14 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_fetch__ = __webpack_require__(6);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resource__ = __webpack_require__(7);
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
                            reject(e);
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
                        reject();
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
        /***/ 
    }),
    /* 15 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application__ = __webpack_require__(16);
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
                        resolve(app);
                    });
                }, reject);
            };
            return new Promise(server);
        });
        /***/ 
    }),
    /* 16 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createApp;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_vue__ = __webpack_require__(17);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__client_router__ = __webpack_require__(20);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(24);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(56);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.mixin({
            beforeMount() {
                const asyncData = this.$options["asyncData"];
                if (asyncData) {
                    let ad = Promise.resolve(this.$store.commit("loading/loading", "success"));
                    ad.then(() => asyncData({ store: this.$store, route: this.$route }))
                        .then(res => {
                        setTimeout(() => {
                            this.$store.commit("loading/endLoading", "success");
                        }, 240);
                    }).catch(err => {
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
        /***/ 
    }),
    /* 17 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__ = __webpack_require__(18);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dba65148_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__ = __webpack_require__(19);
        var normalizeComponent = __webpack_require__(9);
        /* script */
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "4e9a1a56";
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dba65148_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/spa/app.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 18 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(10);
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
        /*
        import over_lay from './loading/components/over_lay.vue';
        import modal from './modal/components/modal.vue'
        import offset from './offset/components/offset.vue'
        */
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
                    "app-overlay": () => __webpack_require__.e /* import() */(14).then(__webpack_require__.bind(null, 57)),
                    "app-modal": () => __webpack_require__.e /* import() */(13).then(__webpack_require__.bind(null, 58)),
                    "app-offset": () => __webpack_require__.e /* import() */(3).then(__webpack_require__.bind(null, 59))
                }
            })
        ], app);
        /* harmony default export */ __webpack_exports__["a"] = (app);
        /***/ 
    }),
    /* 19 */
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
                    _vm._ssrNode('<div class="row row-center">', "</div>", [_c("router-view", { attrs: { name: "single" } })], 1),
                    _vm._ssrNode(" "),
                    _vm._ssrNode('<div class="row row-md-reverse">', "</div>", [
                        _vm._ssrNode('<div class="column column-lg-75 column-md-65">', "</div>", [_c("router-view", { attrs: { name: "main" } })], 1),
                        _vm._ssrNode(" "),
                        _vm._ssrNode('<div class="column column-lg-25 column-md-35">', "</div>", [_c("router-view", { attrs: { name: "sub" } })], 1)
                    ], 2)
                ], 2),
                _vm._ssrNode(" "),
                _c("app-offset"),
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
    /* 20 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createRouter;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(21);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tasks_spa_router__ = __webpack_require__(22);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_spa_router__ = __webpack_require__(23);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);
        function createRouter() {
            return new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
                mode: 'history',
                routes: [
                    ...__WEBPACK_IMPORTED_MODULE_2__tasks_spa_router__["a" /* default */],
                    ...__WEBPACK_IMPORTED_MODULE_3__users_spa_router__["a" /* default */]
                ]
            });
        }
        /***/ 
    }),
    /* 21 */
    /***/ (function (module, exports) {
        module.exports = require("vue-router");
        /***/ 
    }),
    /* 22 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        const navigation = () => __webpack_require__.e /* import() */(0 /* duplicate */).then(__webpack_require__.bind(null, 13));
        const sub = () => __webpack_require__.e /* import() */(2).then(__webpack_require__.bind(null, 60));
        const idx = () => __webpack_require__.e /* import() */(12).then(__webpack_require__.bind(null, 61));
        const add = () => __webpack_require__.e /* import() */(7).then(__webpack_require__.bind(null, 62));
        const view = () => __webpack_require__.e /* import() */(11).then(__webpack_require__.bind(null, 63));
        const edit = () => __webpack_require__.e /* import() */(6).then(__webpack_require__.bind(null, 64));
        const mount = "/tasks";
        /* harmony default export */ __webpack_exports__["a"] = ([
            { name: "tasks_page", path: `${mount}/page/:page*`, components: { main: idx, navi: navigation, sub: sub } },
            { name: "tasks_index", path: `${mount}/page/1`, alias: `${mount}/` },
            { name: "tasks_add", path: `${mount}/add`, components: { main: add, navi: navigation, sub: sub } },
            { name: "tasks_view", path: `${mount}/:id`, components: { main: view, navi: navigation, sub: sub } },
            { name: "tasks_edit", path: `${mount}/:id/edit`, components: { main: edit, navi: navigation, sub: sub } },
        ]);
        /***/ 
    }),
    /* 23 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        const navigation = () => __webpack_require__.e /* import() */(0).then(__webpack_require__.bind(null, 13));
        const sub = () => __webpack_require__.e /* import() */(1).then(__webpack_require__.bind(null, 65));
        const idx = () => __webpack_require__.e /* import() */(10).then(__webpack_require__.bind(null, 66));
        const add = () => __webpack_require__.e /* import() */(5).then(__webpack_require__.bind(null, 67));
        const view = () => __webpack_require__.e /* import() */(9).then(__webpack_require__.bind(null, 68));
        const edit = () => __webpack_require__.e /* import() */(4).then(__webpack_require__.bind(null, 69));
        const login = () => __webpack_require__.e /* import() */(8).then(__webpack_require__.bind(null, 70));
        const mount = "/users";
        /* harmony default export */ __webpack_exports__["a"] = ([
            { name: "users_login", path: `${mount}/login`, components: { single: login } },
            { name: "users_page", path: `${mount}/page/:page*`, components: { main: idx, navi: navigation, sub: sub } },
            { name: "users_index", path: `${mount}/page/1`, alias: `${mount}/` },
            { name: "users_add", path: `${mount}/add`, components: { main: add, navi: navigation, sub: sub } },
            { name: "users_view", path: `${mount}/:id`, components: { main: view, navi: navigation, sub: sub } },
            { name: "users_edit", path: `${mount}/:id/edit`, components: { main: edit, navi: navigation, sub: sub } },
        ]);
        /***/ 
    }),
    /* 24 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(11);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading_store_module__ = __webpack_require__(25);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_store_module__ = __webpack_require__(30);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__offset_store_module__ = __webpack_require__(35);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tasks_store_module__ = __webpack_require__(40);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__users_store_module__ = __webpack_require__(46);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_store_module__ = __webpack_require__(51);
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
            let auth = new __WEBPACK_IMPORTED_MODULE_7__auth_store_module__["a" /* store_module */]({ feeds: feeds }).store();
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
                    "auth": auth,
                    "offset": offset
                }
            };
            return new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store(vuex);
        }
        /***/ 
    }),
    /* 25 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(26);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(27);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(28);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(29);
        class store_module extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__["a" /* store_module */] {
            constructor(options) {
                super();
                this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
                this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
                this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
                this.getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = store_module;
        /***/ 
    }),
    /* 26 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__ = __webpack_require__(1);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__["a" /* mutations */] {
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
        /***/ 
    }),
    /* 27 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__ = __webpack_require__(2);
        class actions extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__["a" /* actions */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = actions;
        /***/ 
    }),
    /* 28 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__ = __webpack_require__(3);
        class state extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__["a" /* state */] {
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
    /* 29 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__ = __webpack_require__(4);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 30 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(31);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(32);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(33);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(34);
        class store_module extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__["a" /* store_module */] {
            constructor(options) {
                super();
                this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
                this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
                this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
                this.getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = store_module;
        /***/ 
    }),
    /* 31 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__ = __webpack_require__(1);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__["a" /* mutations */] {
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
        /***/ 
    }),
    /* 32 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__ = __webpack_require__(2);
        class actions extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__["a" /* actions */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = actions;
        /***/ 
    }),
    /* 33 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__ = __webpack_require__(3);
        class state extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__["a" /* state */] {
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
    /* 34 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__ = __webpack_require__(4);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 35 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(36);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(37);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(38);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(39);
        class store_module extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__["a" /* store_module */] {
            constructor(options) {
                super();
                this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](options).map("all");
                this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](options).map("all");
                this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](options).map("all");
                this.getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](options).map("all");
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = store_module;
        /***/ 
    }),
    /* 36 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__ = __webpack_require__(1);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__["a" /* mutations */] {
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
        /***/ 
    }),
    /* 37 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__ = __webpack_require__(2);
        class actions extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__["a" /* actions */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = actions;
        /***/ 
    }),
    /* 38 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__ = __webpack_require__(3);
        class state extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__["a" /* state */] {
            constructor(options) {
                super();
                this.close = false;
                this.show = false;
                this.template = "";
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = state;
        /***/ 
    }),
    /* 39 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__ = __webpack_require__(4);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 40 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(41);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(42);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(43);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(44);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__ = __webpack_require__(8);
        class store_module extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__["a" /* store_module */] {
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
        /***/ 
    }),
    /* 41 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__ = __webpack_require__(1);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__["a" /* mutations */] {
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
        /***/ 
    }),
    /* 42 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__ = __webpack_require__(2);
        class actions extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__["a" /* actions */] {
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
        /***/ 
    }),
    /* 43 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__ = __webpack_require__(3);
        class state extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__["a" /* state */] {
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
        /***/ 
    }),
    /* 44 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__ = __webpack_require__(4);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 45 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        class route_parse {
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
        /***/ 
    }),
    /* 46 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(47);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(48);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(49);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(50);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__ = __webpack_require__(8);
        class store_module extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__["a" /* store_module */] {
            constructor(feeds) {
                super();
                this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](feeds).map("all");
                this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](feeds).map("all");
                this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](feeds).map("all");
                let local_getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](feeds).map("all");
                let crud = () => {
                    return new __WEBPACK_IMPORTED_MODULE_5__resources_internal_crud__["a" /* internal_crud */]({
                        endPoint: "/api/users",
                        resource: "users",
                        feeds: feeds
                    });
                };
                this.getters = Object.assign({}, local_getters, { crud: crud });
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = store_module;
        /***/ 
    }),
    /* 47 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__ = __webpack_require__(1);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__["a" /* mutations */] {
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
        /***/ 
    }),
    /* 48 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__ = __webpack_require__(2);
        class actions extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__["a" /* actions */] {
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
        /***/ 
    }),
    /* 49 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__ = __webpack_require__(3);
        class state extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__["a" /* state */] {
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
        /***/ 
    }),
    /* 50 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__ = __webpack_require__(4);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 51 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_mutations__ = __webpack_require__(52);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_actions__ = __webpack_require__(53);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_state__ = __webpack_require__(54);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_getters__ = __webpack_require__(55);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_auth__ = __webpack_require__(14);
        class store_module extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_store_module__["a" /* store_module */] {
            constructor(feeds) {
                super();
                this.state = new __WEBPACK_IMPORTED_MODULE_3__stores_state__["a" /* state */](feeds).map("all");
                this.actions = new __WEBPACK_IMPORTED_MODULE_2__stores_actions__["a" /* actions */](feeds).map("all");
                this.mutations = new __WEBPACK_IMPORTED_MODULE_1__stores_mutations__["a" /* mutations */](feeds).map("all");
                let lgetters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](feeds).map("all");
                this.getters = Object.assign({}, lgetters, { feeds: function () { return feeds; } });
                let local_getters = new __WEBPACK_IMPORTED_MODULE_4__stores_getters__["a" /* getters */](feeds).map("all");
                let api = () => {
                    return new __WEBPACK_IMPORTED_MODULE_5__resources_auth__["a" /* auth */](feeds);
                };
                this.getters = Object.assign({}, local_getters, { api: api });
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = store_module;
        /***/ 
    }),
    /* 52 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__ = __webpack_require__(1);
        class mutations extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_mutations__["a" /* mutations */] {
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
        /***/ 
    }),
    /* 53 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__ = __webpack_require__(2);
        class actions extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_actions__["a" /* actions */] {
            constructor(options) {
                super();
                this.fetchAuthUser = ({ commit, getters, state }) => {
                    let api = getters.api;
                    return api.user().then(r => {
                        commit("setAuthUser", r);
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
        /***/ 
    }),
    /* 54 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__ = __webpack_require__(3);
        class state extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_state__["a" /* state */] {
            constructor(feeds) {
                super();
                this.feeds = {};
                this.auth_status = false;
                this.user = {
                    id: "",
                    name: "",
                    mail: ""
                };
                this.feeds = feeds;
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = state;
        /***/ 
    }),
    /* 55 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__ = __webpack_require__(4);
        class getters extends __WEBPACK_IMPORTED_MODULE_0__base_spa_stores_getters__["a" /* getters */] {
            constructor(options) {
                super();
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = getters;
        /***/ 
    }),
    /* 56 */
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
