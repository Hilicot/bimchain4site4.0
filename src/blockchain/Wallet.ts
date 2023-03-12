import { ErrorMsg } from '@app/components/common/ErrorMsg/ErrorMsg';
import Web3 from 'web3'

const win: any = window;

abstract class Wallet {
    wallet?: Web3;
    account = "";
    networkId = -1;
    initialized = false;

    constructor() {
        this.wallet = undefined;
        if (this.constructor === Wallet) {
            throw new TypeError('Abstract class "Wallet" cannot be instantiated directly.');
        }
    }
}


/**
 * Use Metamask wallet
 */
export class MetamaskWallet extends Wallet {
    win: any
    private static instance: MetamaskWallet;

    private constructor() {
        super();
    }

    public static async getInstance(): Promise<MetamaskWallet> {
        if (!MetamaskWallet.instance) {
            MetamaskWallet.instance = await new MetamaskWallet().init();
        }
        return MetamaskWallet.instance;
    }

    async init(): Promise<MetamaskWallet> {
        if (!this.initialized) {
            await this.loadWeb3()
            await this.loadBlockchainData()
            this.initialized = true;
        }
        return this
    }

    async loadWeb3(): Promise<void> {
        if (win.ethereum) {
            this.wallet = new Web3(win.ethereum)
            await win.ethereum.enable()
        }
        else if (win.web3) {
            this.wallet = new Web3(win.web3.currentProvider)
        }
        else {
            win.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    /**
     * Loads the account and network
     */
    async loadBlockchainData(): Promise<void> {
        const web3 = this.wallet
        if (!web3) {
            ErrorMsg.registerError("Web3 is not initialized");
            return;
        }
        // Load account
        let accounts;
        try {
            accounts = await web3.eth.getAccounts()
        } catch (e) {
            console.error(e)
            return
        }
        this.account = accounts[0]
        this.networkId = await web3.eth.net.getId()
    }
}