import { FORM_ERROR } from 'final-form';
import { ApiErrorObject } from '../types';
import { ObjectType } from '@msoffredi/gcp-common';

export const apiErrorsToConsolidatedErrorObject = (
    errors: ObjectType[]
): ApiErrorObject => {
    const rffErrors: ApiErrorObject = {};

    errors.forEach((error: ObjectType) => {
        if (error && error.message && error.field) {
            rffErrors[String(error.field)] = String(error.message);
        }
    });

    return rffErrors;
};

/**
 * This function is an generic API unexpected error generator that will take
 * a failed action text and used to compose a standard message.
 *
 * Example failedAction to provide: 'cating vote' or 'creating poll'
 *
 * @param failedAction failed action text describing when the error occurred
 * @returns apiError standard generic form error
 */
export const generateApiUnexpectedError = (
    failedAction: string
): ApiErrorObject => {
    return {
        [FORM_ERROR]: `Unexpected error ${failedAction}`
    };
};
