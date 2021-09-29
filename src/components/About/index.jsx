import React, { useContext, useEffect,  useState } from 'react';
import { ethers } from 'ethers';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';

export default function About() {
    const dispatch = useContext(AppDispatchContext);
    const {
        minted
    } = useContext(AppStateContext);

    return (
        <>
            <div className="wrapper">
                <h2>How to mint</h2>
                <ul>
                    <li>Go to "Mint" tab</li>
                    <li>Click 'Generate New' until you like the generated image</li>
                    <li>Click 'Mint NFT'</li>
                    <li>You will see a success message in green saying 'Successful Mint'</li>
                    <li>If there's an error, you will see the details in red. Follow those instructions.</li>
                    </ul>
                <p>Have fun!!</p>
                <br />
                <h2>Julia NFT</h2>
                <p>This is the first in a series of generative fractal NFTs that I have planned. There is a limit of 3 NFTs per address. Click on 'Generate New' until you find what you like, then click 'Mint'. You'll see a success message in green if the transaction goes through.</p>
                    <ul>
                    <li>Contract Address : 0xc45c766C9D0639654590F16486C936b97eCd714D</li>
                    <li>Minted : {minted}/1000</li>
                    <li>Price : 10 FTM</li>
                    <li>Max mints per address : 3</li>
                    </ul>
                <p>The fractals are generated through a mix of Julia set and interesting number theoretic properties. The generation algorithm is fixed and the code will be committed in a transaction to the blockchain when the mints reach 100.</p>
                <br />
                <h2>About me</h2>
                <p>Hello, I am Cthae. I am an independent artist and developer avidly learning about blockchain. The more I learn, the more I want to create something awesome. You can checkout my other projects as well </p>
                <ul>
                    <li><a href="https://modernalcibiades.github.io/RarityCaretakerDapp/">Rarity Caretaker : Manage all Rarity Manifested summoners</a></li>
                    <li><a href="https://github.com/modernAlcibiades/DragonPriestToken">Dragon Priest : Take care of Lair of Wisdom dragons and earn community tokens</a></li>
                </ul>
            </div>
        </>
    )
}
