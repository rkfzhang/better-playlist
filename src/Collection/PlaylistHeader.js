import React from 'react';
import { Button } from 'react-bootstrap';

const PlaylistHeader = props => {

    function play() {
        const songsUris = [];
        props.selectedPlaylist.items.tracks.forEach(track => {
            songsUris.push(track.uri);
        });

        console.log(songsUris);
    }

    return (
        <div>
            <h1>{props.selectedPlaylist.name}</h1>
            <Button onClick={() => play(props.selectedPlaylist)}>Play</Button>
        </div>
    );
}

export default PlaylistHeader;