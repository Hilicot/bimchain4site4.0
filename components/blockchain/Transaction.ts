/**
 * Simple class to represent a blockchain transaction
 */
class Transaction {
    obj: File;
    name: string;
    description: string;
    result: TransactionResult;
    // TODO name of transaction = name of object?
    constructor(obj: File, name: string, description: string) {
        this.obj = obj;
        this.name = name;
        this.description = description;
    }

    public getMetadata(): any {
        return {
            image: new Blob([], { type: 'image/png'}),
            name: this.name,
            description: this.description,
            properties: { content: this.obj, type: this.obj.type }
        };
    }
}


/**
 * Simple class to represent the result of a blockchain transaction
 */
class TransactionResult {
    transaction: Transaction;
    success: boolean;
    hash: string;
    url: string;

    constructor(transaction: Transaction, success: boolean, hash: string, url: string) {
        this.transaction = transaction;
        this.success = success;
        this.hash = hash;
        this.url = url;
    }
}

export { Transaction, TransactionResult };