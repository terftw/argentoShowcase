import next from "next";

import { DEV } from "./config";

const app = next({ dev: DEV });
const handle = app.getRequestHandler();

export { app, handle }