import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as systemAction from '../../actions/system-action'
import * as apiAction from '../../actions/api-action'

class FeedItem extends React.Component {
    render() {
        
        let { path, description, title, readFeedItem, removeFeedItem, dif, allfeeds } = this.props;
        
        return (
            <div className="feed-item">
                <div className="feed-item__img" onClick={ readFeedItem }>
                    <img src={ path } alt=""/>
                </div>

                <div className="feed-item__title" onClick={ readFeedItem }>
                    <span>{ title }</span>
                </div>

                <div className="feed-item__info">
                    <span>{ description }</span>
                </div>

                <button className="g__btn feed-item__nav feed-item__counter">
                    { dif } / { allfeeds }
                </button>
                
                <button className="g__btn feed-item__nav feed-item__reed-more" onClick={ readFeedItem }>
                    read
                </button>

                <button className="g__btn feed-item__nav feed-item__remove" onClick={ removeFeedItem }>
                    remove
                </button>
                
            </div>
        )
    }
}

class ChannelList extends React.Component {
    
    
    readFeedItems (key) {
        let { toggleFeeds } = this.props.systemAction;
        toggleFeeds(key)
    }

    removeFeedItems(key) {
        let { removeChannel } = this.props.systemAction;
        removeChannel(key)
    }

    render() {
        let { feeds } = this.props.feeds;

        let createFeeds = Object.keys(feeds).map((data, index) => (
            <FeedItem key={index} 
                      path={feeds[data].image}
                      title={feeds[data].title}
                      description={feeds[data].description}
                      allfeeds = {feeds[data].counter.items}
                      dif = {feeds[data].counter.dif}
                      readFeedItem={(key) => this.readFeedItems(Object.keys(feeds)[index])}
                      removeFeedItem={(key) => this.removeFeedItems(Object.keys(feeds)[index])}
            />
        ))
        
        return (
            <div className="container feed-container">
                {createFeeds}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        feeds: state.Feeds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        systemAction: bindActionCreators(systemAction, dispatch),
        apiAction: bindActionCreators(apiAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
