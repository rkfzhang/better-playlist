import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const InactiveVolume = () => {


    return (
        <div className='player-volume'>
            <Slider defaultValue='100' step='10' disabled='false'/>
        </div>
    );
}

export default InactiveVolume;