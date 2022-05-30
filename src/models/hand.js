const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const handSchema = new Schema({
  isDone: Boolean,
  isScoop: Boolean,
  nextIsFantasy: Boolean,
  top: {
    combination: ObjectId,
    cards: [String],
    stats: {
      bonus: Number,
      line: Number,
      total: Number
    }
  },
  middle: {
    combination: ObjectId,
    cards: [String],
    stats: {
      bonus: Number,
      line: Number,
      total: Number
    }
  },
  bottom: {
    combination: ObjectId,
    cards: [String],
    stats: {
      bonus: Number,
      line: Number,
      total: Number
    }
  },
})

module.exports = {
  HandModel: mongoose.model('Hand', handSchema),
  handSchema: handSchema
}