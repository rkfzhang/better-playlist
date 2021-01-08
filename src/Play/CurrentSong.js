import React from 'react';

const CurrentSong = props => {

    function getArtists() {
        if (props.currentlyPlayed) {
            var artists = props.currentlyPlayed.artists.map( a => a.name);
        }

        return artists.join(', ');
    }

    return (props.currentlyPlayed ?
        <div className='search-name'>
            <p>{props.currentlyPlayed.name}</p>
            <p>{getArtists()}</p>
        </div>
        : ""
    );
}

export default CurrentSong;