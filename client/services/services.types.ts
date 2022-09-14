export type ResponseType = {
    data: any;
    message: string;
    error: any;
    status: number | undefined;
    success: boolean;
};

export type PostData = {
    description: string;
    visibility: string;
};
