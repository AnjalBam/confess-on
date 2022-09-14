export type AuthContextState = {
    isLoggedIn: boolean | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};
