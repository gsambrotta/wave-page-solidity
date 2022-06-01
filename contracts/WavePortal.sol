// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    // state var - stored permanently in contract storage
    uint256 totWaves;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totWaves += 1;
        console.log("adding 1 to waves");
        // msg.sender like built-in authentication
        console.log("%s has waved!", msg.sender);
    }

    function getTotWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totWaves);
        return totWaves;
    }
}
