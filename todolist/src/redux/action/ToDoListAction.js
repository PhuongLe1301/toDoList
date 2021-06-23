import { add_task, delete_task, done_task, edit_task, get_task, reject_task } from "../types/ToDoListTypes";
import axios from 'axios'


export const getTaskAction = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            })
            dispatch({
                type: get_task,
                taskList: result.data
            })
            console.log('result', result.data)
        }
        catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const addTaskAction = (dataTask) => {

    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: dataTask
            });
            dispatch({
                type: add_task,
                dataTask
            })
            console.log('result', result.data)
        }
        catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}
export const doneTaskAction = (taskID) => {

    return async dispatch => {
        try {
            const result = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskID}`,
                method: 'PUT',
                data: taskID
            });
            dispatch({
                type: done_task,
                taskID
            })
            console.log('result', result.data)
        }
        catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}
export const deleteTaskAction = (taskID) => {

    return async dispatch => {
        try {
            const result = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskID}`,
                method: 'DELETE'
            })
            dispatch({
                type: delete_task,
                taskID
            })
        }
        catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}
export const editTaskAction = (taskID) => {
    return{
        type : edit_task,
        taskID
    }
}

export const rejectTaskAction = (taskID)=>{
    // return{
    //     type:reject_task,
    //     taskID
    // }
    return async dispatch =>{
        try{
            const result = await axios({
                url:`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskID}`,
                method:'PUT'
            })
            dispatch({
                type:reject_task,
                taskID
            })
        }
        catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}