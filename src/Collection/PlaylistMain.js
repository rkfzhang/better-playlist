import React from 'react';

const PlaylistMain = props => {

    return (
        <div>
            <h3>Songs</h3>
            {props.playlist.items.tracks.map(
                d => <div>{d.name}</div>
            )}
            <h3>Albums</h3>
            {props.playlist.items.albums.map(
                d => <div>{d.name}</div>
            )}
            <h3>Artists</h3>
            {props.playlist.items.artists.map(
                d => <div>{d.name}</div>
            )}
        </div>
    );
}

export default PlaylistMain;