window.DNG = window.DNG || {};

/**
 * Banner de campañas: los links de redes sociales llegan como
 * index.html?promo=CODIGO y el cupón se precarga en el formulario.
 */
DNG.promoView = (function () {
  function init() {
    const params = new URLSearchParams(window.location.search);
    const promo = params.get('promo');
    if (!promo) return;

    const banner = document.querySelector('#promo-banner');
    banner.innerHTML = `🎉 Llegaste con el código <strong>${promo}</strong>. Ya lo aplicamos en tu reserva.`;
    banner.hidden = false;

    DNG.reservationView.prefillCoupon(promo);
  }

  return { init };
})();
