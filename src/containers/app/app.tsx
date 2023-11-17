import React from 'react';

import ChatContainer from 'containers/chat/chat';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

// TODO: add ErrorBoundary?

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<ChatContainer />} />
                    <Route path="/conversations/:conversationId/" element={<ChatContainer />} />
                    <Route path="*" element={<div>Not found!</div>} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

export default App;
