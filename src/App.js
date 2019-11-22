import React from 'react';


import Header from './components/Header'
import Footer from './components/Footer'
import SidebarLeft from './components/SidebarLeft'
import SidebarRight from './components/SidebarRight'
import Main from './components/Main'
import Modal from './components/Modal'

class App extends React.Component {


/*  componentDidMount() {
    window.jQuery = window.$ = $
      $('.addUser').click(function(){
          alert('AGGIUNGO BOTTONE');
      })
  }*/

  render(){
    return (
      <div className="app">
        <div className="container">
          <Header name="header" id="header" />
          <div className="row">
          <SidebarLeft id="sidebar-left" name="sidebar-left" />
          <Main id="main" name="main" />
          <SidebarRight id="sidebar-right" name="sidebar-right" />
          </div>
          <Footer name="footer" id="footer" />
          <Modal name="myModal" id="myModal" />
        </div>
      </div>
    );
  }
}

export default App;