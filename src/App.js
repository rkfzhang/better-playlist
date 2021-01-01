import './App.css';
import CollectionList from './Collection/CollectionList';
import React, { useState, useEffect } from 'react';
import Playlist from './Collection/Playlist';
import Login from './Login';
import { apiService } from './ApiService'

function App() {

    /////////////////////////////////////////////////////////////////////////////////////
    //CREDENTIAS
    const [token, setToken] = useState('');

    useEffect(() => {
        const retrievedToken = apiService.getToken(window.location.hash);
        setToken(retrievedToken);
    }, [])


    /////////////////////////////////////////////////////////////////////////////////////
    //PLAYLIST

    const [selectedPlaylist, setSelectedPlaylist] = useState();

    /////////////////////////////////////////////////////////////////////////////////////
    //PAGE
    return ( token ?
        <div className="App">
            <CollectionList setSelectedPlaylist={setSelectedPlaylist}/>
            <Playlist selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} token={token}/>
        </div>
        :
        <Login authorizeUrl={apiService.authorize()}/>
        
    );
}

export default App;
