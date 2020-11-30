import React from 'react';
import { FormControl } from 'react-bootstrap';
import TrackList from './TrackList';

const Dropdown = props => {

    return (
        <div>
            <FormControl size="lg" type="text" placeholder="Search" value={props.search} onChange={e => props.setSearchQuery(e.target.value)}/>
            <TrackList results={props.result.tracks} />
        </div>
    );
}

export default Dropdown;