import PageLayout from '../../components/layout/PageLayout';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import ActionCell from '../../components/common/data-grid/ActionCell';
import {
    Edit as EditIcon,
    DeleteForever as DeleteForeverIcon
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ApiErrorObject } from '../../api/types';
import { UserRecord } from '../../models/user';
import UsersAPI from '../../api/UsersAPI';
import UsersHeader from './UsersHeader';

const Users = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<UserRecord[]>([]);

    const populateRows = async () => {
        const users = await UsersAPI.getMany();

        if (users) {
            setUsers(users.data || []);
        }
    };

    useEffect(() => {
        const populateUsers = async () => {
            setLoading(true);
            await populateRows();
            setLoading(false);
        };

        populateUsers();
    }, []);

    const onEditClickHandler = () => {};

    const onDeleteClickHandler = async (
        record: GridRowParams
    ): Promise<void | ApiErrorObject> => {
        const apiResponse = await UsersAPI.delete(record.row._id);

        if (apiResponse === undefined) {
            setUsers(users.filter((user) => user._id !== record.row._id));
            return;
        }

        return apiResponse as ApiErrorObject;
    };

    const onUserChange = (user: UserRecord): void => {
        const index = users.findIndex((c) => c._id === user._id);
        const newUsers = [...users];

        if (index !== -1) {
            newUsers[index] = user;
        } else {
            newUsers.push(user);
        }

        setUsers(newUsers);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
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
            <UsersHeader onChange={onUserChange} />
            <DataGrid
                columns={columns}
                rows={users}
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

export default Users;
