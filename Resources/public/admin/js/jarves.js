var jarves = angular.module('jarves', []);

jarves.clipboard = {};
jarves.settings = {};

jarves.performance = false;
jarves.streamParams = {};

jarves.langs = jarves.langs || {};
_path = _path || location.pathname.dirname();

jarves.FieldTypes = {};
jarves.LabelTypes = {};
jarves.Directives = {};
jarves.ContentTypes = {};
jarves.Services = {};
jarves.Factories = {};
jarves.Filters = {};
jarves.Controller = {};
jarves.Fields  = {};

/**
 * Is true if the current browser has a mobile user agent.
 * @type {Boolean}
 */
jarves.mobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);

jarves.isMobile = function() {
    return jarves.mobile;
};

/**
 * Alias for jarves.t().
 *
 * @param {String} p
 * @returns {String}
 */
//jarves._ = function(p) {
//    return t(p);
//};

//jarves.template = new nunjucks.Environment();
//
//jarves.template.addFilter('substr', function(str, start, len) {
//    return str.substr(start, len);
//});
//
//jarves.template.addFilter('strlen', function(str) {
//    return str.length;
//});

//jarves.getCompiledTemplate = function(src, env, path, eagerCompile) {
//    return new nunjucks.Template(src, jarves.getTemplate(), path, eagerCompile)
//};

/**
 * Just for console hacking.
 */
jarves.applyRootScope = function() {
    angular.element(document).scope().$apply();
};

jarves.isDifferent = function(a, b) {
    var changed;
    if ('object' === typeOf(a)) {
        changed = false;
        if (Object.getLength(a) !== Object.getLength(b)) {
            return true;
        }

        Object.each(a, function(v, k) {
            if (changed) return false;
            changed = jarves.isDifferent(v, b[k]);
        }.bind(this));
        return changed;
    }

    if ('array' === typeOf(a)) {
        changed = false;
        if (a.length !== b.length) {
            return true;
        }
        Array.each(a, function(v, k) {
            if (changed) return false;
            changed = jarves.isDifferent(v, b[k]);
        }.bind(this));
        return changed;
    }

    return !angular.equals(a, b);
};

jarves.logger = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('Logger: ');
    console.log.apply(console, args);
};
/**
// *
// * @returns {nunjucks.Environment}
// */
//jarves.getTemplate = function() {
//    return jarves.template;
//};

///**
// * @returns {jarves.AdminInterface}
// */
//jarves.getAdminInterface = function() {
//    return jarves.adminInterface;
//};

///**
// * Return a translated message with plural and context ability
// * with additional replacement of kml2html.
// *
// * @param {String} message Message id (msgid)
// * @param {String} plural  Message id plural (msgid_plural)
// * @param {Number} count   the count for plural
// * @param {String} context the message id of the context (msgctxt)
// *
// * @return {String}
// */
//window._ = window.t = jarves.t = function(message, plural, count, context) {
//    return jarves._kml2html(jarves.translate(message, plural, count, context));
//};

///**
// * Return a translated message with plural and context ability.
// *
// * @param {String} message Message id (msgid)
// * @param {String} plural  Message id plural (msgid_plural)
// * @param {Number} count   the count for plural
// * @param {String} context the message id of the context (msgctxt)
// *
// * @return {String}
// */
//jarves.translate = function(message, plural, count, context) {
//    if (!jarves && parent) {
//        jarves = parent.jarves;
//    }
//    if (jarves && !jarves.lang && parent && parent.jarves) {
//        jarves.lang = parent.jarves.lang;
//    }
//    var id = (!context) ? message : context + "\004" + message;
//
//    if (jarves.lang && jarves.lang[id]) {
//        if (typeOf(jarves.lang[id]) == 'array') {
//            if (count) {
//                var fn = 'gettext_plural_fn_' + jarves.lang['__lang'];
//                pluralId = window[fn](count) + 0;
//
//                if (count && jarves.lang[id][pluralId]) {
//                    return jarves.lang[id][pluralId].replace('%d', count);
//                } else {
//                    return ((count === null || count === false || count === 1) ? message : plural);
//                }
//            } else {
//                return jarves.lang[id][0];
//            }
//        } else {
//            return jarves.lang[id];
//        }
//    } else {
//        return ((!count || count === 1) && count !== 0) ? message : plural;
//    }
//};

///**
// * sprintf for translations.
// *
// * @return {String}
// */
//window.tf = jarves.tf = function() {
//    var args = Array.from(arguments);
//    var text = args.shift();
//    if (typeOf(text) != 'string') {
//        throw 'First argument has to be a string.';
//    }
//
//    return text.sprintf.apply(text, args);
//};
//
///**
// * Return a translated message within a context.
// *
// * @param {String} context the message id of the context
// * @param {String} message message id
// */
//window.tc = jarves.tc = function(context, message) {
//    return t(message, null, null, context);
//};

///**
// * Replaces some own <jarves:> elements with correct html.
// *
// * @param {String} message
// *
// * @returns {String}
// * @private
// */
//jarves._kml2html = function(message) {
//
//    var kml = ['jarves:help'];
//    if (message) {
//        message = message.replace(/<jarves:help\s+id="(.*)">(.*)<\/jarves:help>/g, '<a href="javascript:;" onclick="jarves.wm.open(\'admin/help\', {id: \'$1\'}); return false;">$2</a>');
//    }
//    return message;
//};
//
//jarves.entrypoint = {
//
//    open: function(path, options, inline, dependWindowId) {
//        var entryPoint = jarves.entrypoint.get(path);
//
//        if (!entryPoint) {
//            throw 'Can not be found entryPoint: ' + path;
//            return false;
//        }
//
//        if (['custom', 'iframe', 'list', 'edit', 'add', 'combine'].contains(entryPoint.type)) {
//            jarves.wm.open(path, options, dependWindowId, inline);
//        } else if (entryPoint.type == 'function') {
//            jarves.entrypoint.exec(entryPoint, options);
//        }
//    },
//
//    getRelative: function(current, entryPoint) {
//
//        if (typeOf(entryPoint) != 'string' || !entryPoint) {
//            return current;
//        }
//
//        if (entryPoint.substr(0, 1) == '/') {
//            return entryPoint;
//        }
//
//        current = current + '';
//        if (current.substr(current.length - 1, 1) != '/') {
//            current += '/';
//        }
//
//        return current + entryPoint;
//
//    },
//
//    //executes a entry point from type function
//    exec: function(entryPoint, options) {
//
//        if (entryPoint.functionType == 'global') {
//            if (window[entryPoint.functionName]) {
//                window[entryPoint.functionName](options);
//            }
//        } else if (entryPoint.functionType == 'code') {
//            eval(entryPoint.functionCode);
//        }
//
//    },
//
//    get: function(path) {
//        if (typeOf(path) != 'string') {
//            return;
//        }
//
//        var splitted = path.split('/');
//        var bundleName = splitted[0];
//
//        splitted.shift();
//
//        var code = splitted.join('/');
//
//        var config, notFound = false, item;
//        path = [];
//
//        config = jarves.getConfig(bundleName);
//
//        if (!config) {
//            throw 'Config not found for bundleName: ' + bundleName;
//        }
//
//        var tempEntry = config.entryPoints[splitted.shift()]
//        if (!tempEntry) {
//            return null;
//        }
//        path.push(tempEntry['label']);
//
//        while (item = splitted.shift()) {
//            if (tempEntry.children && tempEntry.children[item]) {
//                tempEntry = tempEntry.children[item];
//                path.push(tempEntry['label']);
//            } else {
//                notFound = true;
//                break;
//            }
//        }
//
//        if (notFound) {
//            return null;
//        }
//
//        tempEntry._path = path;
//        tempEntry._module = bundleName;
//        tempEntry._code = code;
//
//        return tempEntry;
//    }
//};

/**
 * Replaces all <, >, & and " with html so you can use it in safely innerHTML.
 *
 * @param {String}   value
 * @returns {string} Safe for innerHTML usage.
 */
jarves.htmlEntities = function(value) {
    if ('null' === typeOf(value)) return '';
    if ('array' === typeOf(value)) {
        Array.each(value, function(v, k) {
            value[k] = jarves.htmlEntities(v);
        });
        return value;
    }
    if ('object' === typeOf(value)) {
        Object.each(value, function(v, k) {
            value[k] = jarves.htmlEntities(v);
        });
        return value;
    }
    if ('element' === typeOf(value)) {
        return value;
    }
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

/**
 *
 * @param path
 */
jarves.getPublicPath = function(path) {
    var matches = path.match(/@([a-zA-Z_]*)\/(.*)/);
    if (matches && matches[1]) {
        path = 'bundles/'+jarves.getShortBundleName(matches[1]) + '/' + matches[2];
    }
    return _path + path;
};

jarves.countWatchers = function() {
    var root = angular.element(document);
    var watchers = [];

    var f = function (element) {
        if (element.data().hasOwnProperty('$scope')) {
            angular.forEach(element.data().$scope.$$watchers, function (watcher) {
                watchers.push(watcher);
            });
        }

        angular.forEach(element.children(), function (childElement) {
            f(angular.element(childElement));
        });
    };

    f(root);

    return watchers.length;
};

///**
// * Creates a new information bubble on the right corner.
// *
// * @param {String} title
// * @param {String} text
// * @param {String} duration
// *
// * @returns {Element}
// */
//jarves.newBubble = function(title, text, duration) {
//    return jarves.adminInterface.getHelpSystem().newBubble(title, text, duration);
//};

/**
 * Adds a prefix to the keys of pFields.
 * Good to group some values of fields of jarves.FieldForm.
 *
 * Example:
 *
 *   fields = {
 *      field1: {type: 'text', label: 'Field 1'},
 *      field2: {type: 'checkbox', label: 'Field 2'}
 *   }
 *
 *   prefix = 'options'
 *
 *   fields will be changed to:
 *   {
 *      'options[field1]': {type: 'text', label: 'Field 1'},
 *      'options[field2]': {type: 'checkbox', label: 'Field 2'}
 *   }
 *
 * @param {Array} fields Reference to object.
 * @param {String} prefix
 */
jarves.addFieldKeyPrefix = function(fields, prefix) {
    Object.each(fields, function(field, key) {
        fields[prefix + '[' + key + ']'] = field;
        delete fields[key];
        if (fields.children) {
            jarves.addFieldKeyPrefix(field.children, prefix);
        }
    });
};

/**
 * Resolve path notations and returns the appropriate class.
 *
 * @param {String} classPath
 * @return {Class|Function}
 */
jarves.getClass = function(classPath) {
    classPath = classPath.replace('[\'', '.');
    classPath = classPath.replace('\']', '.');

    if (classPath.indexOf('.') > 0) {
        var path = classPath.split('.');
        var clazz = null;
        Array.each(path, function(item) {
            clazz = clazz ? clazz[item] : window[item];
        });
        return clazz;
    }

    return window[classPath];
};

/**
 * Encodes a value from url usage.
 * If Array, it encodes the whole array an implodes it with comma.
 * If Object, it encodes the whole object and implodes the <key>=<value> pairs with a comma.
 *
 * @param {String} value
 *
 * @return {String}
 */
jarves.urlEncode = function(value) {
	var result;
    if (typeOf(value) == 'string') {
        return encodeURIComponent(value).replace(/\%2F/g, '%252F'); //fix apache default setting
    } else if (typeOf(value) == 'array') {
        result = '';
        Array.each(value, function(item) {
            result += jarves.urlEncode(item) + ',';
        });
        return result.substr(0, result.length - 1);
    } else if (typeOf(value) == 'object') {
        result = '';
        Array.each(value, function(item, key) {
            result += key + '=' + jarves.urlEncode(item) + ',';
        });
        return result.substr(0, result.length - 1);
    }

    return value;
};

/**
 * Decodes a value for url usage.
 *
 * @param {String} value
 *
 * @return {String}
 */
jarves.urlDecode = function(value) {
    if (typeOf(value) != 'string') {
        return value;
    }

    try {
        return decodeURIComponent(value.replace(/%252F/g, '%2F'));
    } catch (e) {
        return value;
    }
};

/**
 * Normalizes a objectKey.
 *
 * @param {String} objectKey
 *
 * @returns {String|Null}
 */
jarves.normalizeObjectKey = function(objectKey) {
    objectKey = objectKey.replace('\\', '/').replace('.', '/').replace(':', '/');
    var bundleName = objectKey.split('/')[0].toLowerCase().replace(/bundle$/, '');
    var objectName = objectKey.split('/')[1];

    if (!bundleName || !objectName) {
        return null;
    }

    return bundleName + '/' + objectName.lcfirst();
};

/**
 * Normalizes a entryPoint path.
 *
 * Example
 *
 *   JarvesBundle/entry/point/path
 *   => jarves/entry/point/path
 *
 *
 * @param {String} path
 *
 * @returns {String}
 */
jarves.normalizeEntryPointPath = function(path) {
    var slash = path.indexOf('/');

    return jarves.getShortBundleName(path.substr(0, slash)) + path.substr(slash);
};

/**
 * Returns a absolute path.
 * If path begins with # it returns path
 * if path is not a string it returns path
 * if path contains http:// on the beginning it returns path
 *
 * @param {String} path
 *
 * @return {String}
 */
jarves.mediaPath = function(path) {

    if (typeOf(path) != 'string') {
        return path;
    }

    if (path.substr(0, 1) == '#') {
        return path;
    }

    if (path.substr(0, 1) == '/') {
        return _path + path.substr(1);
    } else if (path.substr(0, 7) == 'http://') {
        return path;
    } else {
        return _path + '' + path;
    }
};

/**
 * Just converts arguments into a new string :
 *
 *    object://<objectKey>/<id>
 *
 * @param {String} objectKey
 * @param {String} id        Has to be urlEncoded (use jarves.urlEncode or jarves.getObjectUrlId)
 * @return {String}
 */
jarves.getObjectUrl = function(objectKey, id) {
    return 'object://' + jarves.normalizeObjectKey(objectKey) + '/' + id;
};

/**
 * This just cuts off object://<objectName>/ and returns the raw primary key part.
 *
 * @param {String} url
 *
 * @return {String}
 */
jarves.getCroppedObjectId = function(url) {
    if ('string' !== typeOf(url)) {
        return url;
    }

    if (url.indexOf('object://') == 0) {
        url = url.substr(9);
    }

    var idx = url.indexOf('/'); //cut of bundleName
    url = -1 === idx ? url : url.substr(idx + 1);

    idx = url.indexOf('/'); //cut of objectName
    url = -1 === idx ? url : url.substr(idx + 1);

    return url;
};

jarves.compare = function(a, b) {
    return JSON.encode(a) == JSON.encode(b);
};

/**
 * This just cut anything but the full raw objectKey.
 *
 * Example:
 *
 *    jarves/file/3 => jarves/file
 *
 * @param {String} url Internal url
 *
 * @return {String} the objectKey
 */
jarves.getCroppedObjectKey = function(url) {
    if ('string' !== typeOf(url)) {
        return url;
    }

    if (url.indexOf('object://') == 0) {
        url = url.substr(9);
    }

    var idx = url.indexOf('/'); //till bundleName/
    var nextPart = url.substr(idx + 1); // now we have <objectKey>/<id>

    var lastIdx = nextPart.indexOf('/'); //till objectKey/

    return -1 === lastIdx ? url : url.substr(0, idx + lastIdx + 1);
};

/**
 *
 * @param {Number} bytes
 * @returns {String}
 */
jarves.bytesToSize = function(bytes) {
    var sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
    if (!bytes) {
        return '0 Bytes';
    }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) {
        return (bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

/**
 *
 * @param {Number} seconds
 *
 * @return {String}
 */
jarves.dateTime = function(seconds) {
    var date = new Date(seconds * 1000);
    var nowSeconds = new Date().getTime();
    var diffForThisWeek = 3600 * 24 * 7;

    var format = '%d. %B %Y, %H:%M';
    if (nowSeconds - date < diffForThisWeek) {
        //include full day name if date is within current week.
        format = '%a., ' + format;
    }

    return date.format(format);
};

///**
// * Returns a domain object.
// *
// * @param {Number} id
// * @returns {Object}
// */
//jarves.getDomain = function(id) {
//    var result = null;
//    jarves.settings.domains.each(function(domain) {
//        if (domain.id == id) {
//            result = domain;
//        }
//    });
//    return result;
//};

///**
// * Loads all settings from the backend.
// *
// * @param {Array} keyLimitation
// * @param {Function} callback
// */
//jarves.loadSettings = function(keyLimitation, callback) {
//    jarves.adminInterface.loadSettings(keyLimitation, callback);
//};


/**
 * Returns the short bundleName.
 *
 * @param {String} bundleName
 *
 * @returns {string}
 */
jarves.getShortBundleName = function(bundleName) {
    return jarves.getBundleName(bundleName).toLowerCase().replace(/bundle$/, '');
};

/**
 * Returns a absolute path based on a relative one.
 *
 * @param {String} current
 * @param {String} relativePath
 * @returns {String}
 */
jarves.getEntryPointPathForRelative = function(current, relativePath) {
    if (typeOf(relativePath) != 'string' || !relativePath) {
        return current;
    }

    if (relativePath.substr(0, 1) == '/') {
        return relativePath;
    }

    current = current + '';
    if (current.substr(current.length - 1, 1) != '/') {
        current += '/';
    }

    return current + relativePath;
};

jarves.simpleClone = function(value) {
    var result = {};
    Object.each(value, function(val, key) {
        result[key] = val;
    });

    return result;
};

/**
 * Returns the bundle name from a PHP FQ class name.
 *
 * Jarves\JarvesBundle => JarvesBundle
 *
 * @param {String} bundleClass
 * @return {String} returns only the base bundle name
 */
jarves.getBundleName = function(bundleClass) {
	var split = bundleClass.split('\\');
	return split[split.length -1];
};

///**
// * Loads the main menu.
// */
//jarves.loadMenu = function() {
//    jarves.adminInterface.loadMenu();
//};

///**
// * Sets the current language and reloads all messages.
// *
// * @param {String} languageCode
// */
//jarves.loadLanguage = function(languageCode) {
//    if (!languageCode) {
//        languageCode = 'en';
//    }
//    window._session.lang = languageCode;
//
//    Cookie.write('jarves_language', languageCode);
//
//    Asset.javascript(_pathAdmin + 'admin/ui/language-plural?lang=' + languageCode);
//
//    new Request.JSON({url: _pathAdmin + 'admin/ui/language?lang=' + languageCode, async: false, noCache: 1, onComplete: function(pResponse) {
//        jarves.lang = pResponse.data;
//        Locale.define('en-US', 'Date', jarves.lang);
//    }}).get();
//};
//




///**
// * Register a new stream and starts probably the stream process.
// *
// * @param {String}   path
// * @param {Function} callback
// */
//jarves.registerStream = function(path, callback) {
//    if (!jarves.streamRegistered[path]) {
//        jarves.streamRegistered[path] = [];
//    }
//    jarves.streamRegistered[path].push(callback);
//    jarves.loadStream();
//};
//
//jarves.streamRegistered = {};

///**
// * Register a callback to a stream path. If no stream is remaining the stream process is stopped.
// *
// * @param {String}   path
// * @param {Function} callback
// */
//jarves.deRegisterStream = function(path, callback) {
//    if (!jarves.streamRegistered[path]) {
//        return;
//    }
//    if (callback) {
//        var index = jarves.streamRegistered[path].indexOf(callback);
//        if (-1 !== index) {
//            jarves.streamRegistered[path].splice(index, 1);
//        }
//    } else {
//        delete jarves.streamRegistered[path];
//    }
//    jarves.loadStream();
//};

///**
// * The stream loader loop.
// */
//jarves.loadStream = function() {
//    if (jarves._lastStreamId) {
//        clearTimeout(jarves._lastStreamId);
//    }
//
//    jarves.streamParams.streams = [];
//    Object.each(jarves.streamRegistered, function(cbs, path) {
//        if (0 !== cbs.length) {
//            jarves.streamParams.streams.push(path);
//        }
//    });
//
//    if (0 === jarves.streamParams.streams.length) {
//        return;
//    }
//
//    jarves._lastStreamId = (function() {
//        if (window._session.userId > 0) {
//            new Request.JSON({url: _pathAdmin + 'admin/stream', noCache: 1, onComplete: function(res) {
//                if (res) {
//                    if (res.error) {
//                        jarves.newBubble(t('Stream error'), res.error + ': ' + res.message);
//                    } else {
//                        window.fireEvent('stream', res.data);
//                        Object.each(jarves.streamRegistered, function(cbs, path) {
//                            Array.each(cbs, function(cb) {
//                                cb(res.data[path], res.data);
//                            });
//                        });
//                    }
//                }
//                jarves._lastStreamId = jarves.loadStream.delay(2 * 1000);
//            }}).get(jarves.streamParams);
//        }
//    }).delay(50);
//};

///**
// *
// * @param {String} key
// * @param {*} value
// */
//jarves.setStreamParam = function(key, value) {
//    if (!jarves.streamParams.params) jarves.streamParams.params = {};
//    if (null === value) {
//        delete jarves.streamParams.params[key];
//    } else {
//        jarves.streamParams.params[key] = value;
//    }
//};
//
///**
// * Returns the current value in the clipboard of the interface (not browser)
// *
// * @returns {Object} {type: {String}, value: {Mixed}}
// */
//jarves.getClipboard = function() {
//    return jarves.clipboard;
//};
//
///**
// * Sets the current clipboard of the interface (not browser)
// *
// * @param {String} title
// * @param {String} type
// * @param {Mixed}  value
// */
//jarves.setClipboard = function(title, type, value) {
//    jarves.clipboard = { type: type, value: value };
//    window.fireEvent('clipboard');
//};
//
///**
// * Checks if current clipboard has the given type.
// *
// * @param {string} type
// *
// * @returns {Boolean}
// */
//jarves.isClipboard = function(type) {
//    return jarves.getClipboard() && type === jarves.getClipboard().type;
//};
//
///**
// * Clears the clipboard.
// */
//jarves.clearClipboard = function() {
//    jarves.clipboard = {};
//};

jarves.closeDialogsBodys = [];

/**
 * Closed current dialog.
 */
jarves.closeDialog = function() {

    var killedOne = false;
    Array.each(jarves.closeDialogsBodys, function(body) {
        if (killedOne) {
            return;
        }

        var last = document.body.getLast('.jarves-dialog-overlay');
        if (last) {
            killedOne = true;
            last.close();
        }
    });
};

/**
 * Positions options.element near options.target with settings of options.primary or options.secondary.
 *
 * @param {Object} options {element: {Element}, target: {Element}, primary: {Object}, secondary: {Object}}
 *
 * @returns {Element}
 */
jarves.openDialog = function(options) {
    if (!options.element || !options.element.getParent) {
        throw 'Got no element.';
    }

    var target = document.body;

    if (options.target) {
        target = document.id(options.target.ownerDocument.body);
    }

//    if ('body' === target.get('tag')) {
//        if (jarvesFrame = target.getElement('.jarves-frame')) {
//            target = jarvesFrame;
//        }
//    }

    if (!jarves.closeDialogsBodys.contains(target)) {
        jarves.closeDialogsBodys.push(target);
    }

    var autoPositionLastOverlay = new Element('div', {
        'class': 'jarves-dialog-overlay',
        style: 'position: absolute; left:0px; top: 0px; right:0px; bottom:0px;background-color: white; z-index: 201000;',
        styles: {
            opacity: 0.001
        }
    }).addEvent('click',function(e) {
            jarves.closeDialog();
            e.stopPropagation();
            this.fireEvent('close');
            if (options.onClose) {
                options.onClose();
            }
        }).inject(target);

    autoPositionLastOverlay.close = function() {
        if (autoPositionLastOverlay) {
            autoPositionLastOverlay.destroy();
            autoPositionLastOverlay = null;
        }
    };

    options.element.setStyle('z-index', 201001);

    var size = options.target.getWindow().getScrollSize();

    autoPositionLastOverlay.setStyles({
        width: size.x,
        height: size.y
    });

    jarves.autoPositionLastItem = options.element;

    options.element.inject(target);

    if (!options.offset) {
        options.offset = {};
    }

    if (!options.primary) {
        options.primary = {
            'position': 'bottomRight',
            'edge': 'upperRight',
            offset: options.offset
        }
    }

    if (!options.secondary) {
        options.secondary = {
            'position': 'upperRight',
            'edge': 'bottomRight',
            offset: options.offset
        }
    }

    var updatePosition = function() {
        options.primary.relativeTo = options.target;
        options.secondary.relativeTo = options.target;

        options.element.position(options.primary);

        var pos = options.element.getPosition();
        var size = options.element.getSize();

        var bsize = options.element.getParent().getSize();
        var bscroll = options.element.getParent().getScroll();
        var height;

        options.element.setStyle('height', '');

        options.minHeight = options.element.getSize().y;

        if (size.y + pos.y > bsize.y + bscroll.y) {
            height = bsize.y - pos.y - 10;
        }

        if (height) {
            if (options.minHeight && height < options.minHeight) {
                var currentTop = options.element.getStyle('top').toInt();
                var offsetY = (options.offset ? options.offset.y : 0) || 0;
                options.element.setStyle('top', currentTop - options.element.getSize().y - options.target.getSize().y + 1 + (offsetY * -1));
                //item.element.position(item.secondary);
            } else {
                options.element.setStyle('height', height);
            }
        }
    };

    updatePosition();
    autoPositionLastOverlay.updatePosition = updatePosition;

    return autoPositionLastOverlay;
};

/**
 * Returns the default caching definition for jarves.Fields.
 *
 * @returns {Object}
 */
jarves.getFieldCaching = function() {
    return {
        'cache_type': {
            label: _('Cache storage'),
            type: 'select',
            items: {
                'memcached': _('Memcached'),
                'redis': _('Redis'),
                'apc': _('APC'),
                'files': _('Files')
            },
            'depends': {
                'cache_params[servers]': {
                    needValue: ['memcached', 'redis'],
                    'label': 'Servers',
                    'type': 'array',
                    startWith: 1,
                    'width': 310,
                    'columns': [
                        {'label': _('IP')},
                        {'label': _('Port'), width: 50}
                    ],
                    'fields': {
                        ip: {
                            type: 'text',
                            width: '95%',
                            empty: false
                        },
                        port: {
                            type: 'number',
                            width: 50,
                            empty: false
                        }
                    }
                },
                'cache_params[files_path]': {
                    needValue: 'files',
                    type: 'text',
                    label: 'Caching directory',
                    'default': 'cache/object/'
                }
            }
        }
    }
};

/**
 * Quotes string to be used in a regEx.
 *
 * @param string
 *
 * @returns {String}
 */
jarves.pregQuote = function(string) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

    return (string + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
};

/**
 * Generates little noise at element background.
 *
 * @param {Element} element
 * @param {Number} opacity
 */
jarves.generateNoise = function(element, opacity) {
    if (!"getContent" in document.createElement('canvas')) {
        return false;
    }

    var canvas = document.createElement("canvas")
        , c2d = canvas.getContext("2d")
        , x
        , y
        , r
        , g
        , b
        , opacity = opacity || .2;

    canvas.width = canvas.height = 100;

    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            r = Math.floor(Math.random() * 80);
            g = Math.floor(Math.random() * 80);
            b = Math.floor(Math.random() * 80);

            c2d.fillStyle = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
            c2d.fillRect(x, y, 1, 1);
        }
    }

    element.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
};
