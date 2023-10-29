export function sortByDate(items: { last_updated: string; }[], direction: 'asc' | 'desc' = 'asc') {
    return items.sort((a, b) => {
        const rightDate = new Date(b.last_updated).getTime();
        const leftDate = new Date(a.last_updated).getTime();
        return direction === 'desc' ? rightDate - leftDate : leftDate - rightDate;
    })
}
