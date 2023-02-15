import { FileProxy } from '@app/components/files-page/file-handling-utils';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import fileDownload from 'js-file-download';
require('dotenv').config(); // Load .env file

// import Web3 API key from .env
const WEB3_API_KEY = process.env.WEB3_API_KEY;

export class IPFSManager {
  private static instance: IPFSManager;
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
    // Fetch file name through the metadata
    const metadata = await fetchMetadata("https://nftstorage.link/ipfs/" + file.hash + "/metadata.json");
    const cid = metadata.attributes.content.split("/")[2]
    // Download file
    downloadSingleFileFromURL("https://" + cid + ".ipfs.nftstorage.link/" + metadata.name, metadata.name)
  }

}

async function fetchMetadata(url: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const text = await blob.text();
  return JSON.parse(text)
}

async function downloadSingleFileFromURL(url: string, name: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  fileDownload(blob, name);
}