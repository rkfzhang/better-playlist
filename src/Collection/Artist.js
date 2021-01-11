
import React, { useState, useEffect } from 'react';
import { apiService } from '../ApiService';

const Artist = props => {

    function getGenres() {
        return props.artist.genres ? props.artist.genres[0] : "";
    }

    return (
        <div className='playlist-artist'>
            <div>{props.artist.name}</div>
            <div>{getGenres()}</div>
        </div>
    );
}

export default Artist;