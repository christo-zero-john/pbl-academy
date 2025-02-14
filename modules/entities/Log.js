// Log is a global object that can be used to track logs during different operations
export class Log {
  constructor() {
    this.message = [];
  }
  push(message) {
    this.message.push(message);
  }
}
