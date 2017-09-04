import * as tasks from "../../routes/tasks";
describe('route_tasks', () =>  {
    
        let ci = require('chai');
        let assert = ci.assert;
    
        it("add", () => {
            let m = new tasks.tasks();
            m.add({},{},{});
        });

});    