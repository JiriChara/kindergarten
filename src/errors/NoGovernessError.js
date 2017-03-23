export default function NoGovernessError(message) {
  this.name = 'NoGovernessError';
  this.message = message || 'Governess must be an instance of HeadGoverness.';
}

NoGovernessError.prototype = Error.prototype;
