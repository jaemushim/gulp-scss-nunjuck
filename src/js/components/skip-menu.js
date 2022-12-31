$('.skip-menu__link').on('focus', (e) => {
  $(e.target).css('top', 0);
});
$('.skip-menu__link:last-child').on('focusout', () => {
  $('.skip-menu').css('top', '-50px');
});
