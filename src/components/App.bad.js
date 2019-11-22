import React from 'react';

import Header from './Header'
import Footer from './Footer'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import Main from './Main'


class App extends React.Component{

    constructor(){
        super();
        this.state = {
          name: "Eddy",
          age: "25",
          job: "blowjob"
        }

    }

    render(){
      return (
        <div className="app row">
          <div className="container">
            Welcome {this.state.name} age {this.state.age} your job is {this.state.job}
          </div>
        </div>
      );

    }

}


export default App;
