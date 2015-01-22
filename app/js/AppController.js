var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var DotView = require('./dot/DotView.js');
var CandyView = require('./candy/CandyView.js');

// main controller for the page
var AppController = function(){

    // keep track of all the candy (CandyView.js) we have on the page
    this.candy = [];

    // generate a bunch of confetti
    this.startConfetti = function(){
        var dotTimer = setInterval(function(){
            var dot = new DotView({
                container: "#dots"
            });
        }, 50);

        setTimeout(function(){
            clearInterval(dotTimer);
            $('.envelope').removeClass('open');
            this.removeCandy();
        }.bind(this), 12000);
    };

    // pick some good spots for the candies to show up 
    // depending on the screen size
    this.defineCoords = function(){

        this.envelopeWidth = $('.envelope').width();
        this.distance = 100/2; // 100 is size of candy, and they will be centered

        this.left   = ($(window).width() - this.envelopeWidth) / 4;
        this.left   = (this.left < this.distance) ? this.distance : this.left;

        this.right  = this.left * 3 + this.envelopeWidth;
        this.right  = (this.right > ($(window).width() - this.distance)) ? ($(window).width() - this.distance) : this.right;

        this.top    = this.distance * 2;
        this.bottom = $(window).height() - (this.distance * 3);

    };

    // add all the candy to the page
    this.addCandy = function(){

        // only add the candy if it's not there
        if (this.candy.length === 0){
            this.candy.push(new CandyView({ 
                container: "#candy",
                flavor: "wrapped",
                position: [this.left, this.top]
            }));

            this.candy.push(new CandyView({ 
                container: "#candy",
                flavor: "peppermint",
                position: [this.right, this.top]
            }));

            this.candy.push(new CandyView({ 
                container: "#candy",
                flavor: "lolly",
                position: [this.right, this.bottom]
            }));

           this.candy.push(new CandyView({ 
                container: "#candy",
                flavor: "candycane",
                position: [this.left, this.bottom]
            }));
     
        }

    };

    // remove all the candy from the page
    this.removeCandy = function() {

        this.candy.forEach(function(view){
            view.goaway();
        });
        this.candy = [];
    };

    // start everything! partay!
    this.party = function(){

        $('.envelope').addClass('open');

        this.defineCoords();

        this.startConfetti();

        this.addCandy();
  
    };

    // party when the user clicks the envelope
    $('.envelope').on('click', this.party.bind(this));

    
};





module.exports = AppController;

