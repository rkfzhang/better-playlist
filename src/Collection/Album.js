import React from 'react';

const Album = props => {
    

    return (
        <div className='playlist-album'>
            <div>{props.album.name}</div>
        </div>
    );
}

export default Album;