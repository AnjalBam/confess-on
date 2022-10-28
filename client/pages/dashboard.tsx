import { useEffect, useState, useCallback } from 'react';
import type { NextPage } from 'next';

import DashboardContent from 'components/Dashboard';
import IsLoggedIn from 'components/IsLoggedIn';
import useQuery from 'hooks/useQuery';
import PostsService from 'services/posts';
import toast from 'react-hot-toast';
import { PostData, ResponseType } from 'services/services.types';
import UserService from 'services/users';
import ProfileSection from 'components/Dashboard/ProfileSection';

const Dashboard: NextPage = () => {
    const { isLoading, dispatchRequest } = useQuery();
    const [data, setData] = useState<ResponseType[]>([]);
    const [userData, setUserData] = useState<ResponseType>();

    const [refetch, setRefetch] = useState(false);

    const postService = new PostsService();
    const userService = new UserService();

    const fetchGetData = useCallback(async () => {
        const { data, error } = await dispatchRequest(postService.getPosts);
        if (error) {
            toast.error(error.message || error.toString());
        }
        if (data?.success) {
            setData(data.data);
            toast.success(data.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserDetails = useCallback(async () => {
        const { data, error } = await dispatchRequest(
            userService.getUserDetails,
            '633a649dd421c44c4d154efe'
        );
        if (error) {
            toast.error(error.message || error.toString(), { icon: '🤯' });
        }
        if (data?.success) {
            setUserData(data);
        }
    }, [dispatchRequest, userService.getUserDetails]);

    useEffect(() => {
        fetchGetData();
        fetchUserDetails();
    }, [fetchGetData, fetchUserDetails]);

    const {
        isLoading: isPostAddLoading,
        dispatchRequest: dispatchPostAddRequest,
    } = useQuery();

    const addPost = async (post: PostData) => {
        const { data, error } = await dispatchPostAddRequest(
            postService.addPost,
            post
        );
        if (error) {
            toast.error(error.message || error.toString());
            return;
        }

        toast.success(data.message);
        setRefetch(refetch => !refetch);
    };

    return (
        <>
            <IsLoggedIn />
            <div className="md:container mx-auto">
                <div className="grid grid-flow-row grid-cols-4 gap-2">
                    <div className="hidden md:block">
                        <ProfileSection />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                        <DashboardContent
                            isLoading={isLoading}
                            addPost={addPost}
                            isPostAddLoading={isPostAddLoading}
                            posts={data}
                        />
                    </div>
                    <div className="hidden md:block">
                        <h2>Recommended for you</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
