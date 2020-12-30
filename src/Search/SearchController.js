import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import { apiService } from '../ApiService'

const SearchController = props => {

    /////////////////////////////////////////////////////////////////////////////////////
    //SEARCH
    const[searchQuery, setSearchQuery] = useState('');
    const[searchResult, setSearchResult] = useState({ tracks: [], albums: [], artists: [] });

    const getSearchResults = () => {
        const returnedSearchResults = apiService.getSearchResults(searchQuery,props.token,setSearchResult);
        return returnedSearchResults;
    }
    useEffect(() => {
        setSearchResult(getSearchResults());
    }, [searchQuery]);
    
    

    return (
        <div className='search-section'>
            <SearchBar search={searchQuery} result={searchResult} setSearchQuery={setSearchQuery}/>
            { searchResult ? 
                <SearchList results={searchResult} selectedPlaylist={props.selectedPlaylist} 
                setSelectedPlaylist={props.setSelectedPlaylist} setSearchQuery={setSearchQuery}/>
                : ""
            }
        </div>
    );
}

export default SearchController;