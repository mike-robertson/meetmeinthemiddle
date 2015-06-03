'use strict';

describe('Service: distanceService', function () {

  // load the service's module
  beforeEach(module('meetmeinthemiddleApp'));

  // instantiate service
  var distanceService;
  beforeEach(inject(function (_distanceService_) {
    distanceService = _distanceService_;
  }));

  it('should do something', function () {
    expect(!!distanceService).toBe(true);
  });

});
