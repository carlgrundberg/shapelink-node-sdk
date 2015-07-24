module.exports = function(shapelink) {
    var path = '/challenge';

    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Challenge.GetResults
         */
        getResults: function (params) {
            return shapelink.signedCall(
                path + '/getResults',
                shapelink.params(params, {}, true)
            );
        },

        /**
         * http://developer.shapelink.com/index.php/API_method:_Challenge.GetChallenge
         */
        getChallenge: function(params) {
            return shapelink.signedCall(
                path + '/getChallenge',
                shapelink.params(params, {}, true)
            );
        },

        /**
         * http://developer.shapelink.com/index.php/API_method:_Challenge.GetUserChallenges
         */
        getUserChallenges: function(params) {
            return shapelink.signedCall(
                path + '/getUserChallenges',
                shapelink.params(params, {}, true)
            );
        }
    };
};