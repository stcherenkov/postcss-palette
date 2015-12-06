/* eslint max-len: [2, 160, 4] */

'use strict';

var postcss = require('postcss');
var expect  = require('chai').expect;
var parallel = require('async').parallel;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe('postcss-palette', function () {

    it('changes color specified by palette', function (done) {
        test('a{ color: red; }', 'a{ color: #123456; }', {
            palette: {
                red: '#123456'
            }
        }, done);
    });

    it('changes background-color specified by palette', function (done) {
        var options = {
            palette: {
                red: '#123456'
            }
        };

        parallel([
            function (cb) {
                test('a{ background-color: red; }',
                    'a{ background-color: #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ background: red; }',
                    'a{ background: #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ background: url(noimage.png), red; }',
                    'a{ background: url(noimage.png), #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ background: url(noimage.png),red; }',
                    'a{ background: url(noimage.png),#123456; }',
                    options, cb);
            }
        ], function (err) {
            done(err);
        });
    });

    it('changes border-color specified by palette', function (done) {
        var options = {
            palette: {
                red: '#123456'
            }
        };

        parallel([
            function (cb) {
                test('a{ border-color: red; }',
                    'a{ border-color: #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border-top-color: red; }',
                    'a{ border-top-color: #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border-right-color: red; }',
                    'a{ border-right-color: #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border-bottom-color: red; }',
                    'a{ border-bottom-color: #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border-left-color: red; }',
                    'a{ border-left-color: #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border: 1px solid red; }',
                    'a{ border: 1px solid #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border-top: 1px solid red; }',
                    'a{ border-top: 1px solid #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border-right: 1px solid red; }',
                    'a{ border-right: 1px solid #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border-bottom: 1px solid red; }',
                    'a{ border-bottom: 1px solid #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ border-left: 1px solid red; }',
                    'a{ border-left: 1px solid #123456; }',
                    options, cb);
            }
        ], function (err) {
            done(err);
        });

    });

    it('changes box-shadow color specified by palette', function (done) {
        var options = {
            palette: {
                red:  '#123456',
                blue: 'rgba(0,0,0,.5)'
            }
        };

        parallel([
            function (cb) {
                test('a{ box-shadow: -2px -4px 2px 2px red; }',
                    'a{ box-shadow: -2px -4px 2px 2px #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ box-shadow: -2px -4px 2px 2px red, -2px -4px 2px 2px blue; }',
                    'a{ box-shadow: -2px -4px 2px 2px #123456, -2px -4px 2px 2px rgba(0,0,0,.5); }',
                    options, cb);
            }
        ], function (err) {
            done(err);
        });
    });

    it('changes text-shadow color specified by palette', function (done) {
        var options = {
            palette: {
                red:  '#123456',
                blue: 'rgba(0,0,0,.5)'
            }
        };

        parallel([
            function (cb) {
                test('a{ text-shadow: -2px -4px 2px 2px red; }',
                    'a{ text-shadow: -2px -4px 2px 2px #123456; }',
                    options, cb);
            },
            function (cb) {
                test('a{ text-shadow: -2px -4px 2px 2px red, -2px -4px 2px 2px blue; }',
                    'a{ text-shadow: -2px -4px 2px 2px #123456, -2px -4px 2px 2px rgba(0,0,0,.5); }',
                    options, cb);
            }
        ], function (err) {
            done(err);
        });
    });

    it('does not change color if not present in palette', function (done) {
        test('a{ color: red; }', 'a{ color: red; }', {
            palette: {
                blue: '#123456'
            }
        }, done);
    });

    it('skips restricted color names', function (done) {
        test('a{ color: inherit; color: transparent; }',
            'a{ color: inherit; color: transparent; }', {
                palette: {
                    inherit:     '#123456',
                    transparent: '#123456',
                    dotted:      '#123456',
                    dashed:      '#123456',
                    solid:       '#123456',
                    double:      '#123456',
                    groove:      '#123456',
                    ridge:       '#123456',
                    inset:       '#123456',
                    outset:      '#123456',
                    fixed:       '#123456',
                    scroll:      '#123456',
                    local:       '#123456'
                }
            }, done);
    });

});
