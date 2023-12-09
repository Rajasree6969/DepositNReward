# DepositNReward
##Preview:

Contract address : 0xCeB4791a11D9C36177De65F38447abDB96aB688B
Link to Scroll-Etherscan : https://sepolia.scrollscan.dev/tx/0x6340a2816f6b31b0ce51204e3d28da2a144adfe8ff3c6e6c6112325f2d77f073](https://sepolia.scrollscan.com/address/0xceb4791a11d9c36177de65f38447abdb96ab688b


The DepositNReward aims to manipulate a deposit and praise gadget for customers interacting with an Aave lending pool. Here's  is a concise breakdown:
Contract:
The contract facilitates user deposits, tracks deposit periods, and allows users to claim rewards based on their deposited amounts and specified percentages which can be fixed or variable on the wish of investor.
Functionality:
1. 'Invest' - Users can invest by specifying parameters like deposit period, buffer period, daily deposit amount, and a fixed interest percentage.
2. 'Deposit'- Allows users to deposit the specified daily deposit amount and tracks the last deposit timestamp.
3. 'transfer'- Calls the Aave lending pool's deposit function, enabling the transfer of funds to the lending pool.
4. 'claimReward': Users can claim rewards based on predefined conditions, such as completing the deposit and buffer periods. Rewards are calculated based on the fixed interest percentage provided during investment and sets the UserDeposits to zero.


##Code:
//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import './IAaveLendingPool.sol';

contract DepositnReward{

    enum RewardPercentage {FixedInterest,FloatInterest}
    IAaveLendingPool public LendingPool;
    address public AAVE_LENDING_POOL_ADDRESS = 0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf; 

    struct user {
            address UserAddress;
            uint256 DepositPeriod;
            uint256 BufferPeriod;
            uint256 DailyDepositAmount;
            uint256 FixedInterest;
    }

    user[] User ;
    mapping(address => uint256) private arrayIndexUser;
    mapping(address => uint) public LastDepositTimeStamp;
    mapping(address => uint) public UserDeposits;
    mapping(address => uint) public UserTotalRewards;
    mapping(address => uint) public TotalUserClaim;

    event Invest(address  indexed account);
    event EDeposit(address indexed account, uint256 amount);
    event ClaimReward(address indexed account, uint256 amount, uint256 TotalUserClaim);  
   
    modifier onlyInvestor(address UserAddress) {
        require(msg.sender == UserAddress, "Owner has the access ONLY.");
        _;
    } 

    constructor(address  _AAVE_LENDING_POOL_ADDRESS) {
        AAVE_LENDING_POOL_ADDRESS = _AAVE_LENDING_POOL_ADDRESS;
        LendingPool =  IAaveLendingPool(AAVE_LENDING_POOL_ADDRESS);
    }

    function invest (address  _UserAddress, uint256 _DepositPeriod,uint256 _BufferPeriod,uint256 _DailyDepositAmount, uint256 _FixedRewardPercentage ) external {
        user memory UserT = user(_UserAddress, _DepositPeriod, _BufferPeriod,_DailyDepositAmount,_FixedRewardPercentage);
        User.push(UserT);
        uint256 arrLen =  User.length;
        arrayIndexUser[_UserAddress] = arrLen-1;

        emit Invest(msg.sender);
    }

    function Deposit(address _UserAddress) external payable {
        require(msg.value == User[arrayIndexUser[_UserAddress]].DailyDepositAmount, "Recheck Deposit Amount");

        uint256 daysPassed = (block.timestamp - LastDepositTimeStamp[msg.sender]) / 1 days;
        require(daysPassed >= User[arrayIndexUser[_UserAddress]].DepositPeriod, "Deposit period has ended");

        UserDeposits[msg.sender] += msg.value;
        LastDepositTimeStamp[msg.sender] = block.timestamp;

        emit EDeposit(msg.sender, msg.value);
  }


     function transfer() public payable {
            LendingPool.deposit(AAVE_LENDING_POOL_ADDRESS,msg.value);
        }
        
        receive() external payable {}
        


    function claimReward(address _UserAddress) external {
        //VERIFYING THE ELIGIBILITY TO CLAIM
        uint256 DaysPassed = (block.timestamp - LastDepositTimeStamp[msg.sender]) / 1 days;
        require(DaysPassed > User[arrayIndexUser[_UserAddress]].DepositPeriod + User[arrayIndexUser[_UserAddress]].BufferPeriod, "Buffer period not yet completed");

        // CALCULATING TOTALREWARD
        uint256 TotalReward = (UserDeposits[msg.sender] * User[arrayIndexUser[_UserAddress]].FixedInterest) / 100;
        

        // UPDATING USER REWARDS AND DEPOSITS
        UserTotalRewards[msg.sender] += TotalReward;
        TotalUserClaim [msg.sender] = UserDeposits [msg.sender]  + UserTotalRewards[msg.sender] ;
        UserDeposits[msg.sender] = 0;
        

        // TRANSFER TOTAL REWARD TO USER
        payable(msg.sender).transfer(TotalUserClaim [msg.sender]);

        emit ClaimReward(msg.sender, TotalReward, TotalUserClaim[msg.sender]);
    }


}

