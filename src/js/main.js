// example
$('.example').on('click', (e) => {
  const $this = $(e.currentTarget);
  $this.toggleClass('test');
});
