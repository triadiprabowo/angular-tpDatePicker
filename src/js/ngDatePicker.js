angular.module('ngDatePicker', [])
.directive('tpDatePicker', function($rootScope) {
	return {
		restrict: 'E',
		link: function($scope, el, attr) {
			var options = {
				date: {
					common: [31,28,31,30,31,30,31,31,30,31,30,31],
					leap: [31,29,31,30,31,30,31,31,30,31,30,31]
				},
				day: {
					short: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
					long: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
				},
				month: {
					short: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
					long: ['January','February','March','April','May','June','July','August','September','October','November','December']
				},
				year: {
					min: 1900,
					max: new Date().getFullYear()
				},
				current: {
					date: new Date().getDate(),
					month: new Date().getMonth(),
					year: new Date().getFullYear()
				}
			}

			var a = new Date(1900,01,01)

			console.log(a)
		}
	}
})