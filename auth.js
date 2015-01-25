module.exports = function(shapelink) {
    var path = '/auth';
    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Auth.RequireToken
         */
        requireToken: function (username, password, onsuccess, onerror) {
            var params = {
                username: username,
                password: password
            };

            return shapelink.call(path + '/requiretoken', params, onsuccess, onerror);
        }
    };
};