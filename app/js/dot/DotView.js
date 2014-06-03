var $ = require('jquery');
window.jQuery = $; // hack to get velocity to
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var transit = require('jquery.transit');

var velocity = require('velocity-animate');


var DotView = module.exports = Backbone.View.extend({

	colors: [ // http://flatuicolors.com/
		'#e74c3c', // alizarin
		'#e67e22', // carrot
		'#f1c40f', // sunflower
		'#1abc9c', // turquoise
		'#2ecc71', // emerald 
		'#3498db', // peter river
		'#9b59b6' // amethyst
	],

	initialize: function(options) {

		if (!options.container){
			console.log("specify a container!");
			return;
		}

		this.container = $(options.container);


		var size = Math.floor(Math.random() * 10) + 5;

		var el = $('<div>').addClass('dot').css({
			background: this.getRandomColor(),
			height: size,
			width: size,
			left: this.getRandomLeft(),
			top: this.getRandomTop()
		})

		this.setElement(el);


		var fallDuration = 3000,
			fadeDuration = 500;

		this.$el.appendTo(this.container)
			.css({opacity: 0});

		this.$el.velocity({ 
			opacity: 1
		}, {
			queue: false,
			duration: fadeDuration
		});



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

		this.$el.velocity({
			opacity: 0
		}, {
			queue: false,
			duration: 500,
			delay: fallDuration - fadeDuration
		});
		
		

		// remove element after it's done animating	
		// var prefix = function(type){
		// 	var pfx = ["webkit", "moz", "MS", "o", ""];
		// 	pfx = pfx.map(function(p){
		// 		if (!p) type = type.toLowerCase();
		// 		return p + type;
		// 	});
		// 	return pfx.join(" ");
		// };
		// this.$el.on(prefix('AnimationEnd'), function(event) { 
		
		// 	console.log($(this).css("transform"));
		// 	$(this).fadeOut();
		// 	// {
		// 	// 	duration: 400,
		// 	// 	complete: function(){
		// 	// 		$(this).remove();	
		// 	// 	}.bind(this)
		// 	// });
					
		// });

		return this;
	},

	getRandomColor: function(){
		return this.colors[~~(Math.random() * this.colors.length)];
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
