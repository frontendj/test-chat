import React, { FunctionComponent } from 'react';

import './messages-list.css';
import moment from 'moment';
import { sortByDate } from 'utils/sort-by-date';

export type Conversation = {
    id: string;
    name: string;
    last_updated: string;
    messages: Message[];
}

export type Message = {
    id: string;
    text: string;
    last_updated: string;
}

export interface MessagesListProps {
    conversation?: Conversation;
    onEditMessage: (message: Message) => void;
}

// TODO:
// Handling keyboard navigation between items (react-aria or anything else)
// use useMemo for sorting and 'date'
// Show 'Edit' only on hover?

const MessagesList: FunctionComponent<MessagesListProps> = ({ conversation, onEditMessage }) => {
    function renderMessages(conversation: Conversation) {
        const sortedMessages = sortByDate(conversation.messages, 'asc') as Message[];

        return (
            <div>
                <h1>{`Conversation with ${conversation.name}`}</h1>

                <ul className="messages-list" aria-label="Messages">
                    {
                        sortedMessages.map((message) => {
                            const date = moment(message.last_updated).format('MMMM Do YYYY, HH:mm:ss');

                            return (
                                <li className="messages-list__item" key={message.id}>
                                    <time>{date}</time>
                                    <p>{message.text}</p>
                                    <button onClick={() => onEditMessage(message)}>
                                        Edit
                                        <span className="a11y-visually-hidden">{` message from ${date}`}</span>
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }

    return (
        conversation ? renderMessages(conversation) : <div>No conversation selected</div>
    );
};

export default MessagesList;
