import React from 'react';

const Track = props => {
    

    return (
        <div className='playlist-track'>
            <div>{props.track.name}</div>
        </div>
    );
}

export default Track;