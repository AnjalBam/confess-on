import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiHandHeartFill, RiHandHeartLine } from 'react-icons/ri';
import PostIcon from '../PostIcon';
import useUser from 'hooks/useUser';
import { Cookies } from 'react-cookie';
import useQuery from 'hooks/useQuery';
import toast from 'react-hot-toast';

import PostsService from 'services/posts';
import Loader from 'components/Loader';

const Post: React.FC<{ post: any }> = ({ post }) => {
    const [isLiked, setIsLiked] = React.useState(false);
    const {} = useUser();
    const { dispatchRequest, isLoading } = useQuery();

    const postsService = new PostsService();

    const cookies = new Cookies();

    const userData = cookies.get('userData');

    React.useEffect(() => {
        if (post.likes.length > 0) {
            setIsLiked(post.likes.includes(userData.id));
        }
    });

    const toggleLikePost = async () => {
        if (isLiked) {
            const { data, error } = await dispatchRequest(
                postsService.unlikePost,
                post._id
            );
            if (error) {
                toast.error(
                    error?.response?.data?.message ||
                        error.message.toString() ||
                        error.toString()
                );
                return;
            }
            if (data.success) {
                setIsLiked(false);
                if (Array.isArray(post.likes)) {
                    post.likes.filter(
                        (id: string) => id.toString() !== userData.id.toString()
                    );
                }
            }
        } else {
            const { data: _data, error } = await dispatchRequest(
                postsService.likePost,
                post._id
            );
            if (error) {
                toast.error(
                    error?.response?.data?.message ||
                        error.message.toString() ||
                        error.toString()
                );
                return;
            }
            if (_data.success) {
                setIsLiked(true);
                if (Array.isArray(post.likes)) {
                    post.likes.push(userData.id);
                }
            }
        }
    };

    //https://bit.ly/3tBxaL3
    return (
        <div className="p-4 border-b-2 md:border-none shadowed mt-4 md:rounded-lg">
            <div
                id="post-header"
                className="flex items-center justify-start  pb-2">
                <div className="w-12 h-12 rounded-full">
                    <Image
                        src="https://bit.ly/3tBxaL3"
                        alt="profileImage"
                        height={64}
                        width={64}
                        className="rounded-full"
                    />
                </div>

                <div className="flex-1">
                    <div className="text-sm font-bold ml-2">
                        <Link href="#">
                            <a className="text-slate-800 font-title text-base">
                                {post.user?.fullName || 'Anonymous'}
                            </a>
                        </Link>
                        <p className="text-sm text-slate-400 font-normal">
                            {new Date(post.createdAt).toDateString()}
                        </p>
                    </div>
                </div>
            </div>
            <div id="post-details">
                <p className="text-slate-600 font-normal">{post.description}</p>
            </div>

            <div
                id="likes-count"
                className="text-sm mt-2 text-slate-500 font-title">
                <p>
                    {post?.likes?.length === 0
                        ? 'Show them you care about them.'
                        : `${post?.likes?.length} people care about this.`}
                </p>
            </div>

            <div
                id="action-bar"
                className="flex flex-1 items-center justify-between mt-2">
                <div>
                    <button
                        className="flex items-center flex-1"
                        onClick={() => toggleLikePost()}>
                        {isLoading && <Loader />}
                        {isLiked ? (
                            <PostIcon
                                iconText="Cared"
                                icon={RiHandHeartFill}
                                isActive={isLiked}
                            />
                        ) : (
                            <PostIcon
                                iconText="Care"
                                icon={RiHandHeartLine}
                                isActive={isLiked}
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
