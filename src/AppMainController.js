import React, { useState, useEffect } from 'react';
import CollectionList from './Collection/CollectionList';
import PlaylistHeader from './Collection/PlaylistHeader';
import PlaylistMain from './Collection/PlaylistMain';
import SearchController from './Search/SearchController';
import { apiService } from './ApiService'

const AppMainController = props => {

    /////////////////////////////////////////////////////////////////////////////////////
    //PLAYLIST

    const [selectedPlaylist, setSelectedPlaylist] = useState();
    const [playlistChanged, setPlaylistChanged] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState();

    useEffect(() => {
        setPlaylistChanged(false);
        getCurrentPlaylist();
    }, [playlistChanged]);
    
    function playlistChosen() {
        return (selectedPlaylist !== undefined || selectedPlaylist);
    }

    function getCurrentPlaylist() {
        if (selectedPlaylist){
            var songsUris = [];
            selectedPlaylist.items.tracks.forEach(track => {
                songsUris.push(track.uri);
            });
            selectedPlaylist.items.albums.forEach(album => {
                apiService.getAlbumTracks(album.id, props.token, songsUris);
            });
            selectedPlaylist.items.artists.forEach(artist => {
                apiService.getArtistTracks(artist.id, props.token, songsUris);
            });
            setCurrentPlaylist(songsUris);
        }
    }


    /////////////////////////////////////////////////////////////////////////////////////
    //SEARCH
    

    return (
        <div className='App-Main'>
            <CollectionList setSelectedPlaylist={setSelectedPlaylist} />
            <div className='playlist-section'>
                {playlistChosen() ?
                    <div>
                        <PlaylistHeader selectedPlaylist={selectedPlaylist} setSongQueue={props.setSongQueue} token={props.token} currentPlaylist={currentPlaylist}/>
                        <SearchController selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} token={props.token} 
                            setPlaylistChanged={setPlaylistChanged}/>
                        <PlaylistMain selectedPlaylist={selectedPlaylist} />
                    </div>
                    :
                    <div>
                        <h2>No playlist selected</h2>
                    </div>
                }
            </div>
        </div>
    );
}

export default AppMainController;