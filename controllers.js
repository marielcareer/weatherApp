// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
	$scope.city = cityService.city;
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});
}]);
weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams',
 function($scope, cityService, $resource, $routeParams) {
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || '2';
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast", {callback: 'JSON_CALLBACK'}, {get:{method:"JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city + ",us", appid:'4a11d5f7408c33f2e97f98d53323a146' }, 
    	function(response) {
    	$scope.weatherArr = response.list;
    	$scope.managementData($scope.weatherArr);
    });

	$scope.managementData = function(arr) {
		//put a fake data
		arr.push({dt_txt: '1'});
		
		var date = arr[0].dt_txt.split(" ")[0];
		var temp = 0.0;
		var clearWeatherArr = [];
		var daynums = 0;
		var count = $scope.days;
		arr.map(function(el) {	
			var time = el.dt_txt;
			var cur = time.split(" ")[0];
			if (cur === date) {
				temp += el.main.temp;
				daynums++;
			} else {
				if (count > 0) {
					count--;
					clearWeatherArr.push({dt: date, temp: Math.round(temp / daynums) });
					temp = 0.0;
					date = cur;
					daynums = 0;
				}	
			}
			
		});
		$scope.weatherArr = clearWeatherArr;
		
	}
	$scope.convertToStandard = function(degK) {
		return Math.round((1.8 * (degK - 273)) + 32);
	}
	$scope.convertToDate = function(dt) {
		return dt;
	}
	
}]);