import React from 'react';
import { Link } from 'react-router-dom'

const UserCardEdit = props => {

	console.log(props.index);

    return (
    	<Link to={'/useredit/' + props.index}>
			<button className="btn btn-success float-right user-card-edit">
				<span className="fa fa-edit"></span>
			</button>
		</Link>
    );
}

export default UserCardEdit;