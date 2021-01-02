import axios from 'axios';

class ApiService {

    authorize() {
        const client_id = '012ed053ecba4a58874cb8a2e753225a';
        const redirect_uri = 'http://localhost:3000/';
        const scopes = [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "streaming", 
            "user-read-email", 
            "user-read-private"
        ];
        const authorizeEndpoint = 'https://accounts.spotify.com/authorize';

        const authorizeLink = `${authorizeEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`;

        return authorizeLink
    }

    getToken(url) {
        const urlComponets = url.substring(1).split("&");
        let token = '';
        urlComponets.forEach( c => {
            if (c.startsWith('access_token')) token = c.substring(13);
        });
        return token;
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