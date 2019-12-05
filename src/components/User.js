import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'



class User extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			username: '',
			email: '',
			local: true,
			action: 'I',
			index: null
		}
	}
	
	log(text){
		console.dir(text);
	}


	componentDidMount(){
		
		const { id } = this.props.match.params;

		if(typeof id !== "undefined"){

			console.log("id", id);
			this.state.action = 'U';
			this.state.index = id;
			
			var aUser = JSON.parse(localStorage.getItem('user_table')) || [];
			
			this.setState({
				username: aUser[id].username,
				email:aUser[id].email
			});
		}

	}

	updateUser(){

		if(this.state.local == true){
			this.updateUserLocal();
		}else{
			console.error('update API');
		}
	
	}

	updateUserLocal(){

		var aUser = JSON.parse(localStorage.getItem('user_table')) || [];
		const index = this.state.index;

		aUser[index] = {
			username:this.state.username,
			email: this.state.email
		}

		if ("localStorage" in window) {
			localStorage.setItem('user_table',JSON.stringify(aUser));
			this.props.history.push('/');
		}else{
			console.error("localStorage not exists");
		}

	}


	createUser(){

		if(this.state.local === true){
			this.createUserLocal();
		}else{
			this.createUserApi();
		}

	}


	createUserLocal(){

		var aUser = JSON.parse(localStorage.getItem('user_table')) || [];

		const newItem = {
			username: this.state.username,
			email: this.state.email
		}

		aUser.push(newItem);

		if ("localStorage" in window) {
			localStorage.setItem('user_table',JSON.stringify(aUser));
			/*
			this.setState({
				redirecto: 'true'
			}, this.log(this.state));
			*/
			this.props.history.push('/');

		}else{
			console.error('NON presente il LOCAL storage');
		}
	}


	async createUserApi(e) {

		console.log('Get request data to createUser...');
		//const name = document.getElementById("name").value;
		//const email = document.getElementById("email").value;

		const user = {
			username: this.state.username,
			email: this.state.email
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


	saveValue(e,name){

		if(name === 'username'){
			console.log('username', e.target.value);
			this.setState({
				username: e.target.value
			});
		}else if(name === 'email'){
			console.log('email', e.target.value);
			this.setState({
				email: e.target.value
			});
		}
	}

	render(){

		const { username, email} = this.state;

		return (
			<main className="col-md-8">
				<div >
					<div className="card-body">
						<h5 className="card-title">
							<Link to="">
								<i className="fa fa-home"></i>
							</Link>
							Modal title
						</h5>
						<div className="card-body">
							<input type="username" value={username} className="form-control" onChange={(e)=> this.saveValue(e,'username')} />
							<input type="email" value={email} className="form-control" onChange={(e)=> this.saveValue(e,'email')} />
						</div>
						<div className="card-footer">
							<Link to="/">
			      		        <button className="btn btn-secondary">
			      					<span className="fa fa-arrow-left"></span> Indietro
			      		        </button>
			      		    </Link>

							<button type="button" className="btn btn-primary" onClick={(e) => this.createUser(e)}>Inserisci</button>
							<button type="button" className="btn btn-primary" onClick={(e) => this.updateUser(e)}>modifica</button>
						</div>
					</div>
				</div>
			</main>
		);
	}
}


export default User;
