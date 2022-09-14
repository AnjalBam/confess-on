import React from 'react';

const useQuery = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatchRequest = React.useCallback(
        async (
            dispatcher: (payload?: any) => Promise<any>,
            payload?: any
        ): Promise<{
            data: any;
            error: any;
        }> => {
            setIsLoading(true);
            try {
                const data = await dispatcher(payload);
                if (data) {
                    setIsLoading(false);
                    return { data, error: null };
                }
                setIsLoading(false);
            } catch (e) {
                if (e) {
                    setIsLoading(false);
                    return { data: null, error: e };
                }
                setIsLoading(false);
            }
            return { data: null, error: null };
        },
        []
    );

    return {
        isLoading,
        dispatchRequest,
    };
};

export default useQuery;
