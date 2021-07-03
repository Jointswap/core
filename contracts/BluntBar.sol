// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// BluntBar is the coolest bar in town. You come in with some Joint, and leave with more! The longer you stay, the more Joint you get.
//
// This contract handles swapping to and from BLUNT, JointSwap's staking token.
contract BluntBar is ERC20("BluntBar", "BLUNT"){
    using SafeMath for uint256;
    IERC20 public joint;

    // Define the Joint token contract
    constructor(IERC20 _joint) public {
        joint = _joint;
    }

    // Enter the bar. Pay some SUSHIs. Earn some shares.
    // Locks Joint and mints BLUNT
    function enter(uint256 _amount) public {
        // Gets the amount of Joint locked in the contract
        uint256 totalJoint = joint.balanceOf(address(this));
        // Gets the amount of BLUNT in existence
        uint256 totalShares = totalSupply();
        // If no BLUNT exists, mint it 1:1 to the amount put in
        if (totalShares == 0 || totalJoint == 0) {
            _mint(msg.sender, _amount);
        } 
        // Calculate and mint the amount of BLUNT the Joint is worth. The ratio will change overtime, as BLUNT is burned/minted and Joint deposited + gained from fees / withdrawn.
        else {
            uint256 what = _amount.mul(totalShares).div(totalJoint);
            _mint(msg.sender, what);
        }
        // Lock the Joint in the contract
        joint.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bar. Claim back your SUSHIs.
    // Unlocks the staked + gained Joint and burns BLUNT
    function leave(uint256 _share) public {
        // Gets the amount of BLUNT in existence
        uint256 totalShares = totalSupply();
        // Calculates the amount of Joint the Blunt is worth
        uint256 what = _share.mul(joint.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        joint.transfer(msg.sender, what);
    }
}
