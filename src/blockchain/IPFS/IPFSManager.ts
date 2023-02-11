import IPFS from 'ipfs';
import Web3 from 'web3';

export class IPFSManager {
  private static instance: IPFSManager;
  private node: any;
  private CDEContract: any;

  private constructor() {
    this.node = null;
  }

  public static getInstance(): IPFSManager {
    if (!IPFSManager.instance) {
      IPFSManager.instance = new IPFSManager();
    }
    return IPFSManager.instance;
  }

  public async init() {
    this.node = await IPFS.create();
    // TODO remove
  const version = await this.node.version();
  console.log('Version:', version.version);
  }

  public async add(data: any) {
    const result = await this.node.add(data);
    return result.path;
  }

  public async get(hash: string) {
    const result = await this.node.get(hash);
    return result;
  }

  public async getCDEFiles(){

  }

}
