# BIMchain4site4.0

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

1. create a `.env` file with the following content:
    ```bash
    # API Key for NFT.Storage. Get it from the NFT.Storage website
    NFT_STORAGE_API_KEY="" 
    # API Key for Web3. Get it from the Web3.Storage website (requires free account)
    WEB3_API_KEY=""

    # mnemonic phrase of your Metamask account
    MNEMONIC=""
    # API key of your free Alchemy account
    ALCHEMY_KEY=""
    ```