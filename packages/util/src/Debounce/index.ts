export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
