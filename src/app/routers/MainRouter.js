define([
    '$',
    'backbone',
    'App'

//    'components/ScrollContainer',
//    'components/LayoutContainer',

], function ($, Backbone, App) {

    return Backbone.Router.extend({
        routes: {
            "": "index"
        },

        initialize: function() {
        },

        index: function() {
            alert("Hello");
        }
    });
});
