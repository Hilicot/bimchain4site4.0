import { FileProxy } from '@app/components/files-page/file-handling-utils';
import { IPFSManager } from './IPFS/IPFSManager';
import { Transaction, TransactionResult } from './Transaction'
import { Web3Manager } from './Web3Manager';
import { groupBy } from '@app/utils/utils';

/**
 * Template class for blockchain implementations.
 */
abstract class Blockchain {
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

    async commitTransaction(transaction: Transaction): Promise<TransactionResult> {
        // Upload file to IPFS
        transaction = await this.uploadFile(transaction);
        /*
        if (transaction.result.success)
            // Register uploaded file to the blockchain
            await this.web3Manager.registerFile(transaction);
            */
        return transaction.result;
    }

    /**
     * Upload file to the database. 
     * @param transaction 
     * @returns transaction, which includes the url of the uploaded file
     */
    abstract uploadFile(transaction: Transaction): Promise<Transaction>

    public async fetchRemoteFiles(): Promise<FileProxy[]> {
        const files = await this.web3Manager.getFiles();

        // transform the files objects in FileProxy
        const file_proxies = files.map(f => FileProxy.fromUrl(f.name, f.hash, f.version, f.url, f.author, f.timestamp));
        // group files with the same name
        const files_grouped_by_name = groupBy(file_proxies, "name");

        // for each name, get the most recent version and store the others inside it
        const files_with_previous_versions = []
        for (const name in files_grouped_by_name) 
            files_with_previous_versions.push(FileProxy.getMostRecentVersion(files_grouped_by_name[name]));
        
        return files_with_previous_versions
    }

    public async downloadFile(file: FileProxy) {
        this.ipfs.downloadFile(file);
    }
}

export default Blockchain