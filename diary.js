module.exports = function(shapelink) {
    var path = '/diary';

    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Diary.GetStrengthExercises
         */
        getStrengthExercises: function (token, onsuccess, onerror) {
            var params = {
                user_token: token,
                culture: shapelink.culture
            };

            return shapelink.signedCall(path + '/getStrengthExercises', params, onsuccess, onerror);
        }
    };
};