import React, { useContext, useState, useEffect } from 'react';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';
import TokenDisplay from "../TokenDisplay";

const axios = require('axios');
export default function Dashboard() {
    const dispatch = useContext(AppDispatchContext);
    const {
        address,
        contract_address,
        contract
    } = useContext(AppStateContext)

    const [tokens, setTokens] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const FTMSCAN_API = "https://api.ftmscan.com/api";
    // Initialize

    const get_nfts = async () => {
        console.log(contract);
            if (contract !== undefined) {
                const request = {
                    method: 'get',
                    url: `${FTMSCAN_API}?module=account&action=tokennfttx&contractaddress=${contract_address}&tag=latest`,
                };
                console.log(request);
                let response;
                response = await axios(request);
                console.log(response);

                if (response.data.message.startsWith('OK')) {
                    // If tokens returned, get their URI
                    //console.log(Object.keys(response.data.result));
                    const ids = response.data.result.map(a => a.tokenID);
                    let metadata = [];
                    for (let i = 0; i < ids.length; i++){
                        metadata.push({
                            tokenId: ids[i],
                            tokenURI: await contract.tokenURI(ids[i])
                        });
                    }
                    await Promise.all(metadata);
                    console.log(metadata);

                    // dispatch({
                    //     type: 'SET_VALUE',
                    //     payload: {
                    //         key: 'filtered',
                    //         value: metadata
                    //     }
                    // }
                    // )
                    setFiltered(metadata);
                    //setTokens(metadata);
                } else {
                    setTokens([]);
                }            
            }
    }
    useEffect(() => {
        get_nfts();
    }, [contract]);

    console.log(filtered)
    const listItems = filtered.map((token) => (
      //<label>{token.tokenId} : {token.tokenURI} </label>));
      //<div>{listItems}</div>
      <TokenDisplay tokenId={token.tokenId} tokenURI={token.tokenURI} />));
    
    if (address === undefined) {
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
