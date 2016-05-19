export default function AccessDenied(message) {
  this.name = 'AccessDenied';
  this.message = message;
}

AccessDenied.prototype = Error.prototype;
