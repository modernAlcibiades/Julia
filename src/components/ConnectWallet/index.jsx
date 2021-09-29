import React, { useContext, useEffect,  useState } from 'react';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'
import { ethers } from 'ethers';

export default function ConnectWallet() {
    const dispatch = useContext(AppDispatchContext)
    const {
        address,
        provider,
        errorMessage
    } = useContext(AppStateContext)
    
    const [buttonText, setButtonText] = useState("Connect Wallet");
    const ethereum = window.ethereum;

    const clear_connect = () => {
        dispatch({
            type: 'SET_VALUE',
            payload: {
                key: 'provider',
                value: undefined,
            },
        });
        dispatch({
            type: 'SET_VALUE',
            payload: {
                key: 'address',
                value: undefined,
            },
        });
        setButtonText("Connect Wallet");
    }
    
    const toggle_connect = async () => {
        // Connect wallet
        if (address === undefined || provider === undefined) {
            try {
                const ethereum = window.ethereum;

                if (ethereum.networkVersion === '250') {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const [signer_address] = await ethereum.request({ method: 'eth_requestAccounts' });

                    dispatch({
                        type: 'SET_VALUE',
                        payload: {
                            key: 'provider',
                            value: provider,
                        },
                    });
                    dispatch({
                        type: 'SET_VALUE',
                        payload: {
                            key: 'address',
                            value: signer_address,
                        },
                    });
                    setButtonText(signer_address.substring(0, 22) + '...');
                    dispatch(
                        {
                            type: 'SET_SUCCESS',
                            payload: {
                                value: "",
                            },
                        });
                    return;
                } else {
                    console.log("Wrong network! Connect to fantom")
                    dispatch(
                        {
                            type: 'SET_ERROR',
                            payload: {
                                value: "Connect to Fantom Network on Metamask!!!",
                            },
                        });
                }
            } catch (e) {
                console.log(e);
                dispatch({
                    type: 'SET_ERROR',
                    payload: { value: e.data.message },
                });
            }
        }
        // If not returned yet, clear info
        clear_connect();
    }

        
    useEffect(async () => {
        // on account change
        ethereum.on("accountsChanged", ([newAddress]) => {
            console.log("Change account", newAddress);
            dispatch({
                type: 'SET_VALUE',
                payload: {
                    key: 'address',
                    value: newAddress,
                },
            });
            setButtonText(newAddress.substring(0, 22) + '...');
        });
        

        // on chain change
        ethereum.on('chainChanged', (chainId) => {
            console.log("Chain Changed", chainId);
            if (chainId === '0xfa') {
                dispatch({
                    type: "SET_ERROR",
                    payload:""
                })
            }
            clear_connect();
        });
    }, [ethereum]);

    return (
        <div className="connect-wrapper">
            <button
                className="btn btn-warning"
                type="button"
                onClick={async () => {
                    await toggle_connect();
                }}
            >
                {buttonText}
            </button>
        </div>
    )
}
