import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "components/Loader";

function LoadingOnRouteChange() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => {
            console.log("routing started");
            url !== router.asPath ? setLoading(true) : setLoading(false);
        };
        const handleComplete = (url: string) => {
            console.log("routing complete");
            url === router.asPath ? setLoading(false) : setLoading(true);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, []);

    if (loading) {
        console.log('loading', loading)
        return <></>;
    }

    return <Loader />;
}

export default LoadingOnRouteChange;
