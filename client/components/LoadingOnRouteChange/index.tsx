import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';

function LoadingOnRouteChange() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => {
            setLoading(true);
        };
        const handleComplete = (url: string) => {
            setLoading(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router.events]);

    if (!loading) {
        return <></>;
    }

    return (
        <div className="grid fixed top-0 bottom-0 right-0 left-0 bg-white w-full h-full place-items-center z-40">
            <Loader />
        </div>
    );
}

export default LoadingOnRouteChange;
