async function fetchChatMessages({ queryKey }) {
    const chat = queryKey[1];
    if (!chat) return [];

    // this json contains all the chats and messages
    const res = await fetch('https://mocki.io/v1/971cac23-5666-47bd-80d3-215076e98b18');
    if (!res.ok) {
        throw new Error(`chat ${chat} fetch not ok`);
    }
    return res.json().find((dataChat) => dataChat.id === chat)[0]?.messages;
}

export default fetchChatMessages;
