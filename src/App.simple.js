import React from 'react';

class App extends React.Component {

  constructor(props) {    
    super(props)
    this.state = {
      isLoading: true,
      users: [],
      error: null
    }
  }

  createUser(opts) {
    
    console.log('Get request data to createUser...');
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const user = {
      name: name,
      username: username,
      email: email
    }

    console.log('Posting request to createUser...');

    fetch('http://localhost/addUser', {
      method: 'post',
      body: JSON.stringify(user)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log('Created User-id:', data.id);
    });
  }

  fetchUsers() {
    // Where we're fetching data from
    fetch("https://jsonplaceholder.typicode.com/users")
      // We get the API response and receive data in JSON format...
      .then(function(response) {
          if (response.status !== 200) {
              // make the promise be rejected if we didn't get a 200 response
              throw new Error("Not 200 response")
          } else {
               return response.json();
          }
      })
      // ...then we update the users state
      .then(data =>
          this.setState({
            users: data,
            isLoading: false,
          })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }




  render() {
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>
        <h1>Get All User</h1>

        {error ? <p>{error.message}</p> : null}

        {!isLoading ? (
          users.map(user => {
            const { id, username, name, email } = user;
            return (
              <div key={id}>
                <p>Name: {name}</p>
                <p>userName: {username}</p>
                <p>Email Address: {email}</p>
                <hr />
              </div>
            );
          })
        // If there is a delay in data, let's let the user know it's loading
        ) : (!error ? null :(
          <h3>Loading...</h3>
          )
        )}
      </React.Fragment>
    );
  }
}

export default App;
