import React from 'react';
import IsLoggedIn from 'components/IsLoggedIn';

const AuthCheck = () => {
    return (
        <>
            <IsLoggedIn />
            <div>Welcome</div>
        </>
    );
};

export default AuthCheck;
