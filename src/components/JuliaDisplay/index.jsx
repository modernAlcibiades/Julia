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
        address,
        provider,
        ns_client,
        canvas,
        refresh,
        hash,
        errorMessage,
        successMessage,
        dim
    } = useContext(AppStateContext)

    const redraw = () => {
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
        console.log("Seed", _hash);
        
        dispatch({
            type: 'SET_VALUE',
            payload: {
                key: 'hash',
                value: _hash,
            },
        });

    }

    useEffect(() => {
        //const new_dim = Math.floor((window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth) * 0.8);
        const new_dim = Math.floor((screen.width > screen.height ? screen.height : screen.width) * 0.8);
        console.log("Sketch dimension", new_dim);

        // Set Dimension
        dispatch({
            type: 'SET_VALUE',
            payload: {
                key: 'dim',
                value: new_dim,
            },
        });
        // Clear Canvas
        dispatch({
            type: 'SET_VALUE',
            payload: {
                key: 'canvas',
                value: undefined,
            },
        });

        // Redraw on canvas
        redraw();
    }, [])

    return (
        <div className="mint-wrapper">
            <div className="inputs-wrapper">
                <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                        redraw();
                    } }>
                    Generate New
                </button>
                <span></span>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={async () => {
                        if (provider === undefined || address === undefined ) {
                            dispatch(
                                {
                                    type: 'SET_ERROR',
                                    payload: {
                                        value: "Please connect your wallet before minting",
                                    },
                                });
                            return;
                        }

                        const bl = await canvas.toBlob(async function (blob) {// get content as blob
                            dispatch(
                                {
                                    type: 'SET_SUCCESS',
                                    payload: {
                                        value: `Minting. Please wait...`,
                                    },
                                });
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
                                // Initialize contract
                                const contract = new ethers.Contract(
                                    contract_address,
                                    Julia.abi,
                                    provider.getSigner(0));
                                // make sure correct contract
                                console.log(parseInt(await contract.current_supply()));

                                // mint new nft
                                const txn = await contract.mintOne(address, token_uri, { value: ethers.utils.parseEther("10.0") });
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
                            } catch (e) {
                                console.log(e);
                                try {
                                    dispatch(
                                    {
                                        type: 'SET_ERROR',
                                        payload: {
                                            value: e.data.message,
                                        },
                                    });        
                                } catch (e2) {
                                    console.log(e2);
                                    dispatch(
                                    {
                                        type: 'SET_ERROR',
                                        payload: {
                                            value: e.message,
                                        },
                                    });
                                }
    
                            }
                        }, "image/jpg", 1.0);
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
            <div className="info-message">
                <h5>Sketch for seed {hash}</h5>
            </div>
            <div className="section section-content">
                {(
                    <P5Wrapper
                        id="p5wrap"
                        dispatch={dispatch}
                        sketch={sketchJulia}
                        state={{ hash, refresh, canvas, dim }}
                    />
                )}
            </div>
            <br />
        </div>
    )
}

export default JuliaDisplay;