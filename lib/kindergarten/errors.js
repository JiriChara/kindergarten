// List of possible errors sorted alphabetically

/**
 * AccessDenied Error
 */
export function AccessDenied(message) {
  this.name = 'AccessDenied';
  this.message = message;
}
AccessDenied.prototype = Error.prototype;

/**
 * ArgumentError Error
 */
export function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message;
}
ArgumentError.prototype = Error.prototype;

/**
 * NoExposedMethodsError Error
 */
export function NoExposedMethodsError(message) {
  this.name = 'NoExposedMethodsError';
  this.message = message || 'Perimeter must expose some methods.';
}
NoExposedMethodsError.prototype = Error.prototype;

/**
 * NoPurposeError Error
 */
export function NoPurposeError(message) {
  this.name = 'NoPurposeError';
  this.message = message || 'Perimeter must have a purpose.';
}
NoPurposeError.prototype = Error.prototype;

/**
 * NoSanboxError Error
 */
export function NoSanboxError(message) {
  this.name = 'NoSanboxError';
  this.message = message || 'Perimeter must be imported into a sandbox.';
}
NoPurposeError.prototype = Error.prototype;

/**
 * RestrictedMethodError Error
 */
export function RestrictedMethodError(message) {
  this.name = 'RestrictedMethodError';
  this.message = message;
}
RestrictedMethodError.prototype = Error.prototype;

/**
 * WrongRuleDefinition Error
 */
export function WrongRuleDefinition(message) {
  this.name = 'WrongRuleDefinition';
  this.message = message;
}
WrongRuleDefinition.prototype = Error.prototype;
