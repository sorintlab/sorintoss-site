
$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    items: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 5
      }
    }
  })
})
