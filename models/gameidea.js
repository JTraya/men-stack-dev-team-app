const mongoose = require('mongoose');

const gameIdeaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    details: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    favoritesByUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});

const GameIdea = mongoose.model('GameIdea', gameIdeaSchema);

module.exports = GameIdea;