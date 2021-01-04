import React from 'react';
import { Col } from 'react-bootstrap';
import ArtistList from './ArtistList';
import TrackList from './TrackList';
import AlbumList from './AlbumList';

const SearchList = props => {

    return (
        props.results.tracks.length + props.results.artists.length + props.results.albums.length ? 
        <div className='search-results'>
            <Col><TrackList results={props.results.tracks} selectedPlaylist={props.selectedPlaylist} 
            setSelectedPlaylist={props.setSelectedPlaylist} setSearchQuery={props.setSearchQuery} /></Col>
            <Col><ArtistList results={props.results.artists} selectedPlaylist={props.selectedPlaylist} 
            setSelectedPlaylist={props.setSelectedPlaylist} setSearchQuery={props.setSearchQuery} /></Col>
            <Col><AlbumList results={props.results.albums} selectedPlaylist={props.selectedPlaylist} 
            setSelectedPlaylist={props.setSelectedPlaylist} setSearchQuery={props.setSearchQuery} /></Col>
        </div> : ""
    );
}

export default SearchList;