import './App.css';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Credentials } from './Credentials';

function App() {

    const spotify = Credentials();
    const resultLimit = 10;
    const resultType = 'artist,album,track';
    const [token, setToken] = useState('');

    const[searchQuery, setSearchQuery] = useState('');
    const[searchResult, setSearchResult] = useState("[]");

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

    useEffect(() => {
        axios(`https://api.spotify.com/v1/search?q=${searchQuery}&limit=${resultLimit}&type=${resultType}`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
        .then(apiSearchResults => {
            setSearchResult(apiSearchResults.toString());
        })
    }, [searchQuery]) 

    return (
        <form onSubmit={() => {}}>
            <div className="App">
                <SearchBar search={searchQuery} result={searchResult} setSearchQuery={setSearchQuery}/>
            </div>
        </form>
        
    );
}

export default App;
