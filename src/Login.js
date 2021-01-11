import React from 'react';
import { Image , Button } from 'react-bootstrap';
import SpotifyLogo from './images/spotify-logo.jpg'

const Login = props => {

    return (
        <div className='login'>
            <Image src={SpotifyLogo} />
            <a className='login-button' href={props.authorizeUrl}><Button variant='outline-success'>Login to Spotify</Button></a>
        </div>
    );
}

export default Login;