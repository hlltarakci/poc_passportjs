[Under Construction]

# POC for PassportJS

# PART A: THEORY - [OAuth 2.0](https://oauth.net/2/ "OAuth 2.0")

##  [Terminology](https://www.amazon.co.uk/Getting-Started-OAuth-Ryan-Boyd/dp/1449311601 "Book: Getting Started with OAuth 2.0, by Ryan Boyd")

<details>
<summary>..click to see terminology..</summary>

**Authentication:** Authentication is the process of verifying the identity of a user—knowing that the user is who they claim to be.

**Federated Authentication:** Although many applications have their own system of accounts (including usernames
and passwords), some applications rely on other services to verify the identity of users.
This is called federated authentication.

In a corporate IT environment, applications may trust an Active Directory server, a
LDAP server, or a SAML provider to authenticate users.

On the Web, applications often trust OpenID providers (such as Google) to
handle the authentication of users.

**OpenID Connect** is the next-generation version of OpenID based on OAuth 2.0.

**Authorization:** Authorization is the process of verifying that a user has the right to perform some action. This typically first requires valid identification of the user (authentication) in order to check whether the actual user is authorized.

A web application first verifies your identity by logging you in, and then it ensures that you access only the data and services you’re allowed to, typically by checking an access control list for each operation.

**Delegated Authorization:** Delegated authorization is granting access to another person or application to perform actions on your behalf.

A user grants access to an application to perform actions on the user’s behalf and the application can only perform the authorized actions.

**Roles:** Actors in the OAuth protocol flows:

- ***Resource server***  hosts user-owned resources that are protected by OAuth. 
- ***Resource owner*** has the ability to grant access to their(user's) own data hosted on the resource server.
- ***Client*** is an application making API requests to perform actions on protected resources on behalf of the resource owner and with its authorization.
- ***Authorization server*** gets consent from the resource owner and issues access tokens to clients for accessing protected resources hosted by a resource server.

**Application Registration:** OAuth requires that applications register with the authorization server so that API requests are able to be properly identified. 

Registration enables the application developer to obtain client credentials, which are
used to authenticate requests made to the authorization server. 
- ***client_id:*** specified as *client_id*  when interacting with the resource server
- ***client_secret:*** specified as *client_secret* when exchanging an authorization code
- ***redirect_uri:*** the location the user should be returned to after they approve access for your app (meaningful for authorization code flow).
- ***scope:*** The data your application is requesting access to. 

**[Bearer Tokens:](https://stackoverflow.com/a/45163991/9918578 "Bearer Token")** A security token with the property that any party in possession of the token (a "bearer") can use the token in any way that any other party in possession of it can. Using a bearer token does not require a bearer to prove possession of cryptographic key material (proof-of-possession).

The bearer token or refresh token is created for you by the authentication server. When a user authenticates your application (client), the authentication server then goes and generates for you a bearer token (refresh token) which you can then use to get an access token.

The bearer token is normally some kind of cryptic value created by the authentication server, it isn't random, it is created based upon the user giving you access and the client your application getting access.

**[JWT:](https://jwt.io/introduction/ "JSON Web Tokens")** JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

[Online tools](https://www.jsonwebtoken.io/ "Encode or Decode JWTs") are available to encode/decode JSON web tokens.

The end goal of using OAuth is the same: you’re trying to obtain an OAuth access token that your application can use to perform API requests on behalf of a user or the application itself. Send the access token in a *HTTP **Authorization** header*
</details>

## [Authorization Flows](https://www.amazon.co.uk/Getting-Started-OAuth-Ryan-Boyd/dp/1449311601 "Book: Getting Started with OAuth 2.0, by Ryan Boyd")

The core OAuth 2.0 protocol defines four primary *grant types* used for obtaining authorization:
### [Authorization Code](https://tools.ietf.org/html/rfc6749#section-1.3.1 "Authorization Code")
<details>
<summary>..click to see authorization code grant..</summary>

The *authorization code* is obtained by using an *authorization server* as an intermediary between the *client* and *resource owner*.  

You can find the URL for the OAuth *authorization endpoint* in the API provider’s documentation. 

You will need to specify a few query parameters with that link:
- **client_id**
- **redirect_url**
- **response_type** should be **code**
- **scope**
- **state:** A unique value to prevent cross-site request forgery (CSRF) attacks. should be a random unique string for this particular request.

If successful, the user will be redirected back to the application at the URL specified as the **redirect_uri** with the authorization code (in the URL as the **code** query parameter) and state (the value of the **state** parameter passed in the initial request to the authorization server): *http://www.example.com/oauth_callback?code=ABC1234&state=XYZ5678*

Because the *resource owner* only authenticates with the *authorization server*, the *resource owner*'s credentials are never shared with the *client*.

Exchange the **code** for an *access token*. A client library for OAuth does this automatically. Otherwise, make an HTTP POST request. It should be authenticated by including an HTTP Basic *Authorization* header as **Authorization: Basic Base64($CLIENT_ID:$CLIENT_SECRET)**

The HTTP post request should use following parameters:

- *code*
- *redirect_uri* 
- *grant_type:* should be *authorization_code*

**[Access Token Response:](https://tools.ietf.org/html/rfc6749#section-4.1.4 "Authorization Code Access Token Response")**

If successful, the authorization server will issue an **access_token** (short-lived).

**token_type** is *bearer* (mostly). 

Token has a remaining life time (sec), **expires_in**. 

**refresh_token** (long-lived) is used to acquire a new access token after the current one expires.
</details>

### [Client Credentials:](https://tools.ietf.org/html/rfc6749#section-1.3.4 "Client Credentials")

<details>
<summary>..click to see client credentials grant..</summary>

*Client credentials* are used as an authorization grant typically when the *client* is acting on its own behalf (the *client* is also the *resource owner*) or is requesting access to protected resources based on an authorization previously arranged with the *authorization server*.

You can find the *authorization server*’s token URL in the API provider’s documentation. 

The required POST parameters:

- **grant_type:** should be **client_credentials**
- **client_id**
- **client_secret**

**[Access Token Response:](https://tools.ietf.org/html/rfc6749#section-4.4.3 "Client Credentials Access Token Response")**
If successful, an **access_token** is returned to
the client.

The *client credentials* flow typically provides a long-lived **access_token**, does not issue **refresh token**., Simply ask for a new **access_token** when expired.
</details>

### [Implicit](https://tools.ietf.org/html/rfc6749#section-1.3.2 "Implicit")

<details>
<summary>..click to see implicit grant..</summary>

[It is generally not recommended to use the implicit flow (and some servers prohibit this flow entirely)](https://oauth.net/2/grant-types/implicit/ "OAuth 2.0 Implicit Grant")
</details>

### [Password Credentials](https://tools.ietf.org/html/rfc6749#section-1.3.3 "Resource Owner Password Credentials")

<details>
<summary>..click to see password credentials grant..</summary>

The credentials should only be used when there is a high degree of trust between the resource owner and the client (e.g., the client is part of the device operating system or a highly privileged application), and when other authorization grant types are not available (such as an authorization code).
</details>

### Calling the API

<details>
<summary>..click to see how to call API..</summary>

The preferred way of authorizing requests is by sending the *access_token* in a HTTP *Authorization* header. When the *access_token* expires, the
*refresh_token* parameter can be used to obtain a new access token.
</details>

## [OpenID Connect (OIDC)](http://openid.net/connect/ "OpenID Connect")

[*OpenID Connect* has been developed by extending *OAuth 2.0*.](https://medium.com/@darutk/diagrams-of-all-the-openid-connect-flows-6968e3990660 "Diagrams of All The OpenID Connect Flows")

*OAuth 2.0* is a specification as to how to issue **access_token**, whereas *OpenID Connect* is a specification as to how to issue **id_token** (from *UserInfo* endpoint of the OpenID provider).

[OpenID Connect is an increasingly common authentication protocol: when an app prompts you to authenticate using your Facebook or Google+ credentials, the app is probably using OpenID Connect.](https://developers.onelogin.com/openid-connect "OIDC Overview")

# PART B: PRACTICE - [PassportJS](http://www.passportjs.org/ "PassportJS")
[Passport is Express-compatible authentication middleware for Node.js.](https://github.com/jaredhanson/passport "PassportJS Github Repo")

It is designed to serve a singular purpose: authenticate requests.

Each application has unique authentication requirements. Authentication mechanisms, known as *strategies*, are packaged as individual modules. Applications can choose which strategies to employ.

Passport does not mount routes or assume any particular database schema, which maximizes flexibility and allows application-level decisions to be made by the developer. 

The API is simple: you provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.

## How to Use
<details>
<summary>..click to see usage..</summary>

*Strategies* must be configured prior to using them in a route:

``` js
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

For persistent login *sessions*,the authenticated user must be *serialized* to the session, and *deserialized* when subsequent requests are made.

``` js
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
```

To use Passport in an Express, configure it with the required **passport.initialize()** middleware. If your application uses persistent login *sessions* (recommended, but not required), **passport.session()** middleware must also be used.

``` js
var app = express();
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
```

**authenticate()** function is used as route middleware to authenticate requests.

``` js
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```
</details>

## [Examples](https://github.com/jaredhanson/passport#examples "Example Tutors")
<details>
<summary>..click to see example tutorial links..</summary>

[Express 4.x app using Passport for authentication with username and password](https://github.com/passport/express-4.x-local-example)

[Express 4.x app using Passport for authentication via OpenID Connect](https://github.com/passport/express-4.x-openidconnect-example)

[User Authentication with Passport and Express 4](http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/ "User Authentication with Passport and Express 4") / [Code](https://github.com/mjhea0/passport-local-express4)

[Social Authentication in Node.js with Passport](http://mherman.org/blog/2015/09/26/social-authentication-in-node-dot-js-with-passport/ "Social Authentication in Node.js with Passport") / [Code](https://github.com/mjhea0/passport-social-auth)

[Facebook authentication strategy for Passport and Node.js](https://github.com/jaredhanson/passport-facebook "Code for Facebook authentication strategy for Passport and Node.js")

[OpenId Connect client examples](https://github.com/hlltarakci/onelogin-oidc-node "Code for OpenId Connect client examples")

</details>

## POC Content
This POC provides:

- [x] [Local Strategy Example](examples/localStrategy)

- [ ] [Federated Authentication on Azure (Azure Active Directory) Example](examples/federatedAuthenticationOnAzure)

- [ ] [Fast Token Library Example](examples/fastTokenLibrary)

