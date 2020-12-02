import './App.css';
import SearchBar from './Search/SearchBar'
import SearchList from './Search/SearchList'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Credentials } from './Credentials';

function App() {

    const spotify = Credentials();
    const resultLimit = 5;
    const resultType = 'artist,album,track';
    const [token, setToken] = useState('');

    const[searchQuery, setSearchQuery] = useState('');
    const[searchResult, setSearchResult] = useState(
        { tracks: "[]", albums: "[]", artists: "[]" });

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
            setSearchResult({
                tracks: JSON.stringify(apiSearchResults.data.tracks.items),
                albums: JSON.stringify(apiSearchResults.data.albums.items),
                artists: JSON.stringify(apiSearchResults.data.artists.items)
            });
        })
        .catch(function (error) {
            if (error != "No search query") {
                console.log(error.message);
            }
            setSearchResult({
                tracks: "[]",
                albums: "[]",
                artists: "[]"
            });
        })
    }, [searchQuery]) 

    return (
        <form onSubmit={() => {}}>
            <div className="App">
                <SearchBar search={searchQuery} result={searchResult} setSearchQuery={setSearchQuery}/>
                { searchResult.tracks.length + searchResult.artists.length + searchResult.albums.length ? <SearchList results={searchResult} /> : ""}
            </div>
        </form>
        
    );
}

export default App;
