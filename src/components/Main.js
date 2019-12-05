import React from 'react';
import Modal from './Modal'
import SearchBar from './SearchBar'
import UserCard from './UserCard'

import '../assets/css/Main.css'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


class Main extends React.Component {


	constructor(props) {

		super(props);
		this.state = {
			isLoading: true,
			users: [],
			error: null,
			local: true,
			searchText: ''
		}
		
		//this.createUserApi = this.createUserApi.bind(this);
        //this.createUserLocal = this.createUserLocal.bind(this);
	}


	componentDidMount() {

		if(this.state.local === true){
			console.log('fetch local');
			this.fetchUsersLocal();
		}else{
			console.log('fetch Api');
			this.fetchUsersApi();
		}
		
	}


	fetchUsersLocal(){
		
		const aUsers = JSON.parse(localStorage.getItem('user_table')) || [];

		this.setState({
            users: aUsers,
            isLoading: false
        });
	}


  	async fetchUsersApi() {

    	await fetch('http://localhost/reactjs/index.php?_=' + Math.random())
    	// fetch(`http://localhost/reactjs/index.php`, { mode: "no-cors" })
/*
      	.then(function(response) {
            console.error(response.status);
          	if (response.status !== 200) {
              	// make the promise be rejected if we didn't get a 200 response
              	throw new Error("Not 200 response")
          	} else {
                console.error('response',response);
                return response.json();
          	}
      	})
*/
		.then(response => response.json())
      	// ...then we update the users state
      	.then(datas => this.setState({
            users: datas,
            isLoading: false
          }),

          console.log('fetch then then')
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  	}


	createUser(){

		if(this.state.local === true){
			this.createUserLocal();
		}else{
			this.createUserApi();
		}
	}


	deleteUser = (e,index) => {

		console.log(e, index);
		
		if(this.state.local === true){
			this.deleteUserLocal(index);
		}else{
			this.deleteUserApi();
		}

	}


	deleteUserLocal(index){
		
		var aUser = JSON.parse(localStorage.getItem('user_table')) || [];


		aUser.splice(index, 1);

		if ("localStorage" in window) {
			localStorage.setItem('user_table',JSON.stringify(aUser));
			this.fetchUsersLocal();
		}else{
			console.error('NON presente il LOCAL storage');
		}
	}


	createUserLocal(){

		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;

		var aUser = JSON.parse(localStorage.getItem('user_table')) || [];

		const newItem = {
			name: name,
			email: email
		}

		aUser.push(newItem);

		if ("localStorage" in window) {
			localStorage.setItem('user_table',JSON.stringify(aUser));
			this.fetchUsersLocal();
		}else{
			console.error('NON presente il LOCAL storage');
		}
	}


	async createUserApi(e) {

		console.log('Get request data to createUser...');
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;

		const user = {
			name: name,
			email: email
		}

		await fetch('http://localhost/reactjs/index.php', {
			method: 'post',
			body: JSON.stringify(user)
		}).then(function(response) {
			return response.json();
		}).then((data) => {
			console.log('Created data:', data);
			this.fetchUsersApi();
		});
	}


	searchText(e){
		
		const val = e.target.value;
		console.log(val);
		
		this.setState({
			searchText: val
		});
	}


  	render() {

	    const { isLoading, users, error, dateTime, searchText } = this.state;

	    const style_useradd = {
	    	marginTop:'10px',
	    	marginBottom:'10px',
	    	display: 'grid',

	    }


	    //const {users, searchText} = this.state;
		const usersList = users.filter(oUser => {
			return oUser.username.toLowerCase().includes(searchText);
		});

	    
	    return (
	    	
	      	<main className="col-md-8 col-lg-8 main" id={this.props.id} name={this.props.id}>
      	        <SearchBar  
      	        	searchText={(e) => this.searchText(e)} 
      	        	placeholder="what are you looking for?"
      	        />
      	        
      	        <Link to="/useradd" style={style_useradd}>
      		        <button className="btn btn-success btn-block float-left user-add">
      					<span className="fa fa-plus"></span> add user
      		        </button>
      		    </Link>
      	        
      
      	        {error ? <p>{error.message}</p> : null}
      
      	        {!isLoading ? 
      	        	(
	      	          	usersList.map((user,index) => {
		      	            var { username, email } = user;
		      	            return (      	            	
		      	            	<UserCard key={index} deleteUser={this.deleteUser} index={index} >
			      	                Name: {username}<br />
		      	                	Email Address: {email}
		      	              	</UserCard>
		      	            );
	      	          	})
	      	        // If there is a delay in data, let's let the user know it's loading
	      	        ) : (!error ? null :(<h3>Loading...</h3>))
      	    	}
      	    </main>
	      	
	    );
  	}
}

export default Main;

