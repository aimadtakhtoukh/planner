const express = require('express');
const path = require('path');
const app = express();
/*
const fs = require('fs');
const https = require('https');
*/

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

app.listen(4200, () => {
    console.log('Server started!');
});

/*
console.log(fs.readFileSync('../keystore.p12'));
const credentials = {
    cert : fs.readFileSync('../keystore.p12')
};
https.createServer(credentials, app);
https.listen(4200, () => {
  console.log('Server started!');
});
*/