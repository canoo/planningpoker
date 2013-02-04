define([
    // Libs
    "$",
    "underscore",
    "backbone",

    // Plugins
    'backbone.layoutmanager'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({

        className: 'scroller-container',

        events: {
            'touchstart .scroller-inner': 'onTouchStart',
            'touchmove': 'onTouchMove'
        },

        initialize: function(options) {

            this.$scroller = $('<div class="scroller"></div>');
            this.$inner = $('<div class="scroller-inner"></div>');
            this.$scroller.append(this.$inner);
            this.$el.append(this.$scroller);

            this.contentView = options.content || null;
        },

        beforeRender: function() {
            if(this.contentView) {
                this.insertView('.scroller-inner', this.contentView);
            }
        },

        getContentView: function() {
            return this.contentView;
        },

        setContentView: function(view) {
            this.contentView = view;
            this.setView('.scroller-inner', this.contentView, false);
        },

        onTouchMove: function(event) {
            if(!this.contentView) {
                event.preventDefault();
            } else if(this.$inner.height() >= this.contentView.$el.height()) {
                event.preventDefault();
            }
            event.stopPropagation();
        },

        onTouchStart: function(event) {
            var elem = this.$inner.get(0);
            var startTopScroll = elem.scrollTop;

            if(startTopScroll <= 0) {
                elem.scrollTop = 1;
            }

            if(startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
                elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
            }
        }
    });
});
