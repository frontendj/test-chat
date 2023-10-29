import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import App from 'containers/app/app';
const LazyApp = React.lazy(() => import('containers/app/app'));

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <React.Suspense fallback={<div>Loading...</div>}>
            <LazyApp />
        </React.Suspense>
    </React.StrictMode>,
);
