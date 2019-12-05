import React from 'react';

const SearchBar = props => {

	// console.log(props);

    return (
		<section>
			<input type="search" name="search"  className="form-control"
			onChange={props.searchText} 
			placeholder={props.placeholder}
			/>
		</section>
    );
}

export default SearchBar;