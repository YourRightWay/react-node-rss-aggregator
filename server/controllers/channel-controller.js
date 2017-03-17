import url from 'url'
import request from 'request'
import FeedParser from 'feedparser'
var Promise = require("bluebird");

var data = {
    item: []
}

export const GetChannel = (req, res) => {
    let url_parts = url.parse(req.url, true),
        path = url_parts.query.rssRequest;

    parseFeed(path)
        .then(function () {
            
            res.json(data);
            data = {
                item: []
            }

        }).catch(function (err) {
            console.log(err)
            res.json({
                error: 'Request is not valid'
            });
        })
    
}

function parseFeed (url) {
    return new Promise(function(resolve, reject) {
        try {
            console.log('resolve parseFeed')

            var feedparser = new FeedParser();

            var req = request(url, function (error, response, body) {
                if (error) {
                    reject(new Error("Error request feed: %s", url, error));
                }
            });

            req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
            req.setHeader('accept', 'text/html,application/xhtml+xml');

            req.on('error', function (error) {
                if (error) console.log(error)
            });

            req.on('response', function (res) {
                var stream = this;

                if (res.statusCode !== 200) {

                    reject(new Error("Bad status code: %s", res.statusCode));

                } else {
                    stream.pipe(feedparser);
                }
            });

            feedparser.on('error', function (error) {
                reject(new Error(
                    "Error parsing feed: %s", url, error
                ));
            });

            feedparser.on('readable', function () {
                
                let stream = this,
                    meta = this.meta;
                
                try {
                    
                    let item;
                    
                    data.title = meta.title;
                    data.description = meta.description;
                    data.link = meta.link;
                    data.xmlurl = meta.xmlurl;
                    data.date = meta.date;
                    data.pubdate = meta.pubdate;
                    data.author = meta.author;
                    data.language = meta.language;
                    data.image = meta.image.url;
                    data.categories = meta.categories;
                    data.generator = meta.generator;
                    
                    while ((item = stream.read())) {
                        data.item.push(item);
                    }
                    
                } catch (err) {
                    reject(new Error("Error readning feed: %s", url, err));
                }

            });

            feedparser.on("end", function () {
                console.log('end')
            });
            
            feedparser.on("end", function() {
                resolve(true);
            });
            
        } catch (err) {
            reject(err);
        }
    })
}