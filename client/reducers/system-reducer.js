import {
    TOGGLE_FEEDS,
    TOGGLE_FEED_INFO,
    BACK_TO_CHANNEL
} from '../constants/feeds-constants'

const initialState = {
    st: false,
    feedInfoStatus: false,
    animateStatus: false,
    activeModalStatus: '_CLOSED'
}

export default function channelsReducer(state = initialState, action) {
    switch (action.type) {

        case TOGGLE_FEEDS:
            return {
                ...state,
                st: !state.st,
                feedInfoStatus: false,
                activeModalStatus: state.st ? '_CLOSED' : '_CHANNEL' 
            }

        case TOGGLE_FEED_INFO:
            return {
                ...state,
                feedInfoStatus: !state.feedInfoStatus,
                activeModalStatus: state.feedInfoStatus ? '_CHANNEL' : '_FEED_INFO'
            }
        
        default:
            return state;
    }
}
