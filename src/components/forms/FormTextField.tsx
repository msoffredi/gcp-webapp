import { TextField } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import React, { ChangeEvent } from 'react';
import { Field } from 'react-final-form';

interface FormTextFieldProps {
    name: string;
    label?: string;
    autoComplete?: string;
    fullWidth?: boolean;
    required?: boolean;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
    select?: boolean;
    id?: string;
    autoFocus?: boolean;
    value?: string | number | boolean;
    initialValue?: string | number | boolean | undefined;
    inputRef?: React.Ref<HTMLInputElement | undefined>;
    type?: React.InputHTMLAttributes<unknown>['type'];
    onChange?: (event: ChangeEvent | unknown) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onSelect?: React.ReactEventHandler<HTMLInputElement>;
    onKeyUp?: React.KeyboardEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    sx?: SxProps<Theme>;
    disabled?: boolean;
}

const FormTextField = (
    props: React.PropsWithChildren<FormTextFieldProps>
): JSX.Element => {
    const textFieldProps = { ...props };
    delete textFieldProps.initialValue;
    delete textFieldProps.onChange;

    const onChangeHandler = (
        event: ChangeEvent,
        callback: (event: React.ChangeEvent | unknown) => void,
        onChange?: (event: ChangeEvent | unknown) => void
    ): void => {
        if (onChange) {
            onChange(event);
        }
        callback(event);
    };

    return (
        <Field name={props.name} initialValue={props.initialValue}>
            {({ input, meta }) => (
                <TextField
                    autoComplete='off'
                    error={(meta.error || meta.submitError) && meta.touched}
                    helperText={
                        (meta.touched && (meta.error || meta.submitError)) ||
                        ' '
                    }
                    inputRef={props.inputRef || null}
                    variant='outlined'
                    size='small'
                    {...input}
                    {...textFieldProps}
                    onChange={(event: ChangeEvent) =>
                        onChangeHandler(event, input.onChange, props.onChange)
                    }
                    onSelect={props.onSelect}
                    onKeyUp={props.onKeyUp}
                    onKeyDown={props.onKeyDown}
                />
            )}
        </Field>
    );
};

export default FormTextField;
