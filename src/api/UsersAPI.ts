import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    RawAxiosRequestHeaders
} from 'axios';
import { NewUser, UserRecord } from '../models/user';
import { ApiErrorObject } from './types';
import {
    apiErrorsToConsolidatedErrorObject,
    generateApiUnexpectedError
} from './utils/data-management';
import { PaginatedCollection } from '@msoffredi/gcp-common';

class UsersAPI {
    private static getUserAPIAxiosObj = (): AxiosInstance => {
        const headers: RawAxiosRequestHeaders = {
            'Content-Type': 'application/json'
        };

        const baseURL = process.env.REACT_APP_USER_API_BASEURL!;

        return axios.create({
            baseURL,
            headers
        });
    };

    public static create = async (
        userData: NewUser
    ): Promise<ApiErrorObject | UserRecord> => {
        const api = UsersAPI.getUserAPIAxiosObj();

        try {
            const user = await api.post<UserRecord>('', userData);

            if (user.data) {
                return user.data;
            }
        } catch (err: unknown) {
            if (
                !(err instanceof AxiosError) ||
                !err.response ||
                err.response.status !== 400 ||
                !(err.response.data.errors instanceof Array) ||
                !err.response.data.errors.length
            ) {
                return generateApiUnexpectedError('creating user');
            }

            return apiErrorsToConsolidatedErrorObject(err.response.data.errors);
        }

        return generateApiUnexpectedError('creating user');
    };

    public static get = async (userId: string): Promise<UserRecord> => {
        const api = UsersAPI.getUserAPIAxiosObj();

        const { status, data } = await api.get<UserRecord>(`/${userId}`);

        if (status === 200 && data && data._id) {
            return data;
        } else {
            throw new Error('Error retrieving user');
        }
    };

    public static getMany = async (
        limit = 10,
        createdAt?: string
    ): Promise<PaginatedCollection<UserRecord>> => {
        const filter: AxiosRequestConfig = {
            params: { limit }
        };
        const api = UsersAPI.getUserAPIAxiosObj();

        if (createdAt) {
            filter.params.createdAt = createdAt;
        }

        const { status, data } = await api.get<PaginatedCollection<UserRecord>>(
            '',
            filter
        );

        if (status === 200 && data) {
            return data;
        } else {
            throw new Error('Error retrieving users');
        }
    };
}

export default UsersAPI;
