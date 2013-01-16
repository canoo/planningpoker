define([
    // Libs
    "$",
    "underscore",
    "backbone",

    // Plugins
    'backbone.layoutmanager'
], function ($, _, Backbone) {

    var defaults = {
        active: false,
        transition: {
            show: 'fadeIn',
            hide: 'fadeOut'
        }
    };

    var fadeInTransition = function (card) {
        var dfd = _.Deferred();
        card.$el.css({ opacity: 0 })
        .show()
        .animate({
            opacity: 1
        }, 200, 'ease-out', function(){
            dfd.resolve(card);
        });
        return dfd.promise();
    };

    var fadeOutTransition = function (card) {
        var dfd = _.Deferred();
        card.$el.css({opacity: 1})
        .animate({
            opacity: '1'
        }, 200, 'ease-out', function() {
            card.setActive(false);
            dfd.resolve(card);
        });
        return dfd.promise();
    };

    var Card = Backbone.Layout.extend({

        className : 'x-container x-layout-card-item',

        initialize: function (options) {
            this.options = _.extend({}, defaults, options);
            this.name = options.name;

//            console.log("card options", this.getName(), this.options);
            this._initializeEl(options);
            this.$el.data('card', this.name);
        },

        _initializeEl: function (options) {

            if(this.options.transition.show === 'fadeIn') {
//                console.log("set fadeIn", this.getName());
                this.$el.css({
                    opacity: 0
                });
            }
//            this.$el.append('<div class="x-inner"></div>');
        },

        getName: function () {
            return this.name;
        },

        show: function () {
            this.$el.show();
            return this;
        },

        hide: function () {
            this.$el.hide();
            return this;
        },

        isActive: function () {
            return this.options.active;
        },

        setActive: function (active) {
            if (active) {
                this.$el.show();
            } else {
                this.$el.hide();
            }
            this.options.active = active;
            return this;
        }
    });

    return Backbone.Layout.extend({
//        className: 'x-container',

        initialize: function (options) {
            this.cardStack = [];
            this.options = _.extend({}, options, defaults);
            this._initializeEl();
        },

        _initializeEl: function () {
        },

        getCardByName: function (name) {
            return this.getView(function (view) {
                return view.getName() === name;
            });
        },

        /**
         * Pushes the given Card onto the card stack.
         *
         * @param name the name of the card
         * @param view the view
         * @return Card the popped card
         */
        pushCard: function (name, view) {
            var dfd = _.Deferred();

            var card = new Card({name: name});
            card.insertView(view);
            this._pushCard(card);

            card.render().done(function(html) {
                fadeInTransition(card).done(function(){
                    dfd.resolve(card);
                });
            }).fail(function() {
               dfd.reject(card);
            });

            return dfd.promise();
        },

        _pushCard: function (card) {
            var previousCard = this.peekCard();
            if(previousCard) {
                previousCard.setActive(false);
            }
            card.setActive(true);
            this.insertView(card);
            this.cardStack.push(card);

//            var me = this;
//            var previousCard = this.peekCard();
//
//            var pushCard = function() {
//                card.$el.css({
//                    opacity:0
//                });
//                card.setActive(true);
//                me.insertView(card);
//
//                card.$el.animate({
//                    opacity: '1'
//                }, 200, 'ease-out');
//
//                me.cardStack.push(card);
//            };
//
//            if(previousCard) {
//                previousCard.$el.animate({
//                    opacity: '0'
//                }, 100, 'ease-out', function() {
//                    previousCard.setActive(false);
////                    pushCard();
//                });
//            } else {
////                pushCard();
//            }
//            pushCard();
        },

        /**
         * Returns the last card of the card stack.
         * @return Card or null if stack is empty
         */
        peekCard: function() {
            if(this.cardStack.length > 0) {
                return this.cardStack[this.cardStack.length - 1];
            } else {
                return null;
            }
        },

        /**
         * Removes the top level card from the stack and makes the next card active.
         * @return Card the popped card or null if the stack is empty
         */
        popCard: function () {
            var dfd = _.Deferred();

            var topStackCard = this.peekCard();
            if(topStackCard) {
                topStackCard.remove();
                this.cardStack.pop();
            }
            var currentCard = this.peekCard();
            if(currentCard) {
                fadeInTransition(currentCard).done(function(){
                    currentCard.setActive(true);
                    dfd.resolve();
                });
            } else {
                dfd.resolve();
            }

            return dfd.promise();
        },

        popAllCards: function() {
            var promises = [];
            var i;
            for (i = 0; i < this.cardStack.length; i++) {
                promises.push(this.popCard());
            }
            return _.when.apply(_, promises);
        },


        addCard: function (name, view) {
            var dfd = _.Deferred();
            var card = new Card({name: name});
            card.insertView(view);
            this._addCard(card);

            card.render()
                .done(function(html){
                    card.$el.css({opacity: 1});
                    dfd.resolve(card);
                })
                .fail(function(error){
                    console.log("card render issue", error);
                    dfd.reject(error);
                });

            return dfd.promise();
        },

        removeCard: function (name) {
            var card = this.getCardByName(name);
            if (card) {
                return card.remove();
            }
        },

        _addCard: function (card) {
            this.insertView(card);
        }
    });
});
