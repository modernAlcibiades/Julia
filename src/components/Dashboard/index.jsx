import React, { useContext, useState, useEffect } from "react";

import { AppDispatchContext, AppStateContext } from "../App/AppStateProvider";
import TokenDisplay from "../TokenDisplay";
import Grid from '@material-ui/core/Grid';

const axios = require("axios");
export default function Dashboard() {
  const dispatch = useContext(AppDispatchContext);
  const { address, contract_address, contract, FTMSCAN_API_KEY, minted } =
    useContext(AppStateContext);

  const default_seed = '';
  const default_img =
    "https://ipfs.io/ipfs/bafybeicydwl32gumbynw7qk2fildlajy3qf26r4gnb6mf5kfpctqykorau/blob";
  
  const [tokens, setTokens] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const FTMSCAN_API = "https://api.ftmscan.com/api";

  // // Overlay params
  // const [isOpen, toggleOpen] = useState(false);
  // const [displayImage, toggleImage] = useState(0);

  // const handleShowDialog = (events) => {
  //   toggleOpen(!isOpen);
  //   console.log("toggle");
  // };

  // const modal = (
  //   <dialog
  //     className="dialog"
  //     style={{ position: "absolute" }}
  //     open={isOpen}
  //     onClick={handleShowDialog}
  //   >
  //     <ModalImage
  //       className="display-image"
  //       src={displayImage}
  //       onClick={handleShowDialog}
  //       alt="no image"
  //     />
  //   </dialog>
  // );

  // Initialize NFTs
  const get_nfts = async () => {
    const request = {
      method: "get",
      url: `${FTMSCAN_API}?module=account&action=tokennfttx&contractaddress=${contract_address}&tag=latest&apikey=${FTMSCAN_API_KEY}`,
    };
    let response = await axios(request);
    let ids;
    if (response.data.message.startsWith("OK")) {
      // If tokens returned, get their URI
      //console.log(Object.keys(response.data.result));
      ids = response.data.result;
    }

    let metadata = [];
    for (let i = 0; i < ids.length; i++) {
      try {
        let url = await contract.tokenURI(ids[i].tokenID);
        url = url.replace("ipfs://", "https://ipfs.io/ipfs/");
        const data = await axios({
          method: "get",
          url: url,
        });
        //console.log(data.data);
        url = data.data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
        metadata.push({
          tokenId: ids[i].tokenID,
          owner: ids[i].to,
          seed: data.data.seed,
          image: url,
        });
      } catch (e) {
        metadata.push({
          tokenId: ids[i].tokenID,
          owner: ids[i].to,
          seed: default_seed,
          image: default_img,
        });
      }
    }
    const final = await Promise.all(metadata);
    setTokens(final);
    dispatch({
      type: "SET_VALUE",
      payload: {
        key: "minted",
        value: final.length,
      },
    });
  };

  useEffect(() => {
    get_nfts();
    const filter = tokens.filter((token) => {
      if (token.owner === address) {
        return true;
      } else {
        return false;
      }
    });
    setFiltered(filter);
  }, [contract]);

  useEffect(() => {
    // filter tokens to find only tokens that belong to this address
    const filter = tokens.filter((token) => {
      if (token.owner === address) {
        return true;
      } else {
        return false;
      }
    });
    setFiltered(filter);
  }, [address]);

  let listItems, display_message;

  if (address === undefined) {
    listItems = tokens.map((token) => <TokenDisplay t={token} />);
    display_message = `Total Minted : ${minted}/1000`;

  } else {
    listItems = filtered.map((token) => (
      <TokenDisplay t={token} />
    ));
    display_message = `Minted : ${filtered.length}`;
  }

  // Links
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <>
      <div className="mint-wrapper">
        <div className="inputs-wrapper">
          <button
            className="btn btn-warning"
            type="button"
            onClick={() =>
              openInNewTab(
                "https://artion.io/explore/0x60059e9a55b52a5eea01a37a0a78c05806d9dfd9/3"
              )
            }
          >
            View on Artion
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
          <div className="info-message">{display_message}</div>
          <br />
          <Grid
            className="section"
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={10}
          >
            {listItems}
          </Grid>
        </div>
      </div>
    </>
  );
}
