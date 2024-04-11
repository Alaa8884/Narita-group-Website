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
const HomeLink = document.querySelector('.home-link');
const whatWeDo = document.querySelector('.what-link');
const scrollUpBtn = document.querySelector('.scroll-up-btn');
const footer = document.querySelector('.footer');
const rewardLinks = document.querySelector('.reward-links');
const rewardsPages = document.querySelectorAll('.reward');
const rewardsContentMain = document.querySelector('.rewards-content-main');
const startReward = document.querySelector('.start');

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
  if (!clicked) return;

  btns.forEach((t) => t.classList.remove('msg-btn-active'));
  msgInputEmail.setAttribute('name', clicked.getAttribute('data-tab'));
  clicked.classList.add('msg-btn-active');
});

// Make Nav Bar Sticky
const navHeight = nav.getBoundingClientRect().height;

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

rewardLinks.addEventListener('click', function (e) {
  const btnActive = e.target.closest('.reward-link');
  if (!btnActive) return;

  rewardsPages.forEach((el) => el.classList.remove('active-reward'));
  document
    .querySelector(`.reward-${btnActive.dataset.view}`)
    .classList.add('active-reward');

  startReward.scrollIntoView({ behavior: 'smooth' });
});

rewardsContentMain.addEventListener('click', function (e) {
  const btnActive = e.target.closest('.information-main');
  if (!btnActive) return;

  rewardsPages.forEach((el) => el.classList.remove('active-reward'));
  document
    .querySelector(`.reward-${btnActive.dataset.view}`)
    .classList.add('active-reward');

  startReward.scrollIntoView({ behavior: 'smooth' });
});
