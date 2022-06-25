import IsLoggedIn from '../../components/IsLoggedIn';
import Loader from '../../components/Loader';
import React from 'react';
import AddPost from './AddPost';
import { DashboardContentProps } from './Dashboard.types';
import Post from './Post';

const DashboardContent: React.FC<DashboardContentProps> = ({
    posts = [],
    isLoading,
    addPost,
    isPostAddLoading,
}) => {
    return (
        <>
            <IsLoggedIn />
            <AddPost addPost={addPost} isAddPostLoading={isPostAddLoading} />
            {!isLoading ? (
                <>
                    <div className="border-b-2 md:border-b-0"></div>
                    <div>
                        {posts &&
                            posts.map(post => {
                                return <Post key={post._id} post={post} />;
                            })}
                    </div>
                </>
            ) : (
                <div className='flex justify-center mt-4'>
                    <Loader />
                </div>
            )}
        </>
    );
};

export default DashboardContent;
