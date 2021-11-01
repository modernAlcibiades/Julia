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
          <p>
            This is the first in a series of generative fractal NFTs. As the
            artist, I wish for the community to participate in completing the
            work. On the website, you can generate images until you find one
            that you like. You have limited number of mints - 3 per address, so
            you will be the one deciding which pieces actually go on the chain.
            I look forward to seeing the final 1000 pieces.
          </p>
          <p>
            The project is named after the Julia set of fractals, which is one
            of the key components. Using 9 bytes of randomness, the NFT is
            generated completely on chain. There's more than 1 billion billion
            possible images, all dependant only on the hexadecimal 'Seed'
            string. You can use a 'Seed` upto 64 digits long, but only first 18
            digits are used for generation.
          </p>
          <p>Details are as follows:</p>
          <ul>
            <li>
              Contract Address :{" "}
              <a href={"https://ftmscan.com/address/" + contract_address}>
                {contract_address}
              </a>
            </li>
            <li>Minted : {minted}/1000</li>
            <li>Price : 10 FTM</li>
            <li>Max mints per address : 3</li>
          </ul>
            <a href="https://discord.gg/BvkwG2Bd">Discord</a>
            <span/>
            <a href="https://twitter.com/FractalWild">Twitter</a>
          <br />
          <h2>How to mint</h2>
          <ul>
            <li>
              <b>Go to "Mint NFT" tab</b>
            </li>
            <li>
              <b>Click 'Generate' until you like the generated image</b>
            </li>
            <li>
              <b>Click 'Mint'</b>
            </li>
            <li>
              You will see a success message in green saying 'Successful Mint'
            </li>
            <li>
              If there's an error, you will see the details in red. Follow those
              instructions.
            </li>
          </ul>
          <p>
            If you want to discover the true joy of creation, I recommend
            editing the Seed value directly until you find what you are looking
            for. Have fun!!
          </p>
          <br />
          <h2>About me</h2>
          <p>
            Hello, I am Cthae. I am an independent artist and developer. The
            more I learn, the more I want to create something awesome. Julia is
            one such attempt. You can checkout my other projects as well{" "}
          </p>
          <ul>
            <li>
              <a href="https://modernalcibiades.github.io/RarityCaretakerDapp/">
                Rarity Caretaker : Manage all Rarity Manifested summoners
              </a>
            </li>
            <li>
              <a href="https://github.com/modernAlcibiades/DragonPriestToken">
                Dragon Priest : Take care of Lair of Wisdom dragons and earn
                community tokens
              </a>
            </li>
          </ul>
        </div>
      </>
    );
}
