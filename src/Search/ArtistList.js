import React from 'react';
import {Image, Row } from 'react-bootstrap';

const ArtistList = props => {
 
    var artists = JSON.parse(props.results);

    function addArtists(artist) {
        let playlist = props.playlist;
        playlist.items.artists = [...playlist.items.artists, artist];
        
        props.setSelectedPlaylist(playlist);
        props.setSearchQuery('');
    }

    return artists.length ?
        (<div>
            <h2>Artists</h2>
                {artists.map( (a) => 
                <Row>
                    <div className='search-container' onClick={e => addArtists(a)}>
                        {a.images.length ? <Image className='artist-image' src={a.images[a.images.length-1].url} /> : "" }
                        <div className='search-name'> 
                            <h3>{a.name}</h3>
                        </div>
                    </div>
                </Row>)}
        </div>) : "";
}

export default ArtistList;
//onclick