class TextareaAutoresizer {
  constructor(selector) {
    this.textareas = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.textareas.forEach(textarea => {
      this.adjustHeight(textarea);
      textarea.addEventListener('input', () => {
        this.adjustHeight(textarea);
      });
    });
  }

  adjustHeight(elem) {
    elem.style.height = 'auto';
    elem.style.height = elem.scrollHeight + 'px';
  }
}

export default TextareaAutoresizer;