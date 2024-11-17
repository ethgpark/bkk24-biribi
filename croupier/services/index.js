import { DYNAMIC_ENV_ID } from '../data/config'
import Dynamic from './Dynamic'
import WebSocket from './WebSocket'

export default {
  auth: new Dynamic(DYNAMIC_ENV_ID),
  ws: new WebSocket(),
}
