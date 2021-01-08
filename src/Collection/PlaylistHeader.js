import React from 'react';
import { Button } from 'react-bootstrap';
import { apiService } from '../ApiService'

const PlaylistHeader = props => {

    function play() {
        var songsUris = [];

        props.selectedPlaylist.items.tracks.forEach(track => {
            songsUris.push(track.uri);
        });

        props.selectedPlaylist.items.albums.forEach(album => {
            apiService.getAlbumTracks(album.id, props.token, songsUris);
        });

        props.selectedPlaylist.items.artists.forEach(artist => {
            apiService.getArtistTracks(artist.id, props.token, songsUris);
        });

        console.log(props.token);
        props.setSongQueue(songsUris);
    }

    return (
        <div>
            <h1>{props.selectedPlaylist.name}</h1>
            <Button onClick={() => play(props.selectedPlaylist)}>Play</Button>
        </div>
    );
}

export default PlaylistHeader;