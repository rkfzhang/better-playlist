import React from 'react';
import { FormControl } from 'react-bootstrap';

const Dropdown = props => {

    return (
        <div>
            <FormControl size="lg" type="text" placeholder="Search" value={props.search} onChange={e => props.setSearchQuery(e.target.value)}/>
            <p>{props.result}</p>
        </div>
    );
}

export default Dropdown;