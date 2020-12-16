import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = props => {

    return (
        <div>
            <Form.Group>
                <Form.Control placeholder="Search" value={props.search} onChange={e => props.setSearchQuery(e.target.value)}/>
            </Form.Group>
        </div>
    );
}

export default SearchBar;