import React from "react";
import { Cookies } from "react-cookie";

const useUser = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState("");

    const cookies = new Cookies();

    React.useEffect(() => {
        const t = cookies.get("token");

        if (t) {
            setIsLoggedIn(true);
            setToken(t);
        }
    }, []);

    return { isLoggedIn, token };
};

export default useUser;
