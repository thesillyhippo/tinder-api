const _ = require('lodash');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '0.0.0.0:9200',
    log: 'trace'
});

const Matches = {
    getMatchesForUser: async function(request, h) {

        const userId = request.params.userId;
        let matchesResponse = {};

        // First get all userIds that match for user
        const query = {
            "query": {
                "bool": {
                    "must": {
                        "terms": {
                            "users": [userId]
                        }
                    }
                }
            }
        };

        try {
            matchesResponse = await client.search({
                index: 'tinder-matches',
                body: query
            });
        } catch (error) {
            console.trace(error.message)
        }
        matchesResponse = matchesResponse.hits ? matchesResponse.hits.hits : [];
        matchesResponse = matchesResponse.map(o => o._source.users);
        matchedIds = _.uniq(_.filter(_.flatten(matchesResponse), function(id) {
            return id != userId
        }));

        // Fetch Users with id's in matched list
        const getUsersBody = {
            "_source": ["name", "gender", "age"],
            "query": {
                "bool": {
                    "must": {
                        "terms": {
                            "_id": matchedIds
                        }
                    }
                }
            }
        };

        try {
            userResponse = await client.search({
                index: 'tinder-users',
                body: getUsersBody
            });
        } catch (error) {
            console.trace(error.message)
        }
        userResponse = userResponse.hits ? userResponse.hits.hits : [];
        return userResponse.map(o => o._source);
    },
    addMatch: async function(request, h) {
        const payload = request.payload || {};
        const users = payload.users;

        try {
            userResponse = await client.index({
                index: 'tinder-matches',
                type: '_doc',
                body: {
                    users: users
                }
            });
        } catch (error) {
            console.trace(error.message)
        }

        return 'success';
    }
}

module.exports = Matches;