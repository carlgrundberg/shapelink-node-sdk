module.exports = function(shapelink) {
    var path = '/user';

    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Diary.GetStrengthExercises
         */
        get: function (token, user_id, onsuccess, onerror) {
            var params = {
                user_token: token,
                user_id: user_id
            };

            return shapelink.signedCall(path + '/get', params, onsuccess, onerror);
        }
    };
};