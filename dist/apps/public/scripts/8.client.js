webpackJsonp([8],{

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_validation__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resources_auth__ = __webpack_require__(15);
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
let login = class login extends __WEBPACK_IMPORTED_MODULE_0_vue__["default"] {
    constructor() {
        super(...arguments);
        this.user = {
            account: "",
            password: ""
        };
        this.errors = {};
    }
    get action() {
        return "/api/users/login";
    }
    login() {
        let auth = new __WEBPACK_IMPORTED_MODULE_4__resources_auth__["a" /* auth */]();
        auth.login(this.user, this.token).then(r => {
            this.errors = {};
            this.$router.push("/tasks");
        }).catch(e => {
            console.log(e);
            this.errors = e;
            console.log("login failed");
        });
    }
};
login = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "login",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])('auth', ["feeds"])),
        methods: Object.assign({}, __WEBPACK_IMPORTED_MODULE_3__utilities_validation__["a" /* default */].map(["validationClass"]))
    })
], login);
/* harmony default export */ __webpack_exports__["a"] = (login);


/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "login column column-md-50 column-md-offset-25" },
    [
      _c("div", { staticClass: "panel" }, [
        _c("h1", { staticClass: "text-center" }, [_vm._v("Application")]),
        _vm._v(" "),
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
            _c("fieldset", [
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
              )
            ]),
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
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2756e128", esExports)
  }
}

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2756e128_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(136);
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
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2756e128_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/users/components/login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2756e128", Component.options)
  } else {
    hotAPI.reload("data-v-2756e128", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class form_validation_class {
    constructor() {
        this.validationClass = (errors, name) => {
            if (name === "submit") {
                if ((Object.keys(errors).length > 0)) {
                    return "warning";
                }
            }
            if (errors[name]) {
                return "warning";
            }
        };
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
/* harmony default export */ __webpack_exports__["a"] = (new form_validation_class());


/***/ })

});