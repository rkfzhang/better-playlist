import React from 'react';
import { Image, Row } from 'react-bootstrap';

const ArtistList = props => {
 
    var albums = JSON.parse(props.results);

    return albums.length ?
        (<div>
            <h2>Albums</h2>
                {albums.map( (a) => 
                <Row>
                    <div className='search-container'>
                        {a.images.length ?<Image src={a.images[2].url}  roundedCircle/> : ""}
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