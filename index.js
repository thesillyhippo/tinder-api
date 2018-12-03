const Hapi = require('hapi');
const Users = require('./handlers/Users.js');
const Matches = require('./handlers/Matches.js');

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:8000
});

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '0.0.0.0:9200',
  log: 'trace'
});

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
});

console.log(Users.getUsers)

server.route({
    method:'GET',
    path:'/users',
    // async handler(request,h) {
    //     let response = {};
    //     try {
    //       response = await client.search({
    //         index: 'users',
    //         q: '*'
    //       });
    //     } catch (error) {
    //       console.trace(error.message)
    //     }
    //     response = response.hits ? response.hits.hits : [];
    //     return response.map(o=>o._source);
    // }
    handler: Users.getUsers
});

server.route({
    method:'GET',
    path:'/users/{id}',
    handler: Users.getUser
});

server.route({
    method:'GET',
    path:'/users/{id}/recommendations',
    handler: Users.getRecommendations
});

server.route({
    method:'GET',
    path:'/matches/{userId}',
    handler: Matches.getMatchesForUser
});


// server.route({
//     method:'POST',
//     path:'/users',
//     async handler(request,h) {
//         let payload = request.payload;
//         let response = {};
//         try {
//           response = await client.create({
//             index: 'users',
//             type: '_doc',
//             id: payload.id,
//             body: {
//                 name: payload.name
//             }
//           });
//         } catch (error) {
//             if (error.statusCode == 409) {
//                 return h.response('User already created with id ' + payload.id).code(409);
//             } else {
//                 return error.response;
//             }
//         }
//         console.log(response);
//         response = response._source;
//         if (response.result == 'created') {
//             return 'User created';
//         } else {
//             return 'User not created for some reason';
//         }
//     }
// });

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();