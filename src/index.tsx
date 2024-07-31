import ReactDOM from 'react-dom/client';
import { envVarOk } from './utils/sanity';
import App from './components/core/App/App';
import './index.css';

if (envVarOk()) {
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(
        <>
            <App />
        </>
    );
}
