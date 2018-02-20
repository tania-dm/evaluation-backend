// models/evaluation.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  color: { type: String, default: 'red', required: true},
  remark: {type: String }
  studentId: { type: Schema.Types.ObjectId, ref: 'students', required: true }

})

module.exports = mongoose.model('evaluations', evaluationSchema)
