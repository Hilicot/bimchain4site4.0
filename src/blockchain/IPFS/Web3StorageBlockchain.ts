import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { Transaction, TransactionResult } from '../Transaction';
import Blockchain from '../Blockchain';
import { FileProxy } from '@app/components/files-page/file-handling-utils';


class Web3torageBlockchain extends Blockchain {
    // @ts-ignore
    web3storage: Web3Storage;
    constructor() {
        super();
    }

    commitTransaction = async (transaction: Transaction) => {
        try {
            const cid = await this.ipfs.web3storage.put([transaction.obj])
            transaction.result.registerResult(true, cid, cid);
            // Register uploaded file to the blockchain
            await this.web3Manager.registerFile(transaction);
            return transaction.result
        } catch (e) {
            console.error(e);
            transaction.result.registerResult(false, '', '');
            return transaction.result;
        }
    }
}


export default Web3torageBlockchain
