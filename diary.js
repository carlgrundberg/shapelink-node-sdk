module.exports = function(shapelink) {
    var path = '/diary';

    return {
        getStrengthExercises: function (token, onsuccess, onerror) {
            var params = {
                token: token
            };

            return shapelink.signedCall(path + '/getStrengthExercises', params, onsuccess, onerror);
        }
    };
};