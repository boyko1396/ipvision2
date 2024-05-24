export default class TabsDocument {
  constructor() {
    const tabNavSolution = document.querySelector('.js-tab-nav-solution');
    if (!tabNavSolution) return;

    this.tabNavItems = document.querySelectorAll('.js-tab-nav-solution li');
    this.tabContentContainer = document.querySelector('.js-tab-content-solution');
    this.tabContentContainerInner = document.querySelector('.js-tab-content-solution-inner');
    this.tabContentItems = document.querySelectorAll('.js-tab-content-solution-inner > div');
    
    this.activeTabIndex = 0;

    window.addEventListener('resize', () => {
      this.handleResize();
    });

    setTimeout(() => {
      this.setInitialTab();
    }, 100);
    
    this.tabNavItems.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        this.handleTabClick(index);
      });
    });
  }

  setInitialTab() {
    this.setActiveTab(0);
  }

  setActiveTab(index) {
    const activeTabHeight = this.tabContentItems[index].clientHeight;
    const translateY = this.calculateTranslateY(index);

    this.applyTransformAndHeight(translateY, activeTabHeight);
    this.activeTabIndex = index;
    this.showActiveTab();
    this.setActiveNavItem(index);
  }

  calculateTranslateY(index) {
    let translateY = 0;
    for (let i = 0; i < index; i++) {
      if (this.tabContentItems[i].classList.contains('is-show')) {
        translateY += this.tabContentItems[i].clientHeight;
      }
    }
    return translateY;
  }

  applyTransformAndHeight(translateY, activeTabHeight) {
    this.tabContentContainerInner.style.transform = `translateY(-${translateY}px)`;
    this.tabContentContainer.style.height = `${activeTabHeight}px`;
  }

  showActiveTab() {
    this.tabContentItems.forEach((item, index) => {
      if (index === this.activeTabIndex) {
        item.classList.add('is-show');
      } else {
        item.classList.remove('is-show');
      }
    });
  }

  setActiveNavItem(index) {
    this.tabNavItems.forEach(item => {
      item.classList.remove('is-active');
    });
    this.tabNavItems[index].classList.add('is-active');
  }

  handleResize() {
    const activeIndex = this.getActiveTabIndex();
    const translateY = this.calculateTranslateY(activeIndex);
    const activeTabHeight = this.tabContentItems[activeIndex].clientHeight;

    this.applyTransformAndHeight(translateY, activeTabHeight);
  }

  handleTabClick(index) {
    this.setActiveTab(index);
  }
}
