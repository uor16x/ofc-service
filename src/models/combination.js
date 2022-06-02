const mongoose = require('mongoose')
const { Schema } = mongoose

const combinationSchema = new Schema({
  weight: Number,
  name: String,
  caption: {
    en: String,
    ua: String
  }
})

module.exports = mongoose.model('Combination', combinationSchema)
