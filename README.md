[Under Construction]

# POC for PassportJS

# PART A: THEORY - [OAuth 2.0](https://oauth.net/2/ "OAuth 2.0")

##  [Terminology](https://www.amazon.co.uk/Getting-Started-OAuth-Ryan-Boyd/dp/1449311601 "Book: Getting Started with OAuth 2.0, by Ryan Boyd")

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
- ***Client ID:*** specified as *client_id*  when interacting with the resource server
- ***Client Secret:*** specified as *client_secret* when exchanging an authorization code

**[Bearer Tokens:](https://stackoverflow.com/a/45163991/9918578 "Bearer Token")** A security token with the property that any party in possession of the token (a "bearer") can use the token in any way that any other party in possession of it can. Using a bearer token does not require a bearer to prove possession of cryptographic key material (proof-of-possession).

The bearer token or refresh token is created for you by the authentication server. When a user authenticates your application (client), the authentication server then goes and generates for you a bearer token (refresh token) which you can then use to get an access token.

The bearer token is normally some kind of cryptic value created by the authentication server, it isn't random, it is created based upon the user giving you access and the client your application getting access.

**[JWT:](https://jwt.io/introduction/ "JSON Web Tokens")** JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

[Online tools](https://www.jsonwebtoken.io/ "Encode or Decode JWTs") are available to encode/decode JSON web tokens.

## [Authorization Flows](https://www.amazon.co.uk/Getting-Started-OAuth-Ryan-Boyd/dp/1449311601 "Book: Getting Started with OAuth 2.0, by Ryan Boyd")




# PART B: PRACTICE - [PassportJS](http://www.passportjs.org/ "PassportJS")
Passport is Express-compatible authentication middleware for Node.js. 

