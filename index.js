const Hapi = require('hapi');
const Users = require('./handlers/Users.js');
const Matches = require('./handlers/Matches.js');
const Swipes = require('./handlers/Swipes.js');

// Create a server with a host and port
const server = Hapi.server({
    host: '0.0.0.0',
    port: 8000
});


// Add the routes

// Health check
server.route({
    method: 'GET',
    path: '/health',
    handler: function(request, h) {

        return h.response('healthy').code(200);
    }
});

// Users
server.route({
    method: 'GET',
    path: '/users',
    handler: Users.getUsers
});

server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: Users.getUser
});

server.route({
    method: 'GET',
    path: '/users/{id}/recommendations',
    handler: Users.getRecommendations
});


// Matches
server.route({
    method: 'GET',
    path: '/matches/{userId}',
    handler: Matches.getMatchesForUser
});

server.route({
    method: 'POST',
    path: '/matches',
    handler: Matches.addMatch
});

// Swipes
server.route({
    method: 'POST',
    path: '/swipes',
    handler: Swipes.swipe
});


// Start the server
async function start() {

    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();