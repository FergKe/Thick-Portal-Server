export type ErrorRes = {
    ok: false;
    message: string;
    statusCode?: number;
    stack?: string;
};