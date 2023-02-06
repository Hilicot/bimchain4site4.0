import {Transaction} from './Transaction'

/**
 * Template class for blockchain implementations.
 */
abstract class Blockchain{
    constructor() {}

    abstract commitTransaction(transaction: Transaction): Promise<any>
}

export default Blockchain