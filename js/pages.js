'use strict';
import * as all from '../script.js';
const footer = document.querySelector('.footer');
const navHeight = all.nav.getBoundingClientRect().height;

all.openBtn.addEventListener('click', () => {
  all.sideBar.classList.add('active-sidebar');
  all.overlay.classList.remove('overlay-hidden');
});
all.closeBtn.addEventListener('click', () => {
  all.sideBar.classList.remove('active-sidebar');
  all.overlay.classList.add('overlay-hidden');
});
document.onclick = function (e) {
  if (!all.sideBar.contains(e.target) && !all.nav.contains(e.target)) {
    all.sideBar.classList.remove('active-sidebar');
    all.overlay.classList.add('overlay-hidden');
  }
};

// Open and Close Form

all.logIn.addEventListener('click', all.openModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !all.modal.classList.contains('hidden')) {
    all.closeModal();
  }
});

all.closeForm.forEach((e) => {
  e.addEventListener('click', all.closeModal);
});

all.sign_up_btn.addEventListener('click', () => {
  all.containerModal.classList.add('sign-up-mode');
});

all.sign_in_btn.addEventListener('click', () => {
  all.containerModal.classList.remove('sign-up-mode');
});

all.msgContainerBtns.addEventListener('click', function (e) {
  const clicked = e.target.closest('.msg-btn');
  if (!clicked) return;

  all.btns.forEach((t) => t.classList.remove('msg-btn-active'));
  all.msgInputEmail.setAttribute('name', clicked.getAttribute('data-tab'));
  clicked.classList.add('msg-btn-active');
});

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    all.scrollUpBtn.style.display = 'none';
  } else {
    all.scrollUpBtn.style.display = 'block';
  }
};

const footerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.15,
  rootMargin: `-${navHeight}px`,
});

footerObserver.observe(footer);
