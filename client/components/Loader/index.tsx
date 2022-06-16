import { colors } from 'constant';
import React from 'react';
import { Puff } from 'react-loading-icons';

const Loader = () => {
    return (
        <div className="grid fixed top-0 bottom-0 right-0 left-0 bg-white w-full h-full place-items-center z-40">
            <div className='h-16 w-16'>
                <Puff
                    stroke={colors.primary}
                    speed={2}
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
};

export default Loader;
