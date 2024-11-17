import 'dotenv/config'
import http from 'node:http'
import express from 'express'
import cors from 'cors'
import rooms from './data/rooms.js'
import WebSocket from './services/WebSocket.js'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({
    rooms,
  })
})

const server = http.createServer(app)

const ws = new WebSocket()

server.on('upgrade', ws.upgrade)
server.on('close', () => {
  ws.close()
})

server.listen(3000, () => {
  console.log(`Biribi Croupier listening on port 3000`)
})
