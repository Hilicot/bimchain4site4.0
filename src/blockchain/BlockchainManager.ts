import Blockchain from './Blockchain';
import NFTStorageBlockchain from './IPFS/NFTStorageBlockchain';
import Web3StorageBlockchain from './IPFS/Web3StorageBlockchain';

/**
 * BlockchainManager
 * 
 * This class is a factory for Blockchain objects.
 */
class BlockchainManager {
  private blockchain: Blockchain;

  constructor(blockchain_type: string) {
    switch (blockchain_type) {
        case 'NFT.Storage':
            this.blockchain = new NFTStorageBlockchain();
            break;
        case 'Web4Storage':
            this.blockchain = new Web3StorageBlockchain();
            break;
        default:
            throw new Error('Blockchain type not supported');
    }
  }

  public async init() {
    await this.blockchain.init();
    return this;
  }

  public getBlockchain(): Blockchain {
    return this.blockchain;
  }
}

export default BlockchainManager;