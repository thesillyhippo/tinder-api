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

#### GET users/{id}

#### GET /users/{id}/recommendations



### Matches

#### GET /matches/{userId}


#### POST /matches 



### Swipes


#### POST /swipes


