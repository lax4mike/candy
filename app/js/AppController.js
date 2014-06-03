var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

// var io = require('socket.io-client');
// var host = window.location.hostname;
// var socket = io.connect('//'+host+':3300'); 

var DotView = require('./dot/DotView.js');
var CandyView = require('./candy/CandyView.js');


// var AppRouter = require('./AppRouter.js');


var AppController = function(){

    // this.socket = socket;

    this.candy = [];

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
    }

    this.defineCoords = function(){

        this.envelopeWidth = $('.envelope').width();
        this.distance = 100/2; // 100 is size of candy, and they are centered

        this.left   = ($(window).width() - this.envelopeWidth) / 4;
        this.left   = (this.left < this.distance) ? this.distance : this.left;

        this.right  = this.left * 3 + this.envelopeWidth;
        this.right  = (this.right > ($(window).width() - this.distance)) ? ($(window).width() - this.distance) : this.right;

        this.top    = this.distance * 2;
        this.bottom = $(window).height() - (this.distance * 2);

    }


    this.addCandy = function(){

        // only add the candy if it's not there
        if (this.candy.length == 0){
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
     
        // this.move = setInterval(this.moveCandy.bind(this), 2000);

    }

    this.moveCandy = function(){

        this.candy.forEach(function(view, i){

            var x = this.left, y = this.top;

            if (i % 2 == 0){ x = this.right; }
            if (i < 2){ y = this.bottom; }

            view.$el.velocity({
                top: y - 50,
                left: x - 50
            });

        }.bind(this));

        this.candy.push(this.candy.shift());

    }

    this.removeCandy = function() {

        // clearInterval(this.move);


        this.candy.forEach(function(view){
            view.goaway();
        });
        this.candy = [];
    }

    this.party = function(){

        $('.envelope').addClass('open');

        this.defineCoords();

        this.startConfetti();

        this.addCandy();
  
    };

    $('.envelope').on('click', this.party.bind(this));

    

    
    
   

    /**
     * Socket events
     */
    // on connection to server
    // this.socket.on('connect', function(){
    // });
};





module.exports = AppController;

