import React from 'react';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';

const TrackList = props => {
 
    var tracks = JSON.parse(props.results);

    return tracks.length ?
        (<div>
            <h1>Tracks</h1>
            <ListGroup>
                {tracks.map( (t) => 
                <div>
                    <ListGroupItem>
                        <div className='search-container'>
                            <Image src={t.album.images[2].url}></Image>
                            <div className='search-name'> 
                                <h2>{t.name}</h2>
                                <p>{t.artists[0].name}</p>
                            </div>
                        </div>
                    </ListGroupItem>
                </div>)}
            </ListGroup>
        </div>) : "";
}

export default TrackList;