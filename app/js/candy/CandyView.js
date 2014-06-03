var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var transit = require('jquery.transit');

require('./wrapped.handlebars');
require('./lolly.handlebars');


var CandyView = module.exports = Backbone.View.extend({


	flavors: ["wrapped", "lolly"],

	initialize: function(options) {

		if (!options.container){
			console.error("specify a container!");
			return;
		}
		if (!options.flavor){
			console.error("specify a flavor! (" + this.flavors.join(", ") + ")");
			return;
		}

		this.container = $(options.container);
		this.flavor = options.flavor;

		this.template = require('./' + this.flavor + ".handlebars");


		var el = $("<div>")
			.addClass(this.flavor)
			.addClass("candy")
			.css({
				width: 100,
				height: 100,
				position: "absolute",
				top: 100,  
				left: 100
			})
			.html(this.template({}));

		this.setElement(el);

		this.$el.on('click', this.spin.bind(this));

		this.$el.appendTo(this.container);

		// this.$el.transition({
		// 	width: 100,
		// 	height: 100,
		// 	duration: 2000
		// });

		// this.$el.transition({
		// 	rotate: '1080deg'
		// });

		return this;
	},

	spin: function(){
		console.log("SPLIN!");
		this.$el.transition({
			rotate: '1080deg'
		});
	},

	getRandomLeft: function(){ 
		return "" + (Math.random() * 100) + "%";
	},

	getRandomTop: function(){ 
		return ~~(Math.random() * this.container.height()) - 300;
	},

	render: function(){

	}
	
});
