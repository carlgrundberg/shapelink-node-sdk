module.exports = function(shapelink) {
    var path = '/statistics';

    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Statistics.GetStrengthExerciseHistory
         */
        getStrengthExerciseHistory: function (params) {
            return shapelink.signedCall(
                path + '/getStrengthExerciseHistory',
                params
            );
        }
    };
};