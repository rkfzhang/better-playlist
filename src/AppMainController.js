import React, { useState, useEffect } from 'react';
import CollectionList from './Collection/CollectionList';
import PlaylistHeader from './Collection/PlaylistHeader';
import PlaylistMain from './Collection/PlaylistMain';
import SearchController from './Search/SearchController';

const AppMainController = props => {

    /////////////////////////////////////////////////////////////////////////////////////
    //PLAYLIST

    const [selectedPlaylist, setSelectedPlaylist] = useState();
    const [playlistChanged, setPlaylistChanged] = useState(false);

    useEffect(() => {
        setPlaylistChanged(false);
    }, [playlistChanged]);
    
    function playlistChosen() {
        return (selectedPlaylist !== undefined || selectedPlaylist);
    }


    /////////////////////////////////////////////////////////////////////////////////////
    //SEARCH
    

    return (
        <div className='App-Main'>
            <CollectionList setSelectedPlaylist={setSelectedPlaylist} />
            <div className='playlist-section'>
                {playlistChosen() ?
                    <div>
                        <PlaylistHeader selectedPlaylist={selectedPlaylist} setSongQueue={props.setSongQueue} token={props.token}/>
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