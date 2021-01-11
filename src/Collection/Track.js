import React from 'react';

const Track = props => {
    

    function getArtists() {
        var artists = props.track.artists.map( a => a.name);

        return artists.join(', ');
    }

    return (
        <div className='playlist-track'>
            <div>{props.track.name}</div>
            <div>{getArtists()}</div>
            <div>{props.track.album.name}</div>
        </div>
    );
}

export default Track;