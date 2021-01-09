import React from 'react';
import Album from './Album';
import Artist from './Artist';
import Track from './Track';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const PlaylistMain = props => {

    return (
        <div>
            {props.selectedPlaylist.items.tracks.length ? <h3>Songs</h3> : ""}
            {props.selectedPlaylist.items.tracks.map(
                (currentValue, index) => 
                <div>
                    <ContextMenuTrigger id={currentValue.name + '-' + index}>
                        <Track track={currentValue}/>
                    </ContextMenuTrigger>

                    <ContextMenu id={currentValue.name + '-' + index}>
                        <MenuItem onClick={() => props.removeTrack(index)}>
                            Remove
                        </MenuItem>
                    </ContextMenu>
                </div>
            )}
            {props.selectedPlaylist.items.albums.length ? <h3>Albums</h3> : ""}
            {props.selectedPlaylist.items.albums.map(
                (currentValue, index) => 
                <div>
                    <ContextMenuTrigger id={currentValue.name + '-' + index}>
                        <Album album={currentValue}/>
                    </ContextMenuTrigger>

                    <ContextMenu id={currentValue.name + '-' + index}>
                        <MenuItem onClick={() => props.removeAlbum(index)}>
                            Remove
                        </MenuItem>
                    </ContextMenu>
                </div>
            )}
            {props.selectedPlaylist.items.artists.length ? <h3>Artists</h3> : ""}
            {props.selectedPlaylist.items.artists.map(
                (currentValue, index) => 
                <div>
                    <ContextMenuTrigger id={currentValue.name + '-' + index}>
                        <Artist artist={currentValue}/>
                    </ContextMenuTrigger>

                    <ContextMenu id={currentValue.name + '-' + index}>
                        <MenuItem onClick={() => props.removeArtist(index)}>
                            Remove
                        </MenuItem>
                    </ContextMenu>
                </div>
            )}
            {
               props.selectedPlaylist.items.tracks.length + props.selectedPlaylist.items.albums.length + props.selectedPlaylist.items.artists.length ?
               " " : <h3>There's nothing in here</h3> 
            }
        </div>
    );
}

export default PlaylistMain;