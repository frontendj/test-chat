import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import './conversations-list.css';
import moment from "moment";

export type Conversation = {
    id: string;
    name: string;
    last_updated: string;
}

export interface ConversationsListProps {
    conversations: Conversation[];
    currentConversationId?: Conversation['id'];
}

// TODO: lazy loading, infinity scroll, pagination ?

const ConversationsList: FunctionComponent<ConversationsListProps> = ({ conversations, currentConversationId }) => {
    return (
        <aside>
            <ul className="conversations-list" aria-label="Conversations">
                {conversations.map((conversation) => {
                    const date = moment(conversation.last_updated);

                    return (
                        <li className="conversations-list__item" key={conversation.id} style={currentConversationId === conversation.id ? { fontWeight: 'bold '} : undefined}>
                            <Link to={`?cid=${conversation.id}`}>
                                {`Conversation with ${conversation.name}, last updated ${date.format('MMMM Do YYYY, HH:mm:ss')}`}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default ConversationsList;
