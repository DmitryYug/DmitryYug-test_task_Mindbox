import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, List} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {TasksType} from "../state/tasks-reducer";

export type TaskPropsType = {
    task: TasksType
    onRemoveTask: (taskId: string) => void
    checkBoxOnChangeHandler: (taskId: string, value: boolean) => void
}

export const Task = (props: TaskPropsType) => {

    const onRemoveTask = () => {
        props.onRemoveTask(props.task.id)
    }
    const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.checkBoxOnChangeHandler(props.task.id, e.currentTarget.checked)
    }

    return (
        <div>
            <Checkbox
                checked={props.task.isDone}
                onChange={checkBoxOnChangeHandler}
                inputProps={{'aria-label': 'controlled'}}
            />
            <span>{props.task.title}</span>
            <IconButton onClick={onRemoveTask}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </div>
    )
}