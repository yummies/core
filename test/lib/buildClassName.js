import { expect } from 'chai';

import buildClassName from '../../lib/buildClassName';

describe('buildClassName', () => {
    it('exist', () => {
        expect(buildClassName).to.exist;
    });

    it('be a function', () => {
        expect(buildClassName).to.be.a('function');
    });

    it('no arguments', () => {
        expect(
            buildClassName
        ).to.throw(
            'only plain objects accepted'
        );
    });

    it('invalid block', () => {
        expect(buildClassName.bind(buildClassName, {
            block: 123
        })).to.throw(
            'block should be string'
        );
    });

    it('block', () => {
        expect(buildClassName({
            block: 'block'
        })).to.equal(
            'block'
        );
    });

    it('block + invalid mods', () => {
        expect(buildClassName.bind(buildClassName, {
            block: 'block',
            mods: 'mod'
        })).to.throw(
            'mods should be a plain object'
        );
    });

    it('block + 1 mod', () => {
        expect(buildClassName({
            block: 'block',
            mods: {
                mod: 'val'
            }
        })).to.equal(
            'block block_mod_val'
        );
    });

    it('block + false mod', () => {
        expect(buildClassName({
            block: 'block',
            mods: {
                mod: false
            }
        })).to.equal(
            'block'
        );
    });

    it('block + true mod', () => {
        expect(buildClassName({
            block: 'block',
            mods: {
                mod: true
            }
        })).to.equal(
            'block block_mod'
        );
    });

    it('block + few mods', () => {
        expect(buildClassName({
            block: 'block',
            mods: {
                mod1: 'val1',
                mod2: 'val2'
            }
        })).to.equal(
            'block block_mod1_val1 block_mod2_val2'
        );
    });

    it('block + invalid elem', () => {
        expect(buildClassName.bind(buildClassName, {
            block: 'block',
            elem: 123
        })).to.throw(
            'elem should be string'
        );
    });

    it('no block + elem', () => {
        expect(buildClassName.bind(buildClassName, {
            elem: 'elem'
        })).to.throw(
            'you should provide block along with elem'
        );
    });

    it('block + elem', () => {
        expect(buildClassName({
            block: 'block',
            elem: 'elem'
        })).to.equal(
            'block__elem'
        );
    });

    it('no block + mods', () => {
        expect(buildClassName.bind(buildClassName, {
            mods: {
                mod: 'val'
            }
        })).to.throw(
            'you should provide block/elem along with mods'
        );
    });

    it('block + elem + 1 mod', () => {
        expect(buildClassName({
            block: 'block',
            elem: 'elem',
            mods: {
                mod: 'val'
            }
        })).to.equal(
            'block__elem block__elem_mod_val'
        );
    });

    it('block + elem + few mods', () => {
        expect(buildClassName({
            block: 'block',
            elem: 'elem',
            mods: {
                mod1: 'val1',
                mod2: 'val2'
            }
        })).to.equal(
            'block__elem block__elem_mod1_val1 block__elem_mod2_val2'
        );
    });

    it('invalid mix', () => {
        expect(buildClassName.bind(buildClassName, {
            mix: 'mix'
        })).to.throw(
            'mix should be a plain object or array'
        );
    });

    it('mix as object', () => {
        expect(buildClassName({
            mix: {
                block: 'block2'
            }
        })).to.equal(
            'block2'
        );
    });

    it('mix as array', () => {
        expect(buildClassName({
            mix: [
                { block: 'block2' },
                { block: 'block3' }
            ]
        })).to.equal(
            'block2 block3'
        );
    });

    it('block + complex mix', () => {
        expect(buildClassName({
            mix: {
                block: 'block2',
                elem: 'elem',
                mods: {
                    mod: 'val'
                }
            }
        })).to.equal(
            'block2__elem block2__elem_mod_val'
        );
    });

    it('block + mix', () => {
        expect(buildClassName({
            block: 'block',
            mix: {
                block: 'block2'
            }
        })).to.equal(
            'block block2'
        );
    });
});
