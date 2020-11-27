import './App.css';
import Dropdown from './Dropdown';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Credentials } from './Credentials';

function App() {

    const spotify = Credentials();
    const data = [
        {value: 1, name: 'A'},
        {value: 2, name: 'B'},
        {value: 3, name: 'C=A'}
    ]

    const [token, setToken] = useState('');

    useEffect(() => {
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
        .then(tokenReponse => {
            console.log(tokenReponse.data.access_token);
            setToken(tokenReponse.data.access_token);
        })
    }, [])

    return (
        <form onSubmit={() => {}}>
            <div className="App">
                <Dropdown options={data}/>
                <button type='submit'>Search</button>
            </div>
        </form>
        
    );
}

export default App;
