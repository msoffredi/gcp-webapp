import PageLayout from '../../components/layout/PageLayout';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import ActionCell from '../../components/common/data-grid/ActionCell';
import {
    Edit as EditIcon,
    DeleteForever as DeleteForeverIcon
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ClientRecord } from '../../models/client';
import ClientsAPI from '../../api/ClientsAPI';
import ClientsHeader from './ClientsHeader';
import { ApiErrorObject } from '../../api/types';

const Clients = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const [clients, setClients] = useState<ClientRecord[]>([]);

    const populateRows = async () => {
        const clients = await ClientsAPI.getMany();

        if (clients) {
            setClients(clients.data || []);
        }
    };

    useEffect(() => {
        const populateClients = async () => {
            setLoading(true);
            await populateRows();
            setLoading(false);
        };

        populateClients();
    }, []);

    const onEditClickHandler = () => {};

    const onDeleteClickHandler = async (
        record: GridRowParams
    ): Promise<void | ApiErrorObject> => {
        const apiResponse = await ClientsAPI.delete(record.row._id);

        if (apiResponse === undefined) {
            setClients(clients.filter((cli) => cli._id !== record.row._id));
            return;
        }

        return apiResponse as ApiErrorObject;
    };

    const onClientChange = (client: ClientRecord): void => {
        const index = clients.findIndex((c) => c._id === client._id);
        const newClients = [...clients];

        if (index !== -1) {
            newClients[index] = client;
        } else {
            newClients.push(client);
        }

        setClients(newClients);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            getActions: (record: GridRowParams) => {
                const actions = [
                    <ActionCell
                        icon={<EditIcon fontSize='small' />}
                        record={record}
                        onClickHandler={onEditClickHandler}
                    />,
                    <ActionCell
                        icon={<DeleteForeverIcon fontSize='small' />}
                        record={record}
                        onClickHandler={onDeleteClickHandler}
                    />
                ];

                return actions;
            }
        }
    ];

    return (
        <PageLayout>
            <ClientsHeader onChange={onClientChange} />
            <DataGrid
                columns={columns}
                rows={clients}
                loading={loading}
                getRowId={(row) => row._id}
                slotProps={{
                    loadingOverlay: {
                        variant: 'linear-progress',
                        noRowsVariant: 'linear-progress'
                    }
                }}
            />
        </PageLayout>
    );
};

export default Clients;
