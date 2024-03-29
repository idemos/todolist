import React from 'react';


import Header from './components/Header'
import Footer from './components/Footer'
import SidebarLeft from './components/SidebarLeft'
import Main from './components/Main'
import User from './components/User'
import Timer from './components/Timer'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
/*
const now = () => {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return dateTime;
}
*/



//const linkuseredit = (<Link to="/useredit">Edita utente</Link>)
//const linkuseradd = (<Link to="/useradd" component={Modal} />)

class App extends React.Component {

  render(){
    return (
      <div className="app">
        <div className="container">
          <Header name="header" id="header" />
          <Router>
            <Route path="/useredit/:id" component={User} />
            <Route exact path="/" component={Main} />
            <Route path="/useradd" component={User} />
            <Route path="/timer" component={Timer} />
          </Router>
          <Footer name="footer" id="footer" />
        </div>
      </div>
    );
  }
}

export default App;