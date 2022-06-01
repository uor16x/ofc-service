const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const gameSchema = new Schema({
  creationTime: Date,
  hostName: String,
  name: String,
  stake: Number,
  status: String,
  players: [{
    name: String,
    hand: [{
      isDone: Boolean,
      isScoop: Boolean,
      nextIsFantasy: Boolean,
      top: {
        combination: String,
        cards: [String],
        stats: {
          bonus: Number,
          line: Number,
          total: Number
        }
      },
      middle: {
        combination: String,
        cards: [String],
        stats: {
          bonus: Number,
          line: Number,
          total: Number
        }
      },
      bottom: {
        combination: String,
        cards: [String],
        stats: {
          bonus: Number,
          line: Number,
          total: Number
        }
      },
    }]
  }],
  history: [ObjectId],
  stats: [{
    player: String,
    stat: Number
  }]
})

module.exports = mongoose.model('Game', gameSchema)
