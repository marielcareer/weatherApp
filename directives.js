
//DIRECTIVES
weatherApp.directive('weatherReport', function() {
	return {
		retrict: 'E',
		templateUrl: 'directives/weatherReport.html',
		replace: true,
		scope: {
			weatherDay: "=",
			convertToStandard: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	}
});