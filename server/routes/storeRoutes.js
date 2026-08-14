const express = require('express');
const router = express.Router();
const { getStores, getStoreBySlug } = require('../controllers/storeController');

router.get('/', getStores);
router.get('/:slug', getStoreBySlug);

module.exports = router;
