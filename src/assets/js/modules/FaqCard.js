export default class FaqCard {
  constructor() {
    this.faqCardBtnToggle = document.querySelectorAll('.js-faq-card-toggle');
    this.setupEventListeners();
    this.activeCard = null;
  }

  toggleFaqCard(event) {
    const listItem = event.target.closest('.faq-card');
    listItem.classList.toggle('is-show');

    if (listItem.classList.contains('is-show')) {
      if (this.activeCard && this.activeCard !== listItem) {
        this.activeCard.classList.remove('is-show');
        this.resetDropdownHeight(this.activeCard);
      }
      this.activeCard = listItem;
    } else {
      this.activeCard = null;
    }

    this.animateDropdown(listItem);
  }

  animateDropdown(listItem) {
    const dropdown = listItem.querySelector('.faq-card__dropdown');
    const isShow = listItem.classList.contains('is-show');
    if (isShow) {
      dropdown.style.height = '0';
      const height = dropdown.scrollHeight;
      dropdown.style.height = height + 'px';
    } else {
      dropdown.style.height = dropdown.scrollHeight + 'px';
      setTimeout(() => {
        dropdown.style.height = '0';
      }, 50);
    }
  }

  resetDropdownHeight(listItem) {
    const dropdown = listItem.querySelector('.faq-card__dropdown');
    dropdown.style.height = '0';
  }

  updateDropdownHeight() {
    document.querySelectorAll('.faq-card.is-show').forEach((card) => {
      const dropdown = card.querySelector('.faq-card__dropdown');
      const height = dropdown.scrollHeight;
      dropdown.style.height = height + 'px';
    });
  }

  setupEventListeners() {
    this.faqCardBtnToggle.forEach((button) => {
      button.addEventListener('click', this.toggleFaqCard.bind(this));
    });

    window.addEventListener('resize', () => {
      this.updateDropdownHeight();
    });
  }
}