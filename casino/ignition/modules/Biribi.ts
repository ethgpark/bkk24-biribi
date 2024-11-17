// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const ROUND_DURATION = 9

const BiribiModule = buildModule('BiribiModule', (m) => {
  const roulette = m.contract('L1BlockNumberRoulette', [ROUND_DURATION])

  return { roulette }
})

export default BiribiModule
