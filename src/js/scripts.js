'use strict'
document.addEventListener('DOMContentLoaded', DOMLoaded => {
  const scrollBarWidth = (window.innerWidth - document.documentElement.clientWidth) + 'px'

  MicroModal.init({
    onShow: modal => {
      document.documentElement.style.marginRight = scrollBarWidth
      document.documentElement.style.overflowY = 'hidden'
    },
    onClose: modal => {
      document.documentElement.style.marginRight = null
      document.documentElement.style.overflowY = null
    },
    openTrigger: 'data-modal',
    closeTrigger: 'data-modal-close',
    openClass: 'is-open',
    disableScroll: false,
    disableFocus: false,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  })

  if (document.querySelector('[data-product-thumbnails]') && document.querySelector('[data-product-slider]')) {
    const productThumbnails = new Splide('[data-product-thumbnails]', {
      fixedWidth: 100,
      fixedHeight: 100,
      perPage: 4,
      gap: 3,
      cover: true,
      isNavigation: true,
      focus: 'center',
      arrows: false,
      pagination: false,
    }).mount()

    const productSlider = new Splide('[data-product-slider]', {
      type: 'fade',
      pagination: false,
      arrows: true,
      rewind: true,
    })

    productSlider.sync(productThumbnails).mount()
  }

  if (document.querySelector('[data-qty]')) {
    document.querySelectorAll('[data-qty]').forEach(qty => {
      const input = qty.querySelector('input')
      const minus = qty.querySelector('[data-qty-minus]')
      const plus = qty.querySelector('[data-qty-plus]')
      plus.addEventListener('click', plusClick => {
        if (input.value >= input.getAttribute('max')) return
        input.value++
      })
      minus.addEventListener('click', minusClick => {
        if (input.value <= input.getAttribute('min')) return
        input.value--
      })
    })
  }

  if (document.querySelector('[data-splide]')) {
    document.querySelectorAll('[data-splide]').forEach(slider => {
      new Splide(slider, {
        perMove: 1,
        arrows: true,
        pagination: false,
        arrowPath: 'm15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z',
        autoplay: true,
        lazyLoad: 'nearby',
        keyboard: false,
        throttle: 500
      }).mount()
    })
  }

  if (document.querySelector('[data-tab]')) {
    const dataAttribute = '[data-tab]'
    const activeClass = 'active'
    document.querySelectorAll(dataAttribute).forEach(element => {
      element.addEventListener('click', function () {
        document.querySelectorAll(dataAttribute).forEach(el => {
          if (el !== this) {
            el.classList.remove(activeClass)
            document.getElementById(el.dataset.tab).classList.remove(activeClass)
          }
        })
        if (element.classList.contains(activeClass)) {
          element.classList.remove(activeClass)
          document.getElementById(element.dataset.tab).classList.remove(activeClass)
        } else {
          element.classList.add(activeClass)
          document.getElementById(element.dataset.tab).classList.add(activeClass)
        }
      })
    })
  }

  if (document.querySelector('[data-modal]')) {
    document.querySelectorAll('[data-modal]').forEach(elem => {
      elem.addEventListener('click', event => {
        event.preventDefault()
      })
    })
  }

  if (document.querySelector('[data-filter-collapse]')) {
    document.querySelectorAll('[data-filter-collapse]').forEach(element => {
      element.addEventListener('click', function () {
        let currentClick = this
        let currentStatus = this.dataset.filterCollapse
        let parent = this.parentNode
        Array.from(parent.children).forEach(child => {
          if (child === currentClick)
            return

          switch (currentStatus) {
            case '-':
              child.style.display = 'none'
              this.dataset.filterCollapse = '+'
              break
            case '+':
              child.style.display = null
              this.dataset.filterCollapse = '-'
              break
          }
        })
      })
    })
  }

})