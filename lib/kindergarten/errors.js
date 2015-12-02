// List of possible errors sorted alphabetically

/**
 * AccessDenied Error
 */
export function AccessDenied(message) {
  this.name = 'AccessDenied';
  this.message = message;
}
AccessDenied.prototype = new Error();

/**
 * ArgumentError Error
 */
export function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message;
}
ArgumentError.prototype = new Error();

/**
 * NoExposedMethod Error
 */
export function NoExposedMethodError(message) {
  this.name = 'NoExposedMethodError';
  this.message = message;
}
NoExposedMethodError.prototype = new Error();

/**
 * NoPurposeError Error
 */
export function NoPurposeError(message) {
  this.name = 'NoPurposeError';
  this.message = message || 'Perimeter must have a purpose.';
}
NoPurposeError.prototype = new Error();

/**
 * NoSanboxError Error
 */
export function NoSanboxError(message) {
  this.name = 'NoSanboxError';
  this.message = message || 'Perimeter must be imported into a sandbox.';
}
NoSanboxError.prototype = new Error();

/**
 * RestrictedMethodError Error
 */
export function RestrictedMethodError(message) {
  this.name = 'RestrictedMethodError';
  this.message = message;
}
RestrictedMethodError.prototype = new Error();

/**
 * WrongRuleDefinition Error
 */
export function WrongRuleDefinition(message) {
  this.name = 'WrongRuleDefinition';
  this.message = message;
}
WrongRuleDefinition.prototype = new Error();
