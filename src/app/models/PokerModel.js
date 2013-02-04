define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            points: 0,
            text  : 'Canoo'
        },

        getPoints: function() {
            return this.get('points');
        },

        setPoints: function(points) {
            this.set(points);
        }
    });
});