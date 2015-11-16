/*
** tpDatePicker for AngularJS
** https://github.com/triadiprabowo/angular-tpDatePicker
** Developed by Triadi Prabowo (me@triadiprabowo.com)
** Licensed by MIT
** Version 0.3-b1 pre-testing
*/

angular.module('ngDatePicker', [])
.directive('tpDatePicker', function($window, $parse, $document, $rootScope) {
	return {
		restrict: 'A',
		link: function($scope, el, attr) {
			$window.tpDatePicker = ({
				activeIndex: 0,
				tpDateOptions: []
			});

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
				},
				firstday: new Date(new Date().getFullYear(), new Date().getMonth(),  1).getDay(),
				startday: 1
			}		

			function __setElementIndex() {
				for(var i=0; i < document.getElementsByClassName('tpDatePicker').length; i++) {
					el.attr('index', i);					
				}

				el.addClass('__tpdatepicker__input');
			}	

			function renderCalendar() {
				options.startday = 1;

				var tpl = '<table class=tpDatePicker><thead class=tpDateHead><tr><th colspan=7><span class=tpDate-month>'+options.month.long[options.current.month]+
				'</span><span class=tpDate-year>'+options.current.year+'</span></th></tr><tr>'

				for(var i=0; i < options.day.short.length; i++) {
					tpl += '<th>'+options.day.short[i]+'</th>';

					if(i+1 == options.day.short.length) {
						tpl += '</tr></thead><tbody class=tpDateBody>'
					}
				}

				if(options.current.year % 4 == 0 || options.current.year % 100 == 0) {
					var before = 0 - options.firstday;
					var after = 1;
					var actual = 0;	
					var limit = 35;	

					if(options.date.leap[options.current.month] - before > limit) {
						limit += 7;			
					}

					for(var i=0; i < limit; i++) {						
						if(before != 0)	{
							if(options.current.month != 0) {
								var pastdate = options.date.leap[options.current.month - 1] + before++;
							}
							else {
								var pastdate = 31 + before++;
							}

							if(i % 7 == 0) {
								tpl += '</tr>'
							}

							tpl += '<td class=tpDate_pastDate>'+ (parseInt(pastdate)+1) +'</td>'
						}
						else {
							if(i % 7 == 0) {
								tpl += '</tr>'
							}
							actual++;

							if(actual <= parseInt(options.date.leap[options.current.month])-before)
								tpl += '<td class=tpDate_selection onclick=tpDatePicker.onChange(this)>'+ options.startday++ +'</td>';
							else
								tpl += '<td class=tpDate_pastDate>'+after+++'</td>'
						}
					}
				}
				else {
					var before = 0 - options.firstday;
					var after = 1;
					var actual = 0;	
					var limit = 35;	

					if(options.date.leap[options.current.month] - before > limit) {
						limit += 7;			
					}

					for(var i=0; i < limit; i++) {						
						if(before != 0)	{
							if(options.current.month != 0) {
								var pastdate = options.date.leap[options.current.month - 1] + before++;
							}
							else {
								var pastdate = 31 + before++;
							}

							if(i % 7 == 0) {
								tpl += '</tr>'
							}

							tpl += '<td class=tpDate_pastDate>'+ (parseInt(pastdate)+1) +'</td>'
						}
						else {
							if(i % 7 == 0) {
								tpl += '</tr>'
							}
							actual++;

							if(actual <= parseInt(options.date.common[options.current.month]) - before)
								tpl += '<td class=tpDate_selection onclick=tpDatePicker.onChange(this)>'+ options.startday++ +'</td>';
							else
								tpl += '<td class=tpDate_pastDate>'+after+++'</td>'
						}
					}
				}
				return tpl
			}

			// Append Element
			el.wrap('<div class=tpDatePicker-wrapper></div>')
			el.after(renderCalendar());	
			__setElementIndex();

			function yearSelector() {
				var data = '<select class=tpDate-SY>';

				for(var i=options.year.max; i >= options.year.min; i--) {
					data += '<option value='+i+'>'+i+'</option>'
				}

				data += '</select>';

				return data
			}

			function monthSelector() {
				var data = '<select class=tpDate-SM>';

				for(var i=0; i < options.month.long.length; i++) {
					data += '<option value='+i+'>'+options.month.long[i]+'</option>'
				}

				data += '</select>';

				return data;
			}

			function __setDefaultIndex() {
				var year = document.getElementsByClassName('tpDate-SY');
				var month = document.getElementsByClassName('tpDate-SM');

				for(var i=0; i < month.length; i++) {
					month[i].selectedIndex = options.current.month;
				}

				for(var i=0; i < year.length; i++) {
					for(var j=0; j < year[i].length; j++) {
						if(year[i][j].value == options.current.year) {
							year[i].selectedIndex = j;
						}
					}					
				}
			}			

			/*************************
			** OnChange of Selector **
			*************************/
			function __CAL_QUERY(y,m) {				
				var firstday = new Date(y, m, 1).getDay();				
				var tpl = '';
				options.startday = 1;

				if(y % 4 == 0 || y % 100 == 0) {
					var before = 0 - firstday;
					var after = 1;	
					var actual = 0;	
					var limit = 35;	

					if(options.date.leap[m] - before > limit) {
						limit += 7;			
					}							

					for(var i=0; i < limit; i++) {						
						if(before != 0)	{				
							if(m != 0) {
								var pastdate = options.date.leap[m-1] + before++;	
							}
							else {
								var pastdate = 31 + before++;
							}
							
							if(i % 7 == 0) {
								tpl += '</tr>'
							}

							tpl += '<td class=tpDate_pastDate>'+ (parseInt(pastdate)+1) +'</td>'
						}
						else {
							if(i % 7 == 0) {
								tpl += '</tr>'
							}
							actual++;

							if(actual <= parseInt(options.date.leap[m])-before)
								tpl += '<td class=tpDate_selection onclick=tpDatePicker.onChange(this)>'+ options.startday++ +'</td>';
							else
								tpl += '<td class=tpDate_pastDate>'+after+++'</td>'
						}
					}
				}
				else {
					var before = 0 - firstday;
					var after = 1;	
					var actual = 0;	
					var limit = 35;	

					if(options.date.common[m] - before > limit) {
						limit += 7;			
					}			

					for(var i=0; i < limit; i++) {						
						if(before != 0)	{
							if(m != 0) {
								var pastdate = options.date.leap[m-1] + before++;	
							}
							else {
								var pastdate = 31 + before++;
							}
							
							if(i % 7 == 0) {
								tpl += '</tr>'
							}

							tpl += '<td class=tpDate_pastDate>'+ (parseInt(pastdate)+1) +'</td>'
						}
						else {
							if(i % 7 == 0) {
								tpl += '</tr>'
							}
							actual++;

							if(actual <= parseInt(options.date.common[m])-before)
								tpl += '<td class=tpDate_selection onclick=tpDatePicker.onChange(this)>'+ options.startday++ +'</td>';
							else
								tpl += '<td class=tpDate_pastDate>'+after+++'</td>'
						}
					}
				}
				return tpl
			}

			// Run Query
			for(var i=0; i < document.getElementsByClassName('tpDate-year').length; i++) {
				document.getElementsByClassName('tpDate-year')[i].innerHTML = yearSelector();
			}
			for(var i=0; i < document.getElementsByClassName('tpDate-month').length; i++) {
				document.getElementsByClassName('tpDate-month')[i].innerHTML = monthSelector();
			}
			__setDefaultIndex();

			function __onChange_Year(s) {
				var __tmp_selectedMonth = document.getElementsByClassName('tpDate-SM')[$window.tpDatePicker.activeIndex].selectedIndex;
				
				document.getElementsByClassName('tpDateBody')[$window.tpDatePicker.activeIndex].innerHTML = __CAL_QUERY(s, __tmp_selectedMonth);
			}

			function __onChange_Month(s) {
				var __tmp_selectedYear = document.getElementsByClassName('tpDate-SY')[$window.tpDatePicker.activeIndex].value;

				document.getElementsByClassName('tpDateBody')[$window.tpDatePicker.activeIndex].innerHTML = __CAL_QUERY(__tmp_selectedYear, s);				
			}

			angular.element(document.querySelectorAll('.tpDate-SM')).on('change', function() {
				__onChange_Month(this.value);
			});

			angular.element(document.querySelectorAll('.tpDate-SY')).on('change', function() {
				__onChange_Year(this.value);
			});

			// Add readonly to textbox
			el.attr('readonly', true);

			el.on('click', function(e) {
				for(var i=0; i < document.getElementsByClassName('tpDatePicker').length; i++) {
					if(i != parseInt(this.getAttribute('index'))) 
						document.getElementsByClassName('tpDatePicker')[i].style.display = ''
				}

				var index = parseInt(this.getAttribute('index'));
				$window.tpDatePicker.activeIndex = index;

				var __selector = document.getElementsByClassName('tpDatePicker')[index];

				__selector.style.display == ''? __selector.style.display = 'block' : __selector.style.display = '';
				__selector.style.display != ''? angular.element(this).addClass('__tpdatepicker__active') : angular.element(this).removeClass('__tpdatepicker__active')

				if(__selector.style.display != '') {
					$rootScope.$broadcast('__tpdatepicker__ready');
					e.stopPropagation();					
				}				

				for(var i=0; i < document.getElementsByClassName('__tpdatepicker__input').length; i++) {
					$window.tpDatePicker.tpDateOptions.push($parse(document.getElementsByClassName('__tpdatepicker__input')[i].attributes['tp-date-picker'].nodeValue)())
				}
			});			

			var __query__selection = document.getElementsByClassName('tpDatePicker');			
			
			var tpDateOptions = $parse(attr.tpDatePicker)();

			$window.tpDatePicker.onChange = function(v) {
				var __selectedDate = parseInt(v.innerHTML);
				__selectedDate = __selectedDate < 10? '0'+__selectedDate : __selectedDate;

				var __selectedMonth = parseInt(angular.element(document.querySelector('.tpDate-SM')).val()) + 1;
				__selectedMonth  = __selectedMonth < 10? '0'+__selectedMonth : __selectedMonth;

				var __selectedLongMonth = options.month.long[parseInt(__selectedMonth)-1];

				var __selectedYear = parseInt(angular.element(document.querySelector('.tpDate-SY')).val());
				__selectedYear = __selectedYear < 10? '0'+__selectedYear : __selectedYear;
				
				var __separator = $window.tpDatePicker.tpDateOptions[$window.tpDatePicker.activeIndex].format.replace(/[a-zA-Z]/g, '').substr(0,1);
				var __tmp__dateFormat = $window.tpDatePicker.tpDateOptions[$window.tpDatePicker.activeIndex].format.replace(__separator, ' ').split(' ');
				
				if(__tmp__dateFormat.length != 3) {
					for(var y=0; y < __tmp__dateFormat.length; y ++) {
						var x = __tmp__dateFormat[y].replace(__separator, ' ').split(' ');
					}

					__tmp__dateFormat = [__tmp__dateFormat[0]];
					
					for(var t=0; t < x.length; t++) {
						__tmp__dateFormat.push(x[t]);
					}
				}

				if(__tmp__dateFormat.length == 3) {
					for(var x=0; x < __tmp__dateFormat.length; x++) {
						if(__tmp__dateFormat[x] == 'DD') {
							__tmp__dateFormat[x] = __selectedDate;
						}
						else if(__tmp__dateFormat[x] == 'MM') {
							__tmp__dateFormat[x] = __selectedMonth;
						}
						else if(__tmp__dateFormat[x] == 'M') {
							__tmp__dateFormat[x] = __selectedLongMonth;
						}
						else if(__tmp__dateFormat[x] == 'YYYY') {
							__tmp__dateFormat[x] = __selectedYear;
						}
					}

					document.querySelector('.__tpdatepicker__active').value = __tmp__dateFormat.join(__separator);
				}
				else {
					console.log("Unexpected error, format date is Invalid!");
				}			

				document.getElementsByClassName('__tpdatepicker__active')[0].nextElementSibling.style.display = '';
				document.getElementsByClassName('__tpdatepicker__active')[0].className = ''
			}
		}
	}
})