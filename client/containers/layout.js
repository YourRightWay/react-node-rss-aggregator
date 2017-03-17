import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../components/header-component/header-component'
import Search from '../components/rss-search-component/rss-search'
import ChanneldList from '../components/channel-list-component/channel-list'
import ModalFeedsList from '../components/feeds-aside-component/feeds-aside'
import ValidateComponent from '../components/system/validate-component/validate-component'

import * as apiAction from '../actions/api-action'

class Layout extends Component {
    
    componentDidMount() {
        let { testActionHandler } = this.props.apiAction;
        testActionHandler(50);
    }
    
    render() {
        let { validateText, validateNotify } = this.props.validate;
        
        return (
            <div>
                <Header />
                <ValidateComponent status={validateNotify} text={validateText}/>
                <Search />
                <ChanneldList />
                <ModalFeedsList />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        validate: state.Validate,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        apiAction: bindActionCreators(apiAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)











