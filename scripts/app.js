var myApp = angular.module('myApp',['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partials/partial-home.html',
            controller: function ($scope, $state, $stateParams, $rootScope, $location) {
            	$rootScope.countySelected = false;
            	$rootScope.showNav= false;

            	$rootScope.currentPath = $location.path();

			setTimeout(function(){
			var a = function(p) {
				var windowWidth = $(window).width();
				var windowHeight = $(window).height();
				var bg;
				var hit = false;
				var hitJux = false;
				var poly = []; //store the vertices for our polygon
				var polyJux = [];

				p.preload = function() {
					bg = p.loadImage("images/attract_screen.jpg");	
					mask = p.loadImage('images/mask_1.png')
					mask2 = p.loadImage('images/mask_2.png')
				}

				p.setup = function(){

				  var canvas = p.createCanvas(windowWidth, windowHeight);
				  // Move the canvas so it's inside our <div id="sketch-holder">.
				  agricultureVideo = p.createVideo('images/agriculture_video.mp4');
				  interactVideo = p.createVideo('images/interact_video.mp4');
				  canvas.parent('sketch-holder');
				  poly[0] = p.createVector(0,0);     // set X/Y positions
				  poly[1] = p.createVector(0,p.height);
				  poly[2] = p.createVector(p.width * .10, p.height);
				  poly[3] = p.createVector(p.width * .87,0);

				  agricultureVideo.loop();
				  interactVideo.loop();
				  polyJux[0] = p.createVector(p.width * .875,0);     // set X/Y positions
				  polyJux[1] = p.createVector(p.width,0);
				  polyJux[2] = p.createVector(p.width, p.height);
				  polyJux[3] = p.createVector(p.width * .105, p.height);
				  
				}

				p.draw = function() {
					// p.background(bg);
					agricultureVideo.mask(mask);
					p.image(agricultureVideo,0,0, p.width, p.height);
					interactVideo.mask(mask2);
					p.image(interactVideo,0,0, p.width, p.height);


					// p.beginShape();
					// p.noFill();
				 //    for(i=0; i < poly.length; i++){
				 //        p.vertex(poly[i].x,poly[i].y);
				 //    }
				 //    p.endShape(p.CLOSE);

				 //    p.beginShape();
				 //    for(i=0; i < polyJux.length; i++){
				 //        p.vertex(polyJux[i].x,polyJux[i].y);
				 //    }
				 //    p.endShape(p.CLOSE);

				    p.ellipse(p.mouseX,p.mouseY,10,10); //put a small ellipse on our point.

				    hit = p.collidePointPoly(p.mouseX,p.mouseY,poly);
				    hitJux = p.collidePointPoly(p.mouseX,p.mouseY,polyJux); //3rd parameter is an array of vertices.
				    // console.log(p.mouseX / p.width, p.mouseY/ p.height);

				}

				p.mousePressed = function(){
					if(hit){
						console.log('video');
						p.remove();
					}
					if(hitJux){
						$state.go('instructions');
						p.remove();
					}
				}

			}
			var myp5 = new p5(a);
			}, 500);





            }  
        })

        .state('instructions', {
            url: '/instructions',
            templateUrl: 'partials/partial-instructions.html',
            controller: function ($scope, $stateParams, $rootScope, $state, $location) {
            	$rootScope.countySelected = false;
            	$rootScope.showNav= true;
            	$rootScope.currentPath = $location.path();

            }
    })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('tiles', {
            url: '/tiles',
            templateUrl: 'partials/partial-tiles.html',
            controller: function ($scope, $stateParams, $rootScope, $state, $location) {
            	$rootScope.countySelected = false;
            	$rootScope.showNav= true;
            	$rootScope.currentPath = $location.path();


setTimeout(function(){
	var b = function(p) {

		var hit;
		var myRects = [];
		var bg;
		var hitTracker = {};
		p.preload = function() {
			bg = p.loadImage("images/county-image.jpg");	
		}

		p.setup = function(){

		    	
		  var canvas = p.createCanvas(p.windowWidth, (p.windowWidth / 16 * 9));
		  
		  canvas.parent('county-holder');
		  hit = false;
		  

		  var myRectParams = [[37,48,4.75,4.25], [40, 58, 4, 5], [33.5, 63.5, 6, 5], [30, 56, 5, 4.5], [52.7, 84, 5, 5.5], [35, 88, 4.7, 5.2], [20.5, 49, 4.7, 5.2], [50.5, 29, 4.7, 5.2]]
		  for(var i=0; i<myRectParams.length; i++){
		  	 hitTracker[i] = false;
		  	 myRects[i] = new hitTarget(myRectParams[i][0], myRectParams[i][1], myRectParams[i][2], myRectParams[i][3], i);
		  }

		  
		}
		

		p.draw = function() {
			p.background(bg);
			p.noStroke();
			p.fill(255,255,255,100);
			// var xPos = p.map(35, 0, 100, 0, p.windowWidth);
			// var yPos = p.map(70, 0, 100, 0, p.windowHeight);
			// p.rect(xPos,yPos,400,120);
			
			// myRect.checkHit();
			for(var i=0; i<myRects.length; i++){
				myRects[i].display();
				if(myRects[i].checkHit()){
				   hitTracker[i] = true;
				}else{
					hitTracker[i] = false;
				}
			}
			

		}

		p.mousePressed = function(){
			myRects.forEach(function(item, index){
				if(hitTracker[index]){
					if($state.current.name === 'tiles'){
						$state.go('aerial', {aerialID:index + 1});	
						p.remove();
					}
				}
			});
		}

		function hitTarget(x, y, width, height, index){
			this.xPos = p.map(x, 0, 100, 0, p.windowWidth);
			this.yPos = p.map(y, 0, 100, 0, (p.windowWidth / 16) * 9);
			this.percWidth = p.map(width, 0, 100, 0, p.windowWidth);
			this.percHeight = p.map(height, 0, 100, 0, (p.windowWidth / 16) * 9);
			this.width = width;
			this.height = height;
			

			this.checkHit = function(){
				if((p.mouseX > this.xPos && p.mouseX < this.xPos + this.percWidth) && (p.mouseY > this.yPos && p.mouseY < this.yPos + this.percHeight)){
					return true;
				}else{
					return false;
				}
			}

			this.display = function(){
				p.fill(255,255,255,100);
				// console.log(this.xPos,this.yPos,this.width,this.height);
				// p.rect(this.xPos,this.yPos,this.percWidth,this.percHeight);
				p.fill(0);
				// p.text(index + 1, this.xPos + (this.percWidth/2), this.yPos + (this.percHeight/2));
			}
		}


	};

	var myp5again = new p5(b);

}, 500);

            }       
        })

        .state('aerial', {
            url: '/aerial:aerialID',
            templateUrl: 'partials/partial-view.html',
            controller: function ($scope, $stateParams, $rootScope, $window, $location) {
            	$rootScope.currentPath = $location.path();
            	$rootScope.showNav= true;
            	$rootScope.countySelected = true;
            	$scope.id = $stateParams.aerialID;
            	$rootScope.zoomAmount = 1;
            	$rootScope.clickCount = 0;
            	$(window).on('pageClicked', function(){
            		$rootScope.clickCount ++;
            		$rootScope.$apply();

            	})

            	$rootScope.resetClickCount = function(){
            		$rootScope.clickCount = 0;
            	}




            	setTimeout(function(){


            		$('#divisor').html("<iframe class='zoomFrame' src='/zoomify/0"+$stateParams.aerialID+"_archive/0"+$stateParams.aerialID+"_archive.html' width='100%' height='100%'>You need a Frames Capable browser to view this content.</iframe> ");
     				$('figure').prepend( "<iframe class='zoomFrame' src='/zoomify/0"+$stateParams.aerialID+"_present/0"+$stateParams.aerialID+"_present.html' width='100%' height='100%'>You need a Frames Capable browser to view this content.</iframe> " );


					var percentageToIncrease = $(window).height() / $('.aerial').height();
					$('.aerial').css({
						height: $('.aerial').height() * percentageToIncrease,
						width: '100%'
					});	

					var overExtended = (($('.aerial').width() - $(window).width()) / 2) * -1;

					$('.aerial').css({
						'transform': 'matrix(1, 0, 0, 1, '+ overExtended +', 0)'
					});


					$('#thumb').css({'display':'none'});
					$('.jx-image.jx-left').prepend( "<iframe class='zoomFrame' src='/zoomify/0"+$stateParams.aerialID+"_archive/0"+$stateParams.aerialID+"_archive.html' width='100%' height='100%'>You need a Frames Capable browser to view this content.</iframe> " );
					// $('.zoomFrame').css({'width': $(window).width()});

					$('#thumbRecent').css({'display':'none'});
					$('.jx-image.jx-right').prepend( "<iframe class='zoomFrame' src='/zoomify/0"+$stateParams.aerialID+"_present/0"+$stateParams.aerialID+"_present.html' width='100%' height='100%'>You need a Frames Capable browser to view this content.</iframe> " );
					$('.zoomFrame').css({'width': $(window).width()});

					// console.log($('.jx-image.jx-right').find('.leaflet-container'));

					// $('.leaflet-control-container').css({'position':'absolute', 'left':'150px'});

					// console.log($('.leaflet-control-zoom-in'));
            	}, 1000);






				

        	}
        });

        
});

myApp.controller('MainController', function($scope) {
  $scope.greeting = 'Hola!';
});

myApp.directive('tile', function(){
	function link(scope, element, attrs){
		console.log(attrs.image);
		slider = new juxtapose.JXSlider('.' + attrs.class,
		    [
		        {
		            src: 'images/0'+attrs.image+'_archive.jpg'
		        },
		        {
		            src: 'images/0'+attrs.image+'_recent.jpg'
		        }
		    ],
		    {
		        animate: true,
		        showLabels: true,
		        showCredits: true,
		        startingPosition: "50%",
		        makeResponsive: true
		    });

		element.click(function(e){
			e.preventDefault();
			console.log(this);
		})

	}
	return {
    	link: link
  	};
});


// myApp.directive('disabledZoom', function($rootScope){
// 	return {
// 		link: function(scope, element, attrs){
// 			$rootScope.$watch('zoomAmount', function(newValue,oldValue){
// 				console.log(newValue, oldValue);
// 				if(attrs.disabledZoom == 'out' && newValue <= 1 || attrs.disabledZoom == 'out' && newValue == undefined){
// 					$(element).attr('disabled', true);
// 				}else{
// 					$(element).attr('disabled', false);
// 				}
// 			}, true);

// 		}
// 	};	
	
// });

myApp.directive('backButton', ['$window', '$state', function($window, $state) {
        return {
            // restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                	console.log($state);
                	if($state.current.name == 'tiles'){
                		$state.go('home');
                	}else{
                		$window.history.back();
                	}
                    
                });
            }
        };
    }]);


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function rendered() {
    //Render complete
    alert("image rendered");
}

function startRender() {
    //Rendering start
    requestAnimationFrame(rendered);
}

function loaded()  {
    requestAnimationFrame(startRender);
}








