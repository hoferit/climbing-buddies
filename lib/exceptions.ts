export class AuthRequiredError extends Error {
  constructor(message = 'You need to be logged in.') {
    super(message);
    this.name = 'AuthRequiredError';
  }
}
