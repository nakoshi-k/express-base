exports.ids = [17];
exports.modules = {

/***/ 74:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

var listToStyles = __webpack_require__(76)

module.exports = function (parentId, list, isProduction, context) {
  if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    context = __VUE_SSR_CONTEXT__
  }
  if (context) {
    if (!context.hasOwnProperty('styles')) {
      Object.defineProperty(context, 'styles', {
        enumerable: true,
        get: function() {
          return renderStyles(context._styles)
        }
      })
      // expose renderStyles for vue-server-renderer (vuejs/#6353)
      context._renderStyles = renderStyles
    }

    var styles = context._styles || (context._styles = {})
    list = listToStyles(parentId, list)
    if (isProduction) {
      addStyleProd(styles, list)
    } else {
      addStyleDev(styles, list)
    }
  }
}

// In production, render as few style tags as possible.
// (mostly because IE9 has a limit on number of style tags)
function addStyleProd (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      // group style tags by media types.
      var id = part.media || 'default'
      var style = styles[id]
      if (style) {
        if (style.ids.indexOf(part.id) < 0) {
          style.ids.push(part.id)
          style.css += '\n' + part.css
        }
      } else {
        styles[id] = {
          ids: [part.id],
          css: part.css,
          media: part.media
        }
      }
    }
  }
}

// In dev we use individual style tag for each module for hot-reload
// and source maps.
function addStyleDev (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      styles[part.id] = {
        ids: [part.id],
        css: part.css,
        media: part.media
      }
    }
  }
}

function renderStyles (styles) {
  var css = ''
  for (var key in styles) {
    var style = styles[key]
    css += '<style data-vue-ssr-id="' + style.ids.join(' ') + '"' +
        (style.media ? ( ' media="' + style.media + '"' ) : '') + '>' +
        style.css + '</style>'
  }
  return css
}


/***/ }),

/***/ 76:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7584afea_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_loading_vue__ = __webpack_require__(83);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(80),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(9)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "6274971c"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7584afea_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_loading_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "apps/spa/loading/components/loading.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] loading.vue: functional components are not supported with templates, they should use render functions.")}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(75)
module.exports.__inject__ = function (context) {
  add("4a786a76", content, false, context)
};

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(74)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 82:
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
let loading = class loading extends __WEBPACK_IMPORTED_MODULE_0_vue___default.a {
    constructor() {
        super(...arguments);
        this.blockNum = 5;
        this.blocks = [];
        this.entry = () => {
            let e = (resolve, reject) => {
                let l = this.blockNum;
                let blocks = this.blocks;
                for (let i = 0; i <= l; i++) {
                    blocks.push({ class: "" });
                }
                resolve(true);
            };
            return new Promise(e);
        };
        this.animate = () => {
            let l = this.blockNum;
            let blocks = this.blocks;
            let i = 0;
            let loading = () => {
                blocks[i].class = (blocks[i].class === "pop") ? "" : "pop";
                i++;
                if (i === l) {
                    i = 0;
                }
                setTimeout(loading, 160);
            };
            loading();
        };
    }
    mounted() {
        this.entry().then(r => this.animate());
    }
};
loading = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default()({
        name: "loading",
        computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])([
            'domain', 'token'
        ]), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapState */])("loading", {
            loading: ({ loading }) => loading,
            overLay: ({ overLay }) => overLay
        })),
    })
], loading);
/* harmony default export */ __webpack_exports__["a"] = (loading);


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.loading
    ? _c("div", { staticClass: "loading" }, [
        _vm._ssrNode(
          _vm._ssrList(_vm.blocks, function(block) {
            return "<div" + _vm._ssrClass("block", block.class) + "></div>"
          })
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