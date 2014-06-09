var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var velocity = require('velocity-animate');

require('./templates/wrapped.handlebars');
require('./templates/lolly.handlebars');
require('./templates/peppermint.handlebars');
require('./templates/candycane.handlebars');

// View for the spinning candy
module.exports = Backbone.View.extend({


    flavors: ["wrapped", "lolly", "peppermint", "candycane"],

    size: 100,

    /**
     * example usage:
     *
     *  new CandyView({ 
     *      container: "#candy",
     *      flavor: "wrapped",
     *      position: [0, 0]
     *  })
     */
    initialize: function(options) {

        if (!options.container){
            console.error("specify a container!");
            return;
        }
        if (!options.flavor){
            console.error("specify a flavor! (" + this.flavors.join(", ") + ")");
            return;
        }
        if (!options.position){
            console.error("specify a position! eg. [100, 100]");
            return;
        }

        this.container = $(options.container);
        this.flavor = options.flavor;
        this.position = options.position;

        // grab the template based on the flavor
        this.template = require('./templates/' + this.flavor + ".handlebars");


        var el = $("<div>")
            .addClass(this.flavor)
            .addClass("candy")
            .css({
                width: 0,
                height: 0,
                position: "absolute",
                top: this.position[1],  
                left: this.position[0]
            })
            .html(this.template({}));

        this.setElement(el);

        this.$el.appendTo(this.container);

        // move the candy back and up by half it's size so the 
        // given position is the center of the candy
        this.$el.velocity({
            width: this.size,
            height: this.size,
            top: '-=' + (this.size/2),
            left: '-=' + (this.size/2)
        }, {
            duration: 2000
        });

        return this;
    },

    // animate this candy away and remove when it's done
    goaway: function(){
        this.$el.velocity({
            width: 0,
            height: 0,
            top: '+=' + (this.size/2),
            left: '+=' + (this.size/2)
        }, {
            duration: 400,
            complete: function(){
                this.$el.remove();
            }.bind(this)
        });
        
    },

    getRandomLeft: function(){ 
        return "" + (Math.random() * 100) + "%";
    },

    getRandomTop: function(){ 
        return ~~(Math.random() * this.container.height()) - 300;
    }
    
});
