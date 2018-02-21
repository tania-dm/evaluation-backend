// routes/evaluations.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Evaluation } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

module.exports = io => {
  router
    .get('/evaluations', (req, res, next) => {
      Evaluation.find()
        // Newest evals first
        .sort({ createdAt: -1 })
        // Send the data in JSON format
        .then((evaluations) => res.json(evaluations))
        // Throw a 500 error if something goes wrong
        .catch((error) => next(error))
    })
    .get('/evaluation/:id', (req, res, next) => {
      const id = req.params.id

      Evaluation.findById(id)
        .then((evaluation) => {
          if (!evaluation) { return next() }
          res.json(evaluation)
        })
        .catch((error) => next(error))
    })
    .post('/evaluations', authenticate, (req, res, next) => {
      const newEvaluation = req.body

      Evaluation.create(newEvaluation)
        .then((evaluation) => {
          io.emit('action', {
            type: 'EVALUATION_CREATED',
            payload: evaluation
          })
          res.json(evaluation)
        })
        .catch((error) => next(error))
    })
    .patch('/evaluation/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      const userId = req.account._id.toString()

      Evaluation.findById(id)
        .then((evaluation) => {
          if (!evaluation) { return next() }

          const updatedEvaluation = req.body

          Evaluation.findByIdAndUpdate(id, { $set: updatedEvaluation }, { new: true })
            .then((evaluation) => {
              io.emit('action', {
                type: 'EVALUATION_UPDATED',
                payload: evaluation
              })
              res.json(evaluation)
            })
            .catch((error) => next(error))
        })
        .catch((error) => next(error))
    })

  return router
}
