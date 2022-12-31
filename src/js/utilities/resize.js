let timer = null;

const resizeTimeout = (fn, options = { delay: 150 }) => {
  fn();
  $(window).on('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, options.delay);
  });
};
