import React from 'react'

export default function About() {
    return (
        <>
             <div className="title">
                <hr width="30%" color="grey" />
                <h2>About</h2>
                <h4>Julia NFT</h4>
                <p>This is the first in a series of generative fractal NFTs that I have planned. There is a limit of 3 NFTs per address. Click on 'Generate New' until you find what you like, then click 'Mint'. You'll see a success message in green if the transaction goes through.</p>
                    <ul>
                    <li>Contract Address : 0xc45c766C9D0639654590F16486C936b97eCd714D</li>
                    <li>Max Supply : 1000</li>
                    <li>Price : 10 FTM</li>
                    <li>Max NFTs per address : 3</li>
                </ul>
                <p>The fractals are generated through a mix of Julia set and interesting number theoretic properties. The code is fixed, which will be committed in a transaction to the blockchain when the mints reach 100. Enjoy!</p>
                <br />
                <h4>About me</h4>
                <p>Hello, I am Cthae. I am an independent artist and developer avidly learning about blockchain. The more I learn, the more I want to create something awesome. You can checkout my other projects as well </p>
                <ul>
                    <li><a href="https://modernalcibiades.github.io/RarityCaretakerDapp/">Rarity Caretaker : Manage all Rarity Manifested summoners</a></li>
                    <li><a href="https://github.com/modernAlcibiades/DragonPriestToken">Dragon Priest : Take care of Lair of Wisdom dragons and earn community tokens</a></li>
                </ul>
                
            </div>
        </>
    )
}
