export const composeMobileClass = (className: string, isMobile: boolean) => {
  if (isMobile) {
    return `${className} mobile`;
  }
  return className;
};
