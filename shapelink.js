/**
 * Node client for the Shapelink API
 */

var http = require('http');
var url = require('url');
var crypto = require('crypto');
var sorto = require('sorto');
var reduce = require('object.reduce');

// API Modules
var auth = require('./auth');
var user = require('./user');
var diary = require('./diary');
var statistics = require('./statistics');

var options = {
    host: 'api.shapelink.com',
    port: 80,
    base: '',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Shapelink-Node/1.0.0'
    }
};

exports.Shapelink = (function() {
    function Shapelink(apiKey, secret, culture, debug) {
        this.apiKey = apiKey;
        this.secret = secret;
        this.debug = debug;
        this.culture = culture;
    }

    Shapelink.prototype.call = function(uri, params, onsuccess, onerror) {
        var req,
            _this = this;
        if (params == null) {
            params = {};
        }
        if(!params.apiKey) {
            params.apikey = this.apiKey;
        }
        options.path = url.format({
            pathname: options.base + uri,
            query: params
        });
        if (this.debug) {
            console.log("Shapelink: Opening request to http://" + options.host + options.path);
        }
        req = http.request(options, function(res) {
            var json;
            res.setEncoding('utf8');
            json = '';
            res.on('data', function(d) {
                return json += d;
            });
            return res.on('end', function() {
                try {
                    json = JSON.parse(json);
                } catch (e) {
                    json = {
                        status: 'error',
                        messages: [ e ]
                    };
                }
                if (json == null) {
                    json = {
                        status: 'error',
                        messages: [ 'Empty response' ]
                    };
                }
                if (res.statusCode !== 200 || (json.status && json.status == 'error')) {
                    if (onerror) {
                        return onerror(json);
                    } else {
                        return _this.onerror(json);
                    }
                } else {
                    if (onsuccess) {
                        return onsuccess(json);
                    }
                }
            });
        });
        req.end();
        req.on('error', function(e) {
            if (onerror) {
                return onerror(e);
            } else {
                return _this.onerror({
                    status: 'error',
                    messages: [ e ]
                });
            }
        });
        return null;
    };

    Shapelink.prototype.signedCall = function(url, params, onsuccess, onerror) {
        // Generate signature
        params.apikey = this.apiKey;

        var paramsSorted = sorto.bykey(params);

        var sig = reduce(paramsSorted, function (acc, value, key, obj) {
            acc += sorto.k(value) + '=' + sorto.v(value);
            return acc;
        }, '');

        params.sig = crypto.createHash('md5').update(sig.toLowerCase() + this.secret).digest('hex');

        return this.call(url, params, onsuccess, onerror);
    };

    Shapelink.prototype.onerror = function(err) {
        throw {
            name: 'Error',
            message: err.messages,
            toString: function() {
                return "" + err.name + ": " + err.messages;
            }
        };
    };

    Shapelink.prototype.auth = function() {
        return auth(this);
    };

    Shapelink.prototype.user = function() {
        return user(this);
    };

    Shapelink.prototype.diary = function() {
        return diary(this);
    };

    Shapelink.prototype.statistics = function() {
        return statistics(this);
    };

    return Shapelink;
})();