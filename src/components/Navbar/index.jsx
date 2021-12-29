import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavLogo
} from './NavbarElements';

import ConnectWallet from '../ConnectWallet';

const Navbar = () => {
  return (
    <>
      <Nav>
        <div className="logo">
          <NavLink to="/">
            <h1>Julia</h1>
          </NavLink>
        </div>

        <Bars />
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/mint">Mint Julia NFT</NavLink>
          <NavLink to="/soundbox">Soundbox Demo</NavLink>
          <NavLink to="/dashboard">Gallery</NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <ConnectWallet />
        </NavBtn>
        {/* <NavLogo>
          <a
            className="nav-logo"
            href="https://paintswap.finance/marketplace/collections/0x60059e9a55b52a5eea01a37a0a78c05806d9dfd9"
          >
            <img
              id="paintswap"
              className="nav-logo"
              src="static/logos/paintswap.png"
            />
          </a>
        </NavLogo>
        <NavLogo>
          <a href="https://twitter.com/FractalWild">
            <img
              id="twitter"
              className="nav-logo"
              src="static/logos/twitter.png"
            />
          </a>
        </NavLogo> */}
      </Nav>
    </>
  );
};

export default Navbar;
