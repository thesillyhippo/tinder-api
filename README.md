# Tinder Swipe REST API


## Functional Requirements

1) Users can load their recommended user profiles
2) Users can swipe left or right on a user. 
	a) If two users have swiped right on each other, they're a match
	b) If User A swipes left of User B, don't show User B to User A in recommended list
3) Users can load the list of their matches


## API


### Users

#### GET /users
Returns list of all users (should be an admin endpoint)

`curl http://localhost:8000/users`

#### GET users/{id}
Returns profile of given userId

`curl http://localhost:8000/users/1`

#### GET /users/{id}/recommendations
Returns list of recommended users for given userId. Does not include any users already in liked/disliked list; also can filter out based on preferences (e.g. gender)

`curl http://localhost:8000/users/1/recommendations`


### Matches

#### GET /matches/{userId}
Returns list of matches for given userId

`curl http://localhost:8000/matches/1`


#### POST /matches 
Creates a match object in the matches index (called by swipes API)

`curl -XPOST -d'{"users":["1","4"]}' 'localhost:8000/matches'`

### Swipes


#### POST /swipes
Calls swipe API with swipe=right or swipe=left. If swiped right, adds user2 to user1's liked list, and checks user2's liked list for a match (which then calls match API). If swiped left, adds user2 to user1's disliked list.

`curl -H 'Content-Type: application/json' -XPOST -d'{"swipe":"right","user1":"3","user2":"10"}' 'localhost:8000/swipes'`

`curl -H 'Content-Type: application/json' -XPOST -d'{"swipe":"left","user1":"3","user2":"10"}' 'localhost:8000/swipes'`
