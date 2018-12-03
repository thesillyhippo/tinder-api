const _ = require('lodash');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '0.0.0.0:9200',
  log: 'trace'
});

const Users = require('./Users.js');
const Matches = require('./Matches.js');

const Swipes = {

    swipe: async function(request, h) {
      if (request.payload.swipe == 'right') {
        return Swipes.swipeRight(request, h);
      } else {
        return Swipes.swipeLeft(request, h);
      }
    },
    swipeRight: async function(request, h) {

      const payload = request.payload || {};

      // Add user2 id to user1 liked list
      try {
          userUpdateResponse = await client.update({
            index: 'tinder-users',
            type: '_doc',
            id: payload.user1,
            body: {
              "script" : {
                   "inline": "ctx._source.liked.add(params.userId)",
                   "params" : {
                      "userId" : payload.user2
                   }
               }
            }
          });
        } catch (error) {
          console.trace(error.message)
        }

     // Check if user2 has user1 id in liked list
     let userRequest = _.cloneDeep(request);
     userRequest.params = {id: payload.user2};
     const secondUserResponse = await Users.getUser(userRequest);
     console.log(secondUserResponse);
     if (secondUserResponse.liked.includes(payload.user1)) {
      console.log("match!");
      let matchRequest = _.cloneDeep(request);
      matchRequest.payload = {
        users: [payload.user1, payload.user2]
      };
      let matchResponse = Matches.addMatch(matchRequest,h);
     }
    


     // If so, call match API
      return 'right'

    },
    swipeLeft: async function(request, h) {
      const payload = request.payload || {};

      // Add user2 id to user1 liked list
      try {
          userUpdateResponse = await client.update({
            index: 'tinder-users',
            type: '_doc',
            id: payload.user1,
            body: {
              "script" : {
                   "inline": "ctx._source.disliked.add(params.userId)",
                   "params" : {
                      "userId" : payload.user2
                   }
               }
            }
          });
        } catch (error) {
          console.trace(error.message)
        }

      return 'left'
    },
}

module.exports = Swipes;