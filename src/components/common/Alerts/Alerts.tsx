import { Alert, AlertColor } from '@mui/material';

export interface AlertObj {
    text: string;
    severity: AlertColor;
    onClose?: () => void;
}

interface AlertsProps {
    alerts: AlertObj[];
    setAlerts: React.Dispatch<React.SetStateAction<AlertObj[]>>;
}

const Alerts = (props: AlertsProps): JSX.Element => {
    return (
        <>
            {props.alerts.length > 0 &&
                props.alerts.map((alert, idx) => (
                    <Alert
                        key={idx}
                        onClose={() => {
                            if (alert.onClose) {
                                alert.onClose();
                            }

                            const newAlerts = [...props.alerts];
                            delete newAlerts[idx];
                            props.setAlerts(newAlerts);
                        }}
                        severity={alert.severity}
                        sx={{ mb: '0.6rem' }}
                    >
                        {alert.text}
                    </Alert>
                ))}
        </>
    );
};

export default Alerts;
