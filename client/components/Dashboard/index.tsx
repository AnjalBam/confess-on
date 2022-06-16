import IsLoggedIn from 'components/IsLoggedIn';
import React from 'react';
import AddPost from './AddPost';
import { DashboardContentProps } from './Dashboard.types';
import Post from './Post';

const DashboardContent: React.FC<DashboardContentProps> = ({
    posts = [],
    isLoading,
}) => {
    console.log({posts})
    return (
        <>
            <IsLoggedIn />
            <AddPost />
            {!isLoading ? (
                <>
                    <div className="border-b-2 md:border-b-0"></div>
                    <div>
                        {posts && posts.map((post) => {
                            return <Post key={post._id} post={post} />;
                        })}
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default DashboardContent;
