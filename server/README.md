# Setup Server
- Install postgres and initialize the server
- Configure the user, password and database variables in [db.js](db.js)
- read the instructions in [SQL File](database.sql) and run in the Postgres shell
- Create a .env in the server directory and add the following lines:
```js
ACCESS_TOKEN_SECRET=7f506bf2c033fb654d19392ac3bf65692f955b7dc4a77bfd6a7185f86f4762be0eb4d37d9d4761e2a56cfcf13503e65dc1066e5646896cc21c42623828416fdb
REFRESH_TOKEN_SECRET=2b295171caa5e3479b3253f820f4ecdd48958f42d56c0fa6c827bcdc13900a700f068f1f5aaea7e33d5f86a825637ffb11c8b03001cd9531a08efff17c863e47
COOKIE_DOMAIN=localhost
```
- Additionally you can generate your own Access and Refresh Token secrets by running the following in node for a single randomly generated string:

```js
var key = require('crypto').randomBytes(64).toString('hex');
console.log(key) //secret-key
```