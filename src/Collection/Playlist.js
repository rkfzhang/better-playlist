import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistMain from './PlaylistMain';
import SearchController from '../Search/SearchController';

const Playlist = props => {

    /////////////////////////////////////////////////////////////////////////////////////
    //SEARCH

    return (
        <div className='playlist-section'>
            {(props.selectedPlaylist !== undefined || props.selectedPlaylist) ?
                <div>
                    <PlaylistHeader playlist={props.selectedPlaylist} />
                    <SearchController selectedPlaylist={props.selectedPlaylist} setSelectedPlaylist={props.setSelectedPlaylist} token={props.token}/>
                    <PlaylistMain playlist={props.selectedPlaylist} />
                </div>
                :
                <div>
                    <h2>No playlist selected</h2>
                </div>
            }
        </div>
    );
}

export default Playlist;