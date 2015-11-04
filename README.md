### tpDatePicker for AngularJS
- - - - - - - - - - - -
Responsive DatePicker for AngularJS, this build adapt from tpScript datepicker module for jQuery, you can see the project in my repos.

### Usage
- - - - - - - -
```
Copy ngDatePicker required script you can check minify version or normal one in dist build
Then add attribute in textbox or div/blocks section tp-date-picker
You may add options in attribute element check options list for more info
```

### Options List
- - - - - - - - - -
```html
	<input type="text" tp-date-picker="{'format': 'DD-MM-YYYY'}" />
```

```
format: date formatting
holiday: default-> false (set true to add holiday) **
maxYear: set max year **
minYear: set min year **

Allowed Format:
* DD-MM-YYYY (e.g. 01-01-2015)
* DD M YYYY (e.g. 01 January 2015) **

```

NB:
** = Next build

### Changelogs
- - - - - - - - - -
##### Version 0.2-a5:
* Fix bug->calendar not closing after picked date
* Fix bug->value of undefined after selecting date because of 'for' loop bad args
* Fix bug->current year default index after first-child of element (e.g. child(0) == 2015 child(1) == 2014)
* Add function __setElementIndex and used window variable instead of $rootScope
* Remove $rootScope.__tpDateIndex -> window.tpDatePicker.activeIndex

##### Version 0.2-a1-a4:
* Add CSS styling for Calendar to make it look prettier
* Add animation hover when selecting date
* Optimize angularJS dependency, global vars with using $rootScope changed into window vars
* Updated IDs to classes, so it can be use for multiple elements

##### Version 0.1-initial:
* Initial Build (Single element using IDs)

#### Development Usage
- - - - - - - - - - - - -
* Make sure you already install NodeJS in your computer system
* Run npm install - command
* Then run gulp (default) to clean distribution folder
* Next, run gulp development or gulp release

- - - - - - - - - - - - - - -
##### Copyrights
*Copyright 2015 to Triadi Prabowo, triadiprabowo.com / triadiprabowo@gmail.com*
