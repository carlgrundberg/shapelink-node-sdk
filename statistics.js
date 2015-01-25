module.exports = function(shapelink) {
    var path = '/statistics';

    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Statistics.GetStrengthExerciseHistory
         */
        getStrengthExerciseHistory: function (token, exercise_id, start_date, end_date, onsuccess, onerror) {
            var params = {
                user_token: token,
                exercise_id: exercise_id,
                start_date: start_date,
                end_date: end_date
            };

            return shapelink.signedCall(path + '/getStrengthExerciseHistory', params, onsuccess, onerror);
        }
    };
};