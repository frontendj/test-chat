import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';

import Chat from './chat';
import { BrowserRouter as Router } from 'react-router-dom';

test('clicking edit button fills the input', () => {
    render(<Router><Chat /></Router>);
    const editButton = screen.getAllByText('Edit')[0];
    const parentElement = editButton.parentElement;
    const messageElement = parentElement?.querySelector('p');
    const message = messageElement?.textContent;

    expect(message).toBe('qui sint irure sunt');

    act(() => {
        fireEvent.click(editButton);
    });

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(message);
});
