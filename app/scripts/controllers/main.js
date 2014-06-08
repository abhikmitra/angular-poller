'use strict';

angular.module('ngPollerApp')
    .controller('MainCtrl', function ($scope, ngPoller, $http, $q) {
        var poller = ngPoller(getWeather, checkIfHumidityOver40, 5000, 20, "Weather Poller");
        $scope.polling = false;
        $scope.startPolling = function(){
            $scope.polling = true;
            poller.startPolling().then(function(){
                alert("Its humid today. Polling stopped");
            },function(){
                alert("Polling stopped");
            },function(){
                console.log("Still humid today. Polling Continues");
            })
        };
        $scope.stopPolling = function(){
            $scope.polling = false;
            poller.stopPolling();
        }
        function checkIfHumidityOver40(data) {
            return data.current_condition[0].humidity > 40
        }

        function getWeather(data) {
            var deferred = $q.defer();
            $http(
                {
                    method: 'GET',
                    url: 'http://api.worldweatheronline.com/free/v1/weather.ashx',
                    params: {
                        q: "london",
                        key: "ff5ff316002504587eb364ad70d55e200479eee1",
                        format: "json"
                    }
                }).success(function(data){
                    deferred.resolve(data.data);
                })
            return deferred.promise;
        }

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
