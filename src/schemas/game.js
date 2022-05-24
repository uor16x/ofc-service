const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

exports.gameSchema = new Schema({
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