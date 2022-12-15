# Setup Info
- The database is hosted online but can be tested locally by the following steps
  - Install postgres and initialize the server
  - Configure the user, password and database variables in [db.js](db.js)
  - read the instructions in [SQL File](database.sql) and run in the Postgres shell
  - Create a .env in the server directory and add the following lines:
```ts
ACCESS_TOKEN_SECRET="7f506bf2c033fb654d19392ac3bf65692f955b7dc4a77bfd6a7185f86f4762be0eb4d37d9d4761e2a56cfcf13503e65dc1066e5646896cc21c42623828416fdb"
REFRESH_TOKEN_SECRET="2b295171caa5e3479b3253f820f4ecdd48958f42d56c0fa6c827bcdc13900a700f068f1f5aaea7e33d5f86a825637ffb11c8b03001cd9531a08efff17c863e47"
COOKIE_DOMAIN="localhost"
DATABASE_URL="string of the hosted postgres db through Railway.app"
```
- Additionally you can generate your own Access and Refresh Token secrets by running the following in node for a single randomly generated string:

```js
var key = require('crypto').randomBytes(64).toString('hex');
console.log(key) //secret-key
```
## View the hosted database

To view the remotely hosted database, you can do so through ``pgadmin`` which allows remote connections 

- Create a new server group and provide the details from the db string in the ``.env``
- Container link, User, Password and Port are present in the string which need to be filled in the options while creating a new server connection
- After then, navigate to the ``public`` group and under the ``Schemas`` section, you can use the Query Tool in the respective tables to run queries and view data