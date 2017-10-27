webpackJsonp([0],{

/***/ 100:
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
let navi = class navi extends __WEBPACK_IMPORTED_MODULE_0_vue__["default"] {
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
            "app-indicater": () => __webpack_require__.e/* import() */(16).then(__webpack_require__.bind(null, 101)),
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


/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "nav",
      { staticClass: "navigation column" },
      [
        _c("div", { staticClass: "container" }, [
          _c("div", { staticClass: "row row-md-reverse" }, [
            _c("div", { staticClass: "hidden-md column text-right" }, [
              _c(
                "ul",
                { staticClass: "navigation-list navigation-list-reverse" },
                [
                  _c("li", { staticClass: "show-lg show-xl show-md" }, [
                    _c(
                      "h1",
                      [
                        _c("router-link", { attrs: { to: "/tasks" } }, [
                          _vm._v("Apprication")
                        ])
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  !_vm.auth_status
                    ? _c("li", { staticClass: "show-lg show-xl show-md" }, [
                        _c(
                          "a",
                          {
                            attrs: { title: "login" },
                            on: {
                              click: function($event) {
                                _vm.m_login()
                              }
                            }
                          },
                          [
                            _c("span", { staticClass: "typcn typcn-key" }),
                            _vm._v(" Login")
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.auth_status
                    ? _c("li", { staticClass: "show-lg show-xl show-md" }, [
                        _c(
                          "a",
                          {
                            attrs: { title: "logout" },
                            on: {
                              click: function($event) {
                                _vm.h_logout()
                              }
                            }
                          },
                          [
                            _c("span", { staticClass: "typcn typcn-export" }),
                            _vm._v(" Logout")
                          ]
                        )
                      ])
                    : _vm._e()
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "column" }, [
              _c("ul", { staticClass: "navigation-list" }, [
                _c("li", [
                  _c(
                    "a",
                    {
                      staticClass: "offset-toggle",
                      class: { active: _vm.show },
                      attrs: { href: "#", title: "open offset menu" },
                      on: { click: _vm.toggle }
                    },
                    [_c("span", { staticClass: "typcn typcn-th-menu" })]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "li",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/tasks", title: "Home" } },
                      [_vm._v("Home ")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/tasks", title: "Tasks" } },
                      [_vm._v("Tasks")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/users", title: "Users" } },
                      [_vm._v("Users")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                !_vm.auth_status
                  ? _c("li", { staticClass: "show-sm" }, [
                      _c(
                        "a",
                        {
                          attrs: { title: "login" },
                          on: {
                            click: function($event) {
                              _vm.m_login()
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "typcn typcn-key" }),
                          _vm._v(" Login")
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.auth_status
                  ? _c("li", { staticClass: "show-sm" }, [
                      _c(
                        "a",
                        {
                          attrs: { title: "logout" },
                          on: {
                            click: function($event) {
                              _vm.h_logout()
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "typcn typcn-export" }),
                          _vm._v(" Logout")
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("app-indicater")
      ],
      1
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
     require("vue-hot-reload-api").rerender("data-v-59631247", esExports)
  }
}

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navigation_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59631247_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_navigation_vue__ = __webpack_require__(106);
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
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navigation_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59631247_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_navigation_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/navigation/components/navigation.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] navigation.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-59631247", Component.options)
  } else {
    hotAPI.reload("data-v-59631247", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});