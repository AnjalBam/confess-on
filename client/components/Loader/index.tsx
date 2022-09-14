import { colors } from 'constant';
import React from 'react';
import { Puff } from 'react-loading-icons';

const Loader = () => {
    return (
        <div className="h-16 w-16">
            <Puff stroke={colors.primary} speed={2} width={100} height={100} />
        </div>
    );
};

export default Loader;
