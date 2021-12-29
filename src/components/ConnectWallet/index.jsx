import React, { useContext, useEffect, useState } from "react";

import { AppDispatchContext, AppStateContext } from "../App/AppStateProvider";
import { ethers } from "ethers";

export default function ConnectWallet() {
  const dispatch = useContext(AppDispatchContext);
  const { address, provider, errorMessage } = useContext(AppStateContext);

  const [buttonText, setButtonText] = useState("Connect Wallet");
  const ethereum = window.ethereum;

  const clear_connect = () => {
    dispatch({
      type: "SET_VALUE",
      payload: {
        key: "address",
        value: undefined,
      },
    });
    setButtonText("Connect Wallet");
  };

  const connect_provider = (chainId) => {
    console.log(chainId);
    if (chainId == "0xfa") {
      const prov = new ethers.providers.Web3Provider(ethereum);
      dispatch({
        type: "SET_VALUE",
        payload: {
          key: "provider",
          value: prov,
        },
      });
      // Clear errors - may be an overkill to use here
      dispatch({
        type: "SET_ERROR",
        payload: "",
      });
    } /*else {
      dispatch({
        type: "SET_VALUE",
        payload: {
          key: "provider",
          value: undefined,
        },
      });
    }*/
  }

  const toggle_connect = async () => {
    if (address !== undefined) {
      // If not returned yet, clear info
      clear_connect();
    } else {
      try {
        if (provider === undefined) {
          // Connect provider
          connect_provider(ethereum.chainId);
        }

        if (provider !== undefined) {
          const [signer_address] = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setButtonText(signer_address.substring(0, 22) + "...");

          dispatch({
            type: "SET_VALUE",
            payload: {
              key: "address",
              value: signer_address,
            },
          });
          dispatch({
            type: "SET_SUCCESS",
            payload: {
              value: "",
            },
          });
        } else {
          // wrong chain, connect to fantom
          console.log("wrong Chain");
          dispatch({
            type: "SET_ERROR",
            payload: {
              value: "Connect to Fantom Opera.",
            },
          });
        }
      } catch (e) {
        try{
          dispatch({
            type: "SET_ERROR",
            payload: { value: e.data.message },
          });
        } catch (e2) {
          dispatch({
            type: "SET_ERROR",
            payload: { value: e.message },
          });
        }
      }
    }
  };

  useEffect(() => {
    ethereum.on("connect", (connectInfo) => {
      connect_provider(connectInfo.chainId);
    });

    // on account change
    ethereum.on("accountsChanged", ([newAddress]) => {
      console.log("Change account", newAddress);
      dispatch({
        type: "SET_VALUE",
        payload: {
          key: "address",
          value: newAddress,
        },
      });
      setButtonText(newAddress.substring(0, 22) + "...");
    });

    // on chain change
    ethereum.on("chainChanged", (chainId) => {
      console.log("Chain Changed", chainId);
      connect_provider(chainId);
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
  );
}
