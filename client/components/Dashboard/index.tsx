import React from 'react';
import AddPost from './AddPost';
import Post from './Post';

const DashboardContent = () => {
    return (
        <>
            <div className='border-b-2 md:border-b-0'>
                <AddPost />
            </div>
            <div>
                {[1, 2, 3].map(i => {
                    return <Post key={i} />
                })}
            </div>
        </>
    );
};

export default DashboardContent;
