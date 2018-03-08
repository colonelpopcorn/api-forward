const express = require('express');
const app = express();

app.get('*', function(req, res, next) {
	res.json({name: 'api-forward', version: '1.0.0'});
});

let portNumber = process.env.PORT || 3000;

app.listen(portNumber, () => { console.log(`Listening on port ${portNumber}!`); });