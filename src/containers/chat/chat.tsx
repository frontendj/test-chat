import React, { useState, ChangeEvent, FormEvent, useRef, RefObject } from 'react';

import './chat.css';
import MessagesList, { Message, Conversation } from 'components/messages-list/messages-list';
import ReplySection from 'components/reply-section/reply-section';
import ConversationsList from 'components/conversations-list/conversations-list';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchChats } from './fetchChats';

// TODO: break into smaller parts if chat grows
// many messages and conversations require different approach with rendering only what's on the screen (react-window)
// lazy loading
// data fetching (swr?), error and loading states (skeleton?) handling
// On bigger scale: real-time updates, notifications, search functionality
// retry mechanism, empty states, timeouts, network connection monitoring, restoring user state after errors etc
// useState is the simpliest way to handle states in basic react app, however in the bigger one we may need to have
// something more advanced, like redux

function ChatContainer() {

    const { conversationId } = useParams();
    const conversationsData = useQuery({ queryKey: ['chats'], queryFn: fetchChats });
    const [currentMessage, setCurrentMessage] = useState<Message>();
    const [message, setMessage] = useState('');
    const conversationById = conversationsData?.data?.find((conversation) => conversation.id === conversationId);
    let currentConversation: any;
    if (conversationById) {
        currentConversation = conversationById;
        document.title = `Conversation with ${conversationById.name}`;
    } else if(conversationsData?.data) {
        currentConversation = conversationsData?.data[0];
        document.title = `Conversation with ${currentConversation.name}`;
    }
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

    return (
        <div className="chat">
            <div className="chat__side">
                <ConversationsList conversations={conversationsData?.data} currentConversationId={conversationId}/>
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
