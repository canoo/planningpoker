require.config({

    baseUrl: 'app',

    paths: {
        app: '../planning-poker.min',
        jst: '../planning-poker.jst.min',

//        'zepto.hammer'          : '../lib/zepto/zepto.hammer',

        zepto                   : '../scripts/zepto.core/zepto',
        'zepto.selector'        : '../scripts/zepto.selector/selector',
        'zepto.flickable'       : '../scripts/zepto.flickable/src/zepto.flickable',
        underscore              : '../scripts/underscore/underscore',
        'underscore.deferred'   : '../scripts/underscore.deferred/underscore.deferred',
        backbone                : '../scripts/backbone/backbone',
        'backbone.layoutmanager': '../scripts/backbone.layoutmanager/backbone.layoutmanager',
        'backbone.mediator'     : '../scripts/backbone.mediator/backbone-mediator',
        handlebars              : '../scripts/handlebars/handlebars'
    },

    shim: {
        'jst': {
            exports: 'JST'
        },

        'zepto': {
            exports: '$'
        },

        'zepto.selector': {
            deps: ['zepto']
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
            deps   : [ 'underscore', 'zepto', 'backbone' ],
            exports: 'Backbone.Layout'
        },

        'backbone.mediator': {
            deps: [ 'underscore', 'zepto', 'backbone' ]
        },

        'handlebars': {
            exports: 'Handlebars'
        }
    },
    map : {
        '*': {
            jquery: 'zepto',
            $     : 'zepto',
//            "$.hammer": 'zepto.hammer',
            _     : 'underscore'
        }
    }
});

/**
 * Run the App!
 */
require(['app']);