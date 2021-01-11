import React, { useEffect, useState, Button } from 'react';
import { apiService } from '../ApiService'
import CurrentSong from './CurrentSong';
import VolumeController from './VolumeController';
import { PlayerIcon } from 'react-player-controls'

const PlayController = props => {


    /////////////////////////////////////////////////////////////////////////////////////
    //PLAYER SETUP

    const [deviceId, setDeviceId] = useState(); 

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
        player.addListener('player_state_changed', state => {
            console.log(state);
            if (state !== null) {
                setIsPLaying(!state.paused);
                setCurrentlyPlayed(state.track_window.current_track);
            }
         });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            apiService.playerSelectDevice(device_id,props.token);
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
    const [currentlyPlayed, setCurrentlyPlayed] = useState('');
    const [volume, setVolume] = useState(100);

    function setPlaying() {
        apiService.playerTogglePlayPause(isPLaying,props.token);
    };

    function previous() {
        apiService.playerPrevious(props.token);
    }

    function next() {
        apiService.playerNext(props.token);
    }

    useEffect(() => {
        if (props.songQueue !== []) {
            apiService.playerStop(props.token);
        }
        apiService.playerStart(props.songQueue,deviceId,props.token)
    }, [props.songQueue]);

    useEffect(() => {
        apiService.playerVolume(volume, props.token);
    }, [volume]);

    return (
        <div className='player'>
            <CurrentSong currentlyPlayed={currentlyPlayed} />
            <div className='player-buttons'>
                <PlayerIcon.Previous width={32} height={32} onClick={() => previous()}/>
                {isPLaying ? 
                    <PlayerIcon.Pause width={32} height={32} onClick={() => setPlaying()}/> : 
                    <PlayerIcon.Play width={32} height={32} onClick={() => setPlaying()}/>
                }
                <PlayerIcon.Next width={32} height={32} onClick={() => next()}/>
            </div>
            <VolumeController setVolume={setVolume}/>
        </div>
    );
}

export default PlayController;