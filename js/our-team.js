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

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider-btn-left');
  const btnRight = document.querySelector('.slider-btn-right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots-dot" data-slide="${i}" aria-label="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots-dot')
      .forEach((dot) => dot.classList.remove('dots-dot--active'));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add('dots-dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots-dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

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
