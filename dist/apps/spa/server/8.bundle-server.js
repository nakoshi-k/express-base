exports.ids = [8];
exports.modules = {

/***/ 14:
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


/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2756e128_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(29);
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "adae315a"
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

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_validation__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resources_auth__ = __webpack_require__(10);
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
let login = class login extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
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

/***/ 29:
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
      _vm._ssrNode(
        '<div class="panel"><h1 class="text-center">Application</h1> <h2>Login</h2> <form' +
          _vm._ssrAttr("action", _vm.action) +
          ' method="post"><fieldset><input type="hidden" name="_csrf"' +
          _vm._ssrAttr("value", _vm.token) +
          '> <div class="form-item"><label for="name">user name or e-mail </label> <input type="text" name="account" placeholder="user name or e-mail"' +
          _vm._ssrAttr("value", _vm.user.account) +
          _vm._ssrClass(null, _vm.validationClass(_vm.errors, "account")) +
          "> " +
          _vm._ssrList(_vm.errors.account, function(e) {
            return (
              '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
              _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
              "</div>"
            )
          }) +
          '</div> <div class="form-item"><label for="password">Password</label> <input type="password" name="password" placeholder="password"' +
          _vm._ssrAttr("value", _vm.user.password) +
          _vm._ssrClass(null, _vm.validationClass(_vm.errors, "password")) +
          "> " +
          _vm._ssrList(_vm.errors.password, function(e) {
            return (
              '<div class="errors"><span class="typcn typcn-warning-outline"></span>' +
              _vm._ssrEscape(" " + _vm._s(e.message) + " ") +
              "</div>"
            )
          }) +
          '</div></fieldset> <button type="submit"' +
          _vm._ssrClass(null, _vm.validationClass(_vm.errors, "submit")) +
          ">Login</button></form></div>"
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

};;