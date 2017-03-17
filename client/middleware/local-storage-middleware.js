export default function debug(store) {
    return function (next) {
        return function (action) {

            switch (action.type) {
                case 'SET_LOCAL_STORAGE': localStorage.setItem(action.key, JSON.stringify(action.data)); break;
                case 'GET_LOCAL_STORAGE': next(action).data = JSON.parse(localStorage[action.key]); break;
                case 'REMOVE_LOCAL_STORAGE': localStorage.removeItem(action.key); break;
                default: '';
            }

            return next(action);
        };
    };
};
