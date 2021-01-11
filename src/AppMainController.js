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

        setPlaylistChanged(false);
        getCurrentPlaylist();
    }, [playlistChanged, props.token, selectedPlaylist]);
    
    function playlistChosen() {
        return (selectedPlaylist !== undefined || selectedPlaylist);
    }


    /////////////////////////////////////////////////////////////////////////////////////
    //DELETE

    function removeTrack(index) {
        var newPlaylist = selectedPlaylist;
        var newTracks = newPlaylist.items.tracks;
        newTracks.splice(index,1);
        newPlaylist.items.tracks = newTracks;
        setSelectedPlaylist(newPlaylist);
        setPlaylistChanged(true);
    }

    function removeAlbum(index) {
        var newPlaylist = selectedPlaylist;
        var newAlbums = newPlaylist.items.albums;
        newAlbums.splice(index,1);
        newPlaylist.items.albums = newAlbums;
        setSelectedPlaylist(newPlaylist);
        setPlaylistChanged(true);
    }

    function removeArtist(index) {
        var newPlaylist = selectedPlaylist;
        var newArtists = newPlaylist.items.artists;
        newArtists.splice(index,1);
        newPlaylist.items.artists = newArtists;
        setSelectedPlaylist(newPlaylist);
        setPlaylistChanged(true);
    }
    

    return (
        <div className='App-Main'>
            <CollectionList setSelectedPlaylist={setSelectedPlaylist} playlistChanged={playlistChanged} setPlaylistChanged={setPlaylistChanged}/>
            <div className='playlist-section'>
                {playlistChosen() ?
                    <div>
                        <PlaylistHeader selectedPlaylist={selectedPlaylist} setSongQueue={props.setSongQueue} token={props.token} currentPlaylist={currentPlaylist}/>
                        <SearchController selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} token={props.token} 
                            setPlaylistChanged={setPlaylistChanged}/>
                        <PlaylistMain selectedPlaylist={selectedPlaylist} removeTrack={removeTrack} removeAlbum={removeAlbum} removeArtist={removeArtist} 
                            token={props.token} />
                    </div>
                    :
                    <div>
                        <h2 className='playlist-none'>No playlist selected</h2>
                    </div>
                }
            </div>
        </div>
    );
}

export default AppMainController;