function handleDrag(el) {
  const state = {
    isdragging: false,
    position: { x: '', y: '' },
    prevTouch: { clientX: '', clientY: '' },
  };
  function addListener(element, eventTypes, handler, useCapture = false) {
    eventTypes.forEach(eventType =>
      element.addEventListener(eventType, handler, useCapture)
    );
  }
  function checkAxisBounds(start, len, max, theta = 0) {
    // theta 为容错阀值
    const minBound = start >= 0 - theta; // 是否超出最低边界
    const maxBound = start + len <= max + theta; // 是否超出最高边界
    return [minBound && maxBound, minBound];
  }
  function checkBounds() {
    const { clientWidth, clientHeight } = document.documentElement;
    const { x, y } = el.getBoundingClientRect();
    const checkXAxis = checkAxisBounds(x, el.clientWidth, clientWidth);
    const checkYAxis = checkAxisBounds(y, el.clientHeight, clientHeight);
    if (!checkXAxis[0]) {
      el.style.left = checkXAxis[1] ? `${clientWidth - el.clientWidth}px` : 0;
    }
    if (!checkYAxis[0]) {
      el.style.top = checkYAxis[1] ? `${clientHeight - el.clientHeight}px` : 0;
    }
  }
  function updatePosition(e) {
    if (state.isdragging) {
      let touch = e.touches ? e.touches[0] : e;
      el.style.left = `${state.position.x +
        touch.clientX -
        state.prevTouch.clientX}px`;
      el.style.top = `${state.position.y +
        touch.clientY -
        state.prevTouch.clientY}px`;
    }
  }
  function handleDown(e) {
    state.isdragging = true;
    let touch = e.touches ? e.touches[0] : e;
    state.prevTouch.clientX = touch.clientX;
    state.prevTouch.clientY = touch.clientY;
    state.position.x = el.offsetLeft;
    state.position.y = el.offsetTop;
  }
  function handleMove(e) {
    e.preventDefault();
    let scheduledAnimationFrame = false;
    if (scheduledAnimationFrame) return;
    scheduledAnimationFrame = true;
    window.requestAnimationFrame(() => {
      scheduledAnimationFrame = false;
      updatePosition(e);
    });
  }
  function handleEnd() {
    state.isdragging = false;
    checkBounds();
  }
  addListener(el, ['mousedown', 'touchstart'], handleDown);
  addListener(el, ['mousemove', 'touchmove'], handleMove);
  addListener(el, ['mouseup', 'touchend'], handleEnd);
}
export default {
  install(Vue) {
    Vue.directive('drag', {
      inserted(el) {
        handleDrag(el);
      },
    });
  },
};
