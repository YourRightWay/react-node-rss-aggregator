import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import Feeds from './feeds-reducer'
import System from './system-reducer'
import Validate from './validate-reducer'

export default combineReducers({
    Feeds,
    System,
    Validate,
    routing: routerReducer,
})
