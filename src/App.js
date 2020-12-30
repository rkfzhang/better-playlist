import './App.css';
import CollectionList from './Collection/CollectionList';
import React, { useState, useEffect } from 'react';
import { Credentials } from './Credentials';
import Playlist from './Collection/Playlist';
import { Button } from 'react-bootstrap';
import { apiService } from './ApiService'

function App() {

    /////////////////////////////////////////////////////////////////////////////////////
    //CREDENTIAS
    const spotify = Credentials();
    const [token, setToken] = useState('');

    const getToken = async () => {
        const returnedToken = apiService.getToken(spotify,setToken);
        return returnedToken;
    }

    useEffect(() => {
        getToken();
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
        <Button className="App">Authorize</Button>
        
    );
}

export default App;
