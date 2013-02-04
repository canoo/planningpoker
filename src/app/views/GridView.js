define(['$', '_', 'backbone', 'backbone.layoutmanager', 'backbone.mediator'], function($, _, Backbone) {

    var GridItem = Backbone.View.extend({
        className: 'grid-item',
        template: 'views/grid-item',

        events: {
            'click': 'onItemTap'
        },

        onItemTap: function(event) {
            Backbone.Mediator.publish('grid:select', {model: this.model});
        },

        serialize: function() {
            return this.model.toJSON();
        }
    });

    var GridRow = Backbone.Layout.extend({
        className: 'grid-row'
    });

    return Backbone.Layout.extend({

        className: 'grid-view vbox',
//        template : 'views/grid-view',

        events: {
//            'click .grid-item' : "onGridItemClick",
//            'click .grid-item' : "onGridItemTap"
        },

        beforeRender: function() {

            this.insertView(new GridRow({
                views: {
                    "" : [
                        new GridItem({model: this.collection.at(0)}),
                        new GridItem({model: this.collection.at(1)}),
                        new GridItem({model: this.collection.at(2)})
                    ]
                }
            }));

            this.insertView(new GridRow({
                views: {
                    "" : [
                        new GridItem({model: this.collection.at(3)}),
                        new GridItem({model: this.collection.at(4)}),
                        new GridItem({model: this.collection.at(5)})
                    ]
                }
            }));

            this.insertView(new GridRow({
                views: {
                    "" : [
                        new GridItem({model: this.collection.at(6)}),
                        new GridItem({model: this.collection.at(7)}),
                        new GridItem({model: this.collection.at(8)})
                    ]
                }
            }));

            this.insertView(new GridRow({
                views: {
                    "" : [
                        new GridItem({model: this.collection.at(9)}),
                        new GridItem({model: this.collection.at(10)}),
                        new GridItem({model: this.collection.at(11)})
                    ]
                }
            }));
        }
    });
});