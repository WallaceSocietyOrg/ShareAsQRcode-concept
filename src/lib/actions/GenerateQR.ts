import QRCode from 'qrcode';
import type { Action } from 'svelte/action';

const GenerateQR: Action<HTMLDivElement, { text: string; class: string }> = (
  node,
  { text, class: clazz },
) => {
  const updateNode = (url: string, text: string, clazz: string) => {
    node.innerHTML = url
      .replaceAll('fill="#ffffff"', 'stroke="none" fill="none"')
      .replaceAll('stroke="#000000"', '');
    (node.firstElementChild as HTMLElement).setAttribute('class', clazz);
    const viewBox = Number(
      node.firstElementChild?.getAttribute('viewBox')?.split(' ')?.[3],
    );

    const scale = 82 / 41;
    if (!isNaN(viewBox)) {
      (node.firstElementChild as HTMLElement).innerHTML =
        `<image height="${scale * viewBox}" width="${
          scale * viewBox
        }" href="qr-frame.svg" />` + node.firstElementChild?.innerHTML;
      node.firstElementChild?.setAttribute(
        'viewBox',
        `0 0 ${viewBox * scale} ${viewBox * scale}`,
      );
      node.firstElementChild?.lastElementChild?.setAttribute(
        'style',
        `transform:scale(${
          0.68 * scale
        }) translate(25%, 32.15%);transform-origin:center`,
      );
    }
  };
  QRCode.toString(text, { type: 'svg' }).then((url: string) => {
    updateNode(url, text, clazz);
  });
  return {
    update({ text, class: clazz }) {
      QRCode.toString(text, { type: 'svg' }).then((url: string) => {
        updateNode(url, text, clazz);
      });
    },
    destroy() {},
  };
};
export default GenerateQR;
