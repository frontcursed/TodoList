import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteForeverOutlined} from "@material-ui/icons";

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
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksList = props.tasks.length
        ? <List>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                    const changeTaskTitle = (nextTitle: string) =>
                        props.changeTaskTitle(task.id, nextTitle, props.todoListId)
                    const isDoneClass = task.isDone ? 'isDone' : ''
                    return (
                        <ListItem
                            key={task.id}
                            className={isDoneClass}
                            style={{padding: '0'}}
                        >
                            <Checkbox
                                size={'small'}
                                color={'primary'}
                                checked={task.isDone}
                                onChange={changeTaskStatus}
                            />
                            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                            <IconButton
                                aria-label='delete-task'
                                onClick={removeTask}
                                size={'small'}>
                                <DeleteForeverOutlined />
                            </IconButton>
                        </ListItem>
                    )
                })
            }
        </List>
        : <span>Your list is empty</span>

    const changeFilterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const changeTitle = (nextTitle: string) => props.changeTodoListTitle(nextTitle, props.todoListId)
    const btnStyle = {marginRight: '2px'}

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTitle}/>
                <IconButton
                    aria-label='delete-todoList'
                    onClick={removeTodoList}>
                    <DeleteForeverOutlined />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} placeholder={'Add new task'}/>
            {tasksList}
            <div>
                <Button
                    style={btnStyle}
                    variant={'contained'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={changeFilterHandlerCreator('all')}
                >All
                </Button>
                <Button
                    style={btnStyle}
                    variant={'contained'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={changeFilterHandlerCreator('active')}
                >Active
                </Button>
                <Button
                    style={btnStyle}
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={changeFilterHandlerCreator('completed')}
                >Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;