exports.ids = [1];
exports.modules = {

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_offset_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d88a285_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_offset_vue__ = __webpack_require__(154);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "56a69cac"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_offset_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d88a285_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_offset_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/offset/components/offset.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] offset.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_components_login_user__ = __webpack_require__(151);
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
let offset = class offset extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
};
offset = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "offset",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])('offset', {
            'show': ({ show }) => show,
            '_close': ({ close }) => close
        })),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapMutations */])("offset", ["closeOffset"])),
        components: {
            "login-user": __WEBPACK_IMPORTED_MODULE_3__auth_components_login_user__["a" /* default */]
        }
    })
], offset);
/* harmony default export */ __webpack_exports__["a"] = (offset);


/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_user_vue__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a4a5ce8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_user_vue__ = __webpack_require__(153);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "73d2694f"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_user_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a4a5ce8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_login_user_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/auth/components/login_user.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login_user.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 152:
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
let login_user = class login_user extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    mounted() {
        if (!this.auth_status) {
            this.fetchAuthUser();
        }
    }
};
login_user = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "login_user",
        components: {},
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("auth", {
            user: ({ user }) => user,
            auth_status: ({ auth_status }) => auth_status,
        }), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ])),
        methods: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])("auth", ["fetchAuthUser", "logout"]))
    })
], login_user);
/* harmony default export */ __webpack_exports__["a"] = (login_user);


/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.auth_status
    ? _c("div", { staticClass: "margin" }, [
        _vm._ssrNode(
          '<div class="login-user row padding"><div class="column column-25">avatar</div> <div class="column column-75 text-sm"><div class="text-md">' +
            _vm._ssrEscape(_vm._s(_vm.user.name)) +
            "</div> <div>" +
            _vm._ssrEscape("Mail : " + _vm._s(_vm.user.mail)) +
            "</div> <div>" +
            _vm._ssrEscape("Last login : " + _vm._s(_vm.user.last_login)) +
            "</div> " +
            (_vm.auth_status
              ? '<div><a title="logout"><span class="typcn typcn-export"></span> Logout</a></div>'
              : "<!---->") +
            "</div></div>"
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.show
    ? _c(
        "div",
        { staticClass: "offset-container", attrs: { id: "offset-container" } },
        [
          _vm._ssrNode(
            '<div class="offset">',
            "</div>",
            [
              _vm._ssrNode(
                '<span class="close typcn typcn-delete large"></span> '
              ),
              _vm._ssrNode(
                '<div class="content">',
                "</div>",
                [
                  _c("login-user"),
                  _vm._ssrNode(" "),
                  _vm._ssrNode(
                    "<ul>",
                    "</ul>",
                    [
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
                      )
                    ],
                    2
                  )
                ],
                2
              )
            ],
            2
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

};;