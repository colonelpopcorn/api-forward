import * as dotenv from 'dotenv'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as mWare from './middleware'

if (!process.env.WHITELIST) {
  app.use(cors())
} else {
  let corsOptions = {
    whitelist: process.env.WHITELIST.split(','),
    origin: function(origin, callback) {
      if (this.whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  app.use(cors(corsOptions))
}

app.use(bodyParser.urlencoded({
	extended: true
}))

app.post('/:appName', mWare.addHeaders, mWare.getResponse)

app.get('*', function(req, res, next) {
  res.json({
    name: 'api-forward',
    version: '1.0.0'
  })
})

let portNumber = process.env.PORT || 3000

app.listen(portNumber, () => {
  console.log(`Listening on port ${portNumber}!`)
})
