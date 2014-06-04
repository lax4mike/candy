var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var velocity = require('velocity-animate');

require('./wrapped.handlebars');
require('./lolly.handlebars');
require('./peppermint.handlebars');
require('./candycane.handlebars');


var CandyView = module.exports = Backbone.View.extend({


	flavors: ["wrapped", "lolly", "peppermint", "candycane"],

	size: 100,

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

		this.template = require('./' + this.flavor + ".handlebars");


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

	goaway: function(){
		this.$el.velocity({
			width: 0,
			height: 0,
			top: '+=' + (this.size/2),
			left: '+=' + (this.size/2)
		}, {
			duration: 2000,
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
