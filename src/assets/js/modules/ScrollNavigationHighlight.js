class ScrollNavigationHighlight {
  constructor() {
    this.navLinks = document.querySelectorAll('.js-page-nav a');
    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    const pageNav = document.querySelector('.js-page-nav');
    if (pageNav) {
      window.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    }
  }

  handleScroll() {
    this.navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section.getBoundingClientRect().top <= window.innerHeight / 2 &&
        section.getBoundingClientRect().bottom >= window.innerHeight / 2) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }
}

export default ScrollNavigationHighlight;