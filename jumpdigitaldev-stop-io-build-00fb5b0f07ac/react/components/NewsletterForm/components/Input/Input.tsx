import React from 'react';
import styles from './styles.css';

interface InputTextProps {
    name: string,
    type: string,
    label: string;
    placeholder: string;
    value: string;
    onChange(event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>): void
    error: string
}

const InputText = ({
    name,
    type,
    label,
    placeholder,
    value,
    onChange,
    error
}: InputTextProps) => {

    return (
        <div className={`${type === 'textarea' ? styles.containerTextAreaElement : styles.containerInputElement} ${styles[`containerInputElement--${name}`]}`}>

            <span className={`db w-100 mb3 ${styles.labelName}`}>{label}</span>
            {
                type === 'textarea' ?
                    <textarea
                        className={`db w-100 ${styles.inputElement} ${styles.textAreaElement}`}
                        name={name}
                        rows={5}
                        onChange={onChange}
                        value={value}
                    /> :
                    <input
                        className={`db w-100 ${styles.inputElement}`}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                    />
            }
            <span className={`db w-100 ${styles.labelError} ${error !== '' ? styles.showError : ''}`}>{error}</span>
        </div>
    )
}

export default InputText
