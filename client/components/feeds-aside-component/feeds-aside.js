import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// =========================================
// actions
// =========================================
import * as systemAction from '../../actions/system-action'


// =========================================
// system components
// =========================================
import Bg from '../system/bg-component/bg'
import i from '../../decorators/inject'

// =========================================
// utils
// =========================================
import classNames from 'classnames'


class NewsItem extends React.Component {
    render() {
        let { title, readFeedInfo, save } = this.props;

        return (
            <div className="feed-news__item">
                <div className="feed-news__title">
                    <span>{ title }</span>
                </div>
                
                {
                    save ?  <span className="feed-news__saved"></span> : ''
                }
                
               
                
                <button className="g__btn feed-news__read" onClick={ readFeedInfo }>
                    read 
                </button>
            </div>
        )
        
    }
}


// =========================================
// Back to channel
// =========================================
const Back = (props) => {
    let content =
        <div className="feeds-aside__back" onClick={ props.backToChannelNews}>
            <span>back</span>
        </div>

    return content
}



class FeedNewsList extends React.Component {
    render() {
        let { newsList } = this.props;

        let createNews = newsList.map((data, index) => (
            <NewsItem key={index}
                      title={data.title}
                      path={data.image}
                      save={data.__save}
                      readFeedInfo={this.props.readFeedInfo.bind(this, index)}
            />
        ))

        return (
            <div className="feed-news__container">
                {createNews}
            </div>
        )

    }
}


class FeedNewsItem extends React.Component {
    render() {
        let { info } = this.props;

        let createCategories = info.categories.map((data, index) => (
            <span key={index} className="categories-block__text">
                { data }
            </span>
        )) 

        return (
            <div className="feed-info__container">
                <div className="feed-info__img">
                    <a href={info.link}>
                        <img src={info.image.hasOwnProperty('url') ? info.image.url : 'https://image.flaticon.com/icons/svg/149/149092.svg'} alt=""/>
                    </a>
                </div>
                
                <div className="feed-info__description">
                    <span className="feed-info__title">{ info.title }</span>
                    <span className="feed-info__description-text">{ info.summary }</span>
                    <span className="feed-info__description-author">{ info.author }</span>
                </div>

                <div className="categories-block">
                    { createCategories }
                </div>
            </div>
        )

    }
}



class ContainerFeeds extends React.Component {
    @i
    render ({ status }) {
        return (
            <div>
                { status === '_CHANNEL' ? this.props.children : '' }
            </div>
        )
    }
}

class ContainerFeedInfo extends React.Component {
    @i
    render ({ status }) {
        return (
            <div>
                { status === '_FEED_INFO' ? this.props.children : '' }
            </div>
        )
    }
}


class ModalFeedsList extends React.Component {
    
    toggleFeedsModal() {
        let { toggleFeeds } = this.props.systemAction;
        toggleFeeds()
    }

    readFeedInfo(index) {
        let { toogleFeedInfo, saveFeed } = this.props.systemAction;
        toogleFeedInfo(index);
        saveFeed(index);
    }

    backToChannelNews() {
        let { toogleFeedInfo } = this.props.systemAction;
        toogleFeedInfo()
    }
    
    render() {
        
        let { st, activeModalStatus } = this.props.system;
        let { feeds, activeChannel, activeIndexFeedNews } = this.props.feeds;

        let activeClass = classNames({
            "feeds-aside__container feeds-aside__container--active" : st === true,
            "feeds-aside__container" : st === false
        })
        
        return (
            <div>
                <aside className={ activeClass }>
                    <div className="nav-modal">
                        <button className="btn__close" onClick={::this.toggleFeedsModal}>
                            <span className="btn__close-line"></span>
                            <span className="btn__close-line"></span>
                            <span className="btn__close-line"></span>
                        </button>
                    </div>
                    
                    
                    <ContainerFeeds status={activeModalStatus}>
                        <div className="feeds-aside__content">
                            <span className="feeds-aside__title">{activeChannel ? feeds[activeChannel].title : '' }</span>
                            <FeedNewsList newsList={feeds.hasOwnProperty(activeChannel) ? feeds[activeChannel].items : []}
                                          readFeedInfo={::this.readFeedInfo}
                            />
                        </div>
                    </ContainerFeeds>

                    <ContainerFeedInfo status={activeModalStatus}>
                        <div className="feeds-aside__content">
                            <Back backToChannelNews={::this.backToChannelNews}/>

                            <FeedNewsItem info={feeds.hasOwnProperty(activeChannel) ? feeds[activeChannel].items[activeIndexFeedNews] : []}/>
                            
                        </div>
                    </ContainerFeedInfo>
                    
                   
                </aside>
                <Bg status={st} toggleFeeds={::this.toggleFeedsModal}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        system: state.System,
        feeds: state.Feeds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        systemAction: bindActionCreators(systemAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFeedsList)
