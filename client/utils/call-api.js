import 'whatwg-fetch'

export function callApi(url, o) {
    if (!url) throw new Error('Невалидные аргументы к callApi: не указан url');
    if (!o.method) throw new Error('Невалидные аргументы к callApi: не указан метод');

    let options = Object.assign({
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
    }, o)

    return fetch(url, options).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    })
}
