import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active'| 'completed'

function App() {
    // BLL
    const todoListTitle: string = 'What to learn'

    const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
        {id:1, title: 'HTML & CSS', isDone: true},
        {id:2, title: 'JS & ES6', isDone: true},
        {id:3, title: 'React & TS', isDone: false},
    ])


    const removeTask = (taskId: number) => {
        setTasksForTodoList (tasksForTodoList.filter(task => task.id !==taskId))
    }
    const [filter, setFilter] = useState<FilterValuesType>('completed')
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
      
    }
    let filteredTasks = tasksForTodoList
    if (filter === 'active'){
        filteredTasks = tasksForTodoList.filter(t => t.isDone === false)
    }
    if (filter === 'completed'){
        filteredTasks = tasksForTodoList.filter(t => t.isDone === true)
    }

    // GUI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
