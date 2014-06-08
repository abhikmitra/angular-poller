/**
 * Created by abhik.mitra on 08/06/14.
 */
/**
 * Created by abhik.mitra on 05/06/14.
 */
describe('Service: ngPoller', function () {

    // load the controller's module
    beforeEach(module('ngPoller'));
    var mockDeferred, mockPoller, $qMock, rootscope, $interval;


    var mockFn = {
        fetch: function (noofitemsDisplayed, noOfitemsTofetch) {

            mockDeferred = $qMock.defer();
            return  mockDeferred.promise;
        }
    }

    beforeEach(function () {



        inject(function ($injector, $q, $rootScope, _$interval_) {
            mockPoller = $injector.get('ngPoller');
            $qMock = $q;
            rootscope = $rootScope.$new();
            $interval = _$interval_;

        });
    });


    it('should resolve the deferred on success', function () {
        spyOn(mockFn, "fetch").andCallThrough();
        var deferred, isInvoked = 0;

        var poller = mockPoller(function () {
            deferred = $qMock.defer();
            return deferred.promise;
        }, function () {
            return true;
        }, 10, 5, "testPoller");
        var promise = poller.startPolling();
        promise.then(function () {
            isInvoked = 1;
        });

        rootscope.$root.$digest();
        $interval.flush(11);
        deferred.resolve({

        });
        rootscope.$root.$digest();
        expect(isInvoked).toBe(1);


    });
    it('should resolve the deferred only on success and not on failure', function () {
        spyOn(mockFn, "fetch").andCallThrough();
        var deferred, isInvoked = 0;
        var count = 0;
        var poller = mockPoller(function () {
            deferred = $qMock.defer();
            return deferred.promise;
        }, function () {
            count++;
            if (count === 3) {
                return true;
            } else {
                return false;
            }
        }, 10, 5, "testPoller");
        var promise = poller.startPolling();
        promise.then(function () {
            isInvoked++;
        });

        $interval.flush(11);

        deferred.resolve({

        });
        rootscope.$root.$digest();
        $interval.flush(11);

        deferred.resolve({

        });
        rootscope.$root.$digest();
        $interval.flush(11);

        deferred.resolve({

        });
        rootscope.$root.$digest();
        expect(isInvoked).toBe(1);


    });


});