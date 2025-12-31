export const throttle = (func, wait) => {
  let timer = null;
  return function (...args) {
    if (!timer) {
      func.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    }
  };
};
