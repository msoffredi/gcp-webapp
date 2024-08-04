import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';

interface ActionCellProps {
    icon: JSX.Element;
    record: GridRowParams;
    onClickHandler: (record: GridRowParams) => void;
    disabled?: boolean;
}

const ActionCell = (props: ActionCellProps): JSX.Element => {
    const enableAction = Boolean(props.onClickHandler);

    return (
        <>
            {enableAction && (
                <GridActionsCellItem
                    disabled={Boolean(props.disabled)}
                    icon={props.icon}
                    label='Edit'
                    sx={{ color: 'primary.main' }}
                    onClick={() => props.onClickHandler!(props.record)}
                />
            )}
        </>
    );
};

export default ActionCell;
