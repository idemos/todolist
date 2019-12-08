import React from 'react';
import Modal from './Modal'
import SearchBar from './SearchBar'
import UserCard from './UserCard'
import SidebarRight from './SidebarRight'
import OrderByName from './OrderBy/OrderByName'
import OrderByEmail from './OrderBy/OrderByEmail'

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
			searchText: '',
			userFavoriteCount: 0
		}
		
		//this.orderByEmail = this.orderByEmail.bind(this);
        //this.orderByName = this.orderByName.bind(this);
	}


	componentDidMount() {

		if(this.state.local === true){
			console.log('fetch local');
			this.fetchUsersLocal();
			this.readFavorite();
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
              	console.log('fetch (0)then NOT 200');
              	throw new Error("Not 200 response")
          	} else {
                console.log('fetch (0)then');
                return response.json();
          	}
      	})
*/
		.then(response => {
		
			response.json();
			console.log('fetch (1)then');
		})
      	// ...then we update the users state
      	.then(datas => {

      		this.setState({
            	users: datas,
            	isLoading: false
          	});

          	console.log('fetch (2)then');
        })
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

	addToFavorite(e,email){

		var aUsers_favorite = JSON.parse(localStorage.getItem('user_favorite_table')) || [];

		//const newItem = {email:email,created_at:};

		aUsers_favorite.push(email);

		if ("localStorage" in window) {
			localStorage.setItem('user_favorite_table',JSON.stringify(aUsers_favorite));
			this.readFavorite();
		}else{
			console.error('NON presente il LOCAL storage');
		}
	}


	readFavorite = () => {

		const aUsers_favorite = JSON.parse(localStorage.getItem('user_favorite_table')) || [];

		console.log('aUsers_favorite' + aUsers_favorite.length);

		this.setState({
            usersFavorite: aUsers_favorite,
            userFavoriteCount: aUsers_favorite.length
        });
	}

	searchText(e){
		
		const val = e.target.value;
		console.log(val);
		
		this.setState({
			searchText: val
		});
	}

	orderByEmail = e => {
		
		if(e.target.value !== ''){

			const combobox = e.target.value;
			const users = this.state.users;
			const userSorted = users.sort(function(a, b){

				console.log(a);
				console.log(b);
				
				var emailA = a.email.toUpperCase(); // ignora maiuscole e minuscole
				var emailB = b.email.toUpperCase(); // ignora maiuscole e minuscole
				if (emailA < emailB) { return (combobox==='0' ? -1 : 1); }
				if (emailA > emailB) { return (combobox==='0' ? 1 : -1); }
				// i nomi devono essere uguali
				return 0;
			});

			this.setState({users: userSorted});
		}
	}

	orderByName = e => {
		
		if(e.target.value !== ''){

			const combobox = e.target.value;
			const users = this.state.users;
			const userSorted = users.sort(function(a, b){
				
				var usernameA = a.username.toUpperCase(); // ignora maiuscole e minuscole
				var usernameB = b.username.toUpperCase(); // ignora maiuscole e minuscole
				if (usernameA < usernameB) { return (combobox==='0' ? -1 : 1); }
				if (usernameA > usernameB) { return (combobox==='0' ? 1 : -1); }
				// i nomi devono essere uguali
				return 0;
			});

			this.setState({users: userSorted});
		}	
	}


  	render() {

	    const { isLoading, users, error, dateTime, searchText, userFavoriteCount } = this.state;

	    const style_useradd = {
	    	marginTop:'10px',
	    	marginBottom:'10px',
	    	display: 'grid',

	    }


		var usersList = [];
		console.log(users);
	    if(users.length > 0){
			usersList = users.filter(oUser => {
				return oUser.username.toLowerCase().includes(searchText) ||  oUser.email.toLowerCase().includes(searchText);
			});
	    }

	    
	    return (
	    	<div className="row">
		      	<main className="col-md-8 col-lg-8 main" id={this.props.id} name={this.props.id}>
			    	<div className="row">
				    	<div className="col-md-6 col-lg-6">
				      		<OrderByEmail handlerOrderByEmail={(e) => this.orderByEmail(e)} default="Ordina per email" />
				      	</div>
				      	<div className="col-md-6 col-lg-6">
				      		<OrderByName handlerOrderByName={(e) => this.orderByName(e)} default="Ordina per nome" />
				      	</div>
			      	</div>

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
			      	            	<UserCard 
				      	            	key={index} 
				      	            	deleteUser={this.deleteUser} 
				      	            	addToFavorite={(e)=>this.addToFavorite(e,email)} 
				      	            	index={index}
			      	            	>
				      	                Name: {username}<br />
			      	                	Email Address: {email}
			      	              	</UserCard>
			      	            );
		      	          	})
		      	        // If there is a delay in data, let's let the user know it's loading
		      	        ) : (!error ? null :(<h3>Loading...</h3>))
	      	    	}
	      	    </main>
	      	    <SidebarRight 
		      	    id="sidebar-right" 
		      	    name="sidebar-right"
				    count={userFavoriteCount} 
	      	    />
          	</div>
	      	
	    );
  	}
}

export default Main;

