'use strict';

const MAX_CHARS = 1500;

exports.postAceInit = (hook, context) => {
  const ace = context.ace;

  const notice = document.createElement('div');
  notice.id = 'swarm-limit-notice';
  notice.style.position = 'fixed';
  notice.style.bottom = '12px';
  notice.style.left = '12px';
  notice.style.zIndex = '99999';
  notice.style.background = '#fff200';
  notice.style.color = '#000';
  notice.style.fontFamily = 'monospace';
  notice.style.fontSize = '14px';
  notice.style.padding = '8px 10px';
  notice.style.border = '2px solid #000';
  notice.style.display = 'none';
  notice.textContent = `Límite SWARM: ${MAX_CHARS} caracteres. Borra algo para escribir más.`;
  document.body.appendChild(notice);

  const checkLimit = () => {
    try {
      const rep = ace.ace_getRep();
      const text = rep.alltext || '';

      if (text.length > MAX_CHARS) {
        notice.style.display = 'block';

        const trimmed = text.slice(0, MAX_CHARS);
        ace.ace_replaceRange([0, 0], [rep.lines.length - 1, rep.lines[rep.lines.length - 1].text.length], trimmed);
      } else {
        notice.style.display = 'none';
      }
    } catch (e) {
      console.error('SWARM limit plugin error:', e);
    }
  };

  setInterval(checkLimit, 1000);
};
