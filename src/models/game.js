const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const gameSchema = new Schema({
  creationTime: Date,
  hostName: String,
  name: String,
  stake: Number,
  status: String,
  players: [String],
  history: [ObjectId],
  stats: [{
    player: String,
    stat: Number
  }]
})

module.exports = mongoose.model('Game', gameSchema)
