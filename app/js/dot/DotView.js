var $ = require('jquery');
window.jQuery = $; // hack to get velocity to work
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var velocity = require('velocity-animate');

// View for each individual dot of confetti
module.exports = Backbone.View.extend({

	colors: [      // http://flatuicolors.com/
		'#e74c3c', // alizarin
		'#e67e22', // carrot
		'#f1c40f', // sunflower
		'#1abc9c', // turquoise
		'#2ecc71', // emerald 
		'#3498db', // peter river
		'#9b59b6'  // amethyst
	],

	initialize: function(options) {

		if (!options.container){
			console.log("specify a container!");
			return;
		}

		this.container = $(options.container);

		// get random size
		var size = Math.floor(Math.random() * 10) + 5;

		// create element
		var el = $('<div>').addClass('dot').css({
			background: this.getRandomColor(),
			height: size,
			width: size,
			left: this.getRandomLeft(),
			top: this.getRandomTop(),
			opacity: 0
		});

		this.setElement(el);

		this.$el.appendTo(this.container);

		this.animate();

		return this;
	},

	// animate the dot falling at different rates depending on it's size
	// using velocity to manage css3 transition timing
	animate: function(){

		var fallDuration = 3000,
			fadeDuration = 500;

		// fade in
		this.$el.velocity({ 
			opacity: 1
		}, {
			queue: false,
			duration: fadeDuration
		});

		// fall
		this.$el.velocity({ 
			translateY: '5000%',
		}, {
			queue: false,
			duration: fallDuration,
			easing: 'linear',
			complete: function(){
				this.$el.remove();
			}.bind(this)
		});

		// fade out
		this.$el.velocity({
			opacity: 0
		}, {
			queue: false,
			duration: 500,
			delay: fallDuration - fadeDuration
		});
	},

	getRandomColor: function(){
		return this.colors[Math.floor(Math.random() * this.colors.length)];
	},

	getRandomLeft: function(){ 
		return "" + (Math.random() * 100) + "%";
	},

	getRandomTop: function(){ 
		return Math.floor(Math.random() * this.container.height()) - 300;
	}
	
});
