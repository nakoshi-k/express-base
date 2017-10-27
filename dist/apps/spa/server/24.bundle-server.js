exports.ids = [24];
exports.modules = {

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(8);
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
            pagination: () => __webpack_require__.e/* import() */(14).then(__webpack_require__.bind(null, 82))
        }
    })
], idx);
/* harmony default export */ __webpack_exports__["a"] = (idx);


/***/ }),

/***/ 128:
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

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_idx_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_45582900_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_idx_vue__ = __webpack_require__(128);
var normalizeComponent = __webpack_require__(6)
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

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

};;