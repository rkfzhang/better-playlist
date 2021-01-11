import React from 'react';
import { Button } from 'react-bootstrap';

const PlaylistHeader = props => {

    function play() {
        if (props.currentPlaylist !== undefined){
            props.setSongQueue(props.currentPlaylist);
        }
    }

    return (
        <div className='playlist-header'>
            <h1>{props.selectedPlaylist.name}</h1>
            <Button onClick={() => play(props.selectedPlaylist)} variant="success" >Play</Button>
            <p><small>Please wait ~30s before hitting play to compile playlist</small></p>
        </div>
    );
}

export default PlaylistHeader;