'use strict';
export const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
const HomeLink = document.querySelector('.home-link');
const whatWeDo = document.querySelector('.what-link');
export const openBtn = document.querySelector('.open-bar');
export const closeBtn = document.querySelector('.close-btn');
export const sideBar = document.querySelector('header .nav .sidebar');
const welcome = document.querySelector('.s-welcome');
export const logIn = document.querySelector('.log-in');
export const modal = document.querySelector('.modal');
export const closeForm = document.querySelectorAll('.close-form');
export const sign_in_btn = document.querySelector('#sign-in-btn');
export const sign_up_btn = document.querySelector('#sign-up-btn');
export const containerModal = document.querySelector('.log-form.container');
export const msgContainerBtns = document.querySelector('.foot-msg-btns');
export const btns = document.querySelectorAll('.msg-btn');
export const msgInputEmail = document.querySelector('.msg-email');
const hiddenEl = document.querySelectorAll('.section-hidden');
export const overlay = document.querySelector('.overlay');
export const scrollUpBtn = document.querySelector('.scroll-up-btn');

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
// Make Nav Bar Sticky

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    HomeLink.classList.remove('active-nav-link');
    whatWeDo.classList.add('active-nav-link');
    scrollUpBtn.style.display = 'block';
  } else {
    nav.classList.remove('sticky');
    HomeLink.classList.add('active-nav-link');
    whatWeDo.classList.remove('active-nav-link');
    scrollUpBtn.style.display = 'none';

  }
};

const welcomeObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`,
});

welcomeObserver.observe(welcome);

// Hidden Sections and Remove Hidden
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

hiddenEl.forEach((el) => observer.observe(el));

// Open and Close Form
export const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
};

logIn.addEventListener('click', openModal);

export const closeModal = function () {
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
  if (!clicked) return;

  btns.forEach((t) => t.classList.remove('msg-btn-active'));
  msgInputEmail.setAttribute('name', clicked.getAttribute('data-tab'));
  clicked.classList.add('msg-btn-active');
});

