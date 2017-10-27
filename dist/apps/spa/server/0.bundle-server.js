exports.ids = [0];
exports.modules = {

/***/ 104:
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
                          { attrs: { to: "/tasks", title: "Home" } },
                          [_vm._v("Home ")]
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

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navigation_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59631247_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_navigation_vue__ = __webpack_require__(104);
var normalizeComponent = __webpack_require__(9)
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

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(11);
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
            "app-indicater": () => __webpack_require__.e/* import() */(16).then(__webpack_require__.bind(null, 99)),
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


/***/ })

};;