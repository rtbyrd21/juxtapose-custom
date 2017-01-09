var myApp = angular.module('myApp',['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partials/partial-home.html',
            controller: function ($scope, $stateParams, $rootScope) {
            	$rootScope.countySelected = false;
            	$rootScope.showNav= false;
            }  
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('tiles', {
            url: '/tiles',
            templateUrl: 'partials/partial-tiles.html',
            controller: function ($scope, $stateParams, $rootScope, $state) {
            	$rootScope.countySelected = false;
            	$rootScope.showNav= true;


setTimeout(function(){
	var b = function(p) {

		var hit;
		var myRects = [];
		var bg;
		var hitTracker = {};
		p.preload = function() {
			bg = p.loadImage("images/county_image.jpg");	
		}

		p.setup = function(){

		    	
		  var canvas = p.createCanvas(p.windowWidth, (p.windowWidth / 16 * 9));
		  
		  canvas.parent('county-holder');
		  hit = false;
		  

		  var myRectParams = [[44,31,5.5,5], [49.5, 44, 5, 6], [41, 50, 8, 7], [36.5, 41, 6.5, 6], [65, 77, 6, 6.5]]
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
				p.rect(this.xPos,this.yPos,this.percWidth,this.percHeight);
				p.fill(0);
				p.text(index + 1, this.xPos + (this.percWidth/2), this.yPos + (this.percHeight/2));
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
            controller: function ($scope, $stateParams, $rootScope) {
            	$rootScope.showNav= true;
            	$rootScope.countySelected = true;
            	$scope.id = $stateParams.aerialID;
            	$rootScope.zoomAmount = 1;
        //     	slider = new juxtapose.JXSlider('.aerial',
				    // [
				    //     {
				    //         // src: 'images/0'+$stateParams.aerialID+'_archive.jpg',
				    //         src: 'images/placeholder.png',
				    //         label: '1941',
				    //         magnified: 'images/0'+$stateParams.aerialID+'_archive.jpg'
				    //     },
				    //     {
				    //         // src: 'images/0'+$stateParams.aerialID+'_recent.jpg',
				    //         src: 'images/placeholder.png',
				    //         label: '2016',
				    //         magnified: 'images/0'+$stateParams.aerialID+'_recent.jpg'
				    //     }
				    // ],
				    // {
				    //     animate: true,
				    //     showLabels: true,
				    //     showCredits: true,
				    //     startingPosition: "50%",
				    //     makeResponsive: true
				    // });


            	setTimeout(function(){


            		$('#divisor').html("<iframe class='zoomFrame' src='/zoomify/0"+$stateParams.aerialID+"_archive/0"+$stateParams.aerialID+"_archive.html' width='100%' height='100%'>You need a Frames Capable browser to view this content.</iframe> ");
     				$('figure').prepend( "<iframe class='zoomFrame' src='/zoomify/0"+$stateParams.aerialID+"_present/0"+$stateParams.aerialID+"_present.html' width='100%' height='100%'>You need a Frames Capable browser to view this content.</iframe> " );
     //        		$("#thumb").panzoom({
     //        			contain: 'invert',
     //        			 minScale: 1,
     //        			 $zoomIn: $('#zoom-in'),
  			// 			$zoomOut: $('#zoom-out')
  			// 			// transition: false
     //        		});

     //        		$("#thumbRecent").panzoom({
     //        			contain: 'invert',
     //        			 minScale: 1,
     //        			 $zoomIn: $('#zoom-in'),
  			// 			$zoomOut: $('#zoom-out')
  			// 			// transition: false

     //        		});

     //        		var afterImage = $("#thumbRecent");
     //        		var zoomAmountBefore = 1;
     //        		var zoomAmountAfter = 1;
     //        		var imageOverageBefore;
     //        		var imageOverageAfter;



     //        		$("#thumb").on('panzoomzoom', function(e, panzoom, scale, opts) {
					//     setTimeout(function(){
					//     	zoomAmountBefore = $("#thumb").css('transform').split(",")[3];	
					//     },500);
					//     $rootScope.zoomAmount = $("#thumb").css('transform').split(",")[3];

					//     $rootScope.$apply();
					// });

					// $("#thumbRecent").on('panzoomzoom', function(e, panzoom, scale, opts) {

					//     setTimeout(function(){

					//     	zoomAmountAfter = $("#thumbRecent").css('transform').split(",")[3];	
					//     	$rootScope.zoomAmount = $("#thumb").css('transform').split(",")[3];
					//     	$rootScope.$apply();

					//     },500);
					// });


     //        		$("#thumb").on('panzoompan', function(e, panzoom, x, y, afterImage) {
     //        			imageOverageBefore = $(window).width() - $("#thumb").width();
     //        			var panAmount = map_range(x, 0, $(window).width() - $("#thumb").width(), 0, 100);
     //        			$rootScope.$broadcast('panning', {pan:panAmount});
     //        			$("#thumb").css({'transition': 'none'});
     //        			$("#thumbRecent").css({'transition': 'none'});
     //        			// if(imageOverageBefore / 2 <= x){
					// 	    $("#thumbRecent").css({
	    // 						'transform': 'matrix('+ zoomAmountBefore +', 0, 0, '+ zoomAmountBefore +', '+ x +', '+ y +')'
	  		// 				});

					// });

					// $("#thumbRecent").on('panzoompan', function(e, panzoom, x, y, afterImage) {
					// 	imageOverageAfter = $(window).width() - $("#thumbRecent").width();						
					// 	    var panAmount = map_range(x, 0, $(window).width() - $("#thumb").width(), 0, 100);
     //        				$rootScope.$broadcast('panning', {pan:panAmount});
     //        				$("#thumb").css({'transition': 'none'});
     //        				$("#thumbRecent").css({'transition': 'none'});
	  		// 				// if(imageOverageAfter / 2 < x){
	  		// 					$("#thumb").css({
	    // 							'transform': 'matrix('+ zoomAmountAfter +', 0, 0, '+ zoomAmountAfter +', '+ x +', '+ y +')'
	  		// 					});

					// });

					var percentageToIncrease = $(window).height() / $('.aerial').height();
					$('.aerial').css({
						height: $('.aerial').height() * percentageToIncrease,
						// width: $('.aerial').width() * percentageToIncrease
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






// setTimeout(function(){
// var a = function(p) {
// 	var windowWidth = $(window).width();
// 	var windowHeight = $(window).height();
// 	var imageWidth;
// 	var imageHeight;
// 	var differenceWidth, differenceHeight;
// 	var x, y;
// 	setTimeout(function(){
// 	imageWidth = $('#thumb').width();
// 	imageHeight = $('#thumb').height();
// 	differenceWidth = windowWidth / imageWidth;
// 	differenceHeight = imageWidth / windowWidth;
// 	}, 500);

// 	var dimensions = 70;
// 	p.setup = function(){

// 	  var canvas = p.createCanvas(dimensions, dimensions);
// 	  x = (windowWidth - p.width) / 2;
// 	  y = (windowHeight - p.height) / 2;


// 	  // Move the canvas so it's inside our <div id="sketch-holder">.
// 	  canvas.parent('sketch-holder');
// 	}
// 	var panAmount = 0;
// 	p.draw = function() {
// 	  var aspectRatioWindow = calculateAspectRatioFit(windowWidth, windowHeight, dimensions * .9, dimensions * .9);
// 	  var aspectRatioImage = calculateAspectRatioFit(imageWidth, imageHeight, (dimensions * .9), dimensions * .9);


// 	  p.translate(dimensions/2 - aspectRatioWindow.width /2,dimensions/2 - aspectRatioWindow.height/2);	
// 	  p.background(255, 255, 255, 150);
// 	  p.stroke(0);
// 	  p.fill(255);
// 	  p.rect(0, 0, aspectRatioWindow.width, aspectRatioWindow.height);
// 	  p.noStroke();
// 	  p.fill(109,205,211);

// 	  // (aspectRatioWindow.width - (aspectRatioImage.width * differenceWidth)) / 2
	  
// 	  $rootScope.$on('panning', function(e, data){
// 	  	panAmount = data.pan;
// 	  });
// 	  var amountToPan = p.map(panAmount, 0, 100, 0, aspectRatioWindow.width - (aspectRatioImage.width * differenceWidth));

// 	  p.rect(amountToPan + 1, 1, (aspectRatioImage.width * differenceWidth) * .99, (aspectRatioImage.height * differenceHeight) -1);
// 	}

// 	function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

// 	    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

// 	    return { width: srcWidth*ratio, height: srcHeight*ratio };
// 	 }
// 	};

// 		var myp5 = new p5(a);

// }, 500);




				

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








