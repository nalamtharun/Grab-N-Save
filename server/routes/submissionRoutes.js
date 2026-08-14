const express = require('express');
const router = express.Router();
const { createSubmission, getSubmissions } = require('../controllers/submissionController');

router.route('/')
  .post(createSubmission)
  .get(getSubmissions);

module.exports = router;
