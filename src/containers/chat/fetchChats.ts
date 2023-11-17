import { sortByDate } from 'utils/sort-by-date';
import { Conversation } from 'components/messages-list/messages-list';

async function fetchChats() {
    console.log('fetchChats');
    // this json contains all the chats and messages
    const res = await fetch('https://mocki.io/v1/971cac23-5666-47bd-80d3-215076e98b18');
    if (!res.ok) {
        throw new Error(`chats fetch not ok`);
    }

    const data = await res.json();
    return (
        sortByDate(data, 'desc') as Conversation[]
    );
}

export { fetchChats };
