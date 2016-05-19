export default function NoSandboxError(message) {
  this.name = 'NoSandboxError';
  this.message = message || 'Perimeter must be imported into a sandbox.';
}

NoSandboxError.prototype = Error.prototype;
