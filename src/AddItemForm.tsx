import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


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
            <input
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddItem}
                className={error ? 'error' : ''}
                placeholder={props.placeholder}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div style={{fontWeight: 'bold', color: 'red'}}>Title is required</div>}
        </div>
    );
};

export default AddItemForm;