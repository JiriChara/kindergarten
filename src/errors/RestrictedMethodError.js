export default function RestrictedMethodError(message) {
  this.name = 'RestrictedMethodError';
  this.message = message;
}

RestrictedMethodError.prototype = Error.prototype;
