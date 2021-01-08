!function ($) { 'use strict'; function Gumby() { this.$dom = $(document); this.$html = this.$dom.find('html'); this.isOldie = !!this.$html.hasClass('oldie'); this.click = 'click'; this.onReady = this.onOldie = this.onTouch = false; this.autoInit = $('script[gumby-init]').attr('gumby-init') === 'false' ? false : true; this.debugMode = Boolean($('script[gumby-debug]').length); this.touchDevice = !!(Modernizr.touch || window.navigator.userAgent.indexOf("Windows Phone") > 0); this.gumbyTouch = false; this.touchEvents = 'js/libs'; this.breakpoint = Number($('script[gumby-breakpoint]').attr('gumby-breakpoint')) || 768; this.touchEventsLoaded = false; this.uiModulesReady = false; this.uiModules = {}; this.inits = {}; var touch = $('script[gumby-touch]').attr('gumby-touch'), path = $('script[gumby-path]').attr('gumby-path'); if (touch === 'false') { this.touchEvents = false; } else { if (touch) { this.touchEvents = touch } else if (path) { this.touchEvents = path } } if (this.touchDevice) { this.click += ' tap' } if (this.touchDevice && $(window).width() < this.breakpoint) { this.$html.addClass('gumby-touch'); this.gumbyTouch = true } else { this.$html.addClass('gumby-no-touch') } if (this.debugMode) { this.debug('Gumby is in debug mode') } } Gumby.prototype.init = function (options) { var scope = this, opts = options ? options : {}; this.$dom.ready(function () { if (opts.debug) { scope.debugMode = true } scope.debug("Initializing Gumby"); var mods = opts.uiModules ? opts.uiModules : false; scope.initUIModules(mods); if (scope.onReady) { scope.onReady() } if (scope.isOldie && scope.onOldie) { scope.onOldie() } if (Modernizr.touch && scope.onTouch) { scope.onTouch() } }); return this }; Gumby.prototype.helpers = function () { if (this.onReady) { this.onReady() } if (this.isOldie && this.onOldie) { this.onOldie() } if (Modernizr.touch && this.onTouch) { this.onTouch() } }; Gumby.prototype.ready = function (code) { if (code && typeof code === 'function') { this.onReady = code } return this }; Gumby.prototype.oldie = function (code) { if (code && typeof code === 'function') { this.onOldie = code } return this }; Gumby.prototype.touch = function (code) { if (code && typeof code === 'function') { this.onTouch = code } return this }; Gumby.prototype.console = function (type, data) { if (!this.debugMode || !window.console) { return } console[console[type] ? type : 'log'](data.length > 1 ? Array.prototype.slice.call(data) : data[0]) }; Gumby.prototype.log = function () { this.console('log', arguments) }; Gumby.prototype.debug = function () { this.console('debug', arguments) }; Gumby.prototype.warn = function () { this.console('warn', arguments) }; Gumby.prototype.error = function () { this.console('error', arguments) }; Gumby.prototype.dump = function () { return { $dom: this.$dom, isOldie: this.isOldie, touchEvents: this.touchEvents, debugMode: this.debugMode, autoInit: this.autoInit, uiModules: this.uiModules, click: this.click } }; Gumby.prototype.selectAttr = function () { var i = 0; for (; i < arguments.length; i += 1) { var attr = arguments[i], dataAttr = 'data-' + arguments[i], gumbyAttr = 'gumby-' + arguments[i]; if (this.is('[' + dataAttr + ']')) { return this.attr(dataAttr) ? this.attr(dataAttr) : true; } else if (this.is('[' + gumbyAttr + ']')) { return this.attr(gumbyAttr) ? this.attr(gumbyAttr) : true; } else if (this.is('[' + attr + ']')) { return this.attr(attr) ? this.attr(attr) : true } } return false }; Gumby.prototype.addInitalisation = function (ref, code) { this.inits[ref] = code }; Gumby.prototype.initialize = function (ref, all) { if (typeof ref === 'object') { var i = 0; for (i; i < ref.length; i += 1) { if (!this.inits[ref[i]] || typeof this.inits[ref[i]] !== 'function') { this.error('Error initializing module: ' + ref[i]); continue } this.inits[ref[i]](all) } } else if (this.inits[ref] && typeof this.inits[ref] === 'function') { this.inits[ref](all) } else { this.error('Error initializing module: ' + ref) } return this }; Gumby.prototype.UIModule = function (data) { var module = data.module; this.uiModules[module] = data }; Gumby.prototype.initUIModules = function (mods) { var x, m, arr = this.uiModules; if (mods) { arr = mods } for (x in arr) { m = mods ? arr[x] : x; this.uiModules[m].init() } }; window.Gumby = new Gumby() }(jQuery);