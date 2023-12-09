require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "scroll",
  networks: {
    scroll: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: ["0xd739e95e7e9ad68b2b51a4f3f6a3c29a20d941a26755636a43d8db7d1386863a"],
      chainId: 534351
    },
  }
};

