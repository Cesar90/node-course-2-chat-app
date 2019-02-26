var moment = require('moment');
//Jan 1st 1970: 00:00:10 am => 10000

/*var date = new Date();
var months = ['Jan','Feb'];
console.log(date.getMonth());*/

//var date = moment();
//date.add(1, 'year'); //add time to current time
//date.add(100,'year').subtract(9,'months');
//console.log(date.format('MMM Do, YYYY'));

// new Date().getTime();
var someTimes = moment().valueOf();
console.log();

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));