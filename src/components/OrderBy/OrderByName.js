import React from 'react';


class OrderByName extends React.Component {
//function Modal(props) {
	constructor(props){
		super(props);
		//this.state = {}
	}


	render(){
		return (
			<select name="order_by_name" id="order_by_name" className="form-control" onChange={this.props.handlerOrderByName}>
				<option value="">{this.props.default}</option>
				<option value="0">order by name ASC</option>
				<option value="1">order by name DESC</option>
			</select>
		);
	}
}


export default OrderByName;
