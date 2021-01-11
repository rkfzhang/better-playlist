
import React from 'react';

const Artist = props => {

    function getGenres() {
        return props.artist.genres ? props.artist.genres[0] : "";
    }

    return (
        <div className='playlist-artist'>
            <div>{props.artist.name}</div>
            <div>{getGenres()}</div>
        </div>
    );
}

export default Artist;