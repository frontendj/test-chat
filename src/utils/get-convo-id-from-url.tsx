export function getConvoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('cid');
}
