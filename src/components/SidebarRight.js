import React from 'react';
import UserCardFavoriteRead from './UserCardFavoriteRead'


const SidebarRight = props => {
  return (
    <aside className="col-md-4 col-lg-4 sidebar" id={props.id} name={props.id}>
    {props.userFavoriteCount}
		<UserCardFavoriteRead count={props.count} />
    </aside>
  );
}

export default SidebarRight;
