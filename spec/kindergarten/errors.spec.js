import {
  AccessDenied,
  ArgumentError,
  NoPurposeError,
  NoSandboxError,
  RestrictedMethodError,
  WrongRuleDefinition
} from '../../src/kindergarten/errors';

describe('errors', () => {
  describe('AccessDenied', () => {
    beforeEach(function () {
      this.AccessDenied = AccessDenied;
    });

    it('has name AccessDenied', function () {
      expect((new this.AccessDenied()).name).toEqual('AccessDenied');
    });

    it('accepts message', function () {
      const msg = 'foo';
      expect((new this.AccessDenied(msg)).message).toEqual(msg);
    });

    it('iherits from Error', function () {
      expect((new this.AccessDenied()) instanceof Error).toBe(true);
    });

    it('has default message', function () {
      expect((new this.AccessDenied()).message).toBeUndefined();
    });
  });

  describe('ArgumentError', () => {
    beforeEach(function () {
      this.ArgumentError = ArgumentError;
    });

    it('has name ArgumentError', function () {
      expect((new this.ArgumentError()).name).toEqual('ArgumentError');
    });

    it('accepts message', function () {
      const msg = 'foo';
      expect((new this.ArgumentError(msg)).message).toEqual(msg);
    });

    it('iherits from Error', function () {
      expect((new this.ArgumentError()) instanceof Error).toBe(true);
    });

    it('has default message', function () {
      expect((new this.ArgumentError()).message).toBeUndefined();
    });
  });

  describe('NoPurposeError', () => {
    beforeEach(function () {
      this.NoPurposeError = NoPurposeError;
    });

    it('has name NoPurposeError', function () {
      expect((new this.NoPurposeError()).name).toEqual('NoPurposeError');
    });

    it('accepts message', function () {
      const msg = 'foo';
      expect((new this.NoPurposeError(msg)).message).toEqual(msg);
    });

    it('iherits from Error', function () {
      expect((new this.NoPurposeError()) instanceof Error).toBe(true);
    });

    it('has default message', function () {
      expect((new this.NoPurposeError()).message).toBe('Perimeter must have a purpose.');
    });
  });

  describe('NoSandboxError', () => {
    beforeEach(function () {
      this.NoSandboxError = NoSandboxError;
    });

    it('has name NoSandboxError', function () {
      expect((new this.NoSandboxError()).name).toEqual('NoSandboxError');
    });

    it('accepts message', function () {
      const msg = 'foo';
      expect((new this.NoSandboxError(msg)).message).toEqual(msg);
    });

    it('iherits from Error', function () {
      expect((new this.NoSandboxError()) instanceof Error).toBe(true);
    });

    it('has default message', function () {
      expect((new this.NoSandboxError()).message).toBe(
        'Perimeter must be imported into a sandbox.'
      );
    });
  });

  describe('RestrictedMethodError', () => {
    beforeEach(function () {
      this.RestrictedMethodError = RestrictedMethodError;
    });

    it('has name RestrictedMethodError', function () {
      expect((new this.RestrictedMethodError()).name).toEqual('RestrictedMethodError');
    });

    it('accepts message', function () {
      const msg = 'foo';
      expect((new this.RestrictedMethodError(msg)).message).toEqual(msg);
    });

    it('iherits from Error', function () {
      expect((new this.RestrictedMethodError()) instanceof Error).toBe(true);
    });

    it('has default message', function () {
      expect((new this.RestrictedMethodError()).message).toBeUndefined();
    });
  });

  describe('WrongRuleDefinition', () => {
    beforeEach(function () {
      this.WrongRuleDefinition = WrongRuleDefinition;
    });

    it('has name WrongRuleDefinition', function () {
      expect((new this.WrongRuleDefinition()).name).toEqual('WrongRuleDefinition');
    });

    it('accepts message', function () {
      const msg = 'foo';
      expect((new this.WrongRuleDefinition(msg)).message).toEqual(msg);
    });

    it('iherits from Error', function () {
      expect((new this.WrongRuleDefinition()) instanceof Error).toBe(true);
    });

    it('has default message', function () {
      expect((new this.WrongRuleDefinition()).message).toBeUndefined();
    });
  });
});
