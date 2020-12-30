import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


const CollectionList = props => {

    const [add, setAdd] = useState(false);
    const [collection, setCollection] = useState([]);
    const [playlistName, setName] = useState("");
    
    function addNewPlaylist() {
        if (playlistName) {
            let newPLaylist = {
                name: playlistName,
                index: collection.length,
                items: {
                    tracks: [],
                    albums: [],
                    artists: [],
                }
            };
            setCollection([...collection, newPLaylist]);
            setAdd(false);
            setName("");
        }
    }

    function changePlaylist(newSelectionIndex) {
        props.setSelectedPlaylist(collection[newSelectionIndex]);
    }


    return (
        <div className='collection-section'>
            <h2>Your Collection</h2>
            <div>
                {collection.map( (d) => 
                    <p key={d.index} data-index={d.index} onClick={e => changePlaylist(e.target.dataset.index)}>{d.name + " " + d.index}</p>)
                }
            </div>
            {add ? 
                <Alert>
                    <Form.Group>
                        <Form.Control value={playlistName} onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Button onClick={addNewPlaylist}>Add</Button>
                </Alert> : ""
            }
            <Button onClick={() => {setAdd(!add)}}>Add Playlist</Button>
        </div>
    );
}

export default CollectionList;