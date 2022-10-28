import Loader from 'components/Loader';
import { userContext } from 'context/user-context';
import { useContext } from 'react';

const ProfileSection = () => {
    const { user, isLoading } = useContext(userContext);

    const getProfileSection = () => {
        return (
            <>
                <h1 className="font-title text-lg font-bold">
                    {user.fullName}
                </h1>
                <h1 className="font-title text-sm font-bold text-slate-500">
                    {user.username}
                </h1>
                <p className='mt-4 font-bold text-slate-500'>{user.bio}</p>
            </>
        );
    };

    function getLoading() {
        return (
            <div className="mx-auto flex justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-4 py-14 shadowed rounded-lg md:mt-4 text-center">
            {!isLoading ? getProfileSection() : getLoading()}
        </div>
    );
};

export default ProfileSection;
