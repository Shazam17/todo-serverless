import {createTask} from "../use_cases/createTask";

export class TaskController {

    constructor() {

    }

    createTask(req,res,next){
        const { title, desc, taskId } = req.body;
        createTask()
    }

}

