import React from 'react';

const PlaylistMain = props => {

    return (
        <div>
            {props.playlist.items.tracks.length ? <h3>Songs</h3> : ""}
            {props.playlist.items.tracks.map(
                d => <div>{d.name}</div>
            )}
            {props.playlist.items.albums.length ? <h3>Albums</h3> : ""}
            {props.playlist.items.albums.map(
                d => <div>{d.name}</div>
            )}
            {props.playlist.items.artists.length ? <h3>Artists</h3> : ""}
            {props.playlist.items.artists.map(
                d => <div>{d.name}</div>
            )}
            {
               props.playlist.items.tracks.length + props.playlist.items.albums.length + props.playlist.items.artists.length ?
               " " : <h3>There's nothing in here</h3> 
            }
        </div>
    );
}

export default PlaylistMain;