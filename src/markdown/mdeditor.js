/**
 * mditor , �?个�?洁�?��??�?�??�?��?��?�便�?��?�?��??�??�??�?��??�?�?? markdown �??�?�?�?�
 * @version v0.1.1
 * @homepage http://houfeng.net/mditor
 * @license MIT
 * @author Houfeng
 * @email admin@xhou.net
 * @blog http://houfeng.net
 */
! function e(t, n, r) {
    function i(o, s) {
        if (!n[o]) {
            if (!t[o]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(o, !0);
                if (a) return a(o, !0);
                var c = new Error("Cannot find module '" + o + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var d = n[o] = { exports: {} };
            t[o][0].call(d.exports, function(e) {
                var n = t[o][1][e];
                return i(n ? n : e)
            }, d, d.exports, e, t, n, r)
        }
        return n[o].exports
    }

    for (var a = "function" == typeof require && require, o = 0; o < r.length; o++) i(r[o]);
    return i
}({
    1: [function(require, module, exports) {
        var e = module.exports = function(e) {
            var t = this;
            return t.innerEditor = e.ui.editor, t._bindEvents(), t
        };
        e.prototype.getActiveElement = function() {
            var e = this;
            return e.innerEditor.focus(), document.activeElement
        }, e.prototype.getSelectRange = function() {
            var e = this,
                t = e.getActiveElement();
            return { start: t.selectionStart, end: t.selectionEnd }
        }, e.prototype.setSelectRange = function(e, t) {
            var n = this,
                r = n.getActiveElement();
            return r.setSelectionRange(e, t), n
        }, e.prototype.getSelectText = function() {
            var e = this,
                t = e.getActiveElement(),
                n = e.getSelectRange();
            return t.value.substring(n.start, n.end)
        }, e.prototype.setSelectText = function(e) {
            var t = this,
                n = t.getActiveElement(),
                r = t.getSelectRange();
            return n.setRangeText(e), r.end == r.start && t.setSelectRange(r.start, r.end + e.length), t.innerEditor.trigger("input"), t
        }, e.prototype.wrapSelectText = function(e, t) {
            var n = this;
            e = null !== e && void 0 !== e ? e : "", t = null !== t && void 0 !== t ? t : "";
            var r = n.getSelectRange(),
                i = n.getSelectText();
            n.setSelectText(e + i + t);
            var a = r.start + e.length,
                o = r.end + e.length;
            return n.setSelectRange(a, o), n
        }, e.prototype.on = function(e, t) {
            var n = this;
            return n.innerEditor.on(e, t.bind(n)), n
        }, e.prototype.off = function(e, t) {
            var n = this;
            return n.innerEditor.off(e, t.bind(n)), n
        }, e.prototype._bindEvents = function(e, t) {
            var n = this;
            return n.on("keydown", function(e) {
                if (9 == e.keyCode) {
                    e.preventDefault();
                    var t = e.target,
                        n = "	",
                        r = t.selectionStart,
                        i = t.selectionEnd,
                        a = window.getSelection().toString();
                    a = n + a.replace(/\n/g, "\n" + n), t.value = t.value.substring(0, r) + a + t.value.substring(i), t.setSelectionRange(r + n.length, r + a.length)
                }
            }), n
        }
    }, {}],
    2: [function(require, module, exports) {
        var e = require("jquery"),
            t = require("../lib/parser"),
            n = require("./toolbar"),
            r = require("./editor"),
            i = 16,
            a = window.Mditor = module.exports = function(t, n) {
                var r = this;
                if (!t) throw "must specify a textarea.";
                r._init(), r.ui = {}, r.ui.editor = e(t), r._create(), r.setOptions(n), r._initCommands(), r._initComponent(), r._bindEvents(), r._bindCommands()
            };
        a.version = "0.1.1", a.prototype._init = function() {
            var e = this;
            return e.platform = navigator.platform.toLowerCase(), e.EOL = "win32" == e.platform ? "\r\n" : "\n", e
        }, a.prototype.setOptions = function(e) {
            var t = this;
            e = e || {}, t.options = t.options || {}, null !== e.fixedHeight && (t.options.fixedHeight = e.fixedHeight, t.options.fixedHeight ? t.ui.wraper.addClass("fixed") : t.ui.wraper.removeClass("fixed")), null !== e.height && (t.options.height = e.height, t.setHeight(t.options.height)), null !== e.width && (t.options.width = e.width, t.setWidth(t.options.width))
        }, a.prototype._create = function() {
            var t = this,
                n = t.ui,
                r = n.editor.val() || "";
            return n.editor.val(r.trim()), n.editor.addClass("editor"), n.editor.wrap('<div class="mditor"><div class="body"></div></div>'), n.body = n.editor.parent(), n.wraper = n.body.parent(), n.head = e('<div class="head"></div>'), n.body.before(n.head), n.toolbar = e('<div class="toolbar"></div>'), n.head.append(n.toolbar), n.control = e('<div class="control"><i data-cmd="togglePreview" title="�?�?" class="fa fa-columns"></i>'), n.head.append(n.control), n.viewer = e('<div class="viewer"></div>'), n.body.append(n.viewer), n.heightCalc = e('<div class="editor"></br></div>'), n.wraper.append(n.heightCalc), n.heightCalc.wrap('<div class="calc"></div>'), t
        }, a.prototype._initComponent = function() {
            var e = this;
            return e.editor = new r(e), e.toolBar = new n(e), e.parser = new t(e), e
        }, a.prototype.isPreview = function() {
            var e = this;
            return e.ui.wraper.hasClass("preview")
        }, a.prototype.openPreview = function() {
            var e = this;
            return e.ui.wraper.addClass("preview"), e._updateViewer(), e._calcAutoHeight(), e._calcScroll(), e
        }, a.prototype.closePreview = function() {
            var e = this;
            return e.ui.wraper.removeClass("preview"), e._calcAutoHeight(), e
        }, a.prototype.togglePreview = function() {
            var e = this;
            return e.isPreview() ? e.closePreview() : e.openPreview(), e
        }, a.prototype.isFullScreen = function() {
            var e = this;
            return e.ui.wraper.hasClass("fullscreen")
        }, a.prototype.openFullScreen = function(e) {
            var t = this;
            return t.ui.wraper.addClass("fullscreen"), t._lastStyle = t.ui.editor.attr("style"), t._calcAutoHeight(), (e || t.options.useH5FullScreen) && document.body.webkitRequestFullscreen(), t
        }, a.prototype.closeFullScreen = function(e) {
            var t = this;
            return (e || t.options.useH5FullScreen) && document.webkitExitFullscreen(), t.ui.wraper.removeClass("fullscreen"), t._lastStyle && (t.ui.editor.attr("style", t._lastStyle), t.ui.heightCalc.attr("style", ""), t._lastStyle = null), t
        }, a.prototype.toggleFullScreen = function() {
            var e = this;
            return e.isFullScreen() ? e.closeFullScreen() : e.openFullScreen(), e
        }, a.prototype.toolBarIsHidden = function() {
            var e = this;
            return e.ui.wraper.hasClass("toolbar-hidden")
        }, a.prototype.hideToolBar = function() {
            var e = this;
            return e.ui.wraper.addClass("toolbar-hidden"), e
        }, a.prototype.showToolBar = function() {
            var e = this;
            return e.ui.wraper.removeClass("toolbar-hidden"), e
        }, a.prototype.setHeight = function(e, t) {
            var n = this;
            return n.options.fixedHeight ? (n.ui.editor.outerHeight(e), n.ui.heightCalc.outerHeight(e)) : (n.ui.editor.css("minHeight", e), n.ui.heightCalc.css("minHeight", e)), t || n._calcAutoHeight(), n
        }, a.prototype.getHeight = function() {
            var e = this;
            return e.ui.editor.outerHeight()
        }, a.prototype.setWidth = function(e) {
            var t = this;
            return t.ui.wraper.outerWidth(e), t
        }, a.prototype.getWidth = function() {
            var e = this;
            return e.ui.wraper.outerWidth()
        }, a.prototype._getMaxHeight = function() {
            var t = this,
                n = t.ui.head,
                r = e(window).outerHeight() - 2 * n.outerHeight() - i;
            return r
        }, a.prototype._calcAutoHeight = function() {
            var e = this,
                t = e.ui,
                n = e.isFullScreen();
            if (n) {
                var r = e.ui.wraper,
                    a = e.ui.head,
                    o = r.outerHeight() - a.outerHeight() - i;
                e.setHeight(o, !0)
            }
            if (e.options.fixedHeight || e.isFullScreen()) return t.viewer.outerHeight(e.getHeight()), e;
            var s = e._getMaxHeight();
            if (t.heightCalc.outerWidth(t.editor.outerWidth()), t.heightCalc.html(t.editor.val().split("\n").join("</br>") + "<br/>"), e.isPreview()) {
                t.viewer.outerHeight("auto"), t.viewer.css("overflow", "visible");
                var l = t.heightCalc.outerHeight(),
                    c = t.viewer.outerHeight(),
                    d = c > l ? c : l;
                d > s && (d = s, t.viewer.outerHeight("").css("overflow", "auto")), t.editor.outerHeight(d), t.viewer.outerHeight(d)
            } else {
                var u = t.heightCalc.outerHeight();
                u > s && (u = s), t.editor.outerHeight(u), t.viewer.outerHeight(u)
            }
            return e
        }, a.prototype._bindEvents = function() {
            var t = this;
            return t.on("input", t._input.bind(t)), e(window).on("resize", t._calcAutoHeight.bind(t)), t.on("focus", t._addActiveClass.bind(t)), t.on("blur", t._removeActiveClass.bind(t)), t.editor.on("scroll", t._calcScroll.bind(t)), t.ui.viewer.on("click", "a", t._onLinkClick.bind(t)), t
        }, a.prototype._onLinkClick = function(t) {
            return alert('�?�?�?��? �?�??�? "' + e(t.target).attr("href") + '".'), !1
        }, a.prototype._calcScroll = function() {
            var e = this;
            if (!e.isPreview()) return e;
            var t = e.getHeight(),
                n = e.ui.editor.prop("scrollHeight"),
                r = e.ui.viewer.prop("scrollHeight"),
                i = e.ui.editor.prop("scrollTop"),
                a = i * (r - t) / (n - t);
            return e.ui.viewer.prop("scrollTop", a), e
        }, a.prototype._initCommands = function() {
            var e = this;
            return e.cmd = { toggleFullScreen: e.toggleFullScreen, togglePreview: e.togglePreview }, e
        }, a.prototype._bindCommands = function() {
            var t = this;
            return t.ui.head.on("click", "i.fa", function(n) {
                var r = e(this),
                    i = r.attr("data-cmd");
                if (!i || !t.cmd[i]) throw 'command "' + i + '" not found.';
                n.mditor = t, n.toolbar = t.toolbar, n.editor = t.editor, t.cmd[i].call(t, n, t), t.focus()
            }), t
        }, a.prototype._updateViewer = function() {
            var e = this;
            return e.ui.viewer.html(e.getHTML()), e
        }, a.prototype._input = function() {
            var e = this;
            return e.isPreview() && e._updateViewer(), e._calcAutoHeight(), e
        }, a.prototype.focus = function() {
            var e = this;
            e.ui.editor.focus()
        }, a.prototype.blur = function() {
            var e = this;
            e.ui.editor.blur()
        }, a.prototype._addActiveClass = function() {
            var e = this;
            return e.ui.body.addClass("active"), e
        }, a.prototype._removeActiveClass = function() {
            var e = this;
            return e.ui.body.removeClass("active"), e
        }, a.prototype.getValue = function() {
            var e = this;
            return e.ui.editor.val()
        }, a.prototype.setValue = function(e) {
            var t = this;
            return t.ui.editor.val(e), t._updateViewer(), t._calcAutoHeight(), this
        }, a.prototype.getHTML = function() {
            var e = this,
                t = e.parser.parse(e.ui.editor.val());
            return '<div class="markdown-body">' + t + "</div>"
        }, a.prototype.on = function(e, t) {
            var n = this;
            return n.editor.on(e, t.bind(n)), n
        }, a.prototype.off = function(e, t) {
            var n = this;
            return n.editor.off(e, t.bind(n)), n
        }
    }, { "../lib/parser": 4, "./editor": 1, "./toolbar": 3, jquery: 142 }],
    3: [function(require, module, exports) {
        var e = module.exports = function(e) {
            var t = this;
            t.holder = e.ui.toolbar, t.cmd = e.cmd, t.render()
        };
        e.prototype.items = {
            bold: {
                title: "Grassetto",
                handler: function(e) {
                    this.editor.wrapSelectText("**", "**")
                }
            },
            italic: {
                title: "Italico",
                handler: function(e) {
                    this.editor.wrapSelectText("*", "*")
                }
            },
            underline: {
                title: "Sottolineato",
                handler: function(e) {
                    this.editor.wrapSelectText("<u>", "</u>")
                }
            },
            strikethrough: {
                title: "�? �?�线",
                handler: function(e) {
                    this.editor.wrapSelectText("~~", "~~")
                }
            },
            header: {
                title: "Intestazione",
                handler: function(e) {
                    this.editor.wrapSelectText("# ")
                }
            },
            quote: {
                icon: "quote-left",
                title: "�?�?�",
                handler: function(e) {
                    var t = this.editor.getSelectText();
                    if (t.length < 1) return void this.editor.wrapSelectText("> ");
                    var n = t.split(this.EOL),
                        r = [];
                    n.forEach(function(e) {
                        r.push("> " + e + "  ")
                    }), this.editor.setSelectText(r.join(this.EOL) + this.EOL)
                }
            },
            code: {
                title: "代� �",
                handler: function(e) {
                    var t = "```javascript" + this.EOL,
                        n = this.EOL + "```  " + this.EOL;
                    this.editor.wrapSelectText(t, n)
                }
            },
            "list-ol": {
                title: "Liste numerate",
                handler: function(e) {
                    var t = this.editor.getSelectText();
                    if (t.length < 1) return void this.editor.wrapSelectText("1. ");
                    for (var n = t.split(this.EOL), r = [], i = 0; i < n.length; i++) {
                        var a = n[i];
                        r.push(i + 1 + ". " + a)
                    }
                    this.editor.setSelectText(r.join(this.EOL) + this.EOL)
                }
            },
            "list-ul": {
                title: "Liste non numerate",
                handler: function(e) {
                    var t = this.editor.getSelectText();
                    if (t.length < 1) return void this.editor.wrapSelectText("*. ");
                    var n = t.split(this.EOL),
                        r = [];
                    n.forEach(function(e) {
                        r.push("* " + e)
                    }), this.editor.setSelectText(r.join(this.EOL) + this.EOL)
                }
            },
            link: {
                title: "Collegamento ipertestuale",
                handler: function(e) {
                    this.editor.wrapSelectText("[text](", ")")
                }
            },
            table: {
                title: "表� �",
                handler: function(e) {
                    var t = ["column1 | column2 | column3  ", "------- | ------- | -------  ", "column1 | column2 | column3  ", "column1 | column2 | column3  ", "column1 | column2 | column3  "];
                    this.editor.wrapSelectText(t.join(this.EOL) + this.EOL)
                }
            },
            line: {
                title: "�??�??线",
                icon: "minus",
                handler: function(e) {
                    this.editor.wrapSelectText("----" + this.EOL)
                }
            },
            image: {
                title: "�?��??",
                handler: function(e) {
                    this.editor.wrapSelectText("![alt](", ")")
                }
            }
            // }, e.prototype.showList = ["bold", "italic", "underline", "strikethrough", "header", "quote", "code", "list-ol", "list-ul", "link", "table", "line", "image"], e.prototype.render = function() {
        }, e.prototype.showList = ["bold", "italic", "underline", "header", "list-ol", "list-ul", "link"], e.prototype.render = function() {
            var e = this,
                t = [];
            return e.showList.forEach(function(n) {
                var r = e.items[n];
                r.name = n, e.cmd[r.name] = r.handler, t.push('<i data-cmd="' + r.name + '" class="fa fa-' + (r.icon || r.name) + '" title="' + (r.title || r.name) + '"></i>')
            }), e.holder.html(t.join("")), e
        }
    }, {}],
    4: [function(require, module, exports) {
        var e = require("marked"),
            t = require("highlight.js"),
            n = require("xss");
        e.setOptions({
            highlight: function(e, n, r) {
                return t.highlightAuto(e).value
            }
        }), n.whiteList.span = ["class"];
        var r = new n.FilterXSS({ whiteList: n.whiteList }),
            i = module.exports = function(e) {
                var t = this;
                e = e || {}, t.options = e
            };
        i.prototype.parse = function(t) {
            var n = e(t);
            return r.process(n)
        }
    }, { "highlight.js": 6, marked: 143, xss: 145 }],
    5: [function(require, module, exports) {
        ! function(e) {
            "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define("hljs", [], function() {
                return window.hljs
            }))
        }(function(e) {
            function t(e) {
                return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
            }

            function n(e) {
                return e.nodeName.toLowerCase()
            }

            function r(e, t) {
                var n = e && e.exec(t);
                return n && 0 == n.index
            }

            function i(e) {
                return /^(no-?highlight|plain|text)$/i.test(e)
            }

            function a(e) {
                var t, n, r, a = e.className + " ";
                if (a += e.parentNode ? e.parentNode.className : "", n = /\blang(?:uage)?-([\w-]+)\b/i.exec(a)) return v(n[1]) ? n[1] : "no-highlight";
                for (a = a.split(/\s+/), t = 0, r = a.length; r > t; t++)
                    if (v(a[t]) || i(a[t])) return a[t]
            }

            function o(e, t) {
                var n, r = {};
                for (n in e) r[n] = e[n];
                if (t)
                    for (n in t) r[n] = t[n];
                return r
            }

            function s(e) {
                var t = [];
                return function r(e, i) {
                    for (var a = e.firstChild; a; a = a.nextSibling) 3 == a.nodeType ? i += a.nodeValue.length : 1 == a.nodeType && (t.push({
                        event: "start",
                        offset: i,
                        node: a
                    }), i = r(a, i), n(a).match(/br|hr|img|input/) || t.push({ event: "stop", offset: i, node: a }));
                    return i
                }(e, 0), t
            }

            function l(e, r, i) {
                function a() {
                    return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" == r[0].event ? e : r : e.length ? e : r
                }

                function o(e) {
                    function r(e) {
                        return " " + e.nodeName + '="' + t(e.value) + '"'
                    }

                    d += "<" + n(e) + Array.prototype.map.call(e.attributes, r).join("") + ">"
                }

                function s(e) {
                    d += "</" + n(e) + ">"
                }

                function l(e) {
                    ("start" == e.event ? o : s)(e.node)
                }

                for (var c = 0, d = "", u = []; e.length || r.length;) {
                    var p = a();
                    if (d += t(i.substr(c, p[0].offset - c)), c = p[0].offset, p == e) {
                        u.reverse().forEach(s);
                        do l(p.splice(0, 1)[0]), p = a(); while (p == e && p.length && p[0].offset == c);
                        u.reverse().forEach(o)
                    } else "start" == p[0].event ? u.push(p[0].node) : u.pop(), l(p.splice(0, 1)[0])
                }
                return d + t(i.substr(c))
            }

            function c(e) {
                function t(e) {
                    return e && e.source || e
                }

                function n(n, r) {
                    return new RegExp(t(n), "m" + (e.case_insensitive ? "i" : "") + (r ? "g" : ""))
                }

                function r(i, a) {
                    if (!i.compiled) {
                        if (i.compiled = !0, i.keywords = i.keywords || i.beginKeywords, i.keywords) {
                            var s = {},
                                l = function(t, n) {
                                    e.case_insensitive && (n = n.toLowerCase()), n.split(" ").forEach(function(e) {
                                        var n = e.split("|");
                                        s[n[0]] = [t, n[1] ? Number(n[1]) : 1]
                                    })
                                };
                            "string" == typeof i.keywords ? l("keyword", i.keywords) : Object.keys(i.keywords).forEach(function(e) {
                                l(e, i.keywords[e])
                            }), i.keywords = s
                        }
                        i.lexemesRe = n(i.lexemes || /\b\w+\b/, !0), a && (i.beginKeywords && (i.begin = "\\b(" + i.beginKeywords.split(" ").join("|") + ")\\b"), i.begin || (i.begin = /\B|\b/), i.beginRe = n(i.begin), i.end || i.endsWithParent || (i.end = /\B|\b/), i.end && (i.endRe = n(i.end)), i.terminator_end = t(i.end) || "", i.endsWithParent && a.terminator_end && (i.terminator_end += (i.end ? "|" : "") + a.terminator_end)), i.illegal && (i.illegalRe = n(i.illegal)), void 0 === i.relevance && (i.relevance = 1), i.contains || (i.contains = []);
                        var c = [];
                        i.contains.forEach(function(e) {
                            e.variants ? e.variants.forEach(function(t) {
                                c.push(o(e, t))
                            }) : c.push("self" == e ? i : e)
                        }), i.contains = c, i.contains.forEach(function(e) {
                            r(e, i)
                        }), i.starts && r(i.starts, a);
                        var d = i.contains.map(function(e) {
                            return e.beginKeywords ? "\\.?(" + e.begin + ")\\.?" : e.begin
                        }).concat([i.terminator_end, i.illegal]).map(t).filter(Boolean);
                        i.terminators = d.length ? n(d.join("|"), !0) : {
                            exec: function() {
                                return null
                            }
                        }
                    }
                }

                r(e)
            }

            function d(e, n, i, a) {
                function o(e, t) {
                    for (var n = 0; n < t.contains.length; n++)
                        if (r(t.contains[n].beginRe, e)) return t.contains[n]
                }

                function s(e, t) {
                    if (r(e.endRe, t)) {
                        for (; e.endsParent && e.parent;) e = e.parent;
                        return e
                    }
                    return e.endsWithParent ? s(e.parent, t) : void 0
                }

                function l(e, t) {
                    return !i && r(t.illegalRe, e)
                }

                function p(e, t) {
                    var n = I.case_insensitive ? t[0].toLowerCase() : t[0];
                    return e.keywords.hasOwnProperty(n) && e.keywords[n]
                }

                function m(e, t, n, r) {
                    var i = r ? "" : C.classPrefix,
                        a = '<span class="' + i,
                        o = n ? "" : "</span>";
                    return a += e + '">', a + t + o
                }

                function g() {
                    if (!x.keywords) return t(P);
                    var e = "",
                        n = 0;
                    x.lexemesRe.lastIndex = 0;
                    for (var r = x.lexemesRe.exec(P); r;) {
                        e += t(P.substr(n, r.index - n));
                        var i = p(x, r);
                        i ? (G += i[1], e += m(i[0], t(r[0]))) : e += t(r[0]), n = x.lexemesRe.lastIndex, r = x.lexemesRe.exec(P)
                    }
                    return e + t(P.substr(n))
                }

                function _() {
                    var e = "string" == typeof x.subLanguage;
                    if (e && !y[x.subLanguage]) return t(P);
                    var n = e ? d(x.subLanguage, P, !0, E[x.subLanguage]) : u(P, x.subLanguage.length ? x.subLanguage : void 0);
                    return x.relevance > 0 && (G += n.relevance), e && (E[x.subLanguage] = n.top), m(n.language, n.value, !1, !0)
                }

                function f() {
                    return void 0 !== x.subLanguage ? _() : g()
                }

                function h(e, n) {
                    var r = e.className ? m(e.className, "", !0) : "";
                    e.returnBegin ? (T += r, P = "") : e.excludeBegin ? (T += t(n) + r, P = "") : (T += r, P = n), x = Object.create(e, { parent: { value: x } })
                }

                function b(e, n) {
                    if (P += e, void 0 === n) return T += f(), 0;
                    var r = o(n, x);
                    if (r) return T += f(), h(r, n), r.returnBegin ? 0 : n.length;
                    var i = s(x, n);
                    if (i) {
                        var a = x;
                        a.returnEnd || a.excludeEnd || (P += n), T += f();
                        do x.className && (T += "</span>"), G += x.relevance, x = x.parent; while (x != i.parent);
                        return a.excludeEnd && (T += t(n)), P = "", i.starts && h(i.starts, ""), a.returnEnd ? 0 : n.length
                    }
                    if (l(n, x)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (x.className || "<unnamed>") + '"');
                    return P += n, n.length || 1
                }

                var I = v(e);
                if (!I) throw new Error('Unknown language: "' + e + '"');
                c(I);
                var S, x = a || I,
                    E = {},
                    T = "";
                for (S = x; S != I; S = S.parent) S.className && (T = m(S.className, "", !0) + T);
                var P = "",
                    G = 0;
                try {
                    for (var w, A, D = 0;;) {
                        if (x.terminators.lastIndex = D, w = x.terminators.exec(n), !w) break;
                        A = b(n.substr(D, w.index - D), w[0]), D = w.index + A
                    }
                    for (b(n.substr(D)), S = x; S.parent; S = S.parent) S.className && (T += "</span>");
                    return { relevance: G, value: T, language: e, top: x }
                } catch (N) {
                    if (-1 != N.message.indexOf("Illegal")) return { relevance: 0, value: t(n) };
                    throw N
                }
            }

            function u(e, n) {
                n = n || C.languages || Object.keys(y);
                var r = { relevance: 0, value: t(e) },
                    i = r;
                return n.forEach(function(t) {
                    if (v(t)) {
                        var n = d(t, e, !1);
                        n.language = t, n.relevance > i.relevance && (i = n), n.relevance > r.relevance && (i = r, r = n)
                    }
                }), i.language && (r.second_best = i), r
            }

            function p(e) {
                return C.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
                    return t.replace(/\t/g, C.tabReplace)
                })), C.useBR && (e = e.replace(/\n/g, "<br>")), e
            }

            function m(e, t, n) {
                var r = t ? S[t] : n,
                    i = [e.trim()];
                return e.match(/\bhljs\b/) || i.push("hljs"), -1 === e.indexOf(r) && i.push(r), i.join(" ").trim()
            }

            function g(e) {
                var t = a(e);
                if (!i(t)) {
                    var n;
                    C.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e;
                    var r = n.textContent,
                        o = t ? d(t, r, !0) : u(r),
                        c = s(n);
                    if (c.length) {
                        var g = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                        g.innerHTML = o.value, o.value = l(c, s(g), r)
                    }
                    o.value = p(o.value), e.innerHTML = o.value, e.className = m(e.className, t, o.language), e.result = {
                        language: o.language,
                        re: o.relevance
                    }, o.second_best && (e.second_best = {
                        language: o.second_best.language,
                        re: o.second_best.relevance
                    })
                }
            }

            function _(e) {
                C = o(C, e)
            }

            function f() {
                if (!f.called) {
                    f.called = !0;
                    var e = document.querySelectorAll("pre code");
                    Array.prototype.forEach.call(e, g)
                }
            }

            function h() {
                addEventListener("DOMContentLoaded", f, !1), addEventListener("load", f, !1)
            }

            function b(t, n) {
                var r = y[t] = n(e);
                r.aliases && r.aliases.forEach(function(e) {
                    S[e] = t
                })
            }

            function I() {
                return Object.keys(y)
            }

            function v(e) {
                return e = e.toLowerCase(), y[e] || y[S[e]]
            }

            var C = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
                y = {},
                S = {};
            return e.highlight = d, e.highlightAuto = u, e.fixMarkup = p, e.highlightBlock = g, e.configure = _, e.initHighlighting = f, e.initHighlightingOnLoad = h, e.registerLanguage = b, e.listLanguages = I, e.getLanguage = v, e.inherit = o, e.IDENT_RE = "[a-zA-Z]\\w*", e.UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*", e.NUMBER_RE = "\\b\\d+(\\.\\d+)?", e.C_NUMBER_RE = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BINARY_NUMBER_RE = "\\b(0b[01]+)", e.RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BACKSLASH_ESCAPE = {
                begin: "\\\\[\\s\\S]",
                relevance: 0
            }, e.APOS_STRING_MODE = {
                className: "string",
                begin: "'",
                end: "'",
                illegal: "\\n",
                contains: [e.BACKSLASH_ESCAPE]
            }, e.QUOTE_STRING_MODE = {
                className: "string",
                begin: '"',
                end: '"',
                illegal: "\\n",
                contains: [e.BACKSLASH_ESCAPE]
            }, e.PHRASAL_WORDS_MODE = { begin: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/ }, e.COMMENT = function(t, n, r) {
                var i = e.inherit({ className: "comment", begin: t, end: n, contains: [] }, r || {});
                return i.contains.push(e.PHRASAL_WORDS_MODE), i.contains.push({
                    className: "doctag",
                    begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
                    relevance: 0
                }), i
            }, e.C_LINE_COMMENT_MODE = e.COMMENT("//", "$"), e.C_BLOCK_COMMENT_MODE = e.COMMENT("/\\*", "\\*/"), e.HASH_COMMENT_MODE = e.COMMENT("#", "$"), e.NUMBER_MODE = {
                className: "number",
                begin: e.NUMBER_RE,
                relevance: 0
            }, e.C_NUMBER_MODE = {
                className: "number",
                begin: e.C_NUMBER_RE,
                relevance: 0
            }, e.BINARY_NUMBER_MODE = {
                className: "number",
                begin: e.BINARY_NUMBER_RE,
                relevance: 0
            }, e.CSS_NUMBER_MODE = {
                className: "number",
                begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
                relevance: 0
            }, e.REGEXP_MODE = {
                className: "regexp",
                begin: /\//,
                end: /\/[gimuy]*/,
                illegal: /\n/,
                contains: [e.BACKSLASH_ESCAPE, { begin: /\[/, end: /\]/, relevance: 0, contains: [e.BACKSLASH_ESCAPE] }]
            }, e.TITLE_MODE = {
                className: "title",
                begin: e.IDENT_RE,
                relevance: 0
            }, e.UNDERSCORE_TITLE_MODE = { className: "title", begin: e.UNDERSCORE_IDENT_RE, relevance: 0 }, e
        })
    }, {}],
    6: [function(require, module, exports) {
        var e = require("./highlight");
        e.registerLanguage("1c", require("./languages/1c")), e.registerLanguage("accesslog", require("./languages/accesslog")), e.registerLanguage("actionscript", require("./languages/actionscript")), e.registerLanguage("apache", require("./languages/apache")), e.registerLanguage("applescript", require("./languages/applescript")), e.registerLanguage("armasm", require("./languages/armasm")), e.registerLanguage("xml", require("./languages/xml")), e.registerLanguage("asciidoc", require("./languages/asciidoc")), e.registerLanguage("aspectj", require("./languages/aspectj")), e.registerLanguage("autohotkey", require("./languages/autohotkey")), e.registerLanguage("autoit", require("./languages/autoit")), e.registerLanguage("avrasm", require("./languages/avrasm")), e.registerLanguage("axapta", require("./languages/axapta")), e.registerLanguage("bash", require("./languages/bash")), e.registerLanguage("brainfuck", require("./languages/brainfuck")), e.registerLanguage("cal", require("./languages/cal")), e.registerLanguage("capnproto", require("./languages/capnproto")), e.registerLanguage("ceylon", require("./languages/ceylon")), e.registerLanguage("clojure", require("./languages/clojure")), e.registerLanguage("clojure-repl", require("./languages/clojure-repl")), e.registerLanguage("cmake", require("./languages/cmake")), e.registerLanguage("coffeescript", require("./languages/coffeescript")), e.registerLanguage("cpp", require("./languages/cpp")), e.registerLanguage("crystal", require("./languages/crystal")), e.registerLanguage("cs", require("./languages/cs")), e.registerLanguage("css", require("./languages/css")), e.registerLanguage("d", require("./languages/d")), e.registerLanguage("markdown", require("./languages/markdown")), e.registerLanguage("dart", require("./languages/dart")), e.registerLanguage("delphi", require("./languages/delphi")), e.registerLanguage("diff", require("./languages/diff")), e.registerLanguage("django", require("./languages/django")), e.registerLanguage("dns", require("./languages/dns")), e.registerLanguage("dockerfile", require("./languages/dockerfile")), e.registerLanguage("dos", require("./languages/dos")), e.registerLanguage("dust", require("./languages/dust")), e.registerLanguage("elixir", require("./languages/elixir")), e.registerLanguage("elm", require("./languages/elm")), e.registerLanguage("ruby", require("./languages/ruby")), e.registerLanguage("erb", require("./languages/erb")), e.registerLanguage("erlang-repl", require("./languages/erlang-repl")), e.registerLanguage("erlang", require("./languages/erlang")), e.registerLanguage("fix", require("./languages/fix")), e.registerLanguage("fortran", require("./languages/fortran")), e.registerLanguage("fsharp", require("./languages/fsharp")), e.registerLanguage("gams", require("./languages/gams")), e.registerLanguage("gcode", require("./languages/gcode")), e.registerLanguage("gherkin", require("./languages/gherkin")), e.registerLanguage("glsl", require("./languages/glsl")), e.registerLanguage("go", require("./languages/go")), e.registerLanguage("golo", require("./languages/golo")), e.registerLanguage("gradle", require("./languages/gradle")), e.registerLanguage("groovy", require("./languages/groovy")), e.registerLanguage("haml", require("./languages/haml")), e.registerLanguage("handlebars", require("./languages/handlebars")), e.registerLanguage("haskell", require("./languages/haskell")), e.registerLanguage("haxe", require("./languages/haxe")), e.registerLanguage("http", require("./languages/http")), e.registerLanguage("inform7", require("./languages/inform7")), e.registerLanguage("ini", require("./languages/ini")), e.registerLanguage("irpf90", require("./languages/irpf90")), e.registerLanguage("java", require("./languages/java")), e.registerLanguage("javascript", require("./languages/javascript")), e.registerLanguage("json", require("./languages/json")), e.registerLanguage("julia", require("./languages/julia")), e.registerLanguage("kotlin", require("./languages/kotlin")), e.registerLanguage("lasso", require("./languages/lasso")), e.registerLanguage("less", require("./languages/less")), e.registerLanguage("lisp", require("./languages/lisp")), e.registerLanguage("livecodeserver", require("./languages/livecodeserver")), e.registerLanguage("livescript", require("./languages/livescript")), e.registerLanguage("lua", require("./languages/lua")), e.registerLanguage("makefile", require("./languages/makefile")), e.registerLanguage("mathematica", require("./languages/mathematica")), e.registerLanguage("matlab", require("./languages/matlab")), e.registerLanguage("mel", require("./languages/mel")), e.registerLanguage("mercury", require("./languages/mercury")), e.registerLanguage("mizar", require("./languages/mizar")), e.registerLanguage("perl", require("./languages/perl")), e.registerLanguage("mojolicious", require("./languages/mojolicious")), e.registerLanguage("monkey", require("./languages/monkey")), e.registerLanguage("nginx", require("./languages/nginx")), e.registerLanguage("nimrod", require("./languages/nimrod")), e.registerLanguage("nix", require("./languages/nix")), e.registerLanguage("nsis", require("./languages/nsis")), e.registerLanguage("objectivec", require("./languages/objectivec")), e.registerLanguage("ocaml", require("./languages/ocaml")), e.registerLanguage("openscad", require("./languages/openscad")), e.registerLanguage("oxygene", require("./languages/oxygene")), e.registerLanguage("parser3", require("./languages/parser3")), e.registerLanguage("pf", require("./languages/pf")), e.registerLanguage("php", require("./languages/php")), e.registerLanguage("powershell", require("./languages/powershell")), e.registerLanguage("processing", require("./languages/processing")), e.registerLanguage("profile", require("./languages/profile")), e.registerLanguage("prolog", require("./languages/prolog")), e.registerLanguage("protobuf", require("./languages/protobuf")), e.registerLanguage("puppet", require("./languages/puppet")), e.registerLanguage("python", require("./languages/python")), e.registerLanguage("q", require("./languages/q")), e.registerLanguage("r", require("./languages/r")), e.registerLanguage("rib", require("./languages/rib")), e.registerLanguage("roboconf", require("./languages/roboconf")), e.registerLanguage("rsl", require("./languages/rsl")), e.registerLanguage("ruleslanguage", require("./languages/ruleslanguage")), e.registerLanguage("rust", require("./languages/rust")), e.registerLanguage("scala", require("./languages/scala")), e.registerLanguage("scheme", require("./languages/scheme")), e.registerLanguage("scilab", require("./languages/scilab")), e.registerLanguage("scss", require("./languages/scss")), e.registerLanguage("smali", require("./languages/smali")), e.registerLanguage("smalltalk", require("./languages/smalltalk")), e.registerLanguage("sml", require("./languages/sml")), e.registerLanguage("sql", require("./languages/sql")), e.registerLanguage("stata", require("./languages/stata")), e.registerLanguage("step21", require("./languages/step21")), e.registerLanguage("stylus", require("./languages/stylus")), e.registerLanguage("swift", require("./languages/swift")), e.registerLanguage("tcl", require("./languages/tcl")), e.registerLanguage("tex", require("./languages/tex")), e.registerLanguage("thrift", require("./languages/thrift")), e.registerLanguage("tp", require("./languages/tp")), e.registerLanguage("twig", require("./languages/twig")), e.registerLanguage("typescript", require("./languages/typescript")), e.registerLanguage("vala", require("./languages/vala")), e.registerLanguage("vbnet", require("./languages/vbnet")), e.registerLanguage("vbscript", require("./languages/vbscript")), e.registerLanguage("vbscript-html", require("./languages/vbscript-html")), e.registerLanguage("verilog", require("./languages/verilog")), e.registerLanguage("vhdl", require("./languages/vhdl")), e.registerLanguage("vim", require("./languages/vim")), e.registerLanguage("x86asm", require("./languages/x86asm")), e.registerLanguage("xl", require("./languages/xl")), e.registerLanguage("xquery", require("./languages/xquery")), e.registerLanguage("zephir", require("./languages/zephir")), module.exports = e
    }, {
        "./highlight": 5,
        "./languages/1c": 7,
        "./languages/accesslog": 8,
        "./languages/actionscript": 9,
        "./languages/apache": 10,
        "./languages/applescript": 11,
        "./languages/armasm": 12,
        "./languages/asciidoc": 13,
        "./languages/aspectj": 14,
        "./languages/autohotkey": 15,
        "./languages/autoit": 16,
        "./languages/avrasm": 17,
        "./languages/axapta": 18,
        "./languages/bash": 19,
        "./languages/brainfuck": 20,
        "./languages/cal": 21,
        "./languages/capnproto": 22,
        "./languages/ceylon": 23,
        "./languages/clojure": 25,
        "./languages/clojure-repl": 24,
        "./languages/cmake": 26,
        "./languages/coffeescript": 27,
        "./languages/cpp": 28,
        "./languages/crystal": 29,
        "./languages/cs": 30,
        "./languages/css": 31,
        "./languages/d": 32,
        "./languages/dart": 33,
        "./languages/delphi": 34,
        "./languages/diff": 35,
        "./languages/django": 36,
        "./languages/dns": 37,
        "./languages/dockerfile": 38,
        "./languages/dos": 39,
        "./languages/dust": 40,
        "./languages/elixir": 41,
        "./languages/elm": 42,
        "./languages/erb": 43,
        "./languages/erlang": 45,
        "./languages/erlang-repl": 44,
        "./languages/fix": 46,
        "./languages/fortran": 47,
        "./languages/fsharp": 48,
        "./languages/gams": 49,
        "./languages/gcode": 50,
        "./languages/gherkin": 51,
        "./languages/glsl": 52,
        "./languages/go": 53,
        "./languages/golo": 54,
        "./languages/gradle": 55,
        "./languages/groovy": 56,
        "./languages/haml": 57,
        "./languages/handlebars": 58,
        "./languages/haskell": 59,
        "./languages/haxe": 60,
        "./languages/http": 61,
        "./languages/inform7": 62,
        "./languages/ini": 63,
        "./languages/irpf90": 64,
        "./languages/java": 65,
        "./languages/javascript": 66,
        "./languages/json": 67,
        "./languages/julia": 68,
        "./languages/kotlin": 69,
        "./languages/lasso": 70,
        "./languages/less": 71,
        "./languages/lisp": 72,
        "./languages/livecodeserver": 73,
        "./languages/livescript": 74,
        "./languages/lua": 75,
        "./languages/makefile": 76,
        "./languages/markdown": 77,
        "./languages/mathematica": 78,
        "./languages/matlab": 79,
        "./languages/mel": 80,
        "./languages/mercury": 81,
        "./languages/mizar": 82,
        "./languages/mojolicious": 83,
        "./languages/monkey": 84,
        "./languages/nginx": 85,
        "./languages/nimrod": 86,
        "./languages/nix": 87,
        "./languages/nsis": 88,
        "./languages/objectivec": 89,
        "./languages/ocaml": 90,
        "./languages/openscad": 91,
        "./languages/oxygene": 92,
        "./languages/parser3": 93,
        "./languages/perl": 94,
        "./languages/pf": 95,
        "./languages/php": 96,
        "./languages/powershell": 97,
        "./languages/processing": 98,
        "./languages/profile": 99,
        "./languages/prolog": 100,
        "./languages/protobuf": 101,
        "./languages/puppet": 102,
        "./languages/python": 103,
        "./languages/q": 104,
        "./languages/r": 105,
        "./languages/rib": 106,
        "./languages/roboconf": 107,
        "./languages/rsl": 108,
        "./languages/ruby": 109,
        "./languages/ruleslanguage": 110,
        "./languages/rust": 111,
        "./languages/scala": 112,
        "./languages/scheme": 113,
        "./languages/scilab": 114,
        "./languages/scss": 115,
        "./languages/smali": 116,
        "./languages/smalltalk": 117,
        "./languages/sml": 118,
        "./languages/sql": 119,
        "./languages/stata": 120,
        "./languages/step21": 121,
        "./languages/stylus": 122,
        "./languages/swift": 123,
        "./languages/tcl": 124,
        "./languages/tex": 125,
        "./languages/thrift": 126,
        "./languages/tp": 127,
        "./languages/twig": 128,
        "./languages/typescript": 129,
        "./languages/vala": 130,
        "./languages/vbnet": 131,
        "./languages/vbscript": 133,
        "./languages/vbscript-html": 132,
        "./languages/verilog": 134,
        "./languages/vhdl": 135,
        "./languages/vim": 136,
        "./languages/x86asm": 137,
        "./languages/xl": 138,
        "./languages/xml": 139,
        "./languages/xquery": 140,
        "./languages/zephir": 141
    }],
    7: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*",
                n = "возв�?а�? да�?а для если и или ина�?е ина�?еесли искл�?�?ение коне�?если коне�?поп�?�?ки коне�?п�?о�?ед�?�?�? коне�?�?�?нк�?ии коне�?�?икла конс�?ан�?а не пе�?ей�?и пе�?ем пе�?е�?исление по пока поп�?�?ка п�?е�?ва�?�? п�?одолжи�?�? п�?о�?ед�?�?а с�?�?ока �?огда �?с �?�?нк�?ия �?икл �?исло экспо�?�?",
                r = "ansitooem oemtoansi ввес�?ивидс�?бкон�?о ввес�?ида�?�? ввес�?изна�?ение ввес�?ипе�?е�?исление ввес�?ипе�?иод ввес�?ипланс�?е�?ов ввес�?ис�?�?ок�? ввес�?и�?исло воп�?ос восс�?анови�?�?зна�?ение в�?ег в�?б�?анн�?йпланс�?е�?ов в�?зва�?�?искл�?�?ение да�?агод да�?амеся�? да�?а�?исло добави�?�?меся�? заве�?�?и�?�?�?або�?�?сис�?ем�? заголовоксис�?ем�? запис�?ж�?�?нала�?егис�?�?а�?ии зап�?с�?и�?�?п�?иложение за�?икси�?ова�?�?�?�?анзак�?и�? зна�?ениевс�?�?ок�? зна�?ениевс�?�?ок�?вн�?�?�? зна�?ениев�?айл зна�?ениеизс�?�?оки зна�?ениеизс�?�?окивн�?�?�? зна�?ениеиз�?айла имякомп�?�?�?е�?а имяпол�?зова�?еля ка�?алогв�?еменн�?�?�?айлов ка�?алогиб ка�?алогпол�?зова�?еля ка�?алогп�?ог�?амм�? кодсимв командасис�?ем�? конгода коне�?пе�?иодаби коне�?�?асс�?и�?анногопе�?иодаби коне�?с�?анда�?�?ногоин�?е�?вала конква�?�?ала конмеся�?а коннедели лев лог лог10 макс максимал�?ноеколи�?ес�?вос�?бкон�?о мин монопол�?н�?й�?ежим названиеин�?е�?�?ейса названиенабо�?ап�?ав назна�?и�?�?вид назна�?и�?�?с�?е�? най�?и най�?ипоме�?енн�?ена�?даление най�?исс�?лки на�?алопе�?иодаби на�?алос�?анда�?�?ногоин�?е�?вала на�?а�?�?�?�?анзак�?и�? на�?года на�?ква�?�?ала на�?меся�?а на�?недели номе�?днягода номе�?днянедели номе�?неделигода н�?ег об�?або�?каожидания ок�? описаниео�?ибки основнойж�?�?нал�?ас�?е�?ов основнойпланс�?е�?ов основнойяз�?к о�?к�?�?�?�?�?о�?м�? о�?к�?�?�?�?�?о�?м�?модал�?но о�?мени�?�?�?�?анзак�?и�? о�?ис�?и�?�?окносооб�?ений пе�?иодс�?�? полноеимяпол�?зова�?еля пол�?�?и�?�?в�?емя�?а пол�?�?и�?�?да�?�?�?а пол�?�?и�?�?док�?мен�?�?а пол�?�?и�?�?зна�?енияо�?бо�?а пол�?�?и�?�?пози�?и�?�?а пол�?�?и�?�?п�?с�?оезна�?ение пол�?�?и�?�?�?а п�?ав п�?аводос�?�?па п�?ед�?п�?еждение п�?е�?иксав�?он�?ме�?а�?ии п�?с�?аяс�?�?ока п�?с�?оезна�?ение �?або�?аяда�?�?�?п�?с�?оезна�?ение �?або�?аяда�?а �?аздели�?ел�?с�?�?ани�? �?аздели�?ел�?с�?�?ок �?азм �?азоб�?а�?�?пози�?и�?док�?мен�?а �?асс�?и�?а�?�?�?егис�?�?�?на �?асс�?и�?а�?�?�?егис�?�?�?по сигнал симв символ�?аб�?ля�?ии созда�?�?об�?ек�? сок�?л сок�?лп сок�?п сооб�?и�?�? сос�?ояние со�?�?ани�?�?зна�?ение с�?ед с�?а�?�?свозв�?а�?а с�?�?длина с�?�?замени�?�? с�?�?коли�?ес�?вос�?�?ок с�?�?пол�?�?и�?�?с�?�?ок�?  с�?�?�?ислов�?ождений с�?о�?ми�?ова�?�?пози�?и�?док�?мен�?а с�?е�?покод�? �?ек�?�?аяда�?а �?ек�?�?еев�?емя �?ипзна�?ения �?ипзна�?енияс�?�? �?дали�?�?об�?ек�?�? �?с�?анови�?�?�?ана �?с�?анови�?�?�?апо �?икс�?аблон �?о�?ма�? �?ел �?аблон",
                i = {
                    className: "dquote",
                    begin: '""'
                },
                a = { className: "string", begin: '"', end: '"|$', contains: [i] },
                o = { className: "string", begin: "\\|", end: '"|$', contains: [i] };
            return {
                case_insensitive: !0,
                lexemes: t,
                keywords: { keyword: n, built_in: r },
                contains: [e.C_LINE_COMMENT_MODE, e.NUMBER_MODE, a, o, {
                    className: "function",
                    begin: "(п�?о�?ед�?�?а|�?�?нк�?ия)",
                    end: "$",
                    lexemes: t,
                    keywords: "п�?о�?ед�?�?а �?�?нк�?ия",
                    contains: [e.inherit(e.TITLE_MODE, { begin: t }), {
                        className: "tail",
                        endsWithParent: !0,
                        contains: [{
                            className: "params",
                            begin: "\\(",
                            end: "\\)",
                            lexemes: t,
                            keywords: "зна�?",
                            contains: [a, o]
                        }, {
                            className: "export",
                            begin: "экспо�?�?",
                            endsWithParent: !0,
                            lexemes: t,
                            keywords: "экспо�?�?",
                            contains: [e.C_LINE_COMMENT_MODE]
                        }]
                    }, e.C_LINE_COMMENT_MODE]
                }, { className: "preprocessor", begin: "#", end: "$" }, {
                    className: "date",
                    begin: "'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})'"
                }]
            }
        }
    }, {}],
    8: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                contains: [{
                    className: "number",
                    begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
                }, { className: "number", begin: "\\b\\d+\\b", relevance: 0 }, {
                    className: "string",
                    begin: '"(GET|POST|HEAD|PUT|DELETE|CONNECT|OPTIONS|PATCH|TRACE)',
                    end: '"',
                    keywords: "GET POST HEAD PUT DELETE CONNECT OPTIONS PATCH TRACE",
                    illegal: "\\n",
                    relevance: 10
                }, { className: "string", begin: /\[/, end: /\]/, illegal: "\\n" }, {
                    className: "string",
                    begin: '"',
                    end: '"',
                    illegal: "\\n"
                }]
            }
        }
    }, {}],
    9: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Z_$][a-zA-Z0-9_$]*",
                n = "([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)",
                r = { className: "rest_arg", begin: "[.]{3}", end: t, relevance: 10 };
            return {
                aliases: ["as"],
                keywords: {
                    keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
                    literal: "true false null undefined"
                },
                contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, {
                    className: "package",
                    beginKeywords: "package",
                    end: "{",
                    contains: [e.TITLE_MODE]
                }, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: "{",
                    excludeEnd: !0,
                    contains: [{ beginKeywords: "extends implements" }, e.TITLE_MODE]
                }, { className: "preprocessor", beginKeywords: "import include", end: ";" }, {
                    className: "function",
                    beginKeywords: "function",
                    end: "[{;]",
                    excludeEnd: !0,
                    illegal: "\\S",
                    contains: [e.TITLE_MODE, {
                        className: "params",
                        begin: "\\(",
                        end: "\\)",
                        contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r]
                    }, { className: "type", begin: ":", end: n, relevance: 10 }]
                }],
                illegal: /#/
            }
        }
    }, {}],
    10: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "number", begin: "[\\$%]\\d+" };
            return {
                aliases: ["apacheconf"],
                case_insensitive: !0,
                contains: [e.HASH_COMMENT_MODE, { className: "tag", begin: "</?", end: ">" }, {
                    className: "keyword",
                    begin: /\w+/,
                    relevance: 0,
                    keywords: { common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername" },
                    starts: {
                        end: /$/,
                        relevance: 0,
                        keywords: { literal: "on off all" },
                        contains: [{ className: "sqbracket", begin: "\\s\\[", end: "\\]$" }, {
                            className: "cbracket",
                            begin: "[\\$%]\\{",
                            end: "\\}",
                            contains: ["self", t]
                        }, t, e.QUOTE_STRING_MODE]
                    }
                }],
                illegal: /\S/
            }
        }
    }, {}],
    11: [function(require, module, exports) {
        module.exports = function(e) {
            var t = e.inherit(e.QUOTE_STRING_MODE, { illegal: "" }),
                n = { className: "params", begin: "\\(", end: "\\)", contains: ["self", e.C_NUMBER_MODE, t] },
                r = e.COMMENT("--", "$"),
                i = e.COMMENT("\\(\\*", "\\*\\)", { contains: ["self", r] }),
                a = [r, i, e.HASH_COMMENT_MODE];
            return {
                aliases: ["osascript"],
                keywords: {
                    keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the|0 then third through thru timeout times to transaction try until where while whose with without",
                    constant: "AppleScript false linefeed return pi quote result space tab true",
                    type: "alias application boolean class constant date file integer list number real record string text",
                    command: "activate beep count delay launch log offset read round run say summarize write",
                    property: "character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
                },
                contains: [t, e.C_NUMBER_MODE, { className: "type", begin: "\\bPOSIX file\\b" }, {
                    className: "command",
                    begin: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
                }, {
                    className: "constant",
                    begin: "\\b(text item delimiters|current application|missing value)\\b"
                }, {
                    className: "keyword",
                    begin: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"
                }, {
                    className: "property",
                    begin: "\\b(POSIX path|(date|time) string|quoted form)\\b"
                }, {
                    className: "function_start",
                    beginKeywords: "on",
                    illegal: "[${=;\\n]",
                    contains: [e.UNDERSCORE_TITLE_MODE, n]
                }].concat(a),
                illegal: "//|->|=>|\\[\\["
            }
        }
    }, {}],
    12: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                case_insensitive: !0,
                aliases: ["arm"],
                lexemes: "\\.?" + e.IDENT_RE,
                keywords: {
                    literal: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 pc lr sp ip sl sb fp a1 a2 a3 a4 v1 v2 v3 v4 v5 v6 v7 v8 f0 f1 f2 f3 f4 f5 f6 f7 p0 p1 p2 p3 p4 p5 p6 p7 p8 p9 p10 p11 p12 p13 p14 p15 c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 q0 q1 q2 q3 q4 q5 q6 q7 q8 q9 q10 q11 q12 q13 q14 q15 cpsr_c cpsr_x cpsr_s cpsr_f cpsr_cx cpsr_cxs cpsr_xs cpsr_xsf cpsr_sf cpsr_cxsf spsr_c spsr_x spsr_s spsr_f spsr_cx spsr_cxs spsr_xs spsr_xsf spsr_sf spsr_cxsf s0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 s16 s17 s18 s19 s20 s21 s22 s23 s24 s25 s26 s27 s28 s29 s30 s31 d0 d1 d2 d3 d4 d5 d6 d7 d8 d9 d10 d11 d12 d13 d14 d15 d16 d17 d18 d19 d20 d21 d22 d23 d24 d25 d26 d27 d28 d29 d30 d31 ",
                    preprocessor: ".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .arm .thumb .code16 .code32 .force_thumb .thumb_func .ltorg ALIAS ALIGN ARM AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN SPACE SUBT THUMB THUMBX TTL WHILE WEND ",
                    built_in: "{PC} {VAR} {TRUE} {FALSE} {OPT} {CONFIG} {ENDIAN} {CODESIZE} {CPU} {FPU} {ARCHITECTURE} {PCSTOREOFFSET} {ARMASM_VERSION} {INTER} {ROPI} {RWPI} {SWST} {NOSWST} . @ "
                },
                contains: [{
                    className: "keyword",
                    begin: "\\b(adc|(qd?|sh?|u[qh]?)?add(8|16)?|usada?8|(q|sh?|u[qh]?)?(as|sa)x|and|adrl?|sbc|rs[bc]|asr|b[lx]?|blx|bxj|cbn?z|tb[bh]|bic|bfc|bfi|[su]bfx|bkpt|cdp2?|clz|clrex|cmp|cmn|cpsi[ed]|cps|setend|dbg|dmb|dsb|eor|isb|it[te]{0,3}|lsl|lsr|ror|rrx|ldm(([id][ab])|f[ds])?|ldr((s|ex)?[bhd])?|movt?|mvn|mra|mar|mul|[us]mull|smul[bwt][bt]|smu[as]d|smmul|smmla|mla|umlaal|smlal?([wbt][bt]|d)|mls|smlsl?[ds]|smc|svc|sev|mia([bt]{2}|ph)?|mrr?c2?|mcrr2?|mrs|msr|orr|orn|pkh(tb|bt)|rbit|rev(16|sh)?|sel|[su]sat(16)?|nop|pop|push|rfe([id][ab])?|stm([id][ab])?|str(ex)?[bhd]?|(qd?)?sub|(sh?|q|u[qh]?)?sub(8|16)|[su]xt(a?h|a?b(16)?)|srs([id][ab])?|swpb?|swi|smi|tst|teq|wfe|wfi|yield)(eq|ne|cs|cc|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al|hs|lo)?[sptrx]?",
                    end: "\\s"
                }, e.COMMENT("[;@]", "$", { relevance: 0 }), e.C_BLOCK_COMMENT_MODE, e.QUOTE_STRING_MODE, {
                    className: "string",
                    begin: "'",
                    end: "[^\\\\]'",
                    relevance: 0
                }, { className: "title", begin: "\\|", end: "\\|", illegal: "\\n", relevance: 0 }, {
                    className: "number",
                    variants: [{ begin: "[#$=]?0x[0-9a-f]+" }, { begin: "[#$=]?0b[01]+" }, { begin: "[#$=]\\d+" }, { begin: "\\b\\d+" }],
                    relevance: 0
                }, {
                    className: "label",
                    variants: [{ begin: "^[a-z_\\.\\$][a-z0-9_\\.\\$]+" }, { begin: "^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:" }, { begin: "[=#]\\w+" }],
                    relevance: 0
                }]
            }
        }
    }, {}],
    13: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["adoc"],
                contains: [e.COMMENT("^/{4,}\\n", "\\n/{4,}$", { relevance: 10 }), e.COMMENT("^//", "$", { relevance: 0 }), {
                    className: "title",
                    begin: "^\\.\\w.*$"
                }, { begin: "^[=\\*]{4,}\\n", end: "\\n^[=\\*]{4,}$", relevance: 10 }, {
                    className: "header",
                    begin: "^(={1,5}) .+?( \\1)?$",
                    relevance: 10
                }, {
                    className: "header",
                    begin: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$",
                    relevance: 10
                }, {
                    className: "attribute",
                    begin: "^:.+?:",
                    end: "\\s",
                    excludeEnd: !0,
                    relevance: 10
                }, { className: "attribute", begin: "^\\[.+?\\]$", relevance: 0 }, {
                    className: "blockquote",
                    begin: "^_{4,}\\n",
                    end: "\\n_{4,}$",
                    relevance: 10
                }, {
                    className: "code",
                    begin: "^[\\-\\.]{4,}\\n",
                    end: "\\n[\\-\\.]{4,}$",
                    relevance: 10
                }, {
                    begin: "^\\+{4,}\\n",
                    end: "\\n\\+{4,}$",
                    contains: [{ begin: "<", end: ">", subLanguage: "xml", relevance: 0 }],
                    relevance: 10
                }, { className: "bullet", begin: "^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+" }, {
                    className: "label",
                    begin: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
                    relevance: 10
                }, {
                    className: "strong",
                    begin: "\\B\\*(?![\\*\\s])",
                    end: "(\\n{2}|\\*)",
                    contains: [{ begin: "\\\\*\\w", relevance: 0 }]
                }, {
                    className: "emphasis",
                    begin: "\\B'(?!['\\s])",
                    end: "(\\n{2}|')",
                    contains: [{ begin: "\\\\'\\w", relevance: 0 }],
                    relevance: 0
                }, {
                    className: "emphasis",
                    begin: "_(?![_\\s])",
                    end: "(\\n{2}|_)",
                    relevance: 0
                }, { className: "smartquote", variants: [{ begin: "``.+?''" }, { begin: "`.+?'" }] }, {
                    className: "code",
                    begin: "(`.+?`|\\+.+?\\+)",
                    relevance: 0
                }, { className: "code", begin: "^[ \\t]", end: "$", relevance: 0 }, {
                    className: "horizontal_rule",
                    begin: "^'{3,}[ \\t]*$",
                    relevance: 10
                }, {
                    begin: "(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]",
                    returnBegin: !0,
                    contains: [{ begin: "(link|image:?):", relevance: 0 }, {
                        className: "link_url",
                        begin: "\\w",
                        end: "[^\\[]+",
                        relevance: 0
                    }, {
                        className: "link_label",
                        begin: "\\[",
                        end: "\\]",
                        excludeBegin: !0,
                        excludeEnd: !0,
                        relevance: 0
                    }],
                    relevance: 10
                }]
            }
        }
    }, {}],
    14: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else extends implements break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws privileged aspectOf adviceexecution proceed cflowbelow cflow initialization preinitialization staticinitialization withincode target within execution getWithinTypeName handler thisJoinPoint thisJoinPointStaticPart thisEnclosingJoinPointStaticPart declare parents warning error soft precedence thisAspectInstance",
                n = "get set args call";
            return {
                keywords: t,
                illegal: /<\/|#/,
                contains: [e.COMMENT("/\\*\\*", "\\*/", {
                    relevance: 0,
                    contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
                }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    className: "aspect",
                    beginKeywords: "aspect",
                    end: /[{;=]/,
                    excludeEnd: !0,
                    illegal: /[:;"\[\]]/,
                    contains: [{ beginKeywords: "extends implements pertypewithin perthis pertarget percflowbelow percflow issingleton" }, e.UNDERSCORE_TITLE_MODE, {
                        begin: /\([^\)]*/,
                        end: /[)]+/,
                        keywords: t + " " + n,
                        excludeEnd: !1
                    }]
                }, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: /[{;=]/,
                    excludeEnd: !0,
                    relevance: 0,
                    keywords: "class interface",
                    illegal: /[:"\[\]]/,
                    contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
                }, {
                    beginKeywords: "pointcut after before around throwing returning",
                    end: /[)]/,
                    excludeEnd: !1,
                    illegal: /["\[\]]/,
                    contains: [{
                        begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                        returnBegin: !0,
                        contains: [e.UNDERSCORE_TITLE_MODE]
                    }]
                }, {
                    begin: /[:]/,
                    returnBegin: !0,
                    end: /[{;]/,
                    relevance: 0,
                    excludeEnd: !1,
                    keywords: t,
                    illegal: /["\[\]]/,
                    contains: [{ begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(", keywords: t + " " + n }, e.QUOTE_STRING_MODE]
                }, { beginKeywords: "new throw", relevance: 0 }, {
                    className: "function",
                    begin: /\w+ +\w+(\.)?\w+\s*\([^\)]*\)\s*((throws)[\w\s,]+)?[\{;]/,
                    returnBegin: !0,
                    end: /[{;=]/,
                    keywords: t,
                    excludeEnd: !0,
                    contains: [{
                        begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                        returnBegin: !0,
                        relevance: 0,
                        contains: [e.UNDERSCORE_TITLE_MODE]
                    }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        relevance: 0,
                        keywords: t,
                        contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE]
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                }, e.C_NUMBER_MODE, { className: "annotation", begin: "@[A-Za-z]+" }]
            }
        }
    }, {}],
    15: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "escape", begin: "`[\\s\\S]" },
                n = e.COMMENT(";", "$", { relevance: 0 }),
                r = [{ className: "built_in", begin: "A_[a-zA-Z0-9]+" }, {
                    className: "built_in",
                    beginKeywords: "ComSpec Clipboard ClipboardAll ErrorLevel"
                }];
            return {
                case_insensitive: !0,
                keywords: {
                    keyword: "Break Continue Else Gosub If Loop Return While",
                    literal: "A true false NOT AND OR"
                },
                contains: r.concat([t, e.inherit(e.QUOTE_STRING_MODE, { contains: [t] }), n, {
                    className: "number",
                    begin: e.NUMBER_RE,
                    relevance: 0
                }, { className: "var_expand", begin: "%", end: "%", illegal: "\\n", contains: [t] }, {
                    className: "label",
                    contains: [t],
                    variants: [{ begin: '^[^\\n";]+::(?!=)' }, { begin: '^[^\\n";]+:(?!=)', relevance: 0 }]
                }, { begin: ",\\s*,", relevance: 10 }])
            }
        }
    }, {}],
    16: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "ByRef Case Const ContinueCase ContinueLoop Default Dim Do Else ElseIf EndFunc EndIf EndSelect EndSwitch EndWith Enum Exit ExitLoop For Func Global If In Local Next ReDim Return Select Static Step Switch Then To Until Volatile WEnd While With",
                n = "True False And Null Not Or",
                r = "Abs ACos AdlibRegister AdlibUnRegister Asc AscW ASin Assign ATan AutoItSetOption AutoItWinGetTitle AutoItWinSetTitle Beep Binary BinaryLen BinaryMid BinaryToString BitAND BitNOT BitOR BitRotate BitShift BitXOR BlockInput Break Call CDTray Ceiling Chr ChrW ClipGet ClipPut ConsoleRead ConsoleWrite ConsoleWriteError ControlClick ControlCommand ControlDisable ControlEnable ControlFocus ControlGetFocus ControlGetHandle ControlGetPos ControlGetText ControlHide ControlListView ControlMove ControlSend ControlSetText ControlShow ControlTreeView Cos Dec DirCopy DirCreate DirGetSize DirMove DirRemove DllCall DllCallAddress DllCallbackFree DllCallbackGetPtr DllCallbackRegister DllClose DllOpen DllStructCreate DllStructGetData DllStructGetPtr DllStructGetSize DllStructSetData DriveGetDrive DriveGetFileSystem DriveGetLabel DriveGetSerial DriveGetType DriveMapAdd DriveMapDel DriveMapGet DriveSetLabel DriveSpaceFree DriveSpaceTotal DriveStatus EnvGet EnvSet EnvUpdate Eval Execute Exp FileChangeDir FileClose FileCopy FileCreateNTFSLink FileCreateShortcut FileDelete FileExists FileFindFirstFile FileFindNextFile FileFlush FileGetAttrib FileGetEncoding FileGetLongName FileGetPos FileGetShortcut FileGetShortName FileGetSize FileGetTime FileGetVersion FileInstall FileMove FileOpen FileOpenDialog FileRead FileReadLine FileReadToArray FileRecycle FileRecycleEmpty FileSaveDialog FileSelectFolder FileSetAttrib FileSetEnd FileSetPos FileSetTime FileWrite FileWriteLine Floor FtpSetProxy FuncName GUICreate GUICtrlCreateAvi GUICtrlCreateButton GUICtrlCreateCheckbox GUICtrlCreateCombo GUICtrlCreateContextMenu GUICtrlCreateDate GUICtrlCreateDummy GUICtrlCreateEdit GUICtrlCreateGraphic GUICtrlCreateGroup GUICtrlCreateIcon GUICtrlCreateInput GUICtrlCreateLabel GUICtrlCreateList GUICtrlCreateListView GUICtrlCreateListViewItem GUICtrlCreateMenu GUICtrlCreateMenuItem GUICtrlCreateMonthCal GUICtrlCreateObj GUICtrlCreatePic GUICtrlCreateProgress GUICtrlCreateRadio GUICtrlCreateSlider GUICtrlCreateTab GUICtrlCreateTabItem GUICtrlCreateTreeView GUICtrlCreateTreeViewItem GUICtrlCreateUpdown GUICtrlDelete GUICtrlGetHandle GUICtrlGetState GUICtrlRead GUICtrlRecvMsg GUICtrlRegisterListViewSort GUICtrlSendMsg GUICtrlSendToDummy GUICtrlSetBkColor GUICtrlSetColor GUICtrlSetCursor GUICtrlSetData GUICtrlSetDefBkColor GUICtrlSetDefColor GUICtrlSetFont GUICtrlSetGraphic GUICtrlSetImage GUICtrlSetLimit GUICtrlSetOnEvent GUICtrlSetPos GUICtrlSetResizing GUICtrlSetState GUICtrlSetStyle GUICtrlSetTip GUIDelete GUIGetCursorInfo GUIGetMsg GUIGetStyle GUIRegisterMsg GUISetAccelerators GUISetBkColor GUISetCoord GUISetCursor GUISetFont GUISetHelp GUISetIcon GUISetOnEvent GUISetState GUISetStyle GUIStartGroup GUISwitch Hex HotKeySet HttpSetProxy HttpSetUserAgent HWnd InetClose InetGet InetGetInfo InetGetSize InetRead IniDelete IniRead IniReadSection IniReadSectionNames IniRenameSection IniWrite IniWriteSection InputBox Int IsAdmin IsArray IsBinary IsBool IsDeclared IsDllStruct IsFloat IsFunc IsHWnd IsInt IsKeyword IsNumber IsObj IsPtr IsString Log MemGetStats Mod MouseClick MouseClickDrag MouseDown MouseGetCursor MouseGetPos MouseMove MouseUp MouseWheel MsgBox Number ObjCreate ObjCreateInterface ObjEvent ObjGet ObjName OnAutoItExitRegister OnAutoItExitUnRegister Opt Ping PixelChecksum PixelGetColor PixelSearch ProcessClose ProcessExists ProcessGetStats ProcessList ProcessSetPriority ProcessWait ProcessWaitClose ProgressOff ProgressOn ProgressSet Ptr Random RegDelete RegEnumKey RegEnumVal RegRead RegWrite Round Run RunAs RunAsWait RunWait Send SendKeepActive SetError SetExtended ShellExecute ShellExecuteWait Shutdown Sin Sleep SoundPlay SoundSetWaveVolume SplashImageOn SplashOff SplashTextOn Sqrt SRandom StatusbarGetText StderrRead StdinWrite StdioClose StdoutRead String StringAddCR StringCompare StringFormat StringFromASCIIArray StringInStr StringIsAlNum StringIsAlpha StringIsASCII StringIsDigit StringIsFloat StringIsInt StringIsLower StringIsSpace StringIsUpper StringIsXDigit StringLeft StringLen StringLower StringMid StringRegExp StringRegExpReplace StringReplace StringReverse StringRight StringSplit StringStripCR StringStripWS StringToASCIIArray StringToBinary StringTrimLeft StringTrimRight StringUpper Tan TCPAccept TCPCloseSocket TCPConnect TCPListen TCPNameToIP TCPRecv TCPSend TCPShutdown TCPStartup TimerDiff TimerInit ToolTip TrayCreateItem TrayCreateMenu TrayGetMsg TrayItemDelete TrayItemGetHandle TrayItemGetState TrayItemGetText TrayItemSetOnEvent TrayItemSetState TrayItemSetText TraySetClick TraySetIcon TraySetOnEvent TraySetPauseIcon TraySetState TraySetToolTip TrayTip UBound UDPBind UDPCloseSocket UDPOpen UDPRecv UDPSend UDPShutdown UDPStartup VarGetType WinActivate WinActive WinClose WinExists WinFlash WinGetCaretPos WinGetClassList WinGetClientSize WinGetHandle WinGetPos WinGetProcess WinGetState WinGetText WinGetTitle WinKill WinList WinMenuSelectItem WinMinimizeAll WinMinimizeAllUndo WinMove WinSetOnTop WinSetState WinSetTitle WinSetTrans WinWait WinWaitActive WinWaitClose WinWaitNotActive Array1DToHistogram ArrayAdd ArrayBinarySearch ArrayColDelete ArrayColInsert ArrayCombinations ArrayConcatenate ArrayDelete ArrayDisplay ArrayExtract ArrayFindAll ArrayInsert ArrayMax ArrayMaxIndex ArrayMin ArrayMinIndex ArrayPermute ArrayPop ArrayPush ArrayReverse ArraySearch ArrayShuffle ArraySort ArraySwap ArrayToClip ArrayToString ArrayTranspose ArrayTrim ArrayUnique Assert ChooseColor ChooseFont ClipBoard_ChangeChain ClipBoard_Close ClipBoard_CountFormats ClipBoard_Empty ClipBoard_EnumFormats ClipBoard_FormatStr ClipBoard_GetData ClipBoard_GetDataEx ClipBoard_GetFormatName ClipBoard_GetOpenWindow ClipBoard_GetOwner ClipBoard_GetPriorityFormat ClipBoard_GetSequenceNumber ClipBoard_GetViewer ClipBoard_IsFormatAvailable ClipBoard_Open ClipBoard_RegisterFormat ClipBoard_SetData ClipBoard_SetDataEx ClipBoard_SetViewer ClipPutFile ColorConvertHSLtoRGB ColorConvertRGBtoHSL ColorGetBlue ColorGetCOLORREF ColorGetGreen ColorGetRed ColorGetRGB ColorSetCOLORREF ColorSetRGB Crypt_DecryptData Crypt_DecryptFile Crypt_DeriveKey Crypt_DestroyKey Crypt_EncryptData Crypt_EncryptFile Crypt_GenRandom Crypt_HashData Crypt_HashFile Crypt_Shutdown Crypt_Startup DateAdd DateDayOfWeek DateDaysInMonth DateDiff DateIsLeapYear DateIsValid DateTimeFormat DateTimeSplit DateToDayOfWeek DateToDayOfWeekISO DateToDayValue DateToMonth Date_Time_CompareFileTime Date_Time_DOSDateTimeToArray Date_Time_DOSDateTimeToFileTime Date_Time_DOSDateTimeToStr Date_Time_DOSDateToArray Date_Time_DOSDateToStr Date_Time_DOSTimeToArray Date_Time_DOSTimeToStr Date_Time_EncodeFileTime Date_Time_EncodeSystemTime Date_Time_FileTimeToArray Date_Time_FileTimeToDOSDateTime Date_Time_FileTimeToLocalFileTime Date_Time_FileTimeToStr Date_Time_FileTimeToSystemTime Date_Time_GetFileTime Date_Time_GetLocalTime Date_Time_GetSystemTime Date_Time_GetSystemTimeAdjustment Date_Time_GetSystemTimeAsFileTime Date_Time_GetSystemTimes Date_Time_GetTickCount Date_Time_GetTimeZoneInformation Date_Time_LocalFileTimeToFileTime Date_Time_SetFileTime Date_Time_SetLocalTime Date_Time_SetSystemTime Date_Time_SetSystemTimeAdjustment Date_Time_SetTimeZoneInformation Date_Time_SystemTimeToArray Date_Time_SystemTimeToDateStr Date_Time_SystemTimeToDateTimeStr Date_Time_SystemTimeToFileTime Date_Time_SystemTimeToTimeStr Date_Time_SystemTimeToTzSpecificLocalTime Date_Time_TzSpecificLocalTimeToSystemTime DayValueToDate DebugBugReportEnv DebugCOMError DebugOut DebugReport DebugReportEx DebugReportVar DebugSetup Degree EventLog__Backup EventLog__Clear EventLog__Close EventLog__Count EventLog__DeregisterSource EventLog__Full EventLog__Notify EventLog__Oldest EventLog__Open EventLog__OpenBackup EventLog__Read EventLog__RegisterSource EventLog__Report Excel_BookAttach Excel_BookClose Excel_BookList Excel_BookNew Excel_BookOpen Excel_BookOpenText Excel_BookSave Excel_BookSaveAs Excel_Close Excel_ColumnToLetter Excel_ColumnToNumber Excel_ConvertFormula Excel_Export Excel_FilterGet Excel_FilterSet Excel_Open Excel_PictureAdd Excel_Print Excel_RangeCopyPaste Excel_RangeDelete Excel_RangeFind Excel_RangeInsert Excel_RangeLinkAddRemove Excel_RangeRead Excel_RangeReplace Excel_RangeSort Excel_RangeValidate Excel_RangeWrite Excel_SheetAdd Excel_SheetCopyMove Excel_SheetDelete Excel_SheetList FileCountLines FileCreate FileListToArray FileListToArrayRec FilePrint FileReadToArray FileWriteFromArray FileWriteLog FileWriteToLine FTP_Close FTP_Command FTP_Connect FTP_DecodeInternetStatus FTP_DirCreate FTP_DirDelete FTP_DirGetCurrent FTP_DirPutContents FTP_DirSetCurrent FTP_FileClose FTP_FileDelete FTP_FileGet FTP_FileGetSize FTP_FileOpen FTP_FilePut FTP_FileRead FTP_FileRename FTP_FileTimeLoHiToStr FTP_FindFileClose FTP_FindFileFirst FTP_FindFileNext FTP_GetLastResponseInfo FTP_ListToArray FTP_ListToArray2D FTP_ListToArrayEx FTP_Open FTP_ProgressDownload FTP_ProgressUpload FTP_SetStatusCallback GDIPlus_ArrowCapCreate GDIPlus_ArrowCapDispose GDIPlus_ArrowCapGetFillState GDIPlus_ArrowCapGetHeight GDIPlus_ArrowCapGetMiddleInset GDIPlus_ArrowCapGetWidth GDIPlus_ArrowCapSetFillState GDIPlus_ArrowCapSetHeight GDIPlus_ArrowCapSetMiddleInset GDIPlus_ArrowCapSetWidth GDIPlus_BitmapApplyEffect GDIPlus_BitmapApplyEffectEx GDIPlus_BitmapCloneArea GDIPlus_BitmapConvertFormat GDIPlus_BitmapCreateApplyEffect GDIPlus_BitmapCreateApplyEffectEx GDIPlus_BitmapCreateDIBFromBitmap GDIPlus_BitmapCreateFromFile GDIPlus_BitmapCreateFromGraphics GDIPlus_BitmapCreateFromHBITMAP GDIPlus_BitmapCreateFromHICON GDIPlus_BitmapCreateFromHICON32 GDIPlus_BitmapCreateFromMemory GDIPlus_BitmapCreateFromResource GDIPlus_BitmapCreateFromScan0 GDIPlus_BitmapCreateFromStream GDIPlus_BitmapCreateHBITMAPFromBitmap GDIPlus_BitmapDispose GDIPlus_BitmapGetHistogram GDIPlus_BitmapGetHistogramEx GDIPlus_BitmapGetHistogramSize GDIPlus_BitmapGetPixel GDIPlus_BitmapLockBits GDIPlus_BitmapSetPixel GDIPlus_BitmapUnlockBits GDIPlus_BrushClone GDIPlus_BrushCreateSolid GDIPlus_BrushDispose GDIPlus_BrushGetSolidColor GDIPlus_BrushGetType GDIPlus_BrushSetSolidColor GDIPlus_ColorMatrixCreate GDIPlus_ColorMatrixCreateGrayScale GDIPlus_ColorMatrixCreateNegative GDIPlus_ColorMatrixCreateSaturation GDIPlus_ColorMatrixCreateScale GDIPlus_ColorMatrixCreateTranslate GDIPlus_CustomLineCapClone GDIPlus_CustomLineCapCreate GDIPlus_CustomLineCapDispose GDIPlus_CustomLineCapGetStrokeCaps GDIPlus_CustomLineCapSetStrokeCaps GDIPlus_Decoders GDIPlus_DecodersGetCount GDIPlus_DecodersGetSize GDIPlus_DrawImageFX GDIPlus_DrawImageFXEx GDIPlus_DrawImagePoints GDIPlus_EffectCreate GDIPlus_EffectCreateBlur GDIPlus_EffectCreateBrightnessContrast GDIPlus_EffectCreateColorBalance GDIPlus_EffectCreateColorCurve GDIPlus_EffectCreateColorLUT GDIPlus_EffectCreateColorMatrix GDIPlus_EffectCreateHueSaturationLightness GDIPlus_EffectCreateLevels GDIPlus_EffectCreateRedEyeCorrection GDIPlus_EffectCreateSharpen GDIPlus_EffectCreateTint GDIPlus_EffectDispose GDIPlus_EffectGetParameters GDIPlus_EffectSetParameters GDIPlus_Encoders GDIPlus_EncodersGetCLSID GDIPlus_EncodersGetCount GDIPlus_EncodersGetParamList GDIPlus_EncodersGetParamListSize GDIPlus_EncodersGetSize GDIPlus_FontCreate GDIPlus_FontDispose GDIPlus_FontFamilyCreate GDIPlus_FontFamilyCreateFromCollection GDIPlus_FontFamilyDispose GDIPlus_FontFamilyGetCellAscent GDIPlus_FontFamilyGetCellDescent GDIPlus_FontFamilyGetEmHeight GDIPlus_FontFamilyGetLineSpacing GDIPlus_FontGetHeight GDIPlus_FontPrivateAddFont GDIPlus_FontPrivateAddMemoryFont GDIPlus_FontPrivateCollectionDispose GDIPlus_FontPrivateCreateCollection GDIPlus_GraphicsClear GDIPlus_GraphicsCreateFromHDC GDIPlus_GraphicsCreateFromHWND GDIPlus_GraphicsDispose GDIPlus_GraphicsDrawArc GDIPlus_GraphicsDrawBezier GDIPlus_GraphicsDrawClosedCurve GDIPlus_GraphicsDrawClosedCurve2 GDIPlus_GraphicsDrawCurve GDIPlus_GraphicsDrawCurve2 GDIPlus_GraphicsDrawEllipse GDIPlus_GraphicsDrawImage GDIPlus_GraphicsDrawImagePointsRect GDIPlus_GraphicsDrawImageRect GDIPlus_GraphicsDrawImageRectRect GDIPlus_GraphicsDrawLine GDIPlus_GraphicsDrawPath GDIPlus_GraphicsDrawPie GDIPlus_GraphicsDrawPolygon GDIPlus_GraphicsDrawRect GDIPlus_GraphicsDrawString GDIPlus_GraphicsDrawStringEx GDIPlus_GraphicsFillClosedCurve GDIPlus_GraphicsFillClosedCurve2 GDIPlus_GraphicsFillEllipse GDIPlus_GraphicsFillPath GDIPlus_GraphicsFillPie GDIPlus_GraphicsFillPolygon GDIPlus_GraphicsFillRect GDIPlus_GraphicsFillRegion GDIPlus_GraphicsGetCompositingMode GDIPlus_GraphicsGetCompositingQuality GDIPlus_GraphicsGetDC GDIPlus_GraphicsGetInterpolationMode GDIPlus_GraphicsGetSmoothingMode GDIPlus_GraphicsGetTransform GDIPlus_GraphicsMeasureCharacterRanges GDIPlus_GraphicsMeasureString GDIPlus_GraphicsReleaseDC GDIPlus_GraphicsResetClip GDIPlus_GraphicsResetTransform GDIPlus_GraphicsRestore GDIPlus_GraphicsRotateTransform GDIPlus_GraphicsSave GDIPlus_GraphicsScaleTransform GDIPlus_GraphicsSetClipPath GDIPlus_GraphicsSetClipRect GDIPlus_GraphicsSetClipRegion GDIPlus_GraphicsSetCompositingMode GDIPlus_GraphicsSetCompositingQuality GDIPlus_GraphicsSetInterpolationMode GDIPlus_GraphicsSetPixelOffsetMode GDIPlus_GraphicsSetSmoothingMode GDIPlus_GraphicsSetTextRenderingHint GDIPlus_GraphicsSetTransform GDIPlus_GraphicsTransformPoints GDIPlus_GraphicsTranslateTransform GDIPlus_HatchBrushCreate GDIPlus_HICONCreateFromBitmap GDIPlus_ImageAttributesCreate GDIPlus_ImageAttributesDispose GDIPlus_ImageAttributesSetColorKeys GDIPlus_ImageAttributesSetColorMatrix GDIPlus_ImageDispose GDIPlus_ImageGetDimension GDIPlus_ImageGetFlags GDIPlus_ImageGetGraphicsContext GDIPlus_ImageGetHeight GDIPlus_ImageGetHorizontalResolution GDIPlus_ImageGetPixelFormat GDIPlus_ImageGetRawFormat GDIPlus_ImageGetThumbnail GDIPlus_ImageGetType GDIPlus_ImageGetVerticalResolution GDIPlus_ImageGetWidth GDIPlus_ImageLoadFromFile GDIPlus_ImageLoadFromStream GDIPlus_ImageResize GDIPlus_ImageRotateFlip GDIPlus_ImageSaveToFile GDIPlus_ImageSaveToFileEx GDIPlus_ImageSaveToStream GDIPlus_ImageScale GDIPlus_LineBrushCreate GDIPlus_LineBrushCreateFromRect GDIPlus_LineBrushCreateFromRectWithAngle GDIPlus_LineBrushGetColors GDIPlus_LineBrushGetRect GDIPlus_LineBrushMultiplyTransform GDIPlus_LineBrushResetTransform GDIPlus_LineBrushSetBlend GDIPlus_LineBrushSetColors GDIPlus_LineBrushSetGammaCorrection GDIPlus_LineBrushSetLinearBlend GDIPlus_LineBrushSetPresetBlend GDIPlus_LineBrushSetSigmaBlend GDIPlus_LineBrushSetTransform GDIPlus_MatrixClone GDIPlus_MatrixCreate GDIPlus_MatrixDispose GDIPlus_MatrixGetElements GDIPlus_MatrixInvert GDIPlus_MatrixMultiply GDIPlus_MatrixRotate GDIPlus_MatrixScale GDIPlus_MatrixSetElements GDIPlus_MatrixShear GDIPlus_MatrixTransformPoints GDIPlus_MatrixTranslate GDIPlus_PaletteInitialize GDIPlus_ParamAdd GDIPlus_ParamInit GDIPlus_ParamSize GDIPlus_PathAddArc GDIPlus_PathAddBezier GDIPlus_PathAddClosedCurve GDIPlus_PathAddClosedCurve2 GDIPlus_PathAddCurve GDIPlus_PathAddCurve2 GDIPlus_PathAddCurve3 GDIPlus_PathAddEllipse GDIPlus_PathAddLine GDIPlus_PathAddLine2 GDIPlus_PathAddPath GDIPlus_PathAddPie GDIPlus_PathAddPolygon GDIPlus_PathAddRectangle GDIPlus_PathAddString GDIPlus_PathBrushCreate GDIPlus_PathBrushCreateFromPath GDIPlus_PathBrushGetCenterPoint GDIPlus_PathBrushGetFocusScales GDIPlus_PathBrushGetPointCount GDIPlus_PathBrushGetRect GDIPlus_PathBrushGetWrapMode GDIPlus_PathBrushMultiplyTransform GDIPlus_PathBrushResetTransform GDIPlus_PathBrushSetBlend GDIPlus_PathBrushSetCenterColor GDIPlus_PathBrushSetCenterPoint GDIPlus_PathBrushSetFocusScales GDIPlus_PathBrushSetGammaCorrection GDIPlus_PathBrushSetLinearBlend GDIPlus_PathBrushSetPresetBlend GDIPlus_PathBrushSetSigmaBlend GDIPlus_PathBrushSetSurroundColor GDIPlus_PathBrushSetSurroundColorsWithCount GDIPlus_PathBrushSetTransform GDIPlus_PathBrushSetWrapMode GDIPlus_PathClone GDIPlus_PathCloseFigure GDIPlus_PathCreate GDIPlus_PathCreate2 GDIPlus_PathDispose GDIPlus_PathFlatten GDIPlus_PathGetData GDIPlus_PathGetFillMode GDIPlus_PathGetLastPoint GDIPlus_PathGetPointCount GDIPlus_PathGetPoints GDIPlus_PathGetWorldBounds GDIPlus_PathIsOutlineVisiblePoint GDIPlus_PathIsVisiblePoint GDIPlus_PathIterCreate GDIPlus_PathIterDispose GDIPlus_PathIterGetSubpathCount GDIPlus_PathIterNextMarkerPath GDIPlus_PathIterNextSubpathPath GDIPlus_PathIterRewind GDIPlus_PathReset GDIPlus_PathReverse GDIPlus_PathSetFillMode GDIPlus_PathSetMarker GDIPlus_PathStartFigure GDIPlus_PathTransform GDIPlus_PathWarp GDIPlus_PathWiden GDIPlus_PathWindingModeOutline GDIPlus_PenCreate GDIPlus_PenCreate2 GDIPlus_PenDispose GDIPlus_PenGetAlignment GDIPlus_PenGetColor GDIPlus_PenGetCustomEndCap GDIPlus_PenGetDashCap GDIPlus_PenGetDashStyle GDIPlus_PenGetEndCap GDIPlus_PenGetMiterLimit GDIPlus_PenGetWidth GDIPlus_PenSetAlignment GDIPlus_PenSetColor GDIPlus_PenSetCustomEndCap GDIPlus_PenSetDashCap GDIPlus_PenSetDashStyle GDIPlus_PenSetEndCap GDIPlus_PenSetLineCap GDIPlus_PenSetLineJoin GDIPlus_PenSetMiterLimit GDIPlus_PenSetStartCap GDIPlus_PenSetWidth GDIPlus_RectFCreate GDIPlus_RegionClone GDIPlus_RegionCombinePath GDIPlus_RegionCombineRect GDIPlus_RegionCombineRegion GDIPlus_RegionCreate GDIPlus_RegionCreateFromPath GDIPlus_RegionCreateFromRect GDIPlus_RegionDispose GDIPlus_RegionGetBounds GDIPlus_RegionGetHRgn GDIPlus_RegionTransform GDIPlus_RegionTranslate GDIPlus_Shutdown GDIPlus_Startup GDIPlus_StringFormatCreate GDIPlus_StringFormatDispose GDIPlus_StringFormatGetMeasurableCharacterRangeCount GDIPlus_StringFormatSetAlign GDIPlus_StringFormatSetLineAlign GDIPlus_StringFormatSetMeasurableCharacterRanges GDIPlus_TextureCreate GDIPlus_TextureCreate2 GDIPlus_TextureCreateIA GetIP GUICtrlAVI_Close GUICtrlAVI_Create GUICtrlAVI_Destroy GUICtrlAVI_IsPlaying GUICtrlAVI_Open GUICtrlAVI_OpenEx GUICtrlAVI_Play GUICtrlAVI_Seek GUICtrlAVI_Show GUICtrlAVI_Stop GUICtrlButton_Click GUICtrlButton_Create GUICtrlButton_Destroy GUICtrlButton_Enable GUICtrlButton_GetCheck GUICtrlButton_GetFocus GUICtrlButton_GetIdealSize GUICtrlButton_GetImage GUICtrlButton_GetImageList GUICtrlButton_GetNote GUICtrlButton_GetNoteLength GUICtrlButton_GetSplitInfo GUICtrlButton_GetState GUICtrlButton_GetText GUICtrlButton_GetTextMargin GUICtrlButton_SetCheck GUICtrlButton_SetDontClick GUICtrlButton_SetFocus GUICtrlButton_SetImage GUICtrlButton_SetImageList GUICtrlButton_SetNote GUICtrlButton_SetShield GUICtrlButton_SetSize GUICtrlButton_SetSplitInfo GUICtrlButton_SetState GUICtrlButton_SetStyle GUICtrlButton_SetText GUICtrlButton_SetTextMargin GUICtrlButton_Show GUICtrlComboBoxEx_AddDir GUICtrlComboBoxEx_AddString GUICtrlComboBoxEx_BeginUpdate GUICtrlComboBoxEx_Create GUICtrlComboBoxEx_CreateSolidBitMap GUICtrlComboBoxEx_DeleteString GUICtrlComboBoxEx_Destroy GUICtrlComboBoxEx_EndUpdate GUICtrlComboBoxEx_FindStringExact GUICtrlComboBoxEx_GetComboBoxInfo GUICtrlComboBoxEx_GetComboControl GUICtrlComboBoxEx_GetCount GUICtrlComboBoxEx_GetCurSel GUICtrlComboBoxEx_GetDroppedControlRect GUICtrlComboBoxEx_GetDroppedControlRectEx GUICtrlComboBoxEx_GetDroppedState GUICtrlComboBoxEx_GetDroppedWidth GUICtrlComboBoxEx_GetEditControl GUICtrlComboBoxEx_GetEditSel GUICtrlComboBoxEx_GetEditText GUICtrlComboBoxEx_GetExtendedStyle GUICtrlComboBoxEx_GetExtendedUI GUICtrlComboBoxEx_GetImageList GUICtrlComboBoxEx_GetItem GUICtrlComboBoxEx_GetItemEx GUICtrlComboBoxEx_GetItemHeight GUICtrlComboBoxEx_GetItemImage GUICtrlComboBoxEx_GetItemIndent GUICtrlComboBoxEx_GetItemOverlayImage GUICtrlComboBoxEx_GetItemParam GUICtrlComboBoxEx_GetItemSelectedImage GUICtrlComboBoxEx_GetItemText GUICtrlComboBoxEx_GetItemTextLen GUICtrlComboBoxEx_GetList GUICtrlComboBoxEx_GetListArray GUICtrlComboBoxEx_GetLocale GUICtrlComboBoxEx_GetLocaleCountry GUICtrlComboBoxEx_GetLocaleLang GUICtrlComboBoxEx_GetLocalePrimLang GUICtrlComboBoxEx_GetLocaleSubLang GUICtrlComboBoxEx_GetMinVisible GUICtrlComboBoxEx_GetTopIndex GUICtrlComboBoxEx_GetUnicode GUICtrlComboBoxEx_InitStorage GUICtrlComboBoxEx_InsertString GUICtrlComboBoxEx_LimitText GUICtrlComboBoxEx_ReplaceEditSel GUICtrlComboBoxEx_ResetContent GUICtrlComboBoxEx_SetCurSel GUICtrlComboBoxEx_SetDroppedWidth GUICtrlComboBoxEx_SetEditSel GUICtrlComboBoxEx_SetEditText GUICtrlComboBoxEx_SetExtendedStyle GUICtrlComboBoxEx_SetExtendedUI GUICtrlComboBoxEx_SetImageList GUICtrlComboBoxEx_SetItem GUICtrlComboBoxEx_SetItemEx GUICtrlComboBoxEx_SetItemHeight GUICtrlComboBoxEx_SetItemImage GUICtrlComboBoxEx_SetItemIndent GUICtrlComboBoxEx_SetItemOverlayImage GUICtrlComboBoxEx_SetItemParam GUICtrlComboBoxEx_SetItemSelectedImage GUICtrlComboBoxEx_SetMinVisible GUICtrlComboBoxEx_SetTopIndex GUICtrlComboBoxEx_SetUnicode GUICtrlComboBoxEx_ShowDropDown GUICtrlComboBox_AddDir GUICtrlComboBox_AddString GUICtrlComboBox_AutoComplete GUICtrlComboBox_BeginUpdate GUICtrlComboBox_Create GUICtrlComboBox_DeleteString GUICtrlComboBox_Destroy GUICtrlComboBox_EndUpdate GUICtrlComboBox_FindString GUICtrlComboBox_FindStringExact GUICtrlComboBox_GetComboBoxInfo GUICtrlComboBox_GetCount GUICtrlComboBox_GetCueBanner GUICtrlComboBox_GetCurSel GUICtrlComboBox_GetDroppedControlRect GUICtrlComboBox_GetDroppedControlRectEx GUICtrlComboBox_GetDroppedState GUICtrlComboBox_GetDroppedWidth GUICtrlComboBox_GetEditSel GUICtrlComboBox_GetEditText GUICtrlComboBox_GetExtendedUI GUICtrlComboBox_GetHorizontalExtent GUICtrlComboBox_GetItemHeight GUICtrlComboBox_GetLBText GUICtrlComboBox_GetLBTextLen GUICtrlComboBox_GetList GUICtrlComboBox_GetListArray GUICtrlComboBox_GetLocale GUICtrlComboBox_GetLocaleCountry GUICtrlComboBox_GetLocaleLang GUICtrlComboBox_GetLocalePrimLang GUICtrlComboBox_GetLocaleSubLang GUICtrlComboBox_GetMinVisible GUICtrlComboBox_GetTopIndex GUICtrlComboBox_InitStorage GUICtrlComboBox_InsertString GUICtrlComboBox_LimitText GUICtrlComboBox_ReplaceEditSel GUICtrlComboBox_ResetContent GUICtrlComboBox_SelectString GUICtrlComboBox_SetCueBanner GUICtrlComboBox_SetCurSel GUICtrlComboBox_SetDroppedWidth GUICtrlComboBox_SetEditSel GUICtrlComboBox_SetEditText GUICtrlComboBox_SetExtendedUI GUICtrlComboBox_SetHorizontalExtent GUICtrlComboBox_SetItemHeight GUICtrlComboBox_SetMinVisible GUICtrlComboBox_SetTopIndex GUICtrlComboBox_ShowDropDown GUICtrlDTP_Create GUICtrlDTP_Destroy GUICtrlDTP_GetMCColor GUICtrlDTP_GetMCFont GUICtrlDTP_GetMonthCal GUICtrlDTP_GetRange GUICtrlDTP_GetRangeEx GUICtrlDTP_GetSystemTime GUICtrlDTP_GetSystemTimeEx GUICtrlDTP_SetFormat GUICtrlDTP_SetMCColor GUICtrlDTP_SetMCFont GUICtrlDTP_SetRange GUICtrlDTP_SetRangeEx GUICtrlDTP_SetSystemTime GUICtrlDTP_SetSystemTimeEx GUICtrlEdit_AppendText GUICtrlEdit_BeginUpdate GUICtrlEdit_CanUndo GUICtrlEdit_CharFromPos GUICtrlEdit_Create GUICtrlEdit_Destroy GUICtrlEdit_EmptyUndoBuffer GUICtrlEdit_EndUpdate GUICtrlEdit_Find GUICtrlEdit_FmtLines GUICtrlEdit_GetCueBanner GUICtrlEdit_GetFirstVisibleLine GUICtrlEdit_GetLimitText GUICtrlEdit_GetLine GUICtrlEdit_GetLineCount GUICtrlEdit_GetMargins GUICtrlEdit_GetModify GUICtrlEdit_GetPasswordChar GUICtrlEdit_GetRECT GUICtrlEdit_GetRECTEx GUICtrlEdit_GetSel GUICtrlEdit_GetText GUICtrlEdit_GetTextLen GUICtrlEdit_HideBalloonTip GUICtrlEdit_InsertText GUICtrlEdit_LineFromChar GUICtrlEdit_LineIndex GUICtrlEdit_LineLength GUICtrlEdit_LineScroll GUICtrlEdit_PosFromChar GUICtrlEdit_ReplaceSel GUICtrlEdit_Scroll GUICtrlEdit_SetCueBanner GUICtrlEdit_SetLimitText GUICtrlEdit_SetMargins GUICtrlEdit_SetModify GUICtrlEdit_SetPasswordChar GUICtrlEdit_SetReadOnly GUICtrlEdit_SetRECT GUICtrlEdit_SetRECTEx GUICtrlEdit_SetRECTNP GUICtrlEdit_SetRectNPEx GUICtrlEdit_SetSel GUICtrlEdit_SetTabStops GUICtrlEdit_SetText GUICtrlEdit_ShowBalloonTip GUICtrlEdit_Undo GUICtrlHeader_AddItem GUICtrlHeader_ClearFilter GUICtrlHeader_ClearFilterAll GUICtrlHeader_Create GUICtrlHeader_CreateDragImage GUICtrlHeader_DeleteItem GUICtrlHeader_Destroy GUICtrlHeader_EditFilter GUICtrlHeader_GetBitmapMargin GUICtrlHeader_GetImageList GUICtrlHeader_GetItem GUICtrlHeader_GetItemAlign GUICtrlHeader_GetItemBitmap GUICtrlHeader_GetItemCount GUICtrlHeader_GetItemDisplay GUICtrlHeader_GetItemFlags GUICtrlHeader_GetItemFormat GUICtrlHeader_GetItemImage GUICtrlHeader_GetItemOrder GUICtrlHeader_GetItemParam GUICtrlHeader_GetItemRect GUICtrlHeader_GetItemRectEx GUICtrlHeader_GetItemText GUICtrlHeader_GetItemWidth GUICtrlHeader_GetOrderArray GUICtrlHeader_GetUnicodeFormat GUICtrlHeader_HitTest GUICtrlHeader_InsertItem GUICtrlHeader_Layout GUICtrlHeader_OrderToIndex GUICtrlHeader_SetBitmapMargin GUICtrlHeader_SetFilterChangeTimeout GUICtrlHeader_SetHotDivider GUICtrlHeader_SetImageList GUICtrlHeader_SetItem GUICtrlHeader_SetItemAlign GUICtrlHeader_SetItemBitmap GUICtrlHeader_SetItemDisplay GUICtrlHeader_SetItemFlags GUICtrlHeader_SetItemFormat GUICtrlHeader_SetItemImage GUICtrlHeader_SetItemOrder GUICtrlHeader_SetItemParam GUICtrlHeader_SetItemText GUICtrlHeader_SetItemWidth GUICtrlHeader_SetOrderArray GUICtrlHeader_SetUnicodeFormat GUICtrlIpAddress_ClearAddress GUICtrlIpAddress_Create GUICtrlIpAddress_Destroy GUICtrlIpAddress_Get GUICtrlIpAddress_GetArray GUICtrlIpAddress_GetEx GUICtrlIpAddress_IsBlank GUICtrlIpAddress_Set GUICtrlIpAddress_SetArray GUICtrlIpAddress_SetEx GUICtrlIpAddress_SetFocus GUICtrlIpAddress_SetFont GUICtrlIpAddress_SetRange GUICtrlIpAddress_ShowHide GUICtrlListBox_AddFile GUICtrlListBox_AddString GUICtrlListBox_BeginUpdate GUICtrlListBox_ClickItem GUICtrlListBox_Create GUICtrlListBox_DeleteString GUICtrlListBox_Destroy GUICtrlListBox_Dir GUICtrlListBox_EndUpdate GUICtrlListBox_FindInText GUICtrlListBox_FindString GUICtrlListBox_GetAnchorIndex GUICtrlListBox_GetCaretIndex GUICtrlListBox_GetCount GUICtrlListBox_GetCurSel GUICtrlListBox_GetHorizontalExtent GUICtrlListBox_GetItemData GUICtrlListBox_GetItemHeight GUICtrlListBox_GetItemRect GUICtrlListBox_GetItemRectEx GUICtrlListBox_GetListBoxInfo GUICtrlListBox_GetLocale GUICtrlListBox_GetLocaleCountry GUICtrlListBox_GetLocaleLang GUICtrlListBox_GetLocalePrimLang GUICtrlListBox_GetLocaleSubLang GUICtrlListBox_GetSel GUICtrlListBox_GetSelCount GUICtrlListBox_GetSelItems GUICtrlListBox_GetSelItemsText GUICtrlListBox_GetText GUICtrlListBox_GetTextLen GUICtrlListBox_GetTopIndex GUICtrlListBox_InitStorage GUICtrlListBox_InsertString GUICtrlListBox_ItemFromPoint GUICtrlListBox_ReplaceString GUICtrlListBox_ResetContent GUICtrlListBox_SelectString GUICtrlListBox_SelItemRange GUICtrlListBox_SelItemRangeEx GUICtrlListBox_SetAnchorIndex GUICtrlListBox_SetCaretIndex GUICtrlListBox_SetColumnWidth GUICtrlListBox_SetCurSel GUICtrlListBox_SetHorizontalExtent GUICtrlListBox_SetItemData GUICtrlListBox_SetItemHeight GUICtrlListBox_SetLocale GUICtrlListBox_SetSel GUICtrlListBox_SetTabStops GUICtrlListBox_SetTopIndex GUICtrlListBox_Sort GUICtrlListBox_SwapString GUICtrlListBox_UpdateHScroll GUICtrlListView_AddArray GUICtrlListView_AddColumn GUICtrlListView_AddItem GUICtrlListView_AddSubItem GUICtrlListView_ApproximateViewHeight GUICtrlListView_ApproximateViewRect GUICtrlListView_ApproximateViewWidth GUICtrlListView_Arrange GUICtrlListView_BeginUpdate GUICtrlListView_CancelEditLabel GUICtrlListView_ClickItem GUICtrlListView_CopyItems GUICtrlListView_Create GUICtrlListView_CreateDragImage GUICtrlListView_CreateSolidBitMap GUICtrlListView_DeleteAllItems GUICtrlListView_DeleteColumn GUICtrlListView_DeleteItem GUICtrlListView_DeleteItemsSelected GUICtrlListView_Destroy GUICtrlListView_DrawDragImage GUICtrlListView_EditLabel GUICtrlListView_EnableGroupView GUICtrlListView_EndUpdate GUICtrlListView_EnsureVisible GUICtrlListView_FindInText GUICtrlListView_FindItem GUICtrlListView_FindNearest GUICtrlListView_FindParam GUICtrlListView_FindText GUICtrlListView_GetBkColor GUICtrlListView_GetBkImage GUICtrlListView_GetCallbackMask GUICtrlListView_GetColumn GUICtrlListView_GetColumnCount GUICtrlListView_GetColumnOrder GUICtrlListView_GetColumnOrderArray GUICtrlListView_GetColumnWidth GUICtrlListView_GetCounterPage GUICtrlListView_GetEditControl GUICtrlListView_GetExtendedListViewStyle GUICtrlListView_GetFocusedGroup GUICtrlListView_GetGroupCount GUICtrlListView_GetGroupInfo GUICtrlListView_GetGroupInfoByIndex GUICtrlListView_GetGroupRect GUICtrlListView_GetGroupViewEnabled GUICtrlListView_GetHeader GUICtrlListView_GetHotCursor GUICtrlListView_GetHotItem GUICtrlListView_GetHoverTime GUICtrlListView_GetImageList GUICtrlListView_GetISearchString GUICtrlListView_GetItem GUICtrlListView_GetItemChecked GUICtrlListView_GetItemCount GUICtrlListView_GetItemCut GUICtrlListView_GetItemDropHilited GUICtrlListView_GetItemEx GUICtrlListView_GetItemFocused GUICtrlListView_GetItemGroupID GUICtrlListView_GetItemImage GUICtrlListView_GetItemIndent GUICtrlListView_GetItemParam GUICtrlListView_GetItemPosition GUICtrlListView_GetItemPositionX GUICtrlListView_GetItemPositionY GUICtrlListView_GetItemRect GUICtrlListView_GetItemRectEx GUICtrlListView_GetItemSelected GUICtrlListView_GetItemSpacing GUICtrlListView_GetItemSpacingX GUICtrlListView_GetItemSpacingY GUICtrlListView_GetItemState GUICtrlListView_GetItemStateImage GUICtrlListView_GetItemText GUICtrlListView_GetItemTextArray GUICtrlListView_GetItemTextString GUICtrlListView_GetNextItem GUICtrlListView_GetNumberOfWorkAreas GUICtrlListView_GetOrigin GUICtrlListView_GetOriginX GUICtrlListView_GetOriginY GUICtrlListView_GetOutlineColor GUICtrlListView_GetSelectedColumn GUICtrlListView_GetSelectedCount GUICtrlListView_GetSelectedIndices GUICtrlListView_GetSelectionMark GUICtrlListView_GetStringWidth GUICtrlListView_GetSubItemRect GUICtrlListView_GetTextBkColor GUICtrlListView_GetTextColor GUICtrlListView_GetToolTips GUICtrlListView_GetTopIndex GUICtrlListView_GetUnicodeFormat GUICtrlListView_GetView GUICtrlListView_GetViewDetails GUICtrlListView_GetViewLarge GUICtrlListView_GetViewList GUICtrlListView_GetViewRect GUICtrlListView_GetViewSmall GUICtrlListView_GetViewTile GUICtrlListView_HideColumn GUICtrlListView_HitTest GUICtrlListView_InsertColumn GUICtrlListView_InsertGroup GUICtrlListView_InsertItem GUICtrlListView_JustifyColumn GUICtrlListView_MapIDToIndex GUICtrlListView_MapIndexToID GUICtrlListView_RedrawItems GUICtrlListView_RegisterSortCallBack GUICtrlListView_RemoveAllGroups GUICtrlListView_RemoveGroup GUICtrlListView_Scroll GUICtrlListView_SetBkColor GUICtrlListView_SetBkImage GUICtrlListView_SetCallBackMask GUICtrlListView_SetColumn GUICtrlListView_SetColumnOrder GUICtrlListView_SetColumnOrderArray GUICtrlListView_SetColumnWidth GUICtrlListView_SetExtendedListViewStyle GUICtrlListView_SetGroupInfo GUICtrlListView_SetHotItem GUICtrlListView_SetHoverTime GUICtrlListView_SetIconSpacing GUICtrlListView_SetImageList GUICtrlListView_SetItem GUICtrlListView_SetItemChecked GUICtrlListView_SetItemCount GUICtrlListView_SetItemCut GUICtrlListView_SetItemDropHilited GUICtrlListView_SetItemEx GUICtrlListView_SetItemFocused GUICtrlListView_SetItemGroupID GUICtrlListView_SetItemImage GUICtrlListView_SetItemIndent GUICtrlListView_SetItemParam GUICtrlListView_SetItemPosition GUICtrlListView_SetItemPosition32 GUICtrlListView_SetItemSelected GUICtrlListView_SetItemState GUICtrlListView_SetItemStateImage GUICtrlListView_SetItemText GUICtrlListView_SetOutlineColor GUICtrlListView_SetSelectedColumn GUICtrlListView_SetSelectionMark GUICtrlListView_SetTextBkColor GUICtrlListView_SetTextColor GUICtrlListView_SetToolTips GUICtrlListView_SetUnicodeFormat GUICtrlListView_SetView GUICtrlListView_SetWorkAreas GUICtrlListView_SimpleSort GUICtrlListView_SortItems GUICtrlListView_SubItemHitTest GUICtrlListView_UnRegisterSortCallBack GUICtrlMenu_AddMenuItem GUICtrlMenu_AppendMenu GUICtrlMenu_CalculatePopupWindowPosition GUICtrlMenu_CheckMenuItem GUICtrlMenu_CheckRadioItem GUICtrlMenu_CreateMenu GUICtrlMenu_CreatePopup GUICtrlMenu_DeleteMenu GUICtrlMenu_DestroyMenu GUICtrlMenu_DrawMenuBar GUICtrlMenu_EnableMenuItem GUICtrlMenu_FindItem GUICtrlMenu_FindParent GUICtrlMenu_GetItemBmp GUICtrlMenu_GetItemBmpChecked GUICtrlMenu_GetItemBmpUnchecked GUICtrlMenu_GetItemChecked GUICtrlMenu_GetItemCount GUICtrlMenu_GetItemData GUICtrlMenu_GetItemDefault GUICtrlMenu_GetItemDisabled GUICtrlMenu_GetItemEnabled GUICtrlMenu_GetItemGrayed GUICtrlMenu_GetItemHighlighted GUICtrlMenu_GetItemID GUICtrlMenu_GetItemInfo GUICtrlMenu_GetItemRect GUICtrlMenu_GetItemRectEx GUICtrlMenu_GetItemState GUICtrlMenu_GetItemStateEx GUICtrlMenu_GetItemSubMenu GUICtrlMenu_GetItemText GUICtrlMenu_GetItemType GUICtrlMenu_GetMenu GUICtrlMenu_GetMenuBackground GUICtrlMenu_GetMenuBarInfo GUICtrlMenu_GetMenuContextHelpID GUICtrlMenu_GetMenuData GUICtrlMenu_GetMenuDefaultItem GUICtrlMenu_GetMenuHeight GUICtrlMenu_GetMenuInfo GUICtrlMenu_GetMenuStyle GUICtrlMenu_GetSystemMenu GUICtrlMenu_InsertMenuItem GUICtrlMenu_InsertMenuItemEx GUICtrlMenu_IsMenu GUICtrlMenu_LoadMenu GUICtrlMenu_MapAccelerator GUICtrlMenu_MenuItemFromPoint GUICtrlMenu_RemoveMenu GUICtrlMenu_SetItemBitmaps GUICtrlMenu_SetItemBmp GUICtrlMenu_SetItemBmpChecked GUICtrlMenu_SetItemBmpUnchecked GUICtrlMenu_SetItemChecked GUICtrlMenu_SetItemData GUICtrlMenu_SetItemDefault GUICtrlMenu_SetItemDisabled GUICtrlMenu_SetItemEnabled GUICtrlMenu_SetItemGrayed GUICtrlMenu_SetItemHighlighted GUICtrlMenu_SetItemID GUICtrlMenu_SetItemInfo GUICtrlMenu_SetItemState GUICtrlMenu_SetItemSubMenu GUICtrlMenu_SetItemText GUICtrlMenu_SetItemType GUICtrlMenu_SetMenu GUICtrlMenu_SetMenuBackground GUICtrlMenu_SetMenuContextHelpID GUICtrlMenu_SetMenuData GUICtrlMenu_SetMenuDefaultItem GUICtrlMenu_SetMenuHeight GUICtrlMenu_SetMenuInfo GUICtrlMenu_SetMenuStyle GUICtrlMenu_TrackPopupMenu GUICtrlMonthCal_Create GUICtrlMonthCal_Destroy GUICtrlMonthCal_GetCalendarBorder GUICtrlMonthCal_GetCalendarCount GUICtrlMonthCal_GetColor GUICtrlMonthCal_GetColorArray GUICtrlMonthCal_GetCurSel GUICtrlMonthCal_GetCurSelStr GUICtrlMonthCal_GetFirstDOW GUICtrlMonthCal_GetFirstDOWStr GUICtrlMonthCal_GetMaxSelCount GUICtrlMonthCal_GetMaxTodayWidth GUICtrlMonthCal_GetMinReqHeight GUICtrlMonthCal_GetMinReqRect GUICtrlMonthCal_GetMinReqRectArray GUICtrlMonthCal_GetMinReqWidth GUICtrlMonthCal_GetMonthDelta GUICtrlMonthCal_GetMonthRange GUICtrlMonthCal_GetMonthRangeMax GUICtrlMonthCal_GetMonthRangeMaxStr GUICtrlMonthCal_GetMonthRangeMin GUICtrlMonthCal_GetMonthRangeMinStr GUICtrlMonthCal_GetMonthRangeSpan GUICtrlMonthCal_GetRange GUICtrlMonthCal_GetRangeMax GUICtrlMonthCal_GetRangeMaxStr GUICtrlMonthCal_GetRangeMin GUICtrlMonthCal_GetRangeMinStr GUICtrlMonthCal_GetSelRange GUICtrlMonthCal_GetSelRangeMax GUICtrlMonthCal_GetSelRangeMaxStr GUICtrlMonthCal_GetSelRangeMin GUICtrlMonthCal_GetSelRangeMinStr GUICtrlMonthCal_GetToday GUICtrlMonthCal_GetTodayStr GUICtrlMonthCal_GetUnicodeFormat GUICtrlMonthCal_HitTest GUICtrlMonthCal_SetCalendarBorder GUICtrlMonthCal_SetColor GUICtrlMonthCal_SetCurSel GUICtrlMonthCal_SetDayState GUICtrlMonthCal_SetFirstDOW GUICtrlMonthCal_SetMaxSelCount GUICtrlMonthCal_SetMonthDelta GUICtrlMonthCal_SetRange GUICtrlMonthCal_SetSelRange GUICtrlMonthCal_SetToday GUICtrlMonthCal_SetUnicodeFormat GUICtrlRebar_AddBand GUICtrlRebar_AddToolBarBand GUICtrlRebar_BeginDrag GUICtrlRebar_Create GUICtrlRebar_DeleteBand GUICtrlRebar_Destroy GUICtrlRebar_DragMove GUICtrlRebar_EndDrag GUICtrlRebar_GetBandBackColor GUICtrlRebar_GetBandBorders GUICtrlRebar_GetBandBordersEx GUICtrlRebar_GetBandChildHandle GUICtrlRebar_GetBandChildSize GUICtrlRebar_GetBandCount GUICtrlRebar_GetBandForeColor GUICtrlRebar_GetBandHeaderSize GUICtrlRebar_GetBandID GUICtrlRebar_GetBandIdealSize GUICtrlRebar_GetBandLength GUICtrlRebar_GetBandLParam GUICtrlRebar_GetBandMargins GUICtrlRebar_GetBandMarginsEx GUICtrlRebar_GetBandRect GUICtrlRebar_GetBandRectEx GUICtrlRebar_GetBandStyle GUICtrlRebar_GetBandStyleBreak GUICtrlRebar_GetBandStyleChildEdge GUICtrlRebar_GetBandStyleFixedBMP GUICtrlRebar_GetBandStyleFixedSize GUICtrlRebar_GetBandStyleGripperAlways GUICtrlRebar_GetBandStyleHidden GUICtrlRebar_GetBandStyleHideTitle GUICtrlRebar_GetBandStyleNoGripper GUICtrlRebar_GetBandStyleTopAlign GUICtrlRebar_GetBandStyleUseChevron GUICtrlRebar_GetBandStyleVariableHeight GUICtrlRebar_GetBandText GUICtrlRebar_GetBarHeight GUICtrlRebar_GetBarInfo GUICtrlRebar_GetBKColor GUICtrlRebar_GetColorScheme GUICtrlRebar_GetRowCount GUICtrlRebar_GetRowHeight GUICtrlRebar_GetTextColor GUICtrlRebar_GetToolTips GUICtrlRebar_GetUnicodeFormat GUICtrlRebar_HitTest GUICtrlRebar_IDToIndex GUICtrlRebar_MaximizeBand GUICtrlRebar_MinimizeBand GUICtrlRebar_MoveBand GUICtrlRebar_SetBandBackColor GUICtrlRebar_SetBandForeColor GUICtrlRebar_SetBandHeaderSize GUICtrlRebar_SetBandID GUICtrlRebar_SetBandIdealSize GUICtrlRebar_SetBandLength GUICtrlRebar_SetBandLParam GUICtrlRebar_SetBandStyle GUICtrlRebar_SetBandStyleBreak GUICtrlRebar_SetBandStyleChildEdge GUICtrlRebar_SetBandStyleFixedBMP GUICtrlRebar_SetBandStyleFixedSize GUICtrlRebar_SetBandStyleGripperAlways GUICtrlRebar_SetBandStyleHidden GUICtrlRebar_SetBandStyleHideTitle GUICtrlRebar_SetBandStyleNoGripper GUICtrlRebar_SetBandStyleTopAlign GUICtrlRebar_SetBandStyleUseChevron GUICtrlRebar_SetBandStyleVariableHeight GUICtrlRebar_SetBandText GUICtrlRebar_SetBarInfo GUICtrlRebar_SetBKColor GUICtrlRebar_SetColorScheme GUICtrlRebar_SetTextColor GUICtrlRebar_SetToolTips GUICtrlRebar_SetUnicodeFormat GUICtrlRebar_ShowBand GUICtrlRichEdit_AppendText GUICtrlRichEdit_AutoDetectURL GUICtrlRichEdit_CanPaste GUICtrlRichEdit_CanPasteSpecial GUICtrlRichEdit_CanRedo GUICtrlRichEdit_CanUndo GUICtrlRichEdit_ChangeFontSize GUICtrlRichEdit_Copy GUICtrlRichEdit_Create GUICtrlRichEdit_Cut GUICtrlRichEdit_Deselect GUICtrlRichEdit_Destroy GUICtrlRichEdit_EmptyUndoBuffer GUICtrlRichEdit_FindText GUICtrlRichEdit_FindTextInRange GUICtrlRichEdit_GetBkColor GUICtrlRichEdit_GetCharAttributes GUICtrlRichEdit_GetCharBkColor GUICtrlRichEdit_GetCharColor GUICtrlRichEdit_GetCharPosFromXY GUICtrlRichEdit_GetCharPosOfNextWord GUICtrlRichEdit_GetCharPosOfPreviousWord GUICtrlRichEdit_GetCharWordBreakInfo GUICtrlRichEdit_GetFirstCharPosOnLine GUICtrlRichEdit_GetFont GUICtrlRichEdit_GetLineCount GUICtrlRichEdit_GetLineLength GUICtrlRichEdit_GetLineNumberFromCharPos GUICtrlRichEdit_GetNextRedo GUICtrlRichEdit_GetNextUndo GUICtrlRichEdit_GetNumberOfFirstVisibleLine GUICtrlRichEdit_GetParaAlignment GUICtrlRichEdit_GetParaAttributes GUICtrlRichEdit_GetParaBorder GUICtrlRichEdit_GetParaIndents GUICtrlRichEdit_GetParaNumbering GUICtrlRichEdit_GetParaShading GUICtrlRichEdit_GetParaSpacing GUICtrlRichEdit_GetParaTabStops GUICtrlRichEdit_GetPasswordChar GUICtrlRichEdit_GetRECT GUICtrlRichEdit_GetScrollPos GUICtrlRichEdit_GetSel GUICtrlRichEdit_GetSelAA GUICtrlRichEdit_GetSelText GUICtrlRichEdit_GetSpaceUnit GUICtrlRichEdit_GetText GUICtrlRichEdit_GetTextInLine GUICtrlRichEdit_GetTextInRange GUICtrlRichEdit_GetTextLength GUICtrlRichEdit_GetVersion GUICtrlRichEdit_GetXYFromCharPos GUICtrlRichEdit_GetZoom GUICtrlRichEdit_GotoCharPos GUICtrlRichEdit_HideSelection GUICtrlRichEdit_InsertText GUICtrlRichEdit_IsModified GUICtrlRichEdit_IsTextSelected GUICtrlRichEdit_Paste GUICtrlRichEdit_PasteSpecial GUICtrlRichEdit_PauseRedraw GUICtrlRichEdit_Redo GUICtrlRichEdit_ReplaceText GUICtrlRichEdit_ResumeRedraw GUICtrlRichEdit_ScrollLineOrPage GUICtrlRichEdit_ScrollLines GUICtrlRichEdit_ScrollToCaret GUICtrlRichEdit_SetBkColor GUICtrlRichEdit_SetCharAttributes GUICtrlRichEdit_SetCharBkColor GUICtrlRichEdit_SetCharColor GUICtrlRichEdit_SetEventMask GUICtrlRichEdit_SetFont GUICtrlRichEdit_SetLimitOnText GUICtrlRichEdit_SetModified GUICtrlRichEdit_SetParaAlignment GUICtrlRichEdit_SetParaAttributes GUICtrlRichEdit_SetParaBorder GUICtrlRichEdit_SetParaIndents GUICtrlRichEdit_SetParaNumbering GUICtrlRichEdit_SetParaShading GUICtrlRichEdit_SetParaSpacing GUICtrlRichEdit_SetParaTabStops GUICtrlRichEdit_SetPasswordChar GUICtrlRichEdit_SetReadOnly GUICtrlRichEdit_SetRECT GUICtrlRichEdit_SetScrollPos GUICtrlRichEdit_SetSel GUICtrlRichEdit_SetSpaceUnit GUICtrlRichEdit_SetTabStops GUICtrlRichEdit_SetText GUICtrlRichEdit_SetUndoLimit GUICtrlRichEdit_SetZoom GUICtrlRichEdit_StreamFromFile GUICtrlRichEdit_StreamFromVar GUICtrlRichEdit_StreamToFile GUICtrlRichEdit_StreamToVar GUICtrlRichEdit_Undo GUICtrlSlider_ClearSel GUICtrlSlider_ClearTics GUICtrlSlider_Create GUICtrlSlider_Destroy GUICtrlSlider_GetBuddy GUICtrlSlider_GetChannelRect GUICtrlSlider_GetChannelRectEx GUICtrlSlider_GetLineSize GUICtrlSlider_GetLogicalTics GUICtrlSlider_GetNumTics GUICtrlSlider_GetPageSize GUICtrlSlider_GetPos GUICtrlSlider_GetRange GUICtrlSlider_GetRangeMax GUICtrlSlider_GetRangeMin GUICtrlSlider_GetSel GUICtrlSlider_GetSelEnd GUICtrlSlider_GetSelStart GUICtrlSlider_GetThumbLength GUICtrlSlider_GetThumbRect GUICtrlSlider_GetThumbRectEx GUICtrlSlider_GetTic GUICtrlSlider_GetTicPos GUICtrlSlider_GetToolTips GUICtrlSlider_GetUnicodeFormat GUICtrlSlider_SetBuddy GUICtrlSlider_SetLineSize GUICtrlSlider_SetPageSize GUICtrlSlider_SetPos GUICtrlSlider_SetRange GUICtrlSlider_SetRangeMax GUICtrlSlider_SetRangeMin GUICtrlSlider_SetSel GUICtrlSlider_SetSelEnd GUICtrlSlider_SetSelStart GUICtrlSlider_SetThumbLength GUICtrlSlider_SetTic GUICtrlSlider_SetTicFreq GUICtrlSlider_SetTipSide GUICtrlSlider_SetToolTips GUICtrlSlider_SetUnicodeFormat GUICtrlStatusBar_Create GUICtrlStatusBar_Destroy GUICtrlStatusBar_EmbedControl GUICtrlStatusBar_GetBorders GUICtrlStatusBar_GetBordersHorz GUICtrlStatusBar_GetBordersRect GUICtrlStatusBar_GetBordersVert GUICtrlStatusBar_GetCount GUICtrlStatusBar_GetHeight GUICtrlStatusBar_GetIcon GUICtrlStatusBar_GetParts GUICtrlStatusBar_GetRect GUICtrlStatusBar_GetRectEx GUICtrlStatusBar_GetText GUICtrlStatusBar_GetTextFlags GUICtrlStatusBar_GetTextLength GUICtrlStatusBar_GetTextLengthEx GUICtrlStatusBar_GetTipText GUICtrlStatusBar_GetUnicodeFormat GUICtrlStatusBar_GetWidth GUICtrlStatusBar_IsSimple GUICtrlStatusBar_Resize GUICtrlStatusBar_SetBkColor GUICtrlStatusBar_SetIcon GUICtrlStatusBar_SetMinHeight GUICtrlStatusBar_SetParts GUICtrlStatusBar_SetSimple GUICtrlStatusBar_SetText GUICtrlStatusBar_SetTipText GUICtrlStatusBar_SetUnicodeFormat GUICtrlStatusBar_ShowHide GUICtrlTab_ActivateTab GUICtrlTab_ClickTab GUICtrlTab_Create GUICtrlTab_DeleteAllItems GUICtrlTab_DeleteItem GUICtrlTab_DeselectAll GUICtrlTab_Destroy GUICtrlTab_FindTab GUICtrlTab_GetCurFocus GUICtrlTab_GetCurSel GUICtrlTab_GetDisplayRect GUICtrlTab_GetDisplayRectEx GUICtrlTab_GetExtendedStyle GUICtrlTab_GetImageList GUICtrlTab_GetItem GUICtrlTab_GetItemCount GUICtrlTab_GetItemImage GUICtrlTab_GetItemParam GUICtrlTab_GetItemRect GUICtrlTab_GetItemRectEx GUICtrlTab_GetItemState GUICtrlTab_GetItemText GUICtrlTab_GetRowCount GUICtrlTab_GetToolTips GUICtrlTab_GetUnicodeFormat GUICtrlTab_HighlightItem GUICtrlTab_HitTest GUICtrlTab_InsertItem GUICtrlTab_RemoveImage GUICtrlTab_SetCurFocus GUICtrlTab_SetCurSel GUICtrlTab_SetExtendedStyle GUICtrlTab_SetImageList GUICtrlTab_SetItem GUICtrlTab_SetItemImage GUICtrlTab_SetItemParam GUICtrlTab_SetItemSize GUICtrlTab_SetItemState GUICtrlTab_SetItemText GUICtrlTab_SetMinTabWidth GUICtrlTab_SetPadding GUICtrlTab_SetToolTips GUICtrlTab_SetUnicodeFormat GUICtrlToolbar_AddBitmap GUICtrlToolbar_AddButton GUICtrlToolbar_AddButtonSep GUICtrlToolbar_AddString GUICtrlToolbar_ButtonCount GUICtrlToolbar_CheckButton GUICtrlToolbar_ClickAccel GUICtrlToolbar_ClickButton GUICtrlToolbar_ClickIndex GUICtrlToolbar_CommandToIndex GUICtrlToolbar_Create GUICtrlToolbar_Customize GUICtrlToolbar_DeleteButton GUICtrlToolbar_Destroy GUICtrlToolbar_EnableButton GUICtrlToolbar_FindToolbar GUICtrlToolbar_GetAnchorHighlight GUICtrlToolbar_GetBitmapFlags GUICtrlToolbar_GetButtonBitmap GUICtrlToolbar_GetButtonInfo GUICtrlToolbar_GetButtonInfoEx GUICtrlToolbar_GetButtonParam GUICtrlToolbar_GetButtonRect GUICtrlToolbar_GetButtonRectEx GUICtrlToolbar_GetButtonSize GUICtrlToolbar_GetButtonState GUICtrlToolbar_GetButtonStyle GUICtrlToolbar_GetButtonText GUICtrlToolbar_GetColorScheme GUICtrlToolbar_GetDisabledImageList GUICtrlToolbar_GetExtendedStyle GUICtrlToolbar_GetHotImageList GUICtrlToolbar_GetHotItem GUICtrlToolbar_GetImageList GUICtrlToolbar_GetInsertMark GUICtrlToolbar_GetInsertMarkColor GUICtrlToolbar_GetMaxSize GUICtrlToolbar_GetMetrics GUICtrlToolbar_GetPadding GUICtrlToolbar_GetRows GUICtrlToolbar_GetString GUICtrlToolbar_GetStyle GUICtrlToolbar_GetStyleAltDrag GUICtrlToolbar_GetStyleCustomErase GUICtrlToolbar_GetStyleFlat GUICtrlToolbar_GetStyleList GUICtrlToolbar_GetStyleRegisterDrop GUICtrlToolbar_GetStyleToolTips GUICtrlToolbar_GetStyleTransparent GUICtrlToolbar_GetStyleWrapable GUICtrlToolbar_GetTextRows GUICtrlToolbar_GetToolTips GUICtrlToolbar_GetUnicodeFormat GUICtrlToolbar_HideButton GUICtrlToolbar_HighlightButton GUICtrlToolbar_HitTest GUICtrlToolbar_IndexToCommand GUICtrlToolbar_InsertButton GUICtrlToolbar_InsertMarkHitTest GUICtrlToolbar_IsButtonChecked GUICtrlToolbar_IsButtonEnabled GUICtrlToolbar_IsButtonHidden GUICtrlToolbar_IsButtonHighlighted GUICtrlToolbar_IsButtonIndeterminate GUICtrlToolbar_IsButtonPressed GUICtrlToolbar_LoadBitmap GUICtrlToolbar_LoadImages GUICtrlToolbar_MapAccelerator GUICtrlToolbar_MoveButton GUICtrlToolbar_PressButton GUICtrlToolbar_SetAnchorHighlight GUICtrlToolbar_SetBitmapSize GUICtrlToolbar_SetButtonBitMap GUICtrlToolbar_SetButtonInfo GUICtrlToolbar_SetButtonInfoEx GUICtrlToolbar_SetButtonParam GUICtrlToolbar_SetButtonSize GUICtrlToolbar_SetButtonState GUICtrlToolbar_SetButtonStyle GUICtrlToolbar_SetButtonText GUICtrlToolbar_SetButtonWidth GUICtrlToolbar_SetCmdID GUICtrlToolbar_SetColorScheme GUICtrlToolbar_SetDisabledImageList GUICtrlToolbar_SetDrawTextFlags GUICtrlToolbar_SetExtendedStyle GUICtrlToolbar_SetHotImageList GUICtrlToolbar_SetHotItem GUICtrlToolbar_SetImageList GUICtrlToolbar_SetIndent GUICtrlToolbar_SetIndeterminate GUICtrlToolbar_SetInsertMark GUICtrlToolbar_SetInsertMarkColor GUICtrlToolbar_SetMaxTextRows GUICtrlToolbar_SetMetrics GUICtrlToolbar_SetPadding GUICtrlToolbar_SetParent GUICtrlToolbar_SetRows GUICtrlToolbar_SetStyle GUICtrlToolbar_SetStyleAltDrag GUICtrlToolbar_SetStyleCustomErase GUICtrlToolbar_SetStyleFlat GUICtrlToolbar_SetStyleList GUICtrlToolbar_SetStyleRegisterDrop GUICtrlToolbar_SetStyleToolTips GUICtrlToolbar_SetStyleTransparent GUICtrlToolbar_SetStyleWrapable GUICtrlToolbar_SetToolTips GUICtrlToolbar_SetUnicodeFormat GUICtrlToolbar_SetWindowTheme GUICtrlTreeView_Add GUICtrlTreeView_AddChild GUICtrlTreeView_AddChildFirst GUICtrlTreeView_AddFirst GUICtrlTreeView_BeginUpdate GUICtrlTreeView_ClickItem GUICtrlTreeView_Create GUICtrlTreeView_CreateDragImage GUICtrlTreeView_CreateSolidBitMap GUICtrlTreeView_Delete GUICtrlTreeView_DeleteAll GUICtrlTreeView_DeleteChildren GUICtrlTreeView_Destroy GUICtrlTreeView_DisplayRect GUICtrlTreeView_DisplayRectEx GUICtrlTreeView_EditText GUICtrlTreeView_EndEdit GUICtrlTreeView_EndUpdate GUICtrlTreeView_EnsureVisible GUICtrlTreeView_Expand GUICtrlTreeView_ExpandedOnce GUICtrlTreeView_FindItem GUICtrlTreeView_FindItemEx GUICtrlTreeView_GetBkColor GUICtrlTreeView_GetBold GUICtrlTreeView_GetChecked GUICtrlTreeView_GetChildCount GUICtrlTreeView_GetChildren GUICtrlTreeView_GetCount GUICtrlTreeView_GetCut GUICtrlTreeView_GetDropTarget GUICtrlTreeView_GetEditControl GUICtrlTreeView_GetExpanded GUICtrlTreeView_GetFirstChild GUICtrlTreeView_GetFirstItem GUICtrlTreeView_GetFirstVisible GUICtrlTreeView_GetFocused GUICtrlTreeView_GetHeight GUICtrlTreeView_GetImageIndex GUICtrlTreeView_GetImageListIconHandle GUICtrlTreeView_GetIndent GUICtrlTreeView_GetInsertMarkColor GUICtrlTreeView_GetISearchString GUICtrlTreeView_GetItemByIndex GUICtrlTreeView_GetItemHandle GUICtrlTreeView_GetItemParam GUICtrlTreeView_GetLastChild GUICtrlTreeView_GetLineColor GUICtrlTreeView_GetNext GUICtrlTreeView_GetNextChild GUICtrlTreeView_GetNextSibling GUICtrlTreeView_GetNextVisible GUICtrlTreeView_GetNormalImageList GUICtrlTreeView_GetParentHandle GUICtrlTreeView_GetParentParam GUICtrlTreeView_GetPrev GUICtrlTreeView_GetPrevChild GUICtrlTreeView_GetPrevSibling GUICtrlTreeView_GetPrevVisible GUICtrlTreeView_GetScrollTime GUICtrlTreeView_GetSelected GUICtrlTreeView_GetSelectedImageIndex GUICtrlTreeView_GetSelection GUICtrlTreeView_GetSiblingCount GUICtrlTreeView_GetState GUICtrlTreeView_GetStateImageIndex GUICtrlTreeView_GetStateImageList GUICtrlTreeView_GetText GUICtrlTreeView_GetTextColor GUICtrlTreeView_GetToolTips GUICtrlTreeView_GetTree GUICtrlTreeView_GetUnicodeFormat GUICtrlTreeView_GetVisible GUICtrlTreeView_GetVisibleCount GUICtrlTreeView_HitTest GUICtrlTreeView_HitTestEx GUICtrlTreeView_HitTestItem GUICtrlTreeView_Index GUICtrlTreeView_InsertItem GUICtrlTreeView_IsFirstItem GUICtrlTreeView_IsParent GUICtrlTreeView_Level GUICtrlTreeView_SelectItem GUICtrlTreeView_SelectItemByIndex GUICtrlTreeView_SetBkColor GUICtrlTreeView_SetBold GUICtrlTreeView_SetChecked GUICtrlTreeView_SetCheckedByIndex GUICtrlTreeView_SetChildren GUICtrlTreeView_SetCut GUICtrlTreeView_SetDropTarget GUICtrlTreeView_SetFocused GUICtrlTreeView_SetHeight GUICtrlTreeView_SetIcon GUICtrlTreeView_SetImageIndex GUICtrlTreeView_SetIndent GUICtrlTreeView_SetInsertMark GUICtrlTreeView_SetInsertMarkColor GUICtrlTreeView_SetItemHeight GUICtrlTreeView_SetItemParam GUICtrlTreeView_SetLineColor GUICtrlTreeView_SetNormalImageList GUICtrlTreeView_SetScrollTime GUICtrlTreeView_SetSelected GUICtrlTreeView_SetSelectedImageIndex GUICtrlTreeView_SetState GUICtrlTreeView_SetStateImageIndex GUICtrlTreeView_SetStateImageList GUICtrlTreeView_SetText GUICtrlTreeView_SetTextColor GUICtrlTreeView_SetToolTips GUICtrlTreeView_SetUnicodeFormat GUICtrlTreeView_Sort GUIImageList_Add GUIImageList_AddBitmap GUIImageList_AddIcon GUIImageList_AddMasked GUIImageList_BeginDrag GUIImageList_Copy GUIImageList_Create GUIImageList_Destroy GUIImageList_DestroyIcon GUIImageList_DragEnter GUIImageList_DragLeave GUIImageList_DragMove GUIImageList_Draw GUIImageList_DrawEx GUIImageList_Duplicate GUIImageList_EndDrag GUIImageList_GetBkColor GUIImageList_GetIcon GUIImageList_GetIconHeight GUIImageList_GetIconSize GUIImageList_GetIconSizeEx GUIImageList_GetIconWidth GUIImageList_GetImageCount GUIImageList_GetImageInfoEx GUIImageList_Remove GUIImageList_ReplaceIcon GUIImageList_SetBkColor GUIImageList_SetIconSize GUIImageList_SetImageCount GUIImageList_Swap GUIScrollBars_EnableScrollBar GUIScrollBars_GetScrollBarInfoEx GUIScrollBars_GetScrollBarRect GUIScrollBars_GetScrollBarRGState GUIScrollBars_GetScrollBarXYLineButton GUIScrollBars_GetScrollBarXYThumbBottom GUIScrollBars_GetScrollBarXYThumbTop GUIScrollBars_GetScrollInfo GUIScrollBars_GetScrollInfoEx GUIScrollBars_GetScrollInfoMax GUIScrollBars_GetScrollInfoMin GUIScrollBars_GetScrollInfoPage GUIScrollBars_GetScrollInfoPos GUIScrollBars_GetScrollInfoTrackPos GUIScrollBars_GetScrollPos GUIScrollBars_GetScrollRange GUIScrollBars_Init GUIScrollBars_ScrollWindow GUIScrollBars_SetScrollInfo GUIScrollBars_SetScrollInfoMax GUIScrollBars_SetScrollInfoMin GUIScrollBars_SetScrollInfoPage GUIScrollBars_SetScrollInfoPos GUIScrollBars_SetScrollRange GUIScrollBars_ShowScrollBar GUIToolTip_Activate GUIToolTip_AddTool GUIToolTip_AdjustRect GUIToolTip_BitsToTTF GUIToolTip_Create GUIToolTip_Deactivate GUIToolTip_DelTool GUIToolTip_Destroy GUIToolTip_EnumTools GUIToolTip_GetBubbleHeight GUIToolTip_GetBubbleSize GUIToolTip_GetBubbleWidth GUIToolTip_GetCurrentTool GUIToolTip_GetDelayTime GUIToolTip_GetMargin GUIToolTip_GetMarginEx GUIToolTip_GetMaxTipWidth GUIToolTip_GetText GUIToolTip_GetTipBkColor GUIToolTip_GetTipTextColor GUIToolTip_GetTitleBitMap GUIToolTip_GetTitleText GUIToolTip_GetToolCount GUIToolTip_GetToolInfo GUIToolTip_HitTest GUIToolTip_NewToolRect GUIToolTip_Pop GUIToolTip_PopUp GUIToolTip_SetDelayTime GUIToolTip_SetMargin GUIToolTip_SetMaxTipWidth GUIToolTip_SetTipBkColor GUIToolTip_SetTipTextColor GUIToolTip_SetTitle GUIToolTip_SetToolInfo GUIToolTip_SetWindowTheme GUIToolTip_ToolExists GUIToolTip_ToolToArray GUIToolTip_TrackActivate GUIToolTip_TrackPosition GUIToolTip_Update GUIToolTip_UpdateTipText HexToString IEAction IEAttach IEBodyReadHTML IEBodyReadText IEBodyWriteHTML IECreate IECreateEmbedded IEDocGetObj IEDocInsertHTML IEDocInsertText IEDocReadHTML IEDocWriteHTML IEErrorNotify IEFormElementCheckBoxSelect IEFormElementGetCollection IEFormElementGetObjByName IEFormElementGetValue IEFormElementOptionSelect IEFormElementRadioSelect IEFormElementSetValue IEFormGetCollection IEFormGetObjByName IEFormImageClick IEFormReset IEFormSubmit IEFrameGetCollection IEFrameGetObjByName IEGetObjById IEGetObjByName IEHeadInsertEventScript IEImgClick IEImgGetCollection IEIsFrameSet IELinkClickByIndex IELinkClickByText IELinkGetCollection IELoadWait IELoadWaitTimeout IENavigate IEPropertyGet IEPropertySet IEQuit IETableGetCollection IETableWriteToArray IETagNameAllGetCollection IETagNameGetCollection IE_Example IE_Introduction IE_VersionInfo INetExplorerCapable INetGetSource INetMail INetSmtpMail IsPressed MathCheckDiv Max MemGlobalAlloc MemGlobalFree MemGlobalLock MemGlobalSize MemGlobalUnlock MemMoveMemory MemVirtualAlloc MemVirtualAllocEx MemVirtualFree MemVirtualFreeEx Min MouseTrap NamedPipes_CallNamedPipe NamedPipes_ConnectNamedPipe NamedPipes_CreateNamedPipe NamedPipes_CreatePipe NamedPipes_DisconnectNamedPipe NamedPipes_GetNamedPipeHandleState NamedPipes_GetNamedPipeInfo NamedPipes_PeekNamedPipe NamedPipes_SetNamedPipeHandleState NamedPipes_TransactNamedPipe NamedPipes_WaitNamedPipe Net_Share_ConnectionEnum Net_Share_FileClose Net_Share_FileEnum Net_Share_FileGetInfo Net_Share_PermStr Net_Share_ResourceStr Net_Share_SessionDel Net_Share_SessionEnum Net_Share_SessionGetInfo Net_Share_ShareAdd Net_Share_ShareCheck Net_Share_ShareDel Net_Share_ShareEnum Net_Share_ShareGetInfo Net_Share_ShareSetInfo Net_Share_StatisticsGetSvr Net_Share_StatisticsGetWrk Now NowCalc NowCalcDate NowDate NowTime PathFull PathGetRelative PathMake PathSplit ProcessGetName ProcessGetPriority Radian ReplaceStringInFile RunDos ScreenCapture_Capture ScreenCapture_CaptureWnd ScreenCapture_SaveImage ScreenCapture_SetBMPFormat ScreenCapture_SetJPGQuality ScreenCapture_SetTIFColorDepth ScreenCapture_SetTIFCompression Security__AdjustTokenPrivileges Security__CreateProcessWithToken Security__DuplicateTokenEx Security__GetAccountSid Security__GetLengthSid Security__GetTokenInformation Security__ImpersonateSelf Security__IsValidSid Security__LookupAccountName Security__LookupAccountSid Security__LookupPrivilegeValue Security__OpenProcessToken Security__OpenThreadToken Security__OpenThreadTokenEx Security__SetPrivilege Security__SetTokenInformation Security__SidToStringSid Security__SidTypeStr Security__StringSidToSid SendMessage SendMessageA SetDate SetTime Singleton SoundClose SoundLength SoundOpen SoundPause SoundPlay SoundPos SoundResume SoundSeek SoundStatus SoundStop SQLite_Changes SQLite_Close SQLite_Display2DResult SQLite_Encode SQLite_ErrCode SQLite_ErrMsg SQLite_Escape SQLite_Exec SQLite_FastEncode SQLite_FastEscape SQLite_FetchData SQLite_FetchNames SQLite_GetTable SQLite_GetTable2d SQLite_LastInsertRowID SQLite_LibVersion SQLite_Open SQLite_Query SQLite_QueryFinalize SQLite_QueryReset SQLite_QuerySingleRow SQLite_SafeMode SQLite_SetTimeout SQLite_Shutdown SQLite_SQLiteExe SQLite_Startup SQLite_TotalChanges StringBetween StringExplode StringInsert StringProper StringRepeat StringTitleCase StringToHex TCPIpToName TempFile TicksToTime Timer_Diff Timer_GetIdleTime Timer_GetTimerID Timer_Init Timer_KillAllTimers Timer_KillTimer Timer_SetTimer TimeToTicks VersionCompare viClose viExecCommand viFindGpib viGpibBusReset viGTL viInteractiveControl viOpen viSetAttribute viSetTimeout WeekNumberISO WinAPI_AbortPath WinAPI_ActivateKeyboardLayout WinAPI_AddClipboardFormatListener WinAPI_AddFontMemResourceEx WinAPI_AddFontResourceEx WinAPI_AddIconOverlay WinAPI_AddIconTransparency WinAPI_AddMRUString WinAPI_AdjustBitmap WinAPI_AdjustTokenPrivileges WinAPI_AdjustWindowRectEx WinAPI_AlphaBlend WinAPI_AngleArc WinAPI_AnimateWindow WinAPI_Arc WinAPI_ArcTo WinAPI_ArrayToStruct WinAPI_AssignProcessToJobObject WinAPI_AssocGetPerceivedType WinAPI_AssocQueryString WinAPI_AttachConsole WinAPI_AttachThreadInput WinAPI_BackupRead WinAPI_BackupReadAbort WinAPI_BackupSeek WinAPI_BackupWrite WinAPI_BackupWriteAbort WinAPI_Beep WinAPI_BeginBufferedPaint WinAPI_BeginDeferWindowPos WinAPI_BeginPaint WinAPI_BeginPath WinAPI_BeginUpdateResource WinAPI_BitBlt WinAPI_BringWindowToTop WinAPI_BroadcastSystemMessage WinAPI_BrowseForFolderDlg WinAPI_BufferedPaintClear WinAPI_BufferedPaintInit WinAPI_BufferedPaintSetAlpha WinAPI_BufferedPaintUnInit WinAPI_CallNextHookEx WinAPI_CallWindowProc WinAPI_CallWindowProcW WinAPI_CascadeWindows WinAPI_ChangeWindowMessageFilterEx WinAPI_CharToOem WinAPI_ChildWindowFromPointEx WinAPI_ClientToScreen WinAPI_ClipCursor WinAPI_CloseDesktop WinAPI_CloseEnhMetaFile WinAPI_CloseFigure WinAPI_CloseHandle WinAPI_CloseThemeData WinAPI_CloseWindow WinAPI_CloseWindowStation WinAPI_CLSIDFromProgID WinAPI_CoInitialize WinAPI_ColorAdjustLuma WinAPI_ColorHLSToRGB WinAPI_ColorRGBToHLS WinAPI_CombineRgn WinAPI_CombineTransform WinAPI_CommandLineToArgv WinAPI_CommDlgExtendedError WinAPI_CommDlgExtendedErrorEx WinAPI_CompareString WinAPI_CompressBitmapBits WinAPI_CompressBuffer WinAPI_ComputeCrc32 WinAPI_ConfirmCredentials WinAPI_CopyBitmap WinAPI_CopyCursor WinAPI_CopyEnhMetaFile WinAPI_CopyFileEx WinAPI_CopyIcon WinAPI_CopyImage WinAPI_CopyRect WinAPI_CopyStruct WinAPI_CoTaskMemAlloc WinAPI_CoTaskMemFree WinAPI_CoTaskMemRealloc WinAPI_CoUninitialize WinAPI_Create32BitHBITMAP WinAPI_Create32BitHICON WinAPI_CreateANDBitmap WinAPI_CreateBitmap WinAPI_CreateBitmapIndirect WinAPI_CreateBrushIndirect WinAPI_CreateBuffer WinAPI_CreateBufferFromStruct WinAPI_CreateCaret WinAPI_CreateColorAdjustment WinAPI_CreateCompatibleBitmap WinAPI_CreateCompatibleBitmapEx WinAPI_CreateCompatibleDC WinAPI_CreateDesktop WinAPI_CreateDIB WinAPI_CreateDIBColorTable WinAPI_CreateDIBitmap WinAPI_CreateDIBSection WinAPI_CreateDirectory WinAPI_CreateDirectoryEx WinAPI_CreateEllipticRgn WinAPI_CreateEmptyIcon WinAPI_CreateEnhMetaFile WinAPI_CreateEvent WinAPI_CreateFile WinAPI_CreateFileEx WinAPI_CreateFileMapping WinAPI_CreateFont WinAPI_CreateFontEx WinAPI_CreateFontIndirect WinAPI_CreateGUID WinAPI_CreateHardLink WinAPI_CreateIcon WinAPI_CreateIconFromResourceEx WinAPI_CreateIconIndirect WinAPI_CreateJobObject WinAPI_CreateMargins WinAPI_CreateMRUList WinAPI_CreateMutex WinAPI_CreateNullRgn WinAPI_CreateNumberFormatInfo WinAPI_CreateObjectID WinAPI_CreatePen WinAPI_CreatePoint WinAPI_CreatePolygonRgn WinAPI_CreateProcess WinAPI_CreateProcessWithToken WinAPI_CreateRect WinAPI_CreateRectEx WinAPI_CreateRectRgn WinAPI_CreateRectRgnIndirect WinAPI_CreateRoundRectRgn WinAPI_CreateSemaphore WinAPI_CreateSize WinAPI_CreateSolidBitmap WinAPI_CreateSolidBrush WinAPI_CreateStreamOnHGlobal WinAPI_CreateString WinAPI_CreateSymbolicLink WinAPI_CreateTransform WinAPI_CreateWindowEx WinAPI_CreateWindowStation WinAPI_DecompressBuffer WinAPI_DecryptFile WinAPI_DeferWindowPos WinAPI_DefineDosDevice WinAPI_DefRawInputProc WinAPI_DefSubclassProc WinAPI_DefWindowProc WinAPI_DefWindowProcW WinAPI_DeleteDC WinAPI_DeleteEnhMetaFile WinAPI_DeleteFile WinAPI_DeleteObject WinAPI_DeleteObjectID WinAPI_DeleteVolumeMountPoint WinAPI_DeregisterShellHookWindow WinAPI_DestroyCaret WinAPI_DestroyCursor WinAPI_DestroyIcon WinAPI_DestroyWindow WinAPI_DeviceIoControl WinAPI_DisplayStruct WinAPI_DllGetVersion WinAPI_DllInstall WinAPI_DllUninstall WinAPI_DPtoLP WinAPI_DragAcceptFiles WinAPI_DragFinish WinAPI_DragQueryFileEx WinAPI_DragQueryPoint WinAPI_DrawAnimatedRects WinAPI_DrawBitmap WinAPI_DrawEdge WinAPI_DrawFocusRect WinAPI_DrawFrameControl WinAPI_DrawIcon WinAPI_DrawIconEx WinAPI_DrawLine WinAPI_DrawShadowText WinAPI_DrawText WinAPI_DrawThemeBackground WinAPI_DrawThemeEdge WinAPI_DrawThemeIcon WinAPI_DrawThemeParentBackground WinAPI_DrawThemeText WinAPI_DrawThemeTextEx WinAPI_DuplicateEncryptionInfoFile WinAPI_DuplicateHandle WinAPI_DuplicateTokenEx WinAPI_DwmDefWindowProc WinAPI_DwmEnableBlurBehindWindow WinAPI_DwmEnableComposition WinAPI_DwmExtendFrameIntoClientArea WinAPI_DwmGetColorizationColor WinAPI_DwmGetColorizationParameters WinAPI_DwmGetWindowAttribute WinAPI_DwmInvalidateIconicBitmaps WinAPI_DwmIsCompositionEnabled WinAPI_DwmQueryThumbnailSourceSize WinAPI_DwmRegisterThumbnail WinAPI_DwmSetColorizationParameters WinAPI_DwmSetIconicLivePreviewBitmap WinAPI_DwmSetIconicThumbnail WinAPI_DwmSetWindowAttribute WinAPI_DwmUnregisterThumbnail WinAPI_DwmUpdateThumbnailProperties WinAPI_DWordToFloat WinAPI_DWordToInt WinAPI_EjectMedia WinAPI_Ellipse WinAPI_EmptyWorkingSet WinAPI_EnableWindow WinAPI_EncryptFile WinAPI_EncryptionDisable WinAPI_EndBufferedPaint WinAPI_EndDeferWindowPos WinAPI_EndPaint WinAPI_EndPath WinAPI_EndUpdateResource WinAPI_EnumChildProcess WinAPI_EnumChildWindows WinAPI_EnumDesktops WinAPI_EnumDesktopWindows WinAPI_EnumDeviceDrivers WinAPI_EnumDisplayDevices WinAPI_EnumDisplayMonitors WinAPI_EnumDisplaySettings WinAPI_EnumDllProc WinAPI_EnumFiles WinAPI_EnumFileStreams WinAPI_EnumFontFamilies WinAPI_EnumHardLinks WinAPI_EnumMRUList WinAPI_EnumPageFiles WinAPI_EnumProcessHandles WinAPI_EnumProcessModules WinAPI_EnumProcessThreads WinAPI_EnumProcessWindows WinAPI_EnumRawInputDevices WinAPI_EnumResourceLanguages WinAPI_EnumResourceNames WinAPI_EnumResourceTypes WinAPI_EnumSystemGeoID WinAPI_EnumSystemLocales WinAPI_EnumUILanguages WinAPI_EnumWindows WinAPI_EnumWindowsPopup WinAPI_EnumWindowStations WinAPI_EnumWindowsTop WinAPI_EqualMemory WinAPI_EqualRect WinAPI_EqualRgn WinAPI_ExcludeClipRect WinAPI_ExpandEnvironmentStrings WinAPI_ExtCreatePen WinAPI_ExtCreateRegion WinAPI_ExtFloodFill WinAPI_ExtractIcon WinAPI_ExtractIconEx WinAPI_ExtSelectClipRgn WinAPI_FatalAppExit WinAPI_FatalExit WinAPI_FileEncryptionStatus WinAPI_FileExists WinAPI_FileIconInit WinAPI_FileInUse WinAPI_FillMemory WinAPI_FillPath WinAPI_FillRect WinAPI_FillRgn WinAPI_FindClose WinAPI_FindCloseChangeNotification WinAPI_FindExecutable WinAPI_FindFirstChangeNotification WinAPI_FindFirstFile WinAPI_FindFirstFileName WinAPI_FindFirstStream WinAPI_FindNextChangeNotification WinAPI_FindNextFile WinAPI_FindNextFileName WinAPI_FindNextStream WinAPI_FindResource WinAPI_FindResourceEx WinAPI_FindTextDlg WinAPI_FindWindow WinAPI_FlashWindow WinAPI_FlashWindowEx WinAPI_FlattenPath WinAPI_FloatToDWord WinAPI_FloatToInt WinAPI_FlushFileBuffers WinAPI_FlushFRBuffer WinAPI_FlushViewOfFile WinAPI_FormatDriveDlg WinAPI_FormatMessage WinAPI_FrameRect WinAPI_FrameRgn WinAPI_FreeLibrary WinAPI_FreeMemory WinAPI_FreeMRUList WinAPI_FreeResource WinAPI_GdiComment WinAPI_GetActiveWindow WinAPI_GetAllUsersProfileDirectory WinAPI_GetAncestor WinAPI_GetApplicationRestartSettings WinAPI_GetArcDirection WinAPI_GetAsyncKeyState WinAPI_GetBinaryType WinAPI_GetBitmapBits WinAPI_GetBitmapDimension WinAPI_GetBitmapDimensionEx WinAPI_GetBkColor WinAPI_GetBkMode WinAPI_GetBoundsRect WinAPI_GetBrushOrg WinAPI_GetBufferedPaintBits WinAPI_GetBufferedPaintDC WinAPI_GetBufferedPaintTargetDC WinAPI_GetBufferedPaintTargetRect WinAPI_GetBValue WinAPI_GetCaretBlinkTime WinAPI_GetCaretPos WinAPI_GetCDType WinAPI_GetClassInfoEx WinAPI_GetClassLongEx WinAPI_GetClassName WinAPI_GetClientHeight WinAPI_GetClientRect WinAPI_GetClientWidth WinAPI_GetClipboardSequenceNumber WinAPI_GetClipBox WinAPI_GetClipCursor WinAPI_GetClipRgn WinAPI_GetColorAdjustment WinAPI_GetCompressedFileSize WinAPI_GetCompression WinAPI_GetConnectedDlg WinAPI_GetCurrentDirectory WinAPI_GetCurrentHwProfile WinAPI_GetCurrentObject WinAPI_GetCurrentPosition WinAPI_GetCurrentProcess WinAPI_GetCurrentProcessExplicitAppUserModelID WinAPI_GetCurrentProcessID WinAPI_GetCurrentThemeName WinAPI_GetCurrentThread WinAPI_GetCurrentThreadId WinAPI_GetCursor WinAPI_GetCursorInfo WinAPI_GetDateFormat WinAPI_GetDC WinAPI_GetDCEx WinAPI_GetDefaultPrinter WinAPI_GetDefaultUserProfileDirectory WinAPI_GetDesktopWindow WinAPI_GetDeviceCaps WinAPI_GetDeviceDriverBaseName WinAPI_GetDeviceDriverFileName WinAPI_GetDeviceGammaRamp WinAPI_GetDIBColorTable WinAPI_GetDIBits WinAPI_GetDiskFreeSpaceEx WinAPI_GetDlgCtrlID WinAPI_GetDlgItem WinAPI_GetDllDirectory WinAPI_GetDriveBusType WinAPI_GetDriveGeometryEx WinAPI_GetDriveNumber WinAPI_GetDriveType WinAPI_GetDurationFormat WinAPI_GetEffectiveClientRect WinAPI_GetEnhMetaFile WinAPI_GetEnhMetaFileBits WinAPI_GetEnhMetaFileDescription WinAPI_GetEnhMetaFileDimension WinAPI_GetEnhMetaFileHeader WinAPI_GetErrorMessage WinAPI_GetErrorMode WinAPI_GetExitCodeProcess WinAPI_GetExtended WinAPI_GetFileAttributes WinAPI_GetFileID WinAPI_GetFileInformationByHandle WinAPI_GetFileInformationByHandleEx WinAPI_GetFilePointerEx WinAPI_GetFileSizeEx WinAPI_GetFileSizeOnDisk WinAPI_GetFileTitle WinAPI_GetFileType WinAPI_GetFileVersionInfo WinAPI_GetFinalPathNameByHandle WinAPI_GetFinalPathNameByHandleEx WinAPI_GetFocus WinAPI_GetFontMemoryResourceInfo WinAPI_GetFontName WinAPI_GetFontResourceInfo WinAPI_GetForegroundWindow WinAPI_GetFRBuffer WinAPI_GetFullPathName WinAPI_GetGeoInfo WinAPI_GetGlyphOutline WinAPI_GetGraphicsMode WinAPI_GetGuiResources WinAPI_GetGUIThreadInfo WinAPI_GetGValue WinAPI_GetHandleInformation WinAPI_GetHGlobalFromStream WinAPI_GetIconDimension WinAPI_GetIconInfo WinAPI_GetIconInfoEx WinAPI_GetIdleTime WinAPI_GetKeyboardLayout WinAPI_GetKeyboardLayoutList WinAPI_GetKeyboardState WinAPI_GetKeyboardType WinAPI_GetKeyNameText WinAPI_GetKeyState WinAPI_GetLastActivePopup WinAPI_GetLastError WinAPI_GetLastErrorMessage WinAPI_GetLayeredWindowAttributes WinAPI_GetLocaleInfo WinAPI_GetLogicalDrives WinAPI_GetMapMode WinAPI_GetMemorySize WinAPI_GetMessageExtraInfo WinAPI_GetModuleFileNameEx WinAPI_GetModuleHandle WinAPI_GetModuleHandleEx WinAPI_GetModuleInformation WinAPI_GetMonitorInfo WinAPI_GetMousePos WinAPI_GetMousePosX WinAPI_GetMousePosY WinAPI_GetMUILanguage WinAPI_GetNumberFormat WinAPI_GetObject WinAPI_GetObjectID WinAPI_GetObjectInfoByHandle WinAPI_GetObjectNameByHandle WinAPI_GetObjectType WinAPI_GetOpenFileName WinAPI_GetOutlineTextMetrics WinAPI_GetOverlappedResult WinAPI_GetParent WinAPI_GetParentProcess WinAPI_GetPerformanceInfo WinAPI_GetPEType WinAPI_GetPhysicallyInstalledSystemMemory WinAPI_GetPixel WinAPI_GetPolyFillMode WinAPI_GetPosFromRect WinAPI_GetPriorityClass WinAPI_GetProcAddress WinAPI_GetProcessAffinityMask WinAPI_GetProcessCommandLine WinAPI_GetProcessFileName WinAPI_GetProcessHandleCount WinAPI_GetProcessID WinAPI_GetProcessIoCounters WinAPI_GetProcessMemoryInfo WinAPI_GetProcessName WinAPI_GetProcessShutdownParameters WinAPI_GetProcessTimes WinAPI_GetProcessUser WinAPI_GetProcessWindowStation WinAPI_GetProcessWorkingDirectory WinAPI_GetProfilesDirectory WinAPI_GetPwrCapabilities WinAPI_GetRawInputBuffer WinAPI_GetRawInputBufferLength WinAPI_GetRawInputData WinAPI_GetRawInputDeviceInfo WinAPI_GetRegionData WinAPI_GetRegisteredRawInputDevices WinAPI_GetRegKeyNameByHandle WinAPI_GetRgnBox WinAPI_GetROP2 WinAPI_GetRValue WinAPI_GetSaveFileName WinAPI_GetShellWindow WinAPI_GetStartupInfo WinAPI_GetStdHandle WinAPI_GetStockObject WinAPI_GetStretchBltMode WinAPI_GetString WinAPI_GetSysColor WinAPI_GetSysColorBrush WinAPI_GetSystemDefaultLangID WinAPI_GetSystemDefaultLCID WinAPI_GetSystemDefaultUILanguage WinAPI_GetSystemDEPPolicy WinAPI_GetSystemInfo WinAPI_GetSystemMetrics WinAPI_GetSystemPowerStatus WinAPI_GetSystemTimes WinAPI_GetSystemWow64Directory WinAPI_GetTabbedTextExtent WinAPI_GetTempFileName WinAPI_GetTextAlign WinAPI_GetTextCharacterExtra WinAPI_GetTextColor WinAPI_GetTextExtentPoint32 WinAPI_GetTextFace WinAPI_GetTextMetrics WinAPI_GetThemeAppProperties WinAPI_GetThemeBackgroundContentRect WinAPI_GetThemeBackgroundExtent WinAPI_GetThemeBackgroundRegion WinAPI_GetThemeBitmap WinAPI_GetThemeBool WinAPI_GetThemeColor WinAPI_GetThemeDocumentationProperty WinAPI_GetThemeEnumValue WinAPI_GetThemeFilename WinAPI_GetThemeFont WinAPI_GetThemeInt WinAPI_GetThemeMargins WinAPI_GetThemeMetric WinAPI_GetThemePartSize WinAPI_GetThemePosition WinAPI_GetThemePropertyOrigin WinAPI_GetThemeRect WinAPI_GetThemeString WinAPI_GetThemeSysBool WinAPI_GetThemeSysColor WinAPI_GetThemeSysColorBrush WinAPI_GetThemeSysFont WinAPI_GetThemeSysInt WinAPI_GetThemeSysSize WinAPI_GetThemeSysString WinAPI_GetThemeTextExtent WinAPI_GetThemeTextMetrics WinAPI_GetThemeTransitionDuration WinAPI_GetThreadDesktop WinAPI_GetThreadErrorMode WinAPI_GetThreadLocale WinAPI_GetThreadUILanguage WinAPI_GetTickCount WinAPI_GetTickCount64 WinAPI_GetTimeFormat WinAPI_GetTopWindow WinAPI_GetUDFColorMode WinAPI_GetUpdateRect WinAPI_GetUpdateRgn WinAPI_GetUserDefaultLangID WinAPI_GetUserDefaultLCID WinAPI_GetUserDefaultUILanguage WinAPI_GetUserGeoID WinAPI_GetUserObjectInformation WinAPI_GetVersion WinAPI_GetVersionEx WinAPI_GetVolumeInformation WinAPI_GetVolumeInformationByHandle WinAPI_GetVolumeNameForVolumeMountPoint WinAPI_GetWindow WinAPI_GetWindowDC WinAPI_GetWindowDisplayAffinity WinAPI_GetWindowExt WinAPI_GetWindowFileName WinAPI_GetWindowHeight WinAPI_GetWindowInfo WinAPI_GetWindowLong WinAPI_GetWindowOrg WinAPI_GetWindowPlacement WinAPI_GetWindowRect WinAPI_GetWindowRgn WinAPI_GetWindowRgnBox WinAPI_GetWindowSubclass WinAPI_GetWindowText WinAPI_GetWindowTheme WinAPI_GetWindowThreadProcessId WinAPI_GetWindowWidth WinAPI_GetWorkArea WinAPI_GetWorldTransform WinAPI_GetXYFromPoint WinAPI_GlobalMemoryStatus WinAPI_GradientFill WinAPI_GUIDFromString WinAPI_GUIDFromStringEx WinAPI_HashData WinAPI_HashString WinAPI_HiByte WinAPI_HideCaret WinAPI_HiDWord WinAPI_HiWord WinAPI_InflateRect WinAPI_InitMUILanguage WinAPI_InProcess WinAPI_IntersectClipRect WinAPI_IntersectRect WinAPI_IntToDWord WinAPI_IntToFloat WinAPI_InvalidateRect WinAPI_InvalidateRgn WinAPI_InvertANDBitmap WinAPI_InvertColor WinAPI_InvertRect WinAPI_InvertRgn WinAPI_IOCTL WinAPI_IsAlphaBitmap WinAPI_IsBadCodePtr WinAPI_IsBadReadPtr WinAPI_IsBadStringPtr WinAPI_IsBadWritePtr WinAPI_IsChild WinAPI_IsClassName WinAPI_IsDoorOpen WinAPI_IsElevated WinAPI_IsHungAppWindow WinAPI_IsIconic WinAPI_IsInternetConnected WinAPI_IsLoadKBLayout WinAPI_IsMemory WinAPI_IsNameInExpression WinAPI_IsNetworkAlive WinAPI_IsPathShared WinAPI_IsProcessInJob WinAPI_IsProcessorFeaturePresent WinAPI_IsRectEmpty WinAPI_IsThemeActive WinAPI_IsThemeBackgroundPartiallyTransparent WinAPI_IsThemePartDefined WinAPI_IsValidLocale WinAPI_IsWindow WinAPI_IsWindowEnabled WinAPI_IsWindowUnicode WinAPI_IsWindowVisible WinAPI_IsWow64Process WinAPI_IsWritable WinAPI_IsZoomed WinAPI_Keybd_Event WinAPI_KillTimer WinAPI_LineDDA WinAPI_LineTo WinAPI_LoadBitmap WinAPI_LoadCursor WinAPI_LoadCursorFromFile WinAPI_LoadIcon WinAPI_LoadIconMetric WinAPI_LoadIconWithScaleDown WinAPI_LoadImage WinAPI_LoadIndirectString WinAPI_LoadKeyboardLayout WinAPI_LoadLibrary WinAPI_LoadLibraryEx WinAPI_LoadMedia WinAPI_LoadResource WinAPI_LoadShell32Icon WinAPI_LoadString WinAPI_LoadStringEx WinAPI_LoByte WinAPI_LocalFree WinAPI_LockDevice WinAPI_LockFile WinAPI_LockResource WinAPI_LockWindowUpdate WinAPI_LockWorkStation WinAPI_LoDWord WinAPI_LongMid WinAPI_LookupIconIdFromDirectoryEx WinAPI_LoWord WinAPI_LPtoDP WinAPI_MAKELANGID WinAPI_MAKELCID WinAPI_MakeLong WinAPI_MakeQWord WinAPI_MakeWord WinAPI_MapViewOfFile WinAPI_MapVirtualKey WinAPI_MaskBlt WinAPI_MessageBeep WinAPI_MessageBoxCheck WinAPI_MessageBoxIndirect WinAPI_MirrorIcon WinAPI_ModifyWorldTransform WinAPI_MonitorFromPoint WinAPI_MonitorFromRect WinAPI_MonitorFromWindow WinAPI_Mouse_Event WinAPI_MoveFileEx WinAPI_MoveMemory WinAPI_MoveTo WinAPI_MoveToEx WinAPI_MoveWindow WinAPI_MsgBox WinAPI_MulDiv WinAPI_MultiByteToWideChar WinAPI_MultiByteToWideCharEx WinAPI_NtStatusToDosError WinAPI_OemToChar WinAPI_OffsetClipRgn WinAPI_OffsetPoints WinAPI_OffsetRect WinAPI_OffsetRgn WinAPI_OffsetWindowOrg WinAPI_OpenDesktop WinAPI_OpenFileById WinAPI_OpenFileDlg WinAPI_OpenFileMapping WinAPI_OpenIcon WinAPI_OpenInputDesktop WinAPI_OpenJobObject WinAPI_OpenMutex WinAPI_OpenProcess WinAPI_OpenProcessToken WinAPI_OpenSemaphore WinAPI_OpenThemeData WinAPI_OpenWindowStation WinAPI_PageSetupDlg WinAPI_PaintDesktop WinAPI_PaintRgn WinAPI_ParseURL WinAPI_ParseUserName WinAPI_PatBlt WinAPI_PathAddBackslash WinAPI_PathAddExtension WinAPI_PathAppend WinAPI_PathBuildRoot WinAPI_PathCanonicalize WinAPI_PathCommonPrefix WinAPI_PathCompactPath WinAPI_PathCompactPathEx WinAPI_PathCreateFromUrl WinAPI_PathFindExtension WinAPI_PathFindFileName WinAPI_PathFindNextComponent WinAPI_PathFindOnPath WinAPI_PathGetArgs WinAPI_PathGetCharType WinAPI_PathGetDriveNumber WinAPI_PathIsContentType WinAPI_PathIsDirectory WinAPI_PathIsDirectoryEmpty WinAPI_PathIsExe WinAPI_PathIsFileSpec WinAPI_PathIsLFNFileSpec WinAPI_PathIsRelative WinAPI_PathIsRoot WinAPI_PathIsSameRoot WinAPI_PathIsSystemFolder WinAPI_PathIsUNC WinAPI_PathIsUNCServer WinAPI_PathIsUNCServerShare WinAPI_PathMakeSystemFolder WinAPI_PathMatchSpec WinAPI_PathParseIconLocation WinAPI_PathRelativePathTo WinAPI_PathRemoveArgs WinAPI_PathRemoveBackslash WinAPI_PathRemoveExtension WinAPI_PathRemoveFileSpec WinAPI_PathRenameExtension WinAPI_PathSearchAndQualify WinAPI_PathSkipRoot WinAPI_PathStripPath WinAPI_PathStripToRoot WinAPI_PathToRegion WinAPI_PathUndecorate WinAPI_PathUnExpandEnvStrings WinAPI_PathUnmakeSystemFolder WinAPI_PathUnquoteSpaces WinAPI_PathYetAnotherMakeUniqueName WinAPI_PickIconDlg WinAPI_PlayEnhMetaFile WinAPI_PlaySound WinAPI_PlgBlt WinAPI_PointFromRect WinAPI_PolyBezier WinAPI_PolyBezierTo WinAPI_PolyDraw WinAPI_Polygon WinAPI_PostMessage WinAPI_PrimaryLangId WinAPI_PrintDlg WinAPI_PrintDlgEx WinAPI_PrintWindow WinAPI_ProgIDFromCLSID WinAPI_PtInRect WinAPI_PtInRectEx WinAPI_PtInRegion WinAPI_PtVisible WinAPI_QueryDosDevice WinAPI_QueryInformationJobObject WinAPI_QueryPerformanceCounter WinAPI_QueryPerformanceFrequency WinAPI_RadialGradientFill WinAPI_ReadDirectoryChanges WinAPI_ReadFile WinAPI_ReadProcessMemory WinAPI_Rectangle WinAPI_RectInRegion WinAPI_RectIsEmpty WinAPI_RectVisible WinAPI_RedrawWindow WinAPI_RegCloseKey WinAPI_RegConnectRegistry WinAPI_RegCopyTree WinAPI_RegCopyTreeEx WinAPI_RegCreateKey WinAPI_RegDeleteEmptyKey WinAPI_RegDeleteKey WinAPI_RegDeleteKeyValue WinAPI_RegDeleteTree WinAPI_RegDeleteTreeEx WinAPI_RegDeleteValue WinAPI_RegDisableReflectionKey WinAPI_RegDuplicateHKey WinAPI_RegEnableReflectionKey WinAPI_RegEnumKey WinAPI_RegEnumValue WinAPI_RegFlushKey WinAPI_RegisterApplicationRestart WinAPI_RegisterClass WinAPI_RegisterClassEx WinAPI_RegisterHotKey WinAPI_RegisterPowerSettingNotification WinAPI_RegisterRawInputDevices WinAPI_RegisterShellHookWindow WinAPI_RegisterWindowMessage WinAPI_RegLoadMUIString WinAPI_RegNotifyChangeKeyValue WinAPI_RegOpenKey WinAPI_RegQueryInfoKey WinAPI_RegQueryLastWriteTime WinAPI_RegQueryMultipleValues WinAPI_RegQueryReflectionKey WinAPI_RegQueryValue WinAPI_RegRestoreKey WinAPI_RegSaveKey WinAPI_RegSetValue WinAPI_ReleaseCapture WinAPI_ReleaseDC WinAPI_ReleaseMutex WinAPI_ReleaseSemaphore WinAPI_ReleaseStream WinAPI_RemoveClipboardFormatListener WinAPI_RemoveDirectory WinAPI_RemoveFontMemResourceEx WinAPI_RemoveFontResourceEx WinAPI_RemoveWindowSubclass WinAPI_ReOpenFile WinAPI_ReplaceFile WinAPI_ReplaceTextDlg WinAPI_ResetEvent WinAPI_RestartDlg WinAPI_RestoreDC WinAPI_RGB WinAPI_RotatePoints WinAPI_RoundRect WinAPI_SaveDC WinAPI_SaveFileDlg WinAPI_SaveHBITMAPToFile WinAPI_SaveHICONToFile WinAPI_ScaleWindowExt WinAPI_ScreenToClient WinAPI_SearchPath WinAPI_SelectClipPath WinAPI_SelectClipRgn WinAPI_SelectObject WinAPI_SendMessageTimeout WinAPI_SetActiveWindow WinAPI_SetArcDirection WinAPI_SetBitmapBits WinAPI_SetBitmapDimensionEx WinAPI_SetBkColor WinAPI_SetBkMode WinAPI_SetBoundsRect WinAPI_SetBrushOrg WinAPI_SetCapture WinAPI_SetCaretBlinkTime WinAPI_SetCaretPos WinAPI_SetClassLongEx WinAPI_SetColorAdjustment WinAPI_SetCompression WinAPI_SetCurrentDirectory WinAPI_SetCurrentProcessExplicitAppUserModelID WinAPI_SetCursor WinAPI_SetDCBrushColor WinAPI_SetDCPenColor WinAPI_SetDefaultPrinter WinAPI_SetDeviceGammaRamp WinAPI_SetDIBColorTable WinAPI_SetDIBits WinAPI_SetDIBitsToDevice WinAPI_SetDllDirectory WinAPI_SetEndOfFile WinAPI_SetEnhMetaFileBits WinAPI_SetErrorMode WinAPI_SetEvent WinAPI_SetFileAttributes WinAPI_SetFileInformationByHandleEx WinAPI_SetFilePointer WinAPI_SetFilePointerEx WinAPI_SetFileShortName WinAPI_SetFileValidData WinAPI_SetFocus WinAPI_SetFont WinAPI_SetForegroundWindow WinAPI_SetFRBuffer WinAPI_SetGraphicsMode WinAPI_SetHandleInformation WinAPI_SetInformationJobObject WinAPI_SetKeyboardLayout WinAPI_SetKeyboardState WinAPI_SetLastError WinAPI_SetLayeredWindowAttributes WinAPI_SetLocaleInfo WinAPI_SetMapMode WinAPI_SetMessageExtraInfo WinAPI_SetParent WinAPI_SetPixel WinAPI_SetPolyFillMode WinAPI_SetPriorityClass WinAPI_SetProcessAffinityMask WinAPI_SetProcessShutdownParameters WinAPI_SetProcessWindowStation WinAPI_SetRectRgn WinAPI_SetROP2 WinAPI_SetSearchPathMode WinAPI_SetStretchBltMode WinAPI_SetSysColors WinAPI_SetSystemCursor WinAPI_SetTextAlign WinAPI_SetTextCharacterExtra WinAPI_SetTextColor WinAPI_SetTextJustification WinAPI_SetThemeAppProperties WinAPI_SetThreadDesktop WinAPI_SetThreadErrorMode WinAPI_SetThreadExecutionState WinAPI_SetThreadLocale WinAPI_SetThreadUILanguage WinAPI_SetTimer WinAPI_SetUDFColorMode WinAPI_SetUserGeoID WinAPI_SetUserObjectInformation WinAPI_SetVolumeMountPoint WinAPI_SetWindowDisplayAffinity WinAPI_SetWindowExt WinAPI_SetWindowLong WinAPI_SetWindowOrg WinAPI_SetWindowPlacement WinAPI_SetWindowPos WinAPI_SetWindowRgn WinAPI_SetWindowsHookEx WinAPI_SetWindowSubclass WinAPI_SetWindowText WinAPI_SetWindowTheme WinAPI_SetWinEventHook WinAPI_SetWorldTransform WinAPI_SfcIsFileProtected WinAPI_SfcIsKeyProtected WinAPI_ShellAboutDlg WinAPI_ShellAddToRecentDocs WinAPI_ShellChangeNotify WinAPI_ShellChangeNotifyDeregister WinAPI_ShellChangeNotifyRegister WinAPI_ShellCreateDirectory WinAPI_ShellEmptyRecycleBin WinAPI_ShellExecute WinAPI_ShellExecuteEx WinAPI_ShellExtractAssociatedIcon WinAPI_ShellExtractIcon WinAPI_ShellFileOperation WinAPI_ShellFlushSFCache WinAPI_ShellGetFileInfo WinAPI_ShellGetIconOverlayIndex WinAPI_ShellGetImageList WinAPI_ShellGetKnownFolderIDList WinAPI_ShellGetKnownFolderPath WinAPI_ShellGetLocalizedName WinAPI_ShellGetPathFromIDList WinAPI_ShellGetSetFolderCustomSettings WinAPI_ShellGetSettings WinAPI_ShellGetSpecialFolderLocation WinAPI_ShellGetSpecialFolderPath WinAPI_ShellGetStockIconInfo WinAPI_ShellILCreateFromPath WinAPI_ShellNotifyIcon WinAPI_ShellNotifyIconGetRect WinAPI_ShellObjectProperties WinAPI_ShellOpenFolderAndSelectItems WinAPI_ShellOpenWithDlg WinAPI_ShellQueryRecycleBin WinAPI_ShellQueryUserNotificationState WinAPI_ShellRemoveLocalizedName WinAPI_ShellRestricted WinAPI_ShellSetKnownFolderPath WinAPI_ShellSetLocalizedName WinAPI_ShellSetSettings WinAPI_ShellStartNetConnectionDlg WinAPI_ShellUpdateImage WinAPI_ShellUserAuthenticationDlg WinAPI_ShellUserAuthenticationDlgEx WinAPI_ShortToWord WinAPI_ShowCaret WinAPI_ShowCursor WinAPI_ShowError WinAPI_ShowLastError WinAPI_ShowMsg WinAPI_ShowOwnedPopups WinAPI_ShowWindow WinAPI_ShutdownBlockReasonCreate WinAPI_ShutdownBlockReasonDestroy WinAPI_ShutdownBlockReasonQuery WinAPI_SizeOfResource WinAPI_StretchBlt WinAPI_StretchDIBits WinAPI_StrFormatByteSize WinAPI_StrFormatByteSizeEx WinAPI_StrFormatKBSize WinAPI_StrFromTimeInterval WinAPI_StringFromGUID WinAPI_StringLenA WinAPI_StringLenW WinAPI_StrLen WinAPI_StrokeAndFillPath WinAPI_StrokePath WinAPI_StructToArray WinAPI_SubLangId WinAPI_SubtractRect WinAPI_SwapDWord WinAPI_SwapQWord WinAPI_SwapWord WinAPI_SwitchColor WinAPI_SwitchDesktop WinAPI_SwitchToThisWindow WinAPI_SystemParametersInfo WinAPI_TabbedTextOut WinAPI_TerminateJobObject WinAPI_TerminateProcess WinAPI_TextOut WinAPI_TileWindows WinAPI_TrackMouseEvent WinAPI_TransparentBlt WinAPI_TwipsPerPixelX WinAPI_TwipsPerPixelY WinAPI_UnhookWindowsHookEx WinAPI_UnhookWinEvent WinAPI_UnionRect WinAPI_UnionStruct WinAPI_UniqueHardwareID WinAPI_UnloadKeyboardLayout WinAPI_UnlockFile WinAPI_UnmapViewOfFile WinAPI_UnregisterApplicationRestart WinAPI_UnregisterClass WinAPI_UnregisterHotKey WinAPI_UnregisterPowerSettingNotification WinAPI_UpdateLayeredWindow WinAPI_UpdateLayeredWindowEx WinAPI_UpdateLayeredWindowIndirect WinAPI_UpdateResource WinAPI_UpdateWindow WinAPI_UrlApplyScheme WinAPI_UrlCanonicalize WinAPI_UrlCombine WinAPI_UrlCompare WinAPI_UrlCreateFromPath WinAPI_UrlFixup WinAPI_UrlGetPart WinAPI_UrlHash WinAPI_UrlIs WinAPI_UserHandleGrantAccess WinAPI_ValidateRect WinAPI_ValidateRgn WinAPI_VerQueryRoot WinAPI_VerQueryValue WinAPI_VerQueryValueEx WinAPI_WaitForInputIdle WinAPI_WaitForMultipleObjects WinAPI_WaitForSingleObject WinAPI_WideCharToMultiByte WinAPI_WidenPath WinAPI_WindowFromDC WinAPI_WindowFromPoint WinAPI_WordToShort WinAPI_Wow64EnableWow64FsRedirection WinAPI_WriteConsole WinAPI_WriteFile WinAPI_WriteProcessMemory WinAPI_ZeroMemory WinNet_AddConnection WinNet_AddConnection2 WinNet_AddConnection3 WinNet_CancelConnection WinNet_CancelConnection2 WinNet_CloseEnum WinNet_ConnectionDialog WinNet_ConnectionDialog1 WinNet_DisconnectDialog WinNet_DisconnectDialog1 WinNet_EnumResource WinNet_GetConnection WinNet_GetConnectionPerformance WinNet_GetLastError WinNet_GetNetworkInformation WinNet_GetProviderName WinNet_GetResourceInformation WinNet_GetResourceParent WinNet_GetUniversalName WinNet_GetUser WinNet_OpenEnum WinNet_RestoreConnection WinNet_UseConnection Word_Create Word_DocAdd Word_DocAttach Word_DocClose Word_DocExport Word_DocFind Word_DocFindReplace Word_DocGet Word_DocLinkAdd Word_DocLinkGet Word_DocOpen Word_DocPictureAdd Word_DocPrint Word_DocRangeSet Word_DocSave Word_DocSaveAs Word_DocTableRead Word_DocTableWrite Word_Quit",
                i = {
                    variants: [e.COMMENT(";", "$", { relevance: 0 }), e.COMMENT("#cs", "#ce"), e.COMMENT("#comments-start", "#comments-end")]
                },
                a = { className: "variable", begin: "\\$[A-z0-9_]+" },
                o = {
                    className: "string",
                    variants: [{ begin: /"/, end: /"/, contains: [{ begin: /""/, relevance: 0 }] }, {
                        begin: /'/,
                        end: /'/,
                        contains: [{ begin: /''/, relevance: 0 }]
                    }]
                },
                s = { variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE] },
                l = {
                    className: "preprocessor",
                    begin: "#",
                    end: "$",
                    keywords: "include include-once NoTrayIcon OnAutoItStartRegister RequireAdmin pragma Au3Stripper_Ignore_Funcs Au3Stripper_Ignore_Variables Au3Stripper_Off Au3Stripper_On Au3Stripper_Parameters AutoIt3Wrapper_Add_Constants AutoIt3Wrapper_Au3Check_Parameters AutoIt3Wrapper_Au3Check_Stop_OnWarning AutoIt3Wrapper_Aut2Exe AutoIt3Wrapper_AutoIt3 AutoIt3Wrapper_AutoIt3Dir AutoIt3Wrapper_Change2CUI AutoIt3Wrapper_Compile_Both AutoIt3Wrapper_Compression AutoIt3Wrapper_EndIf AutoIt3Wrapper_Icon AutoIt3Wrapper_If_Compile AutoIt3Wrapper_If_Run AutoIt3Wrapper_Jump_To_First_Error AutoIt3Wrapper_OutFile AutoIt3Wrapper_OutFile_Type AutoIt3Wrapper_OutFile_X64 AutoIt3Wrapper_PlugIn_Funcs AutoIt3Wrapper_Res_Comment Autoit3Wrapper_Res_Compatibility AutoIt3Wrapper_Res_Description AutoIt3Wrapper_Res_Field AutoIt3Wrapper_Res_File_Add AutoIt3Wrapper_Res_FileVersion AutoIt3Wrapper_Res_FileVersion_AutoIncrement AutoIt3Wrapper_Res_Icon_Add AutoIt3Wrapper_Res_Language AutoIt3Wrapper_Res_LegalCopyright AutoIt3Wrapper_Res_ProductVersion AutoIt3Wrapper_Res_requestedExecutionLevel AutoIt3Wrapper_Res_SaveSource AutoIt3Wrapper_Run_After AutoIt3Wrapper_Run_Au3Check AutoIt3Wrapper_Run_Au3Stripper AutoIt3Wrapper_Run_Before AutoIt3Wrapper_Run_Debug_Mode AutoIt3Wrapper_Run_SciTE_Minimized AutoIt3Wrapper_Run_SciTE_OutputPane_Minimized AutoIt3Wrapper_Run_Tidy AutoIt3Wrapper_ShowProgress AutoIt3Wrapper_Testing AutoIt3Wrapper_Tidy_Stop_OnError AutoIt3Wrapper_UPX_Parameters AutoIt3Wrapper_UseUPX AutoIt3Wrapper_UseX64 AutoIt3Wrapper_Version AutoIt3Wrapper_Versioning AutoIt3Wrapper_Versioning_Parameters Tidy_Off Tidy_On Tidy_Parameters EndRegion Region",
                    contains: [{ begin: /\\\n/, relevance: 0 }, {
                        beginKeywords: "include",
                        end: "$",
                        contains: [o, {
                            className: "string",
                            variants: [{ begin: "<", end: ">" }, {
                                begin: /"/,
                                end: /"/,
                                contains: [{ begin: /""/, relevance: 0 }]
                            }, { begin: /'/, end: /'/, contains: [{ begin: /''/, relevance: 0 }] }]
                        }]
                    }, o, i]
                },
                c = { className: "constant", begin: "@[A-z0-9_]+" },
                d = {
                    className: "function",
                    beginKeywords: "Func",
                    end: "$",
                    excludeEnd: !0,
                    illegal: "\\$|\\[|%",
                    contains: [e.UNDERSCORE_TITLE_MODE, {
                        className: "params",
                        begin: "\\(",
                        end: "\\)",
                        contains: [a, o, s]
                    }]
                };
            return {
                case_insensitive: !0,
                keywords: { keyword: t, built_in: r, literal: n },
                contains: [i, a, o, s, l, c, d]
            }
        }
    }, {}],
    17: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                case_insensitive: !0,
                lexemes: "\\.?" + e.IDENT_RE,
                keywords: {
                    keyword: "adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub subi swap tst wdr",
                    built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf",
                    preprocessor: ".byte .cseg .db .def .device .dseg .dw .endmacro .equ .eseg .exit .include .list .listmac .macro .nolist .org .set"
                },
                contains: [e.C_BLOCK_COMMENT_MODE, e.COMMENT(";", "$", { relevance: 0 }), e.C_NUMBER_MODE, e.BINARY_NUMBER_MODE, {
                    className: "number",
                    begin: "\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)"
                }, e.QUOTE_STRING_MODE, {
                    className: "string",
                    begin: "'",
                    end: "[^\\\\]'",
                    illegal: "[^\\\\][^']"
                }, { className: "label", begin: "^[A-Za-z0-9_.$]+:" }, {
                    className: "preprocessor",
                    begin: "#",
                    end: "$"
                }, { className: "localvars", begin: "@[0-9]+" }]
            }
        }
    }, {}],
    18: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: "false int abstract private char boolean static null if for true while long throw finally protected final return void enum else break new catch byte super case short default double public try this switch continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count order group by asc desc index hint like dispaly edit client server ttsbegin ttscommit str real date container anytype common div mod",
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, {
                    className: "preprocessor",
                    begin: "#",
                    end: "$"
                }, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: "{",
                    excludeEnd: !0,
                    illegal: ":",
                    contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
                }]
            }
        }
    }, {}],
    19: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "variable", variants: [{ begin: /\$[\w\d#@][\w\d_]*/ }, { begin: /\$\{(.*?)}/ }] },
                n = {
                    className: "string",
                    begin: /"/,
                    end: /"/,
                    contains: [e.BACKSLASH_ESCAPE, t, {
                        className: "variable",
                        begin: /\$\(/,
                        end: /\)/,
                        contains: [e.BACKSLASH_ESCAPE]
                    }]
                },
                r = { className: "string", begin: /'/, end: /'/ };
            return {
                aliases: ["sh", "zsh"],
                lexemes: /-?[a-z\.]+/,
                keywords: {
                    keyword: "if then else elif fi for while in do done case esac function",
                    literal: "true false",
                    built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
                    operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
                },
                contains: [{ className: "shebang", begin: /^#![^\n]+sh\s*$/, relevance: 10 }, {
                    className: "function",
                    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                    returnBegin: !0,
                    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
                    relevance: 0
                }, e.HASH_COMMENT_MODE, e.NUMBER_MODE, n, r, t]
            }
        }
    }, {}],
    20: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "literal", begin: "[\\+\\-]", relevance: 0 };
            return {
                aliases: ["bf"],
                contains: [e.COMMENT("[^\\[\\]\\.,\\+\\-<> \r\n]", "[\\[\\]\\.,\\+\\-<> \r\n]", {
                    returnEnd: !0,
                    relevance: 0
                }), { className: "title", begin: "[\\[\\]]", relevance: 0 }, {
                    className: "string",
                    begin: "[\\.,]",
                    relevance: 0
                }, { begin: /\+\+|\-\-/, returnBegin: !0, contains: [t] }, t]
            }
        }
    }, {}],
    21: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var",
                n = "false true",
                r = [e.C_LINE_COMMENT_MODE, e.COMMENT(/\{/, /\}/, { relevance: 0 }), e.COMMENT(/\(\*/, /\*\)/, { relevance: 10 })],
                i = { className: "string", begin: /'/, end: /'/, contains: [{ begin: /''/ }] },
                a = { className: "string", begin: /(#\d+)+/ },
                o = { className: "date", begin: "\\b\\d+(\\.\\d+)?(DT|D|T)", relevance: 0 },
                s = { className: "variable", begin: '"', end: '"' },
                l = {
                    className: "function",
                    beginKeywords: "procedure",
                    end: /[:;]/,
                    keywords: "procedure|10",
                    contains: [e.TITLE_MODE, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        keywords: t,
                        contains: [i, a]
                    }].concat(r)
                },
                c = {
                    className: "class",
                    begin: "OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",
                    returnBegin: !0,
                    contains: [e.TITLE_MODE, l]
                };
            return {
                case_insensitive: !0,
                keywords: { keyword: t, literal: n },
                contains: [i, a, o, s, e.NUMBER_MODE, c, l]
            }
        }
    }, {}],
    22: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["capnp"],
                keywords: {
                    keyword: "struct enum interface union group import using const annotation extends in of on as with from fixed",
                    built_in: "Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 Text Data AnyPointer AnyStruct Capability List",
                    literal: "true false"
                },
                contains: [e.QUOTE_STRING_MODE, e.NUMBER_MODE, e.HASH_COMMENT_MODE, {
                    className: "shebang",
                    begin: /@0x[\w\d]{16};/,
                    illegal: /\n/
                }, { className: "number", begin: /@\d+\b/ }, {
                    className: "class",
                    beginKeywords: "struct enum",
                    end: /\{/,
                    illegal: /\n/,
                    contains: [e.inherit(e.TITLE_MODE, { starts: { endsWithParent: !0, excludeEnd: !0 } })]
                }, {
                    className: "class",
                    beginKeywords: "interface",
                    end: /\{/,
                    illegal: /\n/,
                    contains: [e.inherit(e.TITLE_MODE, { starts: { endsWithParent: !0, excludeEnd: !0 } })]
                }]
            }
        }
    }, {}],
    23: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "assembly module package import alias class interface object given value assign void function new of extends satisfies abstracts in out return break continue throw assert dynamic if else switch case for while try catch finally then let this outer super is exists nonempty",
                n = "shared abstract formal default actual variable late native deprecatedfinal sealed annotation suppressWarnings small",
                r = "doc by license see throws tagged",
                i = n + " " + r,
                a = {
                    className: "subst",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    begin: /``/,
                    end: /``/,
                    keywords: t,
                    relevance: 10
                },
                o = [{ className: "string", begin: '"""', end: '"""', relevance: 10 }, {
                    className: "string",
                    begin: '"',
                    end: '"',
                    contains: [a]
                }, { className: "string", begin: "'", end: "'" }, {
                    className: "number",
                    begin: "#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?",
                    relevance: 0
                }];
            return a.contains = o, {
                keywords: { keyword: t, annotation: i },
                illegal: "\\$[^01]|#[^0-9a-fA-F]",
                contains: [e.C_LINE_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", { contains: ["self"] }), {
                    className: "annotation",
                    begin: '@[a-z]\\w*(?:\\:"[^"]*")?'
                }].concat(o)
            }
        }
    }, {}],
    24: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                contains: [{
                    className: "prompt",
                    begin: /^([\w.-]+|\s*#_)=>/,
                    starts: { end: /$/, subLanguage: "clojure" }
                }]
            }
        }
    }, {}],
    25: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { built_in: "def defonce cond apply if-not if-let if not not= = < > <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize" },
                n = "a-zA-Z_\\-!.?+*=<>&#'",
                r = "[" + n + "][" + n + "0-9/;:]*",
                i = "[-+]?\\d+(\\.\\d+)?",
                a = { begin: r, relevance: 0 },
                o = { className: "number", begin: i, relevance: 0 },
                s = e.inherit(e.QUOTE_STRING_MODE, { illegal: null }),
                l = e.COMMENT(";", "$", { relevance: 0 }),
                c = { className: "literal", begin: /\b(true|false|nil)\b/ },
                d = { className: "collection", begin: "[\\[\\{]", end: "[\\]\\}]" },
                u = { className: "comment", begin: "\\^" + r },
                p = e.COMMENT("\\^\\{", "\\}"),
                m = { className: "attribute", begin: "[:]" + r },
                g = { className: "list", begin: "\\(", end: "\\)" },
                _ = { endsWithParent: !0, relevance: 0 },
                f = { keywords: t, lexemes: r, className: "keyword", begin: r, starts: _ },
                h = [g, s, u, p, l, m, d, o, c, a];
            return g.contains = [e.COMMENT("comment", ""), f, _], _.contains = h, d.contains = h, {
                aliases: ["clj"],
                illegal: /\S/,
                contains: [g, s, u, p, l, m, d, o, c]
            }
        }
    }, {}],
    26: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["cmake.in"],
                case_insensitive: !0,
                keywords: {
                    keyword: "add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_subdirectory add_test aux_source_directory break build_command cmake_minimum_required cmake_policy configure_file create_test_sourcelist define_property else elseif enable_language enable_testing endforeach endfunction endif endmacro endwhile execute_process export find_file find_library find_package find_path find_program fltk_wrap_ui foreach function get_cmake_property get_directory_property get_filename_component get_property get_source_file_property get_target_property get_test_property if include include_directories include_external_msproject include_regular_expression install link_directories load_cache load_command macro mark_as_advanced message option output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return separate_arguments set set_directory_properties set_property set_source_files_properties set_target_properties set_tests_properties site_name source_group string target_link_libraries try_compile try_run unset variable_watch while build_name exec_program export_library_dependencies install_files install_programs install_targets link_libraries make_directory remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or",
                    operator: "equal less greater strless strgreater strequal matches"
                },
                contains: [{
                    className: "envvar",
                    begin: "\\${",
                    end: "}"
                }, e.HASH_COMMENT_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE]
            }
        }
    }, {}],
    27: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
                    literal: "true false null undefined yes no on off",
                    built_in: "npm require console print module global window document"
                },
                n = "[A-Za-z$_][0-9A-Za-z$_]*",
                r = { className: "subst", begin: /#\{/, end: /}/, keywords: t },
                i = [e.BINARY_NUMBER_MODE, e.inherit(e.C_NUMBER_MODE, {
                    starts: {
                        end: "(\\s*/)?",
                        relevance: 0
                    }
                }), {
                    className: "string",
                    variants: [{ begin: /'''/, end: /'''/, contains: [e.BACKSLASH_ESCAPE] }, {
                        begin: /'/,
                        end: /'/,
                        contains: [e.BACKSLASH_ESCAPE]
                    }, { begin: /"""/, end: /"""/, contains: [e.BACKSLASH_ESCAPE, r] }, {
                        begin: /"/,
                        end: /"/,
                        contains: [e.BACKSLASH_ESCAPE, r]
                    }]
                }, {
                    className: "regexp",
                    variants: [{ begin: "///", end: "///", contains: [r, e.HASH_COMMENT_MODE] }, {
                        begin: "//[gim]*",
                        relevance: 0
                    }, { begin: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/ }]
                }, { className: "property", begin: "@" + n }, {
                    begin: "`",
                    end: "`",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    subLanguage: "javascript"
                }];
            r.contains = i;
            var a = e.inherit(e.TITLE_MODE, { begin: n }),
                o = "(\\(.*\\))?\\s*\\B[-=]>",
                s = {
                    className: "params",
                    begin: "\\([^\\(]",
                    returnBegin: !0,
                    contains: [{ begin: /\(/, end: /\)/, keywords: t, contains: ["self"].concat(i) }]
                };
            return {
                aliases: ["coffee", "cson", "iced"],
                keywords: t,
                illegal: /\/\*/,
                contains: i.concat([e.COMMENT("###", "###"), e.HASH_COMMENT_MODE, {
                    className: "function",
                    begin: "^\\s*" + n + "\\s*=\\s*" + o,
                    end: "[-=]>",
                    returnBegin: !0,
                    contains: [a, s]
                }, {
                    begin: /[:\(,=]\s*/,
                    relevance: 0,
                    contains: [{ className: "function", begin: o, end: "[-=]>", returnBegin: !0, contains: [s] }]
                }, {
                    className: "class",
                    beginKeywords: "class",
                    end: "$",
                    illegal: /[:="\[\]]/,
                    contains: [{ beginKeywords: "extends", endsWithParent: !0, illegal: /[:="\[\]]/, contains: [a] }, a]
                }, { className: "attribute", begin: n + ":", end: ":", returnBegin: !0, returnEnd: !0, relevance: 0 }])
            }
        }
    }, {}],
    28: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "keyword", begin: "\\b[a-z\\d_]*_t\\b" },
                n = {
                    className: "string",
                    variants: [e.inherit(e.QUOTE_STRING_MODE, { begin: '((u8?|U)|L)?"' }), {
                        begin: '(u8?|U)?R"',
                        end: '"',
                        contains: [e.BACKSLASH_ESCAPE]
                    }, { begin: "'\\\\?.", end: "'", illegal: "." }]
                },
                r = {
                    className: "number",
                    variants: [{ begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)" }, { begin: e.C_NUMBER_RE }]
                },
                i = {
                    className: "preprocessor",
                    begin: "#",
                    end: "$",
                    keywords: "if else elif endif define undef warning error line pragma ifdef ifndef",
                    contains: [{ begin: /\\\n/, relevance: 0 }, {
                        beginKeywords: "include",
                        end: "$",
                        contains: [n, { className: "string", begin: "<", end: ">", illegal: "\\n" }]
                    }, n, r, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                },
                a = e.IDENT_RE + "\\s*\\(",
                o = {
                    keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
                    built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf",
                    literal: "true false nullptr NULL"
                };
            return {
                aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
                keywords: o,
                illegal: "</",
                contains: [t, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r, n, i, {
                    begin: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                    end: ">",
                    keywords: o,
                    contains: ["self", t]
                }, { begin: e.IDENT_RE + "::", keywords: o }, {
                    beginKeywords: "new throw return else",
                    relevance: 0
                }, {
                    className: "function",
                    begin: "(" + e.IDENT_RE + "[\\*&\\s]+)+" + a,
                    returnBegin: !0,
                    end: /[{;=]/,
                    excludeEnd: !0,
                    keywords: o,
                    illegal: /[^\w\s\*&]/,
                    contains: [{
                        begin: a,
                        returnBegin: !0,
                        contains: [e.TITLE_MODE],
                        relevance: 0
                    }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        keywords: o,
                        relevance: 0,
                        contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, n, r]
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, i]
                }]
            }
        }
    }, {}],
    29: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "(_[uif](8|16|32|64))?",
                n = "[a-zA-Z_]\\w*[!?=]?",
                r = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\][=?]?",
                i = {
                    keyword: "abstract alias asm begin break case class def do else elsif end ensure enum extend for fun if ifdef include instance_sizeof is_a? lib macro module next of out pointerof private protected rescue responds_to? return require self sizeof struct super then type undef union unless until when while with yield __DIR__ __FILE__ __LINE__",
                    literal: "false nil true"
                },
                a = { className: "subst", begin: "#\\{", end: "}", keywords: i },
                o = {
                    className: "expansion",
                    variants: [{ begin: "\\{\\{", end: "\\}\\}" }, { begin: "\\{%", end: "%\\}" }],
                    keywords: i,
                    relevance: 10
                },
                s = {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE, a],
                    variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }, { begin: /`/, end: /`/ }, {
                        begin: "%w?\\(",
                        end: "\\)"
                    }, { begin: "%w?\\[", end: "\\]" }, { begin: "%w?{", end: "}" }, { begin: "%w?<", end: ">" }, {
                        begin: "%w?/",
                        end: "/"
                    }, { begin: "%w?%", end: "%" }, { begin: "%w?-", end: "-" }, { begin: "%w?\\|", end: "\\|" }],
                    relevance: 0
                },
                l = [o, s, e.HASH_COMMENT_MODE, {
                    className: "class",
                    beginKeywords: "class module struct",
                    end: "$|;",
                    illegal: /=/,
                    contains: [e.HASH_COMMENT_MODE, e.inherit(e.TITLE_MODE, { begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?" }), {
                        className: "inheritance",
                        begin: "<\\s*",
                        contains: [{ className: "parent", begin: "(" + e.IDENT_RE + "::)?" + e.IDENT_RE }]
                    }]
                }, {
                    className: "class",
                    beginKeywords: "lib enum union",
                    end: "$|;",
                    illegal: /=/,
                    contains: [e.HASH_COMMENT_MODE, e.inherit(e.TITLE_MODE, { begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?" })],
                    relevance: 10
                }, {
                    className: "function",
                    beginKeywords: "def",
                    end: /\B\b/,
                    contains: [e.inherit(e.TITLE_MODE, { begin: r, endsParent: !0 })]
                }, {
                    className: "function",
                    beginKeywords: "fun macro",
                    end: /\B\b/,
                    contains: [e.inherit(e.TITLE_MODE, { begin: r, endsParent: !0 })],
                    relevance: 5
                }, { className: "constant", begin: "(::)?(\\b[A-Z]\\w*(::)?)+", relevance: 0 }, {
                    className: "symbol",
                    begin: e.UNDERSCORE_IDENT_RE + "(\\!|\\?)?:",
                    relevance: 0
                }, { className: "symbol", begin: ":", contains: [s, { begin: r }], relevance: 0 }, {
                    className: "number",
                    variants: [{ begin: "\\b0b([01_]+)" + t }, { begin: "\\b0o([0-7_]+)" + t }, { begin: "\\b0x([A-Fa-f0-9_]+)" + t }, { begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + t }],
                    relevance: 0
                }, {
                    className: "variable",
                    begin: "(\\$\\W)|((\\$|\\@\\@?|%)(\\w+))"
                }, {
                    begin: "(" + e.RE_STARTERS_RE + ")\\s*",
                    contains: [e.HASH_COMMENT_MODE, {
                        className: "regexp",
                        contains: [e.BACKSLASH_ESCAPE, a],
                        variants: [{ begin: "/", end: "/[a-z]*" }]
                    }],
                    relevance: 0
                }];
            return a.contains = l, o.contains = l.slice(1), { aliases: ["cr"], lexemes: n, keywords: i, contains: l }
        }
    }, {}],
    30: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
                n = e.IDENT_RE + "(<" + e.IDENT_RE + ">)?";
            return {
                aliases: ["csharp"],
                keywords: t,
                illegal: /::/,
                contains: [e.COMMENT("///", "$", {
                    returnBegin: !0,
                    contains: [{
                        className: "xmlDocTag",
                        variants: [{ begin: "///", relevance: 0 }, { begin: "<!--|-->" }, { begin: "</?", end: ">" }]
                    }]
                }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "preprocessor",
                    begin: "#",
                    end: "$",
                    keywords: "if else elif endif define undef warning error line region endregion pragma checksum"
                }, {
                    className: "string",
                    begin: '@"',
                    end: '"',
                    contains: [{ begin: '""' }]
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, {
                    beginKeywords: "class interface",
                    end: /[{;=]/,
                    illegal: /[^\s:]/,
                    contains: [e.TITLE_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                }, {
                    beginKeywords: "namespace",
                    end: /[{;=]/,
                    illegal: /[^\s:]/,
                    contains: [{
                        className: "title",
                        begin: "[a-zA-Z](\\.?\\w)*",
                        relevance: 0
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                }, { beginKeywords: "new return throw await", relevance: 0 }, {
                    className: "function",
                    begin: "(" + n + "\\s+)+" + e.IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    end: /[{;=]/,
                    excludeEnd: !0,
                    keywords: t,
                    contains: [{
                        begin: e.IDENT_RE + "\\s*\\(",
                        returnBegin: !0,
                        contains: [e.TITLE_MODE],
                        relevance: 0
                    }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: !0,
                        excludeEnd: !0,
                        keywords: t,
                        relevance: 0,
                        contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE]
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                }]
            }
        }
    }, {}],
    31: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
                n = { className: "function", begin: t + "\\(", returnBegin: !0, excludeEnd: !0, end: "\\(" },
                r = {
                    className: "rule",
                    begin: /[A-Z\_\.\-]+\s*:/,
                    returnBegin: !0,
                    end: ";",
                    endsWithParent: !0,
                    contains: [{
                        className: "attribute",
                        begin: /\S/,
                        end: ":",
                        excludeEnd: !0,
                        starts: {
                            className: "value",
                            endsWithParent: !0,
                            excludeEnd: !0,
                            contains: [n, e.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_BLOCK_COMMENT_MODE, {
                                className: "hexcolor",
                                begin: "#[0-9A-Fa-f]+"
                            }, { className: "important", begin: "!important" }]
                        }
                    }]
                };
            return {
                case_insensitive: !0,
                illegal: /[=\/|'\$]/,
                contains: [e.C_BLOCK_COMMENT_MODE, r, { className: "id", begin: /\#[A-Za-z0-9_-]+/ }, {
                    className: "class",
                    begin: /\.[A-Za-z0-9_-]+/
                }, { className: "attr_selector", begin: /\[/, end: /\]/, illegal: "$" }, {
                    className: "pseudo",
                    begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/
                }, {
                    className: "at_rule",
                    begin: "@(font-face|page)",
                    lexemes: "[a-z-]+",
                    keywords: "font-face page"
                }, {
                    className: "at_rule",
                    begin: "@",
                    end: "[{;]",
                    contains: [{ className: "keyword", begin: /\S+/ }, {
                        begin: /\s/,
                        endsWithParent: !0,
                        excludeEnd: !0,
                        relevance: 0,
                        contains: [n, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.CSS_NUMBER_MODE]
                    }]
                }, { className: "tag", begin: t, relevance: 0 }, {
                    className: "rules",
                    begin: "{",
                    end: "}",
                    illegal: /\S/,
                    contains: [e.C_BLOCK_COMMENT_MODE, r]
                }]
            }
        }
    }, {}],
    32: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",
                    built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",
                    literal: "false null true"
                },
                n = "(0|[1-9][\\d_]*)",
                r = "(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)",
                i = "0[bB][01_]+",
                a = "([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)",
                o = "0[xX]" + a,
                s = "([eE][+-]?" + r + ")",
                l = "(" + r + "(\\.\\d*|" + s + ")|\\d+\\." + r + r + "|\\." + n + s + "?)",
                c = "(0[xX](" + a + "\\." + a + "|\\.?" + a + ")[pP][+-]?" + r + ")",
                d = "(" + n + "|" + i + "|" + o + ")",
                u = "(" + c + "|" + l + ")",
                p = "\\\\(['\"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};",
                m = { className: "number", begin: "\\b" + d + "(L|u|U|Lu|LU|uL|UL)?", relevance: 0 },
                g = {
                    className: "number",
                    begin: "\\b(" + u + "([fF]|L|i|[fF]i|Li)?|" + d + "(i|[fF]i|Li))",
                    relevance: 0
                },
                _ = { className: "string", begin: "'(" + p + "|.)", end: "'", illegal: "." },
                f = { begin: p, relevance: 0 },
                h = { className: "string", begin: '"', contains: [f], end: '"[cwd]?' },
                b = { className: "string", begin: '[rq]"', end: '"[cwd]?', relevance: 5 },
                I = { className: "string", begin: "`", end: "`[cwd]?" },
                v = { className: "string", begin: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?', relevance: 10 },
                C = { className: "string", begin: 'q"\\{', end: '\\}"' },
                y = { className: "shebang", begin: "^#!", end: "$", relevance: 5 },
                S = { className: "preprocessor", begin: "#(line)", end: "$", relevance: 5 },
                x = { className: "keyword", begin: "@[a-zA-Z_][a-zA-Z_\\d]*" },
                E = e.COMMENT("\\/\\+", "\\+\\/", { contains: ["self"], relevance: 10 });
            return {
                lexemes: e.UNDERSCORE_IDENT_RE,
                keywords: t,
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, E, v, h, b, I, C, g, m, _, y, S, x]
            }
        }
    }, {}],
    33: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "subst", begin: "\\$\\{", end: "}", keywords: "true false null this is new super" },
                n = {
                    className: "string",
                    variants: [{ begin: "r'''", end: "'''" }, { begin: 'r"""', end: '"""' }, {
                        begin: "r'",
                        end: "'",
                        illegal: "\\n"
                    }, { begin: 'r"', end: '"', illegal: "\\n" }, {
                        begin: "'''",
                        end: "'''",
                        contains: [e.BACKSLASH_ESCAPE, t]
                    }, { begin: '"""', end: '"""', contains: [e.BACKSLASH_ESCAPE, t] }, {
                        begin: "'",
                        end: "'",
                        illegal: "\\n",
                        contains: [e.BACKSLASH_ESCAPE, t]
                    }, { begin: '"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE, t] }]
                };
            t.contains = [e.C_NUMBER_MODE, n];
            var r = {
                keyword: "assert break case catch class const continue default do else enum extends false final finally for if in is new null rethrow return super switch this throw true try var void while with",
                literal: "abstract as dynamic export external factory get implements import library operator part set static typedef",
                built_in: "print Comparable DateTime Duration Function Iterable Iterator List Map Match Null Object Pattern RegExp Set Stopwatch String StringBuffer StringSink Symbol Type Uri bool double int num document window querySelector querySelectorAll Element ElementList"
            };
            return {
                keywords: r,
                contains: [n, e.COMMENT("/\\*\\*", "\\*/", { subLanguage: "markdown" }), e.COMMENT("///", "$", { subLanguage: "markdown" }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: "{",
                    excludeEnd: !0,
                    contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
                }, e.C_NUMBER_MODE, { className: "annotation", begin: "@[A-Za-z]+" }, { begin: "=>" }]
            }
        }
    }, {}],
    34: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure",
                n = [e.C_LINE_COMMENT_MODE, e.COMMENT(/\{/, /\}/, { relevance: 0 }), e.COMMENT(/\(\*/, /\*\)/, { relevance: 10 })],
                r = { className: "string", begin: /'/, end: /'/, contains: [{ begin: /''/ }] },
                i = { className: "string", begin: /(#\d+)+/ },
                a = { begin: e.IDENT_RE + "\\s*=\\s*class\\s*\\(", returnBegin: !0, contains: [e.TITLE_MODE] },
                o = {
                    className: "function",
                    beginKeywords: "function constructor destructor procedure",
                    end: /[:;]/,
                    keywords: "function constructor|10 destructor|10 procedure|10",
                    contains: [e.TITLE_MODE, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        keywords: t,
                        contains: [r, i]
                    }].concat(n)
                };
            return {
                case_insensitive: !0,
                keywords: t,
                illegal: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
                contains: [r, i, e.NUMBER_MODE, a, o].concat(n)
            }
        }
    }, {}],
    35: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["patch"],
                contains: [{
                    className: "chunk",
                    relevance: 10,
                    variants: [{ begin: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ }, { begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ }, { begin: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }]
                }, {
                    className: "header",
                    variants: [{ begin: /Index: /, end: /$/ }, { begin: /=====/, end: /=====$/ }, {
                        begin: /^\-\-\-/,
                        end: /$/
                    }, { begin: /^\*{3} /, end: /$/ }, { begin: /^\+\+\+/, end: /$/ }, { begin: /\*{5}/, end: /\*{5}$/ }]
                }, {
                    className: "addition",
                    begin: "^\\+",
                    end: "$"
                }, { className: "deletion", begin: "^\\-", end: "$" }, { className: "change", begin: "^\\!", end: "$" }]
            }
        }
    }, {}],
    36: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                className: "filter",
                begin: /\|[A-Za-z]+:?/,
                keywords: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone",
                contains: [{ className: "argument", begin: /"/, end: /"/ }, { className: "argument", begin: /'/, end: /'/ }]
            };
            return {
                aliases: ["jinja"],
                case_insensitive: !0,
                subLanguage: "xml",
                contains: [e.COMMENT(/\{%\s*comment\s*%}/, /\{%\s*endcomment\s*%}/), e.COMMENT(/\{#/, /#}/), {
                    className: "template_tag",
                    begin: /\{%/,
                    end: /%}/,
                    keywords: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor in ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup by as ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim",
                    contains: [t]
                }, { className: "variable", begin: /\{\{/, end: /}}/, contains: [t] }]
            }
        }
    }, {}],
    37: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["bind", "zone"],
                keywords: { keyword: "IN A AAAA AFSDB APL CAA CDNSKEY CDS CERT CNAME DHCID DLV DNAME DNSKEY DS HIP IPSECKEY KEY KX LOC MX NAPTR NS NSEC NSEC3 NSEC3PARAM PTR RRSIG RP SIG SOA SRV SSHFP TA TKEY TLSA TSIG TXT" },
                contains: [e.COMMENT(";", "$"), {
                    className: "operator",
                    beginKeywords: "$TTL $GENERATE $INCLUDE $ORIGIN"
                }, {
                    className: "number",
                    begin: "((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))"
                }, {
                    className: "number",
                    begin: "((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])"
                }]
            }
        }
    }, {}],
    38: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["docker"],
                case_insensitive: !0,
                keywords: { built_ins: "from maintainer cmd expose add copy entrypoint volume user workdir onbuild run env" },
                contains: [e.HASH_COMMENT_MODE, {
                    keywords: { built_in: "run cmd entrypoint volume add copy workdir onbuild" },
                    begin: /^ *(onbuild +)?(run|cmd|entrypoint|volume|add|copy|workdir) +/,
                    starts: { end: /[^\\]\n/, subLanguage: "bash" }
                }, {
                    keywords: { built_in: "from maintainer expose env user onbuild" },
                    begin: /^ *(onbuild +)?(from|maintainer|expose|env|user|onbuild) +/,
                    end: /[^\\]\n/,
                    contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, e.HASH_COMMENT_MODE]
                }]
            }
        }
    }, {}],
    39: [function(require, module, exports) {
        module.exports = function(e) {
            var t = e.COMMENT(/@?rem\b/, /$/, { relevance: 10 }),
                n = { className: "label", begin: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)", relevance: 0 };
            return {
                aliases: ["bat", "cmd"],
                case_insensitive: !0,
                keywords: {
                    flow: "if else goto for in do call exit not exist errorlevel defined",
                    operator: "equ neq lss leq gtr geq",
                    keyword: "shift cd dir echo setlocal endlocal set pause copy",
                    stream: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux",
                    winutils: "ping net ipconfig taskkill xcopy ren del",
                    built_in: "append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert date dir diskcomp diskcopy doskey erase fs find findstr format ftype graftabl help keyb label md mkdir mode more move path pause print popd pushd promt rd recover rem rename replace restore rmdir shiftsort start subst time title tree type ver verify vol"
                },
                contains: [{ className: "envvar", begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/ }, {
                    className: "function",
                    begin: n.begin,
                    end: "goto:eof",
                    contains: [e.inherit(e.TITLE_MODE, { begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*" }), t]
                }, { className: "number", begin: "\\b\\d+", relevance: 0 }, t]
            }
        }
    }, {}],
    40: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "if eq ne lt lte gt gte select default math sep";
            return {
                aliases: ["dst"],
                case_insensitive: !0,
                subLanguage: "xml",
                contains: [{
                    className: "expression",
                    begin: "{",
                    end: "}",
                    relevance: 0,
                    contains: [{ className: "begin-block", begin: "#[a-zA-Z- .]+", keywords: t }, {
                        className: "string",
                        begin: '"',
                        end: '"'
                    }, { className: "end-block", begin: "\\/[a-zA-Z- .]+", keywords: t }, {
                        className: "variable",
                        begin: "[a-zA-Z-.]+",
                        keywords: t,
                        relevance: 0
                    }]
                }]
            }
        }
    }, {}],
    41: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?",
                n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
                r = "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote",
                i = { className: "subst", begin: "#\\{", end: "}", lexemes: t, keywords: r },
                a = {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE, i],
                    variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }]
                },
                o = {
                    className: "function",
                    beginKeywords: "def defp defmacro",
                    end: /\B\b/,
                    contains: [e.inherit(e.TITLE_MODE, { begin: t, endsParent: !0 })]
                },
                s = e.inherit(o, { className: "class", beginKeywords: "defmodule defrecord", end: /\bdo\b|$|;/ }),
                l = [a, e.HASH_COMMENT_MODE, s, o, {
                    className: "constant",
                    begin: "(\\b[A-Z_]\\w*(.)?)+",
                    relevance: 0
                }, { className: "symbol", begin: ":", contains: [a, { begin: n }], relevance: 0 }, {
                    className: "symbol",
                    begin: t + ":",
                    relevance: 0
                }, {
                    className: "number",
                    begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                    relevance: 0
                }, {
                    className: "variable",
                    begin: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
                }, { begin: "->" }, {
                    begin: "(" + e.RE_STARTERS_RE + ")\\s*",
                    contains: [e.HASH_COMMENT_MODE, {
                        className: "regexp",
                        illegal: "\\n",
                        contains: [e.BACKSLASH_ESCAPE, i],
                        variants: [{ begin: "/", end: "/[a-z]*" }, { begin: "%r\\[", end: "\\][a-z]*" }]
                    }],
                    relevance: 0
                }];
            return i.contains = l, { lexemes: t, keywords: r, contains: l }
        }
    }, {}],
    42: [function(require, module, exports) {
        module.exports = function(e) {
            var t = [e.COMMENT("--", "$"), e.COMMENT("{-", "-}", { contains: ["self"] })],
                n = { className: "type", begin: "\\b[A-Z][\\w']*", relevance: 0 },
                r = {
                    className: "container",
                    begin: "\\(",
                    end: "\\)",
                    illegal: '"',
                    contains: [{ className: "type", begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?" }].concat(t)
                },
                i = { className: "container", begin: "{", end: "}", contains: r.contains };
            return {
                keywords: "let in if then else case of where module import exposing type alias as infix infixl infixr port",
                contains: [{
                    className: "module",
                    begin: "\\bmodule\\b",
                    end: "where",
                    keywords: "module where",
                    contains: [r].concat(t),
                    illegal: "\\W\\.|;"
                }, {
                    className: "import",
                    begin: "\\bimport\\b",
                    end: "$",
                    keywords: "import|0 as exposing",
                    contains: [r].concat(t),
                    illegal: "\\W\\.|;"
                }, {
                    className: "typedef",
                    begin: "\\btype\\b",
                    end: "$",
                    keywords: "type alias",
                    contains: [n, r, i].concat(t)
                }, {
                    className: "infix",
                    beginKeywords: "infix infixl infixr",
                    end: "$",
                    contains: [e.C_NUMBER_MODE].concat(t)
                }, {
                    className: "foreign",
                    begin: "\\bport\\b",
                    end: "$",
                    keywords: "port",
                    contains: t
                }, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, n, e.inherit(e.TITLE_MODE, { begin: "^[_a-z][\\w']*" }), { begin: "->|<-" }].concat(t)
            }
        }
    }, {}],
    43: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                subLanguage: "xml",
                contains: [e.COMMENT("<%#", "%>"), {
                    begin: "<%[%=-]?",
                    end: "[%-]?%>",
                    subLanguage: "ruby",
                    excludeBegin: !0,
                    excludeEnd: !0
                }]
            }
        }
    }, {}],
    44: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    special_functions: "spawn spawn_link self",
                    reserved: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
                },
                contains: [{
                    className: "prompt",
                    begin: "^[0-9]+> ",
                    relevance: 10
                }, e.COMMENT("%", "$"), {
                    className: "number",
                    begin: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
                    relevance: 0
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    className: "constant",
                    begin: "\\?(::)?([A-Z]\\w*(::)?)+"
                }, { className: "arrow", begin: "->" }, { className: "ok", begin: "ok" }, {
                    className: "exclamation_mark",
                    begin: "!"
                }, {
                    className: "function_or_atom",
                    begin: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
                    relevance: 0
                }, { className: "variable", begin: "[A-Z][a-zA-Z0-9_']*", relevance: 0 }]
            }
        }
    }, {}],
    45: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-z'][a-zA-Z0-9_']*",
                n = "(" + t + ":" + t + "|" + t + ")",
                r = {
                    keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",
                    literal: "false true"
                },
                i = e.COMMENT("%", "$"),
                a = { className: "number", begin: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)", relevance: 0 },
                o = { begin: "fun\\s+" + t + "/\\d+" },
                s = {
                    begin: n + "\\(",
                    end: "\\)",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [{ className: "function_name", begin: n, relevance: 0 }, {
                        begin: "\\(",
                        end: "\\)",
                        endsWithParent: !0,
                        returnEnd: !0,
                        relevance: 0
                    }]
                },
                l = { className: "tuple", begin: "{", end: "}", relevance: 0 },
                c = { className: "variable", begin: "\\b_([A-Z][A-Za-z0-9_]*)?", relevance: 0 },
                d = { className: "variable", begin: "[A-Z][a-zA-Z0-9_]*", relevance: 0 },
                u = {
                    begin: "#" + e.UNDERSCORE_IDENT_RE,
                    relevance: 0,
                    returnBegin: !0,
                    contains: [{ className: "record_name", begin: "#" + e.UNDERSCORE_IDENT_RE, relevance: 0 }, {
                        begin: "{",
                        end: "}",
                        relevance: 0
                    }]
                },
                p = { beginKeywords: "fun receive if try case", end: "end", keywords: r };
            p.contains = [i, o, e.inherit(e.APOS_STRING_MODE, { className: "" }), p, s, e.QUOTE_STRING_MODE, a, l, c, d, u];
            var m = [i, o, p, s, e.QUOTE_STRING_MODE, a, l, c, d, u];
            s.contains[1].contains = m, l.contains = m, u.contains[1].contains = m;
            var g = { className: "params", begin: "\\(", end: "\\)", contains: m };
            return {
                aliases: ["erl"],
                keywords: r,
                illegal: "(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",
                contains: [{
                    className: "function",
                    begin: "^" + t + "\\s*\\(",
                    end: "->",
                    returnBegin: !0,
                    illegal: "\\(|#|//|/\\*|\\\\|:|;",
                    contains: [g, e.inherit(e.TITLE_MODE, { begin: t })],
                    starts: { end: ";|\\.", keywords: r, contains: m }
                }, i, {
                    className: "pp",
                    begin: "^-",
                    end: "\\.",
                    relevance: 0,
                    excludeEnd: !0,
                    returnBegin: !0,
                    lexemes: "-" + e.IDENT_RE,
                    keywords: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior -spec",
                    contains: [g]
                }, a, e.QUOTE_STRING_MODE, u, c, d, l, { begin: /\.$/ }]
            }
        }
    }, {}],
    46: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                contains: [{
                    begin: /[^\u2401\u0001]+/,
                    end: /[\u2401\u0001]/,
                    excludeEnd: !0,
                    returnBegin: !0,
                    returnEnd: !1,
                    contains: [{
                        begin: /([^\u2401\u0001=]+)/,
                        end: /=([^\u2401\u0001=]+)/,
                        returnEnd: !0,
                        returnBegin: !1,
                        className: "attribute"
                    }, { begin: /=/, end: /([\u2401\u0001])/, excludeEnd: !0, excludeBegin: !0, className: "string" }]
                }],
                case_insensitive: !0
            }
        }
    }, {}],
    47: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "params", begin: "\\(", end: "\\)" },
                n = {
                    constant: ".False. .True.",
                    type: "integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",
                    keyword: "kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure",
                    built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_ofacosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image"
                };
            return {
                case_insensitive: !0,
                aliases: ["f90", "f95"],
                keywords: n,
                contains: [e.inherit(e.APOS_STRING_MODE, {
                    className: "string",
                    relevance: 0
                }), e.inherit(e.QUOTE_STRING_MODE, { className: "string", relevance: 0 }), {
                    className: "function",
                    beginKeywords: "subroutine function program",
                    illegal: "[${=\\n]",
                    contains: [e.UNDERSCORE_TITLE_MODE, t]
                }, e.COMMENT("!", "$", { relevance: 0 }), {
                    className: "number",
                    begin: "(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?",
                    relevance: 0
                }]
            }
        }
    }, {}],
    48: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { begin: "<", end: ">", contains: [e.inherit(e.TITLE_MODE, { begin: /'[a-zA-Z0-9_]+/ })] };
            return {
                aliases: ["fs"],
                keywords: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
                contains: [{ className: "keyword", begin: /\b(yield|return|let|do)!/ }, {
                    className: "string",
                    begin: '@"',
                    end: '"',
                    contains: [{ begin: '""' }]
                }, { className: "string", begin: '"""', end: '"""' }, e.COMMENT("\\(\\*", "\\*\\)"), {
                    className: "class",
                    beginKeywords: "type",
                    end: "\\(|=|$",
                    excludeEnd: !0,
                    contains: [e.UNDERSCORE_TITLE_MODE, t]
                }, { className: "annotation", begin: "\\[<", end: ">\\]", relevance: 10 }, {
                    className: "attribute",
                    begin: "\\B('[A-Za-z])\\b",
                    contains: [e.BACKSLASH_ESCAPE]
                }, e.C_LINE_COMMENT_MODE, e.inherit(e.QUOTE_STRING_MODE, { illegal: null }), e.C_NUMBER_MODE]
            }
        }
    }, {}],
    49: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "abort acronym acronyms alias all and assign binary card diag display else1 eps eq equation equations file files for1 free ge gt if inf integer le loop lt maximizing minimizing model models na ne negative no not option options or ord parameter parameters positive prod putpage puttl repeat sameas scalar scalars semicont semiint set1 sets smax smin solve sos1 sos2 sum system table then until using variable variables while1 xor yes";
            return {
                aliases: ["gms"],
                case_insensitive: !0,
                keywords: t,
                contains: [{
                    className: "section",
                    beginKeywords: "sets parameters variables equations",
                    end: ";",
                    contains: [{ begin: "/", end: "/", contains: [e.NUMBER_MODE] }]
                }, { className: "string", begin: "\\*{3}", end: "\\*{3}" }, e.NUMBER_MODE, {
                    className: "number",
                    begin: "\\$[a-zA-Z0-9]+"
                }]
            }
        }
    }, {}],
    50: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[A-Z_][A-Z0-9_.]*",
                n = "\\%",
                r = {
                    literal: "",
                    built_in: "",
                    keyword: "IF DO WHILE ENDWHILE CALL ENDIF SUB ENDSUB GOTO REPEAT ENDREPEAT EQ LT GT NE GE LE OR XOR"
                },
                i = { className: "preprocessor", begin: "([O])([0-9]+)" },
                a = [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.COMMENT(/\(/, /\)/), e.inherit(e.C_NUMBER_MODE, { begin: "([-+]?([0-9]*\\.?[0-9]+\\.?))|" + e.C_NUMBER_RE }), e.inherit(e.APOS_STRING_MODE, { illegal: null }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null }), {
                    className: "keyword",
                    begin: "([G])([0-9]+\\.?[0-9]?)"
                }, { className: "title", begin: "([M])([0-9]+\\.?[0-9]?)" }, {
                    className: "title",
                    begin: "(VC|VS|#)",
                    end: "(\\d+)"
                }, { className: "title", begin: "(VZOFX|VZOFY|VZOFZ)" }, {
                    className: "built_in",
                    begin: "(ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN)(\\[)",
                    end: "([-+]?([0-9]*\\.?[0-9]+\\.?))(\\])"
                }, { className: "label", variants: [{ begin: "N", end: "\\d+", illegal: "\\W" }] }];
            return {
                aliases: ["nc"],
                case_insensitive: !0,
                lexemes: t,
                keywords: r,
                contains: [{ className: "preprocessor", begin: n }, i].concat(a)
            }
        }
    }, {}],
    51: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["feature"],
                keywords: "Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",
                contains: [{ className: "keyword", begin: "\\*" }, e.COMMENT("@[^@\r\n	 ]+", "$"), {
                    begin: "\\|",
                    end: "\\|\\w*$",
                    contains: [{ className: "string", begin: "[^|]+" }]
                }, { className: "variable", begin: "<", end: ">" }, e.HASH_COMMENT_MODE, {
                    className: "string",
                    begin: '"""',
                    end: '"""'
                }, e.QUOTE_STRING_MODE]
            }
        }
    }, {}],
    52: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    keyword: "atomic_uint attribute bool break bvec2 bvec3 bvec4 case centroid coherent const continue default discard dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 do double dvec2 dvec3 dvec4 else flat float for highp if iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray in inout int invariant isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 layout lowp mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 mediump noperspective out patch precision readonly restrict return sample sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow smooth struct subroutine switch uimage1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint uniform usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D usamplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 varying vec2 vec3 vec4 void volatile while writeonly",
                    built_in: "gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffsetgl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_PerVertex gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicCounter atomicCounterDecrement atomicCounterIncrement barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow gl_TextureMatrix gl_TextureMatrixInverse",
                    literal: "true false"
                },
                illegal: '"',
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, {
                    className: "preprocessor",
                    begin: "#",
                    end: "$"
                }]
            }
        }
    }, {}],
    53: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer",
                constant: "true false iota nil",
                typename: "bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
                built_in: "append cap close complex copy imag len make new panic print println real recover delete"
            };
            return {
                aliases: ["golang"],
                keywords: t,
                illegal: "</",
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.QUOTE_STRING_MODE, {
                    className: "string",
                    begin: "'",
                    end: "[^\\\\]'"
                }, { className: "string", begin: "`", end: "`" }, {
                    className: "number",
                    begin: e.C_NUMBER_RE + "[dflsi]?",
                    relevance: 0
                }, e.C_NUMBER_MODE]
            }
        }
    }, {}],
    54: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    keyword: "println readln print import module function local return let var while for foreach times in case when match with break continue augment augmentation each find filter reduce if then else otherwise try catch finally raise throw orIfNull",
                    typename: "DynamicObject|10 DynamicVariable struct Observable map set vector list array",
                    literal: "true false null"
                },
                contains: [e.HASH_COMMENT_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, {
                    className: "annotation",
                    begin: "@[A-Za-z]+"
                }]
            }
        }
    }, {}],
    55: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                case_insensitive: !0,
                keywords: { keyword: "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine" },
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, e.REGEXP_MODE]
            }
        }
    }, {}],
    56: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    typename: "byte short char int long boolean float double void",
                    literal: "true false null",
                    keyword: "def as in assert trait super this abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"
                },
                contains: [e.COMMENT("/\\*\\*", "\\*/", {
                    relevance: 0,
                    contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
                }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "string",
                    begin: '"""',
                    end: '"""'
                }, { className: "string", begin: "'''", end: "'''" }, {
                    className: "string",
                    begin: "\\$/",
                    end: "/\\$",
                    relevance: 10
                }, e.APOS_STRING_MODE, {
                    className: "regexp",
                    begin: /~?\/[^\/\n]+\//,
                    contains: [e.BACKSLASH_ESCAPE]
                }, e.QUOTE_STRING_MODE, {
                    className: "shebang",
                    begin: "^#!/usr/bin/env",
                    end: "$",
                    illegal: "\n"
                }, e.BINARY_NUMBER_MODE, {
                    className: "class",
                    beginKeywords: "class interface trait enum",
                    end: "{",
                    illegal: ":",
                    contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
                }, e.C_NUMBER_MODE, { className: "annotation", begin: "@[A-Za-z]+" }, {
                    className: "string",
                    begin: /[^\?]{0}[A-Za-z0-9_$]+ *:/
                }, { begin: /\?/, end: /\:/ }, { className: "label", begin: "^\\s*[A-Za-z0-9_$]+:", relevance: 0 }],
                illegal: /#/
            }
        }
    }, {}],
    57: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                case_insensitive: !0,
                contains: [{
                    className: "doctype",
                    begin: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
                    relevance: 10
                }, e.COMMENT("^\\s*(!=#|=#|-#|/).*$", !1, { relevance: 0 }), {
                    begin: "^\\s*(-|=|!=)(?!#)",
                    starts: { end: "\\n", subLanguage: "ruby" }
                }, {
                    className: "tag",
                    begin: "^\\s*%",
                    contains: [{ className: "title", begin: "\\w+" }, {
                        className: "value",
                        begin: "[#\\.][\\w-]+"
                    }, {
                        begin: "{\\s*",
                        end: "\\s*}",
                        excludeEnd: !0,
                        contains: [{
                            begin: ":\\w+\\s*=>",
                            end: ",\\s+",
                            returnBegin: !0,
                            endsWithParent: !0,
                            contains: [{
                                className: "symbol",
                                begin: ":\\w+"
                            }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, { begin: "\\w+", relevance: 0 }]
                        }]
                    }, {
                        begin: "\\(\\s*",
                        end: "\\s*\\)",
                        excludeEnd: !0,
                        contains: [{
                            begin: "\\w+\\s*=",
                            end: "\\s+",
                            returnBegin: !0,
                            endsWithParent: !0,
                            contains: [{
                                className: "attribute",
                                begin: "\\w+",
                                relevance: 0
                            }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, { begin: "\\w+", relevance: 0 }]
                        }]
                    }]
                }, { className: "bullet", begin: "^\\s*[=~]\\s*", relevance: 0 }, {
                    begin: "#{",
                    starts: { end: "}", subLanguage: "ruby" }
                }]
            }
        }
    }, {}],
    58: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";
            return {
                aliases: ["hbs", "html.hbs", "html.handlebars"],
                case_insensitive: !0,
                subLanguage: "xml",
                contains: [{
                    className: "expression",
                    begin: "{{",
                    end: "}}",
                    contains: [{ className: "begin-block", begin: "#[a-zA-Z- .]+", keywords: t }, {
                        className: "string",
                        begin: '"',
                        end: '"'
                    }, { className: "end-block", begin: "\\/[a-zA-Z- .]+", keywords: t }, {
                        className: "variable",
                        begin: "[a-zA-Z-.]+",
                        keywords: t
                    }]
                }]
            }
        }
    }, {}],
    59: [function(require, module, exports) {
        module.exports = function(e) {
            var t = [e.COMMENT("--", "$"), e.COMMENT("{-", "-}", { contains: ["self"] })],
                n = { className: "pragma", begin: "{-#", end: "#-}" },
                r = { className: "preprocessor", begin: "^#", end: "$" },
                i = { className: "type", begin: "\\b[A-Z][\\w']*", relevance: 0 },
                a = {
                    className: "container",
                    begin: "\\(",
                    end: "\\)",
                    illegal: '"',
                    contains: [n, r, {
                        className: "type",
                        begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
                    }, e.inherit(e.TITLE_MODE, { begin: "[_a-z][\\w']*" })].concat(t)
                },
                o = { className: "container", begin: "{", end: "}", contains: a.contains };
            return {
                aliases: ["hs"],
                keywords: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
                contains: [{
                    className: "module",
                    begin: "\\bmodule\\b",
                    end: "where",
                    keywords: "module where",
                    contains: [a].concat(t),
                    illegal: "\\W\\.|;"
                }, {
                    className: "import",
                    begin: "\\bimport\\b",
                    end: "$",
                    keywords: "import|0 qualified as hiding",
                    contains: [a].concat(t),
                    illegal: "\\W\\.|;"
                }, {
                    className: "class",
                    begin: "^(\\s*)?(class|instance)\\b",
                    end: "where",
                    keywords: "class family instance where",
                    contains: [i, a].concat(t)
                }, {
                    className: "typedef",
                    begin: "\\b(data|(new)?type)\\b",
                    end: "$",
                    keywords: "data family type newtype deriving",
                    contains: [n, i, a, o].concat(t)
                }, {
                    className: "default",
                    beginKeywords: "default",
                    end: "$",
                    contains: [i, a].concat(t)
                }, {
                    className: "infix",
                    beginKeywords: "infix infixl infixr",
                    end: "$",
                    contains: [e.C_NUMBER_MODE].concat(t)
                }, {
                    className: "foreign",
                    begin: "\\bforeign\\b",
                    end: "$",
                    keywords: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
                    contains: [i, e.QUOTE_STRING_MODE].concat(t)
                }, {
                    className: "shebang",
                    begin: "#!\\/usr\\/bin\\/env runhaskell",
                    end: "$"
                }, n, r, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, i, e.inherit(e.TITLE_MODE, { begin: "^[_a-z][\\w']*" }), { begin: "->|<-" }].concat(t)
            }
        }
    }, {}],
    60: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)";
            return {
                aliases: ["hx"],
                keywords: {
                    keyword: "break callback case cast catch class continue default do dynamic else enum extends extern for function here if implements import in inline interface never new override package private public return static super switch this throw trace try typedef untyped using var while",
                    literal: "true false null"
                },
                contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: "{",
                    excludeEnd: !0,
                    contains: [{ beginKeywords: "extends implements" }, e.TITLE_MODE]
                }, {
                    className: "preprocessor",
                    begin: "#",
                    end: "$",
                    keywords: "if else elseif end error"
                }, {
                    className: "function",
                    beginKeywords: "function",
                    end: "[{;]",
                    excludeEnd: !0,
                    illegal: "\\S",
                    contains: [e.TITLE_MODE, {
                        className: "params",
                        begin: "\\(",
                        end: "\\)",
                        contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                    }, { className: "type", begin: ":", end: t, relevance: 10 }]
                }]
            }
        }
    }, {}],
    61: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["https"],
                illegal: "\\S",
                contains: [{
                    className: "status",
                    begin: "^HTTP/[0-9\\.]+",
                    end: "$",
                    contains: [{ className: "number", begin: "\\b\\d{3}\\b" }]
                }, {
                    className: "request",
                    begin: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
                    returnBegin: !0,
                    end: "$",
                    contains: [{ className: "string", begin: " ", end: " ", excludeBegin: !0, excludeEnd: !0 }]
                }, {
                    className: "attribute",
                    begin: "^\\w",
                    end: ": ",
                    excludeEnd: !0,
                    illegal: "\\n|\\s|=",
                    starts: { className: "string", end: "$" }
                }, { begin: "\\n\\n", starts: { subLanguage: [], endsWithParent: !0 } }]
            }
        }
    }, {}],
    62: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "\\[",
                n = "\\]";
            return {
                aliases: ["i7"],
                case_insensitive: !0,
                keywords: { keyword: "thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule" },
                contains: [{
                    className: "string",
                    begin: '"',
                    end: '"',
                    relevance: 0,
                    contains: [{ className: "subst", begin: t, end: n }]
                }, {
                    className: "title",
                    begin: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
                    end: "$"
                }, {
                    begin: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
                    end: ":",
                    contains: [{ begin: "\\b\\(This", end: "\\)" }]
                }, { className: "comment", begin: t, end: n, contains: ["self"] }]
            }
        }
    }, {}],
    63: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE],
                variants: [{ begin: "'''", end: "'''", relevance: 10 }, {
                    begin: '"""',
                    end: '"""',
                    relevance: 10
                }, { begin: '"', end: '"' }, { begin: "'", end: "'" }]
            };
            return {
                aliases: ["toml"],
                case_insensitive: !0,
                illegal: /\S/,
                contains: [e.COMMENT(";", "$"), e.HASH_COMMENT_MODE, {
                    className: "title",
                    begin: /^\s*\[+/,
                    end: /\]+/
                }, {
                    className: "setting",
                    begin: /^[a-z0-9\[\]_-]+\s*=\s*/,
                    end: "$",
                    contains: [{
                        className: "value",
                        endsWithParent: !0,
                        keywords: "on off true false yes no",
                        contains: [{
                            className: "variable",
                            variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)}/ }]
                        }, t, { className: "number", begin: /([\+\-]+)?[\d]+_[\d_]+/ }, e.NUMBER_MODE],
                        relevance: 0
                    }]
                }]
            }
        }
    }, {}],
    64: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "params", begin: "\\(", end: "\\)" },
                n = {
                    constant: ".False. .True.",
                    type: "integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",
                    keyword: "kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure begin_provider &begin_provider end_provider begin_shell end_shell begin_template end_template subst assert touch soft_touch provide no_dep free irp_if irp_else irp_endif irp_write irp_read",
                    built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_ofacosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image IRP_ALIGN irp_here"
                };
            return {
                case_insensitive: !0,
                keywords: n,
                contains: [e.inherit(e.APOS_STRING_MODE, {
                    className: "string",
                    relevance: 0
                }), e.inherit(e.QUOTE_STRING_MODE, { className: "string", relevance: 0 }), {
                    className: "function",
                    beginKeywords: "subroutine function program",
                    illegal: "[${=\\n]",
                    contains: [e.UNDERSCORE_TITLE_MODE, t]
                }, e.COMMENT("!", "$", { relevance: 0 }), e.COMMENT("begin_doc", "end_doc", { relevance: 10 }), {
                    className: "number",
                    begin: "(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?",
                    relevance: 0
                }]
            }
        }
    }, {}],
    65: [function(require, module, exports) {
        module.exports = function(e) {
            var t = e.UNDERSCORE_IDENT_RE + "(<" + e.UNDERSCORE_IDENT_RE + ">)?",
                n = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
                r = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
                i = { className: "number", begin: r, relevance: 0 };
            return {
                aliases: ["jsp"],
                keywords: n,
                illegal: /<\/|#/,
                contains: [e.COMMENT("/\\*\\*", "\\*/", {
                    relevance: 0,
                    contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
                }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: /[{;=]/,
                    excludeEnd: !0,
                    keywords: "class interface",
                    illegal: /[:"\[\]]/,
                    contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
                }, { beginKeywords: "new throw return else", relevance: 0 }, {
                    className: "function",
                    begin: "(" + t + "\\s+)+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    end: /[{;=]/,
                    excludeEnd: !0,
                    keywords: n,
                    contains: [{
                        begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                        returnBegin: !0,
                        relevance: 0,
                        contains: [e.UNDERSCORE_TITLE_MODE]
                    }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        keywords: n,
                        relevance: 0,
                        contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE]
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                }, i, { className: "annotation", begin: "@[A-Za-z]+" }]
            }
        }
    }, {}],
    66: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["js"],
                keywords: {
                    keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await",
                    literal: "true false null undefined NaN Infinity",
                    built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
                },
                contains: [{
                    className: "pi",
                    relevance: 10,
                    begin: /^\s*['"]use (strict|asm)['"]/
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    className: "string",
                    begin: "`",
                    end: "`",
                    contains: [e.BACKSLASH_ESCAPE, { className: "subst", begin: "\\$\\{", end: "\\}" }]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "number",
                    variants: [{ begin: "\\b(0[bB][01]+)" }, { begin: "\\b(0[oO][0-7]+)" }, { begin: e.C_NUMBER_RE }],
                    relevance: 0
                }, {
                    begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                    keywords: "return throw case",
                    contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.REGEXP_MODE, {
                        begin: /</,
                        end: />\s*[);\]]/,
                        relevance: 0,
                        subLanguage: "xml"
                    }],
                    relevance: 0
                }, {
                    className: "function",
                    beginKeywords: "function",
                    end: /\{/,
                    excludeEnd: !0,
                    contains: [e.inherit(e.TITLE_MODE, { begin: /[A-Za-z$_][0-9A-Za-z$_]*/ }), {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: !0,
                        excludeEnd: !0,
                        contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                    }],
                    illegal: /\[|%/
                }, { begin: /\$[(.]/ }, { begin: "\\." + e.IDENT_RE, relevance: 0 }, {
                    beginKeywords: "import",
                    end: "[;$]",
                    keywords: "import from as",
                    contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
                }, {
                    className: "class",
                    beginKeywords: "class",
                    end: /[{;=]/,
                    excludeEnd: !0,
                    illegal: /[:"\[\]]/,
                    contains: [{ beginKeywords: "extends" }, e.UNDERSCORE_TITLE_MODE]
                }],
                illegal: /#/
            }
        }
    }, {}],
    67: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { literal: "true false null" },
                n = [e.QUOTE_STRING_MODE, e.C_NUMBER_MODE],
                r = { className: "value", end: ",", endsWithParent: !0, excludeEnd: !0, contains: n, keywords: t },
                i = {
                    begin: "{",
                    end: "}",
                    contains: [{
                        className: "attribute",
                        begin: '\\s*"',
                        end: '"\\s*:\\s*',
                        excludeBegin: !0,
                        excludeEnd: !0,
                        contains: [e.BACKSLASH_ESCAPE],
                        illegal: "\\n",
                        starts: r
                    }],
                    illegal: "\\S"
                },
                a = { begin: "\\[", end: "\\]", contains: [e.inherit(r, { className: null })], illegal: "\\S" };
            return n.splice(n.length, 0, i, a), { contains: n, keywords: t, illegal: "\\S" }
        }
    }, {}],
    68: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    keyword: "in abstract baremodule begin bitstype break catch ccall const continue do else elseif end export finally for function global if immutable import importall let local macro module quote return try type typealias using while",
                    literal: "true false ANY ARGS CPU_CORES C_NULL DL_LOAD_PATH DevNull ENDIAN_BOM ENV I|0 Inf Inf16 Inf32 InsertionSort JULIA_HOME LOAD_PATH MS_ASYNC MS_INVALIDATE MS_SYNC MergeSort NaN NaN16 NaN32 OS_NAME QuickSort RTLD_DEEPBIND RTLD_FIRST RTLD_GLOBAL RTLD_LAZY RTLD_LOCAL RTLD_NODELETE RTLD_NOLOAD RTLD_NOW RoundDown RoundFromZero RoundNearest RoundToZero RoundUp STDERR STDIN STDOUT VERSION WORD_SIZE catalan cglobal e|0 eu|0 eulergamma golden im nothing pi γ �? �?",
                    built_in: "ASCIIString AbstractArray AbstractRNG AbstractSparseArray Any ArgumentError Array Associative Base64Pipe Bidiagonal BigFloat BigInt BitArray BitMatrix BitVector Bool BoundsError Box CFILE Cchar Cdouble Cfloat Char CharString Cint Clong Clonglong ClusterManager Cmd Coff_t Colon Complex Complex128 Complex32 Complex64 Condition Cptrdiff_t Cshort Csize_t Cssize_t Cuchar Cuint Culong Culonglong Cushort Cwchar_t DArray DataType DenseArray Diagonal Dict DimensionMismatch DirectIndexString Display DivideError DomainError EOFError EachLine Enumerate ErrorException Exception Expr Factorization FileMonitor FileOffset Filter Float16 Float32 Float64 FloatRange FloatingPoint Function GetfieldNode GotoNode Hermitian IO IOBuffer IOStream IPv4 IPv6 InexactError Int Int128 Int16 Int32 Int64 Int8 IntSet Integer InterruptException IntrinsicFunction KeyError LabelNode LambdaStaticData LineNumberNode LoadError LocalProcess MIME MathConst MemoryError MersenneTwister Method MethodError MethodTable Module NTuple NewvarNode Nothing Number ObjectIdDict OrdinalRange OverflowError ParseError PollingFileWatcher ProcessExitedException ProcessGroup Ptr QuoteNode Range Range1 Ranges Rational RawFD Real Regex RegexMatch RemoteRef RepString RevString RopeString RoundingMode Set SharedArray Signed SparseMatrixCSC StackOverflowError Stat StatStruct StepRange String SubArray SubString SymTridiagonal Symbol SymbolNode Symmetric SystemError Task TextDisplay Timer TmStruct TopNode Triangular Tridiagonal Type TypeConstructor TypeError TypeName TypeVar UTF16String UTF32String UTF8String UdpSocket Uint Uint128 Uint16 Uint32 Uint64 Uint8 UndefRefError UndefVarError UniformScaling UnionType UnitRange Unsigned Vararg VersionNumber WString WeakKeyDict WeakRef Woodbury Zip"
                },
                n = "[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*",
                r = { lexemes: n, keywords: t },
                i = { className: "type-annotation", begin: /::/ },
                a = { className: "subtype", begin: /<:/ },
                o = {
                    className: "number",
                    begin: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
                    relevance: 0
                },
                s = { className: "char", begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/ },
                l = { className: "subst", begin: /\$\(/, end: /\)/, keywords: t },
                c = { className: "variable", begin: "\\$" + n },
                d = {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE, l, c],
                    variants: [{ begin: /\w*"/, end: /"\w*/ }, { begin: /\w*"""/, end: /"""\w*/ }]
                },
                u = { className: "string", contains: [e.BACKSLASH_ESCAPE, l, c], begin: "`", end: "`" },
                p = { className: "macrocall", begin: "@" + n },
                m = { className: "comment", variants: [{ begin: "#=", end: "=#", relevance: 10 }, { begin: "#", end: "$" }] };
            return r.contains = [o, s, i, a, d, u, p, m, e.HASH_COMMENT_MODE], l.contains = r.contains, r
        }
    }, {}],
    69: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "val var get set class trait object public open private protected final enum if else do while for when break continue throw try catch finally import package is as in return fun override default companion reified inline volatile transient native";
            return {
                keywords: {
                    typename: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
                    literal: "true false null",
                    keyword: t
                },
                contains: [e.COMMENT("/\\*\\*", "\\*/", {
                    relevance: 0,
                    contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
                }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "type",
                    begin: /</,
                    end: />/,
                    returnBegin: !0,
                    excludeEnd: !1,
                    relevance: 0
                }, {
                    className: "function",
                    beginKeywords: "fun",
                    end: "[(]|$",
                    returnBegin: !0,
                    excludeEnd: !0,
                    keywords: t,
                    illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
                    relevance: 5,
                    contains: [{
                        begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                        returnBegin: !0,
                        relevance: 0,
                        contains: [e.UNDERSCORE_TITLE_MODE]
                    }, {
                        className: "type",
                        begin: /</,
                        end: />/,
                        keywords: "reified",
                        relevance: 0
                    }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        keywords: t,
                        relevance: 0,
                        illegal: /\([^\(,\s:]+,/,
                        contains: [{
                            className: "typename",
                            begin: /:\s*/,
                            end: /\s*[=\)]/,
                            excludeBegin: !0,
                            returnEnd: !0,
                            relevance: 0
                        }]
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                }, {
                    className: "class",
                    beginKeywords: "class trait",
                    end: /[:\{(]|$/,
                    excludeEnd: !0,
                    illegal: "extends implements",
                    contains: [e.UNDERSCORE_TITLE_MODE, {
                        className: "type",
                        begin: /</,
                        end: />/,
                        excludeBegin: !0,
                        excludeEnd: !0,
                        relevance: 0
                    }, { className: "typename", begin: /[,:]\s*/, end: /[<\(,]|$/, excludeBegin: !0, returnEnd: !0 }]
                }, {
                    className: "variable",
                    beginKeywords: "var val",
                    end: /\s*[=:$]/,
                    excludeEnd: !0
                }, e.QUOTE_STRING_MODE, {
                    className: "shebang",
                    begin: "^#!/usr/bin/env",
                    end: "$",
                    illegal: "\n"
                }, e.C_NUMBER_MODE]
            }
        }
    }, {}],
    70: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Z_][a-zA-Z0-9_.]*",
                n = "<\\?(lasso(script)?|=)",
                r = "\\]|\\?>",
                i = {
                    literal: "true false none minimal full all void bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
                    built_in: "array date decimal duration integer map pair string tag xml null boolean bytes keyword list locale queue set stack staticarray local var variable global data self inherited currentcapture givenblock",
                    keyword: "error_code error_msg error_pop error_push error_reset cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
                },
                a = e.COMMENT("<!--", "-->", { relevance: 0 }),
                o = {
                    className: "preprocessor",
                    begin: "\\[noprocess\\]",
                    starts: { className: "markup", end: "\\[/noprocess\\]", returnEnd: !0, contains: [a] }
                },
                s = { className: "preprocessor", begin: "\\[/noprocess|" + n },
                l = { className: "variable", begin: "'" + t + "'" },
                c = [e.COMMENT("/\\*\\*!", "\\*/"), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.inherit(e.C_NUMBER_MODE, { begin: e.C_NUMBER_RE + "|(infinity|nan)\\b" }), e.inherit(e.APOS_STRING_MODE, { illegal: null }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null }), {
                    className: "string",
                    begin: "`",
                    end: "`"
                }, {
                    className: "variable",
                    variants: [{ begin: "[#$]" + t }, { begin: "#", end: "\\d+", illegal: "\\W" }]
                }, { className: "tag", begin: "::\\s*", end: t, illegal: "\\W" }, {
                    className: "attribute",
                    variants: [{ begin: "-(?!infinity)" + e.UNDERSCORE_IDENT_RE, relevance: 0 }, { begin: "(\\.\\.\\.)" }]
                }, {
                    className: "subst",
                    variants: [{ begin: "->\\s*", contains: [l] }, {
                        begin: "->|\\\\|&&?|\\|\\||!(?!=|>)|(and|or|not)\\b",
                        relevance: 0
                    }]
                }, { className: "built_in", begin: "\\.\\.?\\s*", relevance: 0, contains: [l] }, {
                    className: "class",
                    beginKeywords: "define",
                    returnEnd: !0,
                    end: "\\(|=>",
                    contains: [e.inherit(e.TITLE_MODE, { begin: e.UNDERSCORE_IDENT_RE + "(=(?!>))?" })]
                }];
            return {
                aliases: ["ls", "lassoscript"],
                case_insensitive: !0,
                lexemes: t + "|&[lg]t;",
                keywords: i,
                contains: [{
                    className: "preprocessor",
                    begin: r,
                    relevance: 0,
                    starts: { className: "markup", end: "\\[|" + n, returnEnd: !0, relevance: 0, contains: [a] }
                }, o, s, {
                    className: "preprocessor",
                    begin: "\\[no_square_brackets",
                    starts: {
                        end: "\\[/no_square_brackets\\]",
                        lexemes: t + "|&[lg]t;",
                        keywords: i,
                        contains: [{
                            className: "preprocessor",
                            begin: r,
                            relevance: 0,
                            starts: { className: "markup", end: "\\[noprocess\\]|" + n, returnEnd: !0, contains: [a] }
                        }, o, s].concat(c)
                    }
                }, { className: "preprocessor", begin: "\\[", relevance: 0 }, {
                    className: "shebang",
                    begin: "^#!.+lasso9\\b",
                    relevance: 10
                }].concat(c)
            }
        }
    }, {}],
    71: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[\\w-]+",
                n = "(" + t + "|@{" + t + "})",
                r = [],
                i = [],
                a = function(e) {
                    return { className: "string", begin: "~?" + e + ".*?" + e }
                },
                o = function(e, t, n) {
                    return { className: e, begin: t, relevance: n }
                },
                s = function(t, n, r) {
                    return e.inherit({
                        className: t,
                        begin: n + "\\(",
                        end: "\\(",
                        returnBegin: !0,
                        excludeEnd: !0,
                        relevance: 0
                    }, r)
                },
                l = { begin: "\\(", end: "\\)", contains: i, relevance: 0 };
            i.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, a("'"), a('"'), e.CSS_NUMBER_MODE, o("hexcolor", "#[0-9A-Fa-f]+\\b"), s("function", "(url|data-uri)", {
                starts: {
                    className: "string",
                    end: "[\\)\\n]",
                    excludeEnd: !0
                }
            }), s("function", t), l, o("variable", "@@?" + t, 10), o("variable", "@{" + t + "}"), o("built_in", "~?`[^`]*?`"), {
                className: "attribute",
                begin: t + "\\s*:",
                end: ":",
                returnBegin: !0,
                excludeEnd: !0
            });
            var c = i.concat({ begin: "{", end: "}", contains: r }),
                d = { beginKeywords: "when", endsWithParent: !0, contains: [{ beginKeywords: "and not" }].concat(i) },
                u = {
                    className: "attribute",
                    begin: n,
                    end: ":",
                    excludeEnd: !0,
                    contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
                    illegal: /\S/,
                    starts: { end: "[;}]", returnEnd: !0, contains: i, illegal: "[<=$]" }
                },
                p = {
                    className: "at_rule",
                    begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
                    starts: { end: "[;{}]", returnEnd: !0, contains: i, relevance: 0 }
                },
                m = {
                    className: "variable",
                    variants: [{ begin: "@" + t + "\\s*:", relevance: 15 }, { begin: "@" + t }],
                    starts: { end: "[;}]", returnEnd: !0, contains: c }
                },
                g = {
                    variants: [{ begin: "[\\.#:&\\[]", end: "[;{}]" }, { begin: n + "[^;]*{", end: "{" }],
                    returnBegin: !0,
                    returnEnd: !0,
                    illegal: "[<='$\"]",
                    contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, d, o("keyword", "all\\b"), o("variable", "@{" + t + "}"), o("tag", n + "%?", 0), o("id", "#" + n), o("class", "\\." + n, 0), o("keyword", "&", 0), s("pseudo", ":not"), s("keyword", ":extend"), o("pseudo", "::?" + n), {
                        className: "attr_selector",
                        begin: "\\[",
                        end: "\\]"
                    }, { begin: "\\(", end: "\\)", contains: c }, { begin: "!important" }]
                };
            return r.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, p, m, g, u), {
                case_insensitive: !0,
                illegal: "[=>'/<($\"]",
                contains: r
            }
        }
    }, {}],
    72: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*",
                n = "\\|[^]*?\\|",
                r = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?",
                i = { className: "shebang", begin: "^#!", end: "$" },
                a = { className: "literal", begin: "\\b(t{1}|nil)\\b" },
                o = {
                    className: "number",
                    variants: [{
                        begin: r,
                        relevance: 0
                    }, { begin: "#(b|B)[0-1]+(/[0-1]+)?" }, { begin: "#(o|O)[0-7]+(/[0-7]+)?" }, { begin: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?" }, {
                        begin: "#(c|C)\\(" + r + " +" + r,
                        end: "\\)"
                    }]
                },
                s = e.inherit(e.QUOTE_STRING_MODE, { illegal: null }),
                l = e.COMMENT(";", "$", { relevance: 0 }),
                c = { className: "variable", begin: "\\*", end: "\\*" },
                d = { className: "keyword", begin: "[:&]" + t },
                u = { begin: t, relevance: 0 },
                p = { begin: n },
                m = { begin: "\\(", end: "\\)", contains: ["self", a, s, o, u] },
                g = {
                    className: "quoted",
                    contains: [o, s, c, d, m, u],
                    variants: [{ begin: "['`]\\(", end: "\\)" }, {
                        begin: "\\(quote ",
                        end: "\\)",
                        keywords: "quote"
                    }, { begin: "'" + n }]
                },
                _ = { className: "quoted", variants: [{ begin: "'" + t }, { begin: "#'" + t + "(::" + t + ")*" }] },
                f = { className: "list", begin: "\\(\\s*", end: "\\)" },
                h = { endsWithParent: !0, relevance: 0 };
            return f.contains = [{
                className: "keyword",
                variants: [{ begin: t }, { begin: n }]
            }, h], h.contains = [g, _, f, a, o, s, l, c, d, p, u], {
                illegal: /\S/,
                contains: [o, i, a, s, l, g, _, f, u]
            }
        }
    }, {}],
    73: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "variable", begin: "\\b[gtps][A-Z]+[A-Za-z0-9_\\-]*\\b|\\$_[A-Z]+", relevance: 0 },
                n = [e.C_BLOCK_COMMENT_MODE, e.HASH_COMMENT_MODE, e.COMMENT("--", "$"), e.COMMENT("[^:]//", "$")],
                r = e.inherit(e.TITLE_MODE, { variants: [{ begin: "\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*" }, { begin: "\\b_[a-z0-9\\-]+" }] }),
                i = e.inherit(e.TITLE_MODE, { begin: "\\b([A-Za-z0-9_\\-]+)\\b" });
            return {
                case_insensitive: !1,
                keywords: {
                    keyword: "$_COOKIE $_FILES $_GET $_GET_BINARY $_GET_RAW $_POST $_POST_BINARY $_POST_RAW $_SESSION $_SERVER codepoint codepoints segment segments codeunit codeunits sentence sentences trueWord trueWords paragraph after byte bytes english the until http forever descending using line real8 with seventh for stdout finally element word words fourth before black ninth sixth characters chars stderr uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat end repeat URL in try into switch to words https token binfile each tenth as ticks tick system real4 by dateItems without char character ascending eighth whole dateTime numeric short first ftp integer abbreviated abbr abbrev private case while if",
                    constant: "SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five quote empty one true return cr linefeed right backslash null seven tab three two RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK",
                    operator: "div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within contains ends with begins the keys of keys",
                    built_in: "put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg avgDev base64Decode base64Encode baseConvert binaryDecode binaryEncode byteOffset byteToNum cachedURL cachedURLs charToNum cipherNames codepointOffset codepointProperty codepointToNum codeunitOffset commandNames compound compress constantNames cos date dateFormat decompress directories diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames geometricMean global globals hasMemory harmonicMean hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec millisecs millisecond milliseconds min monthNames nativeCharToNum normalizeText num number numToByte numToChar numToCodepoint numToNativeChar offset open openfiles openProcesses openProcessIDs openSockets paragraphOffset paramCount param params peerAddress pendingMessages platform popStdDev populationStandardDeviation populationVariance popVariance processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLCreateTreeFromFileWithNamespaces revXMLCreateTreeWithNamespaces revXMLDataFromXPathQuery revXMLEvaluateXPath revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_Execute revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sampVariance sec secs seconds sentenceOffset sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound stdDev sum sysError systemVersion tan tempName textDecode textEncode tick ticks time to tokenOffset toLower toUpper transpose truewordOffset trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus uuid value variableNames variance version waitDepth weekdayNames wordOffset xsltApplyStylesheet xsltApplyStylesheetFromFile xsltLoadStylesheet xsltLoadStylesheetFromFile add breakpoint cancel clear local variable file word line folder directory URL close socket process combine constant convert create new alias folder directory decrypt delete variable word line folder directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime libURLSetStatusCallback load multiply socket prepare process post seek rel relative read from process rename replace require resetAll resolve revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split start stop subtract union unload wait write"
                },
                contains: [t, { className: "keyword", begin: "\\bend\\sif\\b" }, {
                    className: "function",
                    beginKeywords: "function",
                    end: "$",
                    contains: [t, i, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE, r]
                }, {
                    className: "function",
                    begin: "\\bend\\s+",
                    end: "$",
                    keywords: "end",
                    contains: [i, r]
                }, {
                    className: "command",
                    beginKeywords: "command on",
                    end: "$",
                    contains: [t, i, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE, r]
                }, {
                    className: "preprocessor",
                    variants: [{ begin: "<\\?(rev|lc|livecode)", relevance: 10 }, { begin: "<\\?" }, { begin: "\\?>" }]
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE, r].concat(n),
                illegal: ";$|^\\[|^="
            }
        }
    }, {}],
    74: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger case default function var with then unless until loop of by when and or is isnt not it that otherwise from to til fallthrough super case default function var void const let enum export import native __hasProp __extends __slice __bind __indexOf",
                    literal: "true false null undefined yes no on off it that void",
                    built_in: "npm require console print module global window document"
                },
                n = "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*",
                r = e.inherit(e.TITLE_MODE, { begin: n }),
                i = { className: "subst", begin: /#\{/, end: /}/, keywords: t },
                a = { className: "subst", begin: /#[A-Za-z$_]/, end: /(?:\-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/, keywords: t },
                o = [e.BINARY_NUMBER_MODE, {
                    className: "number",
                    begin: "(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",
                    relevance: 0,
                    starts: { end: "(\\s*/)?", relevance: 0 }
                }, {
                    className: "string",
                    variants: [{ begin: /'''/, end: /'''/, contains: [e.BACKSLASH_ESCAPE] }, {
                        begin: /'/,
                        end: /'/,
                        contains: [e.BACKSLASH_ESCAPE]
                    }, { begin: /"""/, end: /"""/, contains: [e.BACKSLASH_ESCAPE, i, a] }, {
                        begin: /"/,
                        end: /"/,
                        contains: [e.BACKSLASH_ESCAPE, i, a]
                    }, { begin: /\\/, end: /(\s|$)/, excludeEnd: !0 }]
                }, {
                    className: "pi",
                    variants: [{
                        begin: "//",
                        end: "//[gim]*",
                        contains: [i, e.HASH_COMMENT_MODE]
                    }, { begin: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/ }]
                }, { className: "property", begin: "@" + n }, {
                    begin: "``",
                    end: "``",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    subLanguage: "javascript"
                }];
            i.contains = o;
            var s = {
                className: "params",
                begin: "\\(",
                returnBegin: !0,
                contains: [{ begin: /\(/, end: /\)/, keywords: t, contains: ["self"].concat(o) }]
            };
            return {
                aliases: ["ls"],
                keywords: t,
                illegal: /\/\*/,
                contains: o.concat([e.COMMENT("\\/\\*", "\\*\\/"), e.HASH_COMMENT_MODE, {
                    className: "function",
                    contains: [r, s],
                    returnBegin: !0,
                    variants: [{
                        begin: "(" + n + "\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B\\->\\*?",
                        end: "\\->\\*?"
                    }, {
                        begin: "(" + n + "\\s*(?:=|:=)\\s*)?!?(\\(.*\\))?\\s*\\B[-~]{1,2}>\\*?",
                        end: "[-~]{1,2}>\\*?"
                    }, {
                        begin: "(" + n + "\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B!?[-~]{1,2}>\\*?",
                        end: "!?[-~]{1,2}>\\*?"
                    }]
                }, {
                    className: "class",
                    beginKeywords: "class",
                    end: "$",
                    illegal: /[:="\[\]]/,
                    contains: [{ beginKeywords: "extends", endsWithParent: !0, illegal: /[:="\[\]]/, contains: [r] }, r]
                }, { className: "attribute", begin: n + ":", end: ":", returnBegin: !0, returnEnd: !0, relevance: 0 }])
            }
        }
    }, {}],
    75: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "\\[=*\\[",
                n = "\\]=*\\]",
                r = { begin: t, end: n, contains: ["self"] },
                i = [e.COMMENT("--(?!" + t + ")", "$"), e.COMMENT("--" + t, n, { contains: [r], relevance: 10 })];
            return {
                lexemes: e.UNDERSCORE_IDENT_RE,
                keywords: {
                    keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
                    built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
                },
                contains: i.concat([{
                    className: "function",
                    beginKeywords: "function",
                    end: "\\)",
                    contains: [e.inherit(e.TITLE_MODE, { begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*" }), {
                        className: "params",
                        begin: "\\(",
                        endsWithParent: !0,
                        contains: i
                    }].concat(i)
                }, e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    className: "string",
                    begin: t,
                    end: n,
                    contains: [r],
                    relevance: 5
                }])
            }
        }
    }, {}],
    76: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "variable", begin: /\$\(/, end: /\)/, contains: [e.BACKSLASH_ESCAPE] };
            return {
                aliases: ["mk", "mak"],
                contains: [e.HASH_COMMENT_MODE, {
                    begin: /^\w+\s*\W*=/,
                    returnBegin: !0,
                    relevance: 0,
                    starts: {
                        className: "constant",
                        end: /\s*\W*=/,
                        excludeEnd: !0,
                        starts: { end: /$/, relevance: 0, contains: [t] }
                    }
                }, { className: "title", begin: /^[\w]+:\s*$/ }, {
                    className: "phony",
                    begin: /^\.PHONY:/,
                    end: /$/,
                    keywords: ".PHONY",
                    lexemes: /[\.\w]+/
                }, { begin: /^\t+/, end: /$/, relevance: 0, contains: [e.QUOTE_STRING_MODE, t] }]
            }
        }
    }, {}],
    77: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["md", "mkdown", "mkd"],
                contains: [{
                    className: "header",
                    variants: [{ begin: "^#{1,6}", end: "$" }, { begin: "^.+?\\n[=-]{2,}$" }]
                }, { begin: "<", end: ">", subLanguage: "xml", relevance: 0 }, {
                    className: "bullet",
                    begin: "^([*+-]|(\\d+\\.))\\s+"
                }, { className: "strong", begin: "[*_]{2}.+?[*_]{2}" }, {
                    className: "emphasis",
                    variants: [{ begin: "\\*.+?\\*" }, { begin: "_.+?_", relevance: 0 }]
                }, { className: "blockquote", begin: "^>\\s+", end: "$" }, {
                    className: "code",
                    variants: [{ begin: "`.+?`" }, { begin: "^( {4}|	)", end: "$", relevance: 0 }]
                }, {
                    className: "horizontal_rule",
                    begin: "^[-\\*]{3,}",
                    end: "$"
                }, {
                    begin: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
                    returnBegin: !0,
                    contains: [{
                        className: "link_label",
                        begin: "\\[",
                        end: "\\]",
                        excludeBegin: !0,
                        returnEnd: !0,
                        relevance: 0
                    }, {
                        className: "link_url",
                        begin: "\\]\\(",
                        end: "\\)",
                        excludeBegin: !0,
                        excludeEnd: !0
                    }, { className: "link_reference", begin: "\\]\\[", end: "\\]", excludeBegin: !0, excludeEnd: !0 }],
                    relevance: 10
                }, {
                    begin: "^\\[.+\\]:",
                    returnBegin: !0,
                    contains: [{
                        className: "link_reference",
                        begin: "\\[",
                        end: "\\]:",
                        excludeBegin: !0,
                        excludeEnd: !0,
                        starts: { className: "link_url", end: "$" }
                    }]
                }]
            }
        }
    }, {}],
    78: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["mma"],
                lexemes: "(\\$|\\b)" + e.IDENT_RE + "\\b",
                keywords: "AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine Transparent UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian XMLElement XMLObject Xnor Xor Yellow YuleDissimilarity ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform $Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber",
                contains: [{
                    className: "comment",
                    begin: /\(\*/,
                    end: /\*\)/
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, {
                    className: "list",
                    begin: /\{/,
                    end: /\}/,
                    illegal: /:/
                }]
            }
        }
    }, {}],
    79: [function(require, module, exports) {
        module.exports = function(e) {
            var t = [e.C_NUMBER_MODE, {
                    className: "string",
                    begin: "'",
                    end: "'",
                    contains: [e.BACKSLASH_ESCAPE, { begin: "''" }]
                }],
                n = { relevance: 0, contains: [{ className: "operator", begin: /'['\.]*/ }] };
            return {
                keywords: {
                    keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",
                    built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson"
                },
                illegal: '(//|"|#|/\\*|\\s+/\\w+)',
                contains: [{
                    className: "function",
                    beginKeywords: "function",
                    end: "$",
                    contains: [e.UNDERSCORE_TITLE_MODE, {
                        className: "params",
                        begin: "\\(",
                        end: "\\)"
                    }, { className: "params", begin: "\\[", end: "\\]" }]
                }, {
                    begin: /[a-zA-Z_][a-zA-Z_0-9]*'['\.]*/,
                    returnBegin: !0,
                    relevance: 0,
                    contains: [{ begin: /[a-zA-Z_][a-zA-Z_0-9]*/, relevance: 0 }, n.contains[0]]
                }, {
                    className: "matrix",
                    begin: "\\[",
                    end: "\\]",
                    contains: t,
                    relevance: 0,
                    starts: n
                }, { className: "cell", begin: "\\{", end: /}/, contains: t, relevance: 0, starts: n }, {
                    begin: /\)/,
                    relevance: 0,
                    starts: n
                }, e.COMMENT("^\\s*\\%\\{\\s*$", "^\\s*\\%\\}\\s*$"), e.COMMENT("\\%", "$")].concat(t)
            }
        }
    }, {}],
    80: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: "int float string vector matrix if else switch case default while do for in break continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor animDisplay animView annotate appendStringArray applicationName applyAttrPreset applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem componentEditor compositingInterop computePolysetVolume condition cone confirmDialog connectAttr connectControl connectDynamic connectJoint connectionInfo constrain constrainValue constructionHistory container containsMultibyte contextInfo control convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse currentCtx currentTime currentTimeCtx currentUnit curve curveAddPtCtx curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected displayColor displayCull displayLevelOfDetail displayPref displayRGBColor displaySmoothness displayStats displayString displaySurface distanceDimContext distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor editorTemplate effector emit emitter enableDevice encodeString endString endsWith env equivalent equivalentTol erf error eval evalDeferred evalEcho event exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo filetest filletCurve filter filterCurve filterExpand filterStudioImport findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss geometryConstraint getApplicationVersionAsFloat getAttr getClassification getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation listNodeTypes listPanelCategories listRelatives listSets listTransforms listUnselected listerEditor loadFluid loadNewShelf loadPlugin loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration panelHistory paramDimContext paramDimension paramLocator parent parentConstraint particle particleExists particleInstancer particleRenderInfo partition pasteKey pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE registerPluginResource rehash reloadImage removeJoint removeMultiInstance removePanelCategory rename renameAttr renameSelectionList renameUI render renderGlobalsNode renderInfo renderLayerButton renderLayerParent renderLayerPostProcess renderLayerUnparent renderManip renderPartition renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor renderWindowSelectContext renderer reorder reorderDeformers requires reroot resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType selectedNodes selectionConnection separator setAttr setAttrEnumResource setAttrMapping setAttrNiceNameResource setConstraintRestPosition setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField shortNameOf showHelp showHidden showManipCtx showSelectionInTitle showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString stringToStringArray strip stripPrefixFromName stroke subdAutoProjection subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList textToShelf textureDisplacePlane textureHairColor texturePlacementContext textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper trace track trackCtx transferAttributes transformCompare transformLimits translator trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform",
                illegal: "</",
                contains: [e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    className: "string",
                    begin: "`",
                    end: "`",
                    contains: [e.BACKSLASH_ESCAPE]
                }, {
                    className: "variable",
                    variants: [{ begin: "\\$\\d" }, { begin: "[\\$\\%\\@](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)" }, {
                        begin: "\\*(\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)",
                        relevance: 0
                    }]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }
        }
    }, {}],
    81: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    keyword: "module use_module import_module include_module end_module initialise mutable initialize finalize finalise interface implementation pred mode func type inst solver any_pred any_func is semidet det nondet multi erroneous failure cc_nondet cc_multi typeclass instance where pragma promise external trace atomic or_else require_complete_switch require_det require_semidet require_multi require_nondet require_cc_multi require_cc_nondet require_erroneous require_failure",
                    pragma: "inline no_inline type_spec source_file fact_table obsolete memo loop_check minimal_model terminates does_not_terminate check_termination promise_equivalent_clauses",
                    preprocessor: "foreign_proc foreign_decl foreign_code foreign_type foreign_import_module foreign_export_enum foreign_export foreign_enum may_call_mercury will_not_call_mercury thread_safe not_thread_safe maybe_thread_safe promise_pure promise_semipure tabled_for_io local untrailed trailed attach_to_io_state can_pass_as_mercury_type stable will_not_throw_exception may_modify_trail will_not_modify_trail may_duplicate may_not_duplicate affects_liveness does_not_affect_liveness doesnt_affect_liveness no_sharing unknown_sharing sharing",
                    built_in: "some all not if then else true fail false try catch catch_any semidet_true semidet_false semidet_fail impure_true impure semipure"
                },
                n = { className: "label", begin: "XXX", end: "$", endsWithParent: !0, relevance: 0 },
                r = e.inherit(e.C_LINE_COMMENT_MODE, { begin: "%" }),
                i = e.inherit(e.C_BLOCK_COMMENT_MODE, { relevance: 0 });
            r.contains.push(n), i.contains.push(n);
            var a = { className: "number", begin: "0'.\\|0[box][0-9a-fA-F]*" },
                o = e.inherit(e.APOS_STRING_MODE, { relevance: 0 }),
                s = e.inherit(e.QUOTE_STRING_MODE, { relevance: 0 }),
                l = {
                    className: "constant",
                    begin: "\\\\[abfnrtv]\\|\\\\x[0-9a-fA-F]*\\\\\\|%[-+# *.0-9]*[dioxXucsfeEgGp]",
                    relevance: 0
                };
            s.contains.push(l);
            var c = {
                    className: "built_in",
                    variants: [{ begin: "<=>" }, { begin: "<=", relevance: 0 }, {
                        begin: "=>",
                        relevance: 0
                    }, { begin: "/\\\\" }, { begin: "\\\\/" }]
                },
                d = { className: "built_in", variants: [{ begin: ":-\\|-->" }, { begin: "=", relevance: 0 }] };
            return { aliases: ["m", "moo"], keywords: t, contains: [c, d, r, i, a, e.NUMBER_MODE, o, s, { begin: /:-/ }] }
        }
    }, {}],
    82: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: "environ vocabularies notations constructors definitions registrations theorems schemes requirements begin end definition registration cluster existence pred func defpred deffunc theorem proof let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from be being by means equals implies iff redefine define now not or attr is mode suppose per cases set thesis contradiction scheme reserve struct correctness compatibility coherence symmetry assymetry reflexivity irreflexivity connectedness uniqueness commutativity idempotence involutiveness projectivity",
                contains: [e.COMMENT("::", "$")]
            }
        }
    }, {}],
    83: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                subLanguage: "xml",
                contains: [{ className: "preprocessor", begin: "^__(END|DATA)__$" }, {
                    begin: "^\\s*%{1,2}={0,2}",
                    end: "$",
                    subLanguage: "perl"
                }, { begin: "<%{1,2}={0,2}", end: "={0,1}%>", subLanguage: "perl", excludeBegin: !0, excludeEnd: !0 }]
            }
        }
    }, {}],
    84: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "number", relevance: 0, variants: [{ begin: "[$][a-fA-F0-9]+" }, e.NUMBER_MODE] };
            return {
                case_insensitive: !0,
                keywords: {
                    keyword: "public private property continue exit extern new try catch eachin not abstract final select case default const local global field end if then else elseif endif while wend repeat until forever for to step next return module inline throw",
                    built_in: "DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed PI HALFPI TWOPI",
                    literal: "true false null and or shl shr mod"
                },
                contains: [e.COMMENT("#rem", "#end"), e.COMMENT("'", "$", { relevance: 0 }), {
                    className: "function",
                    beginKeywords: "function method",
                    end: "[(=:]|$",
                    illegal: /\n/,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: "$",
                    contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
                }, { className: "variable", begin: "\\b(self|super)\\b" }, {
                    className: "preprocessor",
                    beginKeywords: "import",
                    end: "$"
                }, {
                    className: "preprocessor",
                    begin: "\\s*#",
                    end: "$",
                    keywords: "if else elseif endif end then"
                }, { className: "pi", begin: "^\\s*strict\\b" }, {
                    beginKeywords: "alias",
                    end: "=",
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, e.QUOTE_STRING_MODE, t]
            }
        }
    }, {}],
    85: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    className: "variable",
                    variants: [{ begin: /\$\d+/ }, { begin: /\$\{/, end: /}/ }, { begin: "[\\$\\@]" + e.UNDERSCORE_IDENT_RE }]
                },
                n = {
                    endsWithParent: !0,
                    lexemes: "[a-z/_]+",
                    keywords: { built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll" },
                    relevance: 0,
                    illegal: "=>",
                    contains: [e.HASH_COMMENT_MODE, {
                        className: "string",
                        contains: [e.BACKSLASH_ESCAPE, t],
                        variants: [{ begin: /"/, end: /"/ }, { begin: /'/, end: /'/ }]
                    }, {
                        className: "url",
                        begin: "([a-z]+):/",
                        end: "\\s",
                        endsWithParent: !0,
                        excludeEnd: !0,
                        contains: [t]
                    }, {
                        className: "regexp",
                        contains: [e.BACKSLASH_ESCAPE, t],
                        variants: [{ begin: "\\s\\^", end: "\\s|{|;", returnEnd: !0 }, {
                            begin: "~\\*?\\s+",
                            end: "\\s|{|;",
                            returnEnd: !0
                        }, { begin: "\\*(\\.[a-z\\-]+)+" }, { begin: "([a-z\\-]+\\.)+\\*" }]
                    }, {
                        className: "number",
                        begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
                    }, { className: "number", begin: "\\b\\d+[kKmMgGdshdwy]*\\b", relevance: 0 }, t]
                };
            return {
                aliases: ["nginxconf"],
                contains: [e.HASH_COMMENT_MODE, {
                    begin: e.UNDERSCORE_IDENT_RE + "\\s",
                    end: ";|{",
                    returnBegin: !0,
                    contains: [{ className: "title", begin: e.UNDERSCORE_IDENT_RE, starts: n }],
                    relevance: 0
                }],
                illegal: "[^\\s\\}]"
            }
        }
    }, {}],
    86: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["nim"],
                keywords: {
                    keyword: "addr and as asm bind block break|0 case|0 cast const|0 continue|0 converter discard distinct|10 div do elif else|0 end|0 enum|0 except export finally for from generic if|0 import|0 in include|0 interface is isnot|10 iterator|10 let|0 macro method|10 mixin mod nil not notin|10 object|0 of or out proc|10 ptr raise ref|10 return shl shr static template try|0 tuple type|0 using|0 var|0 when while|0 with without xor yield",
                    literal: "shared guarded stdin stdout stderr result|10 true false"
                },
                contains: [{ className: "decorator", begin: /{\./, end: /\.}/, relevance: 10 }, {
                    className: "string",
                    begin: /[a-zA-Z]\w*"/,
                    end: /"/,
                    contains: [{ begin: /""/ }]
                }, {
                    className: "string",
                    begin: /([a-zA-Z]\w*)?"""/,
                    end: /"""/
                }, e.QUOTE_STRING_MODE, { className: "type", begin: /\b[A-Z]\w+\b/, relevance: 0 }, {
                    className: "type",
                    begin: /\b(int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|float32|float64|bool|char|string|cstring|pointer|expr|stmt|void|auto|any|range|array|openarray|varargs|seq|set|clong|culong|cchar|cschar|cshort|cint|csize|clonglong|cfloat|cdouble|clongdouble|cuchar|cushort|cuint|culonglong|cstringarray|semistatic)\b/
                }, {
                    className: "number",
                    begin: /\b(0[xX][0-9a-fA-F][_0-9a-fA-F]*)('?[iIuU](8|16|32|64))?/,
                    relevance: 0
                }, {
                    className: "number",
                    begin: /\b(0o[0-7][_0-7]*)('?[iIuUfF](8|16|32|64))?/,
                    relevance: 0
                }, {
                    className: "number",
                    begin: /\b(0(b|B)[01][_01]*)('?[iIuUfF](8|16|32|64))?/,
                    relevance: 0
                }, {
                    className: "number",
                    begin: /\b(\d[_\d]*)('?[iIuUfF](8|16|32|64))?/,
                    relevance: 0
                }, e.HASH_COMMENT_MODE]
            }
        }
    }, {}],
    87: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    keyword: "rec with let in inherit assert if else then",
                    constant: "true false or and null",
                    built_in: "import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"
                },
                n = { className: "subst", begin: /\$\{/, end: /}/, keywords: t },
                r = { className: "variable", begin: /[a-zA-Z0-9-_]+(\s*=)/, relevance: 0 },
                i = { className: "string", begin: "''", end: "''", contains: [n] },
                a = { className: "string", begin: '"', end: '"', contains: [n] },
                o = [e.NUMBER_MODE, e.HASH_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, i, a, r];
            return n.contains = o, { aliases: ["nixos"], keywords: t, contains: o }
        }
    }, {}],
    88: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    className: "symbol",
                    begin: "\\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)"
                },
                n = { className: "constant", begin: "\\$+{[a-zA-Z0-9_]+}" },
                r = { className: "variable", begin: "\\$+[a-zA-Z0-9_]+", illegal: "\\(\\){}" },
                i = { className: "constant", begin: "\\$+\\([a-zA-Z0-9_]+\\)" },
                a = {
                    className: "params",
                    begin: "(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HKCR|HKCU|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM|HKPD|HKU|IDABORT|IDCANCEL|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)"
                },
                o = {
                    className: "constant",
                    begin: "\\!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|makensis|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warning)"
                };
            return {
                case_insensitive: !1,
                keywords: {
                    keyword: "Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileSeek FileWrite FileWriteByte FileWriteUTF16LE FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI FunctionEnd GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText IntCmp IntCmpU IntFmt IntOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PageExEnd Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionEnd SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionGroupEnd SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetPluginUnload SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption SubSectionEnd Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegStr WriteUninstaller XPStyle",
                    literal: "admin all auto both colored current false force hide highest lastused leave listonly none normal notset off on open print show silent silentlog smooth textonly true user "
                },
                contains: [e.HASH_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "string",
                    begin: '"',
                    end: '"',
                    illegal: "\\n",
                    contains: [{ className: "symbol", begin: "\\$(\\\\(n|r|t)|\\$)" }, t, n, r, i]
                }, e.COMMENT(";", "$", { relevance: 0 }), {
                    className: "function",
                    beginKeywords: "Function PageEx Section SectionGroup SubSection",
                    end: "$"
                }, o, n, r, i, a, e.NUMBER_MODE, { className: "literal", begin: e.IDENT_RE + "::" + e.IDENT_RE }]
            }
        }
    }, {}],
    89: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "built_in", begin: "(AV|CA|CF|CG|CI|MK|MP|NS|UI)\\w+" },
                n = {
                    keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
                    literal: "false true FALSE TRUE nil YES NO NULL",
                    built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
                },
                r = /[a-zA-Z@][a-zA-Z0-9_]*/,
                i = "@interface @class @protocol @implementation";
            return {
                aliases: ["mm", "objc", "obj-c"],
                keywords: n,
                lexemes: r,
                illegal: "</",
                contains: [t, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, e.QUOTE_STRING_MODE, {
                    className: "string",
                    variants: [{ begin: '@"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE] }, {
                        begin: "'",
                        end: "[^\\\\]'",
                        illegal: "[^\\\\][^']"
                    }]
                }, {
                    className: "preprocessor",
                    begin: "#",
                    end: "$",
                    contains: [{ className: "title", variants: [{ begin: '"', end: '"' }, { begin: "<", end: ">" }] }]
                }, {
                    className: "class",
                    begin: "(" + i.split(" ").join("|") + ")\\b",
                    end: "({|$)",
                    excludeEnd: !0,
                    keywords: i,
                    lexemes: r,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, { className: "variable", begin: "\\." + e.UNDERSCORE_IDENT_RE, relevance: 0 }]
            }
        }
    }, {}],
    90: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["ml"],
                keywords: {
                    keyword: "and as assert asr begin class constraint do done downto else end exception external for fun function functor if in include inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method mod module mutable new object of open! open or private rec sig struct then to try type val! val virtual when while with parser value",
                    built_in: "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit in_channel out_channel ref",
                    literal: "true false"
                },
                illegal: /\/\/|>>/,
                lexemes: "[a-z_]\\w*!?",
                contains: [{
                    className: "literal",
                    begin: "\\[(\\|\\|)?\\]|\\(\\)",
                    relevance: 0
                }, e.COMMENT("\\(\\*", "\\*\\)", { contains: ["self"] }), {
                    className: "symbol",
                    begin: "'[A-Za-z_](?!')[\\w']*"
                }, { className: "tag", begin: "`[A-Z][\\w']*" }, {
                    className: "type",
                    begin: "\\b[A-Z][\\w']*",
                    relevance: 0
                }, { begin: "[a-z_]\\w*'[\\w']*" }, e.inherit(e.APOS_STRING_MODE, {
                    className: "char",
                    relevance: 0
                }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null }), {
                    className: "number",
                    begin: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
                    relevance: 0
                }, { begin: /[-=]>/ }]
            }
        }
    }, {}],
    91: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "keyword", begin: "\\$(f[asn]|t|vp[rtd]|children)" },
                n = { className: "literal", begin: "false|true|PI|undef" },
                r = { className: "number", begin: "\\b\\d+(\\.\\d+)?(e-?\\d+)?", relevance: 0 },
                i = e.inherit(e.QUOTE_STRING_MODE, { illegal: null }),
                a = { className: "preprocessor", keywords: "include use", begin: "include|use <", end: ">" },
                o = { className: "params", begin: "\\(", end: "\\)", contains: ["self", r, i, t, n] },
                s = { className: "built_in", begin: "[*!#%]", relevance: 0 },
                l = {
                    className: "function",
                    beginKeywords: "module function",
                    end: "\\=|\\{",
                    contains: [o, e.UNDERSCORE_TITLE_MODE]
                };
            return {
                aliases: ["scad"],
                keywords: {
                    keyword: "function module include use for intersection_for if else \\%",
                    literal: "false true PI undef",
                    built_in: "circle square polygon text sphere cube cylinder polyhedron translate rotate scale resize mirror multmatrix color offset hull minkowski union difference intersection abs sign sin cos tan acos asin atan atan2 floor round ceil ln log pow sqrt exp rands min max concat lookup str chr search version version_num norm cross parent_module echo import import_dxf dxf_linear_extrude linear_extrude rotate_extrude surface projection render children dxf_cross dxf_dim let assign"
                },
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r, a, i, t, s, l]
            }
        }
    }, {}],
    92: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained",
                n = e.COMMENT("{", "}", { relevance: 0 }),
                r = e.COMMENT("\\(\\*", "\\*\\)", { relevance: 10 }),
                i = { className: "string", begin: "'", end: "'", contains: [{ begin: "''" }] },
                a = { className: "string", begin: "(#\\d+)+" },
                o = {
                    className: "function",
                    beginKeywords: "function constructor destructor procedure method",
                    end: "[:;]",
                    keywords: "function constructor|10 destructor|10 procedure|10 method|10",
                    contains: [e.TITLE_MODE, {
                        className: "params",
                        begin: "\\(",
                        end: "\\)",
                        keywords: t,
                        contains: [i, a]
                    }, n, r]
                };
            return {
                case_insensitive: !0,
                keywords: t,
                illegal: '("|\\$[G-Zg-z]|\\/\\*|</|=>|->)',
                contains: [n, r, e.C_LINE_COMMENT_MODE, i, a, e.NUMBER_MODE, o, {
                    className: "class",
                    begin: "=\\bclass\\b",
                    end: "end;",
                    keywords: t,
                    contains: [i, a, n, r, e.C_LINE_COMMENT_MODE, o]
                }]
            }
        }
    }, {}],
    93: [function(require, module, exports) {
        module.exports = function(e) {
            var t = e.COMMENT("{", "}", { contains: ["self"] });
            return {
                subLanguage: "xml",
                relevance: 0,
                contains: [e.COMMENT("^#", "$"), e.COMMENT("\\^rem{", "}", {
                    relevance: 10,
                    contains: [t]
                }), {
                    className: "preprocessor",
                    begin: "^@(?:BASE|USE|CLASS|OPTIONS)$",
                    relevance: 10
                }, {
                    className: "title",
                    begin: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
                }, { className: "variable", begin: "\\$\\{?[\\w\\-\\.\\:]+\\}?" }, {
                    className: "keyword",
                    begin: "\\^[\\w\\-\\.\\:]+"
                }, { className: "number", begin: "\\^#[0-9a-fA-F]+" }, e.C_NUMBER_MODE]
            }
        }
    }, {}],
    94: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
                n = { className: "subst", begin: "[$@]\\{", end: "\\}", keywords: t },
                r = { begin: "->{", end: "}" },
                i = {
                    className: "variable",
                    variants: [{ begin: /\$\d/ }, { begin: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/ }, {
                        begin: /[\$%@][^\s\w{]/,
                        relevance: 0
                    }]
                },
                a = [e.BACKSLASH_ESCAPE, n, i],
                o = [i, e.HASH_COMMENT_MODE, e.COMMENT("^\\=\\w", "\\=cut", { endsWithParent: !0 }), r, {
                    className: "string",
                    contains: a,
                    variants: [{ begin: "q[qwxr]?\\s*\\(", end: "\\)", relevance: 5 }, {
                        begin: "q[qwxr]?\\s*\\[",
                        end: "\\]",
                        relevance: 5
                    }, { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 }, {
                        begin: "q[qwxr]?\\s*\\|",
                        end: "\\|",
                        relevance: 5
                    }, { begin: "q[qwxr]?\\s*\\<", end: "\\>", relevance: 5 }, {
                        begin: "qw\\s+q",
                        end: "q",
                        relevance: 5
                    }, { begin: "'", end: "'", contains: [e.BACKSLASH_ESCAPE] }, { begin: '"', end: '"' }, {
                        begin: "`",
                        end: "`",
                        contains: [e.BACKSLASH_ESCAPE]
                    }, { begin: "{\\w+}", contains: [], relevance: 0 }, {
                        begin: "-?\\w+\\s*\\=\\>",
                        contains: [],
                        relevance: 0
                    }]
                }, {
                    className: "number",
                    begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                    relevance: 0
                }, {
                    begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                    keywords: "split return print reverse grep",
                    relevance: 0,
                    contains: [e.HASH_COMMENT_MODE, {
                        className: "regexp",
                        begin: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                        relevance: 10
                    }, {
                        className: "regexp",
                        begin: "(m|qr)?/",
                        end: "/[a-z]*",
                        contains: [e.BACKSLASH_ESCAPE],
                        relevance: 0
                    }]
                }, {
                    className: "sub",
                    beginKeywords: "sub",
                    end: "(\\s*\\(.*?\\))?[;{]",
                    relevance: 5
                }, { className: "operator", begin: "-\\w\\b", relevance: 0 }, {
                    begin: "^__DATA__$",
                    end: "^__END__$",
                    subLanguage: "mojolicious",
                    contains: [{ begin: "^@@.*", end: "$", className: "comment" }]
                }];
            return n.contains = o, r.contains = o, { aliases: ["pl"], keywords: t, contains: o }
        }
    }, {}],
    95: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "variable", begin: /\$[\w\d#@][\w\d_]*/ },
                n = { className: "variable", begin: /</, end: />/ };
            return {
                aliases: ["pf.conf"],
                lexemes: /[a-z0-9_<>-]+/,
                keywords: {
                    built_in: "block match pass load anchor|5 antispoof|10 set table",
                    keyword: "in out log quick on rdomain inet inet6 proto from port os to routeallow-opts divert-packet divert-reply divert-to flags group icmp-typeicmp6-type label once probability recieved-on rtable prio queuetos tag tagged user keep fragment for os dropaf-to|10 binat-to|10 nat-to|10 rdr-to|10 bitmask least-stats random round-robinsource-hash static-portdup-to reply-to route-toparent bandwidth default min max qlimitblock-policy debug fingerprints hostid limit loginterface optimizationreassemble ruleset-optimization basic none profile skip state-defaultsstate-policy timeoutconst counters persistno modulate synproxy state|5 floating if-bound no-sync pflow|10 sloppysource-track global rule max-src-nodes max-src-states max-src-connmax-src-conn-rate overload flushscrub|5 max-mss min-ttl no-df|10 random-id",
                    literal: "all any no-route self urpf-failed egress|5 unknown"
                },
                contains: [e.HASH_COMMENT_MODE, e.NUMBER_MODE, e.QUOTE_STRING_MODE, t, n]
            }
        }
    }, {}],
    96: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "variable", begin: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*" },
                n = { className: "preprocessor", begin: /<\?(php)?|\?>/ },
                r = {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE, n],
                    variants: [{ begin: 'b"', end: '"' }, {
                        begin: "b'",
                        end: "'"
                    }, e.inherit(e.APOS_STRING_MODE, { illegal: null }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null })]
                },
                i = { variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE] };
            return {
                aliases: ["php3", "php4", "php5", "php6"],
                case_insensitive: !0,
                keywords: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
                contains: [e.C_LINE_COMMENT_MODE, e.HASH_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", {
                    contains: [{
                        className: "doctag",
                        begin: "@[A-Za-z]+"
                    }, n]
                }), e.COMMENT("__halt_compiler.+?;", !1, {
                    endsWithParent: !0,
                    keywords: "__halt_compiler",
                    lexemes: e.UNDERSCORE_IDENT_RE
                }), {
                    className: "string",
                    begin: /<<<['"]?\w+['"]?$/,
                    end: /^\w+;?$/,
                    contains: [e.BACKSLASH_ESCAPE, {
                        className: "subst",
                        variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }]
                    }]
                }, n, t, { begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ }, {
                    className: "function",
                    beginKeywords: "function",
                    end: /[;{]/,
                    excludeEnd: !0,
                    illegal: "\\$|\\[|%",
                    contains: [e.UNDERSCORE_TITLE_MODE, {
                        className: "params",
                        begin: "\\(",
                        end: "\\)",
                        contains: ["self", t, e.C_BLOCK_COMMENT_MODE, r, i]
                    }]
                }, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: "{",
                    excludeEnd: !0,
                    illegal: /[:\(\$"]/,
                    contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
                }, {
                    beginKeywords: "namespace",
                    end: ";",
                    illegal: /[\.']/,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, { beginKeywords: "use", end: ";", contains: [e.UNDERSCORE_TITLE_MODE] }, { begin: "=>" }, r, i]
            }
        }
    }, {}],
    97: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { begin: "`[\\s\\S]", relevance: 0 },
                n = { className: "variable", variants: [{ begin: /\$[\w\d][\w\d_:]*/ }] },
                r = {
                    className: "string",
                    begin: /"/,
                    end: /"/,
                    contains: [t, n, { className: "variable", begin: /\$[A-z]/, end: /[^A-z]/ }]
                },
                i = { className: "string", begin: /'/, end: /'/ };
            return {
                aliases: ["ps"],
                lexemes: /-?[A-z\.\-]+/,
                case_insensitive: !0,
                keywords: {
                    keyword: "if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch",
                    literal: "$null $true $false",
                    built_in: "Add-Content Add-History Add-Member Add-PSSnapin Clear-Content Clear-Item Clear-Item Property Clear-Variable Compare-Object ConvertFrom-SecureString Convert-Path ConvertTo-Html ConvertTo-SecureString Copy-Item Copy-ItemProperty Export-Alias Export-Clixml Export-Console Export-Csv ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-Content Get-Credential Get-Culture Get-Date Get-EventLog Get-ExecutionPolicy Get-Help Get-History Get-Host Get-Item Get-ItemProperty Get-Location Get-Member Get-PfxCertificate Get-Process Get-PSDrive Get-PSProvider Get-PSSnapin Get-Service Get-TraceSource Get-UICulture Get-Unique Get-Variable Get-WmiObject Group-Object Import-Alias Import-Clixml Import-Csv Invoke-Expression Invoke-History Invoke-Item Join-Path Measure-Command Measure-Object Move-Item Move-ItemProperty New-Alias New-Item New-ItemProperty New-Object New-PSDrive New-Service New-TimeSpan New-Variable Out-Default Out-File Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Remove-Item Remove-ItemProperty Remove-PSDrive Remove-PSSnapin Remove-Variable Rename-Item Rename-ItemProperty Resolve-Path Restart-Service Resume-Service Select-Object Select-String Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-Location Set-PSDebug Set-Service Set-TraceSource Set-Variable Sort-Object Split-Path Start-Service Start-Sleep Start-Transcript Stop-Process Stop-Service Stop-Transcript Suspend-Service Tee-Object Test-Path Trace-Command Update-FormatData Update-TypeData Where-Object Write-Debug Write-Error Write-Host Write-Output Write-Progress Write-Verbose Write-Warning",
                    operator: "-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace"
                },
                contains: [e.HASH_COMMENT_MODE, e.NUMBER_MODE, r, i, n]
            }
        }
    }, {}],
    98: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    keyword: "BufferedReader PVector PFont PImage PGraphics HashMap boolean byte char color double float int long String Array FloatDict FloatList IntDict IntList JSONArray JSONObject Object StringDict StringList Table TableRow XML false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
                    constant: "P2D P3D HALF_PI PI QUARTER_PI TAU TWO_PI",
                    variable: "displayHeight displayWidth mouseY mouseX mousePressed pmouseX pmouseY key keyCode pixels focused frameCount frameRate height width",
                    title: "setup draw",
                    built_in: "size createGraphics beginDraw createShape loadShape PShape arc ellipse line point quad rect triangle bezier bezierDetail bezierPoint bezierTangent curve curveDetail curvePoint curveTangent curveTightness shape shapeMode beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight mouseClicked mouseDragged mouseMoved mousePressed mouseReleased mouseWheel keyPressed keyPressedkeyReleased keyTyped print println save saveFrame day hour millis minute month second year background clear colorMode fill noFill noStroke stroke alpha blue brightness color green hue lerpColor red saturation modelX modelY modelZ screenX screenY screenZ ambient emissive shininess specular add createImage beginCamera camera endCamera frustum ortho perspective printCamera printProjection cursor frameRate noCursor exit loop noLoop popStyle pushStyle redraw binary boolean byte char float hex int str unbinary unhex join match matchAll nf nfc nfp nfs split splitTokens trim append arrayCopy concat expand reverse shorten sort splice subset box sphere sphereDetail createInput createReader loadBytes loadJSONArray loadJSONObject loadStrings loadTable loadXML open parseXML saveTable selectFolder selectInput beginRaw beginRecord createOutput createWriter endRaw endRecord PrintWritersaveBytes saveJSONArray saveJSONObject saveStream saveStrings saveXML selectOutput popMatrix printMatrix pushMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate ambientLight directionalLight lightFalloff lights lightSpecular noLights normal pointLight spotLight image imageMode loadImage noTint requestImage tint texture textureMode textureWrap blend copy filter get loadPixels set updatePixels blendMode loadShader PShaderresetShader shader createFont loadFont text textFont textAlign textLeading textMode textSize textWidth textAscent textDescent abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt acos asin atan atan2 cos degrees radians sin tan noise noiseDetail noiseSeed random randomGaussian randomSeed"
                },
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE]
            }
        }
    }, {}],
    99: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                contains: [e.C_NUMBER_MODE, {
                    className: "built_in",
                    begin: "{",
                    end: "}$",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE],
                    relevance: 0
                }, {
                    className: "filename",
                    begin: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
                    end: ":",
                    excludeEnd: !0
                }, {
                    className: "header",
                    begin: "(ncalls|tottime|cumtime)",
                    end: "$",
                    keywords: "ncalls tottime|10 cumtime|10 filename",
                    relevance: 10
                }, {
                    className: "summary",
                    begin: "function calls",
                    end: "$",
                    contains: [e.C_NUMBER_MODE],
                    relevance: 10
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    className: "function",
                    begin: "\\(",
                    end: "\\)$",
                    contains: [e.UNDERSCORE_TITLE_MODE],
                    relevance: 0
                }]
            }
        }
    }, {}],
    100: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "atom", begin: /[a-z][A-Za-z0-9_]*/, relevance: 0 },
                n = {
                    className: "name",
                    variants: [{ begin: /[A-Z][a-zA-Z0-9_]*/ }, { begin: /_[A-Za-z0-9_]*/ }],
                    relevance: 0
                },
                r = { begin: /\(/, end: /\)/, relevance: 0 },
                i = { begin: /\[/, end: /\]/ },
                a = { className: "comment", begin: /%/, end: /$/, contains: [e.PHRASAL_WORDS_MODE] },
                o = { className: "string", begin: /`/, end: /`/, contains: [e.BACKSLASH_ESCAPE] },
                s = { className: "string", begin: /0\'(\\\'|.)/ },
                l = { className: "string", begin: /0\'\\s/ },
                c = { begin: /:-/ },
                d = [t, n, r, c, i, a, e.C_BLOCK_COMMENT_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, o, s, l, e.C_NUMBER_MODE];
            return r.contains = d, i.contains = d, { contains: d.concat([{ begin: /\.$/ }]) }
        }
    }, {}],
    101: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    keyword: "package import option optional required repeated group",
                    built_in: "double float int32 int64 uint32 uint64 sint32 sint64 fixed32 fixed64 sfixed32 sfixed64 bool string bytes",
                    literal: "true false"
                },
                contains: [e.QUOTE_STRING_MODE, e.NUMBER_MODE, e.C_LINE_COMMENT_MODE, {
                    className: "class",
                    beginKeywords: "message enum service",
                    end: /\{/,
                    illegal: /\n/,
                    contains: [e.inherit(e.TITLE_MODE, { starts: { endsWithParent: !0, excludeEnd: !0 } })]
                }, {
                    className: "function",
                    beginKeywords: "rpc",
                    end: /;/,
                    excludeEnd: !0,
                    keywords: "rpc returns"
                }, { className: "constant", begin: /^\s*[A-Z_]+/, end: /\s*=/, excludeEnd: !0 }]
            }
        }
    }, {}],
    102: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    keyword: "and case default else elsif false if in import enherits node or true undef unless main settings $string ",
                    literal: "alias audit before loglevel noop require subscribe tag owner ensure group mode name|0 changes context force incl lens load_path onlyif provider returns root show_diff type_check en_address ip_address realname command environment hour monute month monthday special target weekday creates cwd ogoutput refresh refreshonly tries try_sleep umask backup checksum content ctime force ignore links mtime purge recurse recurselimit replace selinux_ignore_defaults selrange selrole seltype seluser source souirce_permissions sourceselect validate_cmd validate_replacement allowdupe attribute_membership auth_membership forcelocal gid ia_load_module members system host_aliases ip allowed_trunk_vlans description device_url duplex encapsulation etherchannel native_vlan speed principals allow_root auth_class auth_type authenticate_user k_of_n mechanisms rule session_owner shared options device fstype enable hasrestart directory present absent link atboot blockdevice device dump pass remounts poller_tag use message withpath adminfile allow_virtual allowcdrom category configfiles flavor install_options instance package_settings platform responsefile status uninstall_options vendor unless_system_user unless_uid binary control flags hasstatus manifest pattern restart running start stop allowdupe auths expiry gid groups home iterations key_membership keys managehome membership password password_max_age password_min_age profile_membership profiles project purge_ssh_keys role_membership roles salt shell uid baseurl cost descr enabled enablegroups exclude failovermethod gpgcheck gpgkey http_caching include includepkgs keepalive metadata_expire metalink mirrorlist priority protect proxy proxy_password proxy_username repo_gpgcheck s3_enabled skip_if_unavailable sslcacert sslclientcert sslclientkey sslverify mounted",
                    built_in: "architecture augeasversion blockdevices boardmanufacturer boardproductname boardserialnumber cfkey dhcp_servers domain ec2_ ec2_userdata facterversion filesystems ldom fqdn gid hardwareisa hardwaremodel hostname id|0 interfaces ipaddress ipaddress_ ipaddress6 ipaddress6_ iphostnumber is_virtual kernel kernelmajversion kernelrelease kernelversion kernelrelease kernelversion lsbdistcodename lsbdistdescription lsbdistid lsbdistrelease lsbmajdistrelease lsbminordistrelease lsbrelease macaddress macaddress_ macosx_buildversion macosx_productname macosx_productversion macosx_productverson_major macosx_productversion_minor manufacturer memoryfree memorysize netmask metmask_ network_ operatingsystem operatingsystemmajrelease operatingsystemrelease osfamily partitions path physicalprocessorcount processor processorcount productname ps puppetversion rubysitedir rubyversion selinux selinux_config_mode selinux_config_policy selinux_current_mode selinux_current_mode selinux_enforced selinux_policyversion serialnumber sp_ sshdsakey sshecdsakey sshrsakey swapencrypted swapfree swapsize timezone type uniqueid uptime uptime_days uptime_hours uptime_seconds uuid virtual vlans xendomains zfs_version zonenae zones zpool_version"
                },
                n = e.COMMENT("#", "$"),
                r = "([A-Za-z_]|::)(\\w|::)*",
                i = e.inherit(e.TITLE_MODE, { begin: r }),
                a = { className: "variable", begin: "\\$" + r },
                o = {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE, a],
                    variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }]
                };
            return {
                aliases: ["pp"],
                contains: [n, a, o, {
                    beginKeywords: "class",
                    end: "\\{|;",
                    illegal: /=/,
                    contains: [i, n]
                }, {
                    beginKeywords: "define",
                    end: /\{/,
                    contains: [{ className: "title", begin: e.IDENT_RE, endsParent: !0 }]
                }, {
                    begin: e.IDENT_RE + "\\s+\\{",
                    returnBegin: !0,
                    end: /\S/,
                    contains: [{ className: "name", begin: e.IDENT_RE }, {
                        begin: /\{/,
                        end: /\}/,
                        keywords: t,
                        relevance: 0,
                        contains: [o, n, { begin: "[a-zA-Z_]+\\s*=>" }, {
                            className: "number",
                            begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                            relevance: 0
                        }, a]
                    }],
                    relevance: 0
                }]
            }
        }
    }, {}],
    103: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "prompt", begin: /^(>>>|\.\.\.) / },
                n = {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE],
                    variants: [{ begin: /(u|b)?r?'''/, end: /'''/, contains: [t], relevance: 10 }, {
                        begin: /(u|b)?r?"""/,
                        end: /"""/,
                        contains: [t],
                        relevance: 10
                    }, { begin: /(u|r|ur)'/, end: /'/, relevance: 10 }, {
                        begin: /(u|r|ur)"/,
                        end: /"/,
                        relevance: 10
                    }, { begin: /(b|br)'/, end: /'/ }, { begin: /(b|br)"/, end: /"/ }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
                },
                r = {
                    className: "number",
                    relevance: 0,
                    variants: [{ begin: e.BINARY_NUMBER_RE + "[lLjJ]?" }, { begin: "\\b(0o[0-7]+)[lLjJ]?" }, { begin: e.C_NUMBER_RE + "[lLjJ]?" }]
                },
                i = { className: "params", begin: /\(/, end: /\)/, contains: ["self", t, r, n] };
            return {
                aliases: ["py", "gyp"],
                keywords: {
                    keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
                    built_in: "Ellipsis NotImplemented"
                },
                illegal: /(<\/|->|\?)/,
                contains: [t, r, n, e.HASH_COMMENT_MODE, {
                    variants: [{
                        className: "function",
                        beginKeywords: "def",
                        relevance: 10
                    }, { className: "class", beginKeywords: "class" }],
                    end: /:/,
                    illegal: /[${=;\n,]/,
                    contains: [e.UNDERSCORE_TITLE_MODE, i]
                }, { className: "decorator", begin: /^[\t ]*@/, end: /$/ }, { begin: /\b(print|exec)\(/ }]
            }
        }
    }, {}],
    104: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                keyword: "do while select delete by update from",
                constant: "0b 1b",
                built_in: "neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 ij pj asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum",
                typename: "`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid"
            };
            return {
                aliases: ["k", "kdb"],
                keywords: t,
                lexemes: /\b(`?)[A-Za-z0-9_]+\b/,
                contains: [e.C_LINE_COMMENT_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE]
            }
        }
    }, {}],
    105: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
            return {
                contains: [e.HASH_COMMENT_MODE, {
                    begin: t,
                    lexemes: t,
                    keywords: {
                        keyword: "function if in break next repeat else for return switch while try tryCatch stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...",
                        literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
                    },
                    relevance: 0
                }, { className: "number", begin: "0[xX][0-9a-fA-F]+[Li]?\\b", relevance: 0 }, {
                    className: "number",
                    begin: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
                    relevance: 0
                }, { className: "number", begin: "\\d+\\.(?!\\d)(?:i\\b)?", relevance: 0 }, {
                    className: "number",
                    begin: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
                    relevance: 0
                }, { className: "number", begin: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b", relevance: 0 }, {
                    begin: "`",
                    end: "`",
                    relevance: 0
                }, {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE],
                    variants: [{ begin: '"', end: '"' }, { begin: "'", end: "'" }]
                }]
            }
        }
    }, {}],
    106: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd",
                illegal: "</",
                contains: [e.HASH_COMMENT_MODE, e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
            }
        }
    }, {}],
    107: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Z-_][^\n{\r\n]+\\{";
            return {
                aliases: ["graph", "instances"],
                case_insensitive: !0,
                keywords: "import",
                contains: [{
                    className: "facet",
                    begin: "^facet " + t,
                    end: "}",
                    keywords: "facet installer exports children extends",
                    contains: [e.HASH_COMMENT_MODE]
                }, {
                    className: "instance-of",
                    begin: "^instance of " + t,
                    end: "}",
                    keywords: "name count channels instance-data instance-state instance of",
                    contains: [{ className: "keyword", begin: "[a-zA-Z-_]+( |	)*:" }, e.HASH_COMMENT_MODE]
                }, {
                    className: "component",
                    begin: "^" + t,
                    end: "}",
                    lexemes: "\\(?[a-zA-Z]+\\)?",
                    keywords: "installer exports children extends imports facets alias (optional)",
                    contains: [{
                        className: "string",
                        begin: "\\.[a-zA-Z-_]+",
                        end: "\\s|,|;",
                        excludeEnd: !0
                    }, e.HASH_COMMENT_MODE]
                }, e.HASH_COMMENT_MODE]
            }
        }
    }, {}],
    108: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    keyword: "float color point normal vector matrix while for if do return else break extern continue",
                    built_in: "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
                },
                illegal: "</",
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_NUMBER_MODE, {
                    className: "preprocessor",
                    begin: "#",
                    end: "$"
                }, {
                    className: "shader",
                    beginKeywords: "surface displacement light volume imager",
                    end: "\\("
                }, { className: "shading", beginKeywords: "illuminate illuminance gather", end: "\\(" }]
            }
        }
    }, {}],
    109: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
                n = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
                r = { className: "doctag", begin: "@[A-Za-z]+" },
                i = { className: "value", begin: "#<", end: ">" },
                a = [e.COMMENT("#", "$", { contains: [r] }), e.COMMENT("^\\=begin", "^\\=end", {
                    contains: [r],
                    relevance: 10
                }), e.COMMENT("^__END__", "\\n$")],
                o = { className: "subst", begin: "#\\{", end: "}", keywords: n },
                s = {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE, o],
                    variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }, {
                        begin: /`/,
                        end: /`/
                    }, { begin: "%[qQwWx]?\\(", end: "\\)" }, { begin: "%[qQwWx]?\\[", end: "\\]" }, {
                        begin: "%[qQwWx]?{",
                        end: "}"
                    }, { begin: "%[qQwWx]?<", end: ">" }, { begin: "%[qQwWx]?/", end: "/" }, {
                        begin: "%[qQwWx]?%",
                        end: "%"
                    }, { begin: "%[qQwWx]?-", end: "-" }, {
                        begin: "%[qQwWx]?\\|",
                        end: "\\|"
                    }, { begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/ }]
                },
                l = { className: "params", begin: "\\(", end: "\\)", keywords: n },
                c = [s, i, {
                    className: "class",
                    beginKeywords: "class module",
                    end: "$|;",
                    illegal: /=/,
                    contains: [e.inherit(e.TITLE_MODE, { begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?" }), {
                        className: "inheritance",
                        begin: "<\\s*",
                        contains: [{ className: "parent", begin: "(" + e.IDENT_RE + "::)?" + e.IDENT_RE }]
                    }].concat(a)
                }, {
                    className: "function",
                    beginKeywords: "def",
                    end: "$|;",
                    contains: [e.inherit(e.TITLE_MODE, { begin: t }), l].concat(a)
                }, { className: "constant", begin: "(::)?(\\b[A-Z]\\w*(::)?)+", relevance: 0 }, {
                    className: "symbol",
                    begin: e.UNDERSCORE_IDENT_RE + "(\\!|\\?)?:",
                    relevance: 0
                }, { className: "symbol", begin: ":", contains: [s, { begin: t }], relevance: 0 }, {
                    className: "number",
                    begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                    relevance: 0
                }, {
                    className: "variable",
                    begin: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
                }, {
                    begin: "(" + e.RE_STARTERS_RE + ")\\s*",
                    contains: [i, {
                        className: "regexp",
                        contains: [e.BACKSLASH_ESCAPE, o],
                        illegal: /\n/,
                        variants: [{ begin: "/", end: "/[a-z]*" }, { begin: "%r{", end: "}[a-z]*" }, {
                            begin: "%r\\(",
                            end: "\\)[a-z]*"
                        }, { begin: "%r!", end: "![a-z]*" }, { begin: "%r\\[", end: "\\][a-z]*" }]
                    }].concat(a),
                    relevance: 0
                }].concat(a);
            o.contains = c, l.contains = c;
            var d = "[>?]>",
                u = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
                p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
                m = [{ begin: /^\s*=>/, className: "status", starts: { end: "$", contains: c } }, {
                    className: "prompt",
                    begin: "^(" + d + "|" + u + "|" + p + ")",
                    starts: { end: "$", contains: c }
                }];
            return { aliases: ["rb", "gemspec", "podspec", "thor", "irb"], keywords: n, contains: a.concat(m).concat(c) }
        }
    }, {}],
    110: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    keyword: "BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM NUMDAYS READ_DATE STAGING",
                    built_in: "IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME"
                },
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, {
                    className: "array",
                    variants: [{ begin: "#\\s+[a-zA-Z\\ \\.]*", relevance: 0 }, { begin: "#[a-zA-Z\\ \\.]+" }]
                }]
            }
        }
    }, {}],
    111: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "([uif](8|16|32|64|size))?",
                n = e.inherit(e.C_BLOCK_COMMENT_MODE);
            return n.contains.push("self"), {
                aliases: ["rs"],
                keywords: {
                    keyword: "alignof as be box break const continue crate do else enum extern false fn for if impl in let loop match mod mut offsetof once priv proc pub pure ref return self Self sizeof static struct super trait true type typeof unsafe unsized use virtual while where yield int i8 i16 i32 i64 uint u8 u32 u64 float f32 f64 str char bool",
                    built_in: "Copy Send Sized Sync Drop Fn FnMut FnOnce drop Box ToOwned Clone PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator Option Some None Result Ok Err SliceConcatExt String ToString Vec assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln!"
                },
                lexemes: e.IDENT_RE + "!?",
                illegal: "</",
                contains: [e.C_LINE_COMMENT_MODE, n, e.inherit(e.QUOTE_STRING_MODE, { illegal: null }), {
                    className: "string",
                    variants: [{ begin: /r(#*)".*?"\1(?!#)/ }, { begin: /'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }, { begin: /'[a-zA-Z_][a-zA-Z0-9_]*/ }]
                }, {
                    className: "number",
                    variants: [{ begin: "\\b0b([01_]+)" + t }, { begin: "\\b0o([0-7_]+)" + t }, { begin: "\\b0x([A-Fa-f0-9_]+)" + t }, { begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + t }],
                    relevance: 0
                }, {
                    className: "function",
                    beginKeywords: "fn",
                    end: "(\\(|<)",
                    excludeEnd: !0,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, { className: "preprocessor", begin: "#\\!?\\[", end: "\\]" }, {
                    beginKeywords: "type",
                    end: "(=|<)",
                    contains: [e.UNDERSCORE_TITLE_MODE],
                    illegal: "\\S"
                }, {
                    beginKeywords: "trait enum",
                    end: "{",
                    contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { endsParent: !0 })],
                    illegal: "[\\w\\d]"
                }, { begin: e.IDENT_RE + "::" }, { begin: "->" }]
            }
        }
    }, {}],
    112: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "annotation", begin: "@[A-Za-z]+" },
                n = { className: "string", begin: 'u?r?"""', end: '"""', relevance: 10 },
                r = { className: "symbol", begin: "'\\w[\\w\\d_]*(?!')" },
                i = { className: "type", begin: "\\b[A-Z][A-Za-z0-9_]*", relevance: 0 },
                a = {
                    className: "title",
                    begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
                    relevance: 0
                },
                o = {
                    className: "class",
                    beginKeywords: "class object trait type",
                    end: /[:={\[(\n;]/,
                    contains: [{ className: "keyword", beginKeywords: "extends with", relevance: 10 }, a]
                },
                s = { className: "function", beginKeywords: "def val", end: /[:={\[(\n;]/, contains: [a] };
            return {
                keywords: {
                    literal: "true false null",
                    keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
                },
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, n, e.QUOTE_STRING_MODE, r, i, s, o, e.C_NUMBER_MODE, t]
            }
        }
    }, {}],
    113: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+",
                n = "(\\-|\\+)?\\d+([./]\\d+)?",
                r = n + "[+\\-]" + n + "i",
                i = { built_in: "case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules ' * + , ,@ - ... / ; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?" },
                a = { className: "shebang", begin: "^#!", end: "$" },
                o = { className: "literal", begin: "(#t|#f|#\\\\" + t + "|#\\\\.)" },
                s = {
                    className: "number",
                    variants: [{ begin: n, relevance: 0 }, {
                        begin: r,
                        relevance: 0
                    }, { begin: "#b[0-1]+(/[0-1]+)?" }, { begin: "#o[0-7]+(/[0-7]+)?" }, { begin: "#x[0-9a-f]+(/[0-9a-f]+)?" }]
                },
                l = e.QUOTE_STRING_MODE,
                c = [e.COMMENT(";", "$", { relevance: 0 }), e.COMMENT("#\\|", "\\|#")],
                d = { begin: t, relevance: 0 },
                u = { className: "variable", begin: "'" + t },
                p = { endsWithParent: !0, relevance: 0 },
                m = {
                    className: "list",
                    variants: [{ begin: "\\(", end: "\\)" }, { begin: "\\[", end: "\\]" }],
                    contains: [{ className: "keyword", begin: t, lexemes: t, keywords: i }, p]
                };
            return p.contains = [o, s, l, d, u, m].concat(c), { illegal: /\S/, contains: [a, s, l, u, m].concat(c) }
        }
    }, {}],
    114: [function(require, module, exports) {
        module.exports = function(e) {
            var t = [e.C_NUMBER_MODE, {
                className: "string",
                begin: "'|\"",
                end: "'|\"",
                contains: [e.BACKSLASH_ESCAPE, { begin: "''" }]
            }];
            return {
                aliases: ["sci"],
                keywords: {
                    keyword: "abort break case clear catch continue do elseif else endfunction end for functionglobal if pause return resume select try then while%f %F %t %T %pi %eps %inf %nan %e %i %z %s",
                    built_in: "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp errorexec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isemptyisinfisnan isvector lasterror length load linspace list listfiles log10 log2 logmax min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand realround sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tantype typename warning zeros matrix"
                },
                illegal: '("|#|/\\*|\\s+/\\w+)',
                contains: [{
                    className: "function",
                    beginKeywords: "function endfunction",
                    end: "$",
                    keywords: "function endfunction|10",
                    contains: [e.UNDERSCORE_TITLE_MODE, { className: "params", begin: "\\(", end: "\\)" }]
                }, {
                    className: "transposed_variable",
                    begin: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
                    end: "",
                    relevance: 0
                }, {
                    className: "matrix",
                    begin: "\\[",
                    end: "\\]'*[\\.']*",
                    relevance: 0,
                    contains: t
                }, e.COMMENT("//", "$")].concat(t)
            }
        }
    }, {}],
    115: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
                n = { className: "variable", begin: "(\\$" + t + ")\\b" },
                r = { className: "function", begin: t + "\\(", returnBegin: !0, excludeEnd: !0, end: "\\(" },
                i = { className: "hexcolor", begin: "#[0-9A-Fa-f]+" };
            ({
                className: "attribute",
                begin: "[A-Z\\_\\.\\-]+",
                end: ":",
                excludeEnd: !0,
                illegal: "[^\\s]",
                starts: {
                    className: "value",
                    endsWithParent: !0,
                    excludeEnd: !0,
                    contains: [r, i, e.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_BLOCK_COMMENT_MODE, {
                        className: "important",
                        begin: "!important"
                    }]
                }
            });
            return {
                case_insensitive: !0,
                illegal: "[=/|']",
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r, {
                    className: "id",
                    begin: "\\#[A-Za-z0-9_-]+",
                    relevance: 0
                }, { className: "class", begin: "\\.[A-Za-z0-9_-]+", relevance: 0 }, {
                    className: "attr_selector",
                    begin: "\\[",
                    end: "\\]",
                    illegal: "$"
                }, {
                    className: "tag",
                    begin: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
                    relevance: 0
                }, {
                    className: "pseudo",
                    begin: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
                }, {
                    className: "pseudo",
                    begin: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
                }, n, {
                    className: "attribute",
                    begin: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
                    illegal: "[^\\s]"
                }, {
                    className: "value",
                    begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
                }, {
                    className: "value",
                    begin: ":",
                    end: ";",
                    contains: [r, n, i, e.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
                        className: "important",
                        begin: "!important"
                    }]
                }, {
                    className: "at_rule",
                    begin: "@",
                    end: "[{;]",
                    keywords: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
                    contains: [r, n, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, i, e.CSS_NUMBER_MODE, {
                        className: "preprocessor",
                        begin: "\\s[A-Za-z0-9_.-]+",
                        relevance: 0
                    }]
                }]
            }
        }
    }, {}],
    116: [function(require, module, exports) {
        module.exports = function(e) {
            var t = ["add", "and", "cmp", "cmpg", "cmpl", "const", "div", "double", "float", "goto", "if", "int", "long", "move", "mul", "neg", "new", "nop", "not", "or", "rem", "return", "shl", "shr", "sput", "sub", "throw", "ushr", "xor"],
                n = ["aget", "aput", "array", "check", "execute", "fill", "filled", "goto/16", "goto/32", "iget", "instance", "invoke", "iput", "monitor", "packed", "sget", "sparse"],
                r = ["transient", "constructor", "abstract", "final", "synthetic", "public", "private", "protected", "static", "bridge", "system"];
            return {
                aliases: ["smali"],
                contains: [{
                    className: "string",
                    begin: '"',
                    end: '"',
                    relevance: 0
                }, e.COMMENT("#", "$", { relevance: 0 }), {
                    className: "keyword",
                    begin: "\\s*\\.end\\s[a-zA-Z0-9]*",
                    relevance: 1
                }, { className: "keyword", begin: "^[ ]*\\.[a-zA-Z]*", relevance: 0 }, {
                    className: "keyword",
                    begin: "\\s:[a-zA-Z_0-9]*",
                    relevance: 0
                }, { className: "keyword", begin: "\\s(" + r.join("|") + ")", relevance: 1 }, {
                    className: "keyword",
                    begin: "\\[",
                    relevance: 0
                }, {
                    className: "instruction",
                    begin: "\\s(" + t.join("|") + ")\\s",
                    relevance: 1
                }, {
                    className: "instruction",
                    begin: "\\s(" + t.join("|") + ")((\\-|/)[a-zA-Z0-9]+)+\\s",
                    relevance: 10
                }, {
                    className: "instruction",
                    begin: "\\s(" + n.join("|") + ")((\\-|/)[a-zA-Z0-9]+)*\\s",
                    relevance: 10
                }, { className: "class", begin: "L[^(;:\n]*;", relevance: 0 }, {
                    className: "function",
                    begin: '( |->)[^(\n ;"]*\\(',
                    relevance: 0
                }, { className: "function", begin: "\\)", relevance: 0 }, {
                    className: "variable",
                    begin: "[vp][0-9]+",
                    relevance: 0
                }]
            }
        }
    }, {}],
    117: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[a-z][a-zA-Z0-9_]*",
                n = { className: "char", begin: "\\$.{1}" },
                r = { className: "symbol", begin: "#" + e.UNDERSCORE_IDENT_RE };
            return {
                aliases: ["st"],
                keywords: "self super nil true false thisContext",
                contains: [e.COMMENT('"', '"'), e.APOS_STRING_MODE, {
                    className: "class",
                    begin: "\\b[A-Z][A-Za-z0-9_]*",
                    relevance: 0
                }, { className: "method", begin: t + ":", relevance: 0 }, e.C_NUMBER_MODE, r, n, {
                    className: "localvars",
                    begin: "\\|[ ]*" + t + "([ ]+" + t + ")*[ ]*\\|",
                    returnBegin: !0,
                    end: /\|/,
                    illegal: /\S/,
                    contains: [{ begin: "(\\|[ ]*)?" + t }]
                }, {
                    className: "array",
                    begin: "\\#\\(",
                    end: "\\)",
                    contains: [e.APOS_STRING_MODE, n, e.C_NUMBER_MODE, r]
                }]
            }
        }
    }, {}],
    118: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["ml"],
                keywords: {
                    keyword: "abstype and andalso as case datatype do else end eqtype exception fn fun functor handle if in include infix infixr let local nonfix of op open orelse raise rec sharing sig signature struct structure then type val with withtype where while",
                    built_in: "array bool char exn int list option order real ref string substring vector unit word",
                    literal: "true false NONE SOME LESS EQUAL GREATER nil"
                },
                illegal: /\/\/|>>/,
                lexemes: "[a-z_]\\w*!?",
                contains: [{
                    className: "literal",
                    begin: "\\[(\\|\\|)?\\]|\\(\\)"
                }, e.COMMENT("\\(\\*", "\\*\\)", { contains: ["self"] }), {
                    className: "symbol",
                    begin: "'[A-Za-z_](?!')[\\w']*"
                }, { className: "tag", begin: "`[A-Z][\\w']*" }, {
                    className: "type",
                    begin: "\\b[A-Z][\\w']*",
                    relevance: 0
                }, { begin: "[a-z_]\\w*'[\\w']*" }, e.inherit(e.APOS_STRING_MODE, {
                    className: "char",
                    relevance: 0
                }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null }), {
                    className: "number",
                    begin: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
                    relevance: 0
                }, { begin: /[-=]>/ }]
            }
        }
    }, {}],
    119: [function(require, module, exports) {
        module.exports = function(e) {
            var t = e.COMMENT("--", "$");
            return {
                case_insensitive: !0,
                illegal: /[<>{}*]/,
                contains: [{
                    className: "operator",
                    beginKeywords: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
                    end: /;/,
                    endsWithParent: !0,
                    keywords: {
                        keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function g general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists k keep keep_duplicates key keys kill l language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex n name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding p package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
                        literal: "true false null",
                        built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
                    },
                    contains: [{
                        className: "string",
                        begin: "'",
                        end: "'",
                        contains: [e.BACKSLASH_ESCAPE, { begin: "''" }]
                    }, {
                        className: "string",
                        begin: '"',
                        end: '"',
                        contains: [e.BACKSLASH_ESCAPE, { begin: '""' }]
                    }, {
                        className: "string",
                        begin: "`",
                        end: "`",
                        contains: [e.BACKSLASH_ESCAPE]
                    }, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, t]
                }, e.C_BLOCK_COMMENT_MODE, t]
            }
        }
    }, {}],
    120: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["do", "ado"],
                case_insensitive: !0,
                keywords: "if else in foreach for forv forva forval forvalu forvalue forvalues by bys bysort xi quietly qui capture about ac ac_7 acprplot acprplot_7 adjust ado adopath adoupdate alpha ameans an ano anov anova anova_estat anova_terms anovadef aorder ap app appe appen append arch arch_dr arch_estat arch_p archlm areg areg_p args arima arima_dr arima_estat arima_p as asmprobit asmprobit_estat asmprobit_lf asmprobit_mfx__dlg asmprobit_p ass asse asser assert avplot avplot_7 avplots avplots_7 bcskew0 bgodfrey binreg bip0_lf biplot bipp_lf bipr_lf bipr_p biprobit bitest bitesti bitowt blogit bmemsize boot bootsamp bootstrap bootstrap_8 boxco_l boxco_p boxcox boxcox_6 boxcox_p bprobit br break brier bro brow brows browse brr brrstat bs bs_7 bsampl_w bsample bsample_7 bsqreg bstat bstat_7 bstat_8 bstrap bstrap_7 ca ca_estat ca_p cabiplot camat canon canon_8 canon_8_p canon_estat canon_p cap caprojection capt captu captur capture cat cc cchart cchart_7 cci cd censobs_table centile cf char chdir checkdlgfiles checkestimationsample checkhlpfiles checksum chelp ci cii cl class classutil clear cli clis clist clo clog clog_lf clog_p clogi clogi_sw clogit clogit_lf clogit_p clogitp clogl_sw cloglog clonevar clslistarray cluster cluster_measures cluster_stop cluster_tree cluster_tree_8 clustermat cmdlog cnr cnre cnreg cnreg_p cnreg_sw cnsreg codebook collaps4 collapse colormult_nb colormult_nw compare compress conf confi confir confirm conren cons const constr constra constrai constrain constraint continue contract copy copyright copysource cor corc corr corr2data corr_anti corr_kmo corr_smc corre correl correla correlat correlate corrgram cou coun count cox cox_p cox_sw coxbase coxhaz coxvar cprplot cprplot_7 crc cret cretu cretur creturn cross cs cscript cscript_log csi ct ct_is ctset ctst_5 ctst_st cttost cumsp cumsp_7 cumul cusum cusum_7 cutil d datasig datasign datasigna datasignat datasignatu datasignatur datasignature datetof db dbeta de dec deco decod decode deff des desc descr descri describ describe destring dfbeta dfgls dfuller di di_g dir dirstats dis discard disp disp_res disp_s displ displa display distinct do doe doed doedi doedit dotplot dotplot_7 dprobit drawnorm drop ds ds_util dstdize duplicates durbina dwstat dydx e ed edi edit egen eivreg emdef en enc enco encod encode eq erase ereg ereg_lf ereg_p ereg_sw ereghet ereghet_glf ereghet_glf_sh ereghet_gp ereghet_ilf ereghet_ilf_sh ereghet_ip eret eretu eretur ereturn err erro error est est_cfexist est_cfname est_clickable est_expand est_hold est_table est_unhold est_unholdok estat estat_default estat_summ estat_vce_only esti estimates etodow etof etomdy ex exi exit expand expandcl fac fact facto factor factor_estat factor_p factor_pca_rotated factor_rotate factormat fcast fcast_compute fcast_graph fdades fdadesc fdadescr fdadescri fdadescrib fdadescribe fdasav fdasave fdause fh_st file open file read file close file filefilter fillin find_hlp_file findfile findit findit_7 fit fl fli flis flist for5_0 form forma format fpredict frac_154 frac_adj frac_chk frac_cox frac_ddp frac_dis frac_dv frac_in frac_mun frac_pp frac_pq frac_pv frac_wgt frac_xo fracgen fracplot fracplot_7 fracpoly fracpred fron_ex fron_hn fron_p fron_tn fron_tn2 frontier ftodate ftoe ftomdy ftowdate g gamhet_glf gamhet_gp gamhet_ilf gamhet_ip gamma gamma_d2 gamma_p gamma_sw gammahet gdi_hexagon gdi_spokes ge gen gene gener genera generat generate genrank genstd genvmean gettoken gl gladder gladder_7 glim_l01 glim_l02 glim_l03 glim_l04 glim_l05 glim_l06 glim_l07 glim_l08 glim_l09 glim_l10 glim_l11 glim_l12 glim_lf glim_mu glim_nw1 glim_nw2 glim_nw3 glim_p glim_v1 glim_v2 glim_v3 glim_v4 glim_v5 glim_v6 glim_v7 glm glm_6 glm_p glm_sw glmpred glo glob globa global glogit glogit_8 glogit_p gmeans gnbre_lf gnbreg gnbreg_5 gnbreg_p gomp_lf gompe_sw gomper_p gompertz gompertzhet gomphet_glf gomphet_glf_sh gomphet_gp gomphet_ilf gomphet_ilf_sh gomphet_ip gphdot gphpen gphprint gprefs gprobi_p gprobit gprobit_8 gr gr7 gr_copy gr_current gr_db gr_describe gr_dir gr_draw gr_draw_replay gr_drop gr_edit gr_editviewopts gr_example gr_example2 gr_export gr_print gr_qscheme gr_query gr_read gr_rename gr_replay gr_save gr_set gr_setscheme gr_table gr_undo gr_use graph graph7 grebar greigen greigen_7 greigen_8 grmeanby grmeanby_7 gs_fileinfo gs_filetype gs_graphinfo gs_stat gsort gwood h hadimvo hareg hausman haver he heck_d2 heckma_p heckman heckp_lf heckpr_p heckprob hel help hereg hetpr_lf hetpr_p hetprob hettest hexdump hilite hist hist_7 histogram hlogit hlu hmeans hotel hotelling hprobit hreg hsearch icd9 icd9_ff icd9p iis impute imtest inbase include inf infi infil infile infix inp inpu input ins insheet insp inspe inspec inspect integ inten intreg intreg_7 intreg_p intrg2_ll intrg_ll intrg_ll2 ipolate iqreg ir irf irf_create irfm iri is_svy is_svysum isid istdize ivprob_1_lf ivprob_lf ivprobit ivprobit_p ivreg ivreg_footnote ivtob_1_lf ivtob_lf ivtobit ivtobit_p jackknife jacknife jknife jknife_6 jknife_8 jkstat joinby kalarma1 kap kap_3 kapmeier kappa kapwgt kdensity kdensity_7 keep ksm ksmirnov ktau kwallis l la lab labe label labelbook ladder levels levelsof leverage lfit lfit_p li lincom line linktest lis list lloghet_glf lloghet_glf_sh lloghet_gp lloghet_ilf lloghet_ilf_sh lloghet_ip llogi_sw llogis_p llogist llogistic llogistichet lnorm_lf lnorm_sw lnorma_p lnormal lnormalhet lnormhet_glf lnormhet_glf_sh lnormhet_gp lnormhet_ilf lnormhet_ilf_sh lnormhet_ip lnskew0 loadingplot loc loca local log logi logis_lf logistic logistic_p logit logit_estat logit_p loglogs logrank loneway lookfor lookup lowess lowess_7 lpredict lrecomp lroc lroc_7 lrtest ls lsens lsens_7 lsens_x lstat ltable ltable_7 ltriang lv lvr2plot lvr2plot_7 m ma mac macr macro makecns man manova manova_estat manova_p manovatest mantel mark markin markout marksample mat mat_capp mat_order mat_put_rr mat_rapp mata mata_clear mata_describe mata_drop mata_matdescribe mata_matsave mata_matuse mata_memory mata_mlib mata_mosave mata_rename mata_which matalabel matcproc matlist matname matr matri matrix matrix_input__dlg matstrik mcc mcci md0_ md1_ md1debug_ md2_ md2debug_ mds mds_estat mds_p mdsconfig mdslong mdsmat mdsshepard mdytoe mdytof me_derd mean means median memory memsize meqparse mer merg merge mfp mfx mhelp mhodds minbound mixed_ll mixed_ll_reparm mkassert mkdir mkmat mkspline ml ml_5 ml_adjs ml_bhhhs ml_c_d ml_check ml_clear ml_cnt ml_debug ml_defd ml_e0 ml_e0_bfgs ml_e0_cycle ml_e0_dfp ml_e0i ml_e1 ml_e1_bfgs ml_e1_bhhh ml_e1_cycle ml_e1_dfp ml_e2 ml_e2_cycle ml_ebfg0 ml_ebfr0 ml_ebfr1 ml_ebh0q ml_ebhh0 ml_ebhr0 ml_ebr0i ml_ecr0i ml_edfp0 ml_edfr0 ml_edfr1 ml_edr0i ml_eds ml_eer0i ml_egr0i ml_elf ml_elf_bfgs ml_elf_bhhh ml_elf_cycle ml_elf_dfp ml_elfi ml_elfs ml_enr0i ml_enrr0 ml_erdu0 ml_erdu0_bfgs ml_erdu0_bhhh ml_erdu0_bhhhq ml_erdu0_cycle ml_erdu0_dfp ml_erdu0_nrbfgs ml_exde ml_footnote ml_geqnr ml_grad0 ml_graph ml_hbhhh ml_hd0 ml_hold ml_init ml_inv ml_log ml_max ml_mlout ml_mlout_8 ml_model ml_nb0 ml_opt ml_p ml_plot ml_query ml_rdgrd ml_repor ml_s_e ml_score ml_searc ml_technique ml_unhold mleval mlf_ mlmatbysum mlmatsum mlog mlogi mlogit mlogit_footnote mlogit_p mlopts mlsum mlvecsum mnl0_ mor more mov move mprobit mprobit_lf mprobit_p mrdu0_ mrdu1_ mvdecode mvencode mvreg mvreg_estat n nbreg nbreg_al nbreg_lf nbreg_p nbreg_sw nestreg net newey newey_7 newey_p news nl nl_7 nl_9 nl_9_p nl_p nl_p_7 nlcom nlcom_p nlexp2 nlexp2_7 nlexp2a nlexp2a_7 nlexp3 nlexp3_7 nlgom3 nlgom3_7 nlgom4 nlgom4_7 nlinit nllog3 nllog3_7 nllog4 nllog4_7 nlog_rd nlogit nlogit_p nlogitgen nlogittree nlpred no nobreak noi nois noisi noisil noisily note notes notes_dlg nptrend numlabel numlist odbc old_ver olo olog ologi ologi_sw ologit ologit_p ologitp on one onew onewa oneway op_colnm op_comp op_diff op_inv op_str opr opro oprob oprob_sw oprobi oprobi_p oprobit oprobitp opts_exclusive order orthog orthpoly ou out outf outfi outfil outfile outs outsh outshe outshee outsheet ovtest pac pac_7 palette parse parse_dissim pause pca pca_8 pca_display pca_estat pca_p pca_rotate pcamat pchart pchart_7 pchi pchi_7 pcorr pctile pentium pergram pergram_7 permute permute_8 personal peto_st pkcollapse pkcross pkequiv pkexamine pkexamine_7 pkshape pksumm pksumm_7 pl plo plot plugin pnorm pnorm_7 poisgof poiss_lf poiss_sw poisso_p poisson poisson_estat post postclose postfile postutil pperron pr prais prais_e prais_e2 prais_p predict predictnl preserve print pro prob probi probit probit_estat probit_p proc_time procoverlay procrustes procrustes_estat procrustes_p profiler prog progr progra program prop proportion prtest prtesti pwcorr pwd q\\s qby qbys qchi qchi_7 qladder qladder_7 qnorm qnorm_7 qqplot qqplot_7 qreg qreg_c qreg_p qreg_sw qu quadchk quantile quantile_7 que quer query range ranksum ratio rchart rchart_7 rcof recast reclink recode reg reg3 reg3_p regdw regr regre regre_p2 regres regres_p regress regress_estat regriv_p remap ren rena renam rename renpfix repeat replace report reshape restore ret retu retur return rm rmdir robvar roccomp roccomp_7 roccomp_8 rocf_lf rocfit rocfit_8 rocgold rocplot rocplot_7 roctab roctab_7 rolling rologit rologit_p rot rota rotat rotate rotatemat rreg rreg_p ru run runtest rvfplot rvfplot_7 rvpplot rvpplot_7 sa safesum sample sampsi sav save savedresults saveold sc sca scal scala scalar scatter scm_mine sco scob_lf scob_p scobi_sw scobit scor score scoreplot scoreplot_help scree screeplot screeplot_help sdtest sdtesti se search separate seperate serrbar serrbar_7 serset set set_defaults sfrancia sh she shel shell shewhart shewhart_7 signestimationsample signrank signtest simul simul_7 simulate simulate_8 sktest sleep slogit slogit_d2 slogit_p smooth snapspan so sor sort spearman spikeplot spikeplot_7 spikeplt spline_x split sqreg sqreg_p sret sretu sretur sreturn ssc st st_ct st_hc st_hcd st_hcd_sh st_is st_issys st_note st_promo st_set st_show st_smpl st_subid stack statsby statsby_8 stbase stci stci_7 stcox stcox_estat stcox_fr stcox_fr_ll stcox_p stcox_sw stcoxkm stcoxkm_7 stcstat stcurv stcurve stcurve_7 stdes stem stepwise stereg stfill stgen stir stjoin stmc stmh stphplot stphplot_7 stphtest stphtest_7 stptime strate strate_7 streg streg_sw streset sts sts_7 stset stsplit stsum sttocc sttoct stvary stweib su suest suest_8 sum summ summa summar summari summariz summarize sunflower sureg survcurv survsum svar svar_p svmat svy svy_disp svy_dreg svy_est svy_est_7 svy_estat svy_get svy_gnbreg_p svy_head svy_header svy_heckman_p svy_heckprob_p svy_intreg_p svy_ivreg_p svy_logistic_p svy_logit_p svy_mlogit_p svy_nbreg_p svy_ologit_p svy_oprobit_p svy_poisson_p svy_probit_p svy_regress_p svy_sub svy_sub_7 svy_x svy_x_7 svy_x_p svydes svydes_8 svygen svygnbreg svyheckman svyheckprob svyintreg svyintreg_7 svyintrg svyivreg svylc svylog_p svylogit svymarkout svymarkout_8 svymean svymlog svymlogit svynbreg svyolog svyologit svyoprob svyoprobit svyopts svypois svypois_7 svypoisson svyprobit svyprobt svyprop svyprop_7 svyratio svyreg svyreg_p svyregress svyset svyset_7 svyset_8 svytab svytab_7 svytest svytotal sw sw_8 swcnreg swcox swereg swilk swlogis swlogit swologit swoprbt swpois swprobit swqreg swtobit swweib symmetry symmi symplot symplot_7 syntax sysdescribe sysdir sysuse szroeter ta tab tab1 tab2 tab_or tabd tabdi tabdis tabdisp tabi table tabodds tabodds_7 tabstat tabu tabul tabula tabulat tabulate te tempfile tempname tempvar tes test testnl testparm teststd tetrachoric time_it timer tis tob tobi tobit tobit_p tobit_sw token tokeni tokeniz tokenize tostring total translate translator transmap treat_ll treatr_p treatreg trim trnb_cons trnb_mean trpoiss_d2 trunc_ll truncr_p truncreg tsappend tset tsfill tsline tsline_ex tsreport tsrevar tsrline tsset tssmooth tsunab ttest ttesti tut_chk tut_wait tutorial tw tware_st two twoway twoway__fpfit_serset twoway__function_gen twoway__histogram_gen twoway__ipoint_serset twoway__ipoints_serset twoway__kdensity_gen twoway__lfit_serset twoway__normgen_gen twoway__pci_serset twoway__qfit_serset twoway__scatteri_serset twoway__sunflower_gen twoway_ksm_serset ty typ type typeof u unab unabbrev unabcmd update us use uselabel var var_mkcompanion var_p varbasic varfcast vargranger varirf varirf_add varirf_cgraph varirf_create varirf_ctable varirf_describe varirf_dir varirf_drop varirf_erase varirf_graph varirf_ograph varirf_rename varirf_set varirf_table varlist varlmar varnorm varsoc varstable varstable_w varstable_w2 varwle vce vec vec_fevd vec_mkphi vec_p vec_p_w vecirf_create veclmar veclmar_w vecnorm vecnorm_w vecrank vecstable verinst vers versi versio version view viewsource vif vwls wdatetof webdescribe webseek webuse weib1_lf weib2_lf weib_lf weib_lf0 weibhet_glf weibhet_glf_sh weibhet_glfa weibhet_glfa_sh weibhet_gp weibhet_ilf weibhet_ilf_sh weibhet_ilfa weibhet_ilfa_sh weibhet_ip weibu_sw weibul_p weibull weibull_c weibull_s weibullhet wh whelp whi which whil while wilc_st wilcoxon win wind windo window winexec wntestb wntestb_7 wntestq xchart xchart_7 xcorr xcorr_7 xi xi_6 xmlsav xmlsave xmluse xpose xsh xshe xshel xshell xt_iis xt_tis xtab_p xtabond xtbin_p xtclog xtcloglog xtcloglog_8 xtcloglog_d2 xtcloglog_pa_p xtcloglog_re_p xtcnt_p xtcorr xtdata xtdes xtfront_p xtfrontier xtgee xtgee_elink xtgee_estat xtgee_makeivar xtgee_p xtgee_plink xtgls xtgls_p xthaus xthausman xtht_p xthtaylor xtile xtint_p xtintreg xtintreg_8 xtintreg_d2 xtintreg_p xtivp_1 xtivp_2 xtivreg xtline xtline_ex xtlogit xtlogit_8 xtlogit_d2 xtlogit_fe_p xtlogit_pa_p xtlogit_re_p xtmixed xtmixed_estat xtmixed_p xtnb_fe xtnb_lf xtnbreg xtnbreg_pa_p xtnbreg_refe_p xtpcse xtpcse_p xtpois xtpoisson xtpoisson_d2 xtpoisson_pa_p xtpoisson_refe_p xtpred xtprobit xtprobit_8 xtprobit_d2 xtprobit_re_p xtps_fe xtps_lf xtps_ren xtps_ren_8 xtrar_p xtrc xtrc_p xtrchh xtrefe_p xtreg xtreg_be xtreg_fe xtreg_ml xtreg_pa_p xtreg_re xtregar xtrere_p xtset xtsf_ll xtsf_llti xtsum xttab xttest0 xttobit xttobit_8 xttobit_p xttrans yx yxview__barlike_draw yxview_area_draw yxview_bar_draw yxview_dot_draw yxview_dropline_draw yxview_function_draw yxview_iarrow_draw yxview_ilabels_draw yxview_normal_draw yxview_pcarrow_draw yxview_pcbarrow_draw yxview_pccapsym_draw yxview_pcscatter_draw yxview_pcspike_draw yxview_rarea_draw yxview_rbar_draw yxview_rbarm_draw yxview_rcap_draw yxview_rcapsym_draw yxview_rconnected_draw yxview_rline_draw yxview_rscatter_draw yxview_rspike_draw yxview_spike_draw yxview_sunflower_draw zap_s zinb zinb_llf zinb_plf zip zip_llf zip_p zip_plf zt_ct_5 zt_hc_5 zt_hcd_5 zt_is_5 zt_iss_5 zt_sho_5 zt_smp_5 ztbase_5 ztcox_5 ztdes_5 ztereg_5 ztfill_5 ztgen_5 ztir_5 ztjoin_5 ztnb ztnb_p ztp ztp_p zts_5 ztset_5 ztspli_5 ztsum_5 zttoct_5 ztvary_5 ztweib_5",
                contains: [{
                    className: "label",
                    variants: [{ begin: "\\$\\{?[a-zA-Z0-9_]+\\}?" }, { begin: "`[a-zA-Z0-9_]+'" }]
                }, {
                    className: "string",
                    variants: [{ begin: '`"[^\r\n]*?"\'' }, { begin: '"[^\r\n"]*"' }]
                }, {
                    className: "literal",
                    variants: [{ begin: "\\b(abs|acos|asin|atan|atan2|atanh|ceil|cloglog|comb|cos|digamma|exp|floor|invcloglog|invlogit|ln|lnfact|lnfactorial|lngamma|log|log10|max|min|mod|reldif|round|sign|sin|sqrt|sum|tan|tanh|trigamma|trunc|betaden|Binomial|binorm|binormal|chi2|chi2tail|dgammapda|dgammapdada|dgammapdadx|dgammapdx|dgammapdxdx|F|Fden|Ftail|gammaden|gammap|ibeta|invbinomial|invchi2|invchi2tail|invF|invFtail|invgammap|invibeta|invnchi2|invnFtail|invnibeta|invnorm|invnormal|invttail|nbetaden|nchi2|nFden|nFtail|nibeta|norm|normal|normalden|normd|npnchi2|tden|ttail|uniform|abbrev|char|index|indexnot|length|lower|ltrim|match|plural|proper|real|regexm|regexr|regexs|reverse|rtrim|string|strlen|strlower|strltrim|strmatch|strofreal|strpos|strproper|strreverse|strrtrim|strtrim|strupper|subinstr|subinword|substr|trim|upper|word|wordcount|_caller|autocode|byteorder|chop|clip|cond|e|epsdouble|epsfloat|group|inlist|inrange|irecode|matrix|maxbyte|maxdouble|maxfloat|maxint|maxlong|mi|minbyte|mindouble|minfloat|minint|minlong|missing|r|recode|replay|return|s|scalar|d|date|day|dow|doy|halfyear|mdy|month|quarter|week|year|d|daily|dofd|dofh|dofm|dofq|dofw|dofy|h|halfyearly|hofd|m|mofd|monthly|q|qofd|quarterly|tin|twithin|w|weekly|wofd|y|yearly|yh|ym|yofd|yq|yw|cholesky|colnumb|colsof|corr|det|diag|diag0cnt|el|get|hadamard|I|inv|invsym|issym|issymmetric|J|matmissing|matuniform|mreldif|nullmat|rownumb|rowsof|sweep|syminv|trace|vec|vecdiag)(?=\\(|$)" }]
                }, e.COMMENT("^[ 	]*\\*.*$", !1), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }
        }
    }, {}],
    121: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[A-Z_][A-Z0-9_.]*",
                n = "END-ISO-10303-21;",
                r = { literal: "", built_in: "", keyword: "HEADER ENDSEC DATA" },
                i = { className: "preprocessor", begin: "ISO-10303-21;", relevance: 10 },
                a = [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.COMMENT("/\\*\\*!", "\\*/"), e.C_NUMBER_MODE, e.inherit(e.APOS_STRING_MODE, { illegal: null }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null }), {
                    className: "string",
                    begin: "'",
                    end: "'"
                }, { className: "label", variants: [{ begin: "#", end: "\\d+", illegal: "\\W" }] }];
            return {
                aliases: ["p21", "step", "stp"],
                case_insensitive: !0,
                lexemes: t,
                keywords: r,
                contains: [{ className: "preprocessor", begin: n, relevance: 10 }, i].concat(a)
            }
        }
    }, {}],
    122: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "variable", begin: "\\$" + e.IDENT_RE },
                n = { className: "hexcolor", begin: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})", relevance: 10 },
                r = ["charset", "css", "debug", "extend", "font-face", "for", "import", "include", "media", "mixin", "page", "warn", "while"],
                i = ["after", "before", "first-letter", "first-line", "active", "first-child", "focus", "hover", "lang", "link", "visited"],
                a = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"],
                o = "[\\.\\s\\n\\[\\:,]",
                s = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"],
                l = ["\\{", "\\}", "\\?", "(\\bReturn\\b)", "(\\bEnd\\b)", "(\\bend\\b)", ";", "#\\s", "\\*\\s", "===\\s", "\\|", "%"];
            return {
                aliases: ["styl"],
                case_insensitive: !1,
                illegal: "(" + l.join("|") + ")",
                keywords: "if else for in",
                contains: [e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, n, {
                    begin: "\\.[a-zA-Z][a-zA-Z0-9_-]*" + o,
                    returnBegin: !0,
                    contains: [{ className: "class", begin: "\\.[a-zA-Z][a-zA-Z0-9_-]*" }]
                }, {
                    begin: "\\#[a-zA-Z][a-zA-Z0-9_-]*" + o,
                    returnBegin: !0,
                    contains: [{ className: "id", begin: "\\#[a-zA-Z][a-zA-Z0-9_-]*" }]
                }, {
                    begin: "\\b(" + a.join("|") + ")" + o,
                    returnBegin: !0,
                    contains: [{ className: "tag", begin: "\\b[a-zA-Z][a-zA-Z0-9_-]*" }]
                }, { className: "pseudo", begin: "&?:?:\\b(" + i.join("|") + ")" + o }, {
                    className: "at_rule",
                    begin: "@(" + r.join("|") + ")\\b"
                }, t, e.CSS_NUMBER_MODE, e.NUMBER_MODE, {
                    className: "function",
                    begin: "\\b[a-zA-Z][a-zA-Z0-9_-]*\\(.*\\)",
                    illegal: "[\\n]",
                    returnBegin: !0,
                    contains: [{ className: "title", begin: "\\b[a-zA-Z][a-zA-Z0-9_-]*" }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        contains: [n, t, e.APOS_STRING_MODE, e.CSS_NUMBER_MODE, e.NUMBER_MODE, e.QUOTE_STRING_MODE]
                    }]
                }, { className: "attribute", begin: "\\b(" + s.reverse().join("|") + ")\\b" }]
            }
        }
    }, {}],
    123: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    keyword: "class deinit enum extension func init let protocol static struct subscript typealias var break case continue default do else fallthrough if in for return switch where while as dynamicType is new super self Self Type __COLUMN__ __FILE__ __FUNCTION__ __LINE__ associativity didSet get infix inout left mutating none nonmutating operator override postfix precedence prefix right set unowned unowned safe unsafe weak willSet",
                    literal: "true false nil",
                    built_in: "abs advance alignof alignofValue assert bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced join lexicographicalCompare map max maxElement min minElement numericCast partition posix print println quickSort reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith strideof strideofValue swap swift toString transcode underestimateCount unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafePointers withVaList"
                },
                n = { className: "type", begin: "\\b[A-Z][\\w']*", relevance: 0 },
                r = e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
                i = { className: "subst", begin: /\\\(/, end: "\\)", keywords: t, contains: [] },
                a = {
                    className: "number",
                    begin: "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
                    relevance: 0
                },
                o = e.inherit(e.QUOTE_STRING_MODE, { contains: [i, e.BACKSLASH_ESCAPE] });
            return i.contains = [a], {
                keywords: t,
                contains: [o, e.C_LINE_COMMENT_MODE, r, n, a, {
                    className: "func",
                    beginKeywords: "func",
                    end: "{",
                    excludeEnd: !0,
                    contains: [e.inherit(e.TITLE_MODE, {
                        begin: /[A-Za-z$_][0-9A-Za-z$_]*/,
                        illegal: /\(/
                    }), { className: "generics", begin: /</, end: />/, illegal: />/ }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        endsParent: !0,
                        keywords: t,
                        contains: ["self", a, o, e.C_BLOCK_COMMENT_MODE, { begin: ":" }],
                        illegal: /["']/
                    }],
                    illegal: /\[|%/
                }, {
                    className: "class",
                    beginKeywords: "struct protocol class extension enum",
                    keywords: t,
                    end: "\\{",
                    excludeEnd: !0,
                    contains: [e.inherit(e.TITLE_MODE, { begin: /[A-Za-z$_][0-9A-Za-z$_]*/ })]
                }, {
                    className: "preprocessor",
                    begin: "(@assignment|@class_protocol|@exported|@final|@lazy|@noreturn|@NSCopying|@NSManaged|@objc|@optional|@required|@auto_closure|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix)"
                }, { beginKeywords: "import", end: /$/, contains: [e.C_LINE_COMMENT_MODE, r] }]
            }
        }
    }, {}],
    124: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["tk"],
                keywords: "after append apply array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd chan clock close concat continue dde dict encoding eof error eval exec exit expr fblocked fconfigure fcopy file fileevent filename flush for foreach format gets glob global history http if incr info interp join lappend|10 lassign|10 lindex|10 linsert|10 list llength|10 load lrange|10 lrepeat|10 lreplace|10 lreverse|10 lsearch|10 lset|10 lsort|10 mathfunc mathop memory msgcat namespace open package parray pid pkg::create pkg_mkIndex platform platform::shell proc puts pwd read refchan regexp registry regsub|10 rename return safe scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_startOfPreviousWord tcl_wordBreakAfter tcl_wordBreakBefore tcltest tclvars tell time tm trace unknown unload unset update uplevel upvar variable vwait while",
                contains: [e.COMMENT(";[ \\t]*#", "$"), e.COMMENT("^[ \\t]*#", "$"), {
                    beginKeywords: "proc",
                    end: "[\\{]",
                    excludeEnd: !0,
                    contains: [{
                        className: "symbol",
                        begin: "[ \\t\\n\\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
                        end: "[ \\t\\n\\r]",
                        endsWithParent: !0,
                        excludeEnd: !0
                    }]
                }, {
                    className: "variable",
                    excludeEnd: !0,
                    variants: [{
                        begin: "\\$(\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*\\(([a-zA-Z0-9_])*\\)",
                        end: "[^a-zA-Z0-9_\\}\\$]"
                    }, { begin: "\\$(\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*", end: "(\\))?[^a-zA-Z0-9_\\}\\$]" }]
                }, {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE],
                    variants: [e.inherit(e.APOS_STRING_MODE, { illegal: null }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null })]
                }, { className: "number", variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE] }]
            }
        }
    }, {}],
    125: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "command", begin: "\\\\[a-zA-Zа-яА-я]+[\\*]?" },
                n = { className: "command", begin: "\\\\[^a-zA-Zа-яА-я0-9]" },
                r = { className: "special", begin: "[{}\\[\\]\\&#~]", relevance: 0 };
            return {
                contains: [{
                    begin: "\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
                    returnBegin: !0,
                    contains: [t, n, {
                        className: "number",
                        begin: " *=",
                        end: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
                        excludeBegin: !0
                    }],
                    relevance: 10
                }, t, n, r, {
                    className: "formula",
                    begin: "\\$\\$",
                    end: "\\$\\$",
                    contains: [t, n, r],
                    relevance: 0
                }, {
                    className: "formula",
                    begin: "\\$",
                    end: "\\$",
                    contains: [t, n, r],
                    relevance: 0
                }, e.COMMENT("%", "$", { relevance: 0 })]
            }
        }
    }, {}],
    126: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "bool byte i16 i32 i64 double string binary";
            return {
                keywords: {
                    keyword: "namespace const typedef struct enum service exception void oneway set list map required optional",
                    built_in: t,
                    literal: "true false"
                },
                contains: [e.QUOTE_STRING_MODE, e.NUMBER_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "class",
                    beginKeywords: "struct enum service exception",
                    end: /\{/,
                    illegal: /\n/,
                    contains: [e.inherit(e.TITLE_MODE, { starts: { endsWithParent: !0, excludeEnd: !0 } })]
                }, { begin: "\\b(set|list|map)\\s*<", end: ">", keywords: t, contains: ["self"] }]
            }
        }
    }, {}],
    127: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "number", begin: "[1-9][0-9]*", relevance: 0 },
                n = { className: "comment", begin: ":[^\\]]+" },
                r = {
                    className: "built_in",
                    begin: "(AR|P|PAYLOAD|PR|R|SR|RSR|LBL|VR|UALM|MESSAGE|UTOOL|UFRAME|TIMER|    TIMER_OVERFLOW|JOINT_MAX_SPEED|RESUME_PROG|DIAG_REC)\\[",
                    end: "\\]",
                    contains: ["self", t, n]
                },
                i = {
                    className: "built_in",
                    begin: "(AI|AO|DI|DO|F|RI|RO|UI|UO|GI|GO|SI|SO)\\[",
                    end: "\\]",
                    contains: ["self", t, e.QUOTE_STRING_MODE, n]
                };
            return {
                keywords: {
                    keyword: "ABORT ACC ADJUST AND AP_LD BREAK CALL CNT COL CONDITION CONFIG DA DB DIV DETECT ELSE END ENDFOR ERR_NUM ERROR_PROG FINE FOR GP GUARD INC IF JMP LINEAR_MAX_SPEED LOCK MOD MONITOR OFFSET Offset OR OVERRIDE PAUSE PREG PTH RT_LD RUN SELECT SKIP Skip TA TB TO TOOL_OFFSET Tool_Offset UF UT UFRAME_NUM UTOOL_NUM UNLOCK WAIT X Y Z W P R STRLEN SUBSTR FINDSTR VOFFSET",
                    constant: "ON OFF max_speed LPOS JPOS ENABLE DISABLE START STOP RESET"
                },
                contains: [r, i, { className: "keyword", begin: "/(PROG|ATTR|MN|POS|END)\\b" }, {
                    className: "keyword",
                    begin: "(CALL|RUN|POINT_LOGIC|LBL)\\b"
                }, {
                    className: "keyword",
                    begin: "\\b(ACC|CNT|Skip|Offset|PSPD|RT_LD|AP_LD|Tool_Offset)"
                }, {
                    className: "number",
                    begin: "\\d+(sec|msec|mm/sec|cm/min|inch/min|deg/sec|mm|in|cm)?\\b",
                    relevance: 0
                }, e.COMMENT("//", "[;$]"), e.COMMENT("!", "[;$]"), e.COMMENT("--eg:", "$"), e.QUOTE_STRING_MODE, {
                    className: "string",
                    begin: "'",
                    end: "'"
                }, e.C_NUMBER_MODE, { className: "variable", begin: "\\$[A-Za-z0-9_]+" }]
            }
        }
    }, {}],
    128: [function(require, module, exports) {
        module.exports = function(e) {
            var t = { className: "params", begin: "\\(", end: "\\)" },
                n = "attribute block constant cycle date dump include max min parent random range source template_from_string",
                r = { className: "function", beginKeywords: n, relevance: 0, contains: [t] },
                i = {
                    className: "filter",
                    begin: /\|[A-Za-z_]+:?/,
                    keywords: "abs batch capitalize convert_encoding date date_modify default escape first format join json_encode keys last length lower merge nl2br number_format raw replace reverse round slice sort split striptags title trim upper url_encode",
                    contains: [r]
                },
                a = "autoescape block do embed extends filter flush for if import include macro sandbox set spaceless use verbatim";
            return a = a + " " + a.split(" ").map(function(e) {
                return "end" + e
            }).join(" "), {
                aliases: ["craftcms"],
                case_insensitive: !0,
                subLanguage: "xml",
                contains: [e.COMMENT(/\{#/, /#}/), {
                    className: "template_tag",
                    begin: /\{%/,
                    end: /%}/,
                    keywords: a,
                    contains: [i, r]
                }, { className: "variable", begin: /\{\{/, end: /}}/, contains: [i, r] }]
            }
        }
    }, {}],
    129: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                keyword: "in if for while finally var new function|0 do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class public private get set super static implements enum export import declare type protected",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document any number boolean string void"
            };
            return {
                aliases: ["ts"],
                keywords: t,
                contains: [{
                    className: "pi",
                    begin: /^\s*['"]use strict['"]/,
                    relevance: 0
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "number",
                    variants: [{ begin: "\\b(0[bB][01]+)" }, { begin: "\\b(0[oO][0-7]+)" }, { begin: e.C_NUMBER_RE }],
                    relevance: 0
                }, {
                    begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                    keywords: "return throw case",
                    contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.REGEXP_MODE],
                    relevance: 0
                }, {
                    className: "function",
                    begin: "function",
                    end: /[\{;]/,
                    excludeEnd: !0,
                    keywords: t,
                    contains: ["self", e.inherit(e.TITLE_MODE, { begin: /[A-Za-z$_][0-9A-Za-z$_]*/ }), {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: !0,
                        excludeEnd: !0,
                        keywords: t,
                        contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
                        illegal: /["'\(]/
                    }],
                    illegal: /\[|%/,
                    relevance: 0
                }, {
                    className: "constructor",
                    beginKeywords: "constructor",
                    end: /\{/,
                    excludeEnd: !0,
                    relevance: 10
                }, { className: "module", beginKeywords: "module", end: /\{/, excludeEnd: !0 }, {
                    className: "interface",
                    beginKeywords: "interface",
                    end: /\{/,
                    excludeEnd: !0,
                    keywords: "interface extends"
                }, { begin: /\$[(.]/ }, { begin: "\\." + e.IDENT_RE, relevance: 0 }]
            }
        }
    }, {}],
    130: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                keywords: {
                    keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
                    built_in: "DBus GLib CCode Gee Object",
                    literal: "false true null"
                },
                contains: [{
                    className: "class",
                    beginKeywords: "class interface delegate namespace",
                    end: "{",
                    excludeEnd: !0,
                    illegal: "[^,:\\n\\s\\.]",
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "string",
                    begin: '"""',
                    end: '"""',
                    relevance: 5
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, {
                    className: "preprocessor",
                    begin: "^#",
                    end: "$",
                    relevance: 2
                }, { className: "constant", begin: " [A-Z_]+ ", relevance: 0 }]
            }
        }
    }, {}],
    131: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["vb"],
                case_insensitive: !0,
                keywords: {
                    keyword: "addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass namespace narrowing new next not notinheritable notoverridable of off on operator option optional or order orelse overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim rem removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly xor",
                    built_in: "boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype date decimal directcast double gettype getxmlnamespace iif integer long object sbyte short single string trycast typeof uinteger ulong ushort",
                    literal: "true false nothing"
                },
                illegal: "//|{|}|endif|gosub|variant|wend",
                contains: [e.inherit(e.QUOTE_STRING_MODE, { contains: [{ begin: '""' }] }), e.COMMENT("'", "$", {
                    returnBegin: !0,
                    contains: [{
                        className: "xmlDocTag",
                        begin: "'''|<!--|-->",
                        contains: [e.PHRASAL_WORDS_MODE]
                    }, { className: "xmlDocTag", begin: "</?", end: ">", contains: [e.PHRASAL_WORDS_MODE] }]
                }), e.C_NUMBER_MODE, {
                    className: "preprocessor",
                    begin: "#",
                    end: "$",
                    keywords: "if else elseif end region externalsource"
                }]
            }
        }
    }, {}],
    132: [function(require, module, exports) {
        module.exports = function(e) {
            return { subLanguage: "xml", contains: [{ begin: "<%", end: "%>", subLanguage: "vbscript" }] }
        }
    }, {}],
    133: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["vbs"],
                case_insensitive: !0,
                keywords: {
                    keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
                    built_in: "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",
                    literal: "true false null nothing empty"
                },
                illegal: "//",
                contains: [e.inherit(e.QUOTE_STRING_MODE, { contains: [{ begin: '""' }] }), e.COMMENT(/'/, /$/, { relevance: 0 }), e.C_NUMBER_MODE]
            }
        }
    }, {}],
    134: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                aliases: ["v"],
                case_insensitive: !0,
                keywords: {
                    keyword: "always and assign begin buf bufif0 bufif1 case casex casez cmos deassign default defparam disable edge else end endcase endfunction endmodule endprimitive endspecify endtable endtask event for force forever fork function if ifnone initial inout input join macromodule module nand negedge nmos nor not notif0 notif1 or output parameter pmos posedge primitive pulldown pullup rcmos release repeat rnmos rpmos rtran rtranif0 rtranif1 specify specparam table task timescale tran tranif0 tranif1 wait while xnor xor",
                    typename: "highz0 highz1 integer large medium pull0 pull1 real realtime reg scalared signed small strong0 strong1 supply0 supply0 supply1 supply1 time tri tri0 tri1 triand trior trireg vectored wand weak0 weak1 wire wor"
                },
                contains: [e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE, e.QUOTE_STRING_MODE, {
                    className: "number",
                    begin: "\\b(\\d+'(b|h|o|d|B|H|O|D))?[0-9xzXZ]+",
                    contains: [e.BACKSLASH_ESCAPE],
                    relevance: 0
                }, { className: "typename", begin: "\\.\\w+", relevance: 0 }, {
                    className: "value",
                    begin: "#\\((?!parameter).+\\)"
                }, { className: "keyword", begin: "\\+|-|\\*|/|%|<|>|=|#|`|\\!|&|\\||@|:|\\^|~|\\{|\\}", relevance: 0 }]
            }
        }
    }, {}],
    135: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "\\d(_|\\d)*",
                n = "[eE][-+]?" + t,
                r = t + "(\\." + t + ")?(" + n + ")?",
                i = "\\w+",
                a = t + "#" + i + "(\\." + i + ")?#(" + n + ")?",
                o = "\\b(" + a + "|" + r + ")";
            return {
                case_insensitive: !0,
                keywords: {
                    keyword: "abs access after alias all and architecture array assert attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable vmode vprop vunit wait when while with xnor xor",
                    typename: "boolean bit character severity_level integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector std_logic std_logic_vector unsigned signed boolean_vector integer_vector real_vector time_vector"
                },
                illegal: "{",
                contains: [e.C_BLOCK_COMMENT_MODE, e.COMMENT("--", "$"), e.QUOTE_STRING_MODE, {
                    className: "number",
                    begin: o,
                    relevance: 0
                }, {
                    className: "literal",
                    begin: "'(U|X|0|1|Z|W|L|H|-)'",
                    contains: [e.BACKSLASH_ESCAPE]
                }, { className: "attribute", begin: "'[A-Za-z](_?[A-Za-z0-9])*", contains: [e.BACKSLASH_ESCAPE] }]
            }
        }
    }, {}],
    136: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                lexemes: /[!#@\w]+/,
                keywords: {
                    keyword: "N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope cp cpf cq cr cs cst cu cuna cunme cw d|0 delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu g|0 go gr grepa gu gv ha h|0 helpf helpg helpt hi hid his i|0 ia iabc if ij il im imapc ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs n|0 new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf q|0 quita qa r|0 rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv s|0 sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync t|0 tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up v|0 ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank",
                    built_in: "abs acos add and append argc argidx argv asin atan atan2 browse browsedir bufexists buflisted bufloaded bufname bufnr bufwinnr byte2line byteidx call ceil changenr char2nr cindent clearmatches col complete complete_add complete_check confirm copy cos cosh count cscope_connection cursor deepcopy delete did_filetype diff_filler diff_hlID empty escape eval eventhandler executable exists exp expand extend feedkeys filereadable filewritable filter finddir findfile float2nr floor fmod fnameescape fnamemodify foldclosed foldclosedend foldlevel foldtext foldtextresult foreground function garbagecollect get getbufline getbufvar getchar getcharmod getcmdline getcmdpos getcmdtype getcwd getfontname getfperm getfsize getftime getftype getline getloclist getmatches getpid getpos getqflist getreg getregtype gettabvar gettabwinvar getwinposx getwinposy getwinvar glob globpath has has_key haslocaldir hasmapto histadd histdel histget histnr hlexists hlID hostname iconv indent index input inputdialog inputlist inputrestore inputsave inputsecret insert invert isdirectory islocked items join keys len libcall libcallnr line line2byte lispindent localtime log log10 luaeval map maparg mapcheck match matchadd matcharg matchdelete matchend matchlist matchstr max min mkdir mode mzeval nextnonblank nr2char or pathshorten pow prevnonblank printf pumvisible py3eval pyeval range readfile reltime reltimestr remote_expr remote_foreground remote_peek remote_read remote_send remove rename repeat resolve reverse round screenattr screenchar screencol screenrow search searchdecl searchpair searchpairpos searchpos server2client serverlist setbufvar setcmdpos setline setloclist setmatches setpos setqflist setreg settabvar settabwinvar setwinvar sha256 shellescape shiftwidth simplify sin sinh sort soundfold spellbadword spellsuggest split sqrt str2float str2nr strchars strdisplaywidth strftime stridx string strlen strpart strridx strtrans strwidth submatch substitute synconcealed synID synIDattr synIDtrans synstack system tabpagebuflist tabpagenr tabpagewinnr tagfiles taglist tan tanh tempname tolower toupper tr trunc type undofile undotree values virtcol visualmode wildmenumode winbufnr wincol winheight winline winnr winrestcmd winrestview winsaveview winwidth writefile xor"
                },
                illegal: /[{:]/,
                contains: [e.NUMBER_MODE, e.APOS_STRING_MODE, {
                    className: "string",
                    begin: /"((\\")|[^"\n])*("|\n)/
                }, { className: "variable", begin: /[bwtglsav]:[\w\d_]*/ }, {
                    className: "function",
                    beginKeywords: "function function!",
                    end: "$",
                    relevance: 0,
                    contains: [e.TITLE_MODE, { className: "params", begin: "\\(", end: "\\)" }]
                }]
            }
        }
    }, {}],
    137: [function(require, module, exports) {
        module.exports = function(e) {
            return {
                case_insensitive: !0,
                lexemes: "\\.?" + e.IDENT_RE,
                keywords: {
                    keyword: "lock rep repe repz repne repnz xaquire xrelease bnd nobnd aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg cmpxchg486 cmpxchg8b cmpxchg16b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip fucomp fucompp fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc incbin insb insd insw int int01 int1 int03 int3 into invd invpcid invlpg invlpga iret iretd iretq iretw jcxz jecxz jrcxz jmp jmpe lahf lar lds lea leave les lfence lfs lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne loopnz loopz lsl lss ltr mfence monitor mov movd movq movsb movsd movsq movsw movsx movsxd movzx mul mwait neg nop not or out outsb outsd outsw packssdw packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdshr rdmsr rdpmc rdtsc rdtscp ret retf retn rol ror rdm rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd scasq scasw sfence sgdt shl shld shr shrd sidt sldt skinit smi smint smintold smsw stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter sysexit sysret test ud0 ud1 ud2b ud2 ud2a umov verr verw fwait wbinvd wrshr wrmsr xadd xbts xchg xlatb xlat xor cmove cmovz cmovne cmovnz cmova cmovnbe cmovae cmovnb cmovb cmovnae cmovbe cmovna cmovg cmovnle cmovge cmovnl cmovl cmovnge cmovle cmovng cmovc cmovnc cmovo cmovno cmovs cmovns cmovp cmovpe cmovnp cmovpo je jz jne jnz ja jnbe jae jnb jb jnae jbe jna jg jnle jge jnl jl jnge jle jng jc jnc jo jno js jns jpo jnp jpe jp sete setz setne setnz seta setnbe setae setnb setnc setb setnae setcset setbe setna setg setnle setge setnl setl setnge setle setng sets setns seto setno setpe setp setpo setnp addps addss andnps andps cmpeqps cmpeqss cmpleps cmpless cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmpunordps cmpunordss cmpps cmpss comiss cvtpi2ps cvtps2pi cvtsi2ss cvtss2si cvttps2pi cvttss2si divps divss ldmxcsr maxps maxss minps minss movaps movhps movlhps movlps movhlps movmskps movntps movss movups mulps mulss orps rcpps rcpss rsqrtps rsqrtss shufps sqrtps sqrtss stmxcsr subps subss ucomiss unpckhps unpcklps xorps fxrstor fxrstor64 fxsave fxsave64 xgetbv xsetbv xsave xsave64 xsaveopt xsaveopt64 xrstor xrstor64 prefetchnta prefetcht0 prefetcht1 prefetcht2 maskmovq movntq pavgb pavgw pextrw pinsrw pmaxsw pmaxub pminsw pminub pmovmskb pmulhuw psadbw pshufw pf2iw pfnacc pfpnacc pi2fw pswapd maskmovdqu clflush movntdq movnti movntpd movdqa movdqu movdq2q movq2dq paddq pmuludq pshufd pshufhw pshuflw pslldq psrldq psubq punpckhqdq punpcklqdq addpd addsd andnpd andpd cmpeqpd cmpeqsd cmplepd cmplesd cmpltpd cmpltsd cmpneqpd cmpneqsd cmpnlepd cmpnlesd cmpnltpd cmpnltsd cmpordpd cmpordsd cmpunordpd cmpunordsd cmppd comisd cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtps2dq cvtps2pd cvtsd2si cvtsd2ss cvtsi2sd cvtss2sd cvttpd2pi cvttpd2dq cvttps2dq cvttsd2si divpd divsd maxpd maxsd minpd minsd movapd movhpd movlpd movmskpd movupd mulpd mulsd orpd shufpd sqrtpd sqrtsd subpd subsd ucomisd unpckhpd unpcklpd xorpd addsubpd addsubps haddpd haddps hsubpd hsubps lddqu movddup movshdup movsldup clgi stgi vmcall vmclear vmfunc vmlaunch vmload vmmcall vmptrld vmptrst vmread vmresume vmrun vmsave vmwrite vmxoff vmxon invept invvpid pabsb pabsw pabsd palignr phaddw phaddd phaddsw phsubw phsubd phsubsw pmaddubsw pmulhrsw pshufb psignb psignw psignd extrq insertq movntsd movntss lzcnt blendpd blendps blendvpd blendvps dppd dpps extractps insertps movntdqa mpsadbw packusdw pblendvb pblendw pcmpeqq pextrb pextrd pextrq phminposuw pinsrb pinsrd pinsrq pmaxsb pmaxsd pmaxud pmaxuw pminsb pminsd pminud pminuw pmovsxbw pmovsxbd pmovsxbq pmovsxwd pmovsxwq pmovsxdq pmovzxbw pmovzxbd pmovzxbq pmovzxwd pmovzxwq pmovzxdq pmuldq pmulld ptest roundpd roundps roundsd roundss crc32 pcmpestri pcmpestrm pcmpistri pcmpistrm pcmpgtq popcnt getsec pfrcpv pfrsqrtv movbe aesenc aesenclast aesdec aesdeclast aesimc aeskeygenassist vaesenc vaesenclast vaesdec vaesdeclast vaesimc vaeskeygenassist vaddpd vaddps vaddsd vaddss vaddsubpd vaddsubps vandpd vandps vandnpd vandnps vblendpd vblendps vblendvpd vblendvps vbroadcastss vbroadcastsd vbroadcastf128 vcmpeq_ospd vcmpeqpd vcmplt_ospd vcmpltpd vcmple_ospd vcmplepd vcmpunord_qpd vcmpunordpd vcmpneq_uqpd vcmpneqpd vcmpnlt_uspd vcmpnltpd vcmpnle_uspd vcmpnlepd vcmpord_qpd vcmpordpd vcmpeq_uqpd vcmpnge_uspd vcmpngepd vcmpngt_uspd vcmpngtpd vcmpfalse_oqpd vcmpfalsepd vcmpneq_oqpd vcmpge_ospd vcmpgepd vcmpgt_ospd vcmpgtpd vcmptrue_uqpd vcmptruepd vcmplt_oqpd vcmple_oqpd vcmpunord_spd vcmpneq_uspd vcmpnlt_uqpd vcmpnle_uqpd vcmpord_spd vcmpeq_uspd vcmpnge_uqpd vcmpngt_uqpd vcmpfalse_ospd vcmpneq_ospd vcmpge_oqpd vcmpgt_oqpd vcmptrue_uspd vcmppd vcmpeq_osps vcmpeqps vcmplt_osps vcmpltps vcmple_osps vcmpleps vcmpunord_qps vcmpunordps vcmpneq_uqps vcmpneqps vcmpnlt_usps vcmpnltps vcmpnle_usps vcmpnleps vcmpord_qps vcmpordps vcmpeq_uqps vcmpnge_usps vcmpngeps vcmpngt_usps vcmpngtps vcmpfalse_oqps vcmpfalseps vcmpneq_oqps vcmpge_osps vcmpgeps vcmpgt_osps vcmpgtps vcmptrue_uqps vcmptrueps vcmplt_oqps vcmple_oqps vcmpunord_sps vcmpneq_usps vcmpnlt_uqps vcmpnle_uqps vcmpord_sps vcmpeq_usps vcmpnge_uqps vcmpngt_uqps vcmpfalse_osps vcmpneq_osps vcmpge_oqps vcmpgt_oqps vcmptrue_usps vcmpps vcmpeq_ossd vcmpeqsd vcmplt_ossd vcmpltsd vcmple_ossd vcmplesd vcmpunord_qsd vcmpunordsd vcmpneq_uqsd vcmpneqsd vcmpnlt_ussd vcmpnltsd vcmpnle_ussd vcmpnlesd vcmpord_qsd vcmpordsd vcmpeq_uqsd vcmpnge_ussd vcmpngesd vcmpngt_ussd vcmpngtsd vcmpfalse_oqsd vcmpfalsesd vcmpneq_oqsd vcmpge_ossd vcmpgesd vcmpgt_ossd vcmpgtsd vcmptrue_uqsd vcmptruesd vcmplt_oqsd vcmple_oqsd vcmpunord_ssd vcmpneq_ussd vcmpnlt_uqsd vcmpnle_uqsd vcmpord_ssd vcmpeq_ussd vcmpnge_uqsd vcmpngt_uqsd vcmpfalse_ossd vcmpneq_ossd vcmpge_oqsd vcmpgt_oqsd vcmptrue_ussd vcmpsd vcmpeq_osss vcmpeqss vcmplt_osss vcmpltss vcmple_osss vcmpless vcmpunord_qss vcmpunordss vcmpneq_uqss vcmpneqss vcmpnlt_usss vcmpnltss vcmpnle_usss vcmpnless vcmpord_qss vcmpordss vcmpeq_uqss vcmpnge_usss vcmpngess vcmpngt_usss vcmpngtss vcmpfalse_oqss vcmpfalsess vcmpneq_oqss vcmpge_osss vcmpgess vcmpgt_osss vcmpgtss vcmptrue_uqss vcmptruess vcmplt_oqss vcmple_oqss vcmpunord_sss vcmpneq_usss vcmpnlt_uqss vcmpnle_uqss vcmpord_sss vcmpeq_usss vcmpnge_uqss vcmpngt_uqss vcmpfalse_osss vcmpneq_osss vcmpge_oqss vcmpgt_oqss vcmptrue_usss vcmpss vcomisd vcomiss vcvtdq2pd vcvtdq2ps vcvtpd2dq vcvtpd2ps vcvtps2dq vcvtps2pd vcvtsd2si vcvtsd2ss vcvtsi2sd vcvtsi2ss vcvtss2sd vcvtss2si vcvttpd2dq vcvttps2dq vcvttsd2si vcvttss2si vdivpd vdivps vdivsd vdivss vdppd vdpps vextractf128 vextractps vhaddpd vhaddps vhsubpd vhsubps vinsertf128 vinsertps vlddqu vldqqu vldmxcsr vmaskmovdqu vmaskmovps vmaskmovpd vmaxpd vmaxps vmaxsd vmaxss vminpd vminps vminsd vminss vmovapd vmovaps vmovd vmovq vmovddup vmovdqa vmovqqa vmovdqu vmovqqu vmovhlps vmovhpd vmovhps vmovlhps vmovlpd vmovlps vmovmskpd vmovmskps vmovntdq vmovntqq vmovntdqa vmovntpd vmovntps vmovsd vmovshdup vmovsldup vmovss vmovupd vmovups vmpsadbw vmulpd vmulps vmulsd vmulss vorpd vorps vpabsb vpabsw vpabsd vpacksswb vpackssdw vpackuswb vpackusdw vpaddb vpaddw vpaddd vpaddq vpaddsb vpaddsw vpaddusb vpaddusw vpalignr vpand vpandn vpavgb vpavgw vpblendvb vpblendw vpcmpestri vpcmpestrm vpcmpistri vpcmpistrm vpcmpeqb vpcmpeqw vpcmpeqd vpcmpeqq vpcmpgtb vpcmpgtw vpcmpgtd vpcmpgtq vpermilpd vpermilps vperm2f128 vpextrb vpextrw vpextrd vpextrq vphaddw vphaddd vphaddsw vphminposuw vphsubw vphsubd vphsubsw vpinsrb vpinsrw vpinsrd vpinsrq vpmaddwd vpmaddubsw vpmaxsb vpmaxsw vpmaxsd vpmaxub vpmaxuw vpmaxud vpminsb vpminsw vpminsd vpminub vpminuw vpminud vpmovmskb vpmovsxbw vpmovsxbd vpmovsxbq vpmovsxwd vpmovsxwq vpmovsxdq vpmovzxbw vpmovzxbd vpmovzxbq vpmovzxwd vpmovzxwq vpmovzxdq vpmulhuw vpmulhrsw vpmulhw vpmullw vpmulld vpmuludq vpmuldq vpor vpsadbw vpshufb vpshufd vpshufhw vpshuflw vpsignb vpsignw vpsignd vpslldq vpsrldq vpsllw vpslld vpsllq vpsraw vpsrad vpsrlw vpsrld vpsrlq vptest vpsubb vpsubw vpsubd vpsubq vpsubsb vpsubsw vpsubusb vpsubusw vpunpckhbw vpunpckhwd vpunpckhdq vpunpckhqdq vpunpcklbw vpunpcklwd vpunpckldq vpunpcklqdq vpxor vrcpps vrcpss vrsqrtps vrsqrtss vroundpd vroundps vroundsd vroundss vshufpd vshufps vsqrtpd vsqrtps vsqrtsd vsqrtss vstmxcsr vsubpd vsubps vsubsd vsubss vtestps vtestpd vucomisd vucomiss vunpckhpd vunpckhps vunpcklpd vunpcklps vxorpd vxorps vzeroall vzeroupper pclmullqlqdq pclmulhqlqdq pclmullqhqdq pclmulhqhqdq pclmulqdq vpclmullqlqdq vpclmulhqlqdq vpclmullqhqdq vpclmulhqhqdq vpclmulqdq vfmadd132ps vfmadd132pd vfmadd312ps vfmadd312pd vfmadd213ps vfmadd213pd vfmadd123ps vfmadd123pd vfmadd231ps vfmadd231pd vfmadd321ps vfmadd321pd vfmaddsub132ps vfmaddsub132pd vfmaddsub312ps vfmaddsub312pd vfmaddsub213ps vfmaddsub213pd vfmaddsub123ps vfmaddsub123pd vfmaddsub231ps vfmaddsub231pd vfmaddsub321ps vfmaddsub321pd vfmsub132ps vfmsub132pd vfmsub312ps vfmsub312pd vfmsub213ps vfmsub213pd vfmsub123ps vfmsub123pd vfmsub231ps vfmsub231pd vfmsub321ps vfmsub321pd vfmsubadd132ps vfmsubadd132pd vfmsubadd312ps vfmsubadd312pd vfmsubadd213ps vfmsubadd213pd vfmsubadd123ps vfmsubadd123pd vfmsubadd231ps vfmsubadd231pd vfmsubadd321ps vfmsubadd321pd vfnmadd132ps vfnmadd132pd vfnmadd312ps vfnmadd312pd vfnmadd213ps vfnmadd213pd vfnmadd123ps vfnmadd123pd vfnmadd231ps vfnmadd231pd vfnmadd321ps vfnmadd321pd vfnmsub132ps vfnmsub132pd vfnmsub312ps vfnmsub312pd vfnmsub213ps vfnmsub213pd vfnmsub123ps vfnmsub123pd vfnmsub231ps vfnmsub231pd vfnmsub321ps vfnmsub321pd vfmadd132ss vfmadd132sd vfmadd312ss vfmadd312sd vfmadd213ss vfmadd213sd vfmadd123ss vfmadd123sd vfmadd231ss vfmadd231sd vfmadd321ss vfmadd321sd vfmsub132ss vfmsub132sd vfmsub312ss vfmsub312sd vfmsub213ss vfmsub213sd vfmsub123ss vfmsub123sd vfmsub231ss vfmsub231sd vfmsub321ss vfmsub321sd vfnmadd132ss vfnmadd132sd vfnmadd312ss vfnmadd312sd vfnmadd213ss vfnmadd213sd vfnmadd123ss vfnmadd123sd vfnmadd231ss vfnmadd231sd vfnmadd321ss vfnmadd321sd vfnmsub132ss vfnmsub132sd vfnmsub312ss vfnmsub312sd vfnmsub213ss vfnmsub213sd vfnmsub123ss vfnmsub123sd vfnmsub231ss vfnmsub231sd vfnmsub321ss vfnmsub321sd rdfsbase rdgsbase rdrand wrfsbase wrgsbase vcvtph2ps vcvtps2ph adcx adox rdseed clac stac xstore xcryptecb xcryptcbc xcryptctr xcryptcfb xcryptofb montmul xsha1 xsha256 llwpcb slwpcb lwpval lwpins vfmaddpd vfmaddps vfmaddsd vfmaddss vfmaddsubpd vfmaddsubps vfmsubaddpd vfmsubaddps vfmsubpd vfmsubps vfmsubsd vfmsubss vfnmaddpd vfnmaddps vfnmaddsd vfnmaddss vfnmsubpd vfnmsubps vfnmsubsd vfnmsubss vfrczpd vfrczps vfrczsd vfrczss vpcmov vpcomb vpcomd vpcomq vpcomub vpcomud vpcomuq vpcomuw vpcomw vphaddbd vphaddbq vphaddbw vphadddq vphaddubd vphaddubq vphaddubw vphaddudq vphadduwd vphadduwq vphaddwd vphaddwq vphsubbw vphsubdq vphsubwd vpmacsdd vpmacsdqh vpmacsdql vpmacssdd vpmacssdqh vpmacssdql vpmacsswd vpmacssww vpmacswd vpmacsww vpmadcsswd vpmadcswd vpperm vprotb vprotd vprotq vprotw vpshab vpshad vpshaq vpshaw vpshlb vpshld vpshlq vpshlw vbroadcasti128 vpblendd vpbroadcastb vpbroadcastw vpbroadcastd vpbroadcastq vpermd vpermpd vpermps vpermq vperm2i128 vextracti128 vinserti128 vpmaskmovd vpmaskmovq vpsllvd vpsllvq vpsravd vpsrlvd vpsrlvq vgatherdpd vgatherqpd vgatherdps vgatherqps vpgatherdd vpgatherqd vpgatherdq vpgatherqq xabort xbegin xend xtest andn bextr blci blcic blsi blsic blcfill blsfill blcmsk blsmsk blsr blcs bzhi mulx pdep pext rorx sarx shlx shrx tzcnt tzmsk t1mskc valignd valignq vblendmpd vblendmps vbroadcastf32x4 vbroadcastf64x4 vbroadcasti32x4 vbroadcasti64x4 vcompresspd vcompressps vcvtpd2udq vcvtps2udq vcvtsd2usi vcvtss2usi vcvttpd2udq vcvttps2udq vcvttsd2usi vcvttss2usi vcvtudq2pd vcvtudq2ps vcvtusi2sd vcvtusi2ss vexpandpd vexpandps vextractf32x4 vextractf64x4 vextracti32x4 vextracti64x4 vfixupimmpd vfixupimmps vfixupimmsd vfixupimmss vgetexppd vgetexpps vgetexpsd vgetexpss vgetmantpd vgetmantps vgetmantsd vgetmantss vinsertf32x4 vinsertf64x4 vinserti32x4 vinserti64x4 vmovdqa32 vmovdqa64 vmovdqu32 vmovdqu64 vpabsq vpandd vpandnd vpandnq vpandq vpblendmd vpblendmq vpcmpltd vpcmpled vpcmpneqd vpcmpnltd vpcmpnled vpcmpd vpcmpltq vpcmpleq vpcmpneqq vpcmpnltq vpcmpnleq vpcmpq vpcmpequd vpcmpltud vpcmpleud vpcmpnequd vpcmpnltud vpcmpnleud vpcmpud vpcmpequq vpcmpltuq vpcmpleuq vpcmpnequq vpcmpnltuq vpcmpnleuq vpcmpuq vpcompressd vpcompressq vpermi2d vpermi2pd vpermi2ps vpermi2q vpermt2d vpermt2pd vpermt2ps vpermt2q vpexpandd vpexpandq vpmaxsq vpmaxuq vpminsq vpminuq vpmovdb vpmovdw vpmovqb vpmovqd vpmovqw vpmovsdb vpmovsdw vpmovsqb vpmovsqd vpmovsqw vpmovusdb vpmovusdw vpmovusqb vpmovusqd vpmovusqw vpord vporq vprold vprolq vprolvd vprolvq vprord vprorq vprorvd vprorvq vpscatterdd vpscatterdq vpscatterqd vpscatterqq vpsraq vpsravq vpternlogd vpternlogq vptestmd vptestmq vptestnmd vptestnmq vpxord vpxorq vrcp14pd vrcp14ps vrcp14sd vrcp14ss vrndscalepd vrndscaleps vrndscalesd vrndscaless vrsqrt14pd vrsqrt14ps vrsqrt14sd vrsqrt14ss vscalefpd vscalefps vscalefsd vscalefss vscatterdpd vscatterdps vscatterqpd vscatterqps vshuff32x4 vshuff64x2 vshufi32x4 vshufi64x2 kandnw kandw kmovw knotw kortestw korw kshiftlw kshiftrw kunpckbw kxnorw kxorw vpbroadcastmb2q vpbroadcastmw2d vpconflictd vpconflictq vplzcntd vplzcntq vexp2pd vexp2ps vrcp28pd vrcp28ps vrcp28sd vrcp28ss vrsqrt28pd vrsqrt28ps vrsqrt28sd vrsqrt28ss vgatherpf0dpd vgatherpf0dps vgatherpf0qpd vgatherpf0qps vgatherpf1dpd vgatherpf1dps vgatherpf1qpd vgatherpf1qps vscatterpf0dpd vscatterpf0dps vscatterpf0qpd vscatterpf0qps vscatterpf1dpd vscatterpf1dps vscatterpf1qpd vscatterpf1qps prefetchwt1 bndmk bndcl bndcu bndcn bndmov bndldx bndstx sha1rnds4 sha1nexte sha1msg1 sha1msg2 sha256rnds2 sha256msg1 sha256msg2 hint_nop0 hint_nop1 hint_nop2 hint_nop3 hint_nop4 hint_nop5 hint_nop6 hint_nop7 hint_nop8 hint_nop9 hint_nop10 hint_nop11 hint_nop12 hint_nop13 hint_nop14 hint_nop15 hint_nop16 hint_nop17 hint_nop18 hint_nop19 hint_nop20 hint_nop21 hint_nop22 hint_nop23 hint_nop24 hint_nop25 hint_nop26 hint_nop27 hint_nop28 hint_nop29 hint_nop30 hint_nop31 hint_nop32 hint_nop33 hint_nop34 hint_nop35 hint_nop36 hint_nop37 hint_nop38 hint_nop39 hint_nop40 hint_nop41 hint_nop42 hint_nop43 hint_nop44 hint_nop45 hint_nop46 hint_nop47 hint_nop48 hint_nop49 hint_nop50 hint_nop51 hint_nop52 hint_nop53 hint_nop54 hint_nop55 hint_nop56 hint_nop57 hint_nop58 hint_nop59 hint_nop60 hint_nop61 hint_nop62 hint_nop63",
                    literal: "ip eip rip al ah bl bh cl ch dl dh sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w eax ebx ecx edx esi edi ebp esp eip r8d r9d r10d r11d r12d r13d r14d r15d rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 cs ds es fs gs ss st st0 st1 st2 st3 st4 st5 st6 st7 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 xmm0  xmm1  xmm2  xmm3  xmm4  xmm5  xmm6  xmm7  xmm8  xmm9 xmm10  xmm11 xmm12 xmm13 xmm14 xmm15 xmm16 xmm17 xmm18 xmm19 xmm20 xmm21 xmm22 xmm23 xmm24 xmm25 xmm26 xmm27 xmm28 xmm29 xmm30 xmm31 ymm0  ymm1  ymm2  ymm3  ymm4  ymm5  ymm6  ymm7  ymm8  ymm9 ymm10  ymm11 ymm12 ymm13 ymm14 ymm15 ymm16 ymm17 ymm18 ymm19 ymm20 ymm21 ymm22 ymm23 ymm24 ymm25 ymm26 ymm27 ymm28 ymm29 ymm30 ymm31 zmm0  zmm1  zmm2  zmm3  zmm4  zmm5  zmm6  zmm7  zmm8  zmm9 zmm10  zmm11 zmm12 zmm13 zmm14 zmm15 zmm16 zmm17 zmm18 zmm19 zmm20 zmm21 zmm22 zmm23 zmm24 zmm25 zmm26 zmm27 zmm28 zmm29 zmm30 zmm31 k0 k1 k2 k3 k4 k5 k6 k7 bnd0 bnd1 bnd2 bnd3 cr0 cr1 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr8 tr3 tr4 tr5 tr6 tr7 r0 r1 r2 r3 r4 r5 r6 r7 r0b r1b r2b r3b r4b r5b r6b r7b r0w r1w r2w r3w r4w r5w r6w r7w r0d r1d r2d r3d r4d r5d r6d r7d r0h r1h r2h r3h r0l r1l r2l r3l r4l r5l r6l r7l r8l r9l r10l r11l r12l r13l r14l r15l",
                    pseudo: "db dw dd dq dt ddq do dy dz resb resw resd resq rest resdq reso resy resz incbin equ times",
                    preprocessor: "%define %xdefine %+ %undef %defstr %deftok %assign %strcat %strlen %substr %rotate %elif %else %endif %ifmacro %ifctx %ifidn %ifidni %ifid %ifnum %ifstr %iftoken %ifempty %ifenv %error %warning %fatal %rep %endrep %include %push %pop %repl %pathsearch %depend %use %arg %stacksize %local %line %comment %endcomment .nolist byte word dword qword nosplit rel abs seg wrt strict near far a32 ptr __FILE__ __LINE__ __SECT__  __BITS__ __OUTPUT_FORMAT__ __DATE__ __TIME__ __DATE_NUM__ __TIME_NUM__ __UTC_DATE__ __UTC_TIME__ __UTC_DATE_NUM__ __UTC_TIME_NUM__  __PASS__ struc endstruc istruc at iend align alignb sectalign daz nodaz up down zero default option assume public ",
                    built_in: "bits use16 use32 use64 default section segment absolute extern global common cpu float __utf16__ __utf16le__ __utf16be__ __utf32__ __utf32le__ __utf32be__ __float8__ __float16__ __float32__ __float64__ __float80m__ __float80e__ __float128l__ __float128h__ __Infinity__ __QNaN__ __SNaN__ Inf NaN QNaN SNaN float8 float16 float32 float64 float80m float80e float128l float128h __FLOAT_DAZ__ __FLOAT_ROUND__ __FLOAT__"
                },
                contains: [e.COMMENT(";", "$", { relevance: 0 }), {
                    className: "number",
                    variants: [{
                        begin: "\\b(?:([0-9][0-9_]*)?\\.[0-9_]*(?:[eE][+-]?[0-9_]+)?|(0[Xx])?[0-9][0-9_]*\\.?[0-9_]*(?:[pP](?:[+-]?[0-9_]+)?)?)\\b",
                        relevance: 0
                    }, {
                        begin: "\\$[0-9][0-9A-Fa-f]*",
                        relevance: 0
                    }, { begin: "\\b(?:[0-9A-Fa-f][0-9A-Fa-f_]*[Hh]|[0-9][0-9_]*[DdTt]?|[0-7][0-7_]*[QqOo]|[0-1][0-1_]*[BbYy])\\b" }, { begin: "\\b(?:0[Xx][0-9A-Fa-f_]+|0[DdTt][0-9_]+|0[QqOo][0-7_]+|0[BbYy][0-1_]+)\\b" }]
                }, e.QUOTE_STRING_MODE, {
                    className: "string",
                    variants: [{ begin: "'", end: "[^\\\\]'" }, {
                        begin: "`",
                        end: "[^\\\\]`"
                    }, { begin: "\\.[A-Za-z0-9]+" }],
                    relevance: 0
                }, {
                    className: "label",
                    variants: [{ begin: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)" }, { begin: "^\\s*%%[A-Za-z0-9_$#@~.?]*:" }],
                    relevance: 0
                }, { className: "argument", begin: "%[0-9]+", relevance: 0 }, {
                    className: "built_in",
                    begin: "%!S+",
                    relevance: 0
                }]
            }
        }
    }, {}],
    138: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "ObjectLoader Animate MovieCredits Slides Filters Shading Materials LensFlare Mapping VLCAudioVideo StereoDecoder PointCloud NetworkAccess RemoteControl RegExp ChromaKey Snowfall NodeJS Speech Charts",
                n = {
                    keyword: "if then else do while until for loop import with is as where when by data constant",
                    literal: "true false nil",
                    type: "integer real text name boolean symbol infix prefix postfix block tree",
                    built_in: "in mod rem and or xor not abs sign floor ceil sqrt sin cos tan asin acos atan exp expm1 log log2 log10 log1p pi at",
                    module: t,
                    id: "text_length text_range text_find text_replace contains page slide basic_slide title_slide title subtitle fade_in fade_out fade_at clear_color color line_color line_width texture_wrap texture_transform texture scale_?x scale_?y scale_?z? translate_?x translate_?y translate_?z? rotate_?x rotate_?y rotate_?z? rectangle circle ellipse sphere path line_to move_to quad_to curve_to theme background contents locally time mouse_?x mouse_?y mouse_buttons"
                },
                r = { className: "constant", begin: "[A-Z][A-Z_0-9]+", relevance: 0 },
                i = { className: "variable", begin: "([A-Z][a-z_0-9]+)+", relevance: 0 },
                a = { className: "id", begin: "[a-z][a-z_0-9]+", relevance: 0 },
                o = { className: "string", begin: '"', end: '"', illegal: "\\n" },
                s = { className: "string", begin: "'", end: "'", illegal: "\\n" },
                l = { className: "string", begin: "<<", end: ">>" },
                c = {
                    className: "number",
                    begin: "[0-9]+#[0-9A-Z_]+(\\.[0-9-A-Z_]+)?#?([Ee][+-]?[0-9]+)?",
                    relevance: 10
                },
                d = {
                    className: "import",
                    beginKeywords: "import",
                    end: "$",
                    keywords: { keyword: "import", module: t },
                    relevance: 0,
                    contains: [o]
                },
                u = { className: "function", begin: "[a-z].*->" };
            return {
                aliases: ["tao"],
                lexemes: /[a-zA-Z][a-zA-Z0-9_?]*/,
                keywords: n,
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, o, s, l, u, d, r, i, a, c, e.NUMBER_MODE]
            }
        }
    }, {}],
    139: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "[A-Za-z0-9\\._:-]+",
                n = { begin: /<\?(php)?(?!\w)/, end: /\?>/, subLanguage: "php" },
                r = {
                    endsWithParent: !0,
                    illegal: /</,
                    relevance: 0,
                    contains: [n, { className: "attribute", begin: t, relevance: 0 }, {
                        begin: "=",
                        relevance: 0,
                        contains: [{
                            className: "value",
                            contains: [n],
                            variants: [{ begin: /"/, end: /"/ }, { begin: /'/, end: /'/ }, { begin: /[^\s\/>]+/ }]
                        }]
                    }]
                };
            return {
                aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
                case_insensitive: !0,
                contains: [{
                    className: "doctype",
                    begin: "<!DOCTYPE",
                    end: ">",
                    relevance: 10,
                    contains: [{ begin: "\\[", end: "\\]" }]
                }, e.COMMENT("<!--", "-->", { relevance: 10 }), {
                    className: "cdata",
                    begin: "<\\!\\[CDATA\\[",
                    end: "\\]\\]>",
                    relevance: 10
                }, {
                    className: "tag",
                    begin: "<style(?=\\s|>|$)",
                    end: ">",
                    keywords: { title: "style" },
                    contains: [r],
                    starts: { end: "</style>", returnEnd: !0, subLanguage: "css" }
                }, {
                    className: "tag",
                    begin: "<script(?=\\s|>|$)",
                    end: ">",
                    keywords: { title: "script" },
                    contains: [r],
                    starts: { end: "</script>", returnEnd: !0, subLanguage: ["actionscript", "javascript", "handlebars"] }
                }, n, { className: "pi", begin: /<\?\w+/, end: /\?>/, relevance: 10 }, {
                    className: "tag",
                    begin: "</?",
                    end: "/?>",
                    contains: [{ className: "title", begin: /[^ \/><\n\t]+/, relevance: 0 }, r]
                }]
            }
        }
    }, {}],
    140: [function(require, module, exports) {
        module.exports = function(e) {
            var t = "for let if while then else return where group by xquery encoding versionmodule namespace boundary-space preserve strip default collation base-uri orderingcopy-namespaces order declare import schema namespace function option in allowing emptyat tumbling window sliding window start when only end when previous next stable ascendingdescending empty greatest least some every satisfies switch case typeswitch try catch andor to union intersect instance of treat as castable cast map array delete insert intoreplace value rename copy modify update",
                n = "false true xs:string xs:integer element item xs:date xs:datetime xs:float xs:double xs:decimal QName xs:anyURI xs:long xs:int xs:short xs:byte attribute",
                r = { className: "variable", begin: /\$[a-zA-Z0-9\-]+/, relevance: 5 },
                i = {
                    className: "number",
                    begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                    relevance: 0
                },
                a = {
                    className: "string",
                    variants: [{ begin: /"/, end: /"/, contains: [{ begin: /""/, relevance: 0 }] }, {
                        begin: /'/,
                        end: /'/,
                        contains: [{ begin: /''/, relevance: 0 }]
                    }]
                },
                o = { className: "decorator", begin: "%\\w+" },
                s = {
                    className: "comment",
                    begin: "\\(:",
                    end: ":\\)",
                    relevance: 10,
                    contains: [{ className: "doc", begin: "@\\w+" }]
                },
                l = { begin: "{", end: "}" },
                c = [r, a, i, s, o, l];
            return l.contains = c, {
                aliases: ["xpath", "xq"],
                case_insensitive: !1,
                lexemes: /[a-zA-Z\$][a-zA-Z0-9_:\-]*/,
                illegal: /(proc)|(abstract)|(extends)|(until)|(#)/,
                keywords: { keyword: t, literal: n },
                contains: c
            }
        }
    }, {}],
    141: [function(require, module, exports) {
        module.exports = function(e) {
            var t = {
                    className: "string",
                    contains: [e.BACKSLASH_ESCAPE],
                    variants: [{ begin: 'b"', end: '"' }, {
                        begin: "b'",
                        end: "'"
                    }, e.inherit(e.APOS_STRING_MODE, { illegal: null }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null })]
                },
                n = { variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE] };
            return {
                aliases: ["zep"],
                case_insensitive: !0,
                keywords: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var let while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally int uint long ulong char uchar double float bool boolean stringlikely unlikely",
                contains: [e.C_LINE_COMMENT_MODE, e.HASH_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", {
                    contains: [{
                        className: "doctag",
                        begin: "@[A-Za-z]+"
                    }]
                }), e.COMMENT("__halt_compiler.+?;", !1, {
                    endsWithParent: !0,
                    keywords: "__halt_compiler",
                    lexemes: e.UNDERSCORE_IDENT_RE
                }), {
                    className: "string",
                    begin: "<<<['\"]?\\w+['\"]?$",
                    end: "^\\w+;",
                    contains: [e.BACKSLASH_ESCAPE]
                }, { begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ }, {
                    className: "function",
                    beginKeywords: "function",
                    end: /[;{]/,
                    excludeEnd: !0,
                    illegal: "\\$|\\[|%",
                    contains: [e.UNDERSCORE_TITLE_MODE, {
                        className: "params",
                        begin: "\\(",
                        end: "\\)",
                        contains: ["self", e.C_BLOCK_COMMENT_MODE, t, n]
                    }]
                }, {
                    className: "class",
                    beginKeywords: "class interface",
                    end: "{",
                    excludeEnd: !0,
                    illegal: /[:\(\$"]/,
                    contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
                }, {
                    beginKeywords: "namespace",
                    end: ";",
                    illegal: /[\.']/,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, { beginKeywords: "use", end: ";", contains: [e.UNDERSCORE_TITLE_MODE] }, { begin: "=>" }, t, n]
            }
        }
    }, {}],
    142: [function(require, module, exports) {
        ! function(e, t) {
            "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return t(e)
            } : t(e)
        }("undefined" != typeof window ? window : this, function(e, t) {
            function n(e) {
                var t = "length" in e && e.length,
                    n = J.type(e);
                return "function" === n || J.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
            }

            function r(e, t, n) {
                if (J.isFunction(t)) return J.grep(e, function(e, r) {
                    return !!t.call(e, r, e) !== n
                });
                if (t.nodeType) return J.grep(e, function(e) {
                    return e === t !== n
                });
                if ("string" == typeof t) {
                    if (se.test(t)) return J.filter(t, e, n);
                    t = J.filter(t, e)
                }
                return J.grep(e, function(e) {
                    return $.call(t, e) >= 0 !== n
                })
            }

            function i(e, t) {
                for (;
                    (e = e[t]) && 1 !== e.nodeType;);
                return e
            }

            function a(e) {
                var t = ge[e] = {};
                return J.each(e.match(me) || [], function(e, n) {
                    t[n] = !0
                }), t
            }

            function o() {
                X.removeEventListener("DOMContentLoaded", o, !1), e.removeEventListener("load", o, !1), J.ready()
            }

            function s() {
                Object.defineProperty(this.cache = {}, 0, {
                    get: function() {
                        return {}
                    }
                }), this.expando = J.expando + s.uid++
            }

            function l(e, t, n) {
                var r;
                if (void 0 === n && 1 === e.nodeType)
                    if (r = "data-" + t.replace(ve, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                        try {
                            n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Ie.test(n) ? J.parseJSON(n) : n
                        } catch (i) {}
                        be.set(e, t, n)
                    } else n = void 0;
                return n
            }

            function c() {
                return !0
            }

            function d() {
                return !1
            }

            function u() {
                try {
                    return X.activeElement
                } catch (e) {}
            }

            function p(e, t) {
                return J.nodeName(e, "table") && J.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }

            function m(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
            }

            function g(e) {
                var t = Oe.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"), e
            }

            function _(e, t) {
                for (var n = 0, r = e.length; r > n; n++) he.set(e[n], "globalEval", !t || he.get(t[n], "globalEval"))
            }

            function f(e, t) {
                var n, r, i, a, o, s, l, c;
                if (1 === t.nodeType) {
                    if (he.hasData(e) && (a = he.access(e), o = he.set(t, a), c = a.events)) {
                        delete o.handle, o.events = {};
                        for (i in c)
                            for (n = 0, r = c[i].length; r > n; n++) J.event.add(t, i, c[i][n])
                    }
                    be.hasData(e) && (s = be.access(e), l = J.extend({}, s), be.set(t, l))
                }
            }

            function h(e, t) {
                var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                return void 0 === t || t && J.nodeName(e, t) ? J.merge([e], n) : n
            }

            function b(e, t) {
                var n = t.nodeName.toLowerCase();
                "input" === n && xe.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }

            function I(t, n) {
                var r, i = J(n.createElement(t)).appendTo(n.body),
                    a = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : J.css(i[0], "display");
                return i.detach(), a
            }

            function v(e) {
                var t = X,
                    n = We[e];
                return n || (n = I(e, t), "none" !== n && n || (Be = (Be || J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Be[0].contentDocument, t.write(), t.close(), n = I(e, t), Be.detach()), We[e] = n), n
            }

            function C(e, t, n) {
                var r, i, a, o, s = e.style;
                return n = n || He(e), n && (o = n.getPropertyValue(t) || n[t]), n && ("" !== o || J.contains(e.ownerDocument, e) || (o = J.style(e, t)), qe.test(o) && Fe.test(t) && (r = s.width, i = s.minWidth, a = s.maxWidth, s.minWidth = s.maxWidth = s.width = o, o = n.width, s.width = r, s.minWidth = i, s.maxWidth = a)), void 0 !== o ? o + "" : o
            }

            function y(e, t) {
                return {
                    get: function() {
                        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                    }
                }
            }

            function S(e, t) {
                if (t in e) return t;
                for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Qe.length; i--;)
                    if (t = Qe[i] + n, t in e) return t;
                return r
            }

            function x(e, t, n) {
                var r = Ve.exec(t);
                return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
            }

            function E(e, t, n, r, i) {
                for (var a = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2) "margin" === n && (o += J.css(e, n + ye[a], !0, i)), r ? ("content" === n && (o -= J.css(e, "padding" + ye[a], !0, i)), "margin" !== n && (o -= J.css(e, "border" + ye[a] + "Width", !0, i))) : (o += J.css(e, "padding" + ye[a], !0, i), "padding" !== n && (o += J.css(e, "border" + ye[a] + "Width", !0, i)));
                return o
            }

            function T(e, t, n) {
                var r = !0,
                    i = "width" === t ? e.offsetWidth : e.offsetHeight,
                    a = He(e),
                    o = "border-box" === J.css(e, "boxSizing", !1, a);
                if (0 >= i || null == i) {
                    if (i = C(e, t, a), (0 > i || null == i) && (i = e.style[t]), qe.test(i)) return i;
                    r = o && (Z.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
                }
                return i + E(e, t, n || (o ? "border" : "content"), r, a) + "px"
            }

            function P(e, t) {
                for (var n, r, i, a = [], o = 0, s = e.length; s > o; o++) r = e[o], r.style && (a[o] = he.get(r, "olddisplay"), n = r.style.display, t ? (a[o] || "none" !== n || (r.style.display = ""), "" === r.style.display && Se(r) && (a[o] = he.access(r, "olddisplay", v(r.nodeName)))) : (i = Se(r), "none" === n && i || he.set(r, "olddisplay", i ? n : J.css(r, "display"))));
                for (o = 0; s > o; o++) r = e[o], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? a[o] || "" : "none"));
                return e
            }

            function G(e, t, n, r, i) {
                return new G.prototype.init(e, t, n, r, i)
            }

            function w() {
                return setTimeout(function() {
                    Ze = void 0
                }), Ze = J.now()
            }

            function A(e, t) {
                var n, r = 0,
                    i = { height: e };
                for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = ye[r], i["margin" + n] = i["padding" + n] = e;
                return t && (i.opacity = i.width = e), i
            }

            function D(e, t, n) {
                for (var r, i = (nt[t] || []).concat(nt["*"]), a = 0, o = i.length; o > a; a++)
                    if (r = i[a].call(n, t, e)) return r
            }

            function N(e, t, n) {
                var r, i, a, o, s, l, c, d, u = this,
                    p = {},
                    m = e.style,
                    g = e.nodeType && Se(e),
                    _ = he.get(e, "fxshow");
                n.queue || (s = J._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || l()
                }), s.unqueued++, u.always(function() {
                    u.always(function() {
                        s.unqueued--, J.queue(e, "fx").length || s.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [m.overflow, m.overflowX, m.overflowY], c = J.css(e, "display"), d = "none" === c ? he.get(e, "olddisplay") || v(e.nodeName) : c, "inline" === d && "none" === J.css(e, "float") && (m.display = "inline-block")), n.overflow && (m.overflow = "hidden", u.always(function() {
                    m.overflow = n.overflow[0], m.overflowX = n.overflow[1], m.overflowY = n.overflow[2]
                }));
                for (r in t)
                    if (i = t[r], Ye.exec(i)) {
                        if (delete t[r], a = a || "toggle" === i, i === (g ? "hide" : "show")) {
                            if ("show" !== i || !_ || void 0 === _[r]) continue;
                            g = !0
                        }
                        p[r] = _ && _[r] || J.style(e, r)
                    } else c = void 0;
                if (J.isEmptyObject(p)) "inline" === ("none" === c ? v(e.nodeName) : c) && (m.display = c);
                else {
                    _ ? "hidden" in _ && (g = _.hidden) : _ = he.access(e, "fxshow", {}), a && (_.hidden = !g), g ? J(e).show() : u.done(function() {
                        J(e).hide()
                    }), u.done(function() {
                        var t;
                        he.remove(e, "fxshow");
                        for (t in p) J.style(e, t, p[t])
                    });
                    for (r in p) o = D(g ? _[r] : 0, r, u), r in _ || (_[r] = o.start, g && (o.end = o.start, o.start = "width" === r || "height" === r ? 1 : 0))
                }
            }

            function M(e, t) {
                var n, r, i, a, o;
                for (n in e)
                    if (r = J.camelCase(n), i = t[r], a = e[n], J.isArray(a) && (i = a[1], a = e[n] = a[0]), n !== r && (e[r] = a, delete e[n]), o = J.cssHooks[r], o && "expand" in o) {
                        a = o.expand(a), delete e[r];
                        for (n in a) n in e || (e[n] = a[n], t[n] = i)
                    } else t[r] = i
            }

            function R(e, t, n) {
                var r, i, a = 0,
                    o = tt.length,
                    s = J.Deferred().always(function() {
                        delete l.elem
                    }),
                    l = function() {
                        if (i) return !1;
                        for (var t = Ze || w(), n = Math.max(0, c.startTime + c.duration - t), r = n / c.duration || 0, a = 1 - r, o = 0, l = c.tweens.length; l > o; o++) c.tweens[o].run(a);
                        return s.notifyWith(e, [c, a, n]), 1 > a && l ? n : (s.resolveWith(e, [c]), !1)
                    },
                    c = s.promise({
                        elem: e,
                        props: J.extend({}, t),
                        opts: J.extend(!0, { specialEasing: {} }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: Ze || w(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(t, n) {
                            var r = J.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                            return c.tweens.push(r), r
                        },
                        stop: function(t) {
                            var n = 0,
                                r = t ? c.tweens.length : 0;
                            if (i) return this;
                            for (i = !0; r > n; n++) c.tweens[n].run(1);
                            return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]), this
                        }
                    }),
                    d = c.props;
                for (M(d, c.opts.specialEasing); o > a; a++)
                    if (r = tt[a].call(c, e, d, c.opts)) return r;
                return J.map(d, D, c), J.isFunction(c.opts.start) && c.opts.start.call(e, c), J.fx.timer(J.extend(l, {
                    elem: e,
                    anim: c,
                    queue: c.opts.queue
                })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
            }

            function L(e) {
                return function(t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var r, i = 0,
                        a = t.toLowerCase().match(me) || [];
                    if (J.isFunction(n))
                        for (; r = a[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                }
            }

            function O(e, t, n, r) {
                function i(s) {
                    var l;
                    return a[s] = !0, J.each(e[s] || [], function(e, s) {
                        var c = s(t, n, r);
                        return "string" != typeof c || o || a[c] ? o ? !(l = c) : void 0 : (t.dataTypes.unshift(c), i(c), !1)
                    }), l
                }

                var a = {},
                    o = e === It;
                return i(t.dataTypes[0]) || !a["*"] && i("*")
            }

            function k(e, t) {
                var n, r, i = J.ajaxSettings.flatOptions || {};
                for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
                return r && J.extend(!0, e, r), e
            }

            function U(e, t, n) {
                for (var r, i, a, o, s = e.contents, l = e.dataTypes;
                    "*" === l[0];) l.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)
                    for (i in s)
                        if (s[i] && s[i].test(r)) {
                            l.unshift(i);
                            break
                        }
                if (l[0] in n) a = l[0];
                else {
                    for (i in n) {
                        if (!l[0] || e.converters[i + " " + l[0]]) {
                            a = i;
                            break
                        }
                        o || (o = i)
                    }
                    a = a || o
                }
                return a ? (a !== l[0] && l.unshift(a), n[a]) : void 0
            }

            function B(e, t, n, r) {
                var i, a, o, s, l, c = {},
                    d = e.dataTypes.slice();
                if (d[1])
                    for (o in e.converters) c[o.toLowerCase()] = e.converters[o];
                for (a = d.shift(); a;)
                    if (e.responseFields[a] && (n[e.responseFields[a]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = a, a = d.shift())
                        if ("*" === a) a = l;
                        else if ("*" !== l && l !== a) {
                    if (o = c[l + " " + a] || c["* " + a], !o)
                        for (i in c)
                            if (s = i.split(" "), s[1] === a && (o = c[l + " " + s[0]] || c["* " + s[0]])) {
                                o === !0 ? o = c[i] : c[i] !== !0 && (a = s[0], d.unshift(s[1]));
                                break
                            }
                    if (o !== !0)
                        if (o && e["throws"]) t = o(t);
                        else try {
                            t = o(t)
                        } catch (u) {
                            return { state: "parsererror", error: o ? u : "No conversion from " + l + " to " + a }
                        }
                }
                return { state: "success", data: t }
            }

            function W(e, t, n, r) {
                var i;
                if (J.isArray(t)) J.each(t, function(t, i) {
                    n || xt.test(e) ? r(e, i) : W(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
                });
                else if (n || "object" !== J.type(t)) r(e, t);
                else
                    for (i in t) W(e + "[" + i + "]", t[i], n, r)
            }

            function F(e) {
                return J.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
            }

            var q = [],
                H = q.slice,
                z = q.concat,
                V = q.push,
                $ = q.indexOf,
                j = {},
                K = j.toString,
                Q = j.hasOwnProperty,
                Z = {},
                X = e.document,
                Y = "2.1.4",
                J = function(e, t) {
                    return new J.fn.init(e, t)
                },
                ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                te = /^-ms-/,
                ne = /-([\da-z])/gi,
                re = function(e, t) {
                    return t.toUpperCase()
                };
            J.fn = J.prototype = {
                jquery: Y,
                constructor: J,
                selector: "",
                length: 0,
                toArray: function() {
                    return H.call(this)
                },
                get: function(e) {
                    return null != e ? 0 > e ? this[e + this.length] : this[e] : H.call(this)
                },
                pushStack: function(e) {
                    var t = J.merge(this.constructor(), e);
                    return t.prevObject = this, t.context = this.context, t
                },
                each: function(e, t) {
                    return J.each(this, e, t)
                },
                map: function(e) {
                    return this.pushStack(J.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return this.pushStack(H.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length,
                        n = +e + (0 > e ? t : 0);
                    return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: V,
                sort: q.sort,
                splice: q.splice
            }, J.extend = J.fn.extend = function() {
                var e, t, n, r, i, a, o = arguments[0] || {},
                    s = 1,
                    l = arguments.length,
                    c = !1;
                for ("boolean" == typeof o && (c = o, o = arguments[s] || {}, s++), "object" == typeof o || J.isFunction(o) || (o = {}), s === l && (o = this, s--); l > s; s++)
                    if (null != (e = arguments[s]))
                        for (t in e) n = o[t], r = e[t], o !== r && (c && r && (J.isPlainObject(r) || (i = J.isArray(r))) ? (i ? (i = !1, a = n && J.isArray(n) ? n : []) : a = n && J.isPlainObject(n) ? n : {}, o[t] = J.extend(c, a, r)) : void 0 !== r && (o[t] = r));
                return o
            }, J.extend({
                expando: "jQuery" + (Y + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isFunction: function(e) {
                    return "function" === J.type(e)
                },
                isArray: Array.isArray,
                isWindow: function(e) {
                    return null != e && e === e.window
                },
                isNumeric: function(e) {
                    return !J.isArray(e) && e - parseFloat(e) + 1 >= 0
                },
                isPlainObject: function(e) {
                    return "object" !== J.type(e) || e.nodeType || J.isWindow(e) ? !1 : e.constructor && !Q.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                },
                type: function(e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? j[K.call(e)] || "object" : typeof e
                },
                globalEval: function(e) {
                    var t, n = eval;
                    e = J.trim(e), e && (1 === e.indexOf("use strict") ? (t = X.createElement("script"), t.text = e, X.head.appendChild(t).parentNode.removeChild(t)) : n(e))
                },
                camelCase: function(e) {
                    return e.replace(te, "ms-").replace(ne, re)
                },
                nodeName: function(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function(e, t, r) {
                    var i, a = 0,
                        o = e.length,
                        s = n(e);
                    if (r) {
                        if (s)
                            for (; o > a && (i = t.apply(e[a], r), i !== !1); a++);
                        else
                            for (a in e)
                                if (i = t.apply(e[a], r), i === !1) break
                    } else if (s)
                        for (; o > a && (i = t.call(e[a], a, e[a]), i !== !1); a++);
                    else
                        for (a in e)
                            if (i = t.call(e[a], a, e[a]), i === !1) break;
                    return e
                },
                trim: function(e) {
                    return null == e ? "" : (e + "").replace(ee, "")
                },
                makeArray: function(e, t) {
                    var r = t || [];
                    return null != e && (n(Object(e)) ? J.merge(r, "string" == typeof e ? [e] : e) : V.call(r, e)), r
                },
                inArray: function(e, t, n) {
                    return null == t ? -1 : $.call(t, e, n)
                },
                merge: function(e, t) {
                    for (var n = +t.length, r = 0, i = e.length; n > r; r++) e[i++] = t[r];
                    return e.length = i, e
                },
                grep: function(e, t, n) {
                    for (var r, i = [], a = 0, o = e.length, s = !n; o > a; a++) r = !t(e[a], a), r !== s && i.push(e[a]);
                    return i
                },
                map: function(e, t, r) {
                    var i, a = 0,
                        o = e.length,
                        s = n(e),
                        l = [];
                    if (s)
                        for (; o > a; a++) i = t(e[a], a, r), null != i && l.push(i);
                    else
                        for (a in e) i = t(e[a], a, r), null != i && l.push(i);
                    return z.apply([], l)
                },
                guid: 1,
                proxy: function(e, t) {
                    var n, r, i;
                    return "string" == typeof t && (n = e[t], t = e, e = n), J.isFunction(e) ? (r = H.call(arguments, 2), i = function() {
                        return e.apply(t || this, r.concat(H.call(arguments)))
                    }, i.guid = e.guid = e.guid || J.guid++, i) : void 0
                },
                now: Date.now,
                support: Z
            }), J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
                j["[object " + t + "]"] = t.toLowerCase()
            });
            var ie = function(e) {
                function t(e, t, n, r) {
                    var i, a, o, s, l, c, u, m, g, _;
                    if ((t ? t.ownerDocument || t : W) !== N && D(t), t = t || N, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
                    if (!r && R) {
                        if (11 !== s && (i = be.exec(e)))
                            if (o = i[1]) {
                                if (9 === s) {
                                    if (a = t.getElementById(o), !a || !a.parentNode) return n;
                                    if (a.id === o) return n.push(a), n
                                } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(o)) && U(t, a) && a.id === o) return n.push(a), n
                            } else {
                                if (i[2]) return Y.apply(n, t.getElementsByTagName(e)), n;
                                if ((o = i[3]) && C.getElementsByClassName) return Y.apply(n, t.getElementsByClassName(o)), n
                            }
                        if (C.qsa && (!L || !L.test(e))) {
                            if (m = u = B, g = t, _ = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                                for (c = E(e), (u = t.getAttribute("id")) ? m = u.replace(ve, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", l = c.length; l--;) c[l] = m + p(c[l]);
                                g = Ie.test(e) && d(t.parentNode) || t, _ = c.join(",")
                            }
                            if (_) try {
                                return Y.apply(n, g.querySelectorAll(_)), n
                            } catch (f) {} finally {
                                u || t.removeAttribute("id")
                            }
                        }
                    }
                    return P(e.replace(le, "$1"), t, n, r)
                }

                function n() {
                    function e(n, r) {
                        return t.push(n + " ") > y.cacheLength && delete e[t.shift()], e[n + " "] = r
                    }

                    var t = [];
                    return e
                }

                function r(e) {
                    return e[B] = !0, e
                }

                function i(e) {
                    var t = N.createElement("div");
                    try {
                        return !!e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function a(e, t) {
                    for (var n = e.split("|"), r = e.length; r--;) y.attrHandle[n[r]] = t
                }

                function o(e, t) {
                    var n = t && e,
                        r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || j) - (~e.sourceIndex || j);
                    if (r) return r;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === t) return -1;
                    return e ? 1 : -1
                }

                function s(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function l(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function c(e) {
                    return r(function(t) {
                        return t = +t, r(function(n, r) {
                            for (var i, a = e([], n.length, t), o = a.length; o--;) n[i = a[o]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function d(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }

                function u() {}

                function p(e) {
                    for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
                    return r
                }

                function m(e, t, n) {
                    var r = t.dir,
                        i = n && "parentNode" === r,
                        a = q++;
                    return t.first ? function(t, n, a) {
                        for (; t = t[r];)
                            if (1 === t.nodeType || i) return e(t, n, a)
                    } : function(t, n, o) {
                        var s, l, c = [F, a];
                        if (o) {
                            for (; t = t[r];)
                                if ((1 === t.nodeType || i) && e(t, n, o)) return !0
                        } else
                            for (; t = t[r];)
                                if (1 === t.nodeType || i) {
                                    if (l = t[B] || (t[B] = {}), (s = l[r]) && s[0] === F && s[1] === a) return c[2] = s[2];
                                    if (l[r] = c, c[2] = e(t, n, o)) return !0
                                }
                    }
                }

                function g(e) {
                    return e.length > 1 ? function(t, n, r) {
                        for (var i = e.length; i--;)
                            if (!e[i](t, n, r)) return !1;
                        return !0
                    } : e[0]
                }

                function _(e, n, r) {
                    for (var i = 0, a = n.length; a > i; i++) t(e, n[i], r);
                    return r
                }

                function f(e, t, n, r, i) {
                    for (var a, o = [], s = 0, l = e.length, c = null != t; l > s; s++)(a = e[s]) && (!n || n(a, r, i)) && (o.push(a), c && t.push(s));
                    return o
                }

                function h(e, t, n, i, a, o) {
                    return i && !i[B] && (i = h(i)), a && !a[B] && (a = h(a, o)), r(function(r, o, s, l) {
                        var c, d, u, p = [],
                            m = [],
                            g = o.length,
                            h = r || _(t || "*", s.nodeType ? [s] : s, []),
                            b = !e || !r && t ? h : f(h, p, e, s, l),
                            I = n ? a || (r ? e : g || i) ? [] : o : b;
                        if (n && n(b, I, s, l), i)
                            for (c = f(I, m), i(c, [], s, l), d = c.length; d--;)(u = c[d]) && (I[m[d]] = !(b[m[d]] = u));
                        if (r) {
                            if (a || e) {
                                if (a) {
                                    for (c = [], d = I.length; d--;)(u = I[d]) && c.push(b[d] = u);
                                    a(null, I = [], c, l)
                                }
                                for (d = I.length; d--;)(u = I[d]) && (c = a ? ee(r, u) : p[d]) > -1 && (r[c] = !(o[c] = u))
                            }
                        } else I = f(I === o ? I.splice(g, I.length) : I), a ? a(null, o, I, l) : Y.apply(o, I)
                    })
                }

                function b(e) {
                    for (var t, n, r, i = e.length, a = y.relative[e[0].type], o = a || y.relative[" "], s = a ? 1 : 0, l = m(function(e) {
                            return e === t
                        }, o, !0), c = m(function(e) {
                            return ee(t, e) > -1
                        }, o, !0), d = [function(e, n, r) {
                            var i = !a && (r || n !== G) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r));
                            return t = null, i
                        }]; i > s; s++)
                        if (n = y.relative[e[s].type]) d = [m(g(d), n)];
                        else {
                            if (n = y.filter[e[s].type].apply(null, e[s].matches), n[B]) {
                                for (r = ++s; i > r && !y.relative[e[r].type]; r++);
                                return h(s > 1 && g(d), s > 1 && p(e.slice(0, s - 1).concat({ value: " " === e[s - 2].type ? "*" : "" })).replace(le, "$1"), n, r > s && b(e.slice(s, r)), i > r && b(e = e.slice(r)), i > r && p(e))
                            }
                            d.push(n)
                        }
                    return g(d)
                }

                function I(e, n) {
                    var i = n.length > 0,
                        a = e.length > 0,
                        o = function(r, o, s, l, c) {
                            var d, u, p, m = 0,
                                g = "0",
                                _ = r && [],
                                h = [],
                                b = G,
                                I = r || a && y.find.TAG("*", c),
                                v = F += null == b ? 1 : Math.random() || .1,
                                C = I.length;
                            for (c && (G = o !== N && o); g !== C && null != (d = I[g]); g++) {
                                if (a && d) {
                                    for (u = 0; p = e[u++];)
                                        if (p(d, o, s)) {
                                            l.push(d);
                                            break
                                        }
                                    c && (F = v)
                                }
                                i && ((d = !p && d) && m--, r && _.push(d))
                            }
                            if (m += g, i && g !== m) {
                                for (u = 0; p = n[u++];) p(_, h, o, s);
                                if (r) {
                                    if (m > 0)
                                        for (; g--;) _[g] || h[g] || (h[g] = Z.call(l));
                                    h = f(h)
                                }
                                Y.apply(l, h), c && !r && h.length > 0 && m + n.length > 1 && t.uniqueSort(l)
                            }
                            return c && (F = v, G = b), _
                        };
                    return i ? r(o) : o
                }

                var v, C, y, S, x, E, T, P, G, w, A, D, N, M, R, L, O, k, U, B = "sizzle" + 1 * new Date,
                    W = e.document,
                    F = 0,
                    q = 0,
                    H = n(),
                    z = n(),
                    V = n(),
                    $ = function(e, t) {
                        return e === t && (A = !0), 0
                    },
                    j = 1 << 31,
                    K = {}.hasOwnProperty,
                    Q = [],
                    Z = Q.pop,
                    X = Q.push,
                    Y = Q.push,
                    J = Q.slice,
                    ee = function(e, t) {
                        for (var n = 0, r = e.length; r > n; n++)
                            if (e[n] === t) return n;
                        return -1
                    },
                    te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ne = "[\\x20\\t\\r\\n\\f]",
                    re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    ie = re.replace("w", "w#"),
                    ae = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                    oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)",
                    se = new RegExp(ne + "+", "g"),
                    le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                    ce = new RegExp("^" + ne + "*," + ne + "*"),
                    de = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                    ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                    pe = new RegExp(oe),
                    me = new RegExp("^" + ie + "$"),
                    ge = {
                        ID: new RegExp("^#(" + re + ")"),
                        CLASS: new RegExp("^\\.(" + re + ")"),
                        TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + ae),
                        PSEUDO: new RegExp("^" + oe),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + te + ")$", "i"),
                        needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                    },
                    _e = /^(?:input|select|textarea|button)$/i,
                    fe = /^h\d$/i,
                    he = /^[^{]+\{\s*\[native \w/,
                    be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    Ie = /[+~]/,
                    ve = /'|\\/g,
                    Ce = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                    ye = function(e, t, n) {
                        var r = "0x" + t - 65536;
                        return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    },
                    Se = function() {
                        D()
                    };
                try {
                    Y.apply(Q = J.call(W.childNodes), W.childNodes), Q[W.childNodes.length].nodeType
                } catch (xe) {
                    Y = {
                        apply: Q.length ? function(e, t) {
                            X.apply(e, J.call(t))
                        } : function(e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++];);
                            e.length = n - 1
                        }
                    }
                }
                C = t.support = {}, x = t.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName : !1
                }, D = t.setDocument = function(e) {
                    var t, n, r = e ? e.ownerDocument || e : W;
                    return r !== N && 9 === r.nodeType && r.documentElement ? (N = r, M = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Se, !1) : n.attachEvent && n.attachEvent("onunload", Se)), R = !x(r), C.attributes = i(function(e) {
                            return e.className = "i", !e.getAttribute("className")
                        }), C.getElementsByTagName = i(function(e) {
                            return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
                        }), C.getElementsByClassName = he.test(r.getElementsByClassName), C.getById = i(function(e) {
                            return M.appendChild(e).id = B, !r.getElementsByName || !r.getElementsByName(B).length
                        }), C.getById ? (y.find.ID = function(e, t) {
                            if ("undefined" != typeof t.getElementById && R) {
                                var n = t.getElementById(e);
                                return n && n.parentNode ? [n] : []
                            }
                        }, y.filter.ID = function(e) {
                            var t = e.replace(Ce, ye);
                            return function(e) {
                                return e.getAttribute("id") === t
                            }
                        }) : (delete y.find.ID, y.filter.ID = function(e) {
                            var t = e.replace(Ce, ye);
                            return function(e) {
                                var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                return n && n.value === t
                            }
                        }), y.find.TAG = C.getElementsByTagName ? function(e, t) {
                            return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : C.qsa ? t.querySelectorAll(e) : void 0
                        } : function(e, t) {
                            var n, r = [],
                                i = 0,
                                a = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (; n = a[i++];) 1 === n.nodeType && r.push(n);
                                return r
                            }
                            return a
                        }, y.find.CLASS = C.getElementsByClassName && function(e, t) {
                            return R ? t.getElementsByClassName(e) : void 0
                        }, O = [], L = [], (C.qsa = he.test(r.querySelectorAll)) && (i(function(e) {
                            M.appendChild(e).innerHTML = "<a id='" + B + "'></a><select id='" + B + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || L.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + B + "-]").length || L.push("~="), e.querySelectorAll(":checked").length || L.push(":checked"), e.querySelectorAll("a#" + B + "+*").length || L.push(".#.+[+~]")
                        }), i(function(e) {
                            var t = r.createElement("input");
                            t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && L.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
                        })), (C.matchesSelector = he.test(k = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && i(function(e) {
                            C.disconnectedMatch = k.call(e, "div"), k.call(e, "[s!='']:x"), O.push("!=", oe)
                        }), L = L.length && new RegExp(L.join("|")),
                        O = O.length && new RegExp(O.join("|")), t = he.test(M.compareDocumentPosition), U = t || he.test(M.contains) ? function(e, t) {
                            var n = 9 === e.nodeType ? e.documentElement : e,
                                r = t && t.parentNode;
                            return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                        } : function(e, t) {
                            if (t)
                                for (; t = t.parentNode;)
                                    if (t === e) return !0;
                            return !1
                        }, $ = t ? function(e, t) {
                            if (e === t) return A = !0, 0;
                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !C.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === W && U(W, e) ? -1 : t === r || t.ownerDocument === W && U(W, t) ? 1 : w ? ee(w, e) - ee(w, t) : 0 : 4 & n ? -1 : 1)
                        } : function(e, t) {
                            if (e === t) return A = !0, 0;
                            var n, i = 0,
                                a = e.parentNode,
                                s = t.parentNode,
                                l = [e],
                                c = [t];
                            if (!a || !s) return e === r ? -1 : t === r ? 1 : a ? -1 : s ? 1 : w ? ee(w, e) - ee(w, t) : 0;
                            if (a === s) return o(e, t);
                            for (n = e; n = n.parentNode;) l.unshift(n);
                            for (n = t; n = n.parentNode;) c.unshift(n);
                            for (; l[i] === c[i];) i++;
                            return i ? o(l[i], c[i]) : l[i] === W ? -1 : c[i] === W ? 1 : 0
                        }, r) : N
                }, t.matches = function(e, n) {
                    return t(e, null, null, n)
                }, t.matchesSelector = function(e, n) {
                    if ((e.ownerDocument || e) !== N && D(e), n = n.replace(ue, "='$1']"), C.matchesSelector && R && (!O || !O.test(n)) && (!L || !L.test(n))) try {
                        var r = k.call(e, n);
                        if (r || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                    } catch (i) {}
                    return t(n, N, null, [e]).length > 0
                }, t.contains = function(e, t) {
                    return (e.ownerDocument || e) !== N && D(e), U(e, t)
                }, t.attr = function(e, t) {
                    (e.ownerDocument || e) !== N && D(e);
                    var n = y.attrHandle[t.toLowerCase()],
                        r = n && K.call(y.attrHandle, t.toLowerCase()) ? n(e, t, !R) : void 0;
                    return void 0 !== r ? r : C.attributes || !R ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }, t.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, t.uniqueSort = function(e) {
                    var t, n = [],
                        r = 0,
                        i = 0;
                    if (A = !C.detectDuplicates, w = !C.sortStable && e.slice(0), e.sort($), A) {
                        for (; t = e[i++];) t === e[i] && (r = n.push(i));
                        for (; r--;) e.splice(n[r], 1)
                    }
                    return w = null, e
                }, S = t.getText = function(e) {
                    var t, n = "",
                        r = 0,
                        i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += S(e)
                        } else if (3 === i || 4 === i) return e.nodeValue
                    } else
                        for (; t = e[r++];) n += S(t);
                    return n
                }, y = t.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: ge,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": { dir: "parentNode", first: !0 },
                        " ": { dir: "parentNode" },
                        "+": { dir: "previousSibling", first: !0 },
                        "~": { dir: "previousSibling" }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(Ce, ye), e[3] = (e[3] || e[4] || e[5] || "").replace(Ce, ye), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return ge.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(Ce, ye).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = H[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && H(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, n, r) {
                            return function(i) {
                                var a = t.attr(i, e);
                                return null == a ? "!=" === n : n ? (a += "", "=" === n ? a === r : "!=" === n ? a !== r : "^=" === n ? r && 0 === a.indexOf(r) : "*=" === n ? r && a.indexOf(r) > -1 : "$=" === n ? r && a.slice(-r.length) === r : "~=" === n ? (" " + a.replace(se, " ") + " ").indexOf(r) > -1 : "|=" === n ? a === r || a.slice(0, r.length + 1) === r + "-" : !1) : !0
                            }
                        },
                        CHILD: function(e, t, n, r, i) {
                            var a = "nth" !== e.slice(0, 3),
                                o = "last" !== e.slice(-4),
                                s = "of-type" === t;
                            return 1 === r && 0 === i ? function(e) {
                                return !!e.parentNode
                            } : function(t, n, l) {
                                var c, d, u, p, m, g, _ = a !== o ? "nextSibling" : "previousSibling",
                                    f = t.parentNode,
                                    h = s && t.nodeName.toLowerCase(),
                                    b = !l && !s;
                                if (f) {
                                    if (a) {
                                        for (; _;) {
                                            for (u = t; u = u[_];)
                                                if (s ? u.nodeName.toLowerCase() === h : 1 === u.nodeType) return !1;
                                            g = _ = "only" === e && !g && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (g = [o ? f.firstChild : f.lastChild], o && b) {
                                        for (d = f[B] || (f[B] = {}), c = d[e] || [], m = c[0] === F && c[1], p = c[0] === F && c[2], u = m && f.childNodes[m]; u = ++m && u && u[_] || (p = m = 0) || g.pop();)
                                            if (1 === u.nodeType && ++p && u === t) {
                                                d[e] = [F, m, p];
                                                break
                                            }
                                    } else if (b && (c = (t[B] || (t[B] = {}))[e]) && c[0] === F) p = c[1];
                                    else
                                        for (;
                                            (u = ++m && u && u[_] || (p = m = 0) || g.pop()) && ((s ? u.nodeName.toLowerCase() !== h : 1 !== u.nodeType) || !++p || (b && ((u[B] || (u[B] = {}))[e] = [F, p]), u !== t)););
                                    return p -= i, p === r || p % r === 0 && p / r >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, n) {
                            var i,
                                a = y.pseudos[e] || y.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return a[B] ? a(n) : a.length > 1 ? (i = [e, e, "", n], y.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                                for (var r, i = a(e, n), o = i.length; o--;) r = ee(e, i[o]), e[r] = !(t[r] = i[o])
                            }) : function(e) {
                                return a(e, 0, i)
                            }) : a
                        }
                    },
                    pseudos: {
                        not: r(function(e) {
                            var t = [],
                                n = [],
                                i = T(e.replace(le, "$1"));
                            return i[B] ? r(function(e, t, n, r) {
                                for (var a, o = i(e, null, r, []), s = e.length; s--;)(a = o[s]) && (e[s] = !(t[s] = a))
                            }) : function(e, r, a) {
                                return t[0] = e, i(t, null, a, n), t[0] = null, !n.pop()
                            }
                        }),
                        has: r(function(e) {
                            return function(n) {
                                return t(e, n).length > 0
                            }
                        }),
                        contains: r(function(e) {
                            return e = e.replace(Ce, ye),
                                function(t) {
                                    return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
                                }
                        }),
                        lang: r(function(e) {
                            return me.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(Ce, ye).toLowerCase(),
                                function(t) {
                                    var n;
                                    do
                                        if (n = R ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                    while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === M
                        },
                        focus: function(e) {
                            return e === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !y.pseudos.empty(e)
                        },
                        header: function(e) {
                            return fe.test(e.nodeName)
                        },
                        input: function(e) {
                            return _e.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: c(function() {
                            return [0]
                        }),
                        last: c(function(e, t) {
                            return [t - 1]
                        }),
                        eq: c(function(e, t, n) {
                            return [0 > n ? n + t : n]
                        }),
                        even: c(function(e, t) {
                            for (var n = 0; t > n; n += 2) e.push(n);
                            return e
                        }),
                        odd: c(function(e, t) {
                            for (var n = 1; t > n; n += 2) e.push(n);
                            return e
                        }),
                        lt: c(function(e, t, n) {
                            for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                            return e
                        }),
                        gt: c(function(e, t, n) {
                            for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                            return e
                        })
                    }
                }, y.pseudos.nth = y.pseudos.eq;
                for (v in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) y.pseudos[v] = s(v);
                for (v in { submit: !0, reset: !0 }) y.pseudos[v] = l(v);
                return u.prototype = y.filters = y.pseudos, y.setFilters = new u, E = t.tokenize = function(e, n) {
                    var r, i, a, o, s, l, c, d = z[e + " "];
                    if (d) return n ? 0 : d.slice(0);
                    for (s = e, l = [], c = y.preFilter; s;) {
                        (!r || (i = ce.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(a = [])), r = !1, (i = de.exec(s)) && (r = i.shift(), a.push({
                            value: r,
                            type: i[0].replace(le, " ")
                        }), s = s.slice(r.length));
                        for (o in y.filter) !(i = ge[o].exec(s)) || c[o] && !(i = c[o](i)) || (r = i.shift(), a.push({
                            value: r,
                            type: o,
                            matches: i
                        }), s = s.slice(r.length));
                        if (!r) break
                    }
                    return n ? s.length : s ? t.error(e) : z(e, l).slice(0)
                }, T = t.compile = function(e, t) {
                    var n, r = [],
                        i = [],
                        a = V[e + " "];
                    if (!a) {
                        for (t || (t = E(e)), n = t.length; n--;) a = b(t[n]), a[B] ? r.push(a) : i.push(a);
                        a = V(e, I(i, r)), a.selector = e
                    }
                    return a
                }, P = t.select = function(e, t, n, r) {
                    var i, a, o, s, l, c = "function" == typeof e && e,
                        u = !r && E(e = c.selector || e);
                    if (n = n || [], 1 === u.length) {
                        if (a = u[0] = u[0].slice(0), a.length > 2 && "ID" === (o = a[0]).type && C.getById && 9 === t.nodeType && R && y.relative[a[1].type]) {
                            if (t = (y.find.ID(o.matches[0].replace(Ce, ye), t) || [])[0], !t) return n;
                            c && (t = t.parentNode), e = e.slice(a.shift().value.length)
                        }
                        for (i = ge.needsContext.test(e) ? 0 : a.length; i-- && (o = a[i], !y.relative[s = o.type]);)
                            if ((l = y.find[s]) && (r = l(o.matches[0].replace(Ce, ye), Ie.test(a[0].type) && d(t.parentNode) || t))) {
                                if (a.splice(i, 1), e = r.length && p(a), !e) return Y.apply(n, r), n;
                                break
                            }
                    }
                    return (c || T(e, u))(r, t, !R, n, Ie.test(e) && d(t.parentNode) || t), n
                }, C.sortStable = B.split("").sort($).join("") === B, C.detectDuplicates = !!A, D(), C.sortDetached = i(function(e) {
                    return 1 & e.compareDocumentPosition(N.createElement("div"))
                }), i(function(e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || a("type|href|height|width", function(e, t, n) {
                    return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), C.attributes && i(function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || a("value", function(e, t, n) {
                    return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                }), i(function(e) {
                    return null == e.getAttribute("disabled")
                }) || a(te, function(e, t, n) {
                    var r;
                    return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }), t
            }(e);
            J.find = ie, J.expr = ie.selectors, J.expr[":"] = J.expr.pseudos, J.unique = ie.uniqueSort, J.text = ie.getText, J.isXMLDoc = ie.isXML, J.contains = ie.contains;
            var ae = J.expr.match.needsContext,
                oe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                se = /^.[^:#\[\.,]*$/;
            J.filter = function(e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? J.find.matchesSelector(r, e) ? [r] : [] : J.find.matches(e, J.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
            }, J.fn.extend({
                find: function(e) {
                    var t, n = this.length,
                        r = [],
                        i = this;
                    if ("string" != typeof e) return this.pushStack(J(e).filter(function() {
                        for (t = 0; n > t; t++)
                            if (J.contains(i[t], this)) return !0
                    }));
                    for (t = 0; n > t; t++) J.find(e, i[t], r);
                    return r = this.pushStack(n > 1 ? J.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
                },
                filter: function(e) {
                    return this.pushStack(r(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(r(this, e || [], !0))
                },
                is: function(e) {
                    return !!r(this, "string" == typeof e && ae.test(e) ? J(e) : e || [], !1).length
                }
            });
            var le, ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                de = J.fn.init = function(e, t) {
                    var n, r;
                    if (!e) return this;
                    if ("string" == typeof e) {
                        if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ce.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || le).find(e) : this.constructor(t).find(e);
                        if (n[1]) {
                            if (t = t instanceof J ? t[0] : t, J.merge(this, J.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : X, !0)), oe.test(n[1]) && J.isPlainObject(t))
                                for (n in t) J.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                            return this
                        }
                        return r = X.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = X, this.selector = e, this
                    }
                    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : J.isFunction(e) ? "undefined" != typeof le.ready ? le.ready(e) : e(J) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), J.makeArray(e, this))
                };
            de.prototype = J.fn, le = J(X);
            var ue = /^(?:parents|prev(?:Until|All))/,
                pe = { children: !0, contents: !0, next: !0, prev: !0 };
            J.extend({
                dir: function(e, t, n) {
                    for (var r = [], i = void 0 !== n;
                        (e = e[t]) && 9 !== e.nodeType;)
                        if (1 === e.nodeType) {
                            if (i && J(e).is(n)) break;
                            r.push(e)
                        }
                    return r
                },
                sibling: function(e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n
                }
            }), J.fn.extend({
                has: function(e) {
                    var t = J(e, this),
                        n = t.length;
                    return this.filter(function() {
                        for (var e = 0; n > e; e++)
                            if (J.contains(this, t[e])) return !0
                    })
                },
                closest: function(e, t) {
                    for (var n, r = 0, i = this.length, a = [], o = ae.test(e) || "string" != typeof e ? J(e, t || this.context) : 0; i > r; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && J.find.matchesSelector(n, e))) {
                                a.push(n);
                                break
                            }
                    return this.pushStack(a.length > 1 ? J.unique(a) : a)
                },
                index: function(e) {
                    return e ? "string" == typeof e ? $.call(J(e), this[0]) : $.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, t) {
                    return this.pushStack(J.unique(J.merge(this.get(), J(e, t))))
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }
            }), J.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                },
                parents: function(e) {
                    return J.dir(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return J.dir(e, "parentNode", n)
                },
                next: function(e) {
                    return i(e, "nextSibling")
                },
                prev: function(e) {
                    return i(e, "previousSibling")
                },
                nextAll: function(e) {
                    return J.dir(e, "nextSibling")
                },
                prevAll: function(e) {
                    return J.dir(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return J.dir(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return J.dir(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return J.sibling((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return J.sibling(e.firstChild)
                },
                contents: function(e) {
                    return e.contentDocument || J.merge([], e.childNodes)
                }
            }, function(e, t) {
                J.fn[e] = function(n, r) {
                    var i = J.map(this, t, n);
                    return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = J.filter(r, i)), this.length > 1 && (pe[e] || J.unique(i), ue.test(e) && i.reverse()), this.pushStack(i)
                }
            });
            var me = /\S+/g,
                ge = {};
            J.Callbacks = function(e) {
                e = "string" == typeof e ? ge[e] || a(e) : J.extend({}, e);
                var t, n, r, i, o, s, l = [],
                    c = !e.once && [],
                    d = function(a) {
                        for (t = e.memory && a, n = !0, s = i || 0, i = 0, o = l.length, r = !0; l && o > s; s++)
                            if (l[s].apply(a[0], a[1]) === !1 && e.stopOnFalse) {
                                t = !1;
                                break
                            }
                        r = !1, l && (c ? c.length && d(c.shift()) : t ? l = [] : u.disable())
                    },
                    u = {
                        add: function() {
                            if (l) {
                                var n = l.length;
                                ! function a(t) {
                                    J.each(t, function(t, n) {
                                        var r = J.type(n);
                                        "function" === r ? e.unique && u.has(n) || l.push(n) : n && n.length && "string" !== r && a(n)
                                    })
                                }(arguments), r ? o = l.length : t && (i = n, d(t))
                            }
                            return this
                        },
                        remove: function() {
                            return l && J.each(arguments, function(e, t) {
                                for (var n;
                                    (n = J.inArray(t, l, n)) > -1;) l.splice(n, 1), r && (o >= n && o--, s >= n && s--)
                            }), this
                        },
                        has: function(e) {
                            return e ? J.inArray(e, l) > -1 : !(!l || !l.length)
                        },
                        empty: function() {
                            return l = [], o = 0, this
                        },
                        disable: function() {
                            return l = c = t = void 0, this
                        },
                        disabled: function() {
                            return !l
                        },
                        lock: function() {
                            return c = void 0, t || u.disable(), this
                        },
                        locked: function() {
                            return !c
                        },
                        fireWith: function(e, t) {
                            return !l || n && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? c.push(t) : d(t)), this
                        },
                        fire: function() {
                            return u.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!n
                        }
                    };
                return u
            }, J.extend({
                Deferred: function(e) {
                    var t = [
                            ["resolve", "done", J.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", J.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", J.Callbacks("memory")]
                        ],
                        n = "pending",
                        r = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return i.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var e = arguments;
                                return J.Deferred(function(n) {
                                    J.each(t, function(t, a) {
                                        var o = J.isFunction(e[t]) && e[t];
                                        i[a[1]](function() {
                                            var e = o && o.apply(this, arguments);
                                            e && J.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                        })
                                    }), e = null
                                }).promise()
                            },
                            promise: function(e) {
                                return null != e ? J.extend(e, r) : r
                            }
                        },
                        i = {};
                    return r.pipe = r.then, J.each(t, function(e, a) {
                        var o = a[2],
                            s = a[3];
                        r[a[1]] = o.add, s && o.add(function() {
                            n = s
                        }, t[1 ^ e][2].disable, t[2][2].lock), i[a[0]] = function() {
                            return i[a[0] + "With"](this === i ? r : this, arguments), this
                        }, i[a[0] + "With"] = o.fireWith
                    }), r.promise(i), e && e.call(i, i), i
                },
                when: function(e) {
                    var t, n, r, i = 0,
                        a = H.call(arguments),
                        o = a.length,
                        s = 1 !== o || e && J.isFunction(e.promise) ? o : 0,
                        l = 1 === s ? e : J.Deferred(),
                        c = function(e, n, r) {
                            return function(i) {
                                n[e] = this, r[e] = arguments.length > 1 ? H.call(arguments) : i, r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                            }
                        };
                    if (o > 1)
                        for (t = new Array(o), n = new Array(o), r = new Array(o); o > i; i++) a[i] && J.isFunction(a[i].promise) ? a[i].promise().done(c(i, r, a)).fail(l.reject).progress(c(i, n, t)) : --s;
                    return s || l.resolveWith(r, a), l.promise()
                }
            });
            var _e;
            J.fn.ready = function(e) {
                return J.ready.promise().done(e), this
            }, J.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? J.readyWait++ : J.ready(!0)
                },
                ready: function(e) {
                    (e === !0 ? --J.readyWait : J.isReady) || (J.isReady = !0, e !== !0 && --J.readyWait > 0 || (_e.resolveWith(X, [J]), J.fn.triggerHandler && (J(X).triggerHandler("ready"), J(X).off("ready"))))
                }
            }), J.ready.promise = function(t) {
                return _e || (_e = J.Deferred(), "complete" === X.readyState ? setTimeout(J.ready) : (X.addEventListener("DOMContentLoaded", o, !1), e.addEventListener("load", o, !1))), _e.promise(t)
            }, J.ready.promise();
            var fe = J.access = function(e, t, n, r, i, a, o) {
                var s = 0,
                    l = e.length,
                    c = null == n;
                if ("object" === J.type(n)) {
                    i = !0;
                    for (s in n) J.access(e, t, s, n[s], !0, a, o)
                } else if (void 0 !== r && (i = !0, J.isFunction(r) || (o = !0), c && (o ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) {
                        return c.call(J(e), n)
                    })), t))
                    for (; l > s; s++) t(e[s], n, o ? r : r.call(e[s], s, t(e[s], n)));
                return i ? e : c ? t.call(e) : l ? t(e[0], n) : a
            };
            J.acceptData = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            }, s.uid = 1, s.accepts = J.acceptData, s.prototype = {
                key: function(e) {
                    if (!s.accepts(e)) return 0;
                    var t = {},
                        n = e[this.expando];
                    if (!n) {
                        n = s.uid++;
                        try {
                            t[this.expando] = { value: n }, Object.defineProperties(e, t)
                        } catch (r) {
                            t[this.expando] = n, J.extend(e, t)
                        }
                    }
                    return this.cache[n] || (this.cache[n] = {}), n
                },
                set: function(e, t, n) {
                    var r, i = this.key(e),
                        a = this.cache[i];
                    if ("string" == typeof t) a[t] = n;
                    else if (J.isEmptyObject(a)) J.extend(this.cache[i], t);
                    else
                        for (r in t) a[r] = t[r];
                    return a
                },
                get: function(e, t) {
                    var n = this.cache[this.key(e)];
                    return void 0 === t ? n : n[t]
                },
                access: function(e, t, n) {
                    var r;
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, J.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
                },
                remove: function(e, t) {
                    var n, r, i, a = this.key(e),
                        o = this.cache[a];
                    if (void 0 === t) this.cache[a] = {};
                    else {
                        J.isArray(t) ? r = t.concat(t.map(J.camelCase)) : (i = J.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(me) || [])), n = r.length;
                        for (; n--;) delete o[r[n]]
                    }
                },
                hasData: function(e) {
                    return !J.isEmptyObject(this.cache[e[this.expando]] || {})
                },
                discard: function(e) {
                    e[this.expando] && delete this.cache[e[this.expando]]
                }
            };
            var he = new s,
                be = new s,
                Ie = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                ve = /([A-Z])/g;
            J.extend({
                hasData: function(e) {
                    return be.hasData(e) || he.hasData(e)
                },
                data: function(e, t, n) {
                    return be.access(e, t, n)
                },
                removeData: function(e, t) {
                    be.remove(e, t)
                },
                _data: function(e, t, n) {
                    return he.access(e, t, n)
                },
                _removeData: function(e, t) {
                    he.remove(e, t)
                }
            }), J.fn.extend({
                data: function(e, t) {
                    var n, r, i, a = this[0],
                        o = a && a.attributes;
                    if (void 0 === e) {
                        if (this.length && (i = be.get(a), 1 === a.nodeType && !he.get(a, "hasDataAttrs"))) {
                            for (n = o.length; n--;) o[n] && (r = o[n].name, 0 === r.indexOf("data-") && (r = J.camelCase(r.slice(5)), l(a, r, i[r])));
                            he.set(a, "hasDataAttrs", !0)
                        }
                        return i
                    }
                    return "object" == typeof e ? this.each(function() {
                        be.set(this, e)
                    }) : fe(this, function(t) {
                        var n, r = J.camelCase(e);
                        if (a && void 0 === t) {
                            if (n = be.get(a, e), void 0 !== n) return n;
                            if (n = be.get(a, r), void 0 !== n) return n;
                            if (n = l(a, r, void 0), void 0 !== n) return n
                        } else this.each(function() {
                            var n = be.get(this, r);
                            be.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && be.set(this, e, t)
                        })
                    }, null, t, arguments.length > 1, null, !0)
                },
                removeData: function(e) {
                    return this.each(function() {
                        be.remove(this, e)
                    })
                }
            }), J.extend({
                queue: function(e, t, n) {
                    var r;
                    return e ? (t = (t || "fx") + "queue", r = he.get(e, t), n && (!r || J.isArray(n) ? r = he.access(e, t, J.makeArray(n)) : r.push(n)), r || []) : void 0
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = J.queue(e, t),
                        r = n.length,
                        i = n.shift(),
                        a = J._queueHooks(e, t),
                        o = function() {
                            J.dequeue(e, t)
                        };
                    "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete a.stop, i.call(e, o, a)), !r && a && a.empty.fire()
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return he.get(e, n) || he.access(e, n, {
                        empty: J.Callbacks("once memory").add(function() {
                            he.remove(e, [t + "queue", n])
                        })
                    })
                }
            }), J.fn.extend({
                queue: function(e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? J.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                        var n = J.queue(this, e, t);
                        J._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && J.dequeue(this, e)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        J.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, t) {
                    var n, r = 1,
                        i = J.Deferred(),
                        a = this,
                        o = this.length,
                        s = function() {
                            --r || i.resolveWith(a, [a])
                        };
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;) n = he.get(a[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
                    return s(), i.promise(t)
                }
            });
            var Ce = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                ye = ["Top", "Right", "Bottom", "Left"],
                Se = function(e, t) {
                    return e = t || e, "none" === J.css(e, "display") || !J.contains(e.ownerDocument, e)
                },
                xe = /^(?:checkbox|radio)$/i;
            ! function() {
                var e = X.createDocumentFragment(),
                    t = e.appendChild(X.createElement("div")),
                    n = X.createElement("input");
                n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), Z.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Z.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
            }();
            var Ee = "undefined";
            Z.focusinBubbles = "onfocusin" in e;
            var Te = /^key/,
                Pe = /^(?:mouse|pointer|contextmenu)|click/,
                Ge = /^(?:focusinfocus|focusoutblur)$/,
                we = /^([^.]*)(?:\.(.+)|)$/;
            J.event = {
                global: {},
                add: function(e, t, n, r, i) {
                    var a, o, s, l, c, d, u, p, m, g, _, f = he.get(e);
                    if (f)
                        for (n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = J.guid++), (l = f.events) || (l = f.events = {}), (o = f.handle) || (o = f.handle = function(t) {
                                return typeof J !== Ee && J.event.triggered !== t.type ? J.event.dispatch.apply(e, arguments) : void 0
                            }), t = (t || "").match(me) || [""], c = t.length; c--;) s = we.exec(t[c]) || [], m = _ = s[1], g = (s[2] || "").split(".").sort(), m && (u = J.event.special[m] || {}, m = (i ? u.delegateType : u.bindType) || m, u = J.event.special[m] || {}, d = J.extend({
                            type: m,
                            origType: _,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && J.expr.match.needsContext.test(i),
                            namespace: g.join(".")
                        }, a), (p = l[m]) || (p = l[m] = [], p.delegateCount = 0, u.setup && u.setup.call(e, r, g, o) !== !1 || e.addEventListener && e.addEventListener(m, o, !1)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, d) : p.push(d), J.event.global[m] = !0)
                },
                remove: function(e, t, n, r, i) {
                    var a, o, s, l, c, d, u, p, m, g, _, f = he.hasData(e) && he.get(e);
                    if (f && (l = f.events)) {
                        for (t = (t || "").match(me) || [""], c = t.length; c--;)
                            if (s = we.exec(t[c]) || [], m = _ = s[1], g = (s[2] || "").split(".").sort(), m) {
                                for (u = J.event.special[m] || {}, m = (r ? u.delegateType : u.bindType) || m, p = l[m] || [], s = s[2] && new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = a = p.length; a--;) d = p[a], !i && _ !== d.origType || n && n.guid !== d.guid || s && !s.test(d.namespace) || r && r !== d.selector && ("**" !== r || !d.selector) || (p.splice(a, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                                o && !p.length && (u.teardown && u.teardown.call(e, g, f.handle) !== !1 || J.removeEvent(e, m, f.handle), delete l[m])
                            } else
                                for (m in l) J.event.remove(e, m + t[c], n, r, !0);
                        J.isEmptyObject(l) && (delete f.handle, he.remove(e, "events"))
                    }
                },
                trigger: function(t, n, r, i) {
                    var a, o, s, l, c, d, u, p = [r || X],
                        m = Q.call(t, "type") ? t.type : t,
                        g = Q.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (o = s = r = r || X, 3 !== r.nodeType && 8 !== r.nodeType && !Ge.test(m + J.event.triggered) && (m.indexOf(".") >= 0 && (g = m.split("."), m = g.shift(), g.sort()), c = m.indexOf(":") < 0 && "on" + m, t = t[J.expando] ? t : new J.Event(m, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : J.makeArray(n, [t]), u = J.event.special[m] || {}, i || !u.trigger || u.trigger.apply(r, n) !== !1)) {
                        if (!i && !u.noBubble && !J.isWindow(r)) {
                            for (l = u.delegateType || m, Ge.test(l + m) || (o = o.parentNode); o; o = o.parentNode) p.push(o), s = o;
                            s === (r.ownerDocument || X) && p.push(s.defaultView || s.parentWindow || e)
                        }
                        for (a = 0;
                            (o = p[a++]) && !t.isPropagationStopped();) t.type = a > 1 ? l : u.bindType || m, d = (he.get(o, "events") || {})[t.type] && he.get(o, "handle"), d && d.apply(o, n), d = c && o[c], d && d.apply && J.acceptData(o) && (t.result = d.apply(o, n), t.result === !1 && t.preventDefault());
                        return t.type = m, i || t.isDefaultPrevented() || u._default && u._default.apply(p.pop(), n) !== !1 || !J.acceptData(r) || c && J.isFunction(r[m]) && !J.isWindow(r) && (s = r[c], s && (r[c] = null), J.event.triggered = m, r[m](), J.event.triggered = void 0, s && (r[c] = s)), t.result
                    }
                },
                dispatch: function(e) {
                    e = J.event.fix(e);
                    var t, n, r, i, a, o = [],
                        s = H.call(arguments),
                        l = (he.get(this, "events") || {})[e.type] || [],
                        c = J.event.special[e.type] || {};
                    if (s[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                        for (o = J.event.handlers.call(this, e, l), t = 0;
                            (i = o[t++]) && !e.isPropagationStopped();)
                            for (e.currentTarget = i.elem, n = 0;
                                (a = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, e.data = a.data, r = ((J.event.special[a.origType] || {}).handle || a.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                        return c.postDispatch && c.postDispatch.call(this, e), e.result
                    }
                },
                handlers: function(e, t) {
                    var n, r, i, a, o = [],
                        s = t.delegateCount,
                        l = e.target;
                    if (s && l.nodeType && (!e.button || "click" !== e.type))
                        for (; l !== this; l = l.parentNode || this)
                            if (l.disabled !== !0 || "click" !== e.type) {
                                for (r = [], n = 0; s > n; n++) a = t[n], i = a.selector + " ", void 0 === r[i] && (r[i] = a.needsContext ? J(i, this).index(l) >= 0 : J.find(i, this, null, [l]).length), r[i] && r.push(a);
                                r.length && o.push({ elem: l, handlers: r })
                            }
                    return s < t.length && o.push({ elem: this, handlers: t.slice(s) }), o
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, t) {
                        var n, r, i, a = t.button;
                        return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || X, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
                    }
                },
                fix: function(e) {
                    if (e[J.expando]) return e;
                    var t, n, r, i = e.type,
                        a = e,
                        o = this.fixHooks[i];
                    for (o || (this.fixHooks[i] = o = Pe.test(i) ? this.mouseHooks : Te.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new J.Event(a), t = r.length; t--;) n = r[t], e[n] = a[n];
                    return e.target || (e.target = X), 3 === e.target.nodeType && (e.target = e.target.parentNode), o.filter ? o.filter(e, a) : e
                },
                special: {
                    load: { noBubble: !0 },
                    focus: {
                        trigger: function() {
                            return this !== u() && this.focus ? (this.focus(), !1) : void 0
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === u() && this.blur ? (this.blur(), !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return "checkbox" === this.type && this.click && J.nodeName(this, "input") ? (this.click(), !1) : void 0
                        },
                        _default: function(e) {
                            return J.nodeName(e.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                },
                simulate: function(e, t, n, r) {
                    var i = J.extend(new J.Event, n, { type: e, isSimulated: !0, originalEvent: {} });
                    r ? J.event.trigger(i, null, t) : J.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
                }
            }, J.removeEvent = function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n, !1)
            }, J.Event = function(e, t) {
                return this instanceof J.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? c : d) : this.type = e, t && J.extend(this, t), this.timeStamp = e && e.timeStamp || J.now(), void(this[J.expando] = !0)) : new J.Event(e, t)
            }, J.Event.prototype = {
                isDefaultPrevented: d,
                isPropagationStopped: d,
                isImmediatePropagationStopped: d,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = c, e && e.preventDefault && e.preventDefault()
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = c, e && e.stopPropagation && e.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = c, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, J.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, t) {
                J.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, r = this,
                            i = e.relatedTarget,
                            a = e.handleObj;
                        return (!i || i !== r && !J.contains(r, i)) && (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t), n
                    }
                }
            }), Z.focusinBubbles || J.each({ focus: "focusin", blur: "focusout" }, function(e, t) {
                var n = function(e) {
                    J.event.simulate(t, e.target, J.event.fix(e), !0)
                };
                J.event.special[t] = {
                    setup: function() {
                        var r = this.ownerDocument || this,
                            i = he.access(r, t);
                        i || r.addEventListener(e, n, !0), he.access(r, t, (i || 0) + 1)
                    },
                    teardown: function() {
                        var r = this.ownerDocument || this,
                            i = he.access(r, t) - 1;
                        i ? he.access(r, t, i) : (r.removeEventListener(e, n, !0), he.remove(r, t))
                    }
                }
            }), J.fn.extend({
                on: function(e, t, n, r, i) {
                    var a, o;
                    if ("object" == typeof e) {
                        "string" != typeof t && (n = n || t, t = void 0);
                        for (o in e) this.on(o, t, n, e[o], i);
                        return this
                    }
                    if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = d;
                    else if (!r) return this;
                    return 1 === i && (a = r, r = function(e) {
                        return J().off(e), a.apply(this, arguments)
                    }, r.guid = a.guid || (a.guid = J.guid++)), this.each(function() {
                        J.event.add(this, e, r, n, t)
                    })
                },
                one: function(e, t, n, r) {
                    return this.on(e, t, n, r, 1)
                },
                off: function(e, t, n) {
                    var r, i;
                    if (e && e.preventDefault && e.handleObj) return r = e.handleObj, J(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof e) {
                        for (i in e) this.off(i, t, e[i]);
                        return this
                    }
                    return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = d), this.each(function() {
                        J.event.remove(this, e, n, t)
                    })
                },
                trigger: function(e, t) {
                    return this.each(function() {
                        J.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    return n ? J.event.trigger(e, t, n, !0) : void 0
                }
            });
            var Ae = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                De = /<([\w:]+)/,
                Ne = /<|&#?\w+;/,
                Me = /<(?:script|style|link)/i,
                Re = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Le = /^$|\/(?:java|ecma)script/i,
                Oe = /^true\/(.*)/,
                ke = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                Ue = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
            Ue.optgroup = Ue.option, Ue.tbody = Ue.tfoot = Ue.colgroup = Ue.caption = Ue.thead, Ue.th = Ue.td, J.extend({
                clone: function(e, t, n) {
                    var r, i, a, o, s = e.cloneNode(!0),
                        l = J.contains(e.ownerDocument, e);
                    if (!(Z.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || J.isXMLDoc(e)))
                        for (o = h(s), a = h(e), r = 0, i = a.length; i > r; r++) b(a[r], o[r]);
                    if (t)
                        if (n)
                            for (a = a || h(e), o = o || h(s), r = 0, i = a.length; i > r; r++) f(a[r], o[r]);
                        else f(e, s);
                    return o = h(s, "script"), o.length > 0 && _(o, !l && h(e, "script")), s
                },
                buildFragment: function(e, t, n, r) {
                    for (var i, a, o, s, l, c, d = t.createDocumentFragment(), u = [], p = 0, m = e.length; m > p; p++)
                        if (i = e[p], i || 0 === i)
                            if ("object" === J.type(i)) J.merge(u, i.nodeType ? [i] : i);
                            else if (Ne.test(i)) {
                        for (a = a || d.appendChild(t.createElement("div")), o = (De.exec(i) || ["", ""])[1].toLowerCase(), s = Ue[o] || Ue._default, a.innerHTML = s[1] + i.replace(Ae, "<$1></$2>") + s[2], c = s[0]; c--;) a = a.lastChild;
                        J.merge(u, a.childNodes), a = d.firstChild, a.textContent = ""
                    } else u.push(t.createTextNode(i));
                    for (d.textContent = "", p = 0; i = u[p++];)
                        if ((!r || -1 === J.inArray(i, r)) && (l = J.contains(i.ownerDocument, i), a = h(d.appendChild(i), "script"), l && _(a), n))
                            for (c = 0; i = a[c++];) Le.test(i.type || "") && n.push(i);
                    return d
                },
                cleanData: function(e) {
                    for (var t, n, r, i, a = J.event.special, o = 0; void 0 !== (n = e[o]); o++) {
                        if (J.acceptData(n) && (i = n[he.expando], i && (t = he.cache[i]))) {
                            if (t.events)
                                for (r in t.events) a[r] ? J.event.remove(n, r) : J.removeEvent(n, r, t.handle);
                            he.cache[i] && delete he.cache[i]
                        }
                        delete be.cache[n[be.expando]]
                    }
                }
            }), J.fn.extend({
                text: function(e) {
                    return fe(this, function(e) {
                        return void 0 === e ? J.text(this) : this.empty().each(function() {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                        })
                    }, null, e, arguments.length)
                },
                append: function() {
                    return this.domManip(arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = p(this, e);
                            t.appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = p(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return this.domManip(arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return this.domManip(arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                remove: function(e, t) {
                    for (var n, r = e ? J.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || J.cleanData(h(n)), n.parentNode && (t && J.contains(n.ownerDocument, n) && _(h(n, "script")), n.parentNode.removeChild(n));
                    return this
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (J.cleanData(h(e, !1)), e.textContent = "");
                    return this
                },
                clone: function(e, t) {
                    return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                        return J.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return fe(this, function(e) {
                        var t = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !Me.test(e) && !Ue[(De.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = e.replace(Ae, "<$1></$2>");
                            try {
                                for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (J.cleanData(h(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (i) {}
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = arguments[0];
                    return this.domManip(arguments, function(t) {
                        e = this.parentNode, J.cleanData(h(this)), e && e.replaceChild(t, this)
                    }), e && (e.length || e.nodeType) ? this : this.remove()
                },
                detach: function(e) {
                    return this.remove(e, !0)
                },
                domManip: function(e, t) {
                    e = z.apply([], e);
                    var n, r, i, a, o, s, l = 0,
                        c = this.length,
                        d = this,
                        u = c - 1,
                        p = e[0],
                        _ = J.isFunction(p);
                    if (_ || c > 1 && "string" == typeof p && !Z.checkClone && Re.test(p)) return this.each(function(n) {
                        var r = d.eq(n);
                        _ && (e[0] = p.call(this, n, r.html())), r.domManip(e, t)
                    });
                    if (c && (n = J.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
                        for (i = J.map(h(n, "script"), m), a = i.length; c > l; l++) o = n, l !== u && (o = J.clone(o, !0, !0), a && J.merge(i, h(o, "script"))), t.call(this[l], o, l);
                        if (a)
                            for (s = i[i.length - 1].ownerDocument, J.map(i, g), l = 0; a > l; l++) o = i[l], Le.test(o.type || "") && !he.access(o, "globalEval") && J.contains(s, o) && (o.src ? J._evalUrl && J._evalUrl(o.src) : J.globalEval(o.textContent.replace(ke, "")))
                    }
                    return this
                }
            }), J.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                J.fn[e] = function(e) {
                    for (var n, r = [], i = J(e), a = i.length - 1, o = 0; a >= o; o++) n = o === a ? this : this.clone(!0), J(i[o])[t](n), V.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var Be, We = {},
                Fe = /^margin/,
                qe = new RegExp("^(" + Ce + ")(?!px)[a-z%]+$", "i"),
                He = function(t) {
                    return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
                };
            ! function() {
                function t() {
                    o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o.innerHTML = "", i.appendChild(a);
                    var t = e.getComputedStyle(o, null);
                    n = "1%" !== t.top, r = "4px" === t.width, i.removeChild(a)
                }

                var n, r, i = X.documentElement,
                    a = X.createElement("div"),
                    o = X.createElement("div");
                o.style && (o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", Z.clearCloneStyle = "content-box" === o.style.backgroundClip, a.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", a.appendChild(o), e.getComputedStyle && J.extend(Z, {
                    pixelPosition: function() {
                        return t(), n
                    },
                    boxSizingReliable: function() {
                        return null == r && t(), r
                    },
                    reliableMarginRight: function() {
                        var t, n = o.appendChild(X.createElement("div"));
                        return n.style.cssText = o.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", o.style.width = "1px", i.appendChild(a), t = !parseFloat(e.getComputedStyle(n, null).marginRight), i.removeChild(a), o.removeChild(n), t
                    }
                }))
            }(), J.swap = function(e, t, n, r) {
                var i, a, o = {};
                for (a in t) o[a] = e.style[a], e.style[a] = t[a];
                i = n.apply(e, r || []);
                for (a in t) e.style[a] = o[a];
                return i
            };
            var ze = /^(none|table(?!-c[ea]).+)/,
                Ve = new RegExp("^(" + Ce + ")(.*)$", "i"),
                $e = new RegExp("^([+-])=(" + Ce + ")", "i"),
                je = { position: "absolute", visibility: "hidden", display: "block" },
                Ke = { letterSpacing: "0", fontWeight: "400" },
                Qe = ["Webkit", "O", "Moz", "ms"];
            J.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = C(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: { "float": "cssFloat" },
                style: function(e, t, n, r) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var i, a, o, s = J.camelCase(t),
                            l = e.style;
                        return t = J.cssProps[s] || (J.cssProps[s] = S(l, s)), o = J.cssHooks[t] || J.cssHooks[s], void 0 === n ? o && "get" in o && void 0 !== (i = o.get(e, !1, r)) ? i : l[t] : (a = typeof n, "string" === a && (i = $e.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(J.css(e, t)), a = "number"), null != n && n === n && ("number" !== a || J.cssNumber[s] || (n += "px"), Z.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), o && "set" in o && void 0 === (n = o.set(e, n, r)) || (l[t] = n)), void 0)
                    }
                },
                css: function(e, t, n, r) {
                    var i, a, o, s = J.camelCase(t);
                    return t = J.cssProps[s] || (J.cssProps[s] = S(e.style, s)), o = J.cssHooks[t] || J.cssHooks[s], o && "get" in o && (i = o.get(e, !0, n)), void 0 === i && (i = C(e, t, r)), "normal" === i && t in Ke && (i = Ke[t]), "" === n || n ? (a = parseFloat(i), n === !0 || J.isNumeric(a) ? a || 0 : i) : i
                }
            }), J.each(["height", "width"], function(e, t) {
                J.cssHooks[t] = {
                    get: function(e, n, r) {
                        return n ? ze.test(J.css(e, "display")) && 0 === e.offsetWidth ? J.swap(e, je, function() {
                            return T(e, t, r)
                        }) : T(e, t, r) : void 0
                    },
                    set: function(e, n, r) {
                        var i = r && He(e);
                        return x(e, n, r ? E(e, t, r, "border-box" === J.css(e, "boxSizing", !1, i), i) : 0)
                    }
                }
            }), J.cssHooks.marginRight = y(Z.reliableMarginRight, function(e, t) {
                return t ? J.swap(e, { display: "inline-block" }, C, [e, "marginRight"]) : void 0
            }), J.each({ margin: "", padding: "", border: "Width" }, function(e, t) {
                J.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var r = 0, i = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + ye[r] + t] = a[r] || a[r - 2] || a[0];
                        return i
                    }
                }, Fe.test(e) || (J.cssHooks[e + t].set = x)
            }), J.fn.extend({
                css: function(e, t) {
                    return fe(this, function(e, t, n) {
                        var r, i, a = {},
                            o = 0;
                        if (J.isArray(t)) {
                            for (r = He(e), i = t.length; i > o; o++) a[t[o]] = J.css(e, t[o], !1, r);
                            return a
                        }
                        return void 0 !== n ? J.style(e, t, n) : J.css(e, t)
                    }, e, t, arguments.length > 1)
                },
                show: function() {
                    return P(this, !0)
                },
                hide: function() {
                    return P(this)
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                        Se(this) ? J(this).show() : J(this).hide()
                    })
                }
            }), J.Tween = G, G.prototype = {
                constructor: G,
                init: function(e, t, n, r, i, a) {
                    this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = a || (J.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var e = G.propHooks[this.prop];
                    return e && e.get ? e.get(this) : G.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, n = G.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = J.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : G.propHooks._default.set(this), this
                }
            }, G.prototype.init.prototype = G.prototype, G.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = J.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                    },
                    set: function(e) {
                        J.fx.step[e.prop] ? J.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[J.cssProps[e.prop]] || J.cssHooks[e.prop]) ? J.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                    }
                }
            }, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, J.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                }
            }, J.fx = G.prototype.init, J.fx.step = {};
            var Ze, Xe, Ye = /^(?:toggle|show|hide)$/,
                Je = new RegExp("^(?:([+-])=|)(" + Ce + ")([a-z%]*)$", "i"),
                et = /queueHooks$/,
                tt = [N],
                nt = {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t),
                            r = n.cur(),
                            i = Je.exec(t),
                            a = i && i[3] || (J.cssNumber[e] ? "" : "px"),
                            o = (J.cssNumber[e] || "px" !== a && +r) && Je.exec(J.css(n.elem, e)),
                            s = 1,
                            l = 20;
                        if (o && o[3] !== a) {
                            a = a || o[3], i = i || [], o = +r || 1;
                            do s = s || ".5", o /= s, J.style(n.elem, e, o + a); while (s !== (s = n.cur() / r) && 1 !== s && --l)
                        }
                        return i && (o = n.start = +o || +r || 0, n.unit = a, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
                    }]
                };
            J.Animation = J.extend(R, {
                    tweener: function(e, t) {
                        J.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                        for (var n, r = 0, i = e.length; i > r; r++) n = e[r], nt[n] = nt[n] || [], nt[n].unshift(t)
                    },
                    prefilter: function(e, t) {
                        t ? tt.unshift(e) : tt.push(e)
                    }
                }), J.speed = function(e, t, n) {
                    var r = e && "object" == typeof e ? J.extend({}, e) : {
                        complete: n || !n && t || J.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !J.isFunction(t) && t
                    };
                    return r.duration = J.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in J.fx.speeds ? J.fx.speeds[r.duration] : J.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                        J.isFunction(r.old) && r.old.call(this), r.queue && J.dequeue(this, r.queue)
                    }, r
                }, J.fn.extend({
                    fadeTo: function(e, t, n, r) {
                        return this.filter(Se).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r)
                    },
                    animate: function(e, t, n, r) {
                        var i = J.isEmptyObject(e),
                            a = J.speed(t, n, r),
                            o = function() {
                                var t = R(this, J.extend({}, e), a);
                                (i || he.get(this, "finish")) && t.stop(!0)
                            };
                        return o.finish = o, i || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
                    },
                    stop: function(e, t, n) {
                        var r = function(e) {
                            var t = e.stop;
                            delete e.stop, t(n)
                        };
                        return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                            var t = !0,
                                i = null != e && e + "queueHooks",
                                a = J.timers,
                                o = he.get(this);
                            if (i) o[i] && o[i].stop && r(o[i]);
                            else
                                for (i in o) o[i] && o[i].stop && et.test(i) && r(o[i]);
                            for (i = a.length; i--;) a[i].elem !== this || null != e && a[i].queue !== e || (a[i].anim.stop(n), t = !1, a.splice(i, 1));
                            (t || !n) && J.dequeue(this, e)
                        })
                    },
                    finish: function(e) {
                        return e !== !1 && (e = e || "fx"), this.each(function() {
                            var t, n = he.get(this),
                                r = n[e + "queue"],
                                i = n[e + "queueHooks"],
                                a = J.timers,
                                o = r ? r.length : 0;
                            for (n.finish = !0, J.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = a.length; t--;) a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                            for (t = 0; o > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                            delete n.finish
                        })
                    }
                }), J.each(["toggle", "show", "hide"], function(e, t) {
                    var n = J.fn[t];
                    J.fn[t] = function(e, r, i) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(A(t, !0), e, r, i)
                    }
                }), J.each({
                    slideDown: A("show"),
                    slideUp: A("hide"),
                    slideToggle: A("toggle"),
                    fadeIn: { opacity: "show" },
                    fadeOut: { opacity: "hide" },
                    fadeToggle: { opacity: "toggle" }
                }, function(e, t) {
                    J.fn[e] = function(e, n, r) {
                        return this.animate(t, e, n, r)
                    }
                }), J.timers = [], J.fx.tick = function() {
                    var e, t = 0,
                        n = J.timers;
                    for (Ze = J.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                    n.length || J.fx.stop(), Ze = void 0
                }, J.fx.timer = function(e) {
                    J.timers.push(e), e() ? J.fx.start() : J.timers.pop()
                }, J.fx.interval = 13, J.fx.start = function() {
                    Xe || (Xe = setInterval(J.fx.tick, J.fx.interval))
                }, J.fx.stop = function() {
                    clearInterval(Xe), Xe = null
                }, J.fx.speeds = { slow: 600, fast: 200, _default: 400 }, J.fn.delay = function(e, t) {
                    return e = J.fx ? J.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                        var r = setTimeout(t, e);
                        n.stop = function() {
                            clearTimeout(r)
                        }
                    })
                },
                function() {
                    var e = X.createElement("input"),
                        t = X.createElement("select"),
                        n = t.appendChild(X.createElement("option"));
                    e.type = "checkbox", Z.checkOn = "" !== e.value, Z.optSelected = n.selected, t.disabled = !0, Z.optDisabled = !n.disabled, e = X.createElement("input"), e.value = "t", e.type = "radio", Z.radioValue = "t" === e.value
                }();
            var rt, it, at = J.expr.attrHandle;
            J.fn.extend({
                attr: function(e, t) {
                    return fe(this, J.attr, e, t, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        J.removeAttr(this, e)
                    })
                }
            }), J.extend({
                attr: function(e, t, n) {
                    var r, i, a = e.nodeType;
                    if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === Ee ? J.prop(e, t, n) : (1 === a && J.isXMLDoc(e) || (t = t.toLowerCase(), r = J.attrHooks[t] || (J.expr.match.bool.test(t) ? it : rt)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = J.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void J.removeAttr(e, t))
                },
                removeAttr: function(e, t) {
                    var n, r, i = 0,
                        a = t && t.match(me);
                    if (a && 1 === e.nodeType)
                        for (; n = a[i++];) r = J.propFix[n] || n, J.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!Z.radioValue && "radio" === t && J.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t
                            }
                        }
                    }
                }
            }), it = {
                set: function(e, t, n) {
                    return t === !1 ? J.removeAttr(e, n) : e.setAttribute(n, n), n
                }
            }, J.each(J.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var n = at[t] || J.find.attr;
                at[t] = function(e, t, r) {
                    var i, a;
                    return r || (a = at[t], at[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, at[t] = a), i
                }
            });
            var ot = /^(?:input|select|textarea|button)$/i;
            J.fn.extend({
                prop: function(e, t) {
                    return fe(this, J.prop, e, t, arguments.length > 1)
                },
                removeProp: function(e) {
                    return this.each(function() {
                        delete this[J.propFix[e] || e]
                    })
                }
            }), J.extend({
                propFix: { "for": "htmlFor", "class": "className" },
                prop: function(e, t, n) {
                    var r, i, a, o = e.nodeType;
                    if (e && 3 !== o && 8 !== o && 2 !== o) return a = 1 !== o || !J.isXMLDoc(e), a && (t = J.propFix[t] || t, i = J.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            return e.hasAttribute("tabindex") || ot.test(e.nodeName) || e.href ? e.tabIndex : -1
                        }
                    }
                }
            }), Z.optSelected || (J.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null
                }
            }), J.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                J.propFix[this.toLowerCase()] = this
            });
            var st = /[\t\r\n\f]/g;
            J.fn.extend({
                addClass: function(e) {
                    var t, n, r, i, a, o, s = "string" == typeof e && e,
                        l = 0,
                        c = this.length;
                    if (J.isFunction(e)) return this.each(function(t) {
                        J(this).addClass(e.call(this, t, this.className))
                    });
                    if (s)
                        for (t = (e || "").match(me) || []; c > l; l++)
                            if (n = this[l], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : " ")) {
                                for (a = 0; i = t[a++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                                o = J.trim(r), n.className !== o && (n.className = o)
                            }
                    return this
                },
                removeClass: function(e) {
                    var t, n, r, i, a, o, s = 0 === arguments.length || "string" == typeof e && e,
                        l = 0,
                        c = this.length;
                    if (J.isFunction(e)) return this.each(function(t) {
                        J(this).removeClass(e.call(this, t, this.className))
                    });
                    if (s)
                        for (t = (e || "").match(me) || []; c > l; l++)
                            if (n = this[l], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : "")) {
                                for (a = 0; i = t[a++];)
                                    for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                                o = e ? J.trim(r) : "", n.className !== o && (n.className = o)
                            }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = typeof e;
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : J.isFunction(e) ? this.each(function(n) {
                        J(this).toggleClass(e.call(this, n, this.className, t), t)
                    }) : this.each(function() {
                        if ("string" === n)
                            for (var t, r = 0, i = J(this), a = e.match(me) || []; t = a[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                        else(n === Ee || "boolean" === n) && (this.className && he.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : he.get(this, "__className__") || "")
                    })
                },
                hasClass: function(e) {
                    for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(st, " ").indexOf(t) >= 0) return !0;
                    return !1
                }
            });
            var lt = /\r/g;
            J.fn.extend({
                val: function(e) {
                    var t, n, r, i = this[0]; {
                        if (arguments.length) return r = J.isFunction(e), this.each(function(n) {
                            var i;
                            1 === this.nodeType && (i = r ? e.call(this, n, J(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : J.isArray(i) && (i = J.map(i, function(e) {
                                return null == e ? "" : e + ""
                            })), t = J.valHooks[this.type] || J.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                        });
                        if (i) return t = J.valHooks[i.type] || J.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(lt, "") : null == n ? "" : n)
                    }
                }
            }), J.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = J.find.attr(e, "value");
                            return null != t ? t : J.trim(J.text(e))
                        }
                    },
                    select: {
                        get: function(e) {
                            for (var t, n, r = e.options, i = e.selectedIndex, a = "select-one" === e.type || 0 > i, o = a ? null : [], s = a ? i + 1 : r.length, l = 0 > i ? s : a ? i : 0; s > l; l++)
                                if (n = r[l], (n.selected || l === i) && (Z.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !J.nodeName(n.parentNode, "optgroup"))) {
                                    if (t = J(n).val(), a) return t;
                                    o.push(t)
                                }
                            return o
                        },
                        set: function(e, t) {
                            for (var n, r, i = e.options, a = J.makeArray(t), o = i.length; o--;) r = i[o], (r.selected = J.inArray(r.value, a) >= 0) && (n = !0);
                            return n || (e.selectedIndex = -1), a
                        }
                    }
                }
            }), J.each(["radio", "checkbox"], function() {
                J.valHooks[this] = {
                    set: function(e, t) {
                        return J.isArray(t) ? e.checked = J.inArray(J(e).val(), t) >= 0 : void 0
                    }
                }, Z.checkOn || (J.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            }), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
                J.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }), J.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                },
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, r) {
                    return this.on(t, e, n, r)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                }
            });
            var ct = J.now(),
                dt = /\?/;
            J.parseJSON = function(e) {
                return JSON.parse(e + "")
            }, J.parseXML = function(e) {
                var t, n;
                if (!e || "string" != typeof e) return null;
                try {
                    n = new DOMParser, t = n.parseFromString(e, "text/xml")
                } catch (r) {
                    t = void 0
                }
                return (!t || t.getElementsByTagName("parsererror").length) && J.error("Invalid XML: " + e), t
            };
            var ut = /#.*$/,
                pt = /([?&])_=[^&]*/,
                mt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                gt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                _t = /^(?:GET|HEAD)$/,
                ft = /^\/\//,
                ht = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                bt = {},
                It = {},
                vt = "*/".concat("*"),
                Ct = e.location.href,
                yt = ht.exec(Ct.toLowerCase()) || [];
            J.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Ct,
                    type: "GET",
                    isLocal: gt.test(yt[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": vt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: { xml: /xml/, html: /html/, json: /json/ },
                    responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                    converters: { "* text": String, "text html": !0, "text json": J.parseJSON, "text xml": J.parseXML },
                    flatOptions: { url: !0, context: !0 }
                },
                ajaxSetup: function(e, t) {
                    return t ? k(k(e, J.ajaxSettings), t) : k(J.ajaxSettings, e)
                },
                ajaxPrefilter: L(bt),
                ajaxTransport: L(It),
                ajax: function(e, t) {
                    function n(e, t, n, o) {
                        var l, d, h, b, v, y = t;
                        2 !== I && (I = 2, s && clearTimeout(s), r = void 0, a = o || "", C.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, n && (b = U(u, C, n)), b = B(u, b, C, l), l ? (u.ifModified && (v = C.getResponseHeader("Last-Modified"), v && (J.lastModified[i] = v), v = C.getResponseHeader("etag"), v && (J.etag[i] = v)), 204 === e || "HEAD" === u.type ? y = "nocontent" : 304 === e ? y = "notmodified" : (y = b.state, d = b.data, h = b.error, l = !h)) : (h = y, (e || !y) && (y = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (t || y) + "", l ? g.resolveWith(p, [d, y, C]) : g.rejectWith(p, [C, y, h]), C.statusCode(f), f = void 0, c && m.trigger(l ? "ajaxSuccess" : "ajaxError", [C, u, l ? d : h]), _.fireWith(p, [C, y]), c && (m.trigger("ajaxComplete", [C, u]), --J.active || J.event.trigger("ajaxStop")))
                    }

                    "object" == typeof e && (t = e, e = void 0), t = t || {};
                    var r, i, a, o, s, l, c, d, u = J.ajaxSetup({}, t),
                        p = u.context || u,
                        m = u.context && (p.nodeType || p.jquery) ? J(p) : J.event,
                        g = J.Deferred(),
                        _ = J.Callbacks("once memory"),
                        f = u.statusCode || {},
                        h = {},
                        b = {},
                        I = 0,
                        v = "canceled",
                        C = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (2 === I) {
                                    if (!o)
                                        for (o = {}; t = mt.exec(a);) o[t[1].toLowerCase()] = t[2];
                                    t = o[e.toLowerCase()]
                                }
                                return null == t ? null : t
                            },
                            getAllResponseHeaders: function() {
                                return 2 === I ? a : null
                            },
                            setRequestHeader: function(e, t) {
                                var n = e.toLowerCase();
                                return I || (e = b[n] = b[n] || e, h[e] = t), this
                            },
                            overrideMimeType: function(e) {
                                return I || (u.mimeType = e), this
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (2 > I)
                                        for (t in e) f[t] = [f[t], e[t]];
                                    else C.always(e[C.status]);
                                return this
                            },
                            abort: function(e) {
                                var t = e || v;
                                return r && r.abort(t), n(0, t), this
                            }
                        };
                    if (g.promise(C).complete = _.add, C.success = C.done, C.error = C.fail, u.url = ((e || u.url || Ct) + "").replace(ut, "").replace(ft, yt[1] + "//"), u.type = t.method || t.type || u.method || u.type, u.dataTypes = J.trim(u.dataType || "*").toLowerCase().match(me) || [""], null == u.crossDomain && (l = ht.exec(u.url.toLowerCase()), u.crossDomain = !(!l || l[1] === yt[1] && l[2] === yt[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (yt[3] || ("http:" === yt[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = J.param(u.data, u.traditional)), O(bt, u, t, C), 2 === I) return C;
                    c = J.event && u.global, c && 0 === J.active++ && J.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !_t.test(u.type), i = u.url, u.hasContent || (u.data && (i = u.url += (dt.test(i) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = pt.test(i) ? i.replace(pt, "$1_=" + ct++) : i + (dt.test(i) ? "&" : "?") + "_=" + ct++)), u.ifModified && (J.lastModified[i] && C.setRequestHeader("If-Modified-Since", J.lastModified[i]), J.etag[i] && C.setRequestHeader("If-None-Match", J.etag[i])), (u.data && u.hasContent && u.contentType !== !1 || t.contentType) && C.setRequestHeader("Content-Type", u.contentType), C.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + vt + "; q=0.01" : "") : u.accepts["*"]);
                    for (d in u.headers) C.setRequestHeader(d, u.headers[d]);
                    if (u.beforeSend && (u.beforeSend.call(p, C, u) === !1 || 2 === I)) return C.abort();
                    v = "abort";
                    for (d in { success: 1, error: 1, complete: 1 }) C[d](u[d]);
                    if (r = O(It, u, t, C)) {
                        C.readyState = 1, c && m.trigger("ajaxSend", [C, u]), u.async && u.timeout > 0 && (s = setTimeout(function() {
                            C.abort("timeout")
                        }, u.timeout));
                        try {
                            I = 1, r.send(h, n)
                        } catch (y) {
                            if (!(2 > I)) throw y;
                            n(-1, y)
                        }
                    } else n(-1, "No Transport");
                    return C
                },
                getJSON: function(e, t, n) {
                    return J.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return J.get(e, void 0, t, "script")
                }
            }), J.each(["get", "post"], function(e, t) {
                J[t] = function(e, n, r, i) {
                    return J.isFunction(n) && (i = i || r, r = n, n = void 0), J.ajax({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    })
                }
            }), J._evalUrl = function(e) {
                return J.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 })
            }, J.fn.extend({
                wrapAll: function(e) {
                    var t;
                    return J.isFunction(e) ? this.each(function(t) {
                        J(this).wrapAll(e.call(this, t))
                    }) : (this[0] && (t = J(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                        return e
                    }).append(this)), this)
                },
                wrapInner: function(e) {
                    return J.isFunction(e) ? this.each(function(t) {
                        J(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = J(this),
                            n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = J.isFunction(e);
                    return this.each(function(n) {
                        J(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), J.expr.filters.hidden = function(e) {
                return e.offsetWidth <= 0 && e.offsetHeight <= 0
            }, J.expr.filters.visible = function(e) {
                return !J.expr.filters.hidden(e)
            };
            var St = /%20/g,
                xt = /\[\]$/,
                Et = /\r?\n/g,
                Tt = /^(?:submit|button|image|reset|file)$/i,
                Pt = /^(?:input|select|textarea|keygen)/i;
            J.param = function(e, t) {
                var n, r = [],
                    i = function(e, t) {
                        t = J.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    };
                if (void 0 === t && (t = J.ajaxSettings && J.ajaxSettings.traditional), J.isArray(e) || e.jquery && !J.isPlainObject(e)) J.each(e, function() {
                    i(this.name, this.value)
                });
                else
                    for (n in e) W(n, e[n], t, i);
                return r.join("&").replace(St, "+")
            }, J.fn.extend({
                serialize: function() {
                    return J.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = J.prop(this, "elements");
                        return e ? J.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !J(this).is(":disabled") && Pt.test(this.nodeName) && !Tt.test(e) && (this.checked || !xe.test(e))
                    }).map(function(e, t) {
                        var n = J(this).val();
                        return null == n ? null : J.isArray(n) ? J.map(n, function(e) {
                            return { name: t.name, value: e.replace(Et, "\r\n") }
                        }) : { name: t.name, value: n.replace(Et, "\r\n") }
                    }).get()
                }
            }), J.ajaxSettings.xhr = function() {
                try {
                    return new XMLHttpRequest
                } catch (e) {}
            };
            var Gt = 0,
                wt = {},
                At = { 0: 200, 1223: 204 },
                Dt = J.ajaxSettings.xhr();
            e.attachEvent && e.attachEvent("onunload", function() {
                for (var e in wt) wt[e]()
            }), Z.cors = !!Dt && "withCredentials" in Dt, Z.ajax = Dt = !!Dt, J.ajaxTransport(function(e) {
                var t;
                return Z.cors || Dt && !e.crossDomain ? {
                    send: function(n, r) {
                        var i, a = e.xhr(),
                            o = ++Gt;
                        if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                            for (i in e.xhrFields) a[i] = e.xhrFields[i];
                        e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                        for (i in n) a.setRequestHeader(i, n[i]);
                        t = function(e) {
                            return function() {
                                t && (delete wt[o], t = a.onload = a.onerror = null, "abort" === e ? a.abort() : "error" === e ? r(a.status, a.statusText) : r(At[a.status] || a.status, a.statusText, "string" == typeof a.responseText ? { text: a.responseText } : void 0, a.getAllResponseHeaders()))
                            }
                        }, a.onload = t(), a.onerror = t("error"), t = wt[o] = t("abort");
                        try {
                            a.send(e.hasContent && e.data || null)
                        } catch (s) {
                            if (t) throw s
                        }
                    },
                    abort: function() {
                        t && t()
                    }
                } : void 0
            }), J.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                contents: { script: /(?:java|ecma)script/ },
                converters: {
                    "text script": function(e) {
                        return J.globalEval(e), e
                    }
                }
            }), J.ajaxPrefilter("script", function(e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
            }), J.ajaxTransport("script", function(e) {
                if (e.crossDomain) {
                    var t, n;
                    return {
                        send: function(r, i) {
                            t = J("<script>").prop({
                                async: !0,
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function(e) {
                                t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                            }), X.head.appendChild(t[0])
                        },
                        abort: function() {
                            n && n()
                        }
                    }
                }
            });
            var Nt = [],
                Mt = /(=)\?(?=&|$)|\?\?/;
            J.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = Nt.pop() || J.expando + "_" + ct++;
                    return this[e] = !0, e
                }
            }), J.ajaxPrefilter("json jsonp", function(t, n, r) {
                var i, a, o,
                    s = t.jsonp !== !1 && (Mt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Mt.test(t.data) && "data");
                return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = J.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Mt, "$1" + i) : t.jsonp !== !1 && (t.url += (dt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
                    return o || J.error(i + " was not called"), o[0]
                }, t.dataTypes[0] = "json", a = e[i], e[i] = function() {
                    o = arguments
                }, r.always(function() {
                    e[i] = a, t[i] && (t.jsonpCallback = n.jsonpCallback, Nt.push(i)), o && J.isFunction(a) && a(o[0]), o = a = void 0
                }), "script") : void 0
            }), J.parseHTML = function(e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || X;
                var r = oe.exec(e),
                    i = !n && [];
                return r ? [t.createElement(r[1])] : (r = J.buildFragment([e], t, i), i && i.length && J(i).remove(), J.merge([], r.childNodes))
            };
            var Rt = J.fn.load;
            J.fn.load = function(e, t, n) {
                if ("string" != typeof e && Rt) return Rt.apply(this, arguments);
                var r, i, a, o = this,
                    s = e.indexOf(" ");
                return s >= 0 && (r = J.trim(e.slice(s)), e = e.slice(0, s)), J.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), o.length > 0 && J.ajax({
                    url: e,
                    type: i,
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    a = arguments, o.html(r ? J("<div>").append(J.parseHTML(e)).find(r) : e)
                }).complete(n && function(e, t) {
                    o.each(n, a || [e.responseText, t, e])
                }), this
            }, J.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                J.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }), J.expr.filters.animated = function(e) {
                return J.grep(J.timers, function(t) {
                    return e === t.elem
                }).length
            };
            var Lt = e.document.documentElement;
            J.offset = {
                setOffset: function(e, t, n) {
                    var r, i, a, o, s, l, c, d = J.css(e, "position"),
                        u = J(e),
                        p = {};
                    "static" === d && (e.style.position = "relative"), s = u.offset(), a = J.css(e, "top"), l = J.css(e, "left"), c = ("absolute" === d || "fixed" === d) && (a + l).indexOf("auto") > -1, c ? (r = u.position(), o = r.top, i = r.left) : (o = parseFloat(a) || 0, i = parseFloat(l) || 0), J.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + o), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : u.css(p)
                }
            }, J.fn.extend({
                offset: function(e) {
                    if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                        J.offset.setOffset(this, e, t)
                    });
                    var t, n, r = this[0],
                        i = { top: 0, left: 0 },
                        a = r && r.ownerDocument;
                    if (a) return t = a.documentElement, J.contains(t, r) ? (typeof r.getBoundingClientRect !== Ee && (i = r.getBoundingClientRect()), n = F(a), {
                        top: i.top + n.pageYOffset - t.clientTop,
                        left: i.left + n.pageXOffset - t.clientLeft
                    }) : i
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n = this[0],
                            r = { top: 0, left: 0 };
                        return "fixed" === J.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), J.nodeName(e[0], "html") || (r = e.offset()), r.top += J.css(e[0], "borderTopWidth", !0), r.left += J.css(e[0], "borderLeftWidth", !0)), {
                            top: t.top - r.top - J.css(n, "marginTop", !0),
                            left: t.left - r.left - J.css(n, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent || Lt; e && !J.nodeName(e, "html") && "static" === J.css(e, "position");) e = e.offsetParent;
                        return e || Lt
                    })
                }
            }), J.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(t, n) {
                var r = "pageYOffset" === n;
                J.fn[t] = function(i) {
                    return fe(this, function(t, i, a) {
                        var o = F(t);
                        return void 0 === a ? o ? o[n] : t[i] : void(o ? o.scrollTo(r ? e.pageXOffset : a, r ? a : e.pageYOffset) : t[i] = a)
                    }, t, i, arguments.length, null)
                }
            }), J.each(["top", "left"], function(e, t) {
                J.cssHooks[t] = y(Z.pixelPosition, function(e, n) {
                    return n ? (n = C(e, t), qe.test(n) ? J(e).position()[t] + "px" : n) : void 0
                })
            }), J.each({ Height: "height", Width: "width" }, function(e, t) {
                J.each({ padding: "inner" + e, content: t, "": "outer" + e }, function(n, r) {
                    J.fn[r] = function(r, i) {
                        var a = arguments.length && (n || "boolean" != typeof r),
                            o = n || (r === !0 || i === !0 ? "margin" : "border");
                        return fe(this, function(t, n, r) {
                            var i;
                            return J.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? J.css(t, n, o) : J.style(t, n, r, o)
                        }, t, a ? r : void 0, a, null)
                    }
                })
            }), J.fn.size = function() {
                return this.length
            }, J.fn.andSelf = J.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return J
            });
            var Ot = e.jQuery,
                kt = e.$;
            return J.noConflict = function(t) {
                return e.$ === J && (e.$ = kt), t && e.jQuery === J && (e.jQuery = Ot), J
            }, typeof t === Ee && (e.jQuery = e.$ = J), J
        })
    }, {}],
    143: [function(require, module, exports) {
        (function(e) {
            (function() {
                function e(e) {
                    this.tokens = [], this.tokens.links = {}, this.options = e || c.defaults, this.rules = d.normal, this.options.gfm && (this.options.tables ? this.rules = d.tables : this.rules = d.gfm)
                }

                function t(e, t) {
                    if (this.options = t || c.defaults, this.links = e, this.rules = u.normal, this.renderer = this.options.renderer || new n, this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");
                    this.options.gfm ? this.options.breaks ? this.rules = u.breaks : this.rules = u.gfm : this.options.pedantic && (this.rules = u.pedantic)
                }

                function n(e) {
                    this.options = e || {}
                }

                function r(e) {
                    this.tokens = [], this.token = null, this.options = e || c.defaults, this.options.renderer = this.options.renderer || new n, this.renderer = this.options.renderer, this.renderer.options = this.options
                }

                function i(e, t) {
                    return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
                }

                function a(e) {
                    return e.replace(/&([#\w]+);/g, function(e, t) {
                        return t = t.toLowerCase(), "colon" === t ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
                    })
                }

                function o(e, t) {
                    return e = e.source, t = t || "",
                        function n(r, i) {
                            return r ? (i = i.source || i, i = i.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(r, i), n) : new RegExp(e, t)
                        }
                }

                function s() {}

                function l(e) {
                    for (var t, n, r = 1; r < arguments.length; r++) {
                        t = arguments[r];
                        for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }
                    return e
                }

                function c(t, n, a) {
                    if (a || "function" == typeof n) {
                        a || (a = n, n = null), n = l({}, c.defaults, n || {});
                        var o, s, d = n.highlight,
                            u = 0;
                        try {
                            o = e.lex(t, n)
                        } catch (p) {
                            return a(p)
                        }
                        s = o.length;
                        var m = function(e) {
                            if (e) return n.highlight = d, a(e);
                            var t;
                            try {
                                t = r.parse(o, n)
                            } catch (i) {
                                e = i
                            }
                            return n.highlight = d, e ? a(e) : a(null, t)
                        };
                        if (!d || d.length < 3) return m();
                        if (delete n.highlight, !s) return m();
                        for (; u < o.length; u++) ! function(e) {
                            return "code" !== e.type ? --s || m() : d(e.text, e.lang, function(t, n) {
                                return t ? m(t) : null == n || n === e.text ? --s || m() : (e.text = n, e.escaped = !0, void(--s || m()))
                            })
                        }(o[u])
                    } else try {
                        return n && (n = l({}, c.defaults, n)), r.parse(e.lex(t, n), n)
                    } catch (p) {
                        if (p.message += "\nPlease report this to https://github.com/chjj/marked.", (n || c.defaults).silent) return "<p>An error occured:</p><pre>" + i(p.message + "", !0) + "</pre>";
                        throw p
                    }
                }

                var d = {
                    newline: /^\n+/,
                    code: /^( {4}[^\n]+\n*)+/,
                    fences: s,
                    hr: /^( *[-*_]){3,} *(?:\n+|$)/,
                    heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
                    nptable: s,
                    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
                    blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
                    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
                    html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
                    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
                    table: s,
                    paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
                    text: /^[^\n]+/
                };
                d.bullet = /(?:[*+-]|\d+\.)/, d.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, d.item = o(d.item, "gm")(/bull/g, d.bullet)(), d.list = o(d.list)(/bull/g, d.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + d.def.source + ")")(), d.blockquote = o(d.blockquote)("def", d.def)(), d._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", d.html = o(d.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, d._tag)(), d.paragraph = o(d.paragraph)("hr", d.hr)("heading", d.heading)("lheading", d.lheading)("blockquote", d.blockquote)("tag", "<" + d._tag)("def", d.def)(), d.normal = l({}, d), d.gfm = l({}, d.normal, {
                    fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
                    paragraph: /^/,
                    heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
                }), d.gfm.paragraph = o(d.paragraph)("(?!", "(?!" + d.gfm.fences.source.replace("\\1", "\\2") + "|" + d.list.source.replace("\\1", "\\3") + "|")(), d.tables = l({}, d.gfm, {
                    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
                    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
                }), e.rules = d, e.lex = function(t, n) {
                    var r = new e(n);
                    return r.lex(t)
                }, e.prototype.lex = function(e) {
                    return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0)
                }, e.prototype.token = function(e, t, n) {
                    for (var r, i, a, o, s, l, c, u, p, e = e.replace(/^ +$/gm, ""); e;)
                        if ((a = this.rules.newline.exec(e)) && (e = e.substring(a[0].length), a[0].length > 1 && this.tokens.push({ type: "space" })), a = this.rules.code.exec(e)) e = e.substring(a[0].length), a = a[0].replace(/^ {4}/gm, ""), this.tokens.push({
                            type: "code",
                            text: this.options.pedantic ? a : a.replace(/\n+$/, "")
                        });
                        else if (a = this.rules.fences.exec(e)) e = e.substring(a[0].length), this.tokens.push({
                        type: "code",
                        lang: a[2],
                        text: a[3] || ""
                    });
                    else if (a = this.rules.heading.exec(e)) e = e.substring(a[0].length), this.tokens.push({
                        type: "heading",
                        depth: a[1].length,
                        text: a[2]
                    });
                    else if (t && (a = this.rules.nptable.exec(e))) {
                        for (e = e.substring(a[0].length), l = {
                                type: "table",
                                header: a[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                                align: a[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                cells: a[3].replace(/\n$/, "").split("\n")
                            }, u = 0; u < l.align.length; u++) /^ *-+: *$/.test(l.align[u]) ? l.align[u] = "right" : /^ *:-+: *$/.test(l.align[u]) ? l.align[u] = "center" : /^ *:-+ *$/.test(l.align[u]) ? l.align[u] = "left" : l.align[u] = null;
                        for (u = 0; u < l.cells.length; u++) l.cells[u] = l.cells[u].split(/ *\| */);
                        this.tokens.push(l)
                    } else if (a = this.rules.lheading.exec(e)) e = e.substring(a[0].length), this.tokens.push({
                        type: "heading",
                        depth: "=" === a[2] ? 1 : 2,
                        text: a[1]
                    });
                    else if (a = this.rules.hr.exec(e)) e = e.substring(a[0].length), this.tokens.push({ type: "hr" });
                    else if (a = this.rules.blockquote.exec(e)) e = e.substring(a[0].length), this.tokens.push({ type: "blockquote_start" }), a = a[0].replace(/^ *> ?/gm, ""), this.token(a, t, !0), this.tokens.push({ type: "blockquote_end" });
                    else if (a = this.rules.list.exec(e)) {
                        for (e = e.substring(a[0].length), o = a[2], this.tokens.push({
                                type: "list_start",
                                ordered: o.length > 1
                            }), a = a[0].match(this.rules.item), r = !1, p = a.length, u = 0; p > u; u++) l = a[u], c = l.length, l = l.replace(/^ *([*+-]|\d+\.) +/, ""), ~l.indexOf("\n ") && (c -= l.length, l = this.options.pedantic ? l.replace(/^ {1,4}/gm, "") : l.replace(new RegExp("^ {1," + c + "}", "gm"), "")), this.options.smartLists && u !== p - 1 && (s = d.bullet.exec(a[u + 1])[0], o === s || o.length > 1 && s.length > 1 || (e = a.slice(u + 1).join("\n") + e, u = p - 1)), i = r || /\n\n(?!\s*$)/.test(l), u !== p - 1 && (r = "\n" === l.charAt(l.length - 1), i || (i = r)), this.tokens.push({ type: i ? "loose_item_start" : "list_item_start" }), this.token(l, !1, n), this.tokens.push({ type: "list_item_end" });
                        this.tokens.push({ type: "list_end" })
                    } else if (a = this.rules.html.exec(e)) e = e.substring(a[0].length), this.tokens.push({
                        type: this.options.sanitize ? "paragraph" : "html",
                        pre: !this.options.sanitizer && ("pre" === a[1] || "script" === a[1] || "style" === a[1]),
                        text: a[0]
                    });
                    else if (!n && t && (a = this.rules.def.exec(e))) e = e.substring(a[0].length), this.tokens.links[a[1].toLowerCase()] = {
                        href: a[2],
                        title: a[3]
                    };
                    else if (t && (a = this.rules.table.exec(e))) {
                        for (e = e.substring(a[0].length), l = {
                                type: "table",
                                header: a[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                                align: a[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                cells: a[3].replace(/(?: *\| *)?\n$/, "").split("\n")
                            }, u = 0; u < l.align.length; u++) /^ *-+: *$/.test(l.align[u]) ? l.align[u] = "right" : /^ *:-+: *$/.test(l.align[u]) ? l.align[u] = "center" : /^ *:-+ *$/.test(l.align[u]) ? l.align[u] = "left" : l.align[u] = null;
                        for (u = 0; u < l.cells.length; u++) l.cells[u] = l.cells[u].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
                        this.tokens.push(l)
                    } else if (t && (a = this.rules.paragraph.exec(e))) e = e.substring(a[0].length), this.tokens.push({
                        type: "paragraph",
                        text: "\n" === a[1].charAt(a[1].length - 1) ? a[1].slice(0, -1) : a[1]
                    });
                    else if (a = this.rules.text.exec(e)) e = e.substring(a[0].length), this.tokens.push({
                        type: "text",
                        text: a[0]
                    });
                    else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
                    return this.tokens
                };
                var u = {
                    escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
                    autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
                    url: s,
                    tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
                    link: /^!?\[(inside)\]\(href\)/,
                    reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
                    nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
                    strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
                    em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
                    code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
                    br: /^ {2,}\n(?!\s*$)/,
                    del: s,
                    text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
                };
                u._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, u._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, u.link = o(u.link)("inside", u._inside)("href", u._href)(), u.reflink = o(u.reflink)("inside", u._inside)(), u.normal = l({}, u), u.pedantic = l({}, u.normal, {
                    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
                }), u.gfm = l({}, u.normal, {
                    escape: o(u.escape)("])", "~|])")(),
                    url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
                    del: /^~~(?=\S)([\s\S]*?\S)~~/,
                    text: o(u.text)("]|", "~]|")("|", "|https?://|")()
                }), u.breaks = l({}, u.gfm, {
                    br: o(u.br)("{2,}", "*")(),
                    text: o(u.gfm.text)("{2,}", "*")()
                }), t.rules = u, t.output = function(e, n, r) {
                    var i = new t(n, r);
                    return i.output(e)
                }, t.prototype.output = function(e) {
                    for (var t, n, r, a, o = ""; e;)
                        if (a = this.rules.escape.exec(e)) e = e.substring(a[0].length), o += a[1];
                        else if (a = this.rules.autolink.exec(e)) e = e.substring(a[0].length), "@" === a[2] ? (n = ":" === a[1].charAt(6) ? this.mangle(a[1].substring(7)) : this.mangle(a[1]), r = this.mangle("mailto:") + n) : (n = i(a[1]), r = n), o += this.renderer.link(r, null, n);
                    else if (this.inLink || !(a = this.rules.url.exec(e))) {
                        if (a = this.rules.tag.exec(e)) !this.inLink && /^<a /i.test(a[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(a[0]) && (this.inLink = !1), e = e.substring(a[0].length), o += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(a[0]) : i(a[0]) : a[0];
                        else if (a = this.rules.link.exec(e)) e = e.substring(a[0].length), this.inLink = !0, o += this.outputLink(a, {
                            href: a[2],
                            title: a[3]
                        }), this.inLink = !1;
                        else if ((a = this.rules.reflink.exec(e)) || (a = this.rules.nolink.exec(e))) {
                            if (e = e.substring(a[0].length), t = (a[2] || a[1]).replace(/\s+/g, " "), t = this.links[t.toLowerCase()], !t || !t.href) {
                                o += a[0].charAt(0), e = a[0].substring(1) + e;
                                continue
                            }
                            this.inLink = !0, o += this.outputLink(a, t), this.inLink = !1
                        } else if (a = this.rules.strong.exec(e)) e = e.substring(a[0].length), o += this.renderer.strong(this.output(a[2] || a[1]));
                        else if (a = this.rules.em.exec(e)) e = e.substring(a[0].length), o += this.renderer.em(this.output(a[2] || a[1]));
                        else if (a = this.rules.code.exec(e)) e = e.substring(a[0].length), o += this.renderer.codespan(i(a[2], !0));
                        else if (a = this.rules.br.exec(e)) e = e.substring(a[0].length), o += this.renderer.br();
                        else if (a = this.rules.del.exec(e)) e = e.substring(a[0].length), o += this.renderer.del(this.output(a[1]));
                        else if (a = this.rules.text.exec(e)) e = e.substring(a[0].length), o += this.renderer.text(i(this.smartypants(a[0])));
                        else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0))
                    } else e = e.substring(a[0].length), n = i(a[1]), r = n, o += this.renderer.link(r, null, n);
                    return o
                }, t.prototype.outputLink = function(e, t) {
                    var n = i(t.href),
                        r = t.title ? i(t.title) : null;
                    return "!" !== e[0].charAt(0) ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, i(e[1]))
                }, t.prototype.smartypants = function(e) {
                    return this.options.smartypants ? e.replace(/---/g, "�??").replace(/--/g, "�??").replace(/(^|[-\u2014\/(\[{"\s])'/g, "$1�??").replace(/'/g, "�??").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, "$1�??").replace(/"/g, "�?�").replace(/\.{3}/g, "�?�") : e
                }, t.prototype.mangle = function(e) {
                    if (!this.options.mangle) return e;
                    for (var t, n = "", r = e.length, i = 0; r > i; i++) t = e.charCodeAt(i), Math.random() > .5 && (t = "x" + t.toString(16)), n += "&#" + t + ";";
                    return n
                }, n.prototype.code = function(e, t, n) {
                    if (this.options.highlight) {
                        var r = this.options.highlight(e, t);
                        null != r && r !== e && (n = !0, e = r)
                    }
                    return t ? '<pre><code class="' + this.options.langPrefix + i(t, !0) + '">' + (n ? e : i(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : i(e, !0)) + "\n</code></pre>"
                }, n.prototype.blockquote = function(e) {
                    return "<blockquote>\n" + e + "</blockquote>\n"
                }, n.prototype.html = function(e) {
                    return e
                }, n.prototype.heading = function(e, t, n) {
                    return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n"
                }, n.prototype.hr = function() {
                    return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
                }, n.prototype.list = function(e, t) {
                    var n = t ? "ol" : "ul";
                    return "<" + n + ">\n" + e + "</" + n + ">\n"
                }, n.prototype.listitem = function(e) {
                    return "<li>" + e + "</li>\n"
                }, n.prototype.paragraph = function(e) {
                    return "<p>" + e + "</p>\n"
                }, n.prototype.table = function(e, t) {
                    return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n"
                }, n.prototype.tablerow = function(e) {
                    return "<tr>\n" + e + "</tr>\n"
                }, n.prototype.tablecell = function(e, t) {
                    var n = t.header ? "th" : "td",
                        r = t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">";
                    return r + e + "</" + n + ">\n"
                }, n.prototype.strong = function(e) {
                    return "<strong>" + e + "</strong>"
                }, n.prototype.em = function(e) {
                    return "<em>" + e + "</em>"
                }, n.prototype.codespan = function(e) {
                    return "<code>" + e + "</code>"
                }, n.prototype.br = function() {
                    return this.options.xhtml ? "<br/>" : "<br>"
                }, n.prototype.del = function(e) {
                    return "<del>" + e + "</del>"
                }, n.prototype.link = function(e, t, n) {
                    if (this.options.sanitize) {
                        try {
                            var r = decodeURIComponent(a(e)).replace(/[^\w:]/g, "").toLowerCase()
                        } catch (i) {
                            return ""
                        }
                        if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:")) return ""
                    }
                    var o = '<a href="' + e + '"';
                    return t && (o += ' title="' + t + '"'), o += ">" + n + "</a>"
                }, n.prototype.image = function(e, t, n) {
                    var r = '<img src="' + e + '" alt="' + n + '"';
                    return t && (r += ' title="' + t + '"'), r += this.options.xhtml ? "/>" : ">"
                }, n.prototype.text = function(e) {
                    return e
                }, r.parse = function(e, t, n) {
                    var i = new r(t, n);
                    return i.parse(e)
                }, r.prototype.parse = function(e) {
                    this.inline = new t(e.links, this.options, this.renderer), this.tokens = e.reverse();
                    for (var n = ""; this.next();) n += this.tok();
                    return n
                }, r.prototype.next = function() {
                    return this.token = this.tokens.pop()
                }, r.prototype.peek = function() {
                    return this.tokens[this.tokens.length - 1] || 0
                }, r.prototype.parseText = function() {
                    for (var e = this.token.text;
                        "text" === this.peek().type;) e += "\n" + this.next().text;
                    return this.inline.output(e)
                }, r.prototype.tok = function() {
                    switch (this.token.type) {
                        case "space":
                            return "";
                        case "hr":
                            return this.renderer.hr();
                        case "heading":
                            return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
                        case "code":
                            return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                        case "table":
                            var e, t, n, r, i, a = "",
                                o = "";
                            for (n = "", e = 0; e < this.token.header.length; e++) r = {
                                header: !0,
                                align: this.token.align[e]
                            }, n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
                                header: !0,
                                align: this.token.align[e]
                            });
                            for (a += this.renderer.tablerow(n), e = 0; e < this.token.cells.length; e++) {
                                for (t = this.token.cells[e], n = "", i = 0; i < t.length; i++) n += this.renderer.tablecell(this.inline.output(t[i]), {
                                    header: !1,
                                    align: this.token.align[i]
                                });
                                o += this.renderer.tablerow(n)
                            }
                            return this.renderer.table(a, o);
                        case "blockquote_start":
                            for (var o = "";
                                "blockquote_end" !== this.next().type;) o += this.tok();
                            return this.renderer.blockquote(o);
                        case "list_start":
                            for (var o = "", s = this.token.ordered;
                                "list_end" !== this.next().type;) o += this.tok();
                            return this.renderer.list(o, s);
                        case "list_item_start":
                            for (var o = "";
                                "list_item_end" !== this.next().type;) o += "text" === this.token.type ? this.parseText() : this.tok();
                            return this.renderer.listitem(o);
                        case "loose_item_start":
                            for (var o = "";
                                "list_item_end" !== this.next().type;) o += this.tok();
                            return this.renderer.listitem(o);
                        case "html":
                            var l = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
                            return this.renderer.html(l);
                        case "paragraph":
                            return this.renderer.paragraph(this.inline.output(this.token.text));
                        case "text":
                            return this.renderer.paragraph(this.parseText())
                    }
                }, s.exec = s, c.options = c.setOptions = function(e) {
                    return l(c.defaults, e), c
                }, c.defaults = {
                    gfm: !0,
                    tables: !0,
                    breaks: !1,
                    pedantic: !1,
                    sanitize: !1,
                    sanitizer: null,
                    mangle: !0,
                    smartLists: !1,
                    silent: !1,
                    highlight: null,
                    langPrefix: "lang-",
                    smartypants: !1,
                    headerPrefix: "",
                    renderer: new n,
                    xhtml: !1
                }, c.Parser = r, c.parser = r.parse, c.Renderer = n, c.Lexer = e, c.lexer = e.lex, c.InlineLexer = t, c.inlineLexer = t.output, c.parse = c, "undefined" != typeof module && "object" == typeof exports ? module.exports = c : "function" == typeof define && define.amd ? define(function() {
                    return c
                }) : this.marked = c
            }).call(function() {
                return this || ("undefined" != typeof window ? window : e)
            }())
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    144: [function(require, module, exports) {
        function e(e, t, n) {}

        function t(e, t, n) {}

        function n(e, t, n) {}

        function r(e, t, n) {}

        function i(e) {
            return e.replace(C, "&lt;").replace(y, "&gt;")
        }

        function a(e, t, n, r) {
            if (r = r || v, n = u(n), "href" === t || "src" === t) {
                if (n = b.trim(n), "#" === n) return "#";
                if ("http://" !== n.substr(0, 7) && "https://" !== n.substr(0, 8) && "mailto:" !== n.substr(0, 7) && "/" !== n[0]) return ""
            } else if ("background" === t) {
                if (G.lastIndex = 0, G.test(n)) return ""
            } else if ("style" === t) {
                if (w.lastIndex = 0, w.test(n)) return "";
                if (A.lastIndex = 0, A.test(n) && (G.lastIndex = 0, G.test(n))) return "";
                n = r.process(n)
            }
            return n = p(n)
        }

        function o(e) {
            return e.replace(S, "&quot;")
        }

        function s(e) {
            return e.replace(x, '"')
        }

        function l(e) {
            return e.replace(E, function(e, t) {
                return "x" === t[0] || "X" === t[0] ? String.fromCharCode(parseInt(t.substr(1), 16)) : String.fromCharCode(parseInt(t, 10))
            })
        }

        function c(e) {
            return e.replace(T, ":").replace(P, " ")
        }

        function d(e) {
            for (var t = "", n = 0, r = e.length; r > n; n++) t += e.charCodeAt(n) < 32 ? " " : e.charAt(n);
            return b.trim(t)
        }

        function u(e) {
            return e = s(e), e = l(e), e = c(e), e = d(e)
        }

        function p(e) {
            return e = o(e), e = i(e)
        }

        function m() {
            return ""
        }

        function g(e, t) {
            function n(t) {
                return r ? !0 : -1 !== b.indexOf(e, t)
            }

            "function" != typeof t && (t = function() {});
            var r = !Array.isArray(e),
                i = [],
                a = !1;
            return {
                onIgnoreTag: function(e, r, o) {
                    if (n(e)) {
                        if (o.isClosing) {
                            var s = "[/removed]",
                                l = o.position + s.length;
                            return i.push([a !== !1 ? a : o.position, l]), a = !1, s
                        }
                        return a || (a = o.position), "[removed]"
                    }
                    return t(e, r, o)
                },
                remove: function(e) {
                    var t = "",
                        n = 0;
                    return b.forEach(i, function(r) {
                        t += e.slice(n, r[0]), n = r[1]
                    }), t += e.slice(n)
                }
            }
        }

        function _(e) {
            return e.replace(D, "")
        }

        function f(e) {
            var t = e.split("");
            return t = t.filter(function(e) {
                var t = e.charCodeAt(0);
                return 127 === t ? !1 : 31 >= t ? 10 === t || 13 === t ? !0 : !1 : !0
            }), t.join("")
        }

        var h = require("cssfilter").FilterCSS,
            b = require("./util"),
            I = {
                a: ["target", "href", "title"],
                abbr: ["title"],
                address: [],
                area: ["shape", "coords", "href", "alt"],
                article: [],
                aside: [],
                audio: ["autoplay", "controls", "loop", "preload", "src"],
                b: [],
                bdi: ["dir"],
                bdo: ["dir"],
                big: [],
                blockquote: ["cite"],
                br: [],
                caption: [],
                center: [],
                cite: [],
                code: [],
                col: ["align", "valign", "span", "width"],
                colgroup: ["align", "valign", "span", "width"],
                dd: [],
                del: ["datetime"],
                details: ["open"],
                div: [],
                dl: [],
                dt: [],
                em: [],
                font: ["color", "size", "face"],
                footer: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                header: [],
                hr: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                ins: ["datetime"],
                li: [],
                mark: [],
                nav: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                section: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                table: ["width", "border", "align", "valign"],
                tbody: ["align", "valign"],
                td: ["width", "colspan", "align", "valign"],
                tfoot: ["align", "valign"],
                th: ["width", "colspan", "align", "valign"],
                thead: ["align", "valign"],
                tr: ["rowspan", "align", "valign"],
                tt: [],
                u: [],
                ul: [],
                video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
            },
            v = new h,
            C = /</g,
            y = />/g,
            S = /"/g,
            x = /&quot;/g,
            E = /&#([a-zA-Z0-9]*);?/gim,
            T = /&colon;?/gim,
            P = /&newline;?/gim,
            G = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,
            w = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,
            A = /u\s*r\s*l\s*\(.*/gi,
            D = /<!--[\s\S]*?-->/g;
        exports.whiteList = I, exports.onTag = e, exports.onIgnoreTag = t, exports.onTagAttr = n, exports.onIgnoreTagAttr = r, exports.safeAttrValue = a, exports.escapeHtml = i, exports.escapeQuote = o, exports.unescapeQuote = s, exports.escapeHtmlEntities = l, exports.escapeDangerHtml5Entities = c, exports.clearNonPrintableCharacter = d, exports.friendlyAttrValue = u, exports.escapeAttrValue = p, exports.onIgnoreTagStripAll = m, exports.StripTagBody = g, exports.stripCommentTag = _, exports.stripBlankChar = f, exports.cssFilter = v
    }, { "./util": 147, cssfilter: 151 }],
    145: [function(require, module, exports) {
        function e(e, t) {
            var n = new r(t);
            return n.process(e)
        }

        var t = require("./default"),
            n = require("./parser"),
            r = require("./xss");
        exports = module.exports = e, exports.FilterXSS = r;
        for (var i in t) exports[i] = t[i];
        for (var i in n) exports[i] = n[i];
        "function" == typeof define && define.amd && define(function() {
            return module.exports
        }), "undefined" != typeof window && (window.filterXSS = module.exports)
    }, { "./default": 144, "./parser": 146, "./xss": 148 }],
    146: [function(require, module, exports) {
        function e(e) {
            var t = e.indexOf(" ");
            if (-1 === t) var n = e.slice(1, -1);
            else var n = e.slice(1, t + 1);
            return n = l.trim(n).toLowerCase(), "/" === n.slice(0, 1) && (n = n.slice(1)), "/" === n.slice(-1) && (n = n.slice(0, -1)), n
        }

        function t(e) {
            return "</" === e.slice(0, 2)
        }

        function n(n, r, i) {
            "user strict";
            var a = "",
                o = 0,
                s = !1,
                l = !1,
                c = 0,
                d = n.length,
                u = "",
                p = "";
            for (c = 0; d > c; c++) {
                var m = n.charAt(c);
                if (s === !1) {
                    if ("<" === m) {
                        s = c;
                        continue
                    }
                } else if (l === !1) {
                    if ("<" === m) {
                        a += i(n.slice(o, c)), s = c, o = c;
                        continue
                    }
                    if (">" === m) {
                        a += i(n.slice(o, s)), u = n.slice(s, c + 1), p = e(u), a += r(s, a.length, p, u, t(u)), o = c + 1, s = !1;
                        continue
                    }
                    if (('"' === m || "'" === m) && "=" === n.charAt(c - 1)) {
                        l = m;
                        continue
                    }
                } else if (m === l) {
                    l = !1;
                    continue
                }
            }
            return o < n.length && (a += i(n.substr(o))), a
        }

        function r(e, t) {
            "user strict";

            function n(e, n) {
                if (e = l.trim(e), e = e.replace(c, "").toLowerCase(), !(e.length < 1)) {
                    var r = t(e, n || "");
                    r && o.push(r)
                }
            }

            for (var r = 0, o = [], d = !1, u = e.length, p = 0; u > p; p++) {
                var m, g, _ = e.charAt(p);
                if (d !== !1 || "=" !== _)
                    if (d === !1 || p !== r || '"' !== _ && "'" !== _ || "=" !== e.charAt(p - 1))
                        if (" " !== _);
                        else {
                            if (d === !1) {
                                if (g = i(e, p), -1 === g) {
                                    m = l.trim(e.slice(r, p)), n(m), d = !1, r = p + 1;
                                    continue
                                }
                                p = g - 1;
                                continue
                            }
                            if (g = a(e, p - 1), -1 === g) {
                                m = l.trim(e.slice(r, p)), m = s(m), n(d, m), d = !1, r = p + 1;
                                continue
                            }
                        }
                else {
                    if (g = e.indexOf(_, p + 1), -1 === g) break;
                    m = l.trim(e.slice(r + 1, g)), n(d, m), d = !1, p = g, r = p + 1
                } else d = e.slice(r, p), r = p + 1
            }
            return r < e.length && (d === !1 ? n(e.slice(r)) : n(d, s(l.trim(e.slice(r))))), l.trim(o.join(" "))
        }

        function i(e, t) {
            for (; t < e.length; t++) {
                var n = e[t];
                if (" " !== n) return "=" === n ? t : -1
            }
        }

        function a(e, t) {
            for (; t > 0; t--) {
                var n = e[t];
                if (" " !== n) return "=" === n ? t : -1
            }
        }

        function o(e) {
            return '"' === e[0] && '"' === e[e.length - 1] || "'" === e[0] && "'" === e[e.length - 1] ? !0 : !1
        }

        function s(e) {
            return o(e) ? e.substr(1, e.length - 2) : e
        }

        var l = require("./util"),
            c = /[^a-zA-Z0-9_:\.\-]/gim;
        exports.parseTag = n, exports.parseAttr = r
    }, { "./util": 147 }],
    147: [function(require, module, exports) {
        module.exports = {
            indexOf: function(e, t) {
                var n, r;
                if (Array.prototype.indexOf) return e.indexOf(t);
                for (n = 0, r = e.length; r > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            forEach: function(e, t, n) {
                var r, i;
                if (Array.prototype.forEach) return e.forEach(t, n);
                for (r = 0, i = e.length; i > r; r++) t.call(n, e[r], r, e)
            },
            trim: function(e) {
                return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "")
            }
        }
    }, {}],
    148: [function(require, module, exports) {
        function e(e) {
            return void 0 === e || null === e
        }

        function t(e) {
            var t = e.indexOf(" ");
            if (-1 === t) return { html: "", closing: "/" === e[e.length - 2] };
            e = l.trim(e.slice(t + 1, -1));
            var n = "/" === e[e.length - 1];
            return n && (e = l.trim(e.slice(0, -1))), { html: e, closing: n }
        }

        function n(e) {
            e = e || {}, e.stripIgnoreTag && (e.onIgnoreTag && console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'), e.onIgnoreTag = i.onIgnoreTagStripAll), e.whiteList = e.whiteList || i.whiteList, e.onTag = e.onTag || i.onTag, e.onTagAttr = e.onTagAttr || i.onTagAttr, e.onIgnoreTag = e.onIgnoreTag || i.onIgnoreTag, e.onIgnoreTagAttr = e.onIgnoreTagAttr || i.onIgnoreTagAttr, e.safeAttrValue = e.safeAttrValue || i.safeAttrValue, e.escapeHtml = e.escapeHtml || i.escapeHtml, e.css = e.css || {}, this.options = e, this.cssFilter = new r(e.css)
        }

        var r = require("cssfilter").FilterCSS,
            i = require("./default"),
            a = require("./parser"),
            o = a.parseTag,
            s = a.parseAttr,
            l = require("./util");
        n.prototype.process = function(n) {
            if (n = n || "", n = n.toString(), !n) return "";
            var r = this,
                a = r.options,
                c = a.whiteList,
                d = a.onTag,
                u = a.onIgnoreTag,
                p = a.onTagAttr,
                m = a.onIgnoreTagAttr,
                g = a.safeAttrValue,
                _ = a.escapeHtml,
                f = r.cssFilter;
            if (a.stripBlankChar && (n = i.stripBlankChar(n)), a.allowCommentTag || (n = i.stripCommentTag(n)), a.stripIgnoreTagBody) {
                var h = i.StripTagBody(a.stripIgnoreTagBody, u);
                u = h.onIgnoreTag
            } else h = !1;
            var b = o(n, function(n, r, i, a, o) {
                var h = { sourcePosition: n, position: r, isClosing: o, isWhite: i in c },
                    b = d(i, a, h);
                if (!e(b)) return b;
                if (h.isWhite) {
                    if (h.isClosing) return "</" + i + ">";
                    var I = t(a),
                        v = c[i],
                        C = s(I.html, function(t, n) {
                            var r = -1 !== l.indexOf(v, t),
                                a = p(i, t, n, r);
                            if (!e(a)) return a;
                            if (r) return n = g(i, t, n, f), n ? t + '="' + n + '"' : t;
                            var a = m(i, t, n, r);
                            return e(a) ? void 0 : a
                        }),
                        a = "<" + i;
                    return C && (a += " " + C), I.closing && (a += " /"), a += ">"
                }
                var b = u(i, a, h);
                return e(b) ? _(a) : b
            }, _);
            return h && (b = h.remove(b)), b
        }, module.exports = n
    }, { "./default": 144, "./parser": 146, "./util": 147, cssfilter: 151 }],
    149: [function(require, module, exports) {
        function e(e) {
            return void 0 === e || null === e
        }

        function t(e) {
            e = e || {}, e.whiteList = e.whiteList || n.whiteList, e.onAttr = e.onAttr || n.onAttr, e.onIgnoreAttr = e.onIgnoreAttr || n.onIgnoreAttr, this.options = e
        }

        var n = require("./default"),
            r = require("./parser");
        require("./util");
        t.prototype.process = function(t) {
            if (t = t || "", t = t.toString(), !t) return "";
            var n = this,
                i = n.options,
                a = i.whiteList,
                o = i.onAttr,
                s = i.onIgnoreAttr,
                l = r(t, function(t, n, r, i, l) {
                    var c = a[r],
                        d = !1;
                    c === !0 ? d = c : "function" == typeof c ? d = c(i) : c instanceof RegExp && (d = c.test(i)), d !== !0 && (d = !1);
                    var u = { position: n, sourcePosition: t, source: l, isWhite: d };
                    if (d) {
                        var p = o(r, i, u);
                        return e(p) ? r + ":" + i : p
                    }
                    var p = s(r, i, u);
                    return e(p) ? void 0 : p
                });
            return l
        }, module.exports = t
    }, { "./default": 150, "./parser": 152, "./util": 153 }],
    150: [function(require, module, exports) {
        function e(e, t, n) {}

        function t(e, t, n) {}

        var n = {};
        n["align-content"] = !1, n["align-items"] = !1, n["align-self"] = !1, n["alignment-adjust"] = !1, n["alignment-baseline"] = !1, n.all = !1, n["anchor-point"] = !1, n.animation = !1, n["animation-delay"] = !1, n["animation-direction"] = !1, n["animation-duration"] = !1, n["animation-fill-mode"] = !1, n["animation-iteration-count"] = !1, n["animation-name"] = !1, n["animation-play-state"] = !1, n["animation-timing-function"] = !1, n.azimuth = !1, n["backface-visibility"] = !1, n.background = !0, n["background-attachment"] = !0, n["background-clip"] = !0, n["background-color"] = !0, n["background-image"] = !0, n["background-origin"] = !0, n["background-position"] = !0, n["background-repeat"] = !0, n["background-size"] = !0, n["baseline-shift"] = !1, n.binding = !1, n.bleed = !1, n["bookmark-label"] = !1, n["bookmark-level"] = !1, n["bookmark-state"] = !1, n.border = !0, n["border-bottom"] = !0, n["border-bottom-color"] = !0, n["border-bottom-left-radius"] = !0, n["border-bottom-right-radius"] = !0, n["border-bottom-style"] = !0, n["border-bottom-width"] = !0, n["border-collapse"] = !0, n["border-color"] = !0, n["border-image"] = !0, n["border-image-outset"] = !0, n["border-image-repeat"] = !0, n["border-image-slice"] = !0, n["border-image-source"] = !0, n["border-image-width"] = !0, n["border-left"] = !0, n["border-left-color"] = !0, n["border-left-style"] = !0, n["border-left-width"] = !0, n["border-radius"] = !0, n["border-right"] = !0, n["border-right-color"] = !0, n["border-right-style"] = !0, n["border-right-width"] = !0, n["border-spacing"] = !0, n["border-style"] = !0, n["border-top"] = !0, n["border-top-color"] = !0, n["border-top-left-radius"] = !0, n["border-top-right-radius"] = !0, n["border-top-style"] = !0, n["border-top-width"] = !0, n["border-width"] = !0, n.bottom = !1, n["box-decoration-break"] = !0, n["box-shadow"] = !0, n["box-sizing"] = !0, n["box-snap"] = !0, n["box-suppress"] = !0, n["break-after"] = !0, n["break-before"] = !0, n["break-inside"] = !0, n["caption-side"] = !1, n.chains = !1, n.clear = !0, n.clip = !1, n["clip-path"] = !1, n["clip-rule"] = !1, n.color = !0, n["color-interpolation-filters"] = !0, n["column-count"] = !1, n["column-fill"] = !1, n["column-gap"] = !1, n["column-rule"] = !1, n["column-rule-color"] = !1, n["column-rule-style"] = !1, n["column-rule-width"] = !1, n["column-span"] = !1, n["column-width"] = !1, n.columns = !1, n.contain = !1, n.content = !1, n["counter-increment"] = !1, n["counter-reset"] = !1, n["counter-set"] = !1, n.crop = !1, n.cue = !1, n["cue-after"] = !1, n["cue-before"] = !1, n.cursor = !1, n.direction = !1, n.display = !0, n["display-inside"] = !0, n["display-list"] = !0, n["display-outside"] = !0, n["dominant-baseline"] = !1, n.elevation = !1, n["empty-cells"] = !1, n.filter = !1, n.flex = !1, n["flex-basis"] = !1, n["flex-direction"] = !1, n["flex-flow"] = !1, n["flex-grow"] = !1, n["flex-shrink"] = !1, n["flex-wrap"] = !1, n["float"] = !1, n["float-offset"] = !1, n["flood-color"] = !1, n["flood-opacity"] = !1, n["flow-from"] = !1, n["flow-into"] = !1, n.font = !0, n["font-family"] = !0, n["font-feature-settings"] = !0, n["font-kerning"] = !0, n["font-language-override"] = !0, n["font-size"] = !0, n["font-size-adjust"] = !0, n["font-stretch"] = !0, n["font-style"] = !0, n["font-synthesis"] = !0, n["font-variant"] = !0, n["font-variant-alternates"] = !0, n["font-variant-caps"] = !0, n["font-variant-east-asian"] = !0, n["font-variant-ligatures"] = !0, n["font-variant-numeric"] = !0, n["font-variant-position"] = !0, n["font-weight"] = !0, n.grid = !1, n["grid-area"] = !1, n["grid-auto-columns"] = !1, n["grid-auto-flow"] = !1, n["grid-auto-rows"] = !1, n["grid-column"] = !1, n["grid-column-end"] = !1, n["grid-column-start"] = !1, n["grid-row"] = !1, n["grid-row-end"] = !1, n["grid-row-start"] = !1, n["grid-template"] = !1, n["grid-template-areas"] = !1, n["grid-template-columns"] = !1, n["grid-template-rows"] = !1, n["hanging-punctuation"] = !1, n.height = !0, n.hyphens = !1, n.icon = !1, n["image-orientation"] = !1, n["image-resolution"] = !1, n["ime-mode"] = !1, n["initial-letters"] = !1, n["inline-box-align"] = !1, n["justify-content"] = !1, n["justify-items"] = !1, n["justify-self"] = !1, n.left = !1, n["letter-spacing"] = !0, n["lighting-color"] = !0, n["line-box-contain"] = !1, n["line-break"] = !1, n["line-grid"] = !1, n["line-height"] = !1, n["line-snap"] = !1, n["line-stacking"] = !1, n["line-stacking-ruby"] = !1, n["line-stacking-shift"] = !1, n["line-stacking-strategy"] = !1, n["list-style"] = !0, n["list-style-image"] = !0, n["list-style-position"] = !0, n["list-style-type"] = !0, n.margin = !0, n["margin-bottom"] = !0, n["margin-left"] = !0, n["margin-right"] = !0, n["margin-top"] = !0, n["marker-offset"] = !1, n["marker-side"] = !1, n.marks = !1, n.mask = !1, n["mask-box"] = !1, n["mask-box-outset"] = !1, n["mask-box-repeat"] = !1, n["mask-box-slice"] = !1, n["mask-box-source"] = !1, n["mask-box-width"] = !1, n["mask-clip"] = !1, n["mask-image"] = !1, n["mask-origin"] = !1, n["mask-position"] = !1, n["mask-repeat"] = !1, n["mask-size"] = !1, n["mask-source-type"] = !1, n["mask-type"] = !1, n["max-height"] = !0, n["max-lines"] = !1, n["max-width"] = !0, n["min-height"] = !0, n["min-width"] = !0, n["move-to"] = !1, n["nav-down"] = !1, n["nav-index"] = !1, n["nav-left"] = !1, n["nav-right"] = !1, n["nav-up"] = !1, n["object-fit"] = !1, n["object-position"] = !1, n.opacity = !1, n.order = !1, n.orphans = !1, n.outline = !1, n["outline-color"] = !1, n["outline-offset"] = !1, n["outline-style"] = !1, n["outline-width"] = !1, n.overflow = !1, n["overflow-wrap"] = !1, n["overflow-x"] = !1, n["overflow-y"] = !1, n.padding = !0, n["padding-bottom"] = !0, n["padding-left"] = !0, n["padding-right"] = !0, n["padding-top"] = !0, n.page = !1, n["page-break-after"] = !1, n["page-break-before"] = !1, n["page-break-inside"] = !1, n["page-policy"] = !1, n.pause = !1, n["pause-after"] = !1, n["pause-before"] = !1, n.perspective = !1, n["perspective-origin"] = !1, n.pitch = !1, n["pitch-range"] = !1, n["play-during"] = !1, n.position = !1, n["presentation-level"] = !1, n.quotes = !1, n["region-fragment"] = !1, n.resize = !1, n.rest = !1, n["rest-after"] = !1, n["rest-before"] = !1, n.richness = !1, n.right = !1, n.rotation = !1, n["rotation-point"] = !1, n["ruby-align"] = !1, n["ruby-merge"] = !1, n["ruby-position"] = !1, n["shape-image-threshold"] = !1, n["shape-outside"] = !1, n["shape-margin"] = !1, n.size = !1, n.speak = !1, n["speak-as"] = !1, n["speak-header"] = !1, n["speak-numeral"] = !1, n["speak-punctuation"] = !1, n["speech-rate"] = !1, n.stress = !1, n["string-set"] = !1, n["tab-size"] = !1, n["table-layout"] = !1, n["text-align"] = !0, n["text-align-last"] = !0, n["text-combine-upright"] = !0, n["text-decoration"] = !0, n["text-decoration-color"] = !0, n["text-decoration-line"] = !0, n["text-decoration-skip"] = !0, n["text-decoration-style"] = !0, n["text-emphasis"] = !0, n["text-emphasis-color"] = !0, n["text-emphasis-position"] = !0, n["text-emphasis-style"] = !0, n["text-height"] = !0, n["text-indent"] = !0, n["text-justify"] = !0, n["text-orientation"] = !0, n["text-overflow"] = !0, n["text-shadow"] = !0, n["text-space-collapse"] = !0, n["text-transform"] = !0, n["text-underline-position"] = !0, n["text-wrap"] = !0, n.top = !1, n.transform = !1, n["transform-origin"] = !1, n["transform-style"] = !1, n.transition = !1, n["transition-delay"] = !1, n["transition-duration"] = !1, n["transition-property"] = !1, n["transition-timing-function"] = !1, n["unicode-bidi"] = !1, n["vertical-align"] = !1, n.visibility = !1, n["voice-balance"] = !1, n["voice-duration"] = !1, n["voice-family"] = !1, n["voice-pitch"] = !1, n["voice-range"] = !1, n["voice-rate"] = !1, n["voice-stress"] = !1, n["voice-volume"] = !1, n.volume = !1, n["white-space"] = !1, n.widows = !1, n.width = !0, n["will-change"] = !1, n["word-break"] = !0, n["word-spacing"] = !0, n["word-wrap"] = !0, n["wrap-flow"] = !1, n["wrap-through"] = !1, n["writing-mode"] = !1, n["z-index"] = !1, exports.whiteList = n, exports.onAttr = e, exports.onIgnoreAttr = t
    }, {}],
    151: [function(require, module, exports) {
        function e(e, t) {
            var r = new n(t);
            return r.process(e)
        }

        var t = require("./default"),
            n = require("./css");
        exports = module.exports = e, exports.FilterCSS = n;
        for (var r in t) exports[r] = t[r];
        "function" == typeof define && define.amd && define(function() {
            return module.exports
        }), "undefined" != typeof window && (window.filterCSS = module.exports)
    }, { "./css": 149, "./default": 150 }],
    152: [function(require, module, exports) {
        function e(e, n) {
            function r() {
                if (!a) {
                    var r = t.trim(e.slice(o, s)),
                        i = r.indexOf(":");
                    if (-1 !== i) {
                        var c = t.trim(r.slice(0, i)),
                            d = t.trim(r.slice(i + 1));
                        if (c) {
                            var u = n(o, l.length, c, d, r);
                            u && (l += u + "; ")
                        }
                    }
                }
                o = s + 1
            }

            e = t.trimRight(e), ";" !== e[e.length - 1] && (e += ";");
            for (var i = e.length, a = !1, o = 0, s = 0, l = ""; i > s; s++) {
                var c = e[s];
                if ("/" === c && "*" === e[s + 1]) {
                    var d = e.indexOf("*/", s + 2);
                    if (-1 === d) break;
                    s = d + 1, o = s + 1, a = !1
                } else "(" === c ? a = !0 : ")" === c ? a = !1 : ";" === c ? a || r() : "\n" === c && r()
            }
            return t.trim(l)
        }

        var t = require("./util");
        module.exports = e
    }, { "./util": 153 }],
    153: [function(require, module, exports) {
        module.exports = {
            indexOf: function(e, t) {
                var n, r;
                if (Array.prototype.indexOf) return e.indexOf(t);
                for (n = 0, r = e.length; r > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            forEach: function(e, t, n) {
                var r, i;
                if (Array.prototype.forEach) return e.forEach(t, n);
                for (r = 0, i = e.length; i > r; r++) t.call(n, e[r], r, e)
            },
            trim: function(e) {
                return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "")
            },
            trimRight: function(e) {
                return String.prototype.trimRight ? e.trimRight() : e.replace(/(\s*$)/g, "")
            }
        }
    }, {}]
}, {}, [2]);