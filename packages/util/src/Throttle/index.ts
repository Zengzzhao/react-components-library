export const throttle = (func: (...args: any[]) => void, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: any[]) {
    if (!timer) {
      func(args);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    }
  };
};
