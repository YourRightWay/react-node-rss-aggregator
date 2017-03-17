import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../components/header-component/header-component'
import Search from '../components/rss-search-component/rss-search'
import ChanneldList from '../components/channel-list-component/channel-list'
import ModalFeedsList from '../components/feeds-aside-component/feeds-aside'
import ValidateComponent from '../components/system/validate-component/validate-component'

class Layout extends Component {
    
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
        validate: state.Validate
    }
}

export default connect(mapStateToProps, null)(Layout)











