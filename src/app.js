import express from 'express'
import bodyParser from 'body-parser'
import { render, extractor } from './controllers/index.js'

const port = process.env.PORT || 3000

const app = express()

// configure body-parser for express
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Error page.
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send(err)
})
// render route.
app.post('/render', render)
// extractor route.
app.post('/extractor', extractor)

app.listen(port, () => {
    console.info(`Listen port on ${port}.`)
})

// Terminate process
process.on('SIGINT', () => {
    process.exit(0)
})

