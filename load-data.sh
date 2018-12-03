#!/bin/bash

# Delete Users index
curl -X DELETE "localhost:9200/tinder-users"

# Add sample data to Users index
curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d'
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "1" } }
{"name":"John Doe","gender":"m","age":"30","liked":["2"],"disliked":[], "preferences": {"gender": ["f"]}}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "2" } }
{"name":"Jane Doe","gender":"f","age":"28","liked":["1","3"],"disliked":[], "preferences": {"gender": ["m"]}}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "3" } }
{"name":"Jake Doe","gender":"m","age":"31","liked":["1"],"disliked":[]}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "4" } }
{"name":"Jill Doe","gender":"f","age":"29","liked":[],"disliked":[]}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "5" } }
{"name":"John Smith","gender":"m","age":"30","liked":[],"disliked":[]}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "6" } }
{"name":"Billy Madison","gender":"m","age":"30","liked":[],"disliked":[]}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "7" } }
{"name":"Jen Lopez","gender":"f","age":"28","liked":[],"disliked":[]}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "8" } }
{"name":"Harry Potter","gender":"m","age":"31","liked":[],"disliked":[]}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "9" } }
{"name":"Jillian Cooper","gender":"f","age":"29","liked":[],"disliked":[]}
{ "index" : { "_index" : "tinder-users", "_type" : "_doc", "_id": "10" } }
{"name":"Drake Malfoy","gender":"m","age":"30","liked":[],"disliked":["8"]}
'

# Delete tinder matches index
curl -X DELETE "localhost:9200/tinder-matches"

# Add sample tinder matches data
curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d'
{ "index" : { "_index" : "tinder-matches", "_type" : "_doc" } }
{"users":["1","2"]}
{ "index" : { "_index" : "tinder-matches", "_type" : "_doc" } }
{"users":["2","3"]}
'


