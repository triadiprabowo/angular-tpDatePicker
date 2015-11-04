angular.module('ngDatePicker', [])
.directive('tpDatePicker', function($rootScope, $parse) {
	return {
		restrict: 'A',
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
				},
				firstday: new Date(new Date().getFullYear(), new Date().getMonth(),  1).getDay(),
				startday: 1
			}

			function renderCalendar() {
				options.startday = 1;

				var tpl = '<table id=tpDatePicker><thead id=tpDateHead><tr><th colspan=7><span id=tpDate-month>'+options.month.long[options.current.month]+
				'</span><span id=tpDate-year>'+options.current.year+'</span></th></tr><tr>'

				for(var i=0; i < options.day.short.length; i++) {
					tpl += '<th>'+options.day.short[i]+'</th>';

					if(i+1 == options.day.short.length) {
						tpl += '</tr></thead><tbody id=tpDateBody>'
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
							var pastdate = options.date.leap[options.current.month] + before++;

							if(i % 7 == 0) {
								tpl += '</tr>'
							}

							tpl += '<td class=tpDate_pastDate>'+ pastdate +'</td>'
						}
						else {
							if(i % 7 == 0) {
								tpl += '</tr>'
							}
							actual++;

							if(actual <= parseInt(options.date.leap[options.current.month])-before)
								tpl += '<td class=tpDate_selection>'+ options.startday++ +'</td>';
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
							var pastdate = options.date.common[options.current.month] + before++;

							if(i % 7 == 0) {
								tpl += '</tr>'
							}

							tpl += '<td class=tpDate_pastDate>'+ pastdate +'</td>'
						}
						else {
							if(i % 7 == 0) {
								tpl += '</tr>'
							}
							actual++;

							if(actual <= parseInt(options.date.common[options.current.month]) - before)
								tpl += '<td class=tpDate_selection>'+ options.startday++ +'</td>';
							else
								tpl += '<td class=tpDate_pastDate>'+after+++'</td>'
						}
					}
				}
				return tpl
			}

			// Append Element
			el.after(renderCalendar());

			function yearSelector() {
				var data = '<select id=tpDate-SY>';

				for(var i=options.year.max; i >= options.year.min; i--) {
					data += '<option value='+i+'>'+i+'</option>'
				}

				data += '</select>';

				return data
			}

			function monthSelector() {
				var data = '<select id=tpDate-SM>';

				for(var i=0; i < options.month.long.length; i++) {
					data += '<option value='+i+'>'+options.month.long[i]+'</option>'
				}

				data += '</select>';

				return data;
			}

			function __setDefaultIndex() {
				var year = document.getElementById('tpDate-SY');
				document.getElementById('tpDate-SM').selectedIndex = options.current.month;

				for(var i=0; i < year.length; i++) {
					if(year[i].value == options.current.year) {
						document.getElementById('tpDate-SY').selectedIndex = i;
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
							var pastdate = options.date.leap[m] + before++;
							
							if(i % 7 == 0) {
								tpl += '</tr>'
							}

							tpl += '<td class=tpDate_pastDate>'+ pastdate +'</td>'
						}
						else {
							if(i % 7 == 0) {
								tpl += '</tr>'
							}
							actual++;

							if(actual <= parseInt(options.date.leap[m])-before)
								tpl += '<td class=tpDate_selection>'+ options.startday++ +'</td>';
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
							var pastdate = options.date.common[m] + before++;
							
							if(i % 7 == 0) {
								tpl += '</tr>'
							}

							tpl += '<td class=tpDate_pastDate>'+ pastdate +'</td>'
						}
						else {
							if(i % 7 == 0) {
								tpl += '</tr>'
							}
							actual++;

							if(actual <= parseInt(options.date.common[m])-before)
								tpl += '<td class=tpDate_selection>'+ options.startday++ +'</td>';
							else
								tpl += '<td class=tpDate_pastDate>'+after+++'</td>'
						}
					}
				}
				return tpl
			}

			// Run Query
			document.getElementById('tpDate-year').innerHTML = yearSelector(), document.getElementById('tpDate-month').innerHTML = monthSelector(),
			__setDefaultIndex();

			function __onChange_Year(s) {
				var __tmp_selectedMonth = document.getElementById('tpDate-SM').selectedIndex;
				
				document.getElementById('tpDateBody').innerHTML = __CAL_QUERY(s, __tmp_selectedMonth);
			}

			function __onChange_Month(s) {
				var __tmp_selectedYear = document.getElementById('tpDate-SY').value;

				document.getElementById('tpDateBody').innerHTML = __CAL_QUERY(__tmp_selectedYear, s);				
			}

			angular.element(document.querySelector('#tpDate-SM')).on('change', function() {
				__onChange_Month(this.value);
			});

			angular.element(document.querySelector('#tpDate-SY')).on('change', function() {
				__onChange_Year(this.value);
			});

			// Add readonly to textbox
			el.attr('readonly', true);

			el.on('click', function() {
				var __selector = document.getElementById('tpDatePicker');

				__selector.style.display == ''? __selector.style.display = 'table' : __selector.style.display = '';				

				$rootScope.$broadcast('$tpDatePickerReady');
			});

			var __query__selection = document.getElementsByClassName('tpDate_selection');
			
			var tpDateOptions = $parse(attr.tpDatePicker)();

			for(var i=0; i < __query__selection.length; i++) {
				__query__selection[i].addEventListener('click', function() {
					var __selectedDate = parseInt(this.innerHTML);
					__selectedDate = __selectedDate < 10? '0'+__selectedDate : __selectedDate;

					var __selectedMonth = parseInt(document.getElementById('tpDate-SM').value) + 1;
					__selectedMonth  = __selectedMonth < 10? '0'+__selectedMonth : __selectedMonth;

					var __selectedYear = parseInt(document.getElementById('tpDate-SY').value)
					__selectedYear = __selectedYear < 10? '0'+__selectedYear : __selectedYear;

					if(tpDateOptions.format == 'DD-MM-YYYY') {
						el[0].value = __selectedDate+'-'+__selectedMonth+'-'+__selectedYear;
					}
				});
			}
		}
	}
})