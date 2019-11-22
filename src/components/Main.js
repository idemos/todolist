import React from 'react';

/*
const now = () => {
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	return dateTime;
}
*/

class Main extends React.Component {

	constructor(props) {

		
		super(props);
		this.state = {
			isLoading: true,
			users: [],
			error: null,
			dateTime: null,
			counter: 0
		}
		this.createUserLocal = this.createUserLocal.bind(this);
        this.createUserLocal = this.createUserLocal.bind(this);
	}

	fetchUsersLocal(){
		 var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

		this.setState({
            counter: this.state.counter+1,
            users: oldItems,
            isLoading: false
        });
	}

	componentWillMount(){
    	// this.fetchUsersLocal()
    	this.fetchUsers()
    	// console.log(this.state);
  	}
/*
   	componentDidUpdate(){
    	localStorage.setItem('itemsArray', JSON.stringify(this.state.users));
  	}
*/

	createUserLocal(){

		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;

		var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

		const newItem = {
			name: name,
			email: email
		}

		oldItems.push(newItem);

		if ("localStorage" in window) {
			localStorage.setItem('itemsArray',JSON.stringify(oldItems));
		}else{
			console.error('NON presente il LOCAL storage');
		}
	}

	async createUser(e) {

		console.log('Get request data to createUser...');
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;

		const user = {
			name: name,
			email: email
		}

		console.log('Posting request to createUser...');
		console.log(user);
		console.log(JSON.stringify(user));

		await fetch('http://localhost/reactjs/index.php', {
			method: 'post',
			body: JSON.stringify(user)
		}).then(function(response) {
			return response.json();
		}).then((data) => {
			console.log('Created data:', data);
			this.fetchUsers();
			/*
			this.setState(({
				prevState: data
			}),this.fetchUsersLocal());
			*/
		});
	}



  	async fetchUsers() {

  		//new_state = this.state.counter+1;
    // Where we're fetching data from
    // "https://jsonplaceholder.typicode.com/users"
    	// const sUrl = `http://localhost/reactjs/index.php`;
    	// const sUrl = "http://laratest.local/index.php/users";
		//const {counter} = this.state;
    	await fetch('http://localhost/reactjs/index.php?_=' + Math.random())
    	// fetch(`http://localhost/reactjs/index.php`, { mode: "no-cors" })
    	// fetch(sUrl)
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
      	.then(datas =>
          this.setState({
          	prevState: datas,
            counter: this.state.counter+1,
            users: datas,
            isLoading: false
          }),

          console.log('fetch then then')
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  	}


	componentDidMount() {
		// this.fetchUsersLocal();
		this.fetchUsers();
	}


  	render() {
	    const { isLoading, users, error, dateTime, counter } = this.state;

	    console.log(counter);

	    return (
	      <main className="col-md-8 main" id={this.props.id} name={this.props.id}>
	        <h1 className="">Utenti {dateTime}
		        <button className="btn btn-success float-left addUser">
					<span className="fa fa-plus"></span>
		        </button>
	        </h1>

	        {error ? <p>{error.message}</p> : null}

	        {!isLoading ? (
	          users.map(user => {
	            var { id, username, name, email } = user;
	            return (
	              <section key={id}>
	                <p>
	                Counter: {this.state.counter+1}<br />
	                Name: {name}<br />
	                userName: {username}<br />
	                Email Address: {email}
	                </p>
	                <hr />
	              </section>
	            );
	          })
	        // If there is a delay in data, let's let the user know it's loading
	        ) : (!error ? null :(
	          <h3>Loading...</h3>
	          )
	        )}
	      </main>
	    );
  	}
}

export default Main;

