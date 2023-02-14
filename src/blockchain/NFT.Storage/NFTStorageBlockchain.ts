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

// TODO merge with Web4Storage
class NFTStorageBlockchain extends Blockchain {
    // @ts-ignore
    nftstorage: NFTStorage;
    constructor() {
        super();
        // create a new NFTStorage client using our API key
        this.nftstorage = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNlRjVCYzhBQTNCM0Y5NkFiRUE1NmM4NTc0YUU5QkEwM2RDZjcwNjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTcwMDA2NTMzMiwibmFtZSI6IkJJTWNoYWluNFNpdGU0LjBfTkZUU3RvcmFnZV9rZXkifQ.EHPfHU5PBzVtjTjeokAtIO-NdMyqhgOf4chgJt8Inf0" })
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
