import { v4 as uuidv4 } from 'uuid';
import Captcha from '@haileybot/captcha-generator';

const createCaptcha = async (
    storeCaptcha: (key: string, value: string) => Promise<string | null>
): Promise<{ id: string; captchaImage: string }> => {
    const uuid = uuidv4();
    const captcha = new Captcha();
    await storeCaptcha(uuid, captcha.value);
    return { id: uuid, captchaImage: captcha.dataURL };
};

const validateCaptcha = async (
    getCaptcha: (id: string) => Promise<string | null>,
    id: string,
    value: string
): Promise<boolean> => {
    const captchaValue = await getCaptcha(id);
    return captchaValue === value;
};

export { createCaptcha, validateCaptcha };
