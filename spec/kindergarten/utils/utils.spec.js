import { _ } from 'lodash';

import {
  isGoverness,
  isSandbox
} from '../../../src/kindergarten/utils/utils';

import FactoryGirl from '../../support/factory-girl';

describe('utils', () => {
  describe('isGoverness', () => {
    it('should return true if given arg is a governess', () => {
      _.each([
        new (new FactoryGirl('HeadGoverness'))({}),
        new (new FactoryGirl('StrictGoverness'))({}),
        new (new FactoryGirl('EasyGoverness'))({}),
        new (new FactoryGirl('GermanGoverness'))({})
      ], (s) => {
        expect(isGoverness(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a governess', () => {
      _.each([
        null, undefined, [], 1, 0, -1, function () {}, {},
        new FactoryGirl('Sandbox')
      ], (s) => {
        expect(isGoverness(s)).toBe(false);
      });
    });
  });

  describe('isSandbox', () => {
    it('should return true if given arg is a sandbox', () => {
      _.each([
        new (new FactoryGirl('Sandbox'))({})
      ], (s) => {
        expect(isSandbox(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a sandbox', () => {
      _.each([
        null, undefined, [], 1, 0, -1, function () {}, {},
        new FactoryGirl('GermanGoverness')
      ], (s) => {
        expect(isSandbox(s)).toBe(false);
      });
    });
  });
});
