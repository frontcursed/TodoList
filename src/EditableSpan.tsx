import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Textsms} from "@material-ui/icons";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (nextTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setIsEditMode(false)
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onkeydownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === 'Enter' && offEditMode()
    return (
        isEditMode
            ? <TextField
                value={title}
                onBlur={offEditMode}
                autoFocus
                onChange={onChangeSetLocalTitle}
                onKeyDown={onkeydownChangeTitle}
            />
                : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;