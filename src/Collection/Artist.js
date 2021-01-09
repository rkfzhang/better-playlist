import React from 'react';

const Artist = props => {
    

    return (
        <div className='playlist-artist'>
            <div>{props.artist.name}</div>
        </div>
    );
}

export default Artist;