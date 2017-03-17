import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as apiAction from '../../actions/api-action'

class Search extends React.Component {

    getChannel(e) {
        e.preventDefault();
        var input = this.refs.searchInput;
        var inputValue = input.value;
        
        let { getChannel } = this.props.apiAction;
        getChannel(inputValue);
    }

    render() {
        return (
            <div className="container">
                <div className="rss-search__container">
                    <form action="">
                        <div className="form-group">
                            <input type="text" ref="searchInput" className="g__i g__i--black" placeholder="Enter your channel"/>
                            <button className="g__btn btn-search" type="submit" onClick={::this.getChannel}>SEARCH</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) { 
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        apiAction: bindActionCreators(apiAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
