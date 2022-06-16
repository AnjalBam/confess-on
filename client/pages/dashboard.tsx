import { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import DashboardContent from 'components/Dashboard';
import IsLoggedIn from 'components/IsLoggedIn';
import useQuery from 'hooks/useQuery';
import PostsService from 'services/posts';
import toast from 'react-hot-toast';

const Dashboard: NextPage = () => {
    const { isLoading, dispatchRequest } = useQuery();
    const [data, setData] = useState<ResponseType[]>([]);

    const postService = new PostsService();

    useEffect(() => {
        (async () => {
            const { data, error } = await dispatchRequest(postService.getPosts);
            if (error) {
                toast.error(error.message || error.toString());
            }
            if(data.success) {
                setData(data.data);
                toast.success(data.message);
            }
            
        })();
    }, []);

    return (
        <>
            <IsLoggedIn />
            <div className="md:container mx-auto">
                <div className="grid grid-flow-row grid-cols-4 gap-2">
                    <div className="hidden md:block">
                        <h2>ProfileSection</h2>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                        <DashboardContent isLoading={isLoading} posts={data} />
                    </div>
                    <div className="hidden md:block">
                        <h2>Recommended section</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
