window.DNG = window.DNG || {};

DNG.couponService = (function () {
  const coupons = DNG.data.coupons;

  function normalizeCode(code) {
    return String(code || '').trim().toUpperCase();
  }

  /**
   * Devuelve el cupón si existe, está activo y no ha vencido; si no, null.
   */
  function findValidCoupon(rawCode) {
    const code = normalizeCode(rawCode);
    if (!code) return null;

    const coupon = coupons.find((c) => c.code === code);
    if (!coupon || !coupon.active) return null;

    const today = new Date().toLocaleDateString('es-CL');
    if (coupon.expiresAt < today) return null;

    return coupon;
  }

  function applyDiscount(amount, coupon) {
    if (!coupon) return amount;
    const discounted = amount - (amount * coupon.discountPercent) / 100;
    return Math.round(discounted * 100) / 100;
  }

  return { findValidCoupon, applyDiscount, normalizeCode };
})();
