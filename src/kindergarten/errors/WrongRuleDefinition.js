export default function WrongRuleDefinition(message) {
  this.name = 'WrongRuleDefinition';
  this.message = message;
}

WrongRuleDefinition.prototype = Error.prototype;
