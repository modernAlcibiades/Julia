import React, { useContext, useState, useEffect } from "react";
import ModalImage from "react-modal-image";
//import { AppDispatchContext, AppStateContext } from "../App/AppStateProvider";

const TokenDisplay = ({ t }) => {
    return (
      <>
        <div id={t.tokenId} className="card">
          <ModalImage
            loading="lazy"
            className="card-image"
            small={t.image}
            large={t.image}
            alt="Julia NFT"
          />
          <div className="card-container">
            <h4>Id : {t.tokenId}</h4>
            <h4>Seed : {t.seed.substring(0, 20)}</h4>
          </div>
        </div>
      </>
    );
}

export default TokenDisplay;