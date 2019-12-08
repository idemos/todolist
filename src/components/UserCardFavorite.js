import React from 'react';

const UserCardFavorite = props => {

	console.log(props.index);

    return (
		<button className="btn btn-warning float-right user-card-favorite" onClick={props.addToFavorite}>
			<span className="fa fa-star"></span>
		</button>
    );
}

export default UserCardFavorite;