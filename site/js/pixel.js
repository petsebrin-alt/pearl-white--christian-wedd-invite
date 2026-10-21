/* =============================================================================
   PIXEL PHOTO SWAP — modelled on the couple's reference video: when the cursor
   rests on a photo, it breaks into a grid of square tiles that flash and
   flip, in random order, to a second photo; moving away flips them back.
   Tap or Enter/Space toggles it too, and on touch screens (no cursor) the
   two photos take turns on their own while the photo is on screen.
   Reduced motion: a quick fade instead of the tiles.

   Markup (built by the section):
     <div class="pix" data-pix>
       <img class="pix__img pix__img--a" …>   first photo (shown)
       <img class="pix__img pix__img--b" …>   second photo
     </div>
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  var DURATION = 680;     // ms for the whole grid to flip
  var FLASH = .16;        // share of the time each tile shows a flat colour
  var COLS = 9;           // tiles across (as in the reference)
  var AUTO = 4200;        // ms between automatic swaps on touch screens

  function load(img) {
    return img.complete && img.naturalWidth ? Promise.resolve(img) : new Promise(function (res) {
      img.addEventListener('load', function () { res(img); }, { once: true });
      img.addEventListener('error', function () { res(img); }, { once: true });
    });
  }

  // Draw an image into a canvas the way CSS "object-fit: cover" would.
  function cover(img, w, h, posY) {
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var g = c.getContext('2d');
    var iw = img.naturalWidth || 1, ih = img.naturalHeight || 1;
    var s = Math.max(w / iw, h / ih), dw = iw * s, dh = ih * s;
    g.drawImage(img, (w - dw) / 2, (h - dh) * posY, dw, dh);
    return c;
  }

  function averages(src, cols, rows) {
    var t = document.createElement('canvas'); t.width = cols; t.height = rows;
    var g = t.getContext('2d'); g.imageSmoothingQuality = 'high';
    g.drawImage(src, 0, 0, cols, rows);
    return g.getImageData(0, 0, cols, rows).data;
  }

  function setup(box) {
    var a = box.querySelector('.pix__img--a'), b = box.querySelector('.pix__img--b');
    if (!a || !b) return;
    var still = AD.reducedMotion();
    var canvas = document.createElement('canvas');
    canvas.className = 'pix__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    box.appendChild(canvas);
    var g = canvas.getContext('2d');
    var shown = 'a', target = 'a', raf = 0, W = 0, H = 0, cols = COLS, rows = 0, cw = 0, ch = 0;
    var srcA = null, srcB = null, from = null, to = null, tiles = [], t0 = 0, ready = false;
    var posY = function (img) { return parseFloat(img.getAttribute('data-pos-y') || '.3'); };

    function measure() {
      var r = box.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width * dpr)); H = Math.max(1, Math.round(r.height * dpr));
      canvas.width = W; canvas.height = H;
      rows = Math.max(1, Math.round(cols * r.height / r.width));
      cw = W / cols; ch = H / rows;
      srcA = cover(a, W, H, posY(a)); srcB = cover(b, W, H, posY(b));
    }

    function paint(src) { g.drawImage(src, 0, 0); }

    function go(next) {
      target = next;
      if (!ready) return;
      if (still) { shown = next; box.classList.toggle('is-b', next === 'b'); return; }
      // Start from whatever is on screen now (it may be halfway through a swap).
      var snap = document.createElement('canvas'); snap.width = W; snap.height = H;
      if (raf) snap.getContext('2d').drawImage(canvas, 0, 0);
      else snap.getContext('2d').drawImage(shown === 'a' ? srcA : srcB, 0, 0);
      cancelAnimationFrame(raf);
      from = snap; to = next === 'a' ? srcA : srcB;
      var avg = averages(to, cols, rows);
      tiles = [];
      for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
        var k = (y * cols + x) * 4, j = (Math.random() - .5) * 60, dark = Math.random() < .3 ? .55 : 1;
        tiles.push({
          x: x, y: y, state: 0,
          start: Math.random() * (1 - FLASH),
          color: 'rgb(' + [0, 1, 2].map(function (c) { return Math.max(0, Math.min(255, Math.round((avg[k + c] + j) * dark))); }).join(',') + ')'
        });
      }
      paint(from);
      box.classList.add('is-swapping');
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function frame(now) {
      var p = Math.min(1, (now - t0) / DURATION), busy = false;
      tiles.forEach(function (t) {
        var st = p < t.start ? 0 : p < t.start + FLASH ? 1 : 2;
        if (st !== t.state) {
          var x = Math.floor(t.x * cw), y = Math.floor(t.y * ch), w = Math.ceil(cw) + 1, h = Math.ceil(ch) + 1;
          if (st === 1) { g.fillStyle = t.color; g.fillRect(x, y, w, h); }
          else if (st === 2) g.drawImage(to, x, y, w, h, x, y, w, h);
          t.state = st;
        }
        if (st < 2) busy = true;
      });
      if (busy) { raf = requestAnimationFrame(frame); return; }
      raf = 0;
      shown = target;
      box.classList.toggle('is-b', shown === 'b');
      box.classList.remove('is-swapping');
    }

    var canHover = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
    box.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') go('b'); });
    box.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') go('a'); });
    box.addEventListener('click', function (e) { if (canHover && e.detail > 0) return; go(target === 'a' ? 'b' : 'a'); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(target === 'a' ? 'b' : 'a'); }
    });

    // Touch screens: take turns while on screen (paused after the guest taps).
    var timer = 0, inView = false, touched = false;
    box.addEventListener('pointerdown', function (e) { if (e.pointerType === 'touch') { touched = true; clearInterval(timer); } });
    function auto() {
      clearInterval(timer);
      if (canHover || still || touched || !inView) return;
      timer = setInterval(function () { go(target === 'a' ? 'b' : 'a'); }, AUTO);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { inView = en[0].intersectionRatio >= .5; auto(); }, { threshold: [0, .5] }).observe(box);
    }

    Promise.all([load(a), load(b)]).then(function () {
      if (!a.naturalWidth || !b.naturalWidth) return;
      measure();
      ready = true;
      box.classList.add('is-ready');
      if (target !== shown) go(target);
    });
    var rt = 0;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { if (!ready) return; cancelAnimationFrame(raf); raf = 0; measure(); box.classList.toggle('is-b', target === 'b'); shown = target; box.classList.remove('is-swapping'); }, 150);
    });
  }

  AD.pixel = { init: function (root) { AD.$$('[data-pix]', root || document).forEach(setup); } };
})();
