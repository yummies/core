import { expect } from 'chai';
import {
    buildClassName,
    convertToReact,
    throwError
} from '../../lib/';

describe('core', () => {
    it('exist', () => {
        expect(buildClassName).to.exist;
        expect(convertToReact).to.exist;
        expect(throwError).to.exist;
    });
});
