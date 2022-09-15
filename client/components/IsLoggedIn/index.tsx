import { routes } from 'constant';
import { AuthContext } from 'context/auth-context';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const IsLoggedIn = () => {
    const { isLoggedIn } = React.useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn === false) {
            router.push(routes.login + '?next=' + router.pathname);
        }
    }, [isLoggedIn]);
    return <></>;
};

export default IsLoggedIn;
