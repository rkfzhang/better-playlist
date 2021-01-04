import './App.css';
import CollectionList from './Collection/CollectionList';
import React, { useState, useEffect } from 'react';
import Playlist from './Collection/Playlist';
import Login from './Login';
import { apiService } from './ApiService'
import InactivePlayer from './Play/InactivePlayer';
import PlayController from './Play/PlayController';

function App() {

    /////////////////////////////////////////////////////////////////////////////////////
    //CREDENTIAS
    const [token, setToken] = useState('');

    useEffect(() => {
        const retrievedToken = apiService.getToken(window.location.hash);
        setToken(retrievedToken);
    }, []);


    /////////////////////////////////////////////////////////////////////////////////////
    //PLAYLIST

    const [selectedPlaylist, setSelectedPlaylist] = useState();

    /////////////////////////////////////////////////////////////////////////////////////
    //PAGE
    return ( 
        <div className="App">
            {token ?
                <div className="App-Main">
                    <CollectionList setSelectedPlaylist={setSelectedPlaylist}/>
                    <Playlist selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} token={token}/>
                </div>
                : <Login authorizeUrl={apiService.authorize()}/>
            }
            {token ? 
                <PlayController token={token} /> 
                : <InactivePlayer />
            }
        </div>  
    );
}

export default App;
