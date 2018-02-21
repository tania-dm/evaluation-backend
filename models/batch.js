// models/batch.js
const mongoose = require('../config/database')
const studentModel = require('./student')
const { Schema } = mongoose

const batchSchema = new Schema({
  number: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  students: [ studentModel.schema ]
})

module.exports = mongoose.model('batches', batchSchema)
