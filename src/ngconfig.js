'use strict';

app.config(function($locationProvider, $routeProvider) {
	// Set route require base of HTML5 mode and hashPrefix of '!'
    $locationProvider.html5Mode(true).hashPrefix('!');

    // Define Path
    var path = {
    	view: 'tpl/'
    }

    // Configuration of routes list
    // And resolve function
    // Version 1.5 Build 18
    // onloadStyle => Load CSS files
    // onloadAll => Language
    // onloadLocation => Determine current location of accessing user
    // onload[xxx] => Load page function controller before view loaded
    $routeProvider
    .when('/', {
    	templateUrl: path.view+'test.html',
        resolve: {
            onload: function() {
                console.log(123)
            }
        }
   	})
});