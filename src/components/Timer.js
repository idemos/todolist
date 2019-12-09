import React from 'react';


class Timer extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			starterFrom:0,
			type: 'asc',
			second:1,
			counter:0
		}
	}

	timer(){

		console.log('invocato il timer');
		setInterval(() => {
			this.setState((prevStates,props) => ({
				counter: (prevStates.type == 'asc' ? 
					(prevStates.counter + prevStates.second) : 
					(prevStates.counter - prevStates.second))
			}))
		}, 1000)
	}

	componentDidMount(){
		
		console.log('invocato il component');
		this.timer()
	}

	setCountDown(e){
		this.setState({
			
		})
		e.target.value
	}
	
	render(){

		console.log('invocato il timer render');
		const {counter} = this.state;

		return (
			<div className="col-md-8 col-lg-8" id="timer" name="timer">
				<input type="text" onChange={this.setCountDown}>
				{counter}
			</div>
		);
	}
}

export default Timer;
