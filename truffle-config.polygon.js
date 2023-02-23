const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const mnemonic = process.env["MNEMONIC"];
const alchemyKey = process.env["ALCHEMY_KEY"];

module.exports = {
  networks: {
    mumbai:{
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: mnemonic
        },
        providerOrUrl:
         "https://polygon-mumbai.g.alchemy.com/v2/" + alchemyKey
      }),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      chainId: 80001
    },
  },
  migrations_directory: './src/blockchain/migrations/polygon',
  contracts_directory: './src/blockchain/contracts/',
  contracts_build_directory: './src/blockchain/built_contracts',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
