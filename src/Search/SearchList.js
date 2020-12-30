import React from 'react';
import { Col } from 'react-bootstrap';
import ArtistList from './ArtistList';
import TrackList from './TrackList';
import AlbumList from './AlbumList';

const SearchList = props => {
    console.log(props.results);
    return (
        props.results.tracks.length + props.results.artists.length + props.results.albums.length ? 
        <div className='search-results'>
            <Col><TrackList results={props.results.tracks} playlist={props.selectedPlaylist} 
            setSelectedPlaylist={props.setSelectedPlaylist} setSearchQuery={props.setSearchQuery} /></Col>
            <Col><ArtistList results={props.results.artists} playlist={props.selectedPlaylist} 
            setSelectedPlaylist={props.setSelectedPlaylist} setSearchQuery={props.setSearchQuery} /></Col>
            <Col><AlbumList results={props.results.albums} playlist={props.selectedPlaylist} 
            setSelectedPlaylist={props.setSelectedPlaylist} setSearchQuery={props.setSearchQuery} /></Col>
        </div> : ""
    );
}

export default SearchList;