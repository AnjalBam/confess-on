import { PostData } from 'services/services.types';

export type DashboardContentProps = {
    className?: string;
    posts: any[];
    isLoading: boolean;
    addPost: (postData: PostData) => void;
    isPostAddLoading: boolean;
};
