import React from 'react';
import {Image, Row } from 'react-bootstrap';

const TrackList = props => {
 
    var tracks = JSON.parse(props.results);

    function addTrack(track) {
        let playlist = props.selectedPlaylist;
        playlist.items.tracks = [...playlist.items.tracks, track];
        
        props.setSelectedPlaylist(playlist);
        props.setSearchQuery('');
        props.setPlaylistChanged(true);
    }

    return tracks.length ?
        (<div>
            <h2>Tracks</h2>
                {tracks.map( (t) => 
                <Row key={t.id}>
                    <div className='search-container' onClick={e => addTrack(t)}>
                        {t.album.images.length ? <Image src={t.album.images[t.album.images.length-1].url} rounded /> : ""}
                        <div className='search-name'> 
                            <h3>{t.name}</h3>
                            <p>{t.artists[0].name}</p>
                        </div>
                    </div>
                </Row>)}
        </div>) : "";
}

export default TrackList;
//onclick