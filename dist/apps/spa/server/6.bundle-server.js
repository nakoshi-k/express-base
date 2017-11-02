exports.ids = [6];
exports.modules = {

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destroy_vue__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_240a0082_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_destroy_vue__ = __webpack_require__(148);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "bb6efeb4"
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

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 147:
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

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.show
    ? _c("div", { staticClass: "content" }, [
        _vm._ssrNode(
          "<h3>" +
            _vm._ssrEscape("Delete #" + _vm._s(_vm.data.id)) +
            "</h3>" +
            _vm._ssrEscape(
              '\n  "' +
                _vm._s(_vm.data.name) +
                '" を削除します。一度削除されたデータは元に戻す事ができません。\n  '
            ) +
            '<div class="margin text-right"><button' +
            _vm._ssrAttr("disabled", !_vm.button.cancel) +
            ' class="button warning">Cancel</button> <button' +
            _vm._ssrAttr("disabled", !_vm.button.done) +
            ' class="button primary">Apply</button></div>'
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

};;