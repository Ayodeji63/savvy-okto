// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract FinanceDashboardNFT is ERC721 {
    using Strings for uint256;

    struct UserStats {
        uint256 totalSavings;
        uint256 loansRepaid;
        uint256 totalLoans;
        uint256 creditScore;
        string status;
    }

    mapping(uint256 => UserStats) public tokenIdToStats;
    uint256 private s_tokenCounter;
    address public immutable savingsContract;

    constructor(address _savingsContract) ERC721("Finance Dashboard", "FDASH") {
        savingsContract = _savingsContract;
    }

    function generateSVG(
        uint256 tokenId
    ) internal view returns (string memory) {
        UserStats memory stats = tokenIdToStats[tokenId];

        // Calculate percentage for pie chart
        uint256 loanSuccessRate = stats.totalLoans > 0
            ? (stats.loansRepaid * 100) / stats.totalLoans
            : 0;

        // Convert to stroke-dasharray values (314 is approximately 2π*50)
        uint256 successDash = (314 * loanSuccessRate) / 100;
        uint256 remainingDash = 314 - successDash;

        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">',
                    // Include all the defs (gradients and filters) from above SVG
                    "<defs>",
                    generateDefs(),
                    "</defs>",
                    // Background
                    '<rect width="400" height="400" fill="url(#bgGradient)"/>',
                    // Phone Frame
                    generatePhoneFrame(),
                    // Stats
                    generateStats(stats),
                    // Pie Chart
                    generatePieChart(
                        successDash,
                        remainingDash,
                        loanSuccessRate
                    ),
                    // Badges
                    generateBadges(stats),
                    "</svg>"
                )
            );
    }

    function generateDefs() internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">',
                    '<stop offset="0%" style="stop-color:#9B89D9"/>',
                    '<stop offset="100%" style="stop-color:#B19FE8"/>',
                    "</linearGradient>",
                    '<linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="0%">',
                    '<stop offset="0%" style="stop-color:#4FD1C5"/>',
                    '<stop offset="100%" style="stop-color:#63B3ED"/>',
                    "</linearGradient>",
                    '<filter id="shadow">',
                    '<feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.25"/>',
                    "</filter>"
                )
            );
    }

    function generatePhoneFrame() internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<rect x="50" y="40" width="300" height="320" rx="20" fill="white" filter="url(#shadow)"/>',
                    '<rect x="60" y="50" width="280" height="300" rx="15" fill="#F7FAFC"/>'
                )
            );
    }

    function generateStats(
        UserStats memory stats
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    // Savings Card
                    '<rect x="80" y="70" width="100" height="60" rx="10" fill="url(#cardGradient)" filter="url(#shadow)"/>',
                    '<text x="90" y="90" fill="white" font-family="Arial" font-size="12">Total Savings</text>',
                    '<text x="90" y="115" fill="white" font-family="Arial" font-size="18" font-weight="bold">',
                    stats.totalSavings.toString(),
                    " TKN</text>",
                    // Credit Score Card
                    '<rect x="220" y="70" width="100" height="60" rx="10" fill="url(#cardGradient)" filter="url(#shadow)"/>',
                    '<text x="230" y="90" fill="white" font-family="Arial" font-size="12">Credit Score</text>',
                    '<text x="230" y="115" fill="white" font-family="Arial" font-size="18" font-weight="bold">',
                    stats.creditScore.toString(),
                    "</text>"
                )
            );
    }

    function generatePieChart(
        uint256 successDash,
        uint256 remainingDash,
        uint256 percentage
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<circle cx="200" cy="200" r="50" fill="none" stroke="#4FD1C5" stroke-width="20" ',
                    'stroke-dasharray="',
                    successDash.toString(),
                    ' 314"/>',
                    '<circle cx="200" cy="200" r="50" fill="none" stroke="#FC8181" stroke-width="20" ',
                    'stroke-dasharray="',
                    remainingDash.toString(),
                    ' 314" stroke-dashoffset="-',
                    successDash.toString(),
                    '"/>',
                    '<text x="200" y="200" font-family="Arial" font-size="16" fill="#2D3748" ',
                    'text-anchor="middle" dominant-baseline="middle">',
                    percentage.toString(),
                    "%</text>"
                )
            );
    }

    function generateBadges(
        UserStats memory stats
    ) internal pure returns (string memory) {
        string memory badges = "";

        if (stats.totalSavings >= 1000) {
            badges = string(
                abi.encodePacked(badges, generateBadge(80, "S", "gold"))
            );
        }
        if (stats.loansRepaid == stats.totalLoans && stats.totalLoans > 0) {
            badges = string(
                abi.encodePacked(badges, generateBadge(130, "L", "silver"))
            );
        }
        if (stats.creditScore >= 80) {
            badges = string(
                abi.encodePacked(badges, generateBadge(180, "C", "#CD7F32"))
            );
        }

        return badges;
    }

    function generateBadge(
        uint256 x,
        string memory symbol,
        string memory color
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<g transform="translate(',
                    x.toString(),
                    ', 320)">',
                    '<circle cx="20" cy="20" r="15" fill="',
                    color,
                    '" filter="url(#shadow)"/>',
                    '<text x="20" y="25" font-family="Arial" font-size="14" ',
                    'text-anchor="middle" fill="white">',
                    symbol,
                    "</text></g>"
                )
            );
    }

    // ... rest of the contract functions remain the same ...
}
