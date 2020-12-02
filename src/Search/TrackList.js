import React from 'react';
import {Image, Col, Row } from 'react-bootstrap';

const TrackList = props => {
 
    var tracks = JSON.parse(props.results);

    return tracks.length ?
        (<div>
            <h2>Tracks</h2>
                {tracks.map( (t) => 
                <Row>
                    <div className='search-container'>
                        <Image src={t.album.images.length ? t.album.images[t.album.images.length-1].url : ""} rounded />
                        <div className='search-name'> 
                            <h3>{t.name}</h3>
                            <p>{t.artists[0].name}</p>
                        </div>
                    </div>
                </Row>)}
        </div>) : "";
}

export default TrackList;
//onclick