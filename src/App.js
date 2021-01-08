import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import { apiService } from './ApiService'
import InactivePlayer from './Play/InactivePlayer';
import PlayController from './Play/PlayController';
import AppMainController from './AppMainController';

function App() {

    /////////////////////////////////////////////////////////////////////////////////////
    //CREDENTIAS
    const [token, setToken] = useState('');

    useEffect(() => {
        const retrievedToken = apiService.getToken(window.location.hash);
        setToken(retrievedToken);
    }, []);

    /////////////////////////////////////////////////////////////////////////////////////
    //QUEUE
    const [songQueue, setSongQueue] = useState([]);

    /////////////////////////////////////////////////////////////////////////////////////
    //PAGE
    return ( 
        <div className="App">
            {token ?
                <AppMainController token={token} setSongQueue={setSongQueue}/>
                : <Login authorizeUrl={apiService.authorize()}/>
            }
            {token ? 
                <PlayController token={token} songQueue={songQueue} /> 
                : <InactivePlayer />
            }
        </div>  
    );
}

export default App;
