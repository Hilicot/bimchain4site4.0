import { FileProxy, FileStatus } from '@app/components/files-page/file-handling-utils';
import { IPFSManager } from './IPFS/IPFSManager';
import { Transaction } from './Transaction'
import { Web3Manager } from './Web3Manager';

/**
 * Template class for blockchain implementations.
 */
class Blockchain {
    protected web3Manager: Web3Manager;
    protected ipfs: IPFSManager;
    constructor() {
        this.web3Manager = Web3Manager.getInstance();
        this.ipfs = IPFSManager.getInstance();
    }

    public async init() {
        this.web3Manager.init();
        return;
    }

    async commitTransaction(transaction: Transaction): Promise<any>{
        throw new Error("Method not implemented.");
    }

    public async fetchRemoteFiles(): Promise<FileProxy[]> {
        const files = await this.web3Manager.getFiles();

        return files.map(f => {
            return FileProxy.fromUrl(f.name, f.hash, f.version, f.url, f.author)
        });
    }

    public async downloadFile(file: FileProxy) {
        this.ipfs.downloadFile(file);
    }
}

export default Blockchain