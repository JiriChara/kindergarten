const Kindergarten = require('../lib/kindergarten');

import { Perimeter } from '../lib/kindergarten/perimeter';
import { Sandbox } from '../lib/kindergarten/sandbox';
import { HeadGoverness } from '../lib/kindergarten/governesses/head-governess';
import { EasyGoverness } from '../lib/kindergarten/governesses/easy-governess';
import { StrictGoverness } from '../lib/kindergarten/governesses/strict-governess';
import { GermanGoverness } from '../lib/kindergarten/governesses/german-governess';
import { Rule } from '../lib//kindergarten/rule';
import { Purpose } from '../lib//kindergarten/purpose';
import { Logger } from '../lib/kindergarten/logger';
import { VERSION } from '../lib/kindergarten/version';
import {
  AccessDenied,
  ArgumentError,
  NoExposedMethodError,
  NoPurposeError,
  NoSanboxError,
  RestrictedMethodError,
  WrongRuleDefinition
} from '../lib/kindergarten/errors';

describe('Kindergarten', function () {
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

  describe('exposed errors', function () {
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

    it('exposes NoSanboxError', function () {
      expect(this.Kindergarten.NoSanboxError).toBe(NoSanboxError);
      expect(this.Kindergarten.NoSanboxError).toBeDefined();
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

  describe('sandbox() method', function () {
    beforeEach(function () {
      this.child = {};
    });

    it('returns new sandbox', function () {
      expect(Kindergarten.sandbox(this.child) instanceof Sandbox).toBe(true);
    });

    it('calls Sandbox with child', function () {
      spyOn(Kindergarten, 'Sandbox');
      Kindergarten.sandbox(this.child);
      expect(Kindergarten.Sandbox).toHaveBeenCalledWith(this.child);
    });
  });
});
