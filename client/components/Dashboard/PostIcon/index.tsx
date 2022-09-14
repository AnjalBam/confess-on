import React from 'react';
import { PostIconType } from './PostIcon.types';

const PostIcon: React.FC<PostIconType> = ({
    icon: Icon,
    iconText,
    isActive,
}) => {
    return (
        <div
            className={`font-title text-sm font-bold flex items-center px-4 py-1 rounded-lg bg-hover-primary ${
                isActive ? 'color-primary' : ''
            }`}>
            <span className="mr-1 h-5 w-5">
                <Icon />
            </span>
            <span>{iconText}</span>
        </div>
    );
};

export default PostIcon;
