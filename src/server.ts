import http from 'node:http'
import next from 'next'
import express from 'express'

import { Server } from 'socket.io'
import apiRoute from './api/api.route'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const PORT = 3000

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port: PORT })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  const httpServer = http.createServer(server)
  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log('Client connected')
  })

  server.set('socketio', io)

  server.use('/api', apiRoute)

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  server.all('*', async (req, res) => {
    await handler(req, res)
  })

  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.error(error)
})
