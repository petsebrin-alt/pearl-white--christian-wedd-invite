/* =============================================================================
   PAGE DECOR — small pearl flowers peeking in from the edges of the sections,
   drifting slowly as guests scroll (as in the reference video). They sit
   behind the content and are purely decorative.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  // [piece, side, top within the section, size, share hidden off-screen, turn, drift speed]
  var DECOR = {
    'welcome': [['bloom', 'right', '16%', 'big', 0.44, -20, 0.14], ['sprig', 'left', '72%', 'small', 0.12, 160, 0.08]],
    'save-the-date': [['bud', 'left', '7%', 'small', 0.12, -15, 0.1], ['bloom', 'right', '58%', 'big', 0.46, 35, 0.16]],
    'countdown': [['drops', 'right', '-2%', 'drop', -0.4, 0, 0.05], ['drops', 'right', '-6%', 'drop', 0.15, 8, 0.07]],
    'family': [['spray', 'left', '1%', 'spray', 0.32, 0, 0.12], ['bloom', 'right', '56%', 'big', 0.46, -40, 0.16]],
    'events': [['bloom', 'right', '3%', 'big', 0.46, 60, 0.14], ['spray', 'left', '36%', 'spray', 0.34, 0, 0.12], ['bloom', 'right', '72%', 'big', 0.46, -15, 0.16]],
    'dress-code': [['spray', 'right', '2%', 'spray', 0.32, 0, 0.12], ['bud', 'left', '64%', 'small', 0.15, 30, 0.1]],
    'gifting': [['bloom', 'left', '8%', 'big', 0.46, 25, 0.14]],
    'venues': [['drops', 'left', '-4%', 'drop', -0.35, 0, 0.05], ['bloom', 'right', '44%', 'big', 0.46, -30, 0.14]],
    'wishes': [['spray', 'left', '1%', 'spray', 0.32, 0, 0.12]],
    'rsvp': [['bloom', 'right', '5%', 'big', 0.46, 50, 0.14]],
    'travel': [['sprig', 'left', '7%', 'small', 0.12, -20, 0.08], ['bloom', 'left', '58%', 'big', 0.46, 10, 0.14]],
    'contact': [['spray', 'right', '3%', 'spray', 0.32, 0, 0.12]]
  };

  var items = [];
  var ticking = false;

  function build() {
    Object.keys(DECOR).forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec || sec.querySelector(':scope > .sec-decor')) return;
      var box = document.createElement('div');
      box.className = 'sec-decor';
      box.setAttribute('aria-hidden', 'true');
      box.innerHTML = DECOR[id].map(function (d) {
        return AD.florals.img(d[0], 'deco deco--' + d[1] + ' deco--' + d[3],
          '--top:' + d[2] + ';--off:' + d[4] + ';--r:' + d[5] + 'deg');
      }).join('');
      sec.insertBefore(box, sec.firstChild);
      Array.prototype.forEach.call(box.children, function (el, i) {
        var d = DECOR[id][i];
        items.push({ el: el, speed: d[6], r: d[5], fx: d[1] === 'left' ? -1 : 1, y: 0, h: 0 });
      });
    });
  }

  // Document positions are measured once (and on resize); scrolling only writes transforms.
  function measure() {
    var sy = window.scrollY;
    items.forEach(function (it) {
      it.el.style.transform = '';
      var r = it.el.getBoundingClientRect();
      it.y = r.top + sy;
      it.h = r.height;
    });
    update();
  }

  function update() {
    ticking = false;
    var sy = window.scrollY, vh = window.innerHeight, mid = sy + vh / 2;
    items.forEach(function (it) {
      var c = it.y + it.h / 2;
      if (Math.abs(c - mid) > vh * 1.6) return;
      var py = (mid - c) * it.speed;
      it.el.style.transform = 'translate3d(0,' + py.toFixed(1) + 'px,0) rotate(' + it.r + 'deg) scaleX(' + it.fx + ')';
    });
  }

  AD.decor = {
    init: function () {
      if (!AD.florals) return;
      build();
      if (AD.reducedMotion()) return;
      measure();
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener('resize', measure);
      document.addEventListener('ad:opened', measure);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      window.addEventListener('load', measure);
      // Sections can change height later (wishes loading, forms); re-measure then.
      var main = document.getElementById('main'), t = 0;
      if (main && 'ResizeObserver' in window) {
        new ResizeObserver(function () { clearTimeout(t); t = setTimeout(measure, 120); }).observe(main);
      }
    },
    measure: measure
  };
})();
