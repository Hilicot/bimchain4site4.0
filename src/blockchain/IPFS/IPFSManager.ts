import { FileProxy } from '@app/components/files-page/file-handling-utils';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import fileDownload from 'js-file-download';
require('dotenv').config(); // Load .env file

// import Web3 API key from .env
const WEB3_API_KEY = process.env.REACT_APP_WEB3_API_KEY;

export class IPFSManager {
  private static instance: IPFSManager;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public web3storage: Web3Storage;

  private constructor() {
    this.web3storage = new Web3Storage({ token: WEB3_API_KEY })
  }

  public static getInstance(): IPFSManager {
    if (!IPFSManager.instance) {
      IPFSManager.instance = new IPFSManager();
    }
    return IPFSManager.instance;
  }

  public async downloadFile(file: FileProxy) {
    if(!file.url)
      throw new Error("File URL is not defined")
    const cid = file.url.split("/")[2]
    // Download file
    downloadSingleFileFromURL("https://" + cid + ".ipfs.nftstorage.link/" + file.name, file.name)
  }

}

async function downloadSingleFileFromURL(url: string, name: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  fileDownload(blob, name);
}