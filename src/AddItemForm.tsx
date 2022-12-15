import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBoxOutlined} from "@material-ui/icons";


type AddItemPropsType = {
    addItem: (title: string) => void
    placeholder: string
}

const AddItemForm = (props: AddItemPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyDownEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddItem()
    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddItem}
                label={props.placeholder}
                error={error}
                helperText={error && 'Title is required'}
            />
            <IconButton
                aria-label='add-task'
                onClick={onClickAddItem}>
                <AddBoxOutlined/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;