export default store => next => action => {

    if (typeof (action) == 'string') {

        store.dispatch({
            type: action
        })

    } else {

        return next(action);

    }

}
