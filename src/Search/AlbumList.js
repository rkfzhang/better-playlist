import React from 'react';
import { Image, Row } from 'react-bootstrap';

const ArtistList = props => {
 
    var albums = JSON.parse(props.results);

    function addAlbum(album) {
        let playlist = props.selectedPlaylist;
        playlist.items.albums = [...playlist.items.albums, album];
        
        props.setSelectedPlaylist(playlist);
        props.setSearchQuery('');
        props.setPlaylistChanged(true);
    }

    return albums.length ?
        (<div>
            <h2>Albums</h2>
                {albums.map( (a) => 
                <Row>
                    <div className='search-container' onClick={e => addAlbum(a)}>
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