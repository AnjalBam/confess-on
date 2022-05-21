import createServer from '../../server';


export function init() {
    const app = createServer();
    return app;
}