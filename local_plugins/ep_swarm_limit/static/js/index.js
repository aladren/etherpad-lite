'use strict';

const MAX = 1500;

exports.postAceInit = (_, context) => {
  setTimeout(() => {
    const notice = document.createElement('div');

    notice.innerText = 'SWARM LIMIT ACTIVE';
    notice.style.position = 'fixed';
    notice.style.top = '10px';
    notice.style.right = '10px';
    notice.style.background = 'yellow';
    notice.style.padding = '8px';
    notice.style.zIndex = '999999';

    document.body.appendChild(notice);

    const ace = context.ace;

    setInterval(() => {
      try {
        const text = ace.ace_getRep().alltext;

        if (text.length > MAX) {
          alert('Límite alcanzado. Borra algo para escribir más.');
        }
      } catch {}
    }, 1000);

  }, 3000);
};
