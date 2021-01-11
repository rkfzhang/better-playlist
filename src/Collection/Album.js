import React from 'react';

const Album = props => {

    function getArtists() {
        var album = props.album.artists.map( a => a.name);

        return album.join(', ');
    }
    

    return (
        <div className='playlist-album'>
            <div>{props.album.name}</div>
            <div>{getArtists()}</div>
        </div>
    );
}

export default Album;