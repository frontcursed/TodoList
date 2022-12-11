import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import todoList from "./TodoList";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    // BLL
    const id_1 = v1()
    const id_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: id_1, title: 'What to learn?', filter: 'all'},
        {id: id_2, title: 'What to buy?', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [id_1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS & ES6', isDone: true},
            {id: v1(), title: 'React & TS', isDone: false}
        ],
        [id_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Meet', isDone: true},
            {id: v1(), title: 'Wheat', isDone: false}
        ],
    })


    const removeTask = (taskId: string, todoListId: string) => {
        /*        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
                const updatedTasks: Array<TaskType> = tasksForUpdate.filter(task => task.id !== taskId)
                const copyTasks = {...tasks}
                copyTasks[todoListId] = updatedTasks
                setTasks(copyTasks)
                //*/
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)
        })

    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        /*        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
                const updatedTasks: Array<TaskType> = [newTask, ...tasksForUpdate]
                const copyTasks = {...tasks}
                copyTasks[todoListId] = updatedTasks
                setTasks(copyTasks)*/
        setTasks({
            ...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        })
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        /* const tasksForUpdate: Array<TaskType> = tasks[todoListId]
         const updatedTasks: Array<TaskType> = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
         const copyTasks = {...tasks}
         copyTasks[todoListId] = updatedTasks
         setTasks(copyTasks)*/

        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }
    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasks
        if (filterValue === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }
    const todoListsComponents = todoLists.map((tl: TodoListType) => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <TodoList
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })

    // GUI:
    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
