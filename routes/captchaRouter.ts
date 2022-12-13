import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { createCaptcha, validateCaptcha } from '../services/captchaService';
import { Store } from '../persistence/store';

const getCaptchaRouter = (store: Store): Router => {
    const captchaRouter = express.Router();

    captchaRouter.use(bodyParser.json());
    captchaRouter.post('/', async (_req: Request, res: Response) => {
        try {
            const captcha = await createCaptcha(store.set);
            return res.status(200).json(captcha);
        } catch (err) {
            res.status(500).send({ error: 'error while creating captcha' });
        }
    });
    captchaRouter.put(
        '/:captchaId',
        async (
            req: Request<{ captchaId: string }, object, { captcha: string }>,
            res: Response
        ) => {
            try {
                const captchaId = req.params.captchaId;
                const userGuess = req.body.captcha;
                const isCorrect = await validateCaptcha(
                    store.get,
                    captchaId,
                    userGuess
                );
                return isCorrect
                    ? res.status(200).json()
                    : res.status(401).json({ error: 'captcha does not match' });
            } catch (err) {
                res.status(500).send({
                    error: 'error while validating captcha',
                });
            }
        }
    );
    return captchaRouter;
};

export { getCaptchaRouter };
