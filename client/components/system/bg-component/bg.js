import React from 'react';
import i from '../../../decorators/inject'
import classNames from 'classnames'

export default class Bg extends React.Component {
    @i
    render ({toggleFeeds, status}) {

        let bgClass = classNames({
            "g-bg bg-active" : status === true,
            "g-bg" : status === false
        })

        return (
            <div className={ bgClass } onClick={ toggleFeeds }></div>
        )
    }
}
