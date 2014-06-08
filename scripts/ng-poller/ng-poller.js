/**
 * Created by abhik.mitra on 05/06/14.
 */

(function (angular) {
    'use strict';
    var app = angular.module('ngPoller', []);
    app.factory('ngPoller', ['$rootScope', '$interval', '$q', function ($rootScope, $interval, $q) {

        var Poller = function (pollingFunction, checkerFunction, interval, count, pollerName) {

            this.pollingFunction = pollingFunction;
            this.checkerFunction = checkerFunction;
            this.interval = interval;
            this.count = count;
            this.name = pollerName;

        };
        Poller.prototype = (function () {
            /*jshint validthis:true */
            var count = 0, deferred, timer;

            function startPolling() {
                deferred = $q.defer();
                var setUpPollerB = angular.bind(this, setUpPoller);
                timer = $interval(setUpPollerB, this.interval, this.count);
                return deferred.promise;

            }
            function stopPolling() {
                $interval.cancel(timer);
                deferred.reject({
                    cancelled: true
                });

            }

            function setUpPoller() {
                var self = this;
                this.pollingFunction().then(function (result) {
                    count++;
                    if (self.checkerFunction(result)) {
                        $interval.cancel(timer);
                        deferred.resolve(result);
                    } else {
                        deferred.notify(result);
                        if (count === self.count) {
                            deferred.reject();
                        }
                    }
                }, function (error) {

                });
            }

            return {

                startPolling: startPolling,
                stopPolling: stopPolling

            };
        })();

        return function (pollingFunction, checkerFunction, interval, count, pollerName) {
            return new Poller(pollingFunction, checkerFunction, interval, count, pollerName);
        };


    }]);


})(angular);

