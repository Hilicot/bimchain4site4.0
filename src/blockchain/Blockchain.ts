import {Transaction} from './Transaction'
import { Web3Manager } from './Web3Manager';

/**
 * Template class for blockchain implementations.
 */
abstract class Blockchain{
    protected web3Manager: Web3Manager;
    constructor() {
        this.web3Manager = Web3Manager.getInstance();
    }

    public async init(){
        this.web3Manager.init();
        return;
    }

    abstract commitTransaction(transaction: Transaction): Promise<any>
}

export default Blockchain