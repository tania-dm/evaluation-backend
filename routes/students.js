// routes/students.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Student } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

module.exports = io => {
  router
    .get('/students', (req, res, next) => {
      Student.find()
        // Newest students first
        .sort({ createdAt: -1 })
        // Send the data in JSON format
        .then((students) => res.json(students))
        // Throw a 500 error if something goes wrong
        .catch((error) => next(error))
    })
    .get('/student/:id', (req, res, next) => {
      const id = req.params.id

      Student.findById(id)
        .then((student) => {
          if (!student) { return next() }
          res.json(student)
        })
        .catch((error) => next(error))
    })
    .post('/students', authenticate, (req, res, next) => {
      const newStudent = req.body

      Student.create(newStudent)
        .then((student) => {
          io.emit('action', {
            type: 'STUDENT_CREATED',
            payload: student
          })
          res.json(student)
        })
        .catch((error) => next(error))
    })
    .patch('/student/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      const userId = req.account._id.toString()

      Student.findById(id)
        .then((student) => {
          if (!student) { return next() }

          const updatedStudent = req.body

          Student.findByIdAndUpdate(id, { $set: updatedStudent }, { new: true })
            .then((student) => {
              io.emit('action', {
                type: 'STUDENT_UPDATED',
                payload: student
              })
              res.json(student)
            })
            .catch((error) => next(error))
        })
        .catch((error) => next(error))
    })

  return router
}
