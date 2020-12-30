import React from 'react';
import { Button } from 'react-bootstrap';

const PlaylistHeader = props => {

    return (
        <div>
            <h1>{props.playlist.name}</h1>
            <Button>Play</Button>
        </div>
    );
}

export default PlaylistHeader;