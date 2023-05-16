const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController') 

router
    .route('/')
    .get(reviewController.findAllReviews)
    // .post(authController.protect, reviewController.createReview)
    .post(reviewController.createReview)

router
    .route('/:id')
    // .put(authController.protect, authController.restrictToOwnUser, reviewController.updateReview)
    .put(reviewController.updateReview)

module.exports = router;