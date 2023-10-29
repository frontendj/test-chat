import React from 'react';

import ChatContainer from 'containers/chat/chat';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// TODO: add ErrorBoundary?

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChatContainer />} />

                {/*TODO: better format <Route path="/chat/:conversationId" component={ChatContainer} /> */}

                <Route path="*" element={<div>Not found!</div>} />

            </Routes>
        </Router>
    );
}

export default App;
