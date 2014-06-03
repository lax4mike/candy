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
        }, 40);

        setTimeout(function(){
            clearInterval(dotTimer);
            $('.envelope').removeClass('open');
            this.removeCandy();
        }.bind(this), 6000);
    }



    this.addCandy = function(){

        var distance = 100;
        var left   = distance;
        var right  = $(window).width() - distance;
        var top    = distance;
        var bottom = $(window).height() - distance;

        this.candy.push(new CandyView({ 
            container: "#candy",
            flavor: "wrapped",
            position: [left, top]
        }));

        this.candy.push(new CandyView({ 
            container: "#candy",
            flavor: "lolly",
            position: [left, bottom]
        }));

       this.candy.push(new CandyView({ 
            container: "#candy",
            flavor: "wrapped",
            position: [right, bottom]
        }));

        this.candy.push(new CandyView({ 
            container: "#candy",
            flavor: "lolly",
            position: [right, top]
        }));
    }

    this.removeCandy = function() {

        this.candy.forEach(function(view){
            view.goaway();
        });
    }

    this.party = function(){

        $('.envelope').addClass('open');

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

