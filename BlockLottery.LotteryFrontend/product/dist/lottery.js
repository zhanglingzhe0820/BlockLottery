/*! 版权所有，翻版必究 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(6);

__webpack_require__(8);

var _prizeList = __webpack_require__(9);

var BACKEND_URL = "http://localhost:8888/";
var ROTATE_TIME = 3000;
var BASE_HEIGHT = 1080;
var ROW_COUNT = 7;
var COLUMN_COUNT = 17;

/**
 * 高亮矩阵
 */
var HIGHLIGHT_CELL = ['1-1', '1-2', '1-3', '2-3', '3-1', '3-2', '3-3', '4-1', '5-1', '5-2', '5-3', '1-5', '1-6', '1-7', '2-5', '2-7', '3-5', '3-7', '4-5', '4-7', '5-5', '5-6', '5-7', '1-10', '2-9', '2-10', '3-10', '4-10', '5-9', '5-10', '5-11', '1-13', '1-14', '1-15', '2-13', '2-15', '3-13', '3-14', '3-15', '4-15', '5-13', '5-14', '5-15'];

var TOTAL_CARDS = void 0,
    btns = {
    enter: document.querySelector('#enter'),
    lotteryBar: document.querySelector('#lotteryBar')
},
    prizes = void 0,
    EACH_COUNT = void 0,
    COMPANY = void 0,

// 当前的比例
Resolution = 1;

var camera = void 0,
    scene = void 0,
    renderer = void 0,
    controls = void 0,
    threeDCards = [],
    targets = {
    table: [],
    sphere: []
};

var selectedCardIndex = [],
    rotate = false,
    basicData = {
    prizes: [], //奖品信息
    users: [], //所有人员
    luckyUsers: {}, //已中奖人员
    leftUsers: [] //未中奖人员
},
    interval = void 0,

// 当前抽的奖项，从五等奖开始抽
currentPrizeIndex = void 0,
    currentPrize = void 0,

// 正在抽奖
isLotting = false,
    currentLuckys = [];

initAll();

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return 17;
}

/**
 * 初始化所有DOM
 */
function initAll() {
    var eventId = getQueryVariable("eventId");
    window.AJAX({
        url: BACKEND_URL + 'event/' + eventId,
        success: function success(data) {
            var prizes = [{
                type: '一等奖',
                count: 100,
                title: '特别奖',
                img: '../img/huawei.png'
            }];
            var eachCount = [0];
            for (var i = 0; i < data.rewardItemList.length; i++) {
                var rewardItem = data.rewardItemList[i];
                var prize = {
                    type: rewardItem.level,
                    count: rewardItem.num,
                    title: rewardItem.name,
                    img: '../img/huawei.png'
                };
                prizes = prizes.concat(prize);
                eachCount = eachCount.concat(rewardItem.count);
            }
            // 获取基础数据
            EACH_COUNT = eachCount;
            COMPANY = data.name;
            basicData.prizes = prizes;
            (0, _prizeList.setPrizes)(prizes);

            TOTAL_CARDS = ROW_COUNT * COLUMN_COUNT;

            var users = [];
            var leftUsers = [];
            var luckyUsers = {};
            for (var _i = 0; _i < data.peopleItems.length; _i++) {
                var peopleItem = data.peopleItems[_i];
                var user = new Array([peopleItem.code, peopleItem.name, peopleItem.phone.substr(peopleItem.phone.length - 6)]);
                users = users.concat(user);
                if (peopleItem.status.indexOf('待开奖') < 0 && peopleItem.status.indexOf('未中奖') < 0) {
                    var luckyUserTuple = [];
                    if (peopleItem.status in luckyUsers) {
                        luckyUserTuple = luckyUsers[peopleItem.status];
                    }
                    luckyUserTuple = luckyUserTuple.concat(user);
                    luckyUsers[peopleItem.status] = luckyUserTuple;
                } else {
                    leftUsers = leftUsers.concat(user);
                }
            }

            // 读取当前已设置的抽奖结果
            basicData.users = users;
            basicData.leftUsers = leftUsers;
            basicData.luckyUsers = luckyUsers;

            var prizeIndex = basicData.prizes.length - 1;
            for (; prizeIndex > -1; prizeIndex--) {
                if (luckyUsers[prizeIndex] && luckyUsers[prizeIndex].length >= basicData.prizes[prizeIndex].count) {
                    continue;
                }
                currentPrizeIndex = prizeIndex;
                currentPrize = basicData.prizes[currentPrizeIndex];
                break;
            }

            (0, _prizeList.showPrizeList)(currentPrizeIndex);
            var curLucks = basicData.luckyUsers[currentPrize.type];
            (0, _prizeList.setPrizeData)(currentPrizeIndex, curLucks ? curLucks.length : 0, true);

            initCards();
            // startMaoPao();
            animate();
            shineCard();
        }
    });
}

function initCards() {
    var member = basicData.users,
        showCards = [],
        length = member.length;

    var isBold = false,
        showTable = basicData.leftUsers.length === basicData.users.length,
        index = 0,
        totalMember = member.length,
        position = {
        x: (140 * COLUMN_COUNT - 20) / 2,
        y: (180 * ROW_COUNT - 20) / 2
    };

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    for (var _i2 = 0; _i2 < ROW_COUNT; _i2++) {
        for (var j = 0; j < COLUMN_COUNT; j++) {
            isBold = HIGHLIGHT_CELL.includes(_i2 + '-' + j);
            var element = createCard(member[index % length], isBold, index, showTable);

            var object = new THREE.CSS3DObject(element);
            object.position.x = Math.random() * 4000 - 2000;
            object.position.y = Math.random() * 4000 - 2000;
            object.position.z = Math.random() * 4000 - 2000;
            scene.add(object);
            threeDCards.push(object);
            //

            var object = new THREE.Object3D();
            object.position.x = j * 140 - position.x;
            object.position.y = -(_i2 * 180) + position.y;
            targets.table.push(object);
            index++;
        }
    }

    // sphere

    var vector = new THREE.Vector3();

    for (var i = 0, l = threeDCards.length; i < l; i++) {
        var phi = Math.acos(-1 + 2 * i / l);
        var theta = Math.sqrt(l * Math.PI) * phi;
        var object = new THREE.Object3D();
        object.position.setFromSphericalCoords(800 * Resolution, phi, theta);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        targets.sphere.push(object);
    }

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    //

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    bindEvent();

    if (showTable) {
        switchScreen('enter');
    } else {
        switchScreen('lottery');
    }
}

function setLotteryStatus() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    isLotting = status;
}

/**
 * 事件绑定
 */
function bindEvent() {
    document.querySelector('#menu').addEventListener('click', function (e) {
        e.stopPropagation();
        // 如果正在抽奖，则禁止一切操作
        if (isLotting) {
            (0, _prizeList.addQipao)('抽慢一点点～～');
            return false;
        }

        var target = e.target.id;
        switch (target) {
            // 显示Tenda墙
            case 'welcome':
                switchScreen('enter');
                rotate = false;
                break;
            // 进入抽奖
            case 'enter':
                removeHighlight();
                (0, _prizeList.addQipao)('\u9A6C\u4E0A\u62BD\u53D6[' + currentPrize.title + '],\u4E0D\u8981\u8D70\u5F00\u3002');
                // rotate = !rotate;
                rotate = true;
                switchScreen('lottery');
                break;
            // 重置
            case 'reset':
                var doREset = window.confirm('是否确认重置数据，重置后，当前已抽的奖项全部清空？');
                if (!doREset) {
                    return;
                }
                (0, _prizeList.addQipao)('重置所有数据，重新抽奖');
                addHighlight();
                resetCard();
                // 重置所有数据
                currentLuckys = [];
                basicData.leftUsers = Object.assign([], basicData.users);
                basicData.luckyUsers = {};
                currentPrizeIndex = basicData.prizes.length - 1;
                currentPrize = basicData.prizes[currentPrizeIndex];

                (0, _prizeList.resetPrize)(currentPrizeIndex);
                reset();
                switchScreen('enter');
                break;
            // 抽奖
            case 'lottery':
                setLotteryStatus(true);
                // 每次抽奖前先保存上一次的抽奖数据
                saveData();
                //更新剩余抽奖数目的数据显示
                changePrize();
                resetCard().then(function (res) {
                    // 抽奖
                    lottery();
                });
                (0, _prizeList.addQipao)('\u6B63\u5728\u62BD\u53D6[' + currentPrize.title + '],\u8C03\u6574\u597D\u59FF\u52BF');
                break;
            // 重新抽奖
            case 'reLottery':
                if (currentLuckys.length === 0) {
                    (0, _prizeList.addQipao)('\u5F53\u524D\u8FD8\u6CA1\u6709\u62BD\u5956\uFF0C\u65E0\u6CD5\u91CD\u65B0\u62BD\u53D6\u5594~~');
                    return;
                }
                setErrorData(currentLuckys);
                (0, _prizeList.addQipao)('\u91CD\u65B0\u62BD\u53D6[' + currentPrize.title + '],\u505A\u597D\u51C6\u5907');
                setLotteryStatus(true);
                // 重新抽奖则直接进行抽取，不对上一次的抽奖数据进行保存
                // 抽奖
                resetCard().then(function (res) {
                    // 抽奖
                    lottery();
                });
                break;
            // 导出抽奖结果
            case 'save':
                saveData().then(function (res) {
                    resetCard().then(function (res) {
                        // 将之前的记录置空
                        currentLuckys = [];
                    });
                    exportData();
                    (0, _prizeList.addQipao)('\u6570\u636E\u5DF2\u4FDD\u5B58\u5230EXCEL\u4E2D\u3002');
                });
                break;
        }
    });

    window.addEventListener('resize', onWindowResize, false);
}

function switchScreen(type) {
    switch (type) {
        case 'enter':
            btns.enter.classList.remove('none');
            btns.lotteryBar.classList.add('none');
            transform(targets.table, 2000);
            break;
        default:
            btns.enter.classList.add('none');
            btns.lotteryBar.classList.remove('none');
            transform(targets.sphere, 2000);
            break;
    }
}

/**
 * 创建元素
 */
function createElement(css, text) {
    var dom = document.createElement('div');
    dom.className = css || '';
    dom.innerHTML = text || '';
    return dom;
}

/**
 * 创建名牌
 */
function createCard(user, isBold, id, showTable) {
    var element = createElement();
    element.id = 'card-' + id;

    if (isBold) {
        element.className = 'element lightitem';
        if (showTable) {
            element.classList.add('highlight');
        }
    } else {
        element.className = 'element';
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.7 + 0.25) + ')';
    }
    //添加公司标识
    element.appendChild(createElement('company', COMPANY));

    element.appendChild(createElement('name', user[1]));

    element.appendChild(createElement('details', user[0] + '<br/>' + user[2]));
    return element;
}

function removeHighlight() {
    document.querySelectorAll('.highlight').forEach(function (node) {
        node.classList.remove('highlight');
    });
}

function addHighlight() {
    document.querySelectorAll('.lightitem').forEach(function (node) {
        node.classList.add('highlight');
    });
}

/**
 * 渲染地球等
 */
function transform(targets, duration) {
    // TWEEN.removeAll();
    for (var i = 0; i < threeDCards.length; i++) {
        var object = threeDCards[i];
        var target = targets[i];

        new TWEEN.Tween(object.position).to({
            x: target.position.x,
            y: target.position.y,
            z: target.position.z
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(object.rotation).to({
            x: target.rotation.x,
            y: target.rotation.y,
            z: target.rotation.z
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();

        // new TWEEN.Tween(object.rotation)
        //     .to({
        //         x: target.rotation.x,
        //         y: target.rotation.y,
        //         z: target.rotation.z
        //     }, Math.random() * duration + duration)
        //     .easing(TWEEN.Easing.Exponential.InOut)
        //     .start();
    }

    new TWEEN.Tween(this).to({}, duration * 2).onUpdate(render).start();
}

function rotateBall() {
    return new Promise(function (resolve, reject) {
        scene.rotation.y = 0;
        new TWEEN.Tween(scene.rotation).to({
            y: Math.PI * 8
        }, ROTATE_TIME).onUpdate(render).easing(TWEEN.Easing.Exponential.InOut).start().onComplete(function () {
            resolve();
        });
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    // 让场景通过x轴或者y轴旋转
    // rotate && (scene.rotation.y += 0.088);

    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();

    // 渲染循环
    // render();
}

function render() {
    renderer.render(scene, camera);
}

function selectCard() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 600;

    rotate = false;
    var width = 140,
        tag = -(currentLuckys.length - 1) / 2;

    var text = currentLuckys.map(function (item) {
        return item[1];
    });
    (0, _prizeList.addQipao)('\u606D\u559C' + text.join('、') + '\u83B7\u5F97' + currentPrize.title + ', 2019\u5E74\u5FC5\u5B9A\u65FA\u65FA\u65FA\u3002');

    selectedCardIndex.forEach(function (cardIndex, index) {
        changeCard(cardIndex, currentLuckys[index]);
        var object = threeDCards[cardIndex];
        new TWEEN.Tween(object.position).to({
            x: tag * width * Resolution,
            y: 50 * Resolution,
            z: 2200
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(object.rotation).to({
            x: 0,
            y: 0,
            z: 0
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();

        object.element.classList.add('prize');
        tag++;
    });

    new TWEEN.Tween(this).to({}, duration * 2).onUpdate(render).start().onComplete(function () {
        // 动画结束后可以操作
        setLotteryStatus();
    });
}

/**
 * 重置抽奖牌内容
 */
function resetCard() {
    var _this = this;

    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

    if (currentLuckys.length === 0) {
        return Promise.resolve();
    }

    selectedCardIndex.forEach(function (index) {
        var object = threeDCards[index],
            target = targets.sphere[index];

        new TWEEN.Tween(object.position).to({
            x: target.position.x,
            y: target.position.y,
            z: target.position.z
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(object.rotation).to({
            x: target.rotation.x,
            y: target.rotation.y,
            z: target.rotation.z
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();
    });

    return new Promise(function (resolve, reject) {
        new TWEEN.Tween(_this).to({}, duration * 2).onUpdate(render).start().onComplete(function () {
            selectedCardIndex.forEach(function (index) {
                var object = threeDCards[index];
                object.element.classList.remove('prize');
            });
            resolve();
        });
    });
}

/**
 * 抽奖
 */
function lottery() {
    rotateBall().then(function () {
        // 将之前的记录置空
        currentLuckys = [];
        selectedCardIndex = [];
        // 当前同时抽取的数目,当前奖品抽完还可以继续抽，但是不记录数据
        var perCount = EACH_COUNT[currentPrizeIndex],
            leftCount = basicData.leftUsers.length;

        if (leftCount === 0) {
            (0, _prizeList.addQipao)('人员已抽完，现在重新设置所有人员可以进行二次抽奖！');
            basicData.leftUsers = basicData.users;
            leftCount = basicData.leftUsers.length;
        }

        for (var i = 0; i < perCount; i++) {
            var luckyId = random(leftCount);
            currentLuckys.push(basicData.leftUsers.splice(luckyId, 1)[0]);
            leftCount--;

            var cardIndex = random(TOTAL_CARDS);
            while (selectedCardIndex.includes(cardIndex)) {
                cardIndex = random(TOTAL_CARDS);
            }
            selectedCardIndex.push(cardIndex);
        }

        // console.log(currentLuckys);
        selectCard();
    });
}

/**
 * 保存上一次的抽奖结果
 */
function saveData() {
    if (!currentPrize) {
        //若奖品抽完，则不再记录数据，但是还是可以进行抽奖
        return;
    }

    var type = currentPrize.type,
        curLucky = basicData.luckyUsers[type] || [];

    curLucky = curLucky.concat(currentLuckys);

    basicData.luckyUsers[type] = curLucky;

    if (currentPrize.count <= curLucky.length) {
        currentPrizeIndex--;
        if (currentPrizeIndex <= -1) {
            currentPrizeIndex = 0;
        }
        currentPrize = basicData.prizes[currentPrizeIndex];
    }

    if (currentLuckys.length > 0) {
        // todo by xc 添加数据保存机制，以免服务器挂掉数据丢失
        return setData(type, currentLuckys);
    }
    return Promise.resolve();
}

function changePrize() {
    var luckys = basicData.luckyUsers[currentPrize.type];
    var luckyCount = luckys.length + EACH_COUNT[currentPrizeIndex];
    console.log(currentPrizeIndex);
    console.log(EACH_COUNT);
    // 修改左侧prize的数目和百分比
    (0, _prizeList.setPrizeData)(currentPrizeIndex, luckyCount);
}

/**
 * 随机抽奖
 */
function random(num) {
    // Math.floor取到0-num-1之间数字的概率是相等的
    return Math.floor(Math.random() * num);
}

/**
 * 切换名牌人员信息
 */
function changeCard(cardIndex, user) {
    var card = threeDCards[cardIndex].element;

    card.innerHTML = '<div class="company">' + COMPANY + '</div><div class="name">' + user[1] + '</div><div class="details">' + user[0] + '<br/>' + (user[2] || 'PSST') + '</div>';
}

/**
 * 切换名牌背景
 */
function shine(cardIndex, color) {
    var card = threeDCards[cardIndex].element;
    card.style.backgroundColor = color || 'rgba(0,127,127,' + (Math.random() * 0.7 + 0.25) + ')';
}

/**
 * 随机切换背景和人员信息
 */
function shineCard() {
    var maxCard = 15,
        maxUser = void 0;
    var shineCard = random(maxCard);

    setInterval(function () {
        // 正在抽奖停止闪烁
        if (isLotting) {
            return;
        }
        maxUser = basicData.leftUsers.length;
        for (var i = 0; i < shineCard; i++) {
            var index = random(maxUser),
                cardIndex = random(TOTAL_CARDS);
            // 当前显示的已抽中名单不进行随机切换
            if (selectedCardIndex.includes(cardIndex)) {
                continue;
            }
            shine(cardIndex);
            changeCard(cardIndex, basicData.leftUsers[index]);
        }
    }, 500);
}

function setData(type, data) {
    return new Promise(function (resolve, reject) {
        window.AJAX({
            url: '/saveData',
            data: {
                type: type,
                data: data
            },
            success: function success() {
                resolve();
            },
            error: function error() {
                reject();
            }
        });
    });
}

function setErrorData(data) {
    return new Promise(function (resolve, reject) {
        window.AJAX({
            url: '/errorData',
            data: {
                data: data
            },
            success: function success() {
                resolve();
            },
            error: function error() {
                reject();
            }
        });
    });
}

function exportData() {
    window.AJAX({
        url: '/export',
        success: function success(data) {
            if (data.type === 'success') {
                location.href = data.url;
            }
        }
    });
}

function reset() {
    window.AJAX({
        url: '/reset',
        success: function success(data) {
            console.log('重置成功');
        }
    });
}

var onload = window.onload;

window.onload = function () {
    onload && onload();

    var music = document.querySelector('#music');

    var rotated = 0,
        stopAnimate = false,
        musicBox = document.querySelector('#musicBox');

    function animate() {
        requestAnimationFrame(function () {
            if (stopAnimate) {
                return;
            }
            rotated = rotated % 360;
            musicBox.style.transform = 'rotate(' + rotated + 'deg)';
            rotated += 1;
            animate();
        });
    }

    musicBox.addEventListener('click', function (e) {
        if (music.paused) {
            music.play().then(function () {
                stopAnimate = false;
                animate();
            }, function () {
                (0, _prizeList.addQipao)('背景音乐自动播放失败，请手动播放！');
            });
        } else {
            music.pause();
            stopAnimate = true;
        }
    }, false);

    setTimeout(function () {
        musicBox.click();
    }, 1000);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(4);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./index.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./index.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n    height: 100%;\n}\n\nbody {\n    background: linear-gradient(to bottom, #131313 0%, #02101c 100%);\n    margin: 0;\n    font-family: Helvetica, sans-serif;\n    ;\n    overflow: hidden;\n}\n\na {\n    color: #ffffff;\n}\n\n.none {\n    display: none;\n}\n\n\n#container {\n    z-index: 3;\n    position: relative;\n    margin: 0 15vh;\n}\n\n#menu {\n    z-index: 4;\n    margin-left: 15vh;\n}\n\n.canvas-box {\n    position: fixed;\n    left: 0;\n    top: 0;\n    z-index: -1;\n}\n\n#info {\n    position: absolute;\n    width: 100%;\n    color: #ffffff;\n    padding: 5px;\n    font-family: Monospace;\n    font-size: 13px;\n    font-weight: bold;\n    text-align: center;\n    z-index: 1;\n}\n\n#menu {\n    position: absolute;\n    bottom: 2vh;\n    width: 100%;\n    text-align: center;\n}\n\n.element {\n    width: 12vh;\n    height: 16vh;\n    box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);\n    border: 1px solid rgba(127, 255, 255, 0.25);\n    text-align: center;\n    cursor: default;\n    transition: background-color .3s ease-in;\n}\n\n.element:hover {\n    box-shadow: 0 0 12px rgba(0, 255, 255, 0.75);\n    border: 1px solid rgba(127, 255, 255, 0.75);\n}\n\n.element .company {\n    position: absolute;\n    top: 1.2vh;\n    right: 1.2vh;\n    font-size: 2vh;\n    color: rgba(127, 255, 255, 0.75);\n}\n\n.element .name {\n    position: absolute;\n    top: 4.6vh;\n    left: 0;\n    right: 0;\n    font-size: 3.2vh;\n    font-weight: bold;\n    color: rgba(255, 255, 255, 0.75);\n    text-shadow: 0 0 1vh rgba(0, 255, 255, 0.95);\n}\n\n.element .details {\n    position: absolute;\n    bottom: 1.2vh;\n    left: 0;\n    right: 0;\n    font-size: 1.6vh;\n    color: rgba(127, 255, 255, 0.75);\n}\n\nbutton {\n    color: rgba(127, 255, 255, 0.75);\n    background: transparent;\n    outline: 1px solid rgba(127, 255, 255, 0.75);\n    border: 0;\n    padding: 1.6vh 4vh;\n    margin: 0 4.6vh;\n    font-size: 2vh;\n    font-weight: bold;\n    cursor: pointer;\n}\n\nbutton:hover {\n    background-color: rgba(0, 255, 255, 0.5);\n}\n\nbutton:active {\n    color: #000000;\n    background-color: rgba(0, 255, 255, 0.75);\n}\n\n.highlight {\n    background-color: rgba(253, 105, 0, 0.95) !important;\n    box-shadow: 0 0 12px rgba(253, 105, 0, 0.95);\n    border: 1px solid rgba(253, 105, 0, 0.25);\n}\n\n.highlight.element .name {\n    text-shadow: 0 0 16px rgba(255, 255, 255, 0.95);\n}\n\n\n.prize.element .name {\n    text-shadow: none;\n}\n\n.prize.element {\n    transition: background-color 1.5s ease-in .3s;\n    background-color: rgba(253, 105, 0, 0.85) !important;\n    box-shadow: 0 0 12px rgba(253, 105, 0, 0.95);\n}\n\n.prize .company,\n.prize .details,\n.prize .name,\n.highlight .company,\n.highlight .name,\n.highlight .details {\n    color: rgba(255, 255, 255, 0.85);\n}\n\n.dan-mu {\n    visibility: hidden;\n    position: fixed;\n    z-index: -1;\n    font-size: 12px;\n    top: 1vh;\n    left: 0;\n    padding: 0 1.2vh;\n    height: 2.2vh;\n    line-height: 2.2vh;\n    border-radius: 1vh;\n    box-sizing: border-box;\n    background-color: rgba(0, 127, 127, 0.37);\n    box-shadow: 0 0 4px rgba(0, 255, 255, 0.5);\n    border: 1px solid rgba(127, 255, 255, 0.25);\n    color: rgba(127, 255, 255, 0.75);\n}\n\n.dan-mu.active {\n    visibility: visible;\n}\n\n#prizeBar {\n    position: fixed;\n    left: 0;\n    padding-left: 1.2vh;\n    top: 1.2vh;\n    z-index: 2;\n}\n\n.prize-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.prize-item {\n    padding: 9px;\n    margin: 6px 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 4px;\n    flex-wrap: nowrap;\n    background-color: rgba(0, 127, 127, 0.37);\n    border: 1px solid rgba(127, 255, 255, 0.25);\n    color: rgba(127, 255, 255, 0.75);\n    width: 30vh;\n    height: 10vh;\n    box-sizing: border-box;\n    transition: -webkit-transform 1s ease-in;\n    transition: transform 1s ease-in;\n    transition: transform 1s ease-in, -webkit-transform 1s ease-in;\n}\n\n.prize-item .prize-img {\n    width: 8vh;\n    height: 8vh;\n    margin-right: 1.2vh;\n    border-radius: 50%;\n    background-color: #fff;\n    text-shadow: 0 0 1vh rgba(0, 255, 255, 0.95);\n    overflow: hidden;\n}\n\n.prize-img img {\n    width: 90%;\n    height: 90%;\n    position: relative;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n}\n\n.prize-text {\n    flex: 1;\n}\n\n.prize-title {\n    margin: 4px 0;\n    font-size: 1.8vh;\n}\n\n.prize-count {\n    padding: 4px 0;\n    position: relative;\n}\n\n.prize-count .progress {\n    height: 1.8vh;\n    background: rgba(0, 0, 0, .5);\n    padding: 1px;\n    overflow: visible;\n    border-radius: 1vh;\n}\n\n.progress .progress-bar {\n    border-radius: 1.8vh;\n    position: relative;\n    -webkit-animation: animate-positive 2s;\n            animation: animate-positive 2s;\n    background-color: #d9534f;\n    height: 1.8vh;\n    transition: width .6s ease;\n}\n\n.progress-bar.active {\n    animation: reverse progress-bar-stripes 0.40s linear infinite, animate-positive 2s;\n}\n\n\n.progress-bar-striped {\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n    background-size: 8px 8px;\n}\n\n@-webkit-keyframes animate-positive {\n    0% {\n        width: 0;\n    }\n}\n\n@keyframes animate-positive {\n    0% {\n        width: 0;\n    }\n}\n\n\n@-webkit-keyframes progress-bar-stripes {\n    from {\n        background-position: 8px 0\n    }\n\n    to {\n        background-position: 0 0\n    }\n}\n\n@keyframes progress-bar-stripes {\n    from {\n        background-position: 8px 0\n    }\n\n    to {\n        background-position: 0 0\n    }\n}\n\n.prize-count-left {\n    position: absolute;\n    color: #fff;\n    right: 9px;\n    font-size: 1.8vh;\n    line-height: 1.6vh;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n}\n\n.shine {\n    box-shadow: 0 0 15px 0 rgba(0, 255, 255, .5);\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n    -webkit-transform-origin: left center;\n            transform-origin: left center;\n    position: relative;\n}\n\n.shine:before,\n.shine:after {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    box-sizing: border-box;\n    content: '';\n    z-index: 1;\n    margin: 0;\n    box-shadow: inset 0 0 0 1px;\n    border-radius: 4px;\n    -webkit-animation: clipMe 8s linear infinite;\n            animation: clipMe 8s linear infinite;\n}\n\n.shine:before {\n    -webkit-animation-delay: -4s;\n            animation-delay: -4s;\n}\n\n.done {\n    position: relative;\n}\n\n.done:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, .5);\n    cursor: not-allowed;\n}\n\n@-webkit-keyframes clipMe {\n\n    0%,\n    100% {\n        clip: rect(0, 30vh, 1px, 0);\n    }\n\n    25% {\n        clip: rect(0, 1px, 10vh, 0);\n    }\n\n    50% {\n        clip: rect(9.9vh, 30vh, 10vh, 0);\n    }\n\n    75% {\n        clip: rect(0, 30vh, 10vh, 29.9vh);\n    }\n}\n\n@keyframes clipMe {\n\n    0%,\n    100% {\n        clip: rect(0, 30vh, 1px, 0);\n    }\n\n    25% {\n        clip: rect(0, 1px, 10vh, 0);\n    }\n\n    50% {\n        clip: rect(9.9vh, 30vh, 10vh, 0);\n    }\n\n    75% {\n        clip: rect(0, 30vh, 10vh, 29.9vh);\n    }\n}\n\n.shine.prize-item {\n    /* width: 24vh; */\n    margin: 1.8vh 0;\n}\n\n.prize-mess {\n    color: #fff;\n    line-height: 5vh;\n    font-size: 1.6vh;\n    margin: 2.4vh 0;\n}\n\n.prize-shine {\n    font-size: 5vh;\n    font-weight: bold;\n    color: #db5c58;\n    vertical-align: middle;\n    padding: 0 6px;\n}\n\n.qipao-container {\n    position: fixed;\n    right: 0;\n    top: 10vh;\n    bottom: 1vh;\n    width: 24vh;\n    z-index: 2;\n}\n\n.qipao {\n    width: 100%;\n    padding: 1.8vh 1.4vh;\n    line-height: 1.414;\n    margin: 4px 0;\n    box-sizing: border-box;\n    font-size: 14px;\n    background-color: rgba(127, 255, 255, 0.25);\n    color: rgba(127, 255, 255, 0.75);\n}\n\n.music {\n    position: fixed;\n    top: 3vh;\n    right: 4vh;\n    z-index: 5;\n}\n\n.music-item {\n    display: block !important;\n    opacity: 0;\n}\n\n.music-box {\n    width: 5vh;\n    height: 5vh;\n    border-radius: 50%;\n    text-align: center;\n    line-height: 5vh;\n    font-size: 1.4vh;\n    color: #fff;\n    cursor: pointer;\n    background-color: rgba(253, 105, 0, 0.9);\n    border: 1px solid rgba(255, 255, 255, .5);\n}\n\n.rotate-active {\n    -webkit-animation: rotate 4s linear infinite;\n            animation: rotate 4s linear infinite;\n}\n\n@-webkit-keyframes rotate {\n    from {\n        -webkit-transform: rotate(0);\n                transform: rotate(0);\n    }\n\n    to {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg);\n    }\n}\n\n@keyframes rotate {\n    from {\n        -webkit-transform: rotate(0);\n                transform: rotate(0);\n    }\n\n    to {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg);\n    }\n}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./animate.min.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./animate.min.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n\n/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.5.2\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2017 Daniel Eden\n */\n\n.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated.infinite{-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.animated.hinge{-webkit-animation-duration:2s;animation-duration:2s}.animated.bounceIn,.animated.bounceOut,.animated.flipOutX,.animated.flipOutY{-webkit-animation-duration:.75s;animation-duration:.75s}@-webkit-keyframes bounce{0%,20%,53%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translateZ(0);transform:translateZ(0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}@keyframes bounce{0%,20%,53%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translateZ(0);transform:translateZ(0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}.bounce{-webkit-animation-name:bounce;animation-name:bounce;-webkit-transform-origin:center bottom;transform-origin:center bottom}@-webkit-keyframes flash{0%,50%,to{opacity:1}25%,75%{opacity:0}}@keyframes flash{0%,50%,to{opacity:1}25%,75%{opacity:0}}.flash{-webkit-animation-name:flash;animation-name:flash}@-webkit-keyframes pulse{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes pulse{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.pulse{-webkit-animation-name:pulse;animation-name:pulse}@-webkit-keyframes rubberBand{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes rubberBand{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.rubberBand{-webkit-animation-name:rubberBand;animation-name:rubberBand}@-webkit-keyframes shake{0%,to{-webkit-transform:translateZ(0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@keyframes shake{0%,to{-webkit-transform:translateZ(0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}.shake{-webkit-animation-name:shake;animation-name:shake}@-webkit-keyframes headShake{0%{-webkit-transform:translateX(0);transform:translateX(0)}6.5%{-webkit-transform:translateX(-6px) rotateY(-9deg);transform:translateX(-6px) rotateY(-9deg)}18.5%{-webkit-transform:translateX(5px) rotateY(7deg);transform:translateX(5px) rotateY(7deg)}31.5%{-webkit-transform:translateX(-3px) rotateY(-5deg);transform:translateX(-3px) rotateY(-5deg)}43.5%{-webkit-transform:translateX(2px) rotateY(3deg);transform:translateX(2px) rotateY(3deg)}50%{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes headShake{0%{-webkit-transform:translateX(0);transform:translateX(0)}6.5%{-webkit-transform:translateX(-6px) rotateY(-9deg);transform:translateX(-6px) rotateY(-9deg)}18.5%{-webkit-transform:translateX(5px) rotateY(7deg);transform:translateX(5px) rotateY(7deg)}31.5%{-webkit-transform:translateX(-3px) rotateY(-5deg);transform:translateX(-3px) rotateY(-5deg)}43.5%{-webkit-transform:translateX(2px) rotateY(3deg);transform:translateX(2px) rotateY(3deg)}50%{-webkit-transform:translateX(0);transform:translateX(0)}}.headShake{-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-name:headShake;animation-name:headShake}@-webkit-keyframes swing{20%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}40%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}60%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}80%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes swing{20%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}40%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}60%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}80%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}.swing{-webkit-transform-origin:top center;transform-origin:top center;-webkit-animation-name:swing;animation-name:swing}@-webkit-keyframes tada{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}10%,20%{-webkit-transform:scale3d(.9,.9,.9) rotate(-3deg);transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(3deg);transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(-3deg);transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes tada{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}10%,20%{-webkit-transform:scale3d(.9,.9,.9) rotate(-3deg);transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(3deg);transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(-3deg);transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.tada{-webkit-animation-name:tada;animation-name:tada}@-webkit-keyframes wobble{0%{-webkit-transform:none;transform:none}15%{-webkit-transform:translate3d(-25%,0,0) rotate(-5deg);transform:translate3d(-25%,0,0) rotate(-5deg)}30%{-webkit-transform:translate3d(20%,0,0) rotate(3deg);transform:translate3d(20%,0,0) rotate(3deg)}45%{-webkit-transform:translate3d(-15%,0,0) rotate(-3deg);transform:translate3d(-15%,0,0) rotate(-3deg)}60%{-webkit-transform:translate3d(10%,0,0) rotate(2deg);transform:translate3d(10%,0,0) rotate(2deg)}75%{-webkit-transform:translate3d(-5%,0,0) rotate(-1deg);transform:translate3d(-5%,0,0) rotate(-1deg)}to{-webkit-transform:none;transform:none}}@keyframes wobble{0%{-webkit-transform:none;transform:none}15%{-webkit-transform:translate3d(-25%,0,0) rotate(-5deg);transform:translate3d(-25%,0,0) rotate(-5deg)}30%{-webkit-transform:translate3d(20%,0,0) rotate(3deg);transform:translate3d(20%,0,0) rotate(3deg)}45%{-webkit-transform:translate3d(-15%,0,0) rotate(-3deg);transform:translate3d(-15%,0,0) rotate(-3deg)}60%{-webkit-transform:translate3d(10%,0,0) rotate(2deg);transform:translate3d(10%,0,0) rotate(2deg)}75%{-webkit-transform:translate3d(-5%,0,0) rotate(-1deg);transform:translate3d(-5%,0,0) rotate(-1deg)}to{-webkit-transform:none;transform:none}}.wobble{-webkit-animation-name:wobble;animation-name:wobble}@-webkit-keyframes jello{0%,11.1%,to{-webkit-transform:none;transform:none}22.2%{-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4%{-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{-webkit-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skewX(-.78125deg) skewY(-.78125deg)}77.7%{-webkit-transform:skewX(.390625deg) skewY(.390625deg);transform:skewX(.390625deg) skewY(.390625deg)}88.8%{-webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skewX(-.1953125deg) skewY(-.1953125deg)}}@keyframes jello{0%,11.1%,to{-webkit-transform:none;transform:none}22.2%{-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4%{-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{-webkit-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skewX(-.78125deg) skewY(-.78125deg)}77.7%{-webkit-transform:skewX(.390625deg) skewY(.390625deg);transform:skewX(.390625deg) skewY(.390625deg)}88.8%{-webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skewX(-.1953125deg) skewY(-.1953125deg)}}.jello{-webkit-animation-name:jello;animation-name:jello;-webkit-transform-origin:center;transform-origin:center}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}.bounceIn{-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}@keyframes bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}.bounceInDown{-webkit-animation-name:bounceInDown;animation-name:bounceInDown}@-webkit-keyframes bounceInLeft{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:none;transform:none}}@keyframes bounceInLeft{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:none;transform:none}}.bounceInLeft{-webkit-animation-name:bounceInLeft;animation-name:bounceInLeft}@-webkit-keyframes bounceInRight{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:none;transform:none}}@keyframes bounceInRight{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:none;transform:none}}.bounceInRight{-webkit-animation-name:bounceInRight;animation-name:bounceInRight}@-webkit-keyframes bounceInUp{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes bounceInUp{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.bounceInUp{-webkit-animation-name:bounceInUp;animation-name:bounceInUp}@-webkit-keyframes bounceOut{20%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}}@keyframes bounceOut{20%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}}.bounceOut{-webkit-animation-name:bounceOut;animation-name:bounceOut}@-webkit-keyframes bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.bounceOutDown{-webkit-animation-name:bounceOutDown;animation-name:bounceOutDown}@-webkit-keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.bounceOutLeft{-webkit-animation-name:bounceOutLeft;animation-name:bounceOutLeft}@-webkit-keyframes bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0);transform:translate3d(-20px,0,0)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}@keyframes bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0);transform:translate3d(-20px,0,0)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}.bounceOutRight{-webkit-animation-name:bounceOutRight;animation-name:bounceOutRight}@-webkit-keyframes bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.bounceOutUp{-webkit-animation-name:bounceOutUp;animation-name:bounceOutUp}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}@-webkit-keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInDown{-webkit-animation-name:fadeInDown;animation-name:fadeInDown}@-webkit-keyframes fadeInDownBig{0%{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInDownBig{0%{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInDownBig{-webkit-animation-name:fadeInDownBig;animation-name:fadeInDownBig}@-webkit-keyframes fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInLeft{-webkit-animation-name:fadeInLeft;animation-name:fadeInLeft}@-webkit-keyframes fadeInLeftBig{0%{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInLeftBig{0%{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInLeftBig{-webkit-animation-name:fadeInLeftBig;animation-name:fadeInLeftBig}@-webkit-keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInRight{-webkit-animation-name:fadeInRight;animation-name:fadeInRight}@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInRightBig{-webkit-animation-name:fadeInRightBig;animation-name:fadeInRightBig}@-webkit-keyframes fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInUp{-webkit-animation-name:fadeInUp;animation-name:fadeInUp}@-webkit-keyframes fadeInUpBig{0%{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUpBig{0%{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInUpBig{-webkit-animation-name:fadeInUpBig;animation-name:fadeInUpBig}@-webkit-keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}@-webkit-keyframes fadeOutDown{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes fadeOutDown{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.fadeOutDown{-webkit-animation-name:fadeOutDown;animation-name:fadeOutDown}@-webkit-keyframes fadeOutDownBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes fadeOutDownBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.fadeOutDownBig{-webkit-animation-name:fadeOutDownBig;animation-name:fadeOutDownBig}@-webkit-keyframes fadeOutLeft{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes fadeOutLeft{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.fadeOutLeft{-webkit-animation-name:fadeOutLeft;animation-name:fadeOutLeft}@-webkit-keyframes fadeOutLeftBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes fadeOutLeftBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.fadeOutLeftBig{-webkit-animation-name:fadeOutLeftBig;animation-name:fadeOutLeftBig}@-webkit-keyframes fadeOutRight{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes fadeOutRight{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.fadeOutRight{-webkit-animation-name:fadeOutRight;animation-name:fadeOutRight}@-webkit-keyframes fadeOutRightBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}@keyframes fadeOutRightBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}.fadeOutRightBig{-webkit-animation-name:fadeOutRightBig;animation-name:fadeOutRightBig}@-webkit-keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.fadeOutUp{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}@-webkit-keyframes fadeOutUpBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes fadeOutUpBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.fadeOutUpBig{-webkit-animation-name:fadeOutUpBig;animation-name:fadeOutUpBig}@-webkit-keyframes flip{0%{-webkit-transform:perspective(400px) rotateY(-1turn);transform:perspective(400px) rotateY(-1turn);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}40%{-webkit-transform:perspective(400px) translateZ(150px) rotateY(-190deg);transform:perspective(400px) translateZ(150px) rotateY(-190deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}50%{-webkit-transform:perspective(400px) translateZ(150px) rotateY(-170deg);transform:perspective(400px) translateZ(150px) rotateY(-170deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}80%{-webkit-transform:perspective(400px) scale3d(.95,.95,.95);transform:perspective(400px) scale3d(.95,.95,.95);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}to{-webkit-transform:perspective(400px);transform:perspective(400px);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}@keyframes flip{0%{-webkit-transform:perspective(400px) rotateY(-1turn);transform:perspective(400px) rotateY(-1turn);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}40%{-webkit-transform:perspective(400px) translateZ(150px) rotateY(-190deg);transform:perspective(400px) translateZ(150px) rotateY(-190deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}50%{-webkit-transform:perspective(400px) translateZ(150px) rotateY(-170deg);transform:perspective(400px) translateZ(150px) rotateY(-170deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}80%{-webkit-transform:perspective(400px) scale3d(.95,.95,.95);transform:perspective(400px) scale3d(.95,.95,.95);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}to{-webkit-transform:perspective(400px);transform:perspective(400px);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}.animated.flip{-webkit-backface-visibility:visible;backface-visibility:visible;-webkit-animation-name:flip;animation-name:flip}@-webkit-keyframes flipInX{0%{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotateX(10deg);transform:perspective(400px) rotateX(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateX(-5deg);transform:perspective(400px) rotateX(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@keyframes flipInX{0%{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotateX(10deg);transform:perspective(400px) rotateX(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateX(-5deg);transform:perspective(400px) rotateX(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}.flipInX{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipInX;animation-name:flipInX}@-webkit-keyframes flipInY{0%{-webkit-transform:perspective(400px) rotateY(90deg);transform:perspective(400px) rotateY(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotateY(-20deg);transform:perspective(400px) rotateY(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotateY(10deg);transform:perspective(400px) rotateY(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateY(-5deg);transform:perspective(400px) rotateY(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@keyframes flipInY{0%{-webkit-transform:perspective(400px) rotateY(90deg);transform:perspective(400px) rotateY(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotateY(-20deg);transform:perspective(400px) rotateY(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotateY(10deg);transform:perspective(400px) rotateY(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateY(-5deg);transform:perspective(400px) rotateY(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}.flipInY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipInY;animation-name:flipInY}@-webkit-keyframes flipOutX{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg);opacity:1}to{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);opacity:0}}@keyframes flipOutX{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg);opacity:1}to{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);opacity:0}}.flipOutX{-webkit-animation-name:flipOutX;animation-name:flipOutX;-webkit-backface-visibility:visible!important;backface-visibility:visible!important}@-webkit-keyframes flipOutY{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotateY(-15deg);transform:perspective(400px) rotateY(-15deg);opacity:1}to{-webkit-transform:perspective(400px) rotateY(90deg);transform:perspective(400px) rotateY(90deg);opacity:0}}@keyframes flipOutY{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotateY(-15deg);transform:perspective(400px) rotateY(-15deg);opacity:1}to{-webkit-transform:perspective(400px) rotateY(90deg);transform:perspective(400px) rotateY(90deg);opacity:0}}.flipOutY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipOutY;animation-name:flipOutY}@-webkit-keyframes lightSpeedIn{0%{-webkit-transform:translate3d(100%,0,0) skewX(-30deg);transform:translate3d(100%,0,0) skewX(-30deg);opacity:0}60%{-webkit-transform:skewX(20deg);transform:skewX(20deg);opacity:1}80%{-webkit-transform:skewX(-5deg);transform:skewX(-5deg);opacity:1}to{-webkit-transform:none;transform:none;opacity:1}}@keyframes lightSpeedIn{0%{-webkit-transform:translate3d(100%,0,0) skewX(-30deg);transform:translate3d(100%,0,0) skewX(-30deg);opacity:0}60%{-webkit-transform:skewX(20deg);transform:skewX(20deg);opacity:1}80%{-webkit-transform:skewX(-5deg);transform:skewX(-5deg);opacity:1}to{-webkit-transform:none;transform:none;opacity:1}}.lightSpeedIn{-webkit-animation-name:lightSpeedIn;animation-name:lightSpeedIn;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes lightSpeedOut{0%{opacity:1}to{-webkit-transform:translate3d(100%,0,0) skewX(30deg);transform:translate3d(100%,0,0) skewX(30deg);opacity:0}}@keyframes lightSpeedOut{0%{opacity:1}to{-webkit-transform:translate3d(100%,0,0) skewX(30deg);transform:translate3d(100%,0,0) skewX(30deg);opacity:0}}.lightSpeedOut{-webkit-animation-name:lightSpeedOut;animation-name:lightSpeedOut;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}@-webkit-keyframes rotateIn{0%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(-200deg);transform:rotate(-200deg);opacity:0}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateIn{0%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(-200deg);transform:rotate(-200deg);opacity:0}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:none;transform:none;opacity:1}}.rotateIn{-webkit-animation-name:rotateIn;animation-name:rotateIn}@-webkit-keyframes rotateInDownLeft{0%{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateInDownLeft{0%{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:none;transform:none;opacity:1}}.rotateInDownLeft{-webkit-animation-name:rotateInDownLeft;animation-name:rotateInDownLeft}@-webkit-keyframes rotateInDownRight{0%{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateInDownRight{0%{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:none;transform:none;opacity:1}}.rotateInDownRight{-webkit-animation-name:rotateInDownRight;animation-name:rotateInDownRight}@-webkit-keyframes rotateInUpLeft{0%{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateInUpLeft{0%{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:none;transform:none;opacity:1}}.rotateInUpLeft{-webkit-animation-name:rotateInUpLeft;animation-name:rotateInUpLeft}@-webkit-keyframes rotateInUpRight{0%{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate(-90deg);transform:rotate(-90deg);opacity:0}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateInUpRight{0%{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate(-90deg);transform:rotate(-90deg);opacity:0}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:none;transform:none;opacity:1}}.rotateInUpRight{-webkit-animation-name:rotateInUpRight;animation-name:rotateInUpRight}@-webkit-keyframes rotateOut{0%{-webkit-transform-origin:center;transform-origin:center;opacity:1}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(200deg);transform:rotate(200deg);opacity:0}}@keyframes rotateOut{0%{-webkit-transform-origin:center;transform-origin:center;opacity:1}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(200deg);transform:rotate(200deg);opacity:0}}.rotateOut{-webkit-animation-name:rotateOut;animation-name:rotateOut}@-webkit-keyframes rotateOutDownLeft{0%{-webkit-transform-origin:left bottom;transform-origin:left bottom;opacity:1}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}}@keyframes rotateOutDownLeft{0%{-webkit-transform-origin:left bottom;transform-origin:left bottom;opacity:1}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}}.rotateOutDownLeft{-webkit-animation-name:rotateOutDownLeft;animation-name:rotateOutDownLeft}@-webkit-keyframes rotateOutDownRight{0%{-webkit-transform-origin:right bottom;transform-origin:right bottom;opacity:1}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}}@keyframes rotateOutDownRight{0%{-webkit-transform-origin:right bottom;transform-origin:right bottom;opacity:1}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}}.rotateOutDownRight{-webkit-animation-name:rotateOutDownRight;animation-name:rotateOutDownRight}@-webkit-keyframes rotateOutUpLeft{0%{-webkit-transform-origin:left bottom;transform-origin:left bottom;opacity:1}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}}@keyframes rotateOutUpLeft{0%{-webkit-transform-origin:left bottom;transform-origin:left bottom;opacity:1}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}}.rotateOutUpLeft{-webkit-animation-name:rotateOutUpLeft;animation-name:rotateOutUpLeft}@-webkit-keyframes rotateOutUpRight{0%{-webkit-transform-origin:right bottom;transform-origin:right bottom;opacity:1}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate(90deg);transform:rotate(90deg);opacity:0}}@keyframes rotateOutUpRight{0%{-webkit-transform-origin:right bottom;transform-origin:right bottom;opacity:1}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate(90deg);transform:rotate(90deg);opacity:0}}.rotateOutUpRight{-webkit-animation-name:rotateOutUpRight;animation-name:rotateOutUpRight}@-webkit-keyframes hinge{0%{-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}20%,60%{-webkit-transform:rotate(80deg);transform:rotate(80deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}40%,80%{-webkit-transform:rotate(60deg);transform:rotate(60deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;opacity:1}to{-webkit-transform:translate3d(0,700px,0);transform:translate3d(0,700px,0);opacity:0}}@keyframes hinge{0%{-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}20%,60%{-webkit-transform:rotate(80deg);transform:rotate(80deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}40%,80%{-webkit-transform:rotate(60deg);transform:rotate(60deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;opacity:1}to{-webkit-transform:translate3d(0,700px,0);transform:translate3d(0,700px,0);opacity:0}}.hinge{-webkit-animation-name:hinge;animation-name:hinge}@-webkit-keyframes jackInTheBox{0%{opacity:0;-webkit-transform:scale(.1) rotate(30deg);transform:scale(.1) rotate(30deg);-webkit-transform-origin:center bottom;transform-origin:center bottom}50%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}70%{-webkit-transform:rotate(3deg);transform:rotate(3deg)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes jackInTheBox{0%{opacity:0;-webkit-transform:scale(.1) rotate(30deg);transform:scale(.1) rotate(30deg);-webkit-transform-origin:center bottom;transform-origin:center bottom}50%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}70%{-webkit-transform:rotate(3deg);transform:rotate(3deg)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.jackInTheBox{-webkit-animation-name:jackInTheBox;animation-name:jackInTheBox}@-webkit-keyframes rollIn{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotate(-120deg);transform:translate3d(-100%,0,0) rotate(-120deg)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes rollIn{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotate(-120deg);transform:translate3d(-100%,0,0) rotate(-120deg)}to{opacity:1;-webkit-transform:none;transform:none}}.rollIn{-webkit-animation-name:rollIn;animation-name:rollIn}@-webkit-keyframes rollOut{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate(120deg);transform:translate3d(100%,0,0) rotate(120deg)}}@keyframes rollOut{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate(120deg);transform:translate3d(100%,0,0) rotate(120deg)}}.rollOut{-webkit-animation-name:rollOut;animation-name:rollOut}@-webkit-keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}.zoomIn{-webkit-animation-name:zoomIn;animation-name:zoomIn}@-webkit-keyframes zoomInDown{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInDown{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInDown{-webkit-animation-name:zoomInDown;animation-name:zoomInDown}@-webkit-keyframes zoomInLeft{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(10px,0,0);transform:scale3d(.475,.475,.475) translate3d(10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInLeft{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(10px,0,0);transform:scale3d(.475,.475,.475) translate3d(10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInLeft{-webkit-animation-name:zoomInLeft;animation-name:zoomInLeft}@-webkit-keyframes zoomInRight{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInRight{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInRight{-webkit-animation-name:zoomInRight;animation-name:zoomInRight}@-webkit-keyframes zoomInUp{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInUp{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInUp{-webkit-animation-name:zoomInUp;animation-name:zoomInUp}@-webkit-keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:0}}@keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:0}}.zoomOut{-webkit-animation-name:zoomOut;animation-name:zoomOut}@-webkit-keyframes zoomOutDown{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomOutDown{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomOutDown{-webkit-animation-name:zoomOutDown;animation-name:zoomOutDown}@-webkit-keyframes zoomOutLeft{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(42px,0,0);transform:scale3d(.475,.475,.475) translate3d(42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(-2000px,0,0);transform:scale(.1) translate3d(-2000px,0,0);-webkit-transform-origin:left center;transform-origin:left center}}@keyframes zoomOutLeft{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(42px,0,0);transform:scale3d(.475,.475,.475) translate3d(42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(-2000px,0,0);transform:scale(.1) translate3d(-2000px,0,0);-webkit-transform-origin:left center;transform-origin:left center}}.zoomOutLeft{-webkit-animation-name:zoomOutLeft;animation-name:zoomOutLeft}@-webkit-keyframes zoomOutRight{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-42px,0,0);transform:scale3d(.475,.475,.475) translate3d(-42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(2000px,0,0);transform:scale(.1) translate3d(2000px,0,0);-webkit-transform-origin:right center;transform-origin:right center}}@keyframes zoomOutRight{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-42px,0,0);transform:scale3d(.475,.475,.475) translate3d(-42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(2000px,0,0);transform:scale(.1) translate3d(2000px,0,0);-webkit-transform-origin:right center;transform-origin:right center}}.zoomOutRight{-webkit-animation-name:zoomOutRight;animation-name:zoomOutRight}@-webkit-keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomOutUp{-webkit-animation-name:zoomOutUp;animation-name:zoomOutUp}@-webkit-keyframes slideInDown{0%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInDown{0%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInDown{-webkit-animation-name:slideInDown;animation-name:slideInDown}@-webkit-keyframes slideInLeft{0%{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInLeft{0%{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInLeft{-webkit-animation-name:slideInLeft;animation-name:slideInLeft}@-webkit-keyframes slideInRight{0%{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInRight{0%{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInRight{-webkit-animation-name:slideInRight;animation-name:slideInRight}@-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInUp{-webkit-animation-name:slideInUp;animation-name:slideInUp}@-webkit-keyframes slideOutDown{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes slideOutDown{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.slideOutDown{-webkit-animation-name:slideOutDown;animation-name:slideOutDown}@-webkit-keyframes slideOutLeft{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes slideOutLeft{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.slideOutLeft{-webkit-animation-name:slideOutLeft;animation-name:slideOutLeft}@-webkit-keyframes slideOutRight{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes slideOutRight{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.slideOutRight{-webkit-animation-name:slideOutRight;animation-name:slideOutRight}@-webkit-keyframes slideOutUp{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes slideOutUp{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.slideOutUp{-webkit-animation-name:slideOutUp;animation-name:slideOutUp}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    //based on an Example by @curran
    window.requestAnimFrame = function () {
        return window.requestAnimationFrame;
    }();
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");

    var numStars = 1500;
    var radius = '0.' + Math.floor(Math.random() * 9) + 1;
    var focalLength = canvas.width * 2;
    var warp = 0;
    var centerX, centerY;

    var stars = [],
        star;
    var i;

    var animate = true;

    initializeStars();

    function executeFrame() {

        if (animate) requestAnimFrame(executeFrame);
        moveStars();
        drawStars();
    }

    function initializeStars() {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        stars = [];
        for (i = 0; i < numStars; i++) {
            star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width,
                o: '0.' + Math.floor(Math.random() * 99) + 1
            };
            stars.push(star);
        }
    }

    function moveStars() {
        for (i = 0; i < numStars; i++) {
            star = stars[i];
            star.z--;

            if (star.z <= 0) {
                star.z = canvas.width;
            }
        }
    }

    function drawStars() {
        var pixelX, pixelY, pixelRadius;

        // Resize to the screen
        if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeStars();
        }
        if (warp == 0) {
            c.fillStyle = "rgba(0,10,20,1)";
            c.fillRect(0, 0, canvas.width, canvas.height);
        }
        c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
        for (i = 0; i < numStars; i++) {
            star = stars[i];

            pixelX = (star.x - centerX) * (focalLength / star.z);
            pixelX += centerX;
            pixelY = (star.y - centerY) * (focalLength / star.z);
            pixelY += centerY;
            pixelRadius = 1 * (focalLength / star.z);

            c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
            c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
            //c.fill();
        }
    }

    // document.getElementById('warp').addEventListener("click", function(e) {
    //     window.c.beginPath();
    //     window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
    //     window.warp = warp ? 0 : 1;
    //     executeFrame();
    // });

    executeFrame();
})();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_TOP = 300,
    MAX_WIDTH = document.body.clientWidth;

var defaultType = 0;

var prizes = void 0;
var DEFAULT_MESS = ['我是该抽中一等奖还是一等奖呢，纠结ing...', '听说要提前一个月吃素才能中大奖喔！', '好想要无人机啊！！！', '一等奖有没有人想要呢？', '五等奖也不错，只要自己能中奖就行', '祝大家新年快乐！', '中不中奖不重要，大家吃好喝好。', '我已经有了天猫精灵了，要是再中个小度，那我该宠谁呢？', '2019年，祝福大家事事顺遂。', '作为专业陪跑的我，我就看看你们有谁跟我一样', '2019祝福TENDA越来越好！', '2019了，有没有要生猪宝宝的？', '来年再战！！！', '去年UI组全员陪跑，今年是否还是如此呢？', '我们UI组至少要重一个大奖吧'];

var lastDanMuList = [];

var prizeElement = {},
    lasetPrizeIndex = 0;

var DanMu = function () {
    function DanMu(option) {
        _classCallCheck(this, DanMu);

        if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) !== 'object') {
            option = {
                text: option
            };
        }

        this.position = {};
        this.text = option.text;
        this.onComplete = option.onComplete;

        this.init();
    }

    DanMu.prototype.init = function init() {
        this.element = document.createElement('div');
        this.element.className = 'dan-mu';
        document.body.appendChild(this.element);

        this.start();
    };

    DanMu.prototype.setText = function setText(text) {
        this.text = text || this.text;
        this.element.textContent = this.text;
        this.width = this.element.clientWidth + 100;
    };

    DanMu.prototype.start = function start(text) {
        var _this = this;

        var speed = ~~(Math.random() * 10000) + 6000;
        this.position = {
            x: MAX_WIDTH
        };
        var delay = speed / 10;

        this.setText(text);
        this.element.style.transform = 'translateX(' + this.position.x + 'px)';
        this.element.style.top = ~~(Math.random() * MAX_TOP) + 10 + 'px';
        this.element.classList.add('active');
        this.tween = new TWEEN.Tween(this.position).to({
            x: -this.width
        }, speed).onUpdate(function () {
            _this.render();
        }).onComplete(function () {
            _this.onComplete && _this.onComplete();
        }).start();
    };

    DanMu.prototype.render = function render() {
        this.element.style.transform = 'translateX(' + this.position.x + 'px)';
    };

    return DanMu;
}();

var Qipao = function () {
    function Qipao(option) {
        _classCallCheck(this, Qipao);

        if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) !== 'object') {
            option = {
                text: option
            };
        }

        this.text = option.text;
        this.onComplete = option.onComplete;
        this.$par = document.querySelector('.qipao-container');
        if (!this.$par) {
            this.$par = document.createElement('div');
            this.$par.className = 'qipao-container';
            document.body.appendChild(this.$par);
        }

        this.init();
    }

    Qipao.prototype.init = function init() {
        this.element = document.createElement('div');
        this.element.className = 'qipao animated';
        this.$par.appendChild(this.element);

        this.start();
    };

    Qipao.prototype.setText = function setText(text) {
        this.text = text || this.text;
        this.element.textContent = this.text;
    };

    Qipao.prototype.start = function start(text) {
        var _this2 = this;

        this.setText(text);
        this.element.classList.remove('bounceOutRight');
        this.element.classList.add('bounceInRight');

        setTimeout(function () {
            _this2.element.classList.remove('bounceInRight');
            _this2.element.classList.add('bounceOutRight');
            _this2.onComplete && _this2.onComplete();
        }, 4000);
    };

    return Qipao;
}();

var addQipao = function () {
    var qipaoList = [];
    return function (text) {
        var qipao = void 0;
        if (qipaoList.length > 0) {
            qipao = qipaoList.shift();
        } else {
            qipao = new Qipao({
                onComplete: function onComplete() {
                    qipaoList.push(qipao);
                }
            });
        }

        qipao.start(text);
    };
}();

function setPrizes(pri) {
    prizes = pri;
    defaultType = prizes[0]['type'];
    lasetPrizeIndex = pri.length - 1;
}

function showPrizeList(currentPrizeIndex) {
    var currentPrize = prizes[currentPrizeIndex];
    if (currentPrize.type === defaultType) {
        currentPrize.count === '不限制';
    }
    var htmlCode = '<div class="prize-mess">\u6B63\u5728\u62BD\u53D6<label id="prizeType" class="prize-shine">' + currentPrize.type + '</label><label id="prizeText" class="prize-shine">' + currentPrize['title'] + '</label>\uFF0C\u5269\u4F59<label id="prizeLeft" class="prize-shine">' + currentPrize['count'] + '</label>\u4E2A</div><ul class="prize-list">';
    prizes.forEach(function (item) {
        if (item.type === defaultType) {
            return true;
        }
        htmlCode += '<li id="prize-item-' + item.type + '" class="prize-item ' + (item.type == currentPrize.type ? "shine" : '') + '">\n                        <div class="prize-img">\n                            <img src="' + item.img + '" alt="' + item.title + '">\n                        </div>\n                        <div class="prize-text">\n                            <h5 class="prize-title">' + item.type + ' ' + item.title + '</h5>\n                            <div class="prize-count">\n                                <div class="progress">\n                                    <div id="prize-bar-' + item.type + '" class="progress-bar progress-bar-danger progress-bar-striped active" style="width: 100%;">\n                                    </div>\n                                </div>\n                                <div id="prize-count-' + item.type + '" class="prize-count-left">\n                                    ' + (item.count + '/' + item.count) + '\n                                </div>\n                            </div>\n                        </div>\n                    </li>';
    });
    htmlCode += '</ul>';

    document.querySelector('#prizeBar').innerHTML = htmlCode;
}

function resetPrize(currentPrizeIndex) {
    prizeElement = {};
    lasetPrizeIndex = currentPrizeIndex;
    showPrizeList(currentPrizeIndex);
}

var setPrizeData = function () {
    return function (currentPrizeIndex, count, isInit) {
        var currentPrize = prizes[currentPrizeIndex],
            type = currentPrize.type,
            elements = prizeElement[type],
            totalCount = currentPrize.count;

        if (!elements) {
            elements = {
                box: document.querySelector('#prize-item-' + type),
                bar: document.querySelector('#prize-bar-' + type),
                text: document.querySelector('#prize-count-' + type)
            };
            prizeElement[type] = elements;
        }

        if (!prizeElement.prizeType) {
            prizeElement.prizeType = document.querySelector('#prizeType');
            prizeElement.prizeLeft = document.querySelector('#prizeLeft');
            prizeElement.prizeText = document.querySelector('#prizeText');
        }

        if (isInit) {
            for (var i = prizes.length - 1; i > currentPrizeIndex; i--) {
                var _type = prizes[i]['type'];
                document.querySelector('#prize-item-' + _type).className = 'prize-item done';
                document.querySelector('#prize-bar-' + _type).style.width = '0';
                document.querySelector('#prize-count-' + _type).textContent = '0' + '/' + prizes[i]['count'];
            }
        }

        if (lasetPrizeIndex !== currentPrizeIndex) {
            var lastPrize = prizes[lasetPrizeIndex],
                lastBox = document.querySelector('#prize-item-' + lastPrize.type);
            lastBox.classList.remove('shine');
            lastBox.classList.add('done');
            elements.box && elements.box.classList.add('shine');
            prizeElement.prizeType.textContent = currentPrize.type;
            prizeElement.prizeText.textContent = currentPrize.title;

            lasetPrizeIndex = currentPrizeIndex;
        }

        if (currentPrizeIndex === 0) {
            prizeElement.prizeType.textContent = '特别奖';
            prizeElement.prizeText.textContent = ' ';
            prizeElement.prizeLeft.textContent = '不限制';
            return;
        }

        count = totalCount - count;
        var percent = (count / totalCount).toFixed(2);
        elements.bar && (elements.bar.style.width = percent * 100 + '%');
        elements.text && (elements.text.textContent = count + '/' + totalCount);
        prizeElement.prizeLeft.textContent = count;
    };
}();

function startMaoPao() {
    var len = DEFAULT_MESS.length,
        count = 5,
        index = ~~(Math.random() * len),
        danmuList = [],
        total = 0;

    function restart() {
        total = 0;
        danmuList.forEach(function (item) {
            var text = lastDanMuList.length > 0 ? lastDanMuList.shift() : DEFAULT_MESS[index++];
            item.start(text);
            index = index > len ? 0 : index;
        });
    }

    for (var i = 0; i < count; i++) {

        setTimeout(function () {
            danmuList.push(new DanMu({
                text: DEFAULT_MESS[index++],
                onComplete: function onComplete() {
                    var _this3 = this;

                    setTimeout(function () {
                        _this3.start(DEFAULT_MESS[index++]);
                        index = index > len ? 0 : index;
                    }, 1000);
                }
            }));
            index = index > len ? 0 : index;
        }, 1500 * i);
    }
}

function addDanMu(text) {
    lastDanMuList.push(text);
}

exports.startMaoPao = startMaoPao;
exports.showPrizeList = showPrizeList;
exports.setPrizeData = setPrizeData;
exports.addDanMu = addDanMu;
exports.setPrizes = setPrizes;
exports.resetPrize = resetPrize;
exports.addQipao = addQipao;

/***/ })
/******/ ]);