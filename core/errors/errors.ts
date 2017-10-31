export class core_error implements Error {
    public name = 'app_error';
  
    constructor(public message: string) {
  
    }
  
    toString() {
      return this.name + ': ' + this.message;
    }
}

export class input_error extends core_error {
    public name = "imput_error"
}

export class response_error extends core_error {
    public name = "response_error"
}

export class missing_entity extends core_error {
    public name = "missing_entity"

}