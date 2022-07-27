import React, {useState} from 'react';
import AddItemTextfield from "./components/add-item-textfield/AddItemTextfield";
import {Button, ButtonGroup, Paper} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "./components/state/store";
import {
    AddTaskAC,
    CheckBoxChangeAC,
    ClearCompletedTasksAC,
    RemoveTaskAC,
    TasksType
} from "./components/state/tasks-reducer";
import {Task} from "./components/task/task";
import styles from './App.module.css'

type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [filter, setFilter] = useState<FilterValueType>('all')
    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasksReducer)

    const dispatch = useDispatch()

    const onClickAddTask = (newItemValue: string) => {
        dispatch(AddTaskAC(newItemValue))
    }
    const onRemoveTask = (taskId: string) => {
        dispatch(RemoveTaskAC(taskId))
    }
    const checkBoxOnChangeHandler = (taskId: string, checked: boolean) => {
        dispatch(CheckBoxChangeAC(taskId, checked))
    }

    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }
    const onFilterHandler = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const clearCompleted = () => {
        dispatch(ClearCompletedTasksAC())
    }


    const taskElements = tasks.map(task => {
        return <Task
            key={task.id}
            task={task}
            onRemoveTask={onRemoveTask}
            checkBoxOnChangeHandler={checkBoxOnChangeHandler}
        />
    })
    const activeTasksCount = tasks.filter(task => !task.isDone).length

    return (
        <Paper elevation={10} className={styles.container}>
            <h1>Todolist</h1>
            <AddItemTextfield addItem={onClickAddTask}/>
            <div className={styles.tasksContainer}>
                {taskElements}
            </div>
            <div className={styles.flexContainer}>
                <span className={styles.leftItems}>{activeTasksCount} uncompleted tasks</span>
            </div>
            <ButtonGroup aria-label="medium secondary button group">
                <Button size="small" variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => onFilterHandler('all')}>all</Button>
                <Button size="small" variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => onFilterHandler('active')}>active</Button>
                <Button size="small" variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => onFilterHandler('completed')}>completed</Button>
                <Button size="small" variant='outlined'
                        onClick={clearCompleted}>clear completed</Button>
            </ButtonGroup>
        </Paper>
    );
}

export default App;
