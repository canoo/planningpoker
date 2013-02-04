define([
    '$',
    'underscore',
    'backbone',
    'handlebars',
    'components/LayoutContainer',
    'backbone.layoutmanager'
], function ($, _, Backbone, Handlebars, LayoutContainer) {

    // Mix Backbone.Events, modules, and layout management into the app object.
    var viewport = _.extend({}, {

        // The root path to run the application.
        root: "/",

        getSize: function() {
            return {
                width: this.view.$el.width(),
                height: this.view.$el.height()
            }
        },

        // Helper for using layouts.
        useLayout: function (name, options) {

            // If already using this Layout, then don't re-inject into the DOM.
            if (this.view && this.view.options.template === name) {
                return this.view;
            }

            // If a layout already exists, remove it from the DOM.
            if (this.view) {
                this.view.remove();
            }

            // Create a new Layout with options.
            var view = new LayoutContainer(_.extend({
                id       : name + '-viewport'
            }, options));

            // Cache the refererence.
            this.view = view;

            // Return the reference, for chainability.
            return view;
        },


        removeCard: function(name) {
            this.view.removeCard(name);
        },

        addCard: function(name, view) {
            return this.view.addCard(name, view);
        },

        pushCard: function(name, view) {
            return this.view.pushCard(name, view);
        },

        popCard: function() {
            return this.view.popCard();
        },

        popAllCards: function() {
            return this.view.popAllCards();
        },

        peekCard: function() {
            return this.view.peekCard();
        },

        hasCard: function(name) {
            return this.view.getCardByName(name) !== undefined;
        },

        add: function(view) {
            this.view.insertView(view);
        },

        setView: function(view) {
            this.view.setView(view);
        },

        render: function() {
            // Insert into the DOM.
            var el = this.view.el;
            $("body").empty().append(el);
            return this.view.render();
        },

        getDimensions: function() {
            var width = this.view.$el.width();
            var height = this.view.$el.height();
            if (width === 0 && height === 0) {
                console.log("Forgot to render viewport initially?");
            }
            return {
                width: width,
                height: height
            };
        }
    }, Backbone.Events);

    return {
        Viewport: viewport
    };

});


