const express = require('express');
const router = express.Router();
const {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  voteCoupon,
  copyCoupon,
  reportCoupon,
} = require('../controllers/couponController');

router.route('/')
  .get(getCoupons)
  .post(createCoupon);

router.route('/:id')
  .get(getCouponById)
  .put(updateCoupon)
  .delete(deleteCoupon);

router.post('/:id/vote', voteCoupon);
router.post('/:id/copy', copyCoupon);
router.post('/:id/report', reportCoupon);

module.exports = router;
