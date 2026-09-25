(() => {
  'use strict';
  const dialog = document.querySelector('.viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const links = [...document.querySelectorAll('[data-frame]')];
  const image = document.getElementById('viewer-image');
  const caption = document.getElementById('viewer-caption');
  const counter = document.getElementById('viewer-counter');
  const original = document.getElementById('viewer-original');
  const prev = document.getElementById('viewer-prev');
  const next = document.getElementById('viewer-next');
  const close = document.getElementById('viewer-close');
  let current = 0;
  let opener;
  function render(index) {
    current = index;
    const link = links[current];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure').querySelector('h2').textContent;
    counter.textContent = `${current + 1} / ${links.length}`;
    original.href = link.href;
    prev.disabled = current === 0;
    next.disabled = current === links.length - 1;
  }
  links.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener = link;
    render(index);
    dialog.showModal();
    document.body.classList.add('viewing');
    close.focus();
  }));
  close.addEventListener('click', () => dialog.close());
  prev.addEventListener('click', () => { if (current > 0) render(current - 1); });
  next.addEventListener('click', () => { if (current < links.length - 1) render(current + 1); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && current > 0) { event.preventDefault(); render(current - 1); }
    if (event.key === 'ArrowRight' && current < links.length - 1) { event.preventDefault(); render(current + 1); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('viewing');
    opener?.focus();
  });
})();
