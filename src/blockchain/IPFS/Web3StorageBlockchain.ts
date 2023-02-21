import { Transaction } from '../Transaction';
import Blockchain from '../Blockchain';


class Web3torageBlockchain extends Blockchain {
    constructor() {
        super();
    }

    uploadFile = async (transaction: Transaction) : Promise<Transaction> => {
        try {
            const cid = await this.ipfs.web3storage.put([transaction.obj])
            transaction.result.registerResult(true, cid, cid);
            return transaction;
        } catch (e) {
            console.error(e);
            transaction.result.registerResult(false, '', '');
            return transaction;
        }
    }
}


export default Web3torageBlockchain
