export const debounce = (func, wait) => {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
};
