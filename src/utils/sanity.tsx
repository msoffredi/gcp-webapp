import ReactDOM from 'react-dom';

const checkEnvVar = (envVar: string): boolean => {
    if (!process.env[envVar]) {
        console.error(`${envVar} not defined as environment variable`);
        ReactDOM.render(
            <>Environment variables not defined</>,
            document.getElementById('root')
        );

        return false;
    }

    return true;
};

export const envVarOk = (): boolean => {
    return (
        checkEnvVar('REACT_APP_ENV') &&
        checkEnvVar('REACT_APP_CLIENTS_API_BASEURL') &&
        checkEnvVar('REACT_APP_USERS_API_BASEURL')
    );
};
