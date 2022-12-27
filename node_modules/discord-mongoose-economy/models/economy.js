const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const economy = new Schema({
    guildID: String,
    userID: String,
    wallet: {
        type: Number,
        default: 0
    },
    bank: {
        type: Number,
        default: 0
    },
    bankCapacity:{
        type: Number,
        default: 2500
    },
    daily: {
        type: String,
        default: "0"
    }
})

module.exports = mongoose.model('economy', economy)