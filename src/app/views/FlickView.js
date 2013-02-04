define(['$', '_', 'backbone', 'backbone.layoutmanager'], function ($, _, Backbone) {

    var FlickItem = Backbone.Layout.extend({

        className: 'flick-item',
        template : 'views/flick-item',

        events: {
            'tap'  : 'onTap',
            'longTap': 'onLongTap'
        },

        initialize: function (options) {
            this.dimensions = options.dimensions;
        },


        beforeRender: function () {
            var width = this.dimensions.width;
            var height = this.dimensions.height;

            // margin for flick item
            this.$el.width(width - 20);
            this.$el.height(height - 20);
        },

        afterRender: function () {
        },

        serialize: function () {
            return {
                front: this.model.get('points'),
                back : this.model.get('text')
            };
        },

        onLongTap: function (event) {
            Backbone.Mediator.publish('flick:longpress');
        },

        onTap: function (event) {
            this.$el.toggleClass('flipped');
        }
    });

    var FlickInnerView = Backbone.Layout.extend({
        className: 'flick-element',
        template : 'views/flick-view',

        initialize: function (options) {
            this.settings = {
                segments      : this.collection.size(),
                flickDirection: 'x'
            };
            this.dimensions = options.dimensions;
            this.$el.addClass(this.settings.flickDirection === 'y' ? 'vbox' : 'hbox');
            this.$el.width(this.dimensions.width * this.collection.size());
        },

        beforeRender: function () {
            this.collection.each(function (model) {
                this.insertView(new FlickItem({
                    model: model,
                    dimensions: this.dimensions
                }));
            }, this);
        },

        afterRender: function () {
            this.$el.flickable(this.settings);
        },

        showSegment: function (index) {
            this.$el.flickable('segment', index);
        }

    });

    return Backbone.Layout.extend({

        className: 'flick-container',

        initialize: function (options) {

            this.dimensions = {
                width : options.width || 320,
                height: options.height || 480
            };

            this.$el.width(this.dimensions.width);
            this.$el.height(this.dimensions.height);
        },

        beforeRender: function () {
            var flickInnerView = new FlickInnerView({
                collection: this.collection,
                dimensions: this.dimensions
            });
            this.insertView(flickInnerView);
        },

        showSegment: function(index) {
            this.getView().showSegment(index);
        }
    });
});