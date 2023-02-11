// Import the NFTStorage class from the 'nft.storage' package
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import { Transaction, TransactionResult } from '../Transaction';
import Blockchain from '../Blockchain';

// import NFT.Storage API key
// TODO read API key in a better way? centralized config file?
let NFT_STORAGE_KEY: string;
import('./NFT.Storage_key.js').then((key) => {
    NFT_STORAGE_KEY = key.default;
}).catch((e) => {
    console.log(e)
    console.log('NFT_STORAGE_KEY not found. Please create a file named NFT.Storage_key.js in the same directory as this file and paste your NFT.Storage API key in it. See https://nft.storage/ for more information.')
});


class NFTStorageBlockchain extends Blockchain {
    // @ts-ignore
    nftstorage: NFTStorage;
    constructor() {
        super();
        // create a new NFTStorage client using our API key
        this.nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    }

    commitTransaction = async (transaction: Transaction) => {
        try {
            console.log("starting transaction")
            // Upload file to IPFS network through NFT.Storage
            const result = await this.nftstorage.store(transaction.getMetadata());
            console.log(result)
            // Register the result of the transaction in the transaction object
            transaction.result.registerResult(true, result.ipnft, result.url);
            console.log(transaction.result)
            // Register uploaded file to the blockchain
            await this.web3Manager.registerFile(transaction);
            console.log("done")

            const fs = await this.web3Manager.getFiles();
            console.log(fs)
            return transaction.result;
        } catch (e) {
            console.error(e);
            transaction.result.registerResult(false, '', '');
            return transaction.result;
        }
    }
}


export default NFTStorageBlockchain
