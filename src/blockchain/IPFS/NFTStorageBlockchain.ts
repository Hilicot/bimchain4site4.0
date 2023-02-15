// Import the NFTStorage class from the 'nft.storage' package
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import { Transaction, TransactionResult } from '../Transaction';
import Blockchain from '../Blockchain';
require('dotenv').config(); // Load .env file

// import NFT.Storage API key
const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;

// TODO merge with Web4Storage
class NFTStorageBlockchain extends Blockchain {
    // @ts-ignore
    nftstorage: NFTStorage;
    constructor() {
        super();
        // create a new NFTStorage client using our API key
        this.nftstorage = new NFTStorage({ token: NFT_STORAGE_API_KEY })
    }

    commitTransaction = async (transaction: Transaction) => {
        try {
            // Upload file to IPFS network through NFT.Storage
            const result = await this.nftstorage.store(transaction.getMetadata());
            console.log(result)
            // Register the result of the transaction in the transaction object
            transaction.result.registerResult(true, result.ipnft, result.url);
            // Register uploaded file to the blockchain
            await this.web3Manager.registerFile(transaction);

            return transaction.result;
        } catch (e) {
            console.error(e);
            transaction.result.registerResult(false, '', '');
            return transaction.result;
        }
    }
}


export default NFTStorageBlockchain
