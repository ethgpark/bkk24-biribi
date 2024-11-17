import { WebSocketServer } from 'ws'

class WebSocket {
  constructor() {
    this.server = new WebSocketServer({
      noServer: true,
      clientTracking: false,
    })
  }

  upgrade(req, socket, head) {
    if (!req.headers['sec-websocket-protocol']?.startsWith('access_token')) {
      socket.destroy()
      return
    }

    const accessToken = req.headers['sec-websocket-protocol'].substr(13).trim()

    this.server.handleUpgrade(req, socket, head, (ws, req) => {
    })
  }

  async close() {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

export default WebSocket
