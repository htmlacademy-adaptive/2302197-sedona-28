let navPage = document.querySelector('.page-nav__wrapper');
let navToggle = document.querySelector('.main-header__toggle');

navPage.classList.remove('page-nav__wrapper--nojs');

navToggle.addEventListener('click', function () {
  if (navPage.classList.contains('page-nav__wrapper--closed')) {
    navPage.classList.remove('page-nav__wrapper--closed');
    navPage.classList.add('page-nav__wrapper--opened');
  } else {
    navPage.classList.add('page-nav__wrapper--closed');
    navPage.classList.remove('page-nav__wrapper--opened');
  }
});
