export default function NoExposedMethodError(message) {
  this.name = 'NoExposedMethodError';
  this.message = message;
}

NoExposedMethodError.prototype = Error.prototype;
