import { useState } from 'react';
import Alerts, { AlertObj } from '../../components/common/Alerts/Alerts';
import { FormHelper } from '../../utils/form-helper';
import * as yup from 'yup';
import { ObjectType } from '@msoffredi/gcp-common';
import { ApiErrorObject } from '../../api/types';
import Overlay from '../../components/common/Overlay/Overlay';
import { Form } from 'react-final-form';
import CustomDialog from '../../components/common/dialogs/CustomDialog';
import FormTitle from '../../components/forms/FormTitle';
import FormRowContainer from '../../components/forms/FormRowContainer';
import FormTextField from '../../components/forms/FormTextField';
import FormButton from '../../components/forms/FormButton';
import { NewUser, UserRecord } from '../../models/user';
import UsersAPI from '../../api/UsersAPI';

interface UserFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    formTitle?: string;
    submitButtonText?: string;
    initialValues?: UserRecord;
    onChange?: (user: UserRecord) => void;
}

const UserForm = (props: UserFormProps): JSX.Element => {
    const [processing, setProcessing] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<AlertObj[]>([]);

    const validate = FormHelper.validate(
        yup.object().shape({
            name: yup.string().min(2).required(),
            email: yup.string().email().required()
        })
    );

    const onSubmitHandler = async (
        values: ObjectType
    ): Promise<ObjectType | void> => {
        setProcessing(true);

        const userData: NewUser = {
            name: String(values.name),
            email: String(values.email)
        };

        let apiResponse: UserRecord | ApiErrorObject = {};

        if (props.initialValues && props.initialValues._id) {
            // user = await UsersAPI.update({
            //     ...userData,
            //     _id: props.initialValues._id
            // });
        } else {
            apiResponse = await UsersAPI.create(userData);
        }

        if (apiResponse && apiResponse._id) {
            if (props.onChange) {
                props.onChange(apiResponse as UserRecord);
            }

            setProcessing(false);
            props.setOpen(false);
            return;
        }

        setProcessing(false);
        return apiResponse as ApiErrorObject;
    };

    const onCloseHandler = (): void => {
        props.setOpen(false);
    };

    return (
        <CustomDialog open={props.open} onClose={onCloseHandler}>
            <Overlay processing={processing} />
            <Alerts alerts={alerts} setAlerts={setAlerts} />
            <Form
                initialValues={props.initialValues || {}}
                onSubmit={onSubmitHandler}
                validate={validate}
                render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    invalid
                }) => (
                    <form {...form} id='join-now-form' onSubmit={handleSubmit}>
                        <FormTitle text={props.formTitle || 'Edit User'} />
                        <FormRowContainer>
                            <FormTextField
                                name='name'
                                label='Name'
                                fullWidth
                                required
                                autoFocus
                            />
                        </FormRowContainer>
                        <FormRowContainer>
                            <FormTextField
                                name='email'
                                label='Email'
                                fullWidth
                                required
                            />
                        </FormRowContainer>
                        <FormRowContainer>
                            <FormButton
                                disabled={submitting || pristine || invalid}
                                type='submit'
                            >
                                {props.submitButtonText || 'Submit'}
                            </FormButton>
                        </FormRowContainer>
                    </form>
                )}
            />
        </CustomDialog>
    );
};

export default UserForm;
