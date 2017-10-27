webpackJsonp([17],{

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destroy_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_240a0082_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_destroy_vue__ = __webpack_require__(95);
var disposed = false
var normalizeComponent = __webpack_require__(7)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destroy_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_240a0082_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_destroy_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/modal/components/inner/destroy.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] destroy.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-240a0082", Component.options)
  } else {
    hotAPI.reload("data-v-240a0082", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(9);
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
let Destroy = class Destroy extends __WEBPACK_IMPORTED_MODULE_0_vue__["default"] {
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
    destroy() {
        let data = this.data;
        data["token"] = this.token;
        this.loading();
        let names = data.mount.replace("/", "");
        this.$store.dispatch(`${names}/deleteEntity`, data).then(r => {
            this.closeModal();
            this.$store.dispatch(`${names}/fetchEntities`, this.$store.state.route);
            this.endLoading("success");
        }).catch(e => {
            this.endLoading("warning");
        });
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
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])('modal', ["setModal", "toggleModal", "closeModal", "deleteEntity"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("loading", ["loading", "endLoading"]))
    })
], Destroy);
/* harmony default export */ __webpack_exports__["a"] = (Destroy);


/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.show
    ? _c("div", { staticClass: "content" }, [
        _c("h3", [_vm._v("Delete #" + _vm._s(_vm.data.id))]),
        _vm._v(
          '\n  "' +
            _vm._s(_vm.data.name) +
            '" を削除します。一度削除されたデータは元に戻す事ができません。\n  '
        ),
        _c("div", { staticClass: "margin text-right" }, [
          _c(
            "button",
            {
              staticClass: "button warning",
              attrs: { disabled: !_vm.button.cancel },
              on: {
                click: function($event) {
                  _vm.closeModal()
                }
              }
            },
            [_vm._v("Cancel")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "button primary",
              attrs: { disabled: !_vm.button.done },
              on: {
                click: function($event) {
                  _vm.destroy()
                }
              }
            },
            [_vm._v("Apply")]
          )
        ])
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
     require("vue-hot-reload-api").rerender("data-v-240a0082", esExports)
  }
}

/***/ })

});