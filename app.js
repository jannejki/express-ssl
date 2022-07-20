'use strict';

import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';

const sslkey = fs.readFileSync('./sertificates/ssl-key.pem');
const sslcert = fs.readFileSync('./sertificates/ssl-cert.pem')

const options = {
    key: sslkey,
    cert: sslcert
};

const app = express();
https.createServer(options, app).listen(8000);

http.createServer((req, res) => {
    res.writeHead(301, { 'Location': `https://localhost:8000${req.url}` });
    res.end();
}).listen(3000);


app.get('/', (req, res) => {
    res.send('Hello Secure World!');
});

