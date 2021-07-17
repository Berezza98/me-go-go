export const removeChildren = (el) => {
  const children = el.children;
  if (children.length > 0) {
    Array.from(children).forEach(child => el.removeChild(child));
  }
}