import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const VolumeController = props => {
    
    function setVolume(vol) {
        props.setVolume(vol);
    }

    return (
        <div className='player-volume'>
            <Slider defaultValue='100' step='10' onChange={e => setVolume(e)}/>
        </div>
    );
}

export default VolumeController;