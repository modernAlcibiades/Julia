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
  };

  useEffect(() => {
    get_nfts();
  }, [contract]);

  useEffect(() => {
    // filter tokens to find only tokens that belong to this address
    const filter = tokens.filter((token) => {
      if (token.owner == address) {
        return true;
      } else {
        return false;
      }
    });
    setFiltered(filter);
  }, [address]);

  if (address === undefined) {
    const listItems = tokens.map((token) => <TokenDisplay t={token}/>);
    return (
      <>
        <div className="card-wrapper">
          <div className="info-message">
            <h2>Julia NFT Gallery</h2>
          </div>

          <div className="error-message">Connect wallet</div>
          <br />
          <div className="info-message">Total Minted : {minted} / 1000</div>
          <br />
          <Grid
            className="section"
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={5}
          >
            {listItems}
          </Grid>
        </div>
      </>
    );
  } else {
    const listItems = filtered.map((token) => (
      <TokenDisplay t={token} />
    ));
    return (
      <>
        <div className="p5wrapper">
          <h2>Julia NFT Gallery</h2>
          <div className="info-message">Address : {address}</div>
          <br />
          <div className="info-message">Owned : {filtered.length}</div>
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
      </>
    );
  }
}
