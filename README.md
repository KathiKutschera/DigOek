# README

Create a file ".env" in the top directory (restserver - directory with this readme file inside)
and copy (and adjust according to your needs) the following into this file:

```
DB_HOST=localhost
DB_NAME=LoveFoods
DB_USER=postgres
DB_PASSWORD=PASSWORT

PORT=8088
REST=http://localhost:8088/rest
```


To start the server issue the following commands:

```
npm install

node dist/server.js
```
