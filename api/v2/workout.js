module.exports = function(shapelink) {
    var path = '/v2/workout';

    return {
        get: function(params) {
            return shapelink.signedCall(
                path,
                shapelink.params(params, {}, false)
            );
        }
    };
};