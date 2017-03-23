export default function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message;
}

ArgumentError.prototype = Error.prototype;
