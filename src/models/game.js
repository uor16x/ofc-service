const mongoose = require('mongoose')
const { handSchema } = require('./hand')
const { Schema, ObjectId } = mongoose

const gameSchema = new Schema({
  creationTime: Date,
  hostName: String,
  name: String,
  stake: Number,
  status: String,
  players: [{
    name: String,
    hand: handSchema
  }],
  history: [ObjectId],
  stats: [{
    player: String,
    stat: Number
  }]
})

module.exports = mongoose.model('Game', gameSchema)
