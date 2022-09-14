import { PostData } from 'services/services.types';

export type AddPostProps = {
    addPost: (postData: PostData) => void;
    isAddPostLoading: boolean;
};
