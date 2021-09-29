import React, { useContext } from 'react';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';

export default function Dashboard() {
    const {
        address
    } = useContext(AppStateContext);
    if (address === undefined) {
        return (
            <>
                <div className="wrapper">
                    <h2>Julia NFT Gallery</h2>
                    <div className="error-message">
                        <label>Connect wallet</label>
                    </div>
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
                    </div>
                </div>
            </>
        );
    }
}
