const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const cors = require('cors');

// Ignore the secure concern here for POC
const config = {
    domain: 'dev-331120.okta.com',
    clientId: '0oa1acmo1X0zn36n04x6'
}

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `https://${config.domain}/oauth2/default`,
    clientId: config.clientId,
    assertClaims: {
        aud: 'api://default',
    },
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        return res.status(401).end();
    }

    const accessToken = match[1];
    const expectedAudience = 'api://default';

    return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
        .then((jwt) => {
            req.jwt = jwt;
            next();
        })
        .catch((err) => {
            res.status(401).send(err.message);
        });
}

const app = express();

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

app.get('/version', (req, res) => {
    res.json({ version: '1' })
})

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
    res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', authenticationRequired, (req, res) => {
    res.json([{
        message: 'Hello, word!'
    }]);
});

app.listen(4000, () => {
    console.log('Serve Ready on port 4000');
});