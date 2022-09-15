import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { AuthContextState } from './auth-context.types';

export const AuthContext = React.createContext<AuthContextState>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

const cookies = new Cookies();

const AuthContextProvider: React.FC<any> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState<null | boolean>(null);
    useEffect(() => {
        const token = cookies.get('token');
        token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, []);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
