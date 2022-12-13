import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { create, validate } from '../services/captchaService';

const captchaRouter = express.Router();

captchaRouter.use(bodyParser.json());
captchaRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newTodo = await create();

        res.json(newTodo);
    } catch (err) {
        res.status(500).send('error'); // TODO
    }
});
captchaRouter.put('/:captchaId', async (req: Request, res: Response) => {
    
    try {
        const isValid = await validate();
    } catch (err) {
        res.status(500).send('error'); // TODO
    }
})

export { captchaRouter };
