webpackJsonp([5],{

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_modal_vue__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e2c935c8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_modal_vue__ = __webpack_require__(152);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_modal_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e2c935c8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_modal_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/modal/components/inner/login_modal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login_modal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e2c935c8", Component.options)
  } else {
    hotAPI.reload("data-v-e2c935c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_validation__ = __webpack_require__(6);
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
let login_modal = class login_modal extends __WEBPACK_IMPORTED_MODULE_0_vue__["default"] {
    constructor() {
        super(...arguments);
        this.name = "login_modal";
        this.button = {
            done: true,
            cancel: true
        };
        this.user = {
            account: "",
            password: ""
        };
        this.errors = {};
    }
    get show() {
        return this.template === this.name;
    }
    get action() {
        return "/api/users/login";
    }
    login() {
        this.errors = {};
        let auth = this.api;
        auth.login(this.user, this.token).then(r => {
            this.setAuthUser(r);
            this.closeModal();
        }).catch(e => {
            this.errors = e;
        });
    }
    get reject() {
        for (let k in this.errors) {
            return "reject";
        }
    }
};
login_modal = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "login_modal",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])('auth', ["api"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('modal', {
            'close': ({ close }) => close,
            'data': ({ data }) => data,
            'template': ({ template }) => template,
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])('modal', ["setModal", "toggleModal", "closeModal"]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])('auth', ["setAuthUser"]), __WEBPACK_IMPORTED_MODULE_3__utilities_validation__["a" /* default */].map(["validationClass"]))
    })
], login_modal);
/* harmony default export */ __webpack_exports__["a"] = (login_modal);


/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.show
    ? _c("div", { staticClass: "content animation", class: _vm.reject }, [
        _c("h2", [_vm._v("Login")]),
        _vm._v(" "),
        _c(
          "form",
          {
            attrs: { action: _vm.action, method: "post" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.login($event)
              }
            }
          },
          [
            _c(
              "fieldset",
              [
                _c("input", {
                  attrs: { type: "hidden", name: "_csrf" },
                  domProps: { value: _vm.token }
                }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "form-item" },
                  [
                    _c("label", { attrs: { for: "name" } }, [
                      _vm._v("user name or e-mail ")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.user.account,
                          expression: "user.account"
                        }
                      ],
                      class: _vm.validationClass(_vm.errors, "account"),
                      attrs: {
                        type: "text",
                        name: "account",
                        placeholder: "user name or e-mail"
                      },
                      domProps: { value: _vm.user.account },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.user.account = $event.target.value
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._l(_vm.errors.account, function(e) {
                      return _c("div", { staticClass: "errors" }, [
                        _c("span", {
                          staticClass: "typcn typcn-warning-outline"
                        }),
                        _vm._v(" " + _vm._s(e.message))
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
                    _c("label", { attrs: { for: "password" } }, [
                      _vm._v("Password")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.user.password,
                          expression: "user.password"
                        }
                      ],
                      class: _vm.validationClass(_vm.errors, "password"),
                      attrs: {
                        type: "password",
                        name: "password",
                        placeholder: "password"
                      },
                      domProps: { value: _vm.user.password },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.user.password = $event.target.value
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._l(_vm.errors.password, function(e) {
                      return _c("div", { staticClass: "errors" }, [
                        _c("span", {
                          staticClass: "typcn typcn-warning-outline"
                        }),
                        _vm._v(" " + _vm._s(e.message) + " ")
                      ])
                    })
                  ],
                  2
                ),
                _vm._v(" "),
                _vm._l(_vm.errors.internal, function(e) {
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
              "button",
              {
                class: _vm.validationClass(_vm.errors, "submit"),
                attrs: { type: "submit" }
              },
              [_vm._v("Login")]
            )
          ]
        )
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
     require("vue-hot-reload-api").rerender("data-v-e2c935c8", esExports)
  }
}

/***/ })

});