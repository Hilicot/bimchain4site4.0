import { FileProxy } from "@app/components/files-page/file-handling-utils";

/**
 * Simple class to represent a blockchain transaction
 */
export class Transaction {
    file: FileProxy;
    name: string;
    result: TransactionResult;
    // TODO name of transaction = name of object?
    constructor(file: FileProxy) {
        this.file = file;
        this.name = file.name+'_'+file.version;
        this.result = new TransactionResult(this);
    }

    public async getMetadata(): Promise<Metadata> {
        const obj = await this.file.getFile();
        return {
            image: new Blob([], { type: 'image/png'}),
            name: this.name,
            description: ' - ',
            attributes: { content: obj, type: obj.type, version: this.file.version }
        };
    }
}


/**
 * Simple class to represent the result of a blockchain transaction
 */
export class TransactionResult {
    transaction: Transaction;
    success: boolean;
    hash = '';
    url = '';
    pending: boolean;
    constructor(transaction: Transaction) {
        this.transaction = transaction;
        this.success = false;
        this.pending = true;
    }

    public registerResult(success: boolean, hash: string, url: string) {
        this.success = success;
        this.hash = hash;
        this.url = url;
        this.pending = false;
    }
}

export interface Metadata{
    name: string;
    image: Blob;
    description:string;
    attributes: {
        content: File;
        type: string;
        version: number;
    }
}

