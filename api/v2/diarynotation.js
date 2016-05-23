module.exports = function(shapelink) {
    return {
        diarynotation: function(params) {
            return shapelink.signedCall(
                '/v2/diarynotation',
                shapelink.params(params, {}, false)
            );
        }
    };
};