const mongoose = require('mongoose')
const { Schema } = mongoose

exports.combinationSchema = new Schema({
  weight: Number,
  name: String,
  caption: {
    en: String,
    ua: String
  }
})