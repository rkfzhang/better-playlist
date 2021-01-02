import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistMain from './PlaylistMain';
import SearchController from '../Search/SearchController';
import PlayController from '../Play/PlayController';

const Playlist = props => {

    /////////////////////////////////////////////////////////////////////////////////////
    //SEARCH

    return (
        <div>
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
            <PlayController token={props.token} />
        </div>
    );
}

export default Playlist;