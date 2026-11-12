window.DNG = window.DNG || {};

DNG.menuView = (function () {
  const { menu, categories } = DNG.data;
  const likeService = DNG.likeService;

  const grid = () => document.querySelector('#menu-grid');

  function formatMoney(value) {
    return `$${Number(value).toFixed(2)}`;
  }

  function renderFeatured() {
    const list = document.querySelector('#featured-list');
    list.replaceChildren();
    menu
      .filter((item) => item.featured)
      .forEach((item) => {
        const li = document.createElement('li');
        const name = document.createElement('span');
        const price = document.createElement('span');
        name.textContent = item.name;
        price.textContent = formatMoney(item.price);
        price.className = 'price';
        li.append(name, price);
        list.appendChild(li);
      });
  }

  function createCard(item) {
    const card = document.createElement('article');
    card.className = 'menu-item';

    const header = document.createElement('div');
    header.className = 'menu-item-head';
    const title = document.createElement('h3');
    title.textContent = item.name;
    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = formatMoney(item.price);
    header.append(title, price);

    const description = document.createElement('p');
    description.className = 'muted';
    description.textContent = item.description;

    const footer = document.createElement('div');
    footer.className = 'menu-item-foot';
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = categories.find((c) => c.slug === item.category).name;

    const like = document.createElement('button');
    like.type = 'button';
    like.className = 'like-btn';
    like.dataset.id = item.id;
    like.setAttribute('aria-label', `Me gusta ${item.name}`);
    const count = document.createElement('span');
    count.className = 'like-count';
    count.textContent = likeService.count(item.id);
    like.append('♥ ', count);

    footer.append(tag, like);
    card.append(header, description, footer);
    return card;
  }

  function renderItems(items) {
    const container = grid();
    container.replaceChildren(...items.map(createCard));

    container.addEventListener('click', (event) => {
      const button = event.target.closest('.like-btn');
      if (!button) return;
      const total = likeService.like(Number(button.dataset.id));
      button.querySelector('.like-count').textContent = total;
      button.classList.add('liked');
    });
  }

  function renderFilters() {
    const filters = document.querySelector('#category-filters');
    const all = [{ slug: 'todos', name: 'Todos' }, ...categories];

    all.forEach((category, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter' + (index === 0 ? ' active' : '');
      button.textContent = category.name;
      button.addEventListener('click', () => {
        filters.querySelectorAll('.filter').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        const items = category.slug === 'todos' ? menu : menu.filter((i) => i.category === category.slug);
        renderItems(items);
      });
      filters.appendChild(button);
    });
  }

  function init() {
    renderFeatured();
    renderFilters();
    renderItems(menu);
  }

  return { init };
})();
