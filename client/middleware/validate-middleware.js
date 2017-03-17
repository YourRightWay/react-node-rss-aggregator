import { 
    VALIDATE_TIMEOUT,
    SHOW_VALIDATE,
    CLOSE_VALIDATE, 
    VALIDATE_CHANNEL, 
    VALIDATE_REQUEST
} from '../constants/utils-constants'

const VALIDATE_STATUS = {
    success: 'SUCCESS',
    err: 'ERROR'
}

const validateText = {
    validateRequest: 'Input is empty',
    validateChannel: 'Channel already exist'
}

export default function validateMiddleware(store) {
    return function (next) {
        return function (action) {

            function activeValidate () {
                store.dispatch(SHOW_VALIDATE)

                setTimeout(function () {
                    store.dispatch(CLOSE_VALIDATE)
                }, VALIDATE_TIMEOUT)
            }

            if(action.type === VALIDATE_CHANNEL) {
                
                if(action.prop === '') {
                    
                    next(action).status = VALIDATE_STATUS.err;
                    next(action).text = validateText.validateRequest;
                    activeValidate ();
                    
                } else if(store.getState().Feeds.feeds.hasOwnProperty(action.prop)) {

                    next(action).status = VALIDATE_STATUS.err;
                    next(action).text = validateText.validateChannel;
                    activeValidate ();

                } else {
                    
                    next(action).status = VALIDATE_STATUS.success
                    
                }
            } else if(action.type === VALIDATE_REQUEST) {
                if(action.prop.hasOwnProperty('error') ) {
                    
                    next(action).status = VALIDATE_STATUS.err;
                    next(action).text = action.prop.error;
                    activeValidate ();
                    
                } else {
                    next(action).status = VALIDATE_STATUS.success
                }
            }

            return next(action)

        }
    }
}
