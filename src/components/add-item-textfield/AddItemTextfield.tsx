import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from './AddItemTextfield.module.css'

type AddItemInputProps = {
    addItem: (newItemValue: string) => void
}

const AddItemTextfield: React.FC<AddItemInputProps> = ({addItem}) => {
    let [newItemValue, setNewItem] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewItem(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newItemValue.trim() === '') {
                setError(true)
                return
            } else {
                setError(false)
            }
            addItem(newItemValue)
            setNewItem('')
        }
    }
    const addItemOnclickHandler = () => {
        if (newItemValue.trim() === '') {
            setError(true)
            return
        } else {
            setError(false)

        }
        addItem(newItemValue)
        setNewItem('')
    }
    const onBlurHandler = () => {
        setError(false)
    }

    return (
        <div>
            <TextField
                error = {error}
                id={error ? "outlined-error" : 'outlined'}
                label={error ? 'empty input' : 'new task'}
                defaultValue="Hello World"
                value={newItemValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={onBlurHandler}
                size='small'
            />
            <Button onClick={addItemOnclickHandler} variant="contained"
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
                <AddIcon fontSize='small'/>
            </Button>
            <div>{error}</div>
        </div>
    )
}

export default AddItemTextfield