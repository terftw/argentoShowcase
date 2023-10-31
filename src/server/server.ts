import 'dotenv/config'
import { PORT, DEV } from './config';
import { buildApp } from './express';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    try {
        const app = await buildApp();
        app.listen(PORT, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${PORT}. Dev: ${DEV}`);
        });

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
