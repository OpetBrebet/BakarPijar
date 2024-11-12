const block = e => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
};

/* visibility */
Object.defineProperty(document, 'visibilityState', {
  get() {
    return 'visible';
  }
});
Object.defineProperty(document, 'webkitVisibilityState', {
  get() {
    return 'visible';
  }
});

const once = {
  focus: true,
  visibilitychange: true,
  webkitvisibilitychange: true
};

document.addEventListener('visibilitychange', e => {
  if (once.visibilitychange) {
    once.visibilitychange = false;
    return;
  }
  return block(e);
}, true);
document.addEventListener('webkitvisibilitychange', e => {
  if (once.webkitvisibilitychange) {
    once.webkitvisibilitychange = false;
    return;
  }
  return block(e);
}, true);
window.addEventListener('pagehide', e => {
    block(e);
}, true);

/* pointercapture */
window.addEventListener('lostpointercapture', e => {
  block(e);
}, true);

/* hidden */
Object.defineProperty(document, 'hidden', {
  get() {
    return false;
  }
});
Object.defineProperty(document, 'webkitHidden', {
  get() {
    return false;
  }
});

/* focus */
Document.prototype.hasFocus = new Proxy(Document.prototype.hasFocus, {
  apply(target, self, args) {
    return true;
  }
});

const onfocus = e => {
  if (e.target === document || e.target === window) {
    if (once.focus) {
      once.focus = false;
      return;
    }
    return block(e);
  }
};
document.addEventListener('focus', onfocus, true);
window.addEventListener('focus', onfocus, true);

/* blur */
const onblur = e => {
  if (e.target === document || e.target === window) {
    return block(e);
  }
};
document.addEventListener('blur', onblur, true);
window.addEventListener('blur', onblur, true);

/* mouse */
window.addEventListener('mouseleave', e => {
  if (e.target === document || e.target === window) {
    return block(e);
  }
}, true);

/* requestAnimationFrame */
let lastTime = 0;
window.requestAnimationFrame = new Proxy(window.requestAnimationFrame, {
  apply(target, self, args) {
    const currTime = Date.now();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(function () {
      args[0](performance.now());
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }
});
window.cancelAnimationFrame = new Proxy(window.cancelAnimationFrame, {
  apply(target, self, args) {
    clearTimeout(args[0]);
  }
});