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
		headers: { "Authorization" : `Bearer ${req.apiKey}` },
		params: req.body,
	}
	axios(reqConfig)
	.then(data => {
		res.json(data);
		return
	})
	.catch(error => {
		console.log(error)
		res.send({status: 'failed', response: `API request failed: ${error.message}`})
		return
	})
	return
}


module.exports = middleware = { validateKey, getResponse }