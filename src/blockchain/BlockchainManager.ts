import Blockchain from './Blockchain';
import NFTStorageBlockchain from './NFT.Storage/NFTStorageBlockchain';

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
        default:
            throw new Error('Blockchain type not supported');
    }
  }

  public getBlockchain(): Blockchain {
    return this.blockchain;
  }
}

export default BlockchainManager;