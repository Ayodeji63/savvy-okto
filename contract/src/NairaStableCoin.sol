// SPDX-License-Identifier: SEE LICENSE IN LICENSE

// This is considered an Exogenous, Decentralized, Anchored (pegged), Crypto Collateralized low volitility coin

// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions

pragma solidity ^0.8.18;

import {ERC20Burnable, ERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DecentralizeStableCoin
 * @author Ayo.eth
 * Collateral: Exogenous (ETH & BTC)
 * Minting: Algorithmic
 * Relatice Stability: Pegged to USD
 *
 * This is the contrat meant to be governed by DSCEngine. This contract is hust the ERC20 implementation of our stablecoin system
 */

contract NairaStableCoin is ERC20Burnable, Ownable {
    error DecentralizedStableCoin__BurnAmountExceedsBalnce();
    error DecentralizedStableCoin__NotZeroAddress();
    error DecentralizedStableCoin__MustBeMoreThanZero();

    constructor(
        address initialOwner
    ) ERC20("NairaStableCoin", "NGNS") Ownable(initialOwner) {}

    function burn(uint256 _amount) public override onlyOwner {
        uint256 balance = balanceOf(msg.sender);
        if (_amount <= 0) {
            revert DecentralizedStableCoin__MustBeMoreThanZero();
        }
        if (balance < _amount) {
            revert DecentralizedStableCoin__BurnAmountExceedsBalnce();
        }
        super.burn(_amount);
    }

    function mint(
        address _to,
        uint256 _amount
    ) external onlyOwner returns (bool) {
        if (_to == address(0)) {
            revert DecentralizedStableCoin__NotZeroAddress();
        }
        if (_amount <= 0) {
            revert DecentralizedStableCoin__MustBeMoreThanZero();
        }
        _mint(_to, _amount);
        return true;
    }
}
