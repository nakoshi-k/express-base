export class app_error implements Error {
  public name = 'app_error';

  constructor(public message: string) {

  }

  toString() {
    return this.name + ': ' + this.message;
  }
}

export class input_error extends app_error {

}
