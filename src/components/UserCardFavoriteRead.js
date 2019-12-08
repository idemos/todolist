import React from 'react';
// import '../assets/css/UserCardRead.css';


const UserCardFavoriteRead = props => {

    return (
		<section className="user-card-favorite">
			Numero di Email preferite: {props.count}
		</section>
    );
}

export default UserCardFavoriteRead;