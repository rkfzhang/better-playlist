import axios from 'axios';

function authorizeLink() {
    const client_id = '012ed053ecba4a58874cb8a2e753225a';
    const redirect_uri = 'https://rkfzhang.github.io/better-playlist/';
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

function reauthorize(error) {
    if(error.response.data.error.message === "The access token expired") {
        window.location.href = authorizeLink();
    }
}

class ApiService {

    authorize() {
        return authorizeLink();
    }

    reauthorize(error) {
        if(error.message === "The access token expired") {
            window.location.href = this.authorize();
        }
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
                reauthorize(error);
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

    getAlbumTracks(albumId, token, songsUris) {
        axios(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
        .then(apiSearchResults => {
            apiSearchResults.data.items.forEach(track => {
                songsUris.push(track.uri);
            })
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }

    getArtistTracks(artistId, token, songsUris) {
        const resultType = 'album,single';
        const country = 'from_token';

        axios(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=${resultType}&country=${country}&limit=50`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
        .then(apiSearchResults => {
            apiSearchResults.data.items.forEach(album => {
                this.getAlbumTracks(album.id, token, songsUris);
            })
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }

    getArtistAlbums(artistId, token, albums) {
        const resultType = 'album,single';
        const country = 'from_token';

        axios(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=${resultType}&country=${country}&limit=50`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
        .then(apiSearchResults => {
            console.log(apiSearchResults);
            apiSearchResults.data.items.forEach(album => {
                albums.push(album);
            });
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }

    playerSelectDevice(deviceId, token) {
        axios(`https://api.spotify.com/v1/me/player`, {
            method: 'PUT',
            headers: {'Authorization' : 'Bearer ' + token},
            data: {'device_ids' :  [deviceId] }
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }

    playerTogglePlayPause(isPlaying,token) {
        if (isPlaying) {
            axios(`https://api.spotify.com/v1/me/player/pause`, {
                method: 'PUT',
                headers: {'Authorization' : 'Bearer ' + token}
            }).catch(function (error) {
                console.log(error);
                reauthorize(error);
            });
        }
        else {
            axios(`https://api.spotify.com/v1/me/player/play`, {
                method: 'PUT',
                headers: {'Authorization' : 'Bearer ' + token}
            }).catch(function (error) {
                console.log(error.response);
                reauthorize(error);
            });
        }
    }


    playerStop(token) {
        axios(`https://api.spotify.com/v1/me/player/pause`, {
            method: 'PUT',
            headers: {'Authorization' : 'Bearer ' + token}
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }

    playerStart(songQueue, deviceId, token) {
        if (songQueue !== []) {
            axios(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {'Authorization' : 'Bearer ' + token},
                data: {'uris' : songQueue}
            }).then(() => {
                this.playerShuffle(token);
            }).catch(function (error) {
                console.log(error);
                reauthorize(error);
            });
        }
    }

    playerShuffle(token) {
        axios(`https://api.spotify.com/v1/me/player/shuffle?state=true`, {
            method: 'PUT',
            headers: {'Authorization' : 'Bearer ' + token},
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }

    playerPrevious(token) {
        axios(`https://api.spotify.com/v1/me/player/previous`, {
            method: 'POST',
            headers: {'Authorization' : 'Bearer ' + token},
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }

    playerNext(token) {
        axios(`https://api.spotify.com/v1/me/player/next`, {
            method: 'POST',
            headers: {'Authorization' : 'Bearer ' + token},
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }

    playerVolume(volume, token) {
        axios(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {
            method: 'PUT',
            headers: {'Authorization' : 'Bearer ' + token},
        }).catch(function (error) {
            console.log(error);
            reauthorize(error);
        });
    }
}
export const apiService = new ApiService();