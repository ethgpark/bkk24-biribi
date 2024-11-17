// SPDX-License-Identifier: ISC
pragma solidity ^0.8.27;

interface IRoulette {
  function place(uint8 _choice) external payable;
  function nextRound() external view returns (uint256);
  function spin() external returns (address[] memory);
}
