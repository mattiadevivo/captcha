import { Express } from 'express';
import { captchaRouter } from './captchaRouter';

const registerRoutes = (app: Express) => {
    app.use('/captchas', captchaRouter);
};
export { registerRoutes };
