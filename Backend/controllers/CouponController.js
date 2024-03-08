import CouponModel from "../models/Coupon.js"

export const getAll = async (req, res) => {
  try {
    const coupons = await CouponModel.find();

    res.json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t get coupons!'
    })
  }
}

export const getByCode = async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    
    const coupon = await CouponModel.find({ code: couponCode });

    res.json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t find coupon!'
    })
  }
}
