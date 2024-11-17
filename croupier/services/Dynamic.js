import { JwksClient } from 'jwks-rsa'
import jwt from 'jsonwebtoken'

class Dynamic {
  constructor(environmentId) {
    this.client = new JwksClient({
      jwksUri: `https://app.dynamic.xyz/api/v0/sdk/${environmentId}/.well-known/jwks`,
      rateLimit: true,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 600000,
    })
  }

  async init() {
    const signingKey = await client.getSigningKey()
    const publicKey = signingKey.getPublicKey()

    this.publicKey = publicKey
    this.initialized = true
  }

  async auth(encodedJwt) {
    if (!this.initialized) {
      await this.init()
    }

    const payload = jwt.verify(encodedJwt, this.publicKey)

    if (
      payload != null &&
      typeof payload === 'object' &&
      'verified_account' in payload &&
      payload.verified_account != null &&
      typeof payload.verified_account === 'object' &&
      'address' in payload.verified_account &&
      payload.verified_account.address != null &&
      typeof payload.verified_account.address === 'string' &&
      payload.verified_account.address.startsWith('0x')
    ) {
      return payload.verified_account.address
    }

    throw new Error('Cannot find address in JWT')
  }
}

export default Dynamic
