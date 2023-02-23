require('babel-register');
require('babel-polyfill');
require('dotenv').config(); // Load .env file

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" 
    },
  },
  migrations_directory: './src/blockchain/migrations/ethereum',
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