import { Express } from 'express';
import { Store } from '../persistence/store';
import { getCaptchaRouter } from './captchaRouter';

const registerRoutes = (app: Express, store: Store) => {
    app.use('/captchas', getCaptchaRouter(store));
};
export { registerRoutes };
