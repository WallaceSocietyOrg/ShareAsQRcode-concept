import type { Action } from 'svelte/action';
const clickOutside: Action<HTMLElement> = (node: HTMLElement) => {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('clickoutside'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
};
export default clickOutside;
