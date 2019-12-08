import React from 'react';


class Timer extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			starterFrom:0,
			type: 'asc'
		}
	}

	timer(){

		setInterval(() => {
			this.state(

			)
		})
	}
	
	render(){	
		return (
			<div className="col-md-8 col-lg-8" id="timer" name="timer">
			</div>
		);
	}
}

export default Timer;
