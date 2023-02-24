# BIMchain4site4.0

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Hilicot/bimchain4site4.0/azure-static-web-apps-delightful-mushroom-03ad24f03.yml)

### Install

1. run

    ```bash
    yarn install
    ```

1. Some modules raise errors/warnings when used in typescript:

   - in `node_modules/web3.storage/dist` create file `bundle.esm.min.d.ts` and paste in there this code
   ```ts
   declare module 'web3.storage/dist/bundle.esm.min.js'
   ```
   - in `node_modules/nft.storage/dist` create file `bundle.esm.min.d.ts` and paste in there this code
   ```ts
   declare module 'nft.storage/dist/bundle.esm.min.js'
   ```

1. create/modify a `.env` file with the following content:
    ```bash
    # API Key for NFT.Storage. Get it from the NFT.Storage website
    REACT_APP_NFT_STORAGE_API_KEY="" 
    # API Key for Web3. Get it from the Web3.Storage website (requires free account)
    REACT_APP_WEB3_API_KEY=""

    # mnemonic phrase of your Metamask account
    MNEMONIC=""
    # API key of your free Alchemy account
    ALCHEMY_KEY=""
    ```

### Documentation

#### Blockchain

The application supports both the Ethereum and Polygon blockchains, using Metamask and the Truffle framework as the Solidity smart-contract compiler.
The respective truffle configuration files are [`truffle_config.js`](./truffle-config.js) and [`truffle-config.polygon.js`](./truffle-config.polygon.js).
To build and deploy, run 
```bash
truffle compile --config=<config_file> [--network=<network>]
truffle migrate --config=<config_file> [--network=<network>]
```
For testing, the configuration files support the Ganache and Mumbai testnets

#### IFC viewer

Uses the [IFCjs](https://github.com/IFCjs) framework, specifically the [web-ifc-viewer](https://github.com/IFCjs/web-ifc-viewer) library.


