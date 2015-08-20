module.exports = function(shapelink) {
    var path = '/auth';
    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Auth.RequireToken
         */
        requireToken: function (params) {
            return shapelink.call(
                path + '/requiretoken',
                params
            );
        }
    };
};