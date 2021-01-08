import React, { useEffect, useState } from 'react';
import { apiService } from '../ApiService'

const PlayController = props => {


    /////////////////////////////////////////////////////////////////////////////////////
    //PLAYER SETUP
    const [deviceId, setDeviceId] = useState("");

    useEffect(() => {
        const playerScript = document.createElement("script");
        playerScript.src = "https://sdk.scdn.co/spotify-player.js";
        playerScript.async = true;
        document.body.appendChild(playerScript);
    },[]);

    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
            name: "BetterPlaylist Player",
            getOAuthToken: cb => {cb(props.token)}
        });

        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            setDeviceId(device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
    };

    /////////////////////////////////////////////////////////////////////////////////////
    //PLAYER CONTROLS
    const [isPLaying, setIsPLaying] = useState(false);

    function setPlaying() {
        apiService.playerTogglePlayPause(isPLaying,props.token);
        if (isPLaying) {
            setIsPLaying(false);
        }
        else {
            setIsPLaying(true);
        }
    };

    useEffect(() => {
        console.log(props.songQueue);
        apiService.playerStart(props.songQueue,deviceId,props.token);
        setIsPLaying(true);
    }, [props.songQueue]);

    return (
        <div className='player'>
            <div onClick={() => setPlaying()}>{isPLaying ? 'PAUSE' : 'PLAY'}</div>
        </div>
    );
}

export default PlayController;