import { NFTStorage } from 'nft.storage';
import { apikey, ftmscan_key } from "../../../config.js";
export default {
    // wallet
    address: undefined,
    provider: undefined,
    balance: 0,

    // ipfs
    ns_client: new NFTStorage({ token: apikey}),
    canvas: undefined,
    metadata: undefined,
    
    // contract
    contract_address: "0x60059E9a55b52A5EEA01A37A0a78c05806d9DFD9",
    contract: undefined,
    minted: '--',
    FTMSCAN_API_KEY: ftmscan_key,
    
    // Generator
    refresh: true,
    hash: '0x8c4a76cf4a66c6ab0d6ce34a49a6a482',
    bgndColor: '#ddd',

    // Token Display

    // Message
    errorMessage: "",
    successMessage: ""
}
