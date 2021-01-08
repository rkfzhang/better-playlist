import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";


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

    function deletePlaylist(index) {
        var newCollection = [];
        collection.forEach(playlist => {
            if (playlist.index != index) {
                if (playlist.index > index) {
                    playlist.index -= 1;
                }
                newCollection.push(playlist);
            }
        });

        setCollection(newCollection);
        console.log(collection);
    }


    return (
        <div className='collection-section'>
            <h2>Your Collection</h2>
            <div>
                {collection.map( (d) => 
                    <div key={d.index}>
                        <ContextMenuTrigger id={d.name+'-'+d.index}>
                            <p data-index={d.index} onClick={e => changePlaylist(e.target.dataset.index)}>{d.name}</p>
                        </ContextMenuTrigger>

                        <ContextMenu id={d.name+'-'+d.index}>
                            <MenuItem onClick={() => deletePlaylist(d.index)}>
                                Delete
                            </MenuItem>
                        </ContextMenu>
                    </div>
                )}
            </div>
            {add ? 
                <Alert>
                    <Form.Group>
                        <Form.Control value={playlistName} onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <div>
                        <Button onClick={addNewPlaylist}>Add</Button>
                        <Button onClick={() => {setAdd(!add); setName('');}}>Cancel</Button>
                    </div>
                </Alert> : ""
            }
            <Button onClick={() => {setAdd(!add)}}>Add Playlist</Button>
        </div>
    );
}

export default CollectionList;