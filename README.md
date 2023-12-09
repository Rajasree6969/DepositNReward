# DepositNReward
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



