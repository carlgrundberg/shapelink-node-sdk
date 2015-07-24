module.exports = function(shapelink) {
    var path = '/user';

    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_User.Get
         */
        get: function (params) {
            return shapelink.signedCall(
                path + '/get',
                params
            );
        }
    };
};