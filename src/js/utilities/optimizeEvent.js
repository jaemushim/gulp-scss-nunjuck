const optimizeEvent = (type, name, _obj) => {
  const obj = _obj || window;
  let running = false;
  const func = (e) => {
    if (running) { return; }
    running = true;
    requestAnimationFrame(() => {
      obj.dispatchEvent(new CustomEvent('optimizedMousemove', { detail: e }));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

optimizeEvent('scroll', 'optimizedScroll');
optimizeEvent('mousemove', 'optimizedMousemove');
