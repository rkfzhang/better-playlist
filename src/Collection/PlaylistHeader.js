import React from 'react';
import { Button } from 'react-bootstrap';

const PlaylistHeader = props => {

    function play() {
        props.setSongQueue(props.currentPlaylist);
    }

    return (
        <div>
            <h1>{props.selectedPlaylist.name}</h1>
            <Button onClick={() => play(props.selectedPlaylist)}>Play</Button>
        </div>
    );
}

export default PlaylistHeader;