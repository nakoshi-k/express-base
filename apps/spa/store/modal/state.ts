import {state as core_state} from "../state";
export class state extends core_state{
    close = false;
    show = false;
    template = "";
    data = {
      id : "",
      name : ""
    }
}