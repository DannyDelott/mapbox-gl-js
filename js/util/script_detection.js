'use strict';

const balancedRegExp = new RegExp([
    '[一-鿌]',
    '[㐀-䶵]',
    // eslint-disable-next-line no-irregular-whitespace
    '[　-〿]',
    '\uD840[\uDC00-\uFFFF]|[\uD841-\uD872]|\uD873[\u0000-\uDEAF]', // '[𠀀-𬺯]'
    '[！-￮]',
    '[ぁ-ゟ]',
    '[゠-ヿ]',
    '[ㇰ-ㇿ]',
    '[ꀀ-꓆]'
].join('|'));

module.exports.allowsBalancedBreaking = function(input) {
    return input.search(balancedRegExp) !== -1;
};
