const HDWalletProvider = require('@truffle/hdwallet-provider');
// create a file at the root of your project and name it .env -- there you can set process variables
// like the mnemomic and Infura project key below. Note: .env is ignored by git to keep your private information safe
require('dotenv').config();
const mnemonic = process.env["MNEMONIC"];
const infuraProjectId = process.env["INFURA_PROJECT_ID"];

module.exports = {
  networks: {
    mumbai:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC, ` https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },
  },
  migrations_directory: './migrations/polygon',
  contracts_directory: './src/blockchain/contracts/',
  contracts_build_directory: './src/blockchain/built_contracts/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}