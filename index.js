'use strict';

var postcss = require('postcss');
var _ = require('lodash');

module.exports = postcss.plugin('postcss-palette', function (opts) {
    opts = opts || {};

    var palette = opts.palette || {};

    palette = _.omit(palette, [
        'inherit',
        'transparent',
        'dotted',
        'dashed',
        'solid',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
        'fixed',
        'scroll',
        'local'
    ]);

    var pickFromPalette = function (color) {
        return palette[color] || color;
    };

    var ruleChange = function (rule) {
        return rule.split(' ')
            .map(pickFromPalette)
            .join(' ');
    };

    var multipleRulesChange = function (rules) {
        return rules.split(',')
            .map(ruleChange)
            .join(',');
    };

    return function (css) {
        ['color', 'fill', 'stroke'].forEach(function (key) {
            css.walkDecls(key, function (decl) {
                decl.value = pickFromPalette(decl.value);
            });
        });
        [/^background/, 'box-shadow', 'text-shadow'].forEach(function (key) {
            css.walkDecls(key, function (decl) {
                decl.value = multipleRulesChange(decl.value);
            });
        });
        css.walkDecls(/^border/, function (decl) {
            decl.value = ruleChange(decl.value);
        });
    };
});
