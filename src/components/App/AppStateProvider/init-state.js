import { NFTStorage } from 'nft.storage';
import { apikey } from "../../../config.js";
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
    contract_address: "0xc45c766C9D0639654590F16486C936b97eCd714D",
    FTMSCAN_API_KEY: undefined,
    
    // Generator
    refresh: true,
    hash: '0x8c4a76cf4a66c6ab0d6ce34a49a6a482',
    bgndColor: '#ddd',
    // playAudio: false,
    errorMessage: "",
    successMessage: ""
}
