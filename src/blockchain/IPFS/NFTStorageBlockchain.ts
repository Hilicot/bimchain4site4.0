import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import { Transaction } from '../Transaction';
import Blockchain from '../Blockchain';
require('dotenv').config(); // Load .env file

// import NFT.Storage API key
const NFT_STORAGE_API_KEY = process.env.REACT_APP_NFT_STORAGE_API_KEY;

class NFTStorageBlockchain extends Blockchain {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nftstorage: NFTStorage;
    constructor() {
        super();
        // create a new NFTStorage client using our API key
        this.nftstorage = new NFTStorage({ token: NFT_STORAGE_API_KEY })
    }

    uploadFile = async (transaction: Transaction) : Promise<Transaction> => {
        try {
            // Upload file to IPFS network through NFT.Storage
            const result = await this.nftstorage.store(await transaction.getMetadata());

            // Register the result of the transaction in the transaction object
            transaction.result.registerResult(true, result.ipnft, result.data.attributes.content.href);
            console.log('NFT.Storage result: ', result)
        } catch (e) {
            console.error(e);
            transaction.result.registerResult(false, '', '');
        } finally{
            return transaction;
        }
    }
}


export default NFTStorageBlockchain
