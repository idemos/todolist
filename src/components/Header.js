import React from 'react';
import NavBar from './NavBar';


function Header(props) {
  return (
    <header id={props.id} name={props.id}>
    <NavBar />
    </header>
  );
}

export default Header;
