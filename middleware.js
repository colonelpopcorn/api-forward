const util = require('util')
const axios = require('axios')

addHeaders = function(req, res, next) {
	let appName = req.params.appName
	let listOfReqVars = process.env[appName] || false

	if (listOfReqVars) { listOfReqVars = listOfReqVars.split(',') }
	if (!util.isArray(listOfReqVars)) { listOfReqVars = [listOfReqVars] }

	req.container = {}
	req.container.headers = {}

	for (let variable of listOfReqVars) {
		req.container.headers[`${process.env[variable + '_KEY']}`] = process.env[`${variable}_VALUE`]
	}

	req.apiUrl = process.env[`${req.params.appName}_URL`] || req.body.apiUrl || false

	if (req.container.headers['']) {
		res.json({status: 'failed', response: `Key-value pair not found in env for ${req.params.appName}`})
		return
	}
	
	if(!req.apiUrl) {
		res.json({status: 'failed', response: `API url not found for ${req.params.appName}`})
		return
	}

	req.propToReturn = process.env[`${req.params.appName}_PROP_TO_RETURN`] || req.body.propToReturn || false

	if (!req.propToReturn) {
		res.json({status: 'failed', response: `Property to return not found in env or body for ${req.params.appName}`})
		return
	}

	delete req.body.propToReturn
	delete req.body.apiUrl

	next()
}

getResponse = function(req, res, next) {
	console.log(req.container.headers, req.body)
	let reqConfig = {
		url: req.apiUrl,
		headers: req.container.headers,
		params: req.body,
	}
	axios(reqConfig)
	.then(data => {
		res.json(data[req.propToReturn])
		return
	})
	.catch(error => {
		res.send({status: 'failed', response: `API request failed: ${error.message}`})
		return
	})
	return
}


module.exports = middleware = { addHeaders, getResponse }