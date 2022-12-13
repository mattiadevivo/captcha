import { v4 as uuidv4 } from 'uuid';
import Captcha from '@haileybot/captcha-generator';

const create = async (): Promise<{ id: string; captcha: Captcha }> => {
    const uuid = uuidv4();
    const captcha = new Captcha();
    return { id: uuid, captcha };
};

const validate = async () => {};

export { create, validate };
