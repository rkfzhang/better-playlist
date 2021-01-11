import React from 'react';
import InactiveVolume from './InactiveVolume';
import { PlayerIcon } from 'react-player-controls'

const InactivePlayer = () => {



    return (
        <div className='player'>
            <div></div>
            <div className='player-buttons'>
                <PlayerIcon.Previous width={32} height={32}/>
                <PlayerIcon.Play width={32} height={32}/>
                <PlayerIcon.Next width={32} height={32}/>
            </div>
            <InactiveVolume />
        </div>
    );
}

export default InactivePlayer;