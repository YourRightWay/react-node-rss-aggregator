export default function debug(store) {
    return function (next) {
        return function (action) {
            let css = 'background: #222; padding: 10px; color: #bada55';

            if(action.type === 'ASYNC_DEBUGGER') {
                console.log('%c' + 'DEBUG ('+ action.url + '):', css, action.response);
            }

            return next(action);
        };
    };
};
