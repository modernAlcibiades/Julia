import React, { useContext } from 'react';

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';

export default function About() {
    const dispatch = useContext(AppDispatchContext);
    const {
        contract_address,
        minted
    } = useContext(AppStateContext);

    return (
        <>
            <div className="wrapper">
                <h2>Julia NFT</h2>
                <p>This is the first in a series of generative fractal NFTs that I have planned. As the artist, I wish for the community to participate in completing the work. On the website, you can generate random samples until you find one that you like. You have limited number of mints - 3 per address, so you will be the one deciding which pieces actually go on the chain. I look forward to seeing the final 1000 pieces.</p>
                <p>The project is named after the Julia set of fractals, which is one of the key components. Using 9 bytes of randomness, the NFT is generated completely on chain, which is still more than 100 billion billion pieces so you can use any 9 bytes seed and get unique art. You can use a seed upto 32 bytes, but the bytes beyond the most significant 9 will be ignored. </p>
                <p>Details are as follows:</p>
                    <ul>
                    <li>Contract Address : <a href={"https://ftmscan.com/address/"+ contract_address}>{contract_address}</a></li>
                    <li>Minted : {minted}/1000</li>
                    <li>Price : 10 FTM</li>
                    <li>Max mints per address : 3</li>
                    </ul>
                <br />
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
                <h2>About me</h2>
                <p>Hello, I am Cthae. I am an independent artist and developer. The more I learn, the more I want to create something awesome. Julia is one such attempt. You can checkout my other projects as well </p>
                <ul>
                    <li><a href="https://modernalcibiades.github.io/RarityCaretakerDapp/">Rarity Caretaker : Manage all Rarity Manifested summoners</a></li>
                    <li><a href="https://github.com/modernAlcibiades/DragonPriestToken">Dragon Priest : Take care of Lair of Wisdom dragons and earn community tokens</a></li>
                </ul>
            </div>
        </>
    )
}
