import React, { useContext, useEffect, useState } from 'react'

import { generate } from 'shortid';
import { ServerStyleSheet } from 'styled-components';

import sketchSoundbox from '../../sketches/sketch-soundbox';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';
import p5Wrapper from '../P5Wrapper';

// contract
// import Julia from '../../contracts/FractalArt.sol/Julia.json';
import { ethers } from 'ethers';

const P5Wrapper = p5Wrapper(generate())

const SoundboxDisplay =()=> {
    const dispatch = useContext(AppDispatchContext)
    const {
        audio_reset,
        audio_pause,
        audio_hash,
        errorMessage,
        successMessage,
        minted
    } = useContext(AppStateContext)

    const redraw = () => {
        let _hash = '0x';
        for (let i = 0; i < 18; i++) {
            const val = Math.floor(Math.random() * 16);
            _hash = _hash + val.toString(16);
        }
        console.log("Seed", _hash);
        setinp(_hash);
        
        dispatch({
            type: "SET_VALUE",
            payload: {
            key: "audio_reset",
            value: true,
            },
        });
        dispatch({
            type: "SET_VALUE",
            payload: {
            key: "audio_hash",
            value: _hash,
            },
        });
    }

    const [inp, setinp] = useState(audio_hash);

    useEffect(() => {
        if (
        inp.length >= 20 &&
        inp.startsWith("0x")
        ) {
          dispatch({
            type: "SET_VALUE",
            payload: {
              key: "audio_hash",
              value: inp,
            },
          });
        }
        }, [inp]);


    return (
        <div className="mint-wrapper">
            <div className="inputs-wrapper">
                <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                        redraw();
                    } }>
                    Generate
                </button>
                <span></span>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={async () => {
                        console.log(audio_pause);
                        dispatch({
                            type: "SET_VALUE",
                            payload: {
                            key: "audio_pause",
                            value: !audio_pause,
                            },
                        });
                    }
                    }>
                    Play/Pause
                </button>
                                <span></span>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={async () => {
                        dispatch({
                        type: "SET_VALUE",
                        payload: {
                            key: "audio_reset",
                            value: true,
                        },
                        });
                    }
                    }>
                    Reset
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
                <h5>Seed : <input value={inp} onChange={e => {
                    const val = e.target.value
                    // Only uint256 allowed
                    if (ethers.utils.isHexString(val) && val.length <67) {
                      setinp(val);
                    }
                }}/></h5>
            </div>
            <div className="section section-content">
                {(
                    <P5Wrapper
                        id="p5wrap"
                        dispatch={dispatch}
                        sketch={sketchSoundbox}
                        state={{ audio_hash, audio_reset, audio_pause}}
                    />
                )}
            </div>
            <br />
        </div>
    )
}

export default SoundboxDisplay;