import {
    GET_CHANNEL_REQUEST, GET_CHANNEL_SUCCESS, GET_CHANNEL_ERROR
} from '../constants/api-constants'

import {
    ASYNC_DEBUGGER, SET_LOCAL_STORAGE,
    VALIDATE_CHANNEL, VALIDATE_REQUEST
} from '../constants/utils-constants'

import { callApi } from '../utils/call-api'
import { calcReadedFeeds } from './helpers'

export function getChannel(value) {
    return function (dispatch, getState) {

        dispatch({ 
            type: VALIDATE_CHANNEL,
            prop: value
        })

        if (getState().Validate.validateStatus === 'SUCCESS') {
           
            dispatch(GET_CHANNEL_REQUEST)
            let url = `/api/get-channels?rssRequest=${value}`;
        
            return callApi(url, {
                method: 'GET'
            }).then(function (result) {
                dispatch({ type: ASYNC_DEBUGGER, url: url, response: result })

                dispatch({
                    type: VALIDATE_REQUEST,
                    prop: result
                })

                if (getState().Validate.validateStatus === 'SUCCESS') {
                    let data = {
                        [value]: {
                            title: result.title,
                            description: result.description,
                            image: result.image ? result.image : 'https://image.flaticon.com/icons/svg/149/149092.svg',
                            items: result.item,
                            counter: {
                                items: result.item.length,
                                dif: calcReadedFeeds(result.item)
                            }
                        }
                    }

                    dispatch({
                        type: GET_CHANNEL_SUCCESS,
                        data
                    })

                    dispatch({
                        type: SET_LOCAL_STORAGE,
                        data: Object.assign( {}, getState().Feeds.feeds, data ),
                        key: '__feedsStructure'
                    });
                }
                   
                
        
            }).catch(function (error) {
                throw new Error(`${url} ${'\n'} ${error}`);
            })
        }

    }
}

export function testActionHandler(val) {
    return function (dispatch, getState) {
        
        let points = [];

        function getRandom(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
        
        for (let i = 0; i < val; i++) {
            points.push(getRandom(1, 100))
        }

        dispatch({
            type: "TEST_ACTION_HANDLER",
            points
        })
        
    }
}
