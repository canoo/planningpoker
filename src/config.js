require.config({

    baseUrl: 'app',

    paths  : {
        app                     : '../app',
        jst                     : '../app.jst.min',
        zepto                   : '../lib/zepto/zepto',
        underscore              : '../lib/underscore/underscore',
        'underscore.deferred'   : '../lib/underscore/underscore.deferred',

        backbone                : '../lib/backbone/backbone',
        'backbone.layoutmanager': '../lib/backbone/backbone.layoutmanager',
        'backbone.mediator'     : '../lib/backbone/backbone.mediator',

        handlebars              : '../lib/handlebars/handlebars'
    },

    shim   : {
        'jst': {
            exports: 'JST'
        },

        'zepto': {
            exports: '$'
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
            _: 'underscore'
        }
    }
});

/**
 * Run the App!
 */
require(['app']);