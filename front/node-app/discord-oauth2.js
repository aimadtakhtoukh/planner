const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('./utils');
const https = require('https');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent(process.env.REDIRECT_URL + '/api/discord/callback');
const scope = "identify";

router.get('/login', (req, res) => {
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=${scope}&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
    if (!req.query.code) throw new Error('NoCodeProvided');
    const code = req.query.code;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${creds}`,
            },
        });
    const json = await response.json();
    res.redirect(`/token/?access_token=${json.access_token}&refresh_token=${json.refresh_token}&expires_in=${json.expires_in}`);
}));

router.get('/valid', catchAsync(async (req, res) => {
  const authorization = req.headers.authorization;
  const options = {
    host: 'discordapp.com',
    port: 443,
    path: '/api/users/@me',
    method: 'GET',
    headers: {
      "Authorization" : authorization
    }
  };
  https.request(options, (r) => {
    if (r.statusCode !== 200) {
      res.status(401).send({})
    } else {
      res.status(200).send({})
    }
  }).end();
}));

router.get('/refresh', catchAsync(async (req, res) => {
  if (!req.query.refresh_token) throw new Error('NoCodeProvided');
  const refresh_token = req.query.refresh_token;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=refresh_token&refresh_token=${refresh_token}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  res.status(200).send({
    access_token : json.access_token,
    refresh_token : json.refresh_token,
    expires_in : json.expires_in
  })
}));

module.exports = router;