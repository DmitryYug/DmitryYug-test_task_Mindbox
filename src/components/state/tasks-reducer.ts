import {v1} from "uuid";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}


type tasksReducerACTypes =
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof CheckBoxChangeAC>
    | ReturnType<typeof ClearCompletedTasksAC>


let initialState: TasksType[] = [
    {id: v1(), title: 'Test task', isDone: true},
    {id: v1(), title: 'Try my interface', isDone: false}
]


export const tasksReducer = (state: TasksType[] = initialState, action: tasksReducerACTypes) => {
    switch (action.type) {
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.newTaskValue, isDone: false}
            return [newTask, ...state]
        }
        case "REMOVE-TASK": {
            return [...state.filter(task => task.id !== action.taskId)]
        }
        case "CHECKBOX-CHANGE": {
            return state.map(task =>
                task.id === action.taskId
                    ? {...task, isDone: action.checked}
                    : task
            )
        }
        case "CLEAR-COMPLETED": {
            return [...state.filter(task => !task.isDone)]
        }
        default:
            return state
    }
}
export const AddTaskAC = (newTaskValue: string) => ({type: 'ADD-TASK', newTaskValue} as const)
export const RemoveTaskAC = (taskId: string) => ({type: 'REMOVE-TASK', taskId} as const)
export const CheckBoxChangeAC = (taskId: string, checked: boolean) => ({
    type: 'CHECKBOX-CHANGE',
    taskId,
    checked
} as const)
export const ClearCompletedTasksAC = () => ({type: 'CLEAR-COMPLETED'} as const)

