const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')
const { Schema } = mongoose

const types = {}

const actionSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  ip: String,
  entryPoint: String,
  params: Object,
  response: Object,
  err: Object,
  timestamp: Date,
  done: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Action', actionSchema)
module.exports.TYPES = types
