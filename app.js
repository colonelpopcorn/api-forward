require('dotenv').config()
const app = require('express')()
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')

validateKey = function(req, res, next) {
	req.apiKey = process.env[`${req.params.appName}_API_KEY`] || false

	req.apiUrl = process.env[`${req.params.appName}_URL`] || false

	if (!req.apiKey) {
		res.json({status: 'failed', response: `API key not found for ${req.params.appName}`})
		return
	}
	
	if(!req.apiUrl) {
		res.json({status: 'failed', response: `API url not found for ${req.params.appName}`})
		return
	}

	next()
}

getResponse = function(req, res, next) {
	let reqConfig = {
		baseUrl: req.apiUrl,
		params: req.body,
	}
	axios(reqConfig)
	.then(data => {
		res.json(data);
	})
	.catch(error => {
		console.log(error)
		res.send({status: 'failed', response: `API request failed: ${error.message}`})
	})
}

app.use(cors())

app.use(bodyParser.json())

app.get('/:appName', validateKey, getResponse)

app.get('*', function(req, res, next) {
	res.json({name: 'api-forward', version: '1.0.0'})
})

let portNumber = process.env.PORT || 3000

app.listen(portNumber, () => { console.log(`Listening on port ${portNumber}!`) })