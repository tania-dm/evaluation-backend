// models/student.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  color: { type: String, default: 'red', required: true},
  batchId: { type: Schema.Types.ObjectId, ref: 'batches', required: true }
})

module.exports = mongoose.model('students', studentSchema)
