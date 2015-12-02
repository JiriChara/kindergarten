import {
  AllowedMethodsService
} from '../../../lib/kindergarten/utils/allowed-methods-service';

describe('AllowedMethodsService', function() {
  beforeEach(function() {
    this.myDummy1 = {
      foo: 'bar',
      bar: function() {}
    };

    this.AllowedMethodsService = AllowedMethodsService;
    this.allowedMethodsService = new AllowedMethodsService(this.myDummy1);
  });

  describe('constructor', function() {
    it('it stores a reference to dummy object', function() {
      expect(this.allowedMethodsService.dummyObj).toBe(this.myDummy1);
    });
  });

  describe('_restrictedMethods', function() {
    it('returns array of properties and methods of the object', function() {
    });
  });
});
