import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn
} from './NavbarElements';

import ConnectWallet from '../ConnectWallet';

const Navbar = () => {
  return (
    <>
      <Nav>
        
        <div className="logo">
          <NavLink to='/'>
              <h1>Julia</h1>
          </NavLink>
        </div>

        <Bars />
        <NavMenu>
          <NavLink to='/about'>
            About
          </NavLink>
          <NavLink to='/mint'>
            Mint NFT
          </NavLink>
          <NavLink to='/dashboard'>
            Gallery
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        
          <NavBtn>
            <ConnectWallet/>
          </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
