import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    RawAxiosRequestHeaders
} from 'axios';
import { ApiErrorObject } from './types';
import {
    apiErrorsToConsolidatedErrorObject,
    generateApiUnexpectedError
} from './utils/data-management';
import { PaginatedCollection } from '@msoffredi/gcp-common';
import { ClientRecord, NewClient } from '../models/client';

class ClientsAPI {
    private static getClientsAPIAxiosObj = (): AxiosInstance => {
        const headers: RawAxiosRequestHeaders = {
            'Content-Type': 'application/json'
        };

        const baseURL = process.env.REACT_APP_CLIENTS_API_BASEURL!;

        return axios.create({
            baseURL,
            headers
        });
    };

    public static create = async (
        userData: NewClient
    ): Promise<ApiErrorObject | ClientRecord> => {
        const api = ClientsAPI.getClientsAPIAxiosObj();

        try {
            const user = await api.post<ClientRecord>('', userData);

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

    public static get = async (userId: string): Promise<ClientRecord> => {
        const api = ClientsAPI.getClientsAPIAxiosObj();

        const { status, data } = await api.get<ClientRecord>(`/${userId}`);

        if (status === 200 && data && data._id) {
            return data;
        } else {
            throw new Error('Error retrieving user');
        }
    };

    public static getMany = async (
        limit = 10,
        createdAt?: string
    ): Promise<PaginatedCollection<ClientRecord>> => {
        const filter: AxiosRequestConfig = {
            params: { limit }
        };
        const api = ClientsAPI.getClientsAPIAxiosObj();

        if (createdAt) {
            filter.params.createdAt = createdAt;
        }

        const { status, data } = await api.get<
            PaginatedCollection<ClientRecord>
        >('', filter);

        if (status === 200 && data) {
            return data;
        } else {
            throw new Error('Error retrieving users');
        }
    };

    public static delete = async (
        clientId: string
    ): Promise<ApiErrorObject | void> => {
        const api = ClientsAPI.getClientsAPIAxiosObj();

        try {
            const { status } = await api.delete<ClientRecord>(`/${clientId}`);

            if (status === 200) {
                return;
            }
        } catch (err: unknown) {
            if (
                !(err instanceof AxiosError) ||
                !err.response ||
                err.response.status !== 400 ||
                !(err.response.data instanceof Array) ||
                !err.response.data.length
            ) {
                return generateApiUnexpectedError('deleting client');
            }

            return apiErrorsToConsolidatedErrorObject(err.response.data);
        }

        return generateApiUnexpectedError('deleting client');
    };
}

export default ClientsAPI;
