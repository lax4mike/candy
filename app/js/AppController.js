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

    

    this.startConfetti = function(){
        var dotTimer = setInterval(function(){
            var dot = new DotView({
                container: "#dots"
            });
        }, 50);

        setTimeout(function(){
            clearInterval(dotTimer);
            $('.envelope').removeClass('open');
        }, 6000);
    }

    this.addCandy = function(){
        var wrapped = new CandyView({ 
            container: "#candy",
            flavor: "lolly"
        });
    }

    this.party = function(){

        $('.envelope').addClass('open');

        this.startConfetti();

        // this.addCandy();
  
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

