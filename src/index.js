import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fontawesome/css/all.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';

import * as $ from 'jquery'
import Popper from 'popper.js';
//import 'bootstrap/dist/js/bootstrap.bundle.min';

import './assets/js/custom.js';

// api key food2fork => c2287d91f4c6c17dd8b215256bd7a0ae

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

window.jQuery = window.$ = $

$(document).on('click', ".addUser", function(e){
	
	e.preventDefault();
	console.log('mymodal open addUser');

	$('#myModal').modal('show');

	$('#myModal').on('shown.bs.modal', function () {
	  	var f = $("<form>");
		f.attr('method',"post");
		f.attr('action',"submit.php");
/*
		var i = $("<input>"); //input element, text
		i.attr('type',"text");
		i.attr('id',"username");
		i.attr('name',"username");
		i.attr('placeholder',"username");
		i.attr('class',"form-control");

		f.append(i);
*/
		var i = $("<input>"); //input element, text
		i.attr('type',"email");
		i.attr('name',"email");
		i.attr('id',"email");
		i.attr('placeholder',"email");
		i.attr('class',"form-control");

		f.append(i);
		
		var i = $("<input>"); //input element, text
		i.attr('type',"text");
		i.attr('name',"name");
		i.attr('id',"name");
		i.attr('placeholder',"name");
		i.attr('class',"form-control");

		f.append(i);

		$(this).find('.modal-body').empty().append(f);
	})
/*
	$('#myModal').on('hidden.bs.modal', function () {
		$(this).find('.modal-body').html('');
	})

	$('#myModal').find('.modal-body').html('');
*/

});

/*
function createUser() {

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

	fetch('http://localhost/reactjs/index.php', {
		method: 'post',
		body: JSON.stringify(user)
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log('Created User-id:', data.id);
	});
}

*/