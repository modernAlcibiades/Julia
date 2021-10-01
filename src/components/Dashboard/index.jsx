import React, { useContext, useState, useEffect } from 'react';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';
import TokenDisplay from "../TokenDisplay";

const axios = require('axios');
export default function Dashboard() {
    const dispatch = useContext(AppDispatchContext);
    const { address, contract_address, contract, FTMSCAN_API_KEY } =
      useContext(AppStateContext);

    const [tokens, setTokens] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const FTMSCAN_API = "https://api.ftmscan.com/api";
    // Initialize

    const get_nfts = async () => {
        console.log(contract);
            if (contract !== undefined) {
                const request = {
                  method: "get",
                  url: `${FTMSCAN_API}?module=account&action=tokennfttx&contractaddress=${contract_address}&tag=latest&apikey=${FTMSCAN_API_KEY}`,
                };
                console.log(request);
                let response;
                response = await axios(request);
                console.log(response);

                if (response.data.message.startsWith('OK')) {
                    // If tokens returned, get their URI
                    //console.log(Object.keys(response.data.result));
                    const ids = response.data.result;
                    let metadata = [];
                    for (let i = 0; i < ids.length; i++){
                        metadata.push({
                            tokenId: ids[i].tokenID,
                            owner: ids[i].to,
                            tokenURI: await contract.tokenURI(ids[i].tokenID)
                        });
                    }
                    await Promise.all(metadata);
                    console.log(metadata);
                    setTokens(metadata);
                } else {
                    setTokens([]);
                }            
            }
    }

    useEffect(() => {
        get_nfts();
    }, [contract]);

    useEffect(() => {
        // filter tokens to find only tokens that belong to this address
        const filtered = tokens.filter((token) => {
            if (token.owner == address) {
                return true;
            } else {
                return false;
            }
        });
    }, [address]);
    
    if (address === undefined) {
        const listItems = tokens.map((token) => (
            <TokenDisplay t= {token} />
        ));
        return (
            <>
                <div className="wrapper">
                    <h2>Julia NFT Gallery</h2>
                    <div className="error-message">
                        <label>Connect wallet</label>
                    </div>
                    <label>Tokens</label>
                    <div>{listItems}</div>  
                </div>
            </>
        );
    } else {
        const listItems = filtered.map((token) => (
                  <TokenDisplay
                    tokenId={token.tokenId}
                    tokenURI={token.tokenURI}
                  />
                ));
        return (
          <>
            <div className="wrapper">
              <h2>Julia NFT Gallery</h2>
              <div className="info-message">
                <label>Wallet address : {address}</label>
                <label>Token IDs</label>
              </div>
              <label>Token IDs</label>
              <div>{listItems}</div>
              
            </div>
          </>
        );
    }
}
