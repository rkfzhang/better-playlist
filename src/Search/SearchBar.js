import React from 'react';
import { FormControl } from 'react-bootstrap';
import ArtistList from './ArtistList';
import TrackList from './TrackList';
import AlbumList from './AlbumList';
import SearchList from './SearchList';

const Dropdown = props => {

    return (
        <div>
            <FormControl size="lg" type="text" placeholder="Search" value={props.search} onChange={e => props.setSearchQuery(e.target.value)}/>
        </div>
    );
}

export default Dropdown;
//<TrackList results={props.result.tracks} />
//<ArtistList results={props.result.artists} />