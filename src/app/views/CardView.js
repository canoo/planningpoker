define(['$', 'underscore', 'backbone', 'backbone.layoutmanager'], function ($, _, Backbone) {
    return Backbone.Layout.extend({
        template : 'layouts/main-layout',
        className: 'main-view'
    });
});
