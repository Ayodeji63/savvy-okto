// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {Test, console} from "forge-std/Test.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
import {DSCEngine} from "../../src/DSCEngine.sol";
import {WETH} from "../../src/WETH.sol";

contract MintToken is Script {
    address private initialOwner = vm.envAddress("INITIAL_OWNER");

    function run() external {
        address mockERC20 = DevOpsTools.get_most_recent_deployment(
            "WETH",
            block.chainid
        );
        console.log("Addres is ", mockERC20);
        _mintToken(mockERC20);
    }

    function _mintToken(address _token) public {
        ERC20Mock(_token).mint(initialOwner, 1_000_000_000_000_000_000e18);
    }
}

contract Engine {
    uint256 initialBalance = 1_000_000_000e18;

    function run() external {
        address engine = DevOpsTools.get_most_recent_deployment(
            "DSCEngine",
            block.chainid
        );
        address mockERC20 = DevOpsTools.get_most_recent_deployment(
            "WETH",
            block.chainid
        );
        // console.log("Addres is ", mockERC20);
        // console.log("Addres is ", mockERC20);
        // _mintToken(mockERC20);
        approveEngine(engine, mockERC20);
    }

    function approveEngine(address _engine, address _token) public {
        // DSCEngine(address);
        WETH(_token).approve(_engine, initialBalance);
    }
}
