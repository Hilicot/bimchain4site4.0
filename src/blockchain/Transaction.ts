/**
 * Simple class to represent a blockchain transaction
 */
export class Transaction {
    obj: File;
    name: string;
    result: TransactionResult;
    // TODO name of transaction = name of object?
    constructor(obj: File, name: string) {
        this.obj = obj;
        this.name = name;
        this.result = new TransactionResult(this);
    }

    public getMetadata(): Metadata {
        return {
            image: new Blob([], { type: 'image/png'}),
            name: this.name,
            description: ' - ',
            attributes: { content: this.obj, type: this.obj.type }
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
    }
}

