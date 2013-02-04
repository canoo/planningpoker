define([
    '$',
    'backbone',
    'App',


    'models/PokerModel',
    'models/PokerModelCollection',

    'views/CardView',
    'views/GridView',
    'views/FlickView',

    'backbone.mediator'
], function ($, Backbone,

             App,

             PokerModel,
             PokerModelCollection,

             CardView,

             GridView,
             FlickView
    ) {

    return Backbone.Router.extend({

        // available routs for the application
        routes: {
            "": "index"
        },

        index: function () {

            // Our Viewport implementation with card layout
            // supports push and pop methods with animations
            App.Viewport.useLayout('main');

            // render the viewport first to know the dimensions
            App.Viewport.render().done(function () {

                var dimensions = App.Viewport.getDimensions();



                var collection = new PokerModelCollection(
                    [
                        {points: 12, text: 'Canoo'},
                        {points: 1, text: 'Canoo'},
                        {points: 2, text: 'Canoo'},
                        {points: 3, text: 'Canoo'},
                        {points: 4, text: 'Canoo'},
                        {points: 5, text: 'Canoo'},
                        {points: 6, text: 'Canoo'},
                        {points: 7, text: 'Canoo'},
                        {points: 8, text: 'Canoo'},
                        {points: 9, text: 'Canoo'},
                        {points: 10, text: 'Canoo'},
                        {points: 11, text: 'Canoo'},
                    ]
                );

                var cardView = new CardView();

                var flickView = new FlickView({
                    collection: collection,
                    width: dimensions.width,
                    height: dimensions.height
                });

                cardView.insertView(flickView);


                Backbone.Mediator.subscribe('grid:select', function (data) {
                    var model = data.model;
                    var selection = collection.indexOf(model);
                    flickView.showSegment(selection);
                    App.Viewport.popCard();
                });

                Backbone.Mediator.subscribe('flick:longpress', function (data) {
                    var gridMainView = new CardView();
                    gridMainView.insertView(new GridView({collection: collection}));
                    App.Viewport.pushCard('grid-view', gridMainView);
                });

                // push the main view on the viewport card stack
                App.Viewport.pushCard('main-view', cardView);
            });
        }
    });
});
