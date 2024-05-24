import IMask from 'imask';

export default class PhoneMask {
  constructor(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    const maskOptions = {
      mask: '+{7} (000) 000 00 00',
      lazy: true,
    };
    this.mask = IMask(element, maskOptions);

    element.addEventListener('focus', () => {
      this.mask.updateOptions({
        lazy: false
      });
    });

    element.addEventListener('blur', () => {
      this.mask.updateOptions({
        lazy: true
      });
    });
  }
}