import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

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
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/mint' activeStyle>
            Mint NFT
          </NavLink>
          <NavLink to='/dashboard' activeStyle>
            My Dashboard
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {/* {
          <NavBtn>
            <NavBtnLink to='/signin'>Connect Wallet</NavBtnLink>
          </NavBtn>
        } */}
      </Nav>
    </>
  );
};

export default Navbar;
