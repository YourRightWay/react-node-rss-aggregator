/**
 * 
 * @param items
 * @returns {Number}
 */
export function calcReadedFeeds(items) {
    let readedLength = items.length;

    for(let i = 0; i < items.length; i++) {
        if(items[i].hasOwnProperty('__save')) {
            readedLength = readedLength - 1;
        }
    }

    return readedLength
}
