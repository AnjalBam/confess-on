import useUser from 'hooks/useUser';
import { createContext, useState, useEffect, FC } from 'react';
import UserService from '../services/users';

type UserContextType = {
    user: any;
    isLoading: boolean;
};

export const userContext = createContext<UserContextType>({
    user: {},
    isLoading: false,
});

const userService = new UserService();

const UserContextProvider: FC<any> = ({ children }) => {
    const [user, setUser] = useState<UserContextType>({
        user: {},
        isLoading: false,
    });
    const { isLoggedIn } = useUser();

    useEffect(() => {
        (async () => {
            if (isLoggedIn) {
                try {
                    setUser(prevState => {
                        return {
                            ...prevState,
                            isLoading: true,
                        };
                    });
                    const u = await userService.getMyDetails();
                    if (u.data) {
                        setUser(prevState => ({
                            ...prevState,
                            user: u.data || {},
                            isLoading: false,
                        }));
                    } else {
                        setUser(prevState => ({
                            ...prevState,
                            user: {},
                        }));
                    }
                } catch (err: unknown) {
                    setUser(prevState => {
                        return {
                            ...prevState,
                            isLoading: false,
                        };
                    });
                }
            }
        })();
    }, [isLoggedIn]);

    return (
        <userContext.Provider
            value={user}>
            {children}
        </userContext.Provider>
    );
};

export default UserContextProvider;
