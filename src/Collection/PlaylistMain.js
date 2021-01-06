import React from 'react';

const PlaylistMain = props => {

    return (
        <div>
            {props.selectedPlaylist.items.tracks.length ? <h3>Songs</h3> : ""}
            {props.selectedPlaylist.items.tracks.map(
                d => <div>{d.name}</div>
            )}
            {props.selectedPlaylist.items.albums.length ? <h3>Albums</h3> : ""}
            {props.selectedPlaylist.items.albums.map(
                d => <div>{d.name}</div>
            )}
            {props.selectedPlaylist.items.artists.length ? <h3>Artists</h3> : ""}
            {props.selectedPlaylist.items.artists.map(
                d => <div>{d.name}</div>
            )}
            {
               props.selectedPlaylist.items.tracks.length + props.selectedPlaylist.items.albums.length + props.selectedPlaylist.items.artists.length ?
               " " : <h3>There's nothing in here</h3> 
            }
        </div>
    );
}

export default PlaylistMain;