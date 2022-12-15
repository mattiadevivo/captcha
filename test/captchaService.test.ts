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
        const captachasToValidate = [
            {
                id: '1',
                realValue: 'ABCDEF',
                userValue: 'ABCDEF',
                expectedResult: true,
            },
            {
                id: '2',
                realValue: 'AbcD3F',
                userValue: 'Abcd3F',
                expectedResult: false,
            },
            {
                id: '3',
                realValue: 'FghiJ',
                userValue: 'FghiJ',
                expectedResult: true,
            },
            {
                id: '4',
                realValue: 'FGH22',
                userValue: 'Pino1',
                expectedResult: false,
            },
        ];
        for (const item of captachasToValidate) {
            const isValid = await validateCaptcha(
                (id: string): Promise<string | null> =>
                    new Promise((resolve) => resolve(item.realValue)),
                item.id,
                item.userValue
            );
            assert.strictEqual(
                isValid,
                item.expectedResult,
                `Expected ${isValid} to be ${item.expectedResult}`
            );
        }
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
