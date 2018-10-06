## otss-app

A config file is required which contains the username and password for the endpoint to request the external /events api. Copy the following into config\config.js on the app level.
```
const config = {};

config.username = endpoint_username;
config.password = endpoint_password;

module.exports = config;
```
A local ``` db.json ``` will be created when server is initially started, this persists and keeps track of all registered users. 

__/register__

To register, user sends a POST with the following:

```
{
 "user": username,
 "password": password,
 "category": category,
 "genre": genre
}

```
The server responds by sending the object but password is replaced with "\********" 

__/login__

To login, the user sends a POST with the following: 

```
{
  "user": username, 
  "password": password
}
```
The server responds true if user exists else login is false and an error is displayed.

__/setPreference__

To change their preference, a user sends a POST with the following:
```
{
  "category": category,
  "genre": genre
}

```
The server responds with ``` preference updated ``` or ``` invalid category or genre```

The app uses sessions to keep track of the user, however this is stored in application memory, therefore session is lost when server is restarted. 
