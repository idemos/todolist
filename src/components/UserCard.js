import React from 'react';
import '../assets/css/UserCard.css';
import UserCardDel from './UserCardDel'
import UserCardEdit from './UserCardEdit'
import UserCardFavorite from './UserCardFavorite'


const UserCard = props => {

    return (
		<section className="user-card-item">
			<UserCardDel deleteUser={props.deleteUser} index={props.index} />
			<UserCardEdit index={props.index} />
			<UserCardFavorite index={props.index} addToFavorite={props.addToFavorite}/>
			{props.children}
		</section>
    );
}

export default UserCard;