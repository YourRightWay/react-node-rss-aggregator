import {
    GET_CHANNEL_REQUEST, GET_CHANNEL_SUCCESS, GET_CHANNEL_ERROR
} from '../constants/api-constants'

import {
    REMOVE_CHANNEL_SUCCESS, TOGGLE_FEEDS, TOGGLE_FEED_INFO, SAVE_FEED
} from '../constants/feeds-constants'

const initialState = {
    points: [],
    requestData: '',
    activeChannel: '',
    activeIndexFeedNews: '',
    feeds: JSON.parse(localStorage.getItem('__feedsStructure')) === null ? {} : JSON.parse(localStorage.getItem('__feedsStructure'))
}

export default function channelsReducer(state = initialState, action) {
    switch (action.type) {

        case GET_CHANNEL_SUCCESS:
            return {
                ...state,
                feeds: Object.assign( {}, state.feeds, action.data )
            }

        case REMOVE_CHANNEL_SUCCESS:
            return {
                ...state,
                feeds: Object.assign( {}, state.feeds, delete state.feeds[action.value] )
            }

        case TOGGLE_FEEDS:
            return {
                ...state,
                activeChannel: action.activeChannel
            }

        case TOGGLE_FEED_INFO:
            return {
                ...state,
                activeIndexFeedNews: action.index
            }

        case SAVE_FEED:
            return {
                ...state,
                feeds: Object.assign( {},
                    state.feeds,
                    state.feeds[state.activeChannel].items[action.index].__save = true
                )
            }

        default:
            return state;
    }
}