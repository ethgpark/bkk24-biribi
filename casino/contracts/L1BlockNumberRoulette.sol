// SPDX-License-Identifier: ISC
pragma solidity ^0.8.27;

import { Roulette } from "./Roulette.sol";

interface IL1Blocks {
  function latestBlockNumber() external view returns (uint256);
}

contract L1BlockNumberRoulette is Roulette {
  constructor(uint256 _roundDuration) Roulette(_roundDuration) {
  }

  address constant L1_BLOCKS_ADDRESS = 0x5300000000000000000000000000000000000001;

  function latestL1BlockNumber() private view returns (uint256) {
    uint256 l1BlockNumber = IL1Blocks(L1_BLOCKS_ADDRESS).latestBlockNumber();
    return l1BlockNumber;
  }

  function _luckyNumber() external override view returns (uint8) {
    return uint8(latestL1BlockNumber() % 10);
  }
}
