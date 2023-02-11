import Web3 from 'web3';
import CDE from './built_contracts/CDE.json';
import { Metadata, Transaction } from './Transaction';

let win:any = <any>window; 

export class Web3Manager {
    private static instance: Web3Manager;
    private account: any;
    private initialized = false;
    private CDEcontract: any;

    private constructor() {
        this.account = null;
    }

    public static getInstance(): Web3Manager {
        if (!Web3Manager.instance) {
            Web3Manager.instance = new Web3Manager();
        }
        return Web3Manager.instance;
    }

    init = async () => {
        if(this.initialized) return;
        await this.loadWeb3()
        await this.loadBlockchainData()
        this.initialized = true;
    }

    async loadWeb3() {
        if (win.ethereum) {
            win.web3 = new Web3(win.ethereum)
            await win.ethereum.enable()
        }
        else if (win.web3) {
            win.web3 = new Web3(win.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = win.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.account = accounts[0]
        const networkId = await web3.eth.net.getId()
        // @ts-ignore
        const networkData = CDE.networks[networkId]
        if (networkData) {
            this.CDEcontract = new web3.eth.Contract(CDE.abi, networkData.address)
        } else {
            console.log('Marketplace contract not deployed to detected network.')
        }
        console.log(this.CDEcontract)
    }

    async registerFile(transaction:Transaction) {
        if(!transaction || !transaction.result) throw new Error("Invalid transaction. Transaction or transaction result is null");
        if (!this.initialized) {
            await this.init();
        }

        console.log("registering file", transaction)
        return await this.CDEcontract.methods.registerFile(transaction.name, transaction.result.hash, transaction.description, transaction.result.url).send({ from: this.account })
    }

    async getFiles() {
        if (!this.initialized) {
            await this.init();
        }
        const fileCount = await this.CDEcontract.methods.fileCount().call()
        let files = []
        for (let i = 1; i <= fileCount; i++) {
            const file = await this.CDEcontract.methods.files(i).call()
            files.push(file)
        }
        console.log(files)
        return files;
    }
}
