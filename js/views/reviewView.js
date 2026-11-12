window.DNG = window.DNG || {};

DNG.reviewView = (function () {
  const reviewService = DNG.reviewService;

  function createReviewCard(review) {
    const article = document.createElement('article');
    article.className = 'review card';

    const head = document.createElement('div');
    head.className = 'review-head';
    const name = document.createElement('strong');
    name.textContent = review.name;
    const stars = document.createElement('span');
    stars.className = 'stars';
    stars.setAttribute('aria-label', `${review.rating} de 5`);
    stars.textContent = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    head.append(name, stars);

    const comment = document.createElement('p');
    comment.textContent = review.comment;

    const date = document.createElement('time');
    date.className = 'muted';
    date.dateTime = review.createdAt;
    date.textContent = new Date(review.createdAt).toLocaleDateString('es');

    article.append(head, comment, date);
    return article;
  }

  function render(reviews) {
    document.querySelector('#reviews-list').replaceChildren(...reviews.map(createReviewCard));
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const feedback = document.querySelector('#review-feedback');

    try {
      reviewService.create({
        name: form.name.value,
        rating: form.rating.value,
        comment: form.comment.value,
      });
      form.reset();
      feedback.textContent = '¡Gracias por tu reseña!';
      feedback.dataset.type = 'success';
    } catch (error) {
      feedback.textContent = error.message;
      feedback.dataset.type = 'error';
    }
  }

  function init() {
    render(reviewService.list());
    DNG.EventBus.getInstance().on('review:created', () => render(reviewService.list()));
    document.querySelector('#review-form').addEventListener('submit', onSubmit);
  }

  return { init };
})();
