import {
    GET_CHANNEL_REQUEST, GET_CHANNEL_SUCCESS, GET_CHANNEL_ERROR
} from '../constants/api-constants'

import {
    REMOVE_CHANNEL_SUCCESS, TOGGLE_FEEDS, TOGGLE_FEED_INFO, SAVE_FEED
} from '../constants/feeds-constants'

import createActionGraphReducer from '../system/action-graph-reducer'




const initialState = {
    STATE: 'S_INITIAL',
    points: [],
    requestData: '',
    activeChannel: '',
    activeIndexFeedNews: '',
    feeds: JSON.parse(localStorage.getItem('__feedsStructure')) === null ? {} : JSON.parse(localStorage.getItem('__feedsStructure'))
}

// let UNIVERSAL_ACTION_HANDLERS = {
//     ['SAVE_TOKEN']: (state, action) => ({
//         token: action.token
//     }),
//     ['LOGOUT_DONE']: (state) => {
//         return Object.assign({}, initialState, {
//             STATE: 'S_WAITING_LOGIN'
//         })
//     }
// };


let TRANSITION_GRAPH = {
    ['S_INITIAL']: {
        ['TEST_ACTION_HANDLER']: (state, action) => ({
            STATE: 'S_INITIAL_LOADING_POINTS',
            points: action.points
        })
    }
};

export default createActionGraphReducer(initialState, TRANSITION_GRAPH);



// export default function channelsReducer(state = initialState, action) {
//     switch (action.type) {
//
//         case GET_CHANNEL_SUCCESS:
//             return {
//                 ...state,
//                 feeds: Object.assign( {}, state.feeds, action.data )
//             }
//
//         case REMOVE_CHANNEL_SUCCESS:
//             return {
//                 ...state,
//                 feeds: Object.assign( {}, state.feeds, delete state.feeds[action.value] )
//             }
//
//         case TOGGLE_FEEDS:
//             return {
//                 ...state,
//                 activeChannel: action.activeChannel
//             }
//
//         case TOGGLE_FEED_INFO:
//             return {
//                 ...state,
//                 activeIndexFeedNews: action.index
//             }
//
//         case SAVE_FEED:
//             return {
//                 ...state,
//                 feeds: Object.assign( {},
//                     state.feeds,
//                     state.feeds[state.activeChannel].items[action.index].__save = true
//                 )
//             }
//
//         default:
//             return state;
//     }
// }