/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import "files/script.js";
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

// support webp, identify device
import BaseHelpers from './helpers/BaseHelpers.js';
import HeaderBtnToggle from './modules/HeaderBtnToggle.js';
import FaqCard from './modules/FaqCard.js';
import TextareaAutoresizer from './modules/TextareaAutoresizer.js';
import PhoneMask from './modules/PhoneMask.js';
import * as Util from './libs/utils.min.js';
import TabsDocument from './modules/TabsDocument.js';
import ScrollNavigationHighlight from './modules/ScrollNavigationHighlight.js';

BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', function() {
  function setEqualHeight() {
    const blocks = document.querySelectorAll('.js-equal-height');
    let maxHeight = 0;

    blocks.forEach(function(block) {
      block.style.height = 'auto';
      const blockHeight = block.offsetHeight;
      maxHeight = Math.max(maxHeight, blockHeight);
    });

    blocks.forEach(function(block) {
      block.style.height = maxHeight + 'px';
    });
  }

  window.addEventListener('load', setEqualHeight);
  window.addEventListener('resize', setEqualHeight);

  // header nav mobile toggle
  const headerBtnToggle = new HeaderBtnToggle();

  // faq card
  const faqCard = new FaqCard();

  // textarea autoresize
  new TextareaAutoresizer('.js-textarea-autoresizing');

  // mask phone
  new PhoneMask('.js-phone-mask');

  // nav about scroll
  const scrollNavHighlight = new ScrollNavigationHighlight();
  scrollNavHighlight.init();

  // tabs document
  const tabsDocument = new TabsDocument();

  // stacking cards
  (function() {
    var StackCards = function(element) {
      this.element = element;
      this.items = this.element.getElementsByClassName('js-stack-card');
      this.scrollingFn = false;
      this.scrolling = false;
      initStackCardsEffect(this); 
      initStackCardsResize(this); 
    };

    function initStackCardsEffect(element) {
      setStackCards(element);
      var observer = new IntersectionObserver(stackCardsCallback.bind(element), { threshold: [0, 1] });
      observer.observe(element.element);
    };

    function initStackCardsResize(element) {
      element.element.addEventListener('resize-stack-cards', function(){
        setStackCards(element);
        animateStackCards.bind(element);
      });
    };
    
    function stackCardsCallback(entries) {
      if(entries[0].isIntersecting) {
        if(this.scrollingFn) return;
        stackCardsInitEvent(this);
      } else {
        if(!this.scrollingFn) return;
        window.removeEventListener('scroll', this.scrollingFn);
        this.scrollingFn = false;
      }
    };
    
    function stackCardsInitEvent(element) {
      element.scrollingFn = stackCardsScrolling.bind(element);
      window.addEventListener('scroll', element.scrollingFn);
    };

    function stackCardsScrolling() {
      if(this.scrolling) return;
      this.scrolling = true;
      window.requestAnimationFrame(animateStackCards.bind(this));
    };

    function setStackCards(element) {
      element.marginY = getComputedStyle(element.element).getPropertyValue('--stack-cards-gap');
      getIntegerFromProperty(element);
      element.elementHeight = element.element.offsetHeight;

      var cardStyle = getComputedStyle(element.items[0]);
      element.cardTop = Math.floor(parseFloat(cardStyle.getPropertyValue('top')));
      element.cardHeight = Math.floor(parseFloat(cardStyle.getPropertyValue('height')));

      element.windowHeight = window.innerHeight;

      if(isNaN(element.marginY)) {
        element.element.style.paddingBottom = '0px';
      } else {
        element.element.style.paddingBottom = (element.marginY*(element.items.length - 1))+'px';
      }

      for(var i = 0; i < element.items.length; i++) {
        if(isNaN(element.marginY)) {
          element.items[i].style.transform = 'none;';
        } else {
          element.items[i].style.transform = 'translateY('+element.marginY*i+'px)';
        }
      }
    };

    function getIntegerFromProperty(element) {
      var node = document.createElement('div');
      node.setAttribute('style', 'opacity:0; visibility: hidden;position: absolute; height:'+element.marginY);
      element.element.appendChild(node);
      element.marginY = parseInt(getComputedStyle(node).getPropertyValue('height'));
      element.element.removeChild(node);
    };

    function animateStackCards() {
      if (isNaN(this.marginY)) { 
        this.scrolling = false;
        return; 
      }

      var top = this.element.getBoundingClientRect().top;

      if (this.cardTop - top + this.element.windowHeight - this.elementHeight - this.cardHeight + this.marginY + this.marginY * this.items.length > 0) { 
        this.scrolling = false;
        return;
      }

      var lastCollapsedIndex = -1;

      for (var i = 0; i < this.items.length; i++) { 
        var scrolling = this.cardTop - top - i * (this.cardHeight + this.marginY);
        if (scrolling > 0) {
          var scaling;
          if (window.innerWidth < 640) {
            scaling = i == this.items.length - 1 ? 1 : (this.cardHeight - scrolling * 0.084) / this.cardHeight;
          } else {
            scaling = i == this.items.length - 1 ? 1 : (this.cardHeight - scrolling * 0.05) / this.cardHeight;
          }
          this.items[i].style.transform = 'translateY(' + this.marginY * i + 'px) scale(' + scaling + ')';

          var blurValue;
          if (i === 0) {
            blurValue = Math.min(scrolling / (this.cardHeight + this.marginY) * 2.1, 2.1);
          } else if (i === 1) {
            blurValue = Math.min(scrolling / (this.cardHeight + this.marginY) * 2, 2);
          } else {
            blurValue = 0;
          }
          this.items[i].style.filter = 'blur(' + blurValue + 'px)';
          
          if (i < this.items.length - 1 && blurValue === (i === 0 ? 2.1 : 2)) {
            this.items[i].classList.add('is-collapsed');
            lastCollapsedIndex = i;
          } else {
            this.items[i].classList.remove('is-collapsed');
          }
        } else {
          this.items[i].style.transform = 'translateY(' + this.marginY * i + 'px)';
          this.items[i].style.filter = 'blur(0px)';
          this.items[i].classList.remove('is-collapsed');
        }
      }

      var stackCardsElement = document.querySelector('.js-stack-cards');
      if (stackCardsElement) {
        var activeCardClass = 'is-active-card-' + lastCollapsedIndex;
        
        for (var i = 0; i < this.items.length; i++) { 
          stackCardsElement.classList.remove('is-active-card-' + i);
        }

        if (lastCollapsedIndex !== -1) {
          stackCardsElement.classList.add(activeCardClass);
        }
      }

      this.scrolling = false;
    }

    var stackCards = document.getElementsByClassName('js-stack-cards'),
      intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
      reducedMotion = Util.osHasReducedMotion();
      
    if(stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) { 
      var stackCardsArray = [];
      for(var i = 0; i < stackCards.length; i++) {
        (function(i){
          stackCardsArray.push(new StackCards(stackCards[i]));
        })(i);
      }
      
      var resizingId = false,
        customEvent = new CustomEvent('resize-stack-cards');
      
      window.addEventListener('resize', function() {
        clearTimeout(resizingId);
        resizingId = setTimeout(doneResizing, 500);
      });

      function doneResizing() {
        for( var i = 0; i < stackCardsArray.length; i++) {
          (function(i){stackCardsArray[i].element.dispatchEvent(customEvent)})(i);
        };
      };
    }
  }());
});