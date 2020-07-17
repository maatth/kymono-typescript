import express, { Request, NextFunction, Response } from 'express'
import { MikroORM } from 'mikro-orm'
import createrRouter from './routes/createrRouter'

var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
const router = createrRouter()
export let orm: MikroORM

var app = express()

async function startServer() {
  orm = await require('./createDatabase')()

  var isProduction = process.env.NODE_ENV === 'production'

  app.use(logger('dev'))
  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))

  app.use('/api', router)

  if (isProduction) {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
  }

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    var err = new Error('Not Found 🤷‍♀️')
    res.status(404)
    next(err)
  })

  // production error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (!isProduction) {
      console.log(err.stack)
    }
    res.status(res.statusCode || 500)
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    })
  })
}

startServer()

module.exports = app
