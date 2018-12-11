const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const https = require('https');

app.use('/api/discord', require('./discord-oauth2'));

app.use((err, req, res, next) => {
    switch (err.message) {
        case 'NoCodeProvided':
            return res.status(400).send({
                status: 'ERROR',
                error: err.message,
            });
        default:
            return res.status(500).send({
                status: 'ERROR',
                error: err.message,
            });
    }
});


app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const securityEnabled = process.env.SECURITY_ENABLED === 'true' | false;
if (securityEnabled) {
  const credentialPath = process.env.CREDENTIAL_PATH;
  const credentials = {
    key : fs.readFileSync(path.join(credentialPath, 'privkey.pem')),
    cert : fs.readFileSync(path.join(credentialPath, 'cert.pem')),
    ca : fs.readFileSync(path.join(credentialPath, 'chain.pem'))
  };
  const server = https.createServer(credentials, app);
  server.listen(1443, () => {
    console.log('Server started!');
  });
} else {
  app.listen(1443, () => {
    console.log('Server started!');
  });
}