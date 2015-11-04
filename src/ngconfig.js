'use strict';

app.config(function($locationProvider, $routeProvider) {
	// Set route require base of HTML5 mode and hashPrefix of '!'
    $locationProvider.html5Mode(true).hashPrefix('!');

    // Define Path
    var path = {
    	view: 'tpl/'
    }

    // Route list
    $routeProvider
    .when('/', {
    	templateUrl: path.view+'test.html'
   	});
});