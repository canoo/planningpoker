require.config({

    baseUrl: 'app',

    paths  : {
        app                     : '../planning-poker.min',
        jst                     : '../planning-poker.jst.min',
        zepto                   : '../lib/zepto/zepto',
//        'zepto.hammer'          : '../lib/zepto/zepto.hammer',
        'zepto.flickable'       : '../lib/zepto/zepto.flickable',
        hammer                  : '../lib/hammer/hammer',
        underscore              : '../lib/underscore/underscore',
        'underscore.deferred'   : '../lib/underscore/underscore.deferred',

        backbone                : '../lib/backbone/backbone',
        'backbone.layoutmanager': '../lib/backbone/backbone.layoutmanager',
        'backbone.mediator'     : '../lib/backbone/backbone.mediator',

        handlebars              : '../lib/handlebars/handlebars-1.0.rc.1'
    },

    shim   : {
        'jst': {
            exports: 'JST'
        },

        'zepto': {
            exports: '$'
        },
//
//        'hammer': {
//            exports: 'Hammer'
//        },

        'zepto.hammer': {
            deps: ['zepto', 'hammer']
        },

        'zepto.flickable': {
            deps: ['zepto']
        },

        'underscore': {
            exports: '_'
        },

        'underscore.deferred': {
            deps: ['underscore']
        },

        'backbone': {
            deps   : [ 'underscore', 'zepto' ],
            exports: 'Backbone'
        },

        'backbone.layoutmanager': {
            deps: [ 'underscore', 'zepto', 'backbone' ]
        },

        'backbone.mediator': {
            deps: [ 'underscore', 'zepto', 'backbone' ]
        },

        'handlebars' : {
            exports: 'Handlebars'
        }
    },
    map    : {
        '*': {
            jquery: 'zepto',
            $: 'zepto',
//            "$.hammer": 'zepto.hammer',
            _: 'underscore'
        }
    }
});

/**
 * Run the App!
 */
require(['app']);