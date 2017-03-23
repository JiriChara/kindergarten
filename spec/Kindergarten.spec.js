import Kindergarten from '../src';
import Logger from '../src/Logger';
import Perimeter from '../src/Perimeter';
import Purpose from '../src/Purpose';
import Sandbox from '../src/Sandbox';
import Rule from '../src/Rule';
import VERSION from '../src/VERSION';

import {
  HeadGoverness,
  EasyGoverness,
  StrictGoverness,
  GermanGoverness
} from '../src/governesses';

import {
  AccessDenied,
  ArgumentError,
  NoExposedMethodError,
  NoPurposeError,
  NoSandboxError,
  RestrictedMethodError,
  WrongRuleDefinition
} from '../src/errors';

describe('Kindergarten', () => {
  beforeEach(function () {
    this.Kindergarten = Kindergarten;
  });

  it('exposes Perimeter', function () {
    expect(this.Kindergarten.Perimeter).toBe(Perimeter);
    expect(this.Kindergarten.Perimeter).toBeDefined();
  });

  it('exposes Sandbox', function () {
    expect(this.Kindergarten.Sandbox).toBe(Sandbox);
    expect(this.Kindergarten.Sandbox).toBeDefined();
  });

  it('exposes HeadGoverness', function () {
    expect(this.Kindergarten.HeadGoverness).toBe(HeadGoverness);
    expect(this.Kindergarten.HeadGoverness).toBeDefined();
  });

  it('exposes EasyGoverness', function () {
    expect(this.Kindergarten.EasyGoverness).toBe(EasyGoverness);
    expect(this.Kindergarten.EasyGoverness).toBeDefined();
  });

  it('exposes StrictGoverness', function () {
    expect(this.Kindergarten.StrictGoverness).toBe(StrictGoverness);
    expect(this.Kindergarten.StrictGoverness).toBeDefined();
  });

  it('exposes GermanGoverness', function () {
    expect(this.Kindergarten.GermanGoverness).toBe(GermanGoverness);
    expect(this.Kindergarten.GermanGoverness).toBeDefined();
  });

  it('exposes Rule', function () {
    expect(this.Kindergarten.Rule).toBe(Rule);
    expect(this.Kindergarten.Rule).toBeDefined();
  });

  it('exposes Purpose', function () {
    expect(this.Kindergarten.Purpose).toBe(Purpose);
    expect(this.Kindergarten.Purpose).toBeDefined();
  });

  it('exposes Logger', function () {
    expect(this.Kindergarten.Logger).toBe(Logger);
    expect(this.Kindergarten.Logger).toBeDefined();
  });

  it('exposes VERSION', function () {
    expect(this.Kindergarten.VERSION).toBe(VERSION);
    expect(this.Kindergarten.VERSION).toBeDefined();
  });

  describe('exposed errors', () => {
    it('exposes AccessDenied', function () {
      expect(this.Kindergarten.AccessDenied).toBe(AccessDenied);
      expect(this.Kindergarten.AccessDenied).toBeDefined();
    });

    it('exposes ArgumentError', function () {
      expect(this.Kindergarten.ArgumentError).toBe(ArgumentError);
      expect(this.Kindergarten.ArgumentError).toBeDefined();
    });

    it('exposes NoExposedMethodError', function () {
      expect(this.Kindergarten.NoExposedMethodError).toBe(NoExposedMethodError);
      expect(this.Kindergarten.NoExposedMethodError).toBeDefined();
    });

    it('exposes NoPurposeError', function () {
      expect(this.Kindergarten.NoPurposeError).toBe(NoPurposeError);
      expect(this.Kindergarten.NoPurposeError).toBeDefined();
    });

    it('exposes NoSandboxError', function () {
      expect(this.Kindergarten.NoSandboxError).toBe(NoSandboxError);
      expect(this.Kindergarten.NoSandboxError).toBeDefined();
    });

    it('exposes RestrictedMethodError', function () {
      expect(this.Kindergarten.RestrictedMethodError).toBe(RestrictedMethodError);
      expect(this.Kindergarten.RestrictedMethodError).toBeDefined();
    });

    it('exposes WrongRuleDefinition', function () {
      expect(this.Kindergarten.WrongRuleDefinition).toBe(WrongRuleDefinition);
      expect(this.Kindergarten.WrongRuleDefinition).toBeDefined();
    });
  });
});
