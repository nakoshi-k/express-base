webpackJsonp([13],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(12);
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
let view = class view extends __WEBPACK_IMPORTED_MODULE_0_vue__["default"] {
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

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.entity.id
    ? _c("div", { staticClass: "view" }, [
        _c("h2", [_vm._v("View")]),
        _vm._v(" "),
        _c("h3", [_vm._v("Id")]),
        _vm._v(" "),
        _c("div", [_vm._v(_vm._s(_vm.entity.id))]),
        _vm._v(" "),
        _c("h3", [_vm._v("Title")]),
        _vm._v(" "),
        _c("div", [_vm._v(_vm._s(_vm.entity.title))]),
        _vm._v(" "),
        _c("h3", [_vm._v("Priod")]),
        _vm._v(" "),
        _c("div", [_vm._v(_vm._s(_vm.entity.priod))]),
        _vm._v(" "),
        _c("h3", [_vm._v("Created at")]),
        _vm._v(" "),
        _c("div", [_vm._v(_vm._s(_vm.entity.created_at))]),
        _vm._v(" "),
        _c("h3", [_vm._v("Updated at")]),
        _vm._v(" "),
        _c("div", [_vm._v(_vm._s(_vm.entity.updated_at))])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2451cdf8", esExports)
  }
}

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_view_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2451cdf8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_view_vue__ = __webpack_require__(119);
var disposed = false
var normalizeComponent = __webpack_require__(10)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
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

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2451cdf8", Component.options)
  } else {
    hotAPI.reload("data-v-2451cdf8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});