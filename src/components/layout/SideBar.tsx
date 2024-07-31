import { Button, MenuItem, MenuList, Paper } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { RoutePaths } from '../core/AppRouter';
import { NavLink as RouterLink } from 'react-router-dom';

const SideBar = (): JSX.Element => {
    return (
        <Paper
            style={{
                padding: '10px',
                backgroundColor: 'lightgray',
                height: '100vh'
            }}
        >
            <MenuList>
                <MenuItem>
                    <Button
                        disableRipple
                        component={RouterLink}
                        // onClick={closeSidebar}
                        to={`/${RoutePaths.Clients}`}
                        startIcon={<BusinessIcon fontSize='small' />}
                    >
                        Clients
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button
                        disableRipple
                        component={RouterLink}
                        // onClick={closeSidebar}
                        to={`/${RoutePaths.Users}`}
                        startIcon={<PersonIcon fontSize='small' />}
                    >
                        Users
                    </Button>
                </MenuItem>
            </MenuList>
        </Paper>
    );
};

export default SideBar;
