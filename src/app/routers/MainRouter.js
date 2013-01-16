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
            var main = App.Viewport.useLayout('main');

            var TouchView = Backbone.View.extend({
                className: "hbox box-align-center box-pack-center",
                id: "outer",

                events: {
                },

                initialize: function() {
                    var inner = $("<div id='inner' class='inner' " +
                        "style='background-color: blue; " +
                        "width: 100px; height: 100px;'>" +
                        "</div>");
                    this.$el.append(inner);

                    this._initializeEl();
                },

                _initializeEl: function() {
                    this.$el.css({
                        "border"     : "3px dashed orange",
                        "line-height": "300px",
                        "height"     : "300px",
                        "text-align" : "center",
                        "font-size"  : "3em",
                        "width"      : "600px"
                    });
                }
            });

            var MainView = Backbone.Layout.extend({});

            var events = new Backbone.Collection([]);



            main.insertView(new TouchView({collection: events}));

//            App.Viewport.addCard('main', main);

            App.Viewport.render();
        }
    });
});
