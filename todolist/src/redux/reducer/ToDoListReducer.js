import { add_task, delete_task, done_task, edit_task, get_task, reject_task } from "../types/ToDoListTypes"

const initialState = {
    taskList: [
       
    ],
    taskEdit:{ taskName: 'task 1', done: true },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case get_task: {
            state.taskList = action.taskList;
            return { ...state }
        }
        case add_task: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.dataTask.taskName)
            if (!index) {
                alert('task name already');
                return { ...state }
            }
            taskListUpdate.push(action.dataTask);
            state.taskList = taskListUpdate;
            return { ...state }
        }
        case done_task: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.taskID)
            if (index !== -1) {
                taskListUpdate[index].status = true;
            }
            state.taskList = taskListUpdate;
            return { ...state }
        }
        case delete_task: {
            let taskListUpdate = [...state.taskList];
            taskListUpdate = taskListUpdate.filter(task => task.taskName !== action.taskID)
            state.taskList = taskListUpdate
            return { ...state }
        }
        case edit_task:{
            state.taskEdit = action.taskID;
            return {...state}
        }
        case reject_task:{
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task=>task.taskName === action.taskID)
            if(index!==-1){
                taskListUpdate[index].status=false;
            }
        }
        default:
            return { ...state }
    }
}
