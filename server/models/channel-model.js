import mongoose, { Schema } from 'mongoose';
mongoose.Promise = require('bluebird');

import SERVER_CONFIG from '../config';

mongoose.connect(SERVER_CONFIG.db, err => {
    if (err) throw err;

    console.log(`Mongo connected!`);
});

var ChannelSchema = new Schema({
    title: String,
    articles: Array,
    counter: Number
});

export default mongoose.model('Channel', ChannelSchema)
