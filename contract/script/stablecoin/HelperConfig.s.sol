// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {MockV3Aggregator} from "../../test/mocks/MockV3Aggregator.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
import {WETH} from "../../src/WETH.sol";
import {WBTC} from "../../src/WBTC.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        address wethUsdPriceFeed;
        address wbtcUsdPriceFeed;
        address weth;
        address wbtc;
        uint256 deployerKey;
    }

    uint8 public constant DECIMALS = 8;
    int256 public constant ETH_USD_PRICE = 2000e8;
    int256 public constant BTC_USD_PRICE = 1000e8;
    int256 public constant ETH_NGN_PRICE = 4000000e8;
    int256 public constant BTC_NGN_PRICE = 100000000e8;
    uint256 public DEFAULT_ANVIL_KEY =
        0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6;
    NetworkConfig public activeNetworkConfig;

    constructor() {
        if (block.chainid == 11155111) {
            activeNetworkConfig = getSepoliaEthConfig();
        }
        if (
            block.chainid == 4202 ||
            block.chainid == 534351 ||
            block.chainid == 84532
        ) {
            activeNetworkConfig = getOtherChainConfig();
        } else {
            activeNetworkConfig = getOrCreateAnvilEthConfig();
        }
    }

    function getSepoliaEthConfig() public view returns (NetworkConfig memory) {
        return
            NetworkConfig({
                wethUsdPriceFeed: 0x694AA1769357215DE4FAC081bf1f309aDC325306,
                wbtcUsdPriceFeed: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43,
                weth: 0xdd13E55209Fd76AfE204dBda4007C227904f0a81,
                wbtc: 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063,
                deployerKey: vm.envUint("PRIVATE_KEY")
            });
    }

    function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
        if (activeNetworkConfig.wethUsdPriceFeed != address(0)) {
            return activeNetworkConfig;
        }

        vm.startBroadcast();
        MockV3Aggregator ethUsdPriceFeed = new MockV3Aggregator(
            DECIMALS,
            ETH_NGN_PRICE
        );
        ERC20Mock wethMock = new ERC20Mock();

        MockV3Aggregator btcUsdPriceFeed = new MockV3Aggregator(
            DECIMALS,
            BTC_NGN_PRICE
        );
        ERC20Mock wbtcMock = new ERC20Mock();

        vm.stopBroadcast();

        return
            NetworkConfig({
                wethUsdPriceFeed: address(ethUsdPriceFeed),
                wbtcUsdPriceFeed: address(btcUsdPriceFeed),
                weth: address(wethMock),
                wbtc: address(wbtcMock),
                deployerKey: DEFAULT_ANVIL_KEY
            });
    }

    function getOtherChainConfig() public returns (NetworkConfig memory) {
        if (activeNetworkConfig.wethUsdPriceFeed != address(0)) {
            return activeNetworkConfig;
        }

        vm.startBroadcast();
        MockV3Aggregator ethNgnPriceFeed = new MockV3Aggregator(
            DECIMALS,
            ETH_NGN_PRICE
        );
        WETH wethMock = new WETH();

        MockV3Aggregator btcNgnPriceFeed = new MockV3Aggregator(
            DECIMALS,
            BTC_NGN_PRICE
        );
        WBTC wbtcMock = new WBTC();

        vm.stopBroadcast();

        return
            NetworkConfig({
                wethUsdPriceFeed: address(ethNgnPriceFeed),
                wbtcUsdPriceFeed: address(btcNgnPriceFeed),
                weth: address(wethMock),
                wbtc: address(wbtcMock),
                deployerKey: vm.envUint("PRIVATE_KEY2")
            });
    }
}