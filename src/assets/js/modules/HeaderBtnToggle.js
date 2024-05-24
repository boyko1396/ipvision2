class HeaderBtnToggle {
  constructor() {
    this.burgerButton = document.querySelector('.js-header-toggle');
    this.body = document.body;
    this.headerNav = document.querySelector('.header__dropdown');
    
    this.burgerButton.addEventListener('click', () => this.toggleMenu());
  }
  
  toggleMenu() {
    this.burgerButton.classList.toggle('is-active');
    this.body.classList.toggle('is-menu-opened');
    this.headerNav.classList.toggle('is-show');
  }
}

export default HeaderBtnToggle;