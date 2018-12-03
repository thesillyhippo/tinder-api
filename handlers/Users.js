// server.route({
//     method:'GET',
//     path:'/users',
//     async handler(request,h) {
//         let response = {};
//         try {
//           response = await client.search({
//             index: 'users',
//             q: '*'
//           });
//         } catch (error) {
//           console.trace(error.message)
//         }
//         response = response.hits ? response.hits.hits : [];
//         return response.map(o=>o._source);
//     }
// });

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '0.0.0.0:9200',
  log: 'trace'
});


const Users = {
    getUsers: async function(request, h) {
        let response = {};
        try {
          response = await client.search({
            index: 'tinder-users',
            q: '*'
          });
        } catch (error) {
          console.trace(error.message)
        }
        response = response.hits ? response.hits.hits : [];
        return response.map(o=>o._source);
    },
    getUser: async function(request, h) {
        let id = request.params.id;
        let response = {};
        try {
          response = await client.get({
            index: 'tinder-users',
            type: '_all',
            id: id
          });
          console.log(response.hits.hits)
        } catch (error) {
          console.trace(error.message)
        }
        response = response._source;

        return response;
    },
    getRecommendations: async function(request, h) {
        let id = request.params.id;
        let response = {};


        // First get user & get liked/disliked list
        let user = await Users.getUser(request,h) || {liked: [], disliked: []};
        let blackList = user.liked.concat(user.disliked);
        console.log(blackList);

        const query = {
              "query" : {
                "bool" : {
                  "must_not" : {
                    "terms" : {
                      "_id" : ["lFqUdWcBZvF2Y5BZUwPs"]
                    }
                  }
                }
              }
            };

        try {
          response = await client.search({
            index: 'tinder-users',
            body: query
          });
        } catch (error) {
          console.trace(error.message)
        }
        response = response.hits ? response.hits.hits : [];
        return response.map(o=>o._source);
    }
}

module.exports = Users;