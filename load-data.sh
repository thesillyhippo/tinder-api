#!/bin/bash

#curl -X DELETE "localhost:9200/tinder-users"

# curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d'
# { "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "1" } }
# {"name":"John Doe","gender":"m","age":"30","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "2" } }
# {"name":"Jane Doe","gender":"f","age":"28","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "3" } }
# {"name":"Jake Doe","gender":"m","age":"31","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc" } }
# {"name":"Jill Doe","gender":"f","age":"29","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc" } }
# {"name":"John Smith","gender":"m","age":"30","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc" } }
# {"name":"Billy Madison","gender":"m","age":"30","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc" } }
# {"name":"Jen Lopez","gender":"f","age":"28","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc" } }
# {"name":"Harry Potter","gender":"m","age":"31","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc" } }
# {"name":"Jillian Cooper","gender":"f","age":"29","liked":[],"disliked":[]}
# { "index" : { "_index" : "tinder-users", "_type" : "_doc" } }
# {"name":"Drake Malfoy","gender":"m","age":"30","liked":[],"disliked":[]}
# '


curl -X DELETE "localhost:9200/tinder-matches"

curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d'
{ "index" : { "_index" : "tinder-matches", "_type" : "_doc" } }
{"users":["1","2"]}
{ "index" : { "_index" : "tinder-matches", "_type" : "_doc" } }
{"users":["2","3"]}
'




