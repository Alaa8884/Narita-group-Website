'use strict';
const nav = document.querySelector('.nav');
const openBtn = document.querySelector('.open-bar');
const closeBtn = document.querySelector('.close-btn');
const sideBar = document.querySelector('header .nav .sidebar');
const logIn = document.querySelector('.log-in');
const modal = document.querySelector('.modal');
const closeForm = document.querySelectorAll('.close-form');
const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const containerModal = document.querySelector('.log-form.container');
const msgContainerBtns = document.querySelector('.foot-msg-btns');
const btns = document.querySelectorAll('.msg-btn');
const msgInputEmail = document.querySelector('.msg-email');
const overlay = document.querySelector('.overlay');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const gallery = document.querySelector('.gallery');
const scrollUpBtn = document.querySelector('.scroll-up-btn');
const footer = document.querySelector('.footer');
const navHeight = nav.getBoundingClientRect().height;

openBtn.addEventListener('click', () => {
  sideBar.classList.add('active-sidebar');
  overlay.classList.remove('overlay-hidden');
});
closeBtn.addEventListener('click', () => {
  sideBar.classList.remove('active-sidebar');
  overlay.classList.add('overlay-hidden');
});
document.onclick = function (e) {
  if (!sideBar.contains(e.target) && !nav.contains(e.target)) {
    sideBar.classList.remove('active-sidebar');
    overlay.classList.add('overlay-hidden');
  }
};

// Open and Close Form
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
};

logIn.addEventListener('click', openModal);

const closeModal = function () {
  modal.classList.add('hidden');
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

closeForm.forEach((e) => {
  e.addEventListener('click', closeModal);
});

sign_up_btn.addEventListener('click', () => {
  containerModal.classList.add('sign-up-mode');
});

sign_in_btn.addEventListener('click', () => {
  containerModal.classList.remove('sign-up-mode');
});

msgContainerBtns.addEventListener('click', function (e) {
  const clicked = e.target.closest('.msg-btn');
  console.log(clicked);
  console.log(msgContainerBtns);
  if (!clicked) return;

  btns.forEach((t) => t.classList.remove('msg-btn-active'));
  msgInputEmail.setAttribute('name', clicked.getAttribute('data-tab'));
  clicked.classList.add('msg-btn-active');
});


gallery.addEventListener('wheel', (e) => {
  e.preventDefault();
  gallery.scrollLeft += e.deltaY;
  gallery.style.scrollBehavior = 'auto';
});

rightBtn.addEventListener('click', () => {
  gallery.style.scrollBehavior = 'smooth';
  gallery.scrollLeft += 250;
});

leftBtn.addEventListener('click', () => {
  gallery.style.scrollBehavior = 'smooth';
  gallery.scrollLeft -= 300;
});

// Scroll Button
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    scrollUpBtn.style.display = 'none';
  } else {
    scrollUpBtn.style.display = 'block';
  }
};

const footerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.15,
  rootMargin: `-${navHeight}px`,
});

footerObserver.observe(footer);
