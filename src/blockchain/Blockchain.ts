import { FileProxy, FileStatus } from '@app/components/files-page/file-handling-utils';
import { Transaction } from './Transaction'
import { Web3Manager } from './Web3Manager';

/**
 * Template class for blockchain implementations.
 */
class Blockchain {
    protected web3Manager: Web3Manager;
    constructor() {
        this.web3Manager = Web3Manager.getInstance();
    }

    public async init() {
        this.web3Manager.init();
        return;
    }

    commitTransaction(transaction: Transaction): Promise<any>{
        throw new Error("Method not implemented.");
    }

    public async getFiles(): Promise<FileProxy[]> {
        const files = await this.web3Manager.getFiles();
        //TODO implemento meglio
        return files.map(f => FileProxy.fromUrl(f.name, f.hash, f.version, f.url, f.author));
    }
}

export default Blockchain