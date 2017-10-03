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
    /******/ return __webpack_require__(__webpack_require__.s = 2);
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
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(3);
        /* harmony default export */ __webpack_exports__["default"] = (context => {
            let server = (resolve, reject) => {
                const { app, router } = Object(__WEBPACK_IMPORTED_MODULE_0__app__["a" /* createApp */])();
                router.push(context.url);
                router.onReady(() => {
                    const matchedComponents = router.getMatchedComponents();
                    if (!matchedComponents.length) {
                        reject({ code: 404 });
                    }
                    resolve(app);
                }, reject);
            };
            return new Promise(server);
        });
        /***/ 
    }),
    /* 3 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createApp;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_App_vue__ = __webpack_require__(4);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(6);
        function createApp() {
            const router = Object(__WEBPACK_IMPORTED_MODULE_2__router__["a" /* createRouter */])();
            const app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
                router,
                render: h => h(__WEBPACK_IMPORTED_MODULE_1__vue_App_vue__["a" /* default */])
            });
            return { app, router };
        }
        /***/ 
    }),
    /* 4 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99f0819c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(5);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        var __vue_script__ = null;
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "edfed12a";
        var Component = normalizeComponent(__vue_script__, __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99f0819c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
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
    /* 5 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { attrs: { id: "app" } }, [_vm._ssrNode("\n  Hello\n  "), _c("router-view")], 2);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    }),
    /* 6 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = createRouter;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(7);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_Hello_vue__ = __webpack_require__(8);
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);
        function createRouter() {
            return new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
                routes: [
                    { path: '/', name: 'hello', component: __WEBPACK_IMPORTED_MODULE_2__vue_Hello_vue__["a" /* default */] }
                ]
            });
        }
        /***/ 
    }),
    /* 7 */
    /***/ (function (module, exports) {
        module.exports = require("vue-router");
        /***/ 
    }),
    /* 8 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3cf7c323_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Hello_vue__ = __webpack_require__(9);
        var normalizeComponent = __webpack_require__(1);
        /* script */
        var __vue_script__ = null;
        /* template */
        /* styles */
        var __vue_styles__ = null;
        /* scopeId */
        var __vue_scopeId__ = null;
        /* moduleIdentifier (server only) */
        var __vue_module_identifier__ = "781b711c";
        var Component = normalizeComponent(__vue_script__, __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3cf7c323_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Hello_vue__["a" /* default */], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        Component.options.__file = "apps/tasks/spa/vue/Hello.vue";
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__"; })) {
            console.error("named exports are not supported in *.vue files.");
        }
        if (Component.options.functional) {
            console.error("[vue-loader] Hello.vue: functional components are not supported with templates, they should use render functions.");
        }
        /* harmony default export */ __webpack_exports__["a"] = (Component.exports);
        /***/ 
    }),
    /* 9 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function () {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", [_vm._ssrNode("<span>hello</span>")]);
        };
        var staticRenderFns = [];
        render._withStripped = true;
        var esExports = { render: render, staticRenderFns: staticRenderFns };
        /* harmony default export */ __webpack_exports__["a"] = (esExports);
        /***/ 
    })
    /******/ 
])));
