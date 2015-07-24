module.exports = function(shapelink) {
    var path = '/diary';

    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Diary.GetStrengthExercises
         */
        getStrengthExercises: function (params) {
            return shapelink.signedCall(
                path + '/getStrengthExercises',
                shapelink.params(params, {}, true)
            );
        },

        /**
         * http://developer.shapelink.com/index.php/API_method:_Diary.GetDay
         */
        getDay: function(params) {
            return shapelink.signedCall(
                path + '/getDay',
                shapelink.params(params, {}, true)
            );
        }
    };
};