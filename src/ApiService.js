import axios from 'axios';

class ApiService {
    getToken(spotify,setToken) {
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
        });
    }

    getSearchResults(searchQuery, token, setSearchResult) {
        const resultLimit = 5;
        const resultType = 'artist,album,track';

        if (searchQuery.length > 2) {
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
                setSearchResult({
                    tracks: "[]",
                    albums: "[]",
                    artists: "[]"
                });
            });
        }
        setSearchResult({
            tracks: "[]",
            albums: "[]",
            artists: "[]"
        });
    }
}
export const apiService = new ApiService();