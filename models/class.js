// models/class.js
const mongoose = require('../config/database')
const studentModel = require('./student')
const { Schema } = mongoose

const classSchema = new Schema({
  number: { type: Number, required: true },
  startDate: { type: Date, default: Date.now, required: true },
  endDate: { type: Date, default: Date.now, required: true },
  students: [ studentModel.schema ]
})

module.exports = mongoose.model('classes', classSchema)
