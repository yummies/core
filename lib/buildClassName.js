import React from 'react';
import isPlainObject from 'lodash.isplainobject';

import throwError from './throwError';

const modDelim = '_';
const elemDelim = '__';

/**
 * Build a className string from BEMJSON-object.
 */
export default function buildClassName(json) {
    let out = '';
    let entity = '';

    if (typeof json === 'undefined' || json === null) {
        return out;
    }

    if (!isPlainObject(json) || React.isValidElement(json)) {
        throwError('only plain objects accepted', json);
    }

    // block
    if ('block' in json) {
        if (typeof json.block !== 'string') {
            throwError('block should be string', json);
        }

        entity = json.block;
    }

    // elem
    if ('elem' in json) {
        if (!('block' in json)) {
            throwError('you should provide block along with elem', json);
        }

        if (typeof json.elem !== 'string') {
            throwError('elem should be string', json);
        }

        entity += elemDelim + json.elem;
    }

    // get current "state"
    out = entity;

    // mods
    if ('mods' in json) {
        if (!('block' in json)) {
            throwError('you should provide block/elem along with mods', json);
        }

        if (!isPlainObject(json.mods)) {
            throwError('mods should be a plain object', json);
        }

        Object.keys(json.mods).forEach(modName => {
            const modValue = json.mods[modName];
            let modValueString = '';

            if (modValue !== false) {
                // 'short' boolean mods
                if (modValue !== true) {
                    modValueString += modDelim + modValue;
                }

                out += ' ' + entity + modDelim + modName + modValueString;
            }
        });
    }

    // mix
    if ('mix' in json) {
        if (!isPlainObject(json.mix) && !Array.isArray(json.mix)) {
            throwError('mix should be a plain object or array', json);
        }

        // convert object or array into array
        json.mix = [].concat(json.mix);

        json.mix.forEach(mixed => {
            let classDelimiter = '';

            if (out.length > 0) {
                classDelimiter = ' ';
            }

            out += classDelimiter + buildClassName(mixed);
        });
    }

    return out;
}
