import {_} from 'lodash';

import {Purpose} from '../../lib/kindergarten/purpose';
import {Sandbox} from '../../lib/kindergarten/sandbox';

xdescribe('Purpose', function() {
  beforeEach(function() {
    this.Purpose = Purpose;
    this.sandbox = new Sandbox({});
  });

  describe('RESTRICTED_METHOD_NAMES', function() {
    it('contains `constructor`', function() {
      expect(_.contains(this.Purpose.RESTRICTED_METHOD_NAMES, 'constructor')).toBe(true);
    });

    it('contains `addPerimeter`', function() {
      expect(_.contains(this.Purpose.RESTRICTED_METHOD_NAMES, 'addPerimeter')).toBe(true);
    });
  });

  describe('constructor', function() {
    beforeEach(function() {
      this.purposeName = 'foo';
      this.purpose = new this.Purpose(this.purposeName, this.sandbox);
    });

    it('stores reference to name', function() {
      expect(this.purpose.name).toEqual(this.purposeName);
    });

    it('stores reference to sandbox', function() {
      expect(this.purpose.sandbox).toBe(this.sandbox);
    });

    it('initializes methods to empty object', function() {
      expect(this.purpose.methods).toEqual({});
    });
  });

  describe('addPerimeter() method', function() {
  });
});
