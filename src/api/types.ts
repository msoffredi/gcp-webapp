export enum ApiErrorType {
    Unspecified = 'unspecified',
    IterationLimit = 'iteration-limit'
}
export class ApiError extends Error {
    constructor(
        message: string,
        public type: ApiErrorType = ApiErrorType.Unspecified
    ) {
        super(message);
    }
}
export interface ApiErrorObject {
    [key: string]: string;
}

// export interface APIGetPaginatedParams {
//     lastKey?: {
//         // We should be able to improve this unknown type
//         [key: string]: unknown;
//     } | string;
//     scanLimit?: string;
// }
