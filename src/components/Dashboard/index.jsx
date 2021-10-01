import React, { useContext, useState, useEffect } from 'react';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';
const axios = require('axios');
export default function Dashboard() {    
    const dispatch = useContext(AppDispatchContext)
    const {
        address,
        contract_address,
        minted
    } = useContext(AppStateContext)

    const [tokens, setTokens] = useState([]);
    const FTMSCAN_API = "https://api.ftmscan.com/api"; 

    const get_nfts = () => {
        (async () => {
            // get tokens
            let response;
            if (address !== undefined) {
                const default_address = "0x252DD902190Be0b9aCac625996fDa7137A4b684c";
                response = await axios({
                    method: 'get',
                    url: `${FTMSCAN_API}?module=account&action=tokennfttx&contractaddress=${contract_address}&address=${default_address}&tag=latest`,
                });
            } else {
                response = await axios({
                    method: 'get',
                    url: `${FTMSCAN_API}?module=account&action=tokennfttx&contractaddress=${contract_address}&tag=latest`,
                });

            }
            //console.log(response);
            let nfts;
            if (response.data.message.startsWith('OK')) {
                nfts = response.data.result;//.map(a => a.tokenID);
            } else {
                nfts = [];
            }
            console.log(nfts);
            setTokens(nfts.map(a => a.tokenID));
            
                    
            
        })();
    }
    useEffect(() => {
        get_nfts();
    }, [address]);

    const listItems = tokens.map((id) =>
        <label for={id}><input type="checkbox" name="tokenId" value={id} id={id} defaultChecked="true" /> {id}</label >);
    
    if (address === undefined) {
        return (
            <>
                <div className="wrapper">
                    <h2>Julia NFT Gallery</h2>
                    <div className="error-message">
                        <label>Connect wallet</label>
                    </div>
                </div>
                <div>
                    <label>Token IDs</label>
                    <ul>{listItems}</ul>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="wrapper">
                    <h2>Julia NFT Gallery</h2>
                    <div className="info-message">
                        <label>Wallet address : {address}</label>
                    </div>
                </div>
                <div>
                    <label>Token IDs</label>
                    <ul>{listItems}</ul>
                </div>
            </>
        );
    }
}
