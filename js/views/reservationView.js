window.DNG = window.DNG || {};

DNG.reservationView = (function () {
  const ABONO_POR_PERSONA = 5;

  const reservationService = DNG.reservationService;
  const couponService = DNG.couponService;

  const state = { coupon: null };
  let form;

  function formatMoney(value) {
    return `$${Number(value).toFixed(2)}`;
  }

  function todayISO() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
  }

  function setFeedback(selector, message, type = 'info') {
    const element = document.querySelector(selector);
    element.textContent = message;
    element.dataset.type = type;
  }

  function updateEstimate() {
    const people = Number(form.people.value) || 0;
    const base = people * ABONO_POR_PERSONA;
    const discount = state.coupon ? (base * state.coupon.discountPercent) / 100 : 0;
    document.querySelector('#deposit-estimate').textContent = formatMoney(base - discount);
  }

  function applyCoupon() {
    const code = form.coupon.value.trim();
    state.coupon = null;

    if (!code) {
      setFeedback('#coupon-feedback', '');
    } else {
      const coupon = couponService.findValidCoupon(code);
      if (coupon) {
        state.coupon = coupon;
        setFeedback('#coupon-feedback', `Cupón ${coupon.code} aplicado: ${coupon.discountPercent}% de descuento.`, 'success');
      } else {
        setFeedback('#coupon-feedback', 'El cupón no es válido o ya expiró.', 'error');
      }
    }
    updateEstimate();
  }

  function prefillCoupon(code) {
    form.coupon.value = code;
    applyCoupon();
  }

  function onSubmit(event) {
    event.preventDefault();

    try {
      const reservation = reservationService.create({
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        date: form.date.value,
        time: form.time.value,
        people: form.people.value,
        coupon: state.coupon ? state.coupon.code : null,
      });

      setFeedback(
        '#reservation-feedback',
        `¡Reserva confirmada, ${reservation.name}! ${reservation.date} a las ${reservation.time} para ` +
          `${reservation.people} personas. Abono a pagar: ${formatMoney(reservation.deposit)}.`,
        'success'
      );
      form.reset();
      state.coupon = null;
      setFeedback('#coupon-feedback', '');
      updateEstimate();
    } catch (error) {
      setFeedback('#reservation-feedback', error.message, 'error');
    }
  }

  function init() {
    form = document.querySelector('#reservation-form');
    form.date.min = todayISO();
    form.people.addEventListener('input', updateEstimate);
    document.querySelector('#apply-coupon').addEventListener('click', applyCoupon);
    form.addEventListener('submit', onSubmit);
    updateEstimate();
  }

  return { init, prefillCoupon };
})();
