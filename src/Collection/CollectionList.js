import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ls from 'local-storage'

const CollectionList = props => {

    const [add, setAdd] = useState(false);
    const [collection, setCollection] = useState([]);
    const [playlistName, setName] = useState("");

    useEffect(() => {
        if(ls.get('collection')) {
            setCollection(ls.get('collection'));
        }
    },[]);

    useEffect(() => {
        ls.set('collection', collection);
    },[props.playlistChanged, collection]);
    
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
            props.setSelectedPlaylist(newPLaylist);
            props.setPlaylistChanged(true);
        }
    }

    function changePlaylist(newSelectionIndex) {
        props.setSelectedPlaylist(collection[newSelectionIndex]);
        props.setPlaylistChanged(true);
    }

    function deletePlaylist(index) {
        var newCollection = [];
        collection.forEach(playlist => {
            if (playlist.index !== index) {
                if (playlist.index > index) {
                    playlist.index -= 1;
                }
                newCollection.push(playlist);
            }
        });

        setCollection(newCollection);
        ls.set('collection', newCollection);
    }


    return (
        <div className='collection-section'>
            <h2>Your Collection</h2>
            <hr className='line-break'/>
            <div>
                {collection.map( (d) => 
                    <div key={d.index}>
                        <ContextMenuTrigger id={d.name+'-'+d.index}>
                            <p data-index={d.index} onClick={e => changePlaylist(e.target.dataset.index)}>{d.name}</p>
                        </ContextMenuTrigger>

                        <ContextMenu id={d.name+'-'+d.index}>
                            <MenuItem onClick={() => deletePlaylist(d.index)}>
                                Remove
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
                    <div className='collection-button'>
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