import {
    TOGGLE_FEEDS,
    TOGGLE_FEED_INFO,
    REMOVE_CHANNEL_SUCCESS,
    SAVE_FEED,
    BACK_TO_CHANNEL
} from '../constants/feeds-constants'

import { SET_LOCAL_STORAGE } from '../constants/utils-constants'

import { calcReadedFeeds } from './helpers'

export function toggleFeeds(value) {
    return function (dispatch, getState) {

        dispatch({ 
            type: TOGGLE_FEEDS,
            activeChannel: value ? value : getState().System.activeChannel
        })
        
    }
}

export function removeChannel(value) {
    return function (dispatch, getState) {

        dispatch({
            type: REMOVE_CHANNEL_SUCCESS,
            value
        })

        dispatch({
            type: SET_LOCAL_STORAGE,
            data: Object.assign( {}, getState().Feeds.feeds, delete getState().Feeds.feeds[value]),
            key: '__feedsStructure'
        });

    }
}

export function toogleFeedInfo(index) {
    return function (dispatch, getState) {
        
        dispatch({
            type: TOGGLE_FEED_INFO,
            index
        })
        
    }
}

export function saveFeed(index) {
    return function (dispatch, getState) {
        
        let activeChannel = getState().Feeds.feeds[getState().Feeds.activeChannel];

        dispatch({
            type: SAVE_FEED,
            index
        })

        dispatch({
            type: SET_LOCAL_STORAGE,
            data: Object.assign( 
                {},
                getState().Feeds.feeds,
                activeChannel.items[index].__save = true,
                activeChannel.counter.items = activeChannel.items.length,
                activeChannel.counter.dif = calcReadedFeeds(activeChannel.items)
            ),
            key: '__feedsStructure'
        });

    }
}
