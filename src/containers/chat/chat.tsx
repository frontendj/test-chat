import React, { useState, ChangeEvent, FormEvent, useEffect, useRef, RefObject } from 'react';

import './chat.css';
import conversationsData from './data.json';
import MessagesList, { Message, Conversation } from 'components/messages-list/messages-list';
import ReplySection from 'components/reply-section/reply-section';
import ConversationsList from 'components/conversations-list/conversations-list';
import { sortByDate } from 'utils/sort-by-date';
import { getConvoIdFromURL } from 'utils/get-convo-id-from-url';
import { useLocation } from 'react-router-dom';

// TODO: break into smaller parts if chat grows
// many messages and conversations require different approach with rendering only what's on the screen (react-window)
// lazy loading
// data fetching (swr?), error and loading states (skeleton?) handling
// On bigger scale: real-time updates, notifications, search functionality
// retry mechanism, empty states, timeouts, network connection monitoring, restoring user state after errors etc

function ChatContainer() {
    const location = useLocation();
    const sortedConversations = sortByDate(conversationsData, 'desc') as Conversation[];

    // useState is the simpliest way to handle states in basic react app, however in the bigger one we may need to have
    // something more advanced, like redux
    const [currentConversationId, setCurrentConversationId] = useState<string | undefined>();
    const [conversations, setConversations] = useState(sortedConversations);
    const [currentConversation, setCurrentConversation] = useState<Conversation>();
    const [currentMessage, setCurrentMessage] = useState<Message>();
    const [message, setMessage] = useState('');

    const inputRef: RefObject<HTMLInputElement> = useRef(null);

    function handleEditMessage(message: Message) {
        setMessage(message.text);
        setCurrentMessage(message);
        inputRef?.current?.focus();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (currentConversation && message) {
            const uid = Math.random().toString(36).substr(2, 6);

            if (currentMessage) {
                currentMessage.text = message;
            } else {
                const currentDate = new Date().toISOString().slice(0, 19);

                currentConversation.messages.push({
                    id: uid,
                    text: message,
                    last_updated: currentDate,
                })

                currentConversation.last_updated = currentDate;
            }
        }

        // fetch request to server

        setMessage('');
        setCurrentMessage(undefined);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    // update conversation id on page url change
    useEffect(() => {
        const conversationId = getConvoIdFromURL();
        if (conversationId) {
            setCurrentConversationId(conversationId);
        }
    }, [location]);

    // set default conversation
    useEffect(() => {
        const conversation = conversations.find((conversation) => conversation.id === currentConversationId);
        if (conversation) {
            setCurrentConversation(conversation);

            document.title = `Conversation with ${conversation.name}`;
        } else {
            setCurrentConversation(sortedConversations[0]);

            document.title = `Conversation with ${sortedConversations[0].name}`;
        }
    }, [currentConversationId]);

    return (
        <div className="chat">
            <div className="chat__side">
                <ConversationsList conversations={conversations} currentConversationId={currentConversationId}/>
            </div>

            <main id="main" className="chat__main">
                <div className="chat__messages">
                    <MessagesList conversation={currentConversation} onEditMessage={handleEditMessage}/>
                </div>

                {currentConversation ? (
                    <div className="chat__form">
                        <ReplySection onSubmit={handleSubmit} onChange={handleInputChange} variant={currentMessage ? 'edit' : 'send'} message={message} inputRef={inputRef}/>
                    </div>
                ) : null}
            </main>
        </div>
    );
}

export default ChatContainer;
