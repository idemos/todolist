import React from 'react';
import '../assets/css/bootstrap.min.css';

import Header from './Header'
import Footer from './Footer'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import Main from './Main'


function App() {
  return (
    <div className="app row">
      <div className="container">
        <Header name="header" id="header" />
        <div className="row">
        <SidebarLeft id="sidebar-left" name="sidebar-left" />
        <Main id="main" name="main" />
        <SidebarRight id="sidebar-right" name="sidebar-right" />
        </div>
        <Footer name="footer" id="footer" />
      </div>
    </div>
  );
}

export default App;
