import React from 'react';
import {Image, Col, Row } from 'react-bootstrap';

const ArtistList = props => {
 
    var albums = JSON.parse(props.results);

    return albums.length ?
        (<div>
            <h2>Albums</h2>
                {albums.map( (a) => 
                <Row>
                    <div className='search-container'>
                        <Image src={a.images.length ? a.images[2].url : ""}  roundedCircle/>
                        <div className='search-name'> 
                            <h3>{a.name}</h3>
                            <p>{a.artists[0].name}</p>
                        </div>
                    </div>
                </Row>)}
        </div>) : "";
}

export default ArtistList;
//onclick