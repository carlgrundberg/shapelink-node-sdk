module.exports = function(shapelink) {
    var path = '/challenge';

    return {
        /**
         * http://developer.shapelink.com/index.php/API_method:_Challenge.GetResults
         */
        getResults: function (token, challenge_id, limit, offset, onsuccess, onerror) {
            var params = {
                user_token: token,
                challenge_id: challenge_id,
                limit: limit,
                offset: offset
            };
            return shapelink.signedCall(path + '/getResults', params, onsuccess, onerror);
        },

        /**
         * http://developer.shapelink.com/index.php/API_method:_Challenge.GetChallenge
         */
        getChallenge: function(token, challenge_id, onsuccess, onerror) {
            var params = {
                user_token: token,
                challenge_id: challenge_id,
                culture: shapelink.culture
            };

            return shapelink.signedCall(path + '/getChallenge', params, onsuccess, onerror);
        }
    };
};