define([

    // libs
    "$",
    "underscore",
    "backbone",
    "handlebars",

    'templates/TemplateManager',

    // initialize plugins
//    "$.hammer",
    "zepto.flickable",
    "underscore.deferred",
    "backbone.layoutmanager",
    "backbone.mediator"


], function ($, _, Backbone, Handlebars,
             TemplateManager) {

    console.log('Initialize:init');

    $(function () {
        // prevents that the hole body is bounced
        document.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);
    });

    /**
     * Here we can initialize any third party libraries.
     *
     * e.g. we could add handlebars helper functions etc.
     */

        // do any non application library initialization here

    Handlebars.registerHelper('colorize', function () {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    });


    // Configure LayoutManager with Backbone Boilerplate defaults.
    Backbone.Layout.configure({

        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,

        prefix: "app/templates/",

        // Return a deferred for when all promises resolve/reject.
        when: function(promises) {
            return _.when.apply(null, promises);
        },

        deferred: function () {
            return _.Deferred();
        },

        // make layout manager work with handlebars
        render: function(template, context) {
            return template(context);
        },

        fetch: function(path) {
            path = path + ".html";
            var done = this.async();
            if (TemplateManager.hasTemplate(path)) {
                return done(TemplateManager.getTemplate(path));
            }

            console.warn("load template: ", path);
            $.get(path, function(contents) {
                var template = TemplateManager.compile(path, contents);
                done(template);
            }, "text");
        }
    });


});
