import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles/index.css';
const LazyApp = React.lazy(() => import('./containers/app/app'));

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
    <React.Suspense fallback={<div>Loading...</div>}>
        <LazyApp />
    </React.Suspense>
);
