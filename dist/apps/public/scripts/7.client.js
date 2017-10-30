webpackJsonp([7],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_flatpickr_src_plugins_confirmDate_confirmDate_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_validation__ = __webpack_require__(73);
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
let edit = class edit extends __WEBPACK_IMPORTED_MODULE_0_vue__["default"] {
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

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "edit" }, [
    _c("h2", [_vm._v("Edit")]),
    _vm._v(" "),
    _c(
      "form",
      {
        attrs: { action: _vm.action, method: "post" },
        on: {
          submit: function($event) {
            $event.preventDefault()
            _vm.save($event)
          }
        }
      },
      [
        _c("fieldset", [
          _c("input", {
            class: _vm.validationClass(_vm.errors, "id"),
            attrs: { type: "hidden", name: "id" },
            domProps: { value: _vm.entity.id },
            on: { change: _vm.change }
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-item" },
            [
              _c("label", { attrs: { for: "title" } }, [_vm._v("Title")]),
              _vm._v(" "),
              _c("input", {
                class: _vm.validationClass(_vm.errors, "title"),
                attrs: { type: "text", name: "title", placeholder: "title" },
                domProps: { value: _vm.entity.title },
                on: { change: _vm.change }
              }),
              _vm._v(" "),
              _vm._l(_vm.errors.title, function(e) {
                return _c("div", { staticClass: "errors" }, [
                  _c("span", { staticClass: "typcn typcn-warning-outline" }),
                  _vm._v(" " + _vm._s(e.message) + " ")
                ])
              })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-item" },
            [
              _c("label", { attrs: { for: "priod" } }, [_vm._v("Priod")]),
              _vm._v(" "),
              _c("input", {
                staticClass: "calendar",
                class: _vm.validationClass(_vm.errors, "priod"),
                attrs: {
                  type: "datetime-local",
                  name: "priod",
                  placeholder: "priod"
                },
                domProps: { value: _vm.entity.priod },
                on: { change: _vm.change }
              }),
              _vm._v(" "),
              _vm._l(_vm.errors.priod, function(e) {
                return _c("div", { staticClass: "errors" }, [
                  _c("span", { staticClass: "typcn typcn-warning-outline" }),
                  _vm._v(" " + _vm._s(e.message) + " ")
                ])
              })
            ],
            2
          )
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            class: _vm.validationClass(_vm.errors, "submit"),
            attrs: { type: "submit" }
          },
          [_vm._v("update")]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c87c6dd", esExports)
  }
}

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c87c6dd_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__ = __webpack_require__(121);
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
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_edit_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c87c6dd_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_edit_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/tasks/components/edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] edit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c87c6dd", Component.options)
  } else {
    hotAPI.reload("data-v-3c87c6dd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});