import React from 'react';
import classNames from 'classnames'
import i from '../../../decorators/inject'

export default class ValidateComponent extends React.Component {
    @i
    render ({ status, text }) {

        let activeClass = classNames({
            'vld__cnt vld__cnt--active' : status === true,
            'vld__cnt' : status === false
        })

        return (
            <div className={ activeClass }>
                <span className="validate-info__text">{ text }</span>
            </div>
        )
    }
}
