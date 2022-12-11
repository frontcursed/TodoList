import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState('')
    const tasksList = props.tasks.length
        ? <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                    const isDoneClass = task.isDone ? 'isDone' : ''
                    return (
                        <li key={task.id} className={isDoneClass}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={changeTaskStatus}
                            />
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your list is empty</span>

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const changeFilterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter, props.todoListId)
    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const allBtnClass = props.filter === 'all' ? 'btn-active' : ''
    const activeBtnClass = props.filter === 'active' ? 'btn-active' : ''
    const completedBtnClass = props.filter === 'completed' ? 'btn-active' : ''

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>X</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onKeyDownEnterAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{fontWeight: 'bold', color: 'red'}}>Title is required</div>}
            </div>
            {tasksList}
            <div>
                <button
                    className={allBtnClass}
                    onClick={changeFilterHandlerCreator('all')}
                >All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={changeFilterHandlerCreator('active')}
                >Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={changeFilterHandlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;