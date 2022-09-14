import React from 'react';
import { IconProps } from './Icons.types';

const Logo: React.FC<IconProps> = ({
    height = 40,
    width = 40,
    color = '#434343',
    className = '',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 49 79"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg">
            <rect
                x="21.0802"
                y="44.0669"
                width="19.7423"
                height="19.7423"
                transform="rotate(-45 21.0802 44.0669)"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.8998 9.02684L34.8998 0V78.9692L34.8998 78.8264L0 43.9266L34.8998 9.02684ZM13.2619 43.9266L34.8998 22.2888V65.5645L13.2619 43.9266Z"
                fill={color}
            />
        </svg>
    );
};

export default Logo;
