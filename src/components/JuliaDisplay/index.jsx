import React, { useContext, useEffect, useState } from 'react'

import { generate } from 'shortid';

import sketchJulia from '../../sketches/sketch-julia';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';
import p5Wrapper from '../P5Wrapper';

// contract
import Julia from '../../contracts/FractalArt.sol/Julia.json';
import { ethers } from 'ethers';

const P5Wrapper = p5Wrapper(generate())

const JuliaDisplay =()=> {
  const dispatch = useContext(AppDispatchContext);
  const {
    contract,
    contract_address,
    address,
    provider,
    ns_client,
    blobd,
    refresh,
    hash,
    errorMessage,
    successMessage,
    minted,
  } = useContext(AppStateContext);
    
  // Links
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
    
  const redraw = () => {
    dispatch({
      type: "SET_VALUE",
      payload: {
        key: "refresh",
        value: true,
      },
    });
    let _hash = "0x";
    for (let i = 0; i < 18; i++) {
      const val = Math.floor(Math.random() * 16);
      _hash = _hash + val.toString(16);
    }
    console.log("Seed", _hash);
    setinp(_hash);

    dispatch({
      type: "SET_VALUE",
      payload: {
        key: "hash",
        value: _hash,
      },
    });
  };

  // Setup function
  useEffect(() => {
    // Clear Canvas
    dispatch({
      type: "SET_VALUE",
      payload: {
        key: "blobd",
        value: undefined,
      },
    });

    // Redraw on canvas
    redraw();
  }, []);

  const [inp, setinp] = useState(hash);

  useEffect(() => {
    (async () => {
      // Initialize contract
      if (provider !== undefined) {
        const cnt = new ethers.Contract(contract_address, Julia.abi, provider);

        dispatch({
          type: "SET_VALUE",
          payload: {
            key: "contract",
            value: cnt,
          },
        });

        const mint = parseInt(await cnt.current_supply());
        console.log("Minted", mint);

        dispatch({
          type: "SET_VALUE",
          payload: {
            key: "minted",
            value: mint,
          },
        });
      } else {
        dispatch({
          type: "SET_VALUE",
          payload: {
            key: "contract",
            value: undefined,
          },
        });
      }
    })();
  }, [provider]);

  useEffect(() => {
    if (inp.length >= 20 && inp.startsWith("0x")) {
      dispatch({
        type: "SET_VALUE",
        payload: {
          key: "hash",
          value: inp,
        },
      });
      // Needs redrawing
      dispatch({
        type: "SET_VALUE",
        payload: {
          key: "refresh",
          value: true,
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
          }}
        >
          Generate
        </button>
        <span></span>
        <button
          type="button"
          className="btn btn-warning"
          onClick={async () => {
            if (provider === undefined || address === undefined) {
              dispatch({
                type: "SET_ERROR",
                payload: {
                  value: "Please connect your wallet before minting",
                },
              });
              return;
            }

            const bl = await blobd.toBlob(
              async function (blob) {
                // get content as blob
                dispatch({
                  type: "SET_SUCCESS",
                  payload: {
                    value: `Minting. Please wait...`,
                  },
                });
                let metadata;
                try {
                  metadata = await ns_client.store({
                    name: `Julia`,
                    seed: `${hash}`,
                    description: `julia_${hash}`,
                    image: blob,
                  });
                  dispatch({
                    type: "SET_VALUE",
                    payload: {
                      key: "metadata",
                      value: metadata,
                    },
                  });
                } catch (e) {
                  console.log("Failed to upload");
                  dispatch({
                    type: "SET_ERROR",
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
                  // mint new nft
                  const txn = await contract
                    .connect(provider.getSigner(0))
                    .mintOne(address, hash, token_uri, {
                      value: ethers.utils.parseEther("10.0"),
                    });
                  const receipt = await txn.wait();
                  console.log(receipt.events);

                  const mint = parseInt(await contract.current_supply());
                  dispatch({
                    type: "SET_VALUE",
                    payload: {
                      key: "minted",
                      value: mint,
                    },
                  });

                  dispatch({
                    type: "SET_ERROR",
                    payload: {
                      value: "",
                    },
                  });
                  dispatch({
                    type: "SET_SUCCESS",
                    payload: {
                      value: `Successful Mint : ${hash}`,
                    },
                  });
                } catch (e) {
                  console.log(e);
                  try {
                    dispatch({
                      type: "SET_ERROR",
                      payload: {
                        value: e.data.message,
                      },
                    });
                  } catch (e2) {
                    console.log(e2);
                    dispatch({
                      type: "SET_ERROR",
                      payload: {
                        value: e.message,
                      },
                    });
                  }
                }
              },
              "image/jpg",
              1.0
            );
          }}
        >
          Mint
        </button>
        <span></span>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() =>
            openInNewTab(
              "https://paintswap.finance/marketplace/collections/0x60059e9a55b52a5eea01a37a0a78c05806d9dfd9"
            )
          }
        >
          View on Paintswap
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
        <h5>
          Seed :{" "}
          <input
            value={inp}
            onChange={(e) => {
              const val = e.target.value;
              // Only uint256 allowed
              if (ethers.utils.isHexString(val) && val.length < 67) {
                setinp(val);
              }
            }}
          />
        </h5>
      </div>
      <div className="section section-content">
        {
          <P5Wrapper
            id="p5wrap"
            dispatch={dispatch}
            sketch={sketchJulia}
            state={{ hash, refresh }}
          />
        }
      </div>
      <div className="info-message">
        <h4>Mint Status : {minted} / 1000</h4>
      </div>
      <br />
    </div>
  );
}

export default JuliaDisplay;