define(['backbone', 'models/PokerModel'], function (Backbone, PokerModel) {
    return Backbone.Collection.extend({
        model     : PokerModel,
        comparator: function (model) {
            return model.getPoints();
        }
    });
});
