import React from 'react';
import AddPost from './AddPost';

const DashboardContent = () => {
    return (
        <>
            <div className='border-b-2 md:border-b-0'>
                <AddPost />
            </div>
            <div>
                <div>postList</div>
            </div>
        </>
    );
};

export default DashboardContent;
