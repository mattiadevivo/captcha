/* eslint-disable @typescript-eslint/no-unused-vars */
import { assert } from 'chai';
import { createCaptcha, validateCaptcha } from '../services/captchaService';

const storeCaptchaMock = async (
    key: string,
    value: string
): Promise<string | null> => {
    return 'OK';
};

describe('captchaService', function () {
    it('createCaptcha() should return object with this form: {id: string, captchaImage: string}', async function () {
        const result = await createCaptcha(storeCaptchaMock);
        assert.hasAllKeys(result, { id: '', captchaImage: '' });
    });
    it('validateCaptcha() should correctly validate captchas', async function () {
        // TODO
    });
    it('validateCaptcha() should return false for unexisting captcha id', async function () {
        const isValid = await validateCaptcha(
            (id: string): Promise<string | null> =>
                new Promise((resolve) => resolve(null)),
            'unexisting id',
            'value'
        );
        assert.isFalse(isValid, 'Should be false');
    });
});
