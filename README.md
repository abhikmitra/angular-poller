ngPoller
=========

Angular Service for polling URLs . It starts polling and continues polling till a condition is fulfilled.Additional options such as interval and maximum number of times to pull can be configured

###ngPoller is a factory###

###Component Name :  ngPoller###
Component Description: For regular polling of services till a condition is fulfilled.
----
###Input : ###

* Signature : fkPoller(pollingFunction, checkerFunction, interval, count, pollerName)
* pollingFunction : The function that will be executed every interval. Typically this function will be on your model/controller.
* checkerFunction : The function that will execute after the polling function is resolved.The deferred returned by the polling function is passed to the checker function to check whether our condition is satisfied.This will be typically in your controller.Even if the checker function fails the deferred is notified.
* count : The max number of polling to be done. If none of the time the checker function returned true then it will reject the deferred

----
###Output :###

                StartPolling() returns a deferred which is resolved when the checker function returns true.
###Additional Features###
                StartPolling() : Starts the poller. Retuns a deferred
                StopPolling() : Stops the poller and rejects the deferred.
###Interface/Events###
No events ,Uses deferreds/Promises for communication
###Prerequisites: (Format of data that need to be passed) ###
        pollingFunction should return a deferred.
        checkerFunction should return true or false.
