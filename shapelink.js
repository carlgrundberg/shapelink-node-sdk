/**
 * Node client for the Shapelink API
 */

var http = require('http');
var url = require('url');
var crypto = require('crypto');
var sorto = require('sorto');
var reduce = require('object.reduce');
var _ = require('underscore');
var q = require('q');

// API Modules
var auth = require('./api/auth');
var user = require('./api/user');
var diary = require('./api/diary');
var statistics = require('./api/statistics');
var challenge = require('./api/challenge');

var defaultOptions = {
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
    function Shapelink(apiKey, secret, culture, options, debug) {
        this.apiKey = apiKey;
        this.secret = secret;
        this.culture = culture;
        this.debug = debug;

        this.options = _.extend(defaultOptions, options);

        this.auth = auth(this);
        this.user = user(this);
        this.diary = diary(this);
        this.statistics = statistics(this);
        this.challenge = challenge(this);
    }

    Shapelink.prototype.call = function(uri, params) {
        var req,
            deferred = q.defer();

        if (params == null) {
            params = {};
        }
        if(!params.apiKey) {
            params.apikey = this.apiKey;
        }
        this.options.path = url.format({
            pathname: this.options.base + uri,
            query: params
        });
        if (this.debug) {
            console.log("Shapelink: Opening request to http://" + this.options.host + this.options.path);
        }
        req = http.request(this.options, function(res) {
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
                    deferred.reject(new Error(json))
                } else {
                    deferred.resolve(json);
                }
            });
        });
        req.end();
        req.on('error', function(e) {
            deferred.reject(e);
        });
        return deferred.promise;
    };

    Shapelink.prototype.signedCall = function(url, params) {
        // Generate signature
        params.apikey = this.apiKey;

        var paramsSorted = sorto.bykey(params);

        var sig = reduce(paramsSorted, function (acc, value, key, obj) {
            acc += sorto.k(value) + '=' + sorto.v(value);
            return acc;
        }, '');

        params.sig = crypto.createHash('md5').update(sig.toLowerCase() + this.secret).digest('hex');

        return this.call(url, params);
    };

    Shapelink.prototype.params = function(params, defaultParams, withCulture) {
        params = _.extend(defaultParams, params);
        if(withCulture) {
            params.culture = this.culture;
        }
        return params;
    };

    return Shapelink;
})();