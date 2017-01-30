/*!
 * Tackle.js v1.2.1
 * Docs & License: http://www.tacklehealth.com/docs
 * (c) 2016 Tackle, Inc.
 */

(function() {
    var a, b, c, d, e, f, g, h, i, j = {}.hasOwnProperty,
        k = function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) j.call(b, d) && (a[d] = b[d]);
            return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
        };
    if (g = "https://www.tacklehealth.com", c = "https://wwww.tacklehealth.com", d = !!/tacklehealth\.com$/.test("undefined" != typeof window && null !== window ? window.location.host : void 0), b = "console" in window && "warn" in window.console, !d && "querySelectorAll" in document && b && (f = document.querySelectorAll('script[src^="' + g + '"]'), f.length || console.warn("It looks like Tackle.js is not being loaded from https://www.tacklehealth.com/Tackle.js. Tackle does not support serving Tackle.js from your own domain. You will miss any updates we make to the library.")), this.Tackle) return !b || this.Tackle.isDoubleLoaded || this.Tackle.earlyError || console.warn("It looks like Tackle.js was loaded more than one time. Please only load it once per page."), void(this.Tackle.isDoubleLoaded = !0);
    this.Tackle = function() {
        function a() {}
        return a.version = 1, a.endpoint = "https://www.tacklehealth.com:3456", 
        a.setKey = function(b) {
            return a.key = b, a.utils.validateKey(a.key)
        }, a.formatParams = function(params){
            return (params != null && params != "") ? "?" + Object.keys(params).map(function(key){ return key+"="+encodeURIComponent(params[key]) }).join("&") : ""
        }, a.request = function(method, route, params, body, callback){
            var loginRequest = new XMLHttpRequest();
            loginRequest.onreadystatechange = function() {
                if (loginRequest.readyState === 4) {
                    if (loginRequest.status === 200) {
                        callback(loginRequest.status, Tackle.requestSuccess(loginRequest.responseText));
                    } else {
                        callback(loginRequest.status, Tackle.requestError(loginRequest.status, loginRequest.responseText));
                    }
                }
            }
            var url = Tackle.endpoint + route;
            var fullUrl = url.concat(Tackle.formatParams(params));

            loginRequest.open(method, fullUrl, true);
            loginRequest.setRequestHeader("Authorization", "Bearer " + a.key); // set authorization header to public key
            if (body != "") {
              loginRequest.setRequestHeader('Content-Type', 'application/json');
                    loginRequest.send(body);
            } else {
              loginRequest.send();
            }
        }, a.requestSuccess = function(data) {
            return {error: false, data: JSON.parse(data)};
        }, a.requestError = function(errorStatus, error) {
            return "console" in window && "warn" in window.console, d = Math.round((new Date).getTime() / 1e3), {error: true, status: errorStatus, message: error} 
        }, a.formatData = function(data, whitelist) {
            var key, value;
            Tackle.utils.isElement(data)
            for (key in data) {
                if (whitelist.indexOf(key) == -1) {
                    delete data[key]
                }
            }
            return data
        }, a
    }(), this.Tackle.time = function(options, callback){
        function b() {
            return b.__super__.constructor.apply(this, arguments)
        }
        return Tackle.utils.validateKey(Tackle.key), b.whitelist = ["startTime", "endTime", "providerId", "appointmentTypeId"],
        Tackle.request("GET", "/available-appointments/", Tackle.formatData(options, b.whitelist), "", callback)
        
    }, this.Tackle.resources = function(callback){
        function b() {
            return b.__super__.constructor.apply(this, arguments)
        }
        return Tackle.utils.validateKey(Tackle.key),
        Tackle.request("GET", "/available-providers/", "", "", callback)
    }
}).call(this),
    function() { 
        // utilities
        var a = [].indexOf || function(a) {
            for (var b = 0, c = this.length; b < c; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
        this.Tackle.isDoubleLoaded || (this.Tackle.utils = function() {
            function b() {}
            var c;
            return c = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, b.trim = function(a) {
                return null === a ? "" : (a + "").replace(c, "")
            }, b.isArray = function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }, b.serialize = function(a, b, c) {
                var d, e, f;
                null == b && (b = []);
                try {
                    for (e in a) f = a[e], c && (e = "" + c + "[" + e + "]"), "object" == typeof f ? this.serialize(f, b, e) : b.push("" + e + "=" + encodeURIComponent(f));
                    return b.join("&").replace(/%20/g, "+")
                } catch (g) {
                    throw d = g, new Error("Unable to serialize: " + a)
                }
            }, b.underscore = function(a) {
                return (a + "").replace(/([A-Z])/g, function(a) {
                    return "_" + a.toLowerCase()
                }).replace(/-/g, "_")
            }, b.underscoreKeys = function(a) {
                var b, c, d;
                d = [];
                for (b in a) c = a[b], delete a[b], d.push(a[this.underscore(b)] = c);
                return d
            }, b.isElement = function(a) {
                return "object" == typeof a
            }, b.addClass = function(a, b) {
                return a.className = this._removedClassString(a, b) + " " + b
            }, b.removeClass = function(a, b) {
                return a.className = this._removedClassString(a, b)
            }, b._removedClassString = function(a, b) {
                return Tackle.utils.trim(a.className.replace(new RegExp("( |^)" + b + "( |$)", "g"), " "))
            }, b.paramsFromForm = function(b, c) {
                var d, e, f, g, h, i, j, k, l, m;
                for (null == c && (c = []), b.jquery && (b = b[0]), f = b.getElementsByTagName("input"), h = b.getElementsByTagName("select"), i = {}, j = 0, l = f.length; j < l; j++) e = f[j], d = this.underscore(e.getAttribute("data")), a.call(c, d) < 0 || (i[d] = e.value);
                for (k = 0, m = h.length; k < m; k++) g = h[k], d = this.underscore(g.getAttribute("data")), a.call(c, d) < 0 || null != g.selectedIndex && (i[d] = g.options[g.selectedIndex].value);
                return i
            }, b.validateKey = function(a) {
                if (!a || "string" != typeof a) throw new Error("You did not set a valid key. Call Tackle.setKey() with your publishable key. For more info, see Tackle.js documentation");
                if (/\s/g.test(a)) throw new Error("Your key is invalid, as it contains whitespace. For more info, see Tackle.js documentation");
            }, b.parseExpString = function(a) {
                var b, c, d, e, f, g, h, i, j;
                for (g = function(b) {
                        throw new Error("You passed an invalid expiration date `" + a + "`. " + (b || "") + "Please pass an unix integer such as 1479499314 For more info, see https://developer.tacklehealth.com/docs/")
                    }, "string" != typeof a && g(), f = a.split(/[\.\-\/\s]+/g), 2 !== f.length && g(), b = i = 0, j = f.length; i < j; b = ++i) e = f[b], d = parseInt(e), isNaN(d) && g("" + f + " is not a number. "), d < 1 && g("" + d + " is less than one. "), f[b] = d;
                return f[0] > 12 ? (h = f[0], c = f[1]) : (c = f[0], h = f[1]), c > 12 && g("Month must be a number 1-12, not " + c + ". "), h < 100 && (h += 2e3), [c, h]
            }, b.formatAmountWithCurrency = function(b, c) {
                var d, e, f;
                return d = parseFloat(b), e = ["bif", "clp", "djf", "gnf", "jpy", "kmf", "krw", "mga", "pyg", "rwf", "vnd", "vuv", "xaf", "xof", "xpf"], f = c.toLowerCase(), a.call(e, f) < 0 && (d = Math.round(100 * d)), parseInt(d)
            }, b.formatTime = function(a) {
                var time = new Date(a * 1000);
                var apptTime = time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12: true}).replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
                return apptTime;
            }, b.formatTimeShort = function(a) {
                var time = new Date(a * 1000);
                var apptTime = time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12: true}).replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2').replace(/(:\d{2}| [AP]M)$/, "");
                return apptTime;
            }, b.formatDate = function(a) {
                var dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                var time = new Date(a * 1000);
                var day = time.getDay()
                var apptDate = dayArray[day] + " " + time.toLocaleDateString(navigator.language, {month: 'numeric', day: 'numeric'});
                return apptDate;
            }, b
        }())
    }.call(this);

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([ 'jquery' ], factory);
    }
    else if (typeof exports === 'object') { // Node/CommonJS
        module.exports = factory(require('jquery'));
    }
    else {
        factory(jQuery);
    }
})(function($) {

;;

var TW = $.tackleWidget = {
    version: "1.2.1",
    internalApiVersion: 5
};

$.fn.tackleWidget = function(options) {
    var args = Array.prototype.slice.call(arguments, 1); // for a possible method call
    var res = this; // what this function will return (this jQuery object by default)

    this.each(function(i, _element) { // loop each DOM element involved
        var element = $(_element);
        var widget = element.data('tackleWidget'); // get the existing widget object (if any)
        var singleRes; // the returned value of this single method call

        // a method call
        if (typeof options === 'string') {
            if (widget && $.isFunction(widget[options])) {
                singleRes = widget[options].apply(widget, args);
                if (!i) {
                    res = singleRes; // record the first method call result
                }
                if (options === 'destroy') { // for the destroy method, must remove Widget object data
                    element.removeData('tackleWidget');
                }
            }
        }
        // a new widget initialization
        else if (!widget) { // don't initialize twice
            widget = new Widget(element, options); // takes widget class and copies it for rendering
            element.data('tackleWidget', widget);
            widget.render();
        }
    });
    
    return res;
};

;;

/* General Utilities
----------------------------------------------------------------------------------------------------------------------*/

var hasOwnPropMethod = {}.hasOwnProperty;


// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
function mergeProps(propObjs, complexProps) {
    var dest = {};
    var i, name;
    var complexObjs;
    var j, val;
    var props;

    if (complexProps) {
        for (i = 0; i < complexProps.length; i++) {
            name = complexProps[i];
            complexObjs = [];

            // collect the trailing object values, stopping when a non-object is discovered
            for (j = propObjs.length - 1; j >= 0; j--) {
                val = propObjs[j][name];

                if (typeof val === 'object') {
                    complexObjs.unshift(val);
                }
                else if (val !== undefined) {
                    dest[name] = val; // if there were no objects, this value will be used
                    break;
                }
            }

            // if the trailing values were objects, use the merged value
            if (complexObjs.length) {
                dest[name] = mergeProps(complexObjs);
            }
        }
    }

    // copy values into the destination, going from last to first
    for (i = propObjs.length - 1; i >= 0; i--) {
        props = propObjs[i];

        for (name in props) {
            if (!(name in dest)) { // if already assigned by previous props or complex props, don't reassign
                dest[name] = props[name];
            }
        }
    }

    return dest;
}


// Create an object that has the given prototype. Just like Object.create
function createObject(proto) {
    var f = function() {};
    f.prototype = proto;
    return new f();
}


function copyOwnProps(src, dest) {
    for (var name in src) {
        if (hasOwnProp(src, name)) {
            dest[name] = src[name];
        }
    }
}


function hasOwnProp(obj, name) {
    return hasOwnPropMethod.call(obj, name);
}


// Is the given value a non-object non-function value?
function isAtomic(val) {
    return /undefined|null|boolean|number|string/.test($.type(val));
}


function applyAll(functions, thisObj, args) {
    if ($.isFunction(functions)) {
        functions = [ functions ];
    }
    if (functions) {
        var i;
        var ret;
        for (i=0; i<functions.length; i++) {
            ret = functions[i].apply(thisObj, args) || ret;
        }
        return ret;
    }
}


function firstDefined() {
    for (var i=0; i<arguments.length; i++) {
        if (arguments[i] !== undefined) {
            return arguments[i];
        }
    }
}


function htmlEscape(s) {
    return (s + '').replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#039;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br />');
}


function stripHtmlEntities(text) {
    return text.replace(/&.*?;/g, '');
}


// Given a hash of CSS properties, returns a string of CSS.
// Uses property names as-is (no camel-case conversion). Will not make statements for null/undefined values.
function cssToStr(cssProps) {
    var statements = [];

    $.each(cssProps, function(name, val) {
        if (val != null) {
            statements.push(name + ':' + val);
        }
    });

    return statements.join(';');
}


// Given an object hash of HTML attribute names to values,
// generates a string that can be injected between < > in HTML
function attrsToStr(attrs) {
    var parts = [];

    $.each(attrs, function(name, val) {
        if (val != null) {
            parts.push(name + '="' + htmlEscape(val) + '"');
        }
    });

    return parts.join(' ');
}


function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function compareNumbers(a, b) { // for .sort()
    return a - b;
}


function isInt(n) {
    return n % 1 === 0;
}


// Returns a method bound to the given object context.
// Just like one of the jQuery.proxy signatures, but without the undesired behavior of treating the same method with
// different contexts as identical when binding/unbinding events.
function proxy(obj, methodName) {
    var method = obj[methodName];

    return function() {
        return method.apply(obj, arguments);
    };
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
        var last = +new Date() - timestamp;
        if (last < wait) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = +new Date();
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}


// HACK around jQuery's now A+ promises: execute callback synchronously if already resolved.
// thenFunc shouldn't accept args.
// similar to whenResources in Scheduler plugin.
function syncThen(promise, thenFunc) {
    // not a promise, or an already-resolved promise?
    if (!promise || !promise.then || promise.state() === 'resolved') {
        return $.when(thenFunc()); // resolve immediately
    }
    else if (thenFunc) {
        return promise.then(thenFunc);
    }
}

function currentTime() {
    if (!Date.now) {
        Date.now = function() { return new Date().getTime(); }
    }
    return Math.floor(Date.now() / 1000);
}

;;

TW.Class = Class; // export

// Class that all other classes will inherit from
function Class() { }


// Called on a class to create a subclass.
// Last argument contains instance methods. Any argument before the last are considered mixins.
Class.extend = function() {
    var len = arguments.length;
    var i;
    var members;

    for (i = 0; i < len; i++) {
        members = arguments[i];
        if (i < len - 1) { // not the last argument?
            mixIntoClass(this, members);
        }
    }

    return extendClass(this, members || {}); // members will be undefined if no arguments
};


// Adds new member variables/methods to the class's prototype.
// Can be called with another class, or a plain object hash containing new members.
Class.mixin = function(members) {
    mixIntoClass(this, members);
};


function extendClass(superClass, members) {
    var subClass;

    // ensure a constructor for the subclass, forwarding all arguments to the super-constructor if it doesn't exist
    if (hasOwnProp(members, 'constructor')) {
        subClass = members.constructor;
    }
    if (typeof subClass !== 'function') {
        subClass = members.constructor = function() {
            superClass.apply(this, arguments);
        };
    }

    // build the base prototype for the subclass, which is an new object chained to the superclass's prototype
    subClass.prototype = createObject(superClass.prototype);

    // copy each member variable/method onto the the subclass's prototype
    copyOwnProps(members, subClass.prototype);

    // copy over all class variables/methods to the subclass, such as `extend` and `mixin`
    copyOwnProps(superClass, subClass);

    return subClass;
}


function mixIntoClass(theClass, members) {
    copyOwnProps(members, theClass.prototype);
}

;;

var EmitterMixin = TW.EmitterMixin = {

    // jQuery-ification via $(this) allows a non-DOM object to have
    // the same event handling capabilities (including namespaces).


    on: function(types, handler) {

        // handlers are always called with an "event" object as their first param.
        // sneak the `this` context and arguments into the extra parameter object
        // and forward them on to the original handler.
        var intercept = function(ev, extra) {
            return handler.apply(
                extra.context || this,
                extra.args || []
            );
        };

        // mimick jQuery's internal "proxy" system (risky, I know)
        // causing all functions with the same .guid to appear to be the same.
        // https://github.com/jquery/jquery/blob/2.2.4/src/core.js#L448
        // this is needed for calling .off with the original non-intercept handler.
        if (!handler.guid) {
            handler.guid = $.guid++;
        }
        intercept.guid = handler.guid;

        $(this).on(types, intercept);

        return this; // for chaining
    },


    off: function(types, handler) {
        $(this).off(types, handler);

        return this; // for chaining
    },


    trigger: function(types) {
        var args = Array.prototype.slice.call(arguments, 1); // arguments after the first

        // pass in "extra" info to the intercept
        $(this).triggerHandler(types, { args: args });

        return this; // for chaining
    },


    triggerWith: function(types, context, args) {

        // `triggerHandler` is less reliant on the DOM compared to `trigger`.
        // pass in "extra" info to the intercept.
        $(this).triggerHandler(types, { context: context, args: args });

        return this; // for chaining
    }
};

;;

var Widget = TW.widget = Class.extend({

    options: null, // all defaults combined with overrides
    overrides: null, // option overrides given to the widget constructor
    dynamicOverrides: null, // options set with dynamic setter method. higher precedence than view overrides.
    header: null,
    loadingLevel: 0, // number of simultaneous loading tasks

    // a lot of this class' OOP logic is scoped within this constructor function,
    // but in the future, write individual methods on the prototype.
    constructor: Widget_constructor,

    // Computes the flattened options hash for the widget and assigns to `this.options`.
    // Assumes this.overrides and this.dynamicOverrides have already been initialized.
    populateOptionsHash: function() {
        this.options = mergeProps([ // merge defaults and overrides. lowest to highest precedence
            Widget.defaults, // global defaults
            this.overrides,
            this.dynamicOverrides
        ]);
    },

    // Subclasses can override this for initialization logic after the constructor has been called
    initialize: function() {
    }
})

function Widget_constructor(element, overrides) {
    var t = this;

    // Exports
    // -----------------------------------------------------------------------------------

    t.render = render;
    t.destroy = destroy;
    t.refetchEvents = refetchEvents;
    t.refetchResources = refetchResources;
    t.renderInitialEvents = renderInitialEvents;

    // Options
    // -----------------------------------------------------------------------------------

    t.dynamicOverrides = {};
    t.overrides = $.extend({}, overrides); // make a copy

    t.populateOptionsHash(); // sets this.options

    // Locals
    // -----------------------------------------------------------------------------------

    var _element = element[0];
    var optionsHash = this.options
    var header;
    var content;
    var suggestedViewHeight;
    var windowResizeProxy; // wraps the windowResize function
    var ignoreWindowResize = 0;
    var events = [];
    var date; // unzoned
    var events;
    var resources;

    //Set key for API calls
    Tackle.setKey(optionsHash.key)

    //Cookie key for more appointment
    var now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    document.cookie = "tackleWidgetCookie="+optionsHash.key+"; expires=" + now.toUTCString() + "; path=/";

    // Main Rendering
    // -----------------------------------------------------------------------------------
    
    function render() {
        if (!content) {
            initialRender();
        }
        else if (elementVisible()) {
            // mainly for the public API
            calcSize();
            renderView();
        }
    }
    
    function initialRender() {
        element.addClass('tw');
        content = $("<div class='tw-time-container' id='tw-timeslots'><div id='tw-timeslots-container' class='tw-width-12'></div></div>").prependTo(element);
        element.after("<div class='tw-footer tw-width-12'><a class='tw-link' href='https://www.tacklehealth.com/more_appointments'>See all appointments</a></div><div class='tw-powered'><a href='https://www.tacklehealth.com'><img class='tw-max-width-half' src='http://i.imgur.com/IDGf9hT.png' /></a></div>");
        header = t.header = new Header(t);
        refetchResources();
    }


    // can be called repeatedly and Header will rerender
    function renderHeader() {
        header.resources = resources;
        header.render();
        if (header.el) {
            element.prepend(header.el).prepend();
        }
    }
    
    // destroys whol widget. Not sure if I want to expose this yet. Also doesn't work yet
    function destroy() {
        header.removeElement();
        content.remove();
        element.removeClass('tw');
        element.off('.tw'); // unbind nav link handlers
    }
    
    
    function elementVisible() {
        return element.is(':visible');
    }

    /* Event Fetching/Rendering
    -----------------------------------------------------------------------------*/

    function timeHandler(responseStatus, response) {
        if (response.error) {
            renderEvents([])
        } else {
            if (response.data.count > 0) {
                renderEvents(response.data.payload)    
            } else {
                renderEvents([])
            }
        }
    }

    function resourceHandler(responseStatus, response) {
        if (response.error) {
            setOptions({resources: []})
            resources = [];
            renderHeader();
            throw new Error("There was an error with your request. The widget may not load"); 
        } else {
            var resourcePass = response.data
            if (optionsHash.providers != '') {
                var providerArray = optionsHash.providers.split(",")
                resourcePass = [];
                $.each(providerArray, function(index, value){
                    var providerGrep = $.grep(response.data, function(e){ return e.id == value; });
                    if (providerGrep[0] != undefined) {
                        resourcePass.push(providerGrep[0])
                    }
                    console.warn("Specified provider with id " + value.id + " is not a part of the system for which this key is defined.")
                })
            }
            if (resourcePass.length === 0) {
                resources = [];
                throw new Error("Your specified options do not correspond to any allowed resources. This will cause the widget not to render.");
            } else {
                resources = resourcePass;
            }
            setOptions({resources: resources})
            renderHeader();
        }
    }

    function refetchEvents(start, end, providerId, apptTypeId) { // can be called as an API method
        $("#tw-timeslots-container").html("<div id='tw-loading' class='tw-inline-block'><span>Loading...</span></div>")
        $("#tw-loading").show();
        Tackle.time({startTime: start, endTime: end, providerId: providerId, appointmentTypeId: apptTypeId}, timeHandler)
    }

    function refetchResources(matchInputs) {
        $("#tw-timeslots-container").html("<div id='tw-loading' class='tw-inline-block'><span>Loading...</span></div>")
        $("#tw-loading").show();
        Tackle.resources(resourceHandler)
    }

    function renderEvents(events) { // destroys old events if previously rendered
        if (elementVisible()) {
            freezeContentHeight();
            displayEvents(events, false);
            unfreezeContentHeight();
        }
    }

    function renderInitialEvents() { // removes events and displays initial information
        if (elementVisible()) {
            freezeContentHeight();
            displayEvents([], true);
            unfreezeContentHeight();
        }
    }

    function displayEvents(eventPass, initial) {
        destroyEvents();
        var eventSlice
        if (eventPass.length > 5) {
            eventSlice = eventPass.slice(0,5);  
        } else {
            eventSlice = eventPass;
        }
        drawEvents(eventSlice, initial);
    }

    function destroyEvents() {
        $("#tw-timeslots-container").empty()
    }

    function drawEvents(events, initial) {
        var eventHTML = "";
        $("#tw-timeslots-container").html("")
        if (initial) {
            $("#tw-timeslots-container").append(initialEventHMTLSkeleton());
        } else if (events.length === 0) {
            $("#tw-timeslots-container").append(noEventHMTLSkeleton());
        }
        for (i=0; i < events.length; i++) {
            $("#tw-timeslots-container").append(createEventHTMLSkeleton(events[i]))
        }
        $("#tw-timeslots").scrollTop(0);
    }

    function initialEventHMTLSkeleton() {
        return "<div class='tw-notification'>" +
                        "<span>Select a provider and an appointment type to see their availability.</span>" +
                "</div>"
    }

    function noEventHMTLSkeleton() {
        return "<div class='tw-notification'>" +
                    "<span>There are no appointments of this type available at this time</span>" +
                "</div>"
    }

    function createEventHTMLSkeleton(event) {
        var el = $("<div class='tw-interactionRow'></div>")
        var provider = resources[$("#tw-provider").value];
        var time = "<b>" + Tackle.utils.formatDate(event.startTime) + "</b>" + ": " + Tackle.utils.formatTime(event.startTime) + " - " + Tackle.utils.formatTime(event.endTime);
        var children;

        el.on("click", function(){
            window.location = "https://" + event.linkToBook;
        })
        var HTMLpass = "<div class='tw-width-11 tw-inline-block'>" +
                            "<span class='tw-addText'>" + time + "</span>" +
                        "</div>" +
                        "<div class='tw-width-1'>" +
                            "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 1792 1792' class='tw-svg'><path d='M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z'></path></svg>" +
                        "</div>";

        el.append(HTMLpass)

        return el;
    }

    /* Height "Freezing"
    -----------------------------------------------------------------------------*/

    t.freezeContentHeight = freezeContentHeight;
    t.unfreezeContentHeight = unfreezeContentHeight;


    function freezeContentHeight() {
        content.css({
            width: '100%',
            height: content.height(),
            overflow: 'hidden'
        });
    }


    function unfreezeContentHeight() {
        content.css({
            width: '',
            height: '',
            overflow: ''
        });
    }

    function setOptions(newOptionHash) {
        var optionName;

        for (optionName in newOptionHash) {
            // remove resources that don't have apptTypes
            if (optionName === "resources") {
                for (x in newOptionHash[optionName]) {
                    if (newOptionHash[optionName][x].appointmentTypes === null) {
                        newOptionHash[optionName].splice(x,1);
                    }
                }
            }
            t.dynamicOverrides[optionName] = newOptionHash[optionName];
        }

        t.populateOptionsHash(); // this.options needs to be recomputed after the dynamic override
    }

    t.initialize();
};


// need to adjust to default to widget
Widget.defaults = {

    providers: '',
    offices: '',
    appointmentTypes: '',
    resources: null,
    height: "10em",

    start: currentTime(),
    end: currentTime() + 1209600,
    
    // event ajax
    lazyFetching: true,
    timezoneParam: 'timezone',

    timezone: false,
    
    handleWindowResize: true,
    windowResizeDelay: 0 // milliseconds before an updateSize happens
    
};


/* Top toolbar area with buttons and title
----------------------------------------------------------------------------------------------------------------------*/

function Header(widget) {
    var t = this;
    
    // exports
    t.render = render;
    t.removeElement = removeElement;
    t.updateTitle = updateTitle;
    t.activateButton = activateButton;
    t.deactivateButton = deactivateButton;
    t.disableButton = disableButton;
    t.enableButton = enableButton;
    t.el = null; // mirrors local `el`
    t.apptEl = null; // mirrors local 'apptEl'
    t.resources = null;
    
    // locals
    var el;
    var apptEl;
    var viewsWithButtons = [];

    function labelCSSFunc() {
        var css
        if ($("#tackle-container").width() < 290) {
            css = "";
        } else if ($("#tackle-container").width() < 600) {
            css = "tw-inline-block tw-width-3";
        } else {
            css = "tw-inline-block";
        }
        return css;
    }

    // can be called repeatedly and will rerender
    function render() {
        var options = widget.options;
        var innerEl;
        var topHeader = $("<div class='tw-title-bar'>" +
                "<div class='tw-fill tw-inline-block'>" +
                    "<span class='tw-header'>Schedule an Appoinment</span>" +
                "</div>" +
            "</div>");

        if (!el) {
            el = this.el = $("<div class='tw-menu-bar'></div>");
        }
        else {
            el.empty();
        }
        innerEl = $("<div class='tw-fill tw-inline-block'></div>");
        innerEl.append(renderProviders());
        el.append(topHeader).append(innerEl);

        widget.renderInitialEvents();
    };
    
    
    function removeElement() {
        if (el) {
            el.remove();
            el = t.el = null;
        }
    };
    
    
    function renderProviders() {
        var finalEl = $("<div></div>");
        var sectionEl = $('<div class="tw-provider tw-width-12"></div>');
        var options = widget.options;
        var selectEl = $("<select id='tw-provider' class='tw-select'></select>");
        selectEl.append("<option disabled selected>Which provider are you seeing?</option>");

        $.each(options.resources, function(i, prov){
            var name = "Dr. " + prov.firstName + " " + prov.lastName;
            if (prov.degree == "NP") {
                name = prov.firstName + " " + prov.lastName + ", NP";
            } else if (prov.firstName == "PA") {
                name = prov.firstName + " " + prov.lastName + ", PA";
            }
            selectEl.append("<option value='"+i+"'>"+name+"</option>");
        })

        selectEl.on("change", function(){
            var index = this.value;
            var provider = options.resources[index]
            var now = new Date();
            now.setTime(now.getTime() + 1 * 3600 * 1000);
            document.cookie = "tackleProvCookie="+provider.id+"; expires=" + now.toUTCString() + "; path=/";
            var apptCheck = options.appointmentTypes.split(",");
            var apptType;
            renderApptTypes(provider);
            widget.renderInitialEvents();
        })

        sectionEl.append(selectEl);

        finalEl.append(sectionEl).append(renderApptTypes(options.resources[0]));

        return finalEl;
    };

    function renderApptTypes(provider) {
        if (!apptEl) {
            apptEl = this.apptEl = $('<div class="tw-reason tw-width-12"></div>');
        }
        else {
            apptEl.empty();
        }
        var options = widget.options;
        var apptCheck = options.appointmentTypes.split(",");

        var selectEl = $("<select id='tw-appointment' class='tw-select'></select>");
        selectEl.append("<option disabled selected>What is your visit for?</option>")

        if (provider != undefined) {
            var optionCheck = false;
            selectEl.on("change", function(){
                var apptIndex = this.value
                var apptType = provider.appointmentTypes[apptIndex].id
                var now = new Date();
                now.setTime(now.getTime() + 1 * 3600 * 1000);
                document.cookie = "tackleApptCookie="+apptType+"; expires=" + now.toUTCString() + "; path=/";
                widget.refetchEvents(options.start, options.end, provider.id, apptType);
            })

            $.each(provider.appointmentTypes, function(i, at){
                if (apptCheck[0] === "" || apptCheck.indexOf(at.id) > -1) {
                    selectEl.append("<option value="+i+">"+at.name+"</option>") ;
                    optionCheck = true;   
                }
            })

            if (!optionCheck) {
                selectEl.append("<option disabled>No appointments found</option>") 
            }
        } else {
            selectEl.append("<option disabled>No appointments found</option>") 
        }

        apptEl.append(selectEl);

        return apptEl;
    };
    
    
    function updateTitle(text) {
        if (el) {
            el.find('.tw-header').text(text);
        }
    };
    
    
    function activateButton(buttonName) {
        if (el) {
            el.find('.tw-' + buttonName + '-select')
                .addClass('tw-state-active');
        }
    };
    
    
    function deactivateButton(buttonName) {
        if (el) {
            el.find('.tw-' + buttonName + '-select')
                .removeClass('tw-state-active');
        }
    };
    
    
    function disableButton(buttonName) {
        if (el) {
            el.find('.tw-' + buttonName + '-select')
                .prop('disabled', true)
                .addClass('tw-state-disabled');
        }
    };
    
    function enableButton(buttonName) {
        if (el) {
            el.find('.tw-' + buttonName + '-select')
                .prop('disabled', false)
                .removeClass('tw-state-disabled');
        }
    };

    // loops through the appointment types on a provider and compares to the options set
    // if it finds one it returns it, if it doesn't it returns null
    function findFirstValidAppointment(provider) {
        var appt;
        var apptCheck = options.appointmentTypes.split(",");
        for (appt in provider.appointmentTypes) {
            if (apptCheck.indexOf(appt.id) > -1) {
                return appt;
            }
        }
        return null;
    }

    // loops through the appointment types on a provider and compares to the options set
    // returns array of valid appointments
    function findValidAppointments(provider) {
        var appt;
        var apptCheck = options.appointmentTypes.split(",");
        var validArray = []
        for (appt in provider.appointmentTypes) {
            if (apptCheck.indexOf(appt.id) > -1) {
                validArray.push(appt);
            }
        }
        return validArray;
    }
};

;;

return TW; // export for Node/CommonJS
});