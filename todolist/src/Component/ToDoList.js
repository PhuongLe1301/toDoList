import React, { useEffect } from 'react'
import { Container } from '../Container/Container'
import './ToDoList.css'
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { addTaskAction, deleteTaskAction, doneTaskAction, editTaskAction, getTaskAction, rejectTaskAction } from '../redux/action/ToDoListAction'
import { edit_task } from '../redux/types/ToDoListTypes';

export default function ToDoList(props) {
    const toDoList = useSelector(state => state.ToDoListReducer.taskList)
    const taskEdit = useSelector(state => state.ToDoListReducer.taskEdit)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            taskName: '',
            done: false
        },
        validationSchema: Yup.object().shape({
            taskName: Yup.string().required('Task Name không được bỏ trống!'),
        }),
        onSubmit: (dataTask) => {

            dispatch(addTaskAction(dataTask))
            console.log(dataTask);
        }
    })
    useEffect(() => {
        const action = getTaskAction()
        dispatch(action)
    }, [])
    const { handleChange, touched, errors } = formik;
    return (
        <Container className="w-50 bg-dark text-white" >
            <form onSubmit={formik.handleSubmit}>
                <div className="theme">
                    Dark Theme
                </div>
                <h5 className="pt-2">To do list</h5>
                <div>
                    <p>Task name</p>
                    <input value={taskEdit.taskName} className="w-50" name="taskName" onChange={handleChange} onBlur={formik.handleBlur}></input>
                    {touched.taskName && errors.taskName && <p className="text text-danger">{formik.errors.taskName}</p>}
                    <button type="submit" className="mx-2"><i class="fa fa-plus"></i> Add Task</button>
                    <button><i class="fa fa-upload"></i> Update Task</button>
                    <div className="taskName"></div>
                </div>
                <div>
                    <p>Task to do</p>
                    {toDoList.filter(task => !task.status).map((task, index) => {
                        return <div className="task" key={index}>
                            <p>{task.taskName}</p>
                            <div>
                                <button onClick={() => {
                                    dispatch(editTaskAction(task))
                                }}> <i class="fa fa-edit"></i></button>
                                <button onClick={() => {
                                    dispatch(doneTaskAction(task.taskName))
                                }} className="mx-2 mt-1">  <i class="fa fa-check"></i></button>
                                <button onClick={() => {
                                    dispatch(deleteTaskAction(task.taskName))
                                }}> <i class="fa fa-trash-alt"></i></button>
                            </div>
                        </div>
                    })}

                </div>
                <div>
                    <p>Task completed</p>
                    {toDoList.filter(task => task.status).map((task, index) => {
                        return <div className="task" key={index}>
                            <p>{task.taskName}</p>
                            <div>
                                <button onClick={() => {
                                    dispatch(rejectTaskAction(task.taskName))
                                }} className="mx-2 mt-1"><i class="fa fa-eject"></i></button>
                                <button onClick={() => {
                                    dispatch(deleteTaskAction(task.taskName))
                                }}> <i class="fa fa-trash-alt"></i></button>
                            </div>
                        </div>
                    })}
                </div>
            </form>
        </Container>
    )
}

