import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiHandHeartFill, RiHandHeartLine } from 'react-icons/ri';
import PostIcon from '../PostIcon';

const Post = () => {
    const [isLiked, setIsLiked] = React.useState(false);
    //https://bit.ly/3tBxaL3
    return (
        <div className="p-4 border-b-2 md:border-none shadow-none md:shadow-lg mb-3 md:rounded-lg">
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
                                John Doe
                            </a>
                        </Link>
                        <p className="text-sm text-slate-400 font-normal">
                            {new Date().toDateString()}
                        </p>
                    </div>
                </div>
            </div>
            <div id="post-details">
                <p className="text-slate-600 font-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam, ea illo. Consectetur dolorem totam officia iste
                    corporis asperiores odit assumenda, molestias blanditiis
                    animi ullam, aliquam obcaecati, cum esse eveniet recusandae.
                </p>
            </div>

            <div id="likes-count" className='text-sm mt-2 text-slate-500 font-title'>
                <p>
                    {Math.floor(Math.random() * 100) + 1} people care about you.
                </p>
            </div>

            <div
                id="action-bar"
                className="flex flex-1 items-center justify-between mt-2">
                <div>
                    <button
                        className="flex items-center flex-1"
                        onClick={() => setIsLiked(val => !val)}>
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
