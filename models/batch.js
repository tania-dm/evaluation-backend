// models/batch.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const batchSchema = new Schema({
  number: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  students: [ { type: Schema.Types.ObjectId, ref: 'students'} ]
})

module.exports = mongoose.model('batches', batchSchema)
