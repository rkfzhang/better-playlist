import React from 'react';
import {Image, Col, Row } from 'react-bootstrap';

const ArtistList = props => {
 
    var artists = JSON.parse(props.results);

    return artists.length ?
        (<div>
            <h2>Artists</h2>
                {artists.map( (a) => 
                <Row>
                    <div className='search-container'>
                        <Image className='artist-image' src={a.images.length ? a.images[a.images.length-1].url : ""}  roundedCircle/>
                        <div className='search-name'> 
                            <h3>{a.name}</h3>
                        </div>
                    </div>
                </Row>)}
        </div>) : "";
}

export default ArtistList;
//onclick