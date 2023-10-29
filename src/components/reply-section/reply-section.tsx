import React, {ChangeEvent, FormEvent, FunctionComponent, RefObject} from 'react';

import './reply-section.css';

export interface ReplySectionProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    message?: string;
    variant?: 'edit' | 'send';
    inputRef?: RefObject<HTMLInputElement>;
}

// TODO:
// Handling error messages (i.e. submitting empty form)
// Handling success messages when message is sent
// Returning to Edit message button after editing
// Cancelling editing
// Separate Send and Edit components or at least their render

const ReplySection: FunctionComponent<ReplySectionProps> = ({ onSubmit, onChange, message, variant = 'send', inputRef }) => {
    return (
        <form onSubmit={onSubmit} className="reply-section">
            <label htmlFor="message">Reply</label>
            <input type="text" id="message" onChange={onChange} value={message} ref={inputRef}/>
            <button type="submit">{variant === 'edit' ? 'Edit' : 'Send'}</button>
        </form>
    );
};

export default ReplySection;

