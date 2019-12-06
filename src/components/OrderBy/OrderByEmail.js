import React from 'react';


class OrderByEmail extends React.Component {
//function Modal(props) {
	constructor(props){
		super(props);
		//this.state = {}
	}


	render(){
		return (
			<select name="order_by_email" id="order_by_email" className="form-control" onChange={this.props.handlerOrderByEmail}>
				<option value="">{this.props.default}</option>
				<option value="0">order by email ASC</option>
				<option value="1">order by email DESC</option>
			</select>
		);
	}
}


export default OrderByEmail;
