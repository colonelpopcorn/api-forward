const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())

app.get('/:appName', function(req, res, next) {
	let key = process.env[`${req.params.appName}_API_KEY`] || false

	if (!key) {
		res.json({status: 'failed', response: `API key not found for ${req.params.appName}`})
		return
	}

	res.json({status: 'good', response: `GOOD!`})

	/*
	axios.get({

	})
	.then(function(response, err) {

	})
	*/
})

app.get('*', function(req, res, next) {
	res.json({name: 'api-forward', version: '1.0.0'})
})

let portNumber = process.env.PORT || 3000

app.listen(portNumber, () => { console.log(`Listening on port ${portNumber}!`) })