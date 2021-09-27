import React, { useContext, useEffect } from 'react'

import { generate } from 'shortid';

import sketchJulia from '../../sketches/sketch-julia';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';
import p5Wrapper from '../P5Wrapper';

// contract
import Julia from '../contracts/FractalArt.sol/Julia.json';
import { ethers } from 'ethers';

const P5Wrapper = p5Wrapper(generate())

const JuliaDisplay =()=> {
    const dispatch = useContext(AppDispatchContext)
    const {
        contract_address,
        provider,
        ns_client,
        metadata,
        canvas,
        refresh,
        hash,
        errorMessage,
        successMessage
    } = useContext(AppStateContext)

    useEffect(() => { 
        let _hash = '0x';
        for (let i = 0; i < 32; i++) {
            const val = Math.floor(Math.random() * 16);
            _hash = _hash + val.toString(16);
        }
        console.log(_hash);
        
        dispatch({
            type: 'SET_VALUE',
            payload: {
                key: 'hash',
                value: _hash,
            },
        });
    }, [])

    return (
        <div className="wrapper">
            <div className="inputs-wrapper">
                <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                        dispatch({
                            type: 'SET_VALUE',
                            payload: {
                                key: 'refresh',
                                value: true,
                            },
                        });
                        let _hash = '0x';
                        for (let i = 0; i < 32; i++) {
                            const val = Math.floor(Math.random() * 16);
                            _hash = _hash + val.toString(16);
                        }
                        console.log(_hash);
                        
                        dispatch({
                            type: 'SET_VALUE',
                            payload: {
                                key: 'hash',
                                value: _hash,
                            },
                        });
                    } }>
                    Generate New
                </button>
                <span></span>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={async () => {
                        const bl = await canvas.toBlob(async function (blob) {// get content as blob
                            let metadata;
                            try {
                                metadata = await ns_client.store({
                                    name: `julia_${hash}`,
                                    description: 'Julia',
                                    image: blob
                                });
                                dispatch(
                                    {
                                        type: 'SET_VALUE',
                                        payload: {
                                            key: 'metadata',
                                            value: metadata,
                                        },
                                    }
                                );
                            } catch (e) {
                                console.log("Failed to upload")
                                dispatch(
                                    {
                                        type: 'SET_ERROR',
                                        payload: {
                                            value: "Upload busy. Please try again.",
                                        },
                                    });
                                return;     
                            }
                            console.log(metadata.url);
                            console.log(metadata.data.image.href);
                            const token_uri = metadata.url;

                            // Connect to metamask and create nft
                            try {
                                const ethereum = window.ethereum;
                            
                                if (ethereum.networkVersion === `250`) {
                                    const provider = new ethers.providers.Web3Provider(ethereum);
                                    const [signer_address] = await ethereum.request({ method: 'eth_requestAccounts' });
                                    console.log(signer_address);

                                    // Contract interactions
                                    const contract = new ethers.Contract(
                                        contract_address,
                                        Julia.abi,
                                        provider.getSigner(0));
                                    
                                    // make sure correct contract
                                    console.log(parseInt(await contract.current_supply()));

                                    // mint new nft
                                    const txn = await contract.mintOne(signer_address, token_uri, { value: ethers.utils.parseEther("10.0") });
                                    const receipt = await txn.wait();
                                    console.log(receipt.events);

                                    dispatch(
                                        {
                                            type: 'SET_ERROR',
                                            payload: {
                                                value: "",
                                            },
                                        });
                                    dispatch(
                                        {
                                            type: 'SET_SUCCESS',
                                            payload: {
                                                value: `Successful Mint : ${hash}`,
                                            },
                                        });
                                } else {
                                    console.log("Wrong network! Connect to fantom")
                                    dispatch(
                                        {
                                            type: 'SET_ERROR',
                                            payload: {
                                                value: "Connect to Fantom Network on Metamask!!!",
                                            },
                                        });
                                    return;
                                }
                            } catch (e) {
                                console.log(e);
                                dispatch(
                                {
                                    type: 'SET_ERROR',
                                    payload: {
                                        key: 'errorMessage',
                                        value: e.data.message,
                                    },
                                });
                            }
                            
                        }, "image/jpg", 1.0);
                        console.log(bl);
                    }
                        
                    }>
                    Mint NFT
                </button>
                <br />          
            </div>
            <div className="error-message">
                <label>{errorMessage}</label>
            </div>
            <div className="success-message">
                <label>{successMessage}</label>
            </div>
            <br />
            <h5>Sketch for seed {hash}</h5>
            <div className="section section-content">
                {(
                    <P5Wrapper
                        id="p5wrap"
                        dispatch={dispatch}
                        sketch={sketchJulia}
                        state={{ hash, refresh, canvas }}
                    />
                )}
            </div>
            <br />
        </div>
    )
}

export default JuliaDisplay;

/*
                        console.log(canvas);
                        let imageData = canvas.toDataURL('image/png');
                        console.log(imageData);

                        const metadata = await ns_client.store({
                            name: `julia_${hash}`,
                            description: 'Julia',
                            image: new File([imageData], `julia_${hash}.png`, { type: 'image/png' })
                        });
                        dispatch(
                            {
                                type: 'SET_VALUE',
                                payload: {
                                    key: 'metadata',
                                    value: metadata,
                                },
                            }
                        );
                        console.log(metadata.url);
                        console.log(bl);
                        */