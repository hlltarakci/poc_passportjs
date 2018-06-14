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

## [Authorization Flows](https://www.amazon.co.uk/Getting-Started-OAuth-Ryan-Boyd/dp/1449311601 "Book: Getting Started with OAuth 2.0, by Ryan Boyd")

The core OAuth 2.0 protocol defines four primary *grant types* used for obtaining authorization:
- ***[Authorization Code:](https://tools.ietf.org/html/rfc6749#section-1.3.1 "Authorization Code")*** The authorization code is obtained by using an authorization server as an intermediary between the client and resource owner.  Instead of requesting authorization directly from the resource owner, the client directs the resource owner to an authorization server. You can find the URL for the OAuth authorization endpoint in the API provider’s documentation. You will need to specify a few query parameters with that link:
    - *client_id*
    - *redirect_url*
    - *response_type* should be *code*
    - *scope*
    - *state:* A unique value used by your application in order to prevent cross-site request forgery (CSRF) attacks on your implementation. The value should be a random unique string for this particular request, unguessable and kept secret in the client.

    If all request parameters are valid and the user approves the data access request, the user will be redirected back to the application at the URL specified as the *redirect_uri* with the authorization code (in the URL as the *code* query parameter) and state (he value of the *state* parameter passed in the initial request to the authorization server: *http://www.example.com/oauth_callback?code=ABC1234&state=XYZ5678*

    Before directing the resource owner back to the client with the authorization code, the authorization server authenticates the resource owner and obtains authorization.  Because the resource owner only authenticates with the authorization server, the resource owner's credentials are never shared with the client.

    Exchange the *code* for an OAuth access token. A client library for OAuth does this automatically. Otherwise, you’ll need to make a HTTP POST request (needs to be authenticated using the *client_id* and *client_secret* --  include a HTTP Basic *Authorization* header as **Authorization: Basic Base64($CLIENT_ID:$CLIENT_SECRET)**) to the token endpoint with following parameters:
        - *code*
        - *redirect_uri* 
        - *grant_type:* should be *authorization_code*

    If successful, the authorization server will issue an **access_token** (short-lived). **token_type** is *bearer* (mostly). Token has a remaining life time (sec), **expires_in**. **refresh_token** (long-lived) is used to acquire a new access token after the current one expires.

    The authorization code provides a few important security benefits, such as the ability to authenticate the client, as well as the transmission of the access token directly to the client without passing it through the resource owner's user-agent and potentially exposing it to others, including the resource owner.
- ***[Client Credentials:](https://tools.ietf.org/html/rfc6749#section-1.3.4 "Client Credentials")*** Client credentials are used as an authorization grant typically when the client is acting on its own behalf (the client is also the resource owner) or is requesting access to protected resources based on an authorization previously arranged with the authorization server.
- ***[Implicit](https://tools.ietf.org/html/rfc6749#section-1.3.2 "Implicit")*** [It is generally not recommended to use the implicit flow (and some servers prohibit this flow entirely)](https://oauth.net/2/grant-types/implicit/ "OAuth 2.0 Implicit Grant")
- ***[Password Credentials](https://tools.ietf.org/html/rfc6749#section-1.3.3 "Resource Owner Password Credentials")*** The credentials should only be used when there is a high degree of trust between the resource owner and the client (e.g., the client is part of the device operating system or a highly privileged application), and when other authorization grant types are not available (such as an authorization code).

**Calling the API**: The preferred way of authorizing requests is by sending the *access_token* in a HTTP *Authorization* header. When the *access_token* expires, the
*refresh_token* parameter can be used to obtain a new access token.

# PART B: PRACTICE - [PassportJS](http://www.passportjs.org/ "PassportJS")
Passport is Express-compatible authentication middleware for Node.js. 

