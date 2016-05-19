export default function NoPurposeError(message) {
  this.name = 'NoPurposeError';
  this.message = message || 'Perimeter must have a purpose.';
}

NoPurposeError.prototype = Error.prototype;
