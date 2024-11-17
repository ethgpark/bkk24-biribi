// SPDX-License-Identifier: ISC
pragma solidity ^0.8.27;

import { IRoulette } from "./interfaces/IRoulette.sol";

abstract contract Roulette is IRoulette {
  struct Bet {
    uint8 choice;
    uint256 value;
    address player;
  }

  Bet[] public roundBets;

  error BetChoiceInvalid();
  error BetValueRequired();

  uint256 public roundDuration;
  uint256 public lastRound;

  error RoundEnded();
  error RoundInProgress();

  constructor(uint256 _roundDuration) {
    roundDuration = _roundDuration;
    lastRound = block.number;
  }

  function place(uint8 _choice) public payable {
    require(nextRound() >= block.number, RoundEnded());
    require(_choice < 10, BetChoiceInvalid());
    require(msg.value > 0, BetValueRequired());

    roundBets.push(Bet({
      choice: _choice,
      value: msg.value,
      player: msg.sender
    }));
  }

  function nextRound() public view returns (uint256) {
    return lastRound + roundDuration;
  }

  function _luckyNumber() external virtual view returns (uint8);

  function spin() public returns (address[] memory) {
    require(nextRound() < block.number, RoundInProgress());

    // Go find the winning number
    uint8 number = this._luckyNumber();

    // Number of bets done in this round
    uint256 totalBets = roundBets.length;

    // Winners of this round
    uint256 totalWinners = 0;
    address[] memory winners;

    while (totalBets > 0) {
      Bet memory bet = roundBets[totalBets - 1];

      if (bet.choice == number) {
        winners[totalWinners] = bet.player;
        totalWinners = totalWinners + 1;
      }

      roundBets.pop();
    }

    // Finish the round
    lastRound = block.number;

    // Give all possible ETH to winners
    // If none, all ETH is left for the winners of the next round
    if (totalWinners > 0) {
      // The amount that each player wins
      // There could be left some ETH left as it get rounded towards zero
      uint256 value = address(this).balance / totalWinners;

      // Pay the relative amount to all winners
      for (uint p = 0; p < totalWinners; p++) {
        address payable winner = payable(winners[p]);
        winner.transfer(value);
      }
    }

    return winners;
  }
}
