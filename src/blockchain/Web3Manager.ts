import Web3 from 'web3';
import CDE from './built_contracts/CDE.json';
import { Transaction } from './Transaction';

const win: any = <any>window;

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
        if (this.initialized) return;
        await this.loadWeb3()
        await this.loadBlockchainData()
        this.initialized = true;
    }

    async loadWeb3(): Promise<void> {
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

    /**
     * Loads the smart contract
     */
    async loadBlockchainData(): Promise<void> {
        const web3 = win.web3
        // Load account
        let accounts;
        try {
            accounts = await web3.eth.getAccounts()
        } catch (e) {
            console.error(e)
            return
        }
        this.account = accounts[0]
        const networkId = await web3.eth.net.getId()
        // @ts-ignore
        const networkData = CDE.networks[networkId]
        console.log("networkData: ", networkData, networkId)
        if (networkData) {
            this.CDEcontract = new web3.eth.Contract(CDE.abi, networkData.address)
        } else {
            console.log('Marketplace contract not deployed to detected network.')
        }
    }

    /**
     * Proxy functions that interacts with the blockchain. It registers a file in the blockchain, given the transaction details
     * @param transaction : Transaction
     * @returns void
     */
    async registerFile(transaction: Transaction) {
        if (!transaction || !transaction.result) throw new Error("Invalid transaction. Transaction or transaction result is null");
        if (!this.initialized) {
            await this.init();
        }

        return await this.CDEcontract.methods.registerFile(
            win.web3.utils.fromAscii(transaction.file.name),
            transaction.result.url
        ).send({ from: this.account })
    }

    /**
     * Proxy functions that interacts with the blockchain. It returns the list of files registered in the blockchain. If multiple versions are registered, it returns the latest version
     * @returns list of files
     */
    async getAllFilesRecent() {
        if (!this.initialized) {
            await this.init();
        }
        const files_raw = await this.CDEcontract.methods.getAllFilesRecent().call()
        const files = files_raw.map((file: any) => {
            const name = (win.web3.utils.toAscii(file[0]) as string).split("\u0000")[0] // convert the name from bytes32 to string
            return {
                name: name, 
                version: parseInt(file[1]) as number,
                url: file[2] as string,
                author: file[3] as string,
                timestamp: file[4] as number
            }
        })
        console.log(files_raw)
        return files;
    }

}
