module.exports = function(shapelink) {
    var path = '/auth';
    return {
        requireToken: function (username, password, onsuccess, onerror) {
            var params = {
                username: username,
                password: password
            };

            return shapelink.call(path + '/requiretoken', params, onsuccess, onerror);
        }
    };
};