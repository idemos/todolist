import React from 'react';


const UserCardDel = props => {

	console.log(props.index);

    return (
		<button className="btn btn-danger float-right user-card-del" onClick={(e) => props.deleteUser(e, props.index)}>
			<span className="fa fa-minus"></span>
		</button>
    );
}

export default UserCardDel;