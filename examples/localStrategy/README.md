# PassportJS Local Strategy Example

In this demonstration, an express 4.x skeleton project is equipped with passport js local strategy. Below headings provide steps done to make it work. 

You can examine [the commit]("https://github.com/hlltarakci/poc_passportjs/commit/c091c21b10d6549a8d6fd4c33e0b561b179fe1ae?diff=split").

For more about theory, please [see](https://github.com/hlltarakci/poc_passportjs).

## Skeleton: Express 4.x App
Skeleton application is created by [express application generator](https://expressjs.com/en/starter/generator.html "Express application generator"). (*Express 4.16*)

``` bash
npm install
```

## Database: [MongoDB](https://www.mongodb.com/download-center "MongoDB")
- Install [MongoDB Community Server](https://www.mongodb.com/download-center "MongoDB Download Center")
- For Windows, make sure **C:\data\db** exists.
- Run **C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe**
- Can observe database using MongoDB Compass

## ODM: [Mongoose](http://mongoosejs.com/ "Mongoose")
``` bash
npm install mongoose -save
```
Add [**User**](models/user.js)

## Passport and Local Strategy
```  bash
npm install passport passport-local passport-local-mongoose connect-flash -save
npm intall express-session -save
```

## [app.js](app.js) - mongoose support

Require mongoose and model:
``` js
var mongoose = require('mongoose');
var User = require('./models/user');
```

Connect db:
``` js
mongoose.connect('mongodb://localhost/localStrategyExample');
```

## [app.js](app.js) - passportjs support
Require passport:
``` js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
```

Configure *strategy*:
``` js
passport.use(new LocalStrategy(User.authenticate()));

```

Serialize/deserialize user for *session* persistence:
``` js
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

Initialize:
``` js
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
```

## Routes - [routes/index.js](routes/index.js)
Require passport and model
``` js
const passport = require('passport');
const User = require('../models/user');
```

Add endpoints *register*, *login*, *logout*

Update [views/index.jade](views/index.jade) to show *register*, *login* and *logout*

Add [views/login.jade](views/login.jade), [views/register.jade](views/register.jade)

## Credit
I want to mention that [this tutorial](http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/) helped me a lot.

## TODO
- [ ] Unit tests