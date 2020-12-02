import React from 'react';
import { Col } from 'react-bootstrap';
import ArtistList from './ArtistList';
import TrackList from './TrackList';
import AlbumList from './AlbumList';

const SearchList = props => {

    return (
        <div className='search-results'>
            <Col><TrackList results={props.results.tracks} /></Col>
            <Col><ArtistList results={props.results.artists} /></Col>
            <Col><AlbumList results={props.results.albums} /></Col>
        </div>
    );
}

export default SearchList;