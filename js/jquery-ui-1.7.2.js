/*
 * jQuery UI 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui || (function(c) {
    var i = c.fn.remove,
        d = c.browser.mozilla && (parseFloat(c.browser.version) < 1.9);
    c.ui = {
        version: "1.7.2",
        plugin: {
            add: function(k, l, n) {
                var m = c.ui[k].prototype;
                for (var j in n) {
                    m.plugins[j] = m.plugins[j] || [];
                    m.plugins[j].push([l, n[j]])
                }
            },
            call: function(j, l, k) {
                var n = j.plugins[l];
                if (!n || !j.element[0].parentNode) {
                    return
                }
                for (var m = 0; m < n.length; m++) {
                    if (j.options[n[m][0]]) {
                        n[m][1].apply(j.element, k)
                    }
                }
            }
        },
        contains: function(k, j) {
            return document.compareDocumentPosition ? k.compareDocumentPosition(j) & 16 : k !== j && k.contains(j)
        },
        hasScroll: function(m, k) {
            if (c(m).css("overflow") == "hidden") {
                return false
            }
            var j = (k && k == "left") ? "scrollLeft" : "scrollTop",
                l = false;
            if (m[j] > 0) {
                return true
            }
            m[j] = 1;
            l = (m[j] > 0);
            m[j] = 0;
            return l
        },
        isOverAxis: function(k, j, l) {
            return (k > j) && (k < (j + l))
        },
        isOver: function(o, k, n, m, j, l) {
            return c.ui.isOverAxis(o, n, j) && c.ui.isOverAxis(k, m, l)
        },
        keyCode: {
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    if (d) {
        var f = c.attr,
            e = c.fn.removeAttr,
            h = "http://www.w3.org/2005/07/aaa",
            a = /^aria-/,
            b = /^wairole:/;
        c.attr = function(k, j, l) {
            var m = l !== undefined;
            return (j == "role" ? (m ? f.call(this, k, j, "wairole:" + l) : (f.apply(this, arguments) || "").replace(b, "")) : (a.test(j) ? (m ? k.setAttributeNS(h, j.replace(a, "aaa:"), l) : f.call(this, k, j.replace(a, "aaa:"))) : f.apply(this, arguments)))
        };
        c.fn.removeAttr = function(j) {
            return (a.test(j) ? this.each(function() {
                this.removeAttributeNS(h, j.replace(a, ""))
            }) : e.call(this, j))
        }
    }
    c.fn.extend({
        remove: function() {
            c("*", this).add(this).each(function() {
                c(this).triggerHandler("remove")
            });
            return i.apply(this, arguments)
        },
        enableSelection: function() {
            return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui")
        },
        disableSelection: function() {
            return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {
                return false
            })
        },
        scrollParent: function() {
            var j;
            if ((c.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                j = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test(c.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            } else {
                j = this.parents().filter(function() {
                    return (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !j.length ? c(document) : j
        }
    });
    c.extend(c.expr[":"], {
        data: function(l, k, j) {
            return !!c.data(l, j[3])
        },
        focusable: function(k) {
            var l = k.nodeName.toLowerCase(),
                j = c.attr(k, "tabindex");
            return (/input|select|textarea|button|object/.test(l) ? !k.disabled : "a" == l || "area" == l ? k.href || !isNaN(j) : !isNaN(j)) && !c(k)["area" == l ? "parents" : "closest"](":hidden").length
        },
        tabbable: function(k) {
            var j = c.attr(k, "tabindex");
            return (isNaN(j) || j >= 0) && c(k).is(":focusable")
        }
    });

    function g(m, n, o, l) {
        function k(q) {
            var p = c[m][n][q] || [];
            return (typeof p == "string" ? p.split(/,?\s+/) : p)
        }
        var j = k("getter");
        if (l.length == 1 && typeof l[0] == "string") {
            j = j.concat(k("getterSetter"))
        }
        return (c.inArray(o, j) != -1)
    }
    c.widget = function(k, j) {
        var l = k.split(".")[0];
        k = k.split(".")[1];
        c.fn[k] = function(p) {
            var n = (typeof p == "string"),
                o = Array.prototype.slice.call(arguments, 1);
            if (n && p.substring(0, 1) == "_") {
                return this
            }
            if (n && g(l, k, p, o)) {
                var m = c.data(this[0], k);
                return (m ? m[p].apply(m, o) : undefined)
            }
            return this.each(function() {
                var q = c.data(this, k);
                (!q && !n && c.data(this, k, new c[l][k](this, p))._init());
                (q && n && c.isFunction(q[p]) && q[p].apply(q, o))
            })
        };
        c[l] = c[l] || {};
        c[l][k] = function(o, n) {
            var m = this;
            this.namespace = l;
            this.widgetName = k;
            this.widgetEventPrefix = c[l][k].eventPrefix || k;
            this.widgetBaseClass = l + "-" + k;
            this.options = c.extend({}, c.widget.defaults, c[l][k].defaults, c.metadata && c.metadata.get(o)[k], n);
            this.element = c(o).bind("setData." + k, function(q, p, r) {
                if (q.target == o) {
                    return m._setData(p, r)
                }
            }).bind("getData." + k, function(q, p) {
                if (q.target == o) {
                    return m._getData(p)
                }
            }).bind("remove", function() {
                return m.destroy()
            })
        };
        c[l][k].prototype = c.extend({}, c.widget.prototype, j);
        c[l][k].getterSetter = "option"
    };
    c.widget.prototype = {
        _init: function() {},
        destroy: function() {
            this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").removeAttr("aria-disabled")
        },
        option: function(l, m) {
            var k = l,
                j = this;
            if (typeof l == "string") {
                if (m === undefined) {
                    return this._getData(l)
                }
                k = {};
                k[l] = m
            }
            c.each(k, function(n, o) {
                j._setData(n, o)
            })
        },
        _getData: function(j) {
            return this.options[j]
        },
        _setData: function(j, k) {
            this.options[j] = k;
            if (j == "disabled") {
                this.element[k ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", k)
            }
        },
        enable: function() {
            this._setData("disabled", false)
        },
        disable: function() {
            this._setData("disabled", true)
        },
        _trigger: function(l, m, n) {
            var p = this.options[l],
                j = (l == this.widgetEventPrefix ? l : this.widgetEventPrefix + l);
            m = c.Event(m);
            m.type = j;
            if (m.originalEvent) {
                for (var k = c.event.props.length, o; k;) {
                    o = c.event.props[--k];
                    m[o] = m.originalEvent[o]
                }
            }
            this.element.trigger(m, n);
            return !(c.isFunction(p) && p.call(this.element[0], m, n) === false || m.isDefaultPrevented())
        }
    };
    c.widget.defaults = {
        disabled: false
    };
    c.ui.mouse = {
        _mouseInit: function() {
            var j = this;
            this.element.bind("mousedown." + this.widgetName, function(k) {
                return j._mouseDown(k)
            }).bind("click." + this.widgetName, function(k) {
                if (j._preventClickEvent) {
                    j._preventClickEvent = false;
                    k.stopImmediatePropagation();
                    return false
                }
            });
            if (c.browser.msie) {
                this._mouseUnselectable = this.element.attr("unselectable");
                this.element.attr("unselectable", "on")
            }
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            (c.browser.msie && this.element.attr("unselectable", this._mouseUnselectable))
        },
        _mouseDown: function(l) {
            l.originalEvent = l.originalEvent || {};
            if (l.originalEvent.mouseHandled) {
                return
            }(this._mouseStarted && this._mouseUp(l));
            this._mouseDownEvent = l;
            var k = this,
                m = (l.which == 1),
                j = (typeof this.options.cancel == "string" ? c(l.target).parents().add(l.target).filter(this.options.cancel).length : false);
            if (!m || j || !this._mouseCapture(l)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    k.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(l) && this._mouseDelayMet(l)) {
                this._mouseStarted = (this._mouseStart(l) !== false);
                if (!this._mouseStarted) {
                    l.preventDefault();
                    return true
                }
            }
            this._mouseMoveDelegate = function(n) {
                return k._mouseMove(n)
            };
            this._mouseUpDelegate = function(n) {
                return k._mouseUp(n)
            };
            c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            (c.browser.safari || l.preventDefault());
            l.originalEvent.mouseHandled = true;
            return true
        },
        _mouseMove: function(j) {
            if (c.browser.msie && !j.button) {
                return this._mouseUp(j)
            }
            if (this._mouseStarted) {
                this._mouseDrag(j);
                return j.preventDefault()
            }
            if (this._mouseDistanceMet(j) && this._mouseDelayMet(j)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, j) !== false);
                (this._mouseStarted ? this._mouseDrag(j) : this._mouseUp(j))
            }
            return !this._mouseStarted
        },
        _mouseUp: function(j) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = (j.target == this._mouseDownEvent.target);
                this._mouseStop(j)
            }
            return false
        },
        _mouseDistanceMet: function(j) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - j.pageX), Math.abs(this._mouseDownEvent.pageY - j.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function(j) {
            return this.mouseDelayMet
        },
        _mouseStart: function(j) {},
        _mouseDrag: function(j) {},
        _mouseStop: function(j) {},
        _mouseCapture: function(j) {
            return true
        }
    };
    c.ui.mouse.defaults = {
        cancel: null,
        distance: 1,
        delay: 0
    }
})(jQuery);;
/*
 * jQuery UI Effects 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects || (function(d) {
    d.effects = {
        version: "1.7.2",
        save: function(g, h) {
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.data("ec.storage." + h[f], g[0].style[h[f]])
                }
            }
        },
        restore: function(g, h) {
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.css(h[f], g.data("ec.storage." + h[f]))
                }
            }
        },
        setMode: function(f, g) {
            if (g == "toggle") {
                g = f.is(":hidden") ? "show" : "hide"
            }
            return g
        },
        getBaseline: function(g, h) {
            var i, f;
            switch (g[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = 0.5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = g[0] / h.height
            }
            switch (g[1]) {
                case "left":
                    f = 0;
                    break;
                case "center":
                    f = 0.5;
                    break;
                case "right":
                    f = 1;
                    break;
                default:
                    f = g[1] / h.width
            }
            return {
                x: f,
                y: i
            }
        },
        createWrapper: function(f) {
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent()
            }
            var g = {
                width: f.outerWidth(true),
                height: f.outerHeight(true),
                "float": f.css("float")
            };
            f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
            var j = f.parent();
            if (f.css("position") == "static") {
                j.css({
                    position: "relative"
                });
                f.css({
                    position: "relative"
                })
            } else {
                var i = f.css("top");
                if (isNaN(parseInt(i, 10))) {
                    i = "auto"
                }
                var h = f.css("left");
                if (isNaN(parseInt(h, 10))) {
                    h = "auto"
                }
                j.css({
                    position: f.css("position"),
                    top: i,
                    left: h,
                    zIndex: f.css("z-index")
                }).show();
                f.css({
                    position: "relative",
                    top: 0,
                    left: 0
                })
            }
            j.css(g);
            return j
        },
        removeWrapper: function(f) {
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent().replaceWith(f)
            }
            return f
        },
        setTransition: function(g, i, f, h) {
            h = h || {};
            d.each(i, function(k, j) {
                unit = g.cssUnit(j);
                if (unit[0] > 0) {
                    h[j] = unit[0] * f + unit[1]
                }
            });
            return h
        },
        animateClass: function(h, i, k, j) {
            var f = (typeof k == "function" ? k : (j ? j : null));
            var g = (typeof k == "string" ? k : null);
            return this.each(function() {
                var q = {};
                var o = d(this);
                var p = o.attr("style") || "";
                if (typeof p == "object") {
                    p = p.cssText
                }
                if (h.toggle) {
                    o.hasClass(h.toggle) ? h.remove = h.toggle : h.add = h.toggle
                }
                var l = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.addClass(h.add)
                }
                if (h.remove) {
                    o.removeClass(h.remove)
                }
                var m = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.removeClass(h.add)
                }
                if (h.remove) {
                    o.addClass(h.remove)
                }
                for (var r in m) {
                    if (typeof m[r] != "function" && m[r] && r.indexOf("Moz") == -1 && r.indexOf("length") == -1 && m[r] != l[r] && (r.match(/color/i) || (!r.match(/color/i) && !isNaN(parseInt(m[r], 10)))) && (l.position != "static" || (l.position == "static" && !r.match(/left|top|bottom|right/)))) {
                        q[r] = m[r]
                    }
                }
                o.animate(q, i, g, function() {
                    if (typeof d(this).attr("style") == "object") {
                        d(this).attr("style")["cssText"] = "";
                        d(this).attr("style")["cssText"] = p
                    } else {
                        d(this).attr("style", p)
                    }
                    if (h.add) {
                        d(this).addClass(h.add)
                    }
                    if (h.remove) {
                        d(this).removeClass(h.remove)
                    }
                    if (f) {
                        f.apply(this, arguments)
                    }
                })
            })
        }
    };

    function c(g, f) {
        var i = g[1] && g[1].constructor == Object ? g[1] : {};
        if (f) {
            i.mode = f
        }
        var h = g[1] && g[1].constructor != Object ? g[1] : (i.duration ? i.duration : g[2]);
        h = d.fx.off ? 0 : typeof h === "number" ? h : d.fx.speeds[h] || d.fx.speeds._default;
        var j = i.callback || (d.isFunction(g[1]) && g[1]) || (d.isFunction(g[2]) && g[2]) || (d.isFunction(g[3]) && g[3]);
        return [g[0], i, h, j]
    }
    d.fn.extend({
        _show: d.fn.show,
        _hide: d.fn.hide,
        __toggle: d.fn.toggle,
        _addClass: d.fn.addClass,
        _removeClass: d.fn.removeClass,
        _toggleClass: d.fn.toggleClass,
        effect: function(g, f, h, i) {
            return d.effects[g] ? d.effects[g].call(this, {
                method: g,
                options: f || {},
                duration: h,
                callback: i
            }) : null
        },
        show: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._show.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "show"))
            }
        },
        hide: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._hide.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "hide"))
            }
        },
        toggle: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])) || (d.isFunction(arguments[0]) || typeof arguments[0] == "boolean")) {
                return this.__toggle.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "toggle"))
            }
        },
        addClass: function(g, f, i, h) {
            return f ? d.effects.animateClass.apply(this, [{
                add: g
            }, f, i, h]) : this._addClass(g)
        },
        removeClass: function(g, f, i, h) {
            return f ? d.effects.animateClass.apply(this, [{
                remove: g
            }, f, i, h]) : this._removeClass(g)
        },
        toggleClass: function(g, f, i, h) {
            return ((typeof f !== "boolean") && f) ? d.effects.animateClass.apply(this, [{
                toggle: g
            }, f, i, h]) : this._toggleClass(g, f)
        },
        morph: function(f, h, g, j, i) {
            return d.effects.animateClass.apply(this, [{
                add: h,
                remove: f
            }, g, j, i])
        },
        switchClass: function() {
            return this.morph.apply(this, arguments)
        },
        cssUnit: function(f) {
            var g = this.css(f),
                h = [];
            d.each(["em", "px", "%", "pt"], function(j, k) {
                if (g.indexOf(k) > 0) {
                    h = [parseFloat(g), k]
                }
            });
            return h
        }
    });
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(g, f) {
        d.fx.step[f] = function(h) {
            if (h.state == 0) {
                h.start = e(h.elem, f);
                h.end = b(h.end)
            }
            h.elem.style[f] = "rgb(" + [Math.max(Math.min(parseInt((h.pos * (h.end[0] - h.start[0])) + h.start[0], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[1] - h.start[1])) + h.start[1], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[2] - h.start[2])) + h.start[2], 10), 255), 0)].join(",") + ")"
        }
    });

    function b(g) {
        var f;
        if (g && g.constructor == Array && g.length == 3) {
            return g
        }
        if (f = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)) {
            return [parseInt(f[1], 10), parseInt(f[2], 10), parseInt(f[3], 10)]
        }
        if (f = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)) {
            return [parseFloat(f[1]) * 2.55, parseFloat(f[2]) * 2.55, parseFloat(f[3]) * 2.55]
        }
        if (f = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)) {
            return [parseInt(f[1], 16), parseInt(f[2], 16), parseInt(f[3], 16)]
        }
        if (f = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)) {
            return [parseInt(f[1] + f[1], 16), parseInt(f[2] + f[2], 16), parseInt(f[3] + f[3], 16)]
        }
        if (f = /rgba\(0, 0, 0, 0\)/.exec(g)) {
            return a.transparent
        }
        return a[d.trim(g).toLowerCase()]
    }

    function e(h, f) {
        var g;
        do {
            g = d.curCSS(h, f);
            if (g != "" && g != "transparent" || d.nodeName(h, "body")) {
                break
            }
            f = "backgroundColor"
        } while (h = h.parentNode);
        return b(g)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    d.easing.jswing = d.easing.swing;
    d.extend(d.easing, {
        def: "easeOutQuad",
        swing: function(g, h, f, j, i) {
            return d.easing[d.easing.def](g, h, f, j, i)
        },
        easeInQuad: function(g, h, f, j, i) {
            return j * (h /= i) * h + f
        },
        easeOutQuad: function(g, h, f, j, i) {
            return -j * (h /= i) * (h - 2) + f
        },
        easeInOutQuad: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h + f
            }
            return -j / 2 * ((--h) * (h - 2) - 1) + f
        },
        easeInCubic: function(g, h, f, j, i) {
            return j * (h /= i) * h * h + f
        },
        easeOutCubic: function(g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h + 1) + f
        },
        easeInOutCubic: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h + 2) + f
        },
        easeInQuart: function(g, h, f, j, i) {
            return j * (h /= i) * h * h * h + f
        },
        easeOutQuart: function(g, h, f, j, i) {
            return -j * ((h = h / i - 1) * h * h * h - 1) + f
        },
        easeInOutQuart: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h + f
            }
            return -j / 2 * ((h -= 2) * h * h * h - 2) + f
        },
        easeInQuint: function(g, h, f, j, i) {
            return j * (h /= i) * h * h * h * h + f
        },
        easeOutQuint: function(g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h * h * h + 1) + f
        },
        easeInOutQuint: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h * h * h + 2) + f
        },
        easeInSine: function(g, h, f, j, i) {
            return -j * Math.cos(h / i * (Math.PI / 2)) + j + f
        },
        easeOutSine: function(g, h, f, j, i) {
            return j * Math.sin(h / i * (Math.PI / 2)) + f
        },
        easeInOutSine: function(g, h, f, j, i) {
            return -j / 2 * (Math.cos(Math.PI * h / i) - 1) + f
        },
        easeInExpo: function(g, h, f, j, i) {
            return (h == 0) ? f : j * Math.pow(2, 10 * (h / i - 1)) + f
        },
        easeOutExpo: function(g, h, f, j, i) {
            return (h == i) ? f + j : j * (-Math.pow(2, -10 * h / i) + 1) + f
        },
        easeInOutExpo: function(g, h, f, j, i) {
            if (h == 0) {
                return f
            }
            if (h == i) {
                return f + j
            }
            if ((h /= i / 2) < 1) {
                return j / 2 * Math.pow(2, 10 * (h - 1)) + f
            }
            return j / 2 * (-Math.pow(2, -10 * --h) + 2) + f
        },
        easeInCirc: function(g, h, f, j, i) {
            return -j * (Math.sqrt(1 - (h /= i) * h) - 1) + f
        },
        easeOutCirc: function(g, h, f, j, i) {
            return j * Math.sqrt(1 - (h = h / i - 1) * h) + f
        },
        easeInOutCirc: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return -j / 2 * (Math.sqrt(1 - h * h) - 1) + f
            }
            return j / 2 * (Math.sqrt(1 - (h -= 2) * h) + 1) + f
        },
        easeInElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return -(h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
        },
        easeOutElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return h * Math.pow(2, -10 * i) * Math.sin((i * l - j) * (2 * Math.PI) / k) + m + f
        },
        easeInOutElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l / 2) == 2) {
                return f + m
            }
            if (!k) {
                k = l * (0.3 * 1.5)
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            if (i < 1) {
                return -0.5 * (h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
            }
            return h * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k) * 0.5 + m + f
        },
        easeInBack: function(g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            return k * (h /= j) * h * ((i + 1) * h - i) + f
        },
        easeOutBack: function(g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            return k * ((h = h / j - 1) * h * ((i + 1) * h + i) + 1) + f
        },
        easeInOutBack: function(g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            if ((h /= j / 2) < 1) {
                return k / 2 * (h * h * (((i *= (1.525)) + 1) * h - i)) + f
            }
            return k / 2 * ((h -= 2) * h * (((i *= (1.525)) + 1) * h + i) + 2) + f
        },
        easeInBounce: function(g, h, f, j, i) {
            return j - d.easing.easeOutBounce(g, i - h, 0, j, i) + f
        },
        easeOutBounce: function(g, h, f, j, i) {
            if ((h /= i) < (1 / 2.75)) {
                return j * (7.5625 * h * h) + f
            } else {
                if (h < (2 / 2.75)) {
                    return j * (7.5625 * (h -= (1.5 / 2.75)) * h + 0.75) + f
                } else {
                    if (h < (2.5 / 2.75)) {
                        return j * (7.5625 * (h -= (2.25 / 2.75)) * h + 0.9375) + f
                    } else {
                        return j * (7.5625 * (h -= (2.625 / 2.75)) * h + 0.984375) + f
                    }
                }
            }
        },
        easeInOutBounce: function(g, h, f, j, i) {
            if (h < i / 2) {
                return d.easing.easeInBounce(g, h * 2, 0, j, i) * 0.5 + f
            }
            return d.easing.easeOutBounce(g, h * 2 - i, 0, j, i) * 0.5 + j * 0.5 + f
        }
    })
})(jQuery);;