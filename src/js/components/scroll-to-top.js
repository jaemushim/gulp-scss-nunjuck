$('#scroll-to-top').on('click', (e) => {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 400);
});
