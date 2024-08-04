import * as yup from 'yup';
import { setIn } from 'final-form';
import { ObjectType } from '@msoffredi/gcp-common';

export class FormHelper {
    public static validate =
        (schema: yup.AnySchema) =>
        async (values: ObjectType): Promise<ObjectType | undefined> => {
            try {
                await schema.validate(values, { abortEarly: false });
            } catch (err: unknown) {
                if (err instanceof yup.ValidationError) {
                    const errors = err.inner.reduce(
                        (
                            formError: ObjectType,
                            innerError: yup.ValidationError
                        ) => {
                            return setIn(
                                formError,
                                String(innerError.path),
                                innerError.message
                            );
                        },
                        {}
                    );

                    return errors;
                }
            }

            return;
        };
}
