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


        // make candy element
        var el = $("<div>")
            .addClass(this.flavor)
            .addClass("candy")
            .css({
                width: this.size,
                height: this.size,
                // scale: 0,
                // 'transform' : 'scale(0)',
                position: "absolute",
                top: this.position[1] - this.size/2,  
                left: this.position[0] - this.size/2
            })
            .html(this.template({}));


        this.setElement(el);

        this.$el.appendTo(this.container);

        // start scale at 0
        this.$el.velocity({
            scale: 0
        }, {
            duration: 0
        });

        // animate the candy in
        setTimeout(function(){

            this.$el.velocity({
                scale: 1
            }, {
                duration: 900
            });

        }.bind(this), 1000);

        return this;
    },

    // animate this candy away and remove when it's done
    goaway: function(){
        this.$el.velocity({
            scale: "0"
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
