/* =============================================================================
   4b. COUPLE GALLERY — "Moments Together", modelled on the couple's glass
   gallery-cube reference video. The section is a tall scroll track with a
   sticky stage:
     cube   a glass cube whose four sides are made of photo tiles (an "A & D"
            pane on the lid), turning slowly;
     burst  as guests scroll, the tiles fly apart and wrap into a curved band
            that turns like a carousel;
     wall   the band settles into a flat photo wall (4 × 4 on phones, 8 × 2 on
            wider screens). Scrolling back up rebuilds the cube.
   Tapping a photo on the wall opens it full size (all photos, with previous /
   next). Reduced motion and the showcase view show the wall straight away.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  var SLOTS = 16;             // tiles: 4 sides of the cube × 2 × 2
  var DECO = { 5: 'mono', 10: 'date' };   // pearl tiles among the photos

  /* ---------- Small quaternion helpers (CSS axes: x right, y down, z out) ---------- */
  function qAxis(x, y, z, deg) { var a = deg * Math.PI / 360, s = Math.sin(a); return [Math.cos(a), x * s, y * s, z * s]; }
  function qMul(a, b) {
    return [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
      a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
      a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
      a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  }
  function qRot(q, v) {
    var w = q[0], x = q[1], y = q[2], z = q[3];
    var ix = w * v[0] + y * v[2] - z * v[1], iy = w * v[1] + z * v[0] - x * v[2], iz = w * v[2] + x * v[1] - y * v[0], iw = -x * v[0] - y * v[1] - z * v[2];
    return [ix * w + iw * -x + iy * -z - iz * -y, iy * w + iw * -y + iz * -x - ix * -z, iz * w + iw * -z + ix * -y - iy * -x];
  }
  function qSlerp(a, b, t) {
    var d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3], bb = b;
    if (d < 0) { d = -d; bb = [-b[0], -b[1], -b[2], -b[3]]; }
    if (d > .9995) { var r = [a[0] + (bb[0] - a[0]) * t, a[1] + (bb[1] - a[1]) * t, a[2] + (bb[2] - a[2]) * t, a[3] + (bb[3] - a[3]) * t]; var n = Math.hypot(r[0], r[1], r[2], r[3]); return r.map(function (v) { return v / n; }); }
    var th = Math.acos(d), s = Math.sin(th), wa = Math.sin((1 - t) * th) / s, wb = Math.sin(t * th) / s;
    return [a[0] * wa + bb[0] * wb, a[1] * wa + bb[1] * wb, a[2] * wa + bb[2] * wb, a[3] * wa + bb[3] * wb];
  }
  function matrix(q, p, s) {
    var w = q[0], x = q[1], y = q[2], z = q[3];
    var m = [1 - 2 * (y * y + z * z), 2 * (x * y + w * z), 2 * (x * z - w * y), 0,
      2 * (x * y - w * z), 1 - 2 * (x * x + z * z), 2 * (y * z + w * x), 0,
      2 * (x * z + w * y), 2 * (y * z - w * x), 1 - 2 * (x * x + y * y), 0];
    for (var i = 0; i < 12; i++) m[i] *= s;
    return 'matrix3d(' + m.concat([p[0], p[1], p[2], 1]).map(function (v) { return +v.toFixed(4); }).join(',') + ')';
  }
  var ID = [1, 0, 0, 0];
  function clamp(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function ease(t) { return t * t * (3 - 2 * t); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerp3(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }

  function tileHTML(C, k, ph) {
    var kind = DECO[k];
    if (kind === 'mono') {
      return '<li class="gal-tile gal-tile--deco" aria-hidden="true"><span class="gal-deco"><span class="gal-deco__mono script">' +
        AD.esc((C.couple.bride || '').charAt(0)) + '<i>&amp;</i>' + AD.esc((C.couple.groom || '').charAt(0)) + '</span></span></li>';
    }
    if (kind === 'date') {
      var d = AD.weddingDate(), p = AD.has(d) ? AD.dateParts(d) : null;
      return '<li class="gal-tile gal-tile--deco" aria-hidden="true"><span class="gal-deco">' +
        (p ? '<span class="gal-deco__day">' + p.day + '</span><span class="gal-deco__month script">' + p.month + '</span><span class="gal-deco__year">' + p.year + '</span>' : '') +
        '</span></li>';
    }
    return '<li class="gal-tile"><button type="button" class="gal-tile__btn" data-photo="' + ph.i + '" aria-label="Open photo ' + (ph.i + 1) + ': ' + AD.esc(ph.alt || '') + '">' +
      '<img src="' + AD.esc(ph.tile || ph.src) + '" alt="" loading="lazy" decoding="async" draggable="false"></button></li>';
  }

  AD.register('gallery', {
    render: function (C) {
      var G = C.gallery || {};
      var photos = (G.photos || []).filter(function (p) { return p && AD.has(p.src || p.tile); }).map(function (p, i) { return Object.assign({ i: i }, p); });
      if (!photos.length) return '';
      // 16 slots: two pearl tiles, the rest photos (repeated if there are fewer than 14)
      var tiles = [], n = 0;
      for (var k = 0; k < SLOTS; k++) tiles.push(tileHTML(C, k, DECO[k] ? null : photos[n++ % photos.length]));
      return '<div class="gal-track">' +
        '<div class="gal-stage">' +
          '<div class="container gal-head">' + AD.sectionHead({ id: 'gallery', eyebrow: G.eyebrow || 'Our Journey', title: AD.esc(G.title || 'Moments Together') }) + '</div>' +
          '<div class="gal-scene-wrap">' +
            '<div class="gal-shadow" aria-hidden="true"></div>' +
            '<ul class="gal-scene" aria-label="Photographs of ' + AD.esc(C.couple.bride) + ' and ' + AD.esc(C.couple.groom) + '">' +
              '<li class="gal-lid gal-lid--top" aria-hidden="true"><span class="gal-lid__mono script">' + AD.esc((C.couple.bride || '').charAt(0)) + '<i>&amp;</i>' + AD.esc((C.couple.groom || '').charAt(0)) + '</span></li>' +
              '<li class="gal-lid gal-lid--bottom" aria-hidden="true"></li>' +
              tiles.join('') +
            '</ul>' +
            '<p class="gal-hint" aria-hidden="true">Scroll to open our gallery</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    init: function (el, C) {
      var G = C.gallery || {};
      var photos = (G.photos || []).filter(function (p) { return p && AD.has(p.src || p.tile); });
      var track = el.querySelector('.gal-track');
      if (!track) return;
      var stage = el.querySelector('.gal-stage'), wrap = el.querySelector('.gal-scene-wrap');
      var tiles = AD.$$('.gal-tile', el), lids = AD.$$('.gal-lid', el), shadow = el.querySelector('.gal-shadow'), hint = el.querySelector('.gal-hint');
      var still = AD.reducedMotion();
      var L = null, p = still ? 1 : 0, spin = 0, last = 0, raf = 0, visible = false;

      // Stable per-tile randomness (same on every visit)
      var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })(2701);
      var jitter = tiles.map(function () { return { d: rnd(), z: rnd(), r: rnd() }; });

      /* ---------- Geometry for the current screen ---------- */
      function layout() {
        var W = wrap.clientWidth, H = wrap.clientHeight;
        var wide = W >= 700, cols = wide ? 8 : 4, rows = SLOTS / cols, gap = wide ? 10 : 6;
        var grid = Math.floor(Math.min((Math.min(W, 1100) - 32 - (cols - 1) * gap) / cols, (H - 24 - (rows - 1) * gap) / rows, wide ? 170 : 130));
        var E = Math.min(W * .56, H * .52, 300);                     // cube edge
        var cubeT = (E - gap) / 2;
        var bandCols = 8, bandRows = 2, dTh = (Math.PI * 2 * .84) / bandCols;
        var bandR = Math.min(W * .4, 300), bandT = Math.min(bandR * dTh - gap, grid * 1.15);
        var base = Math.max(grid, cubeT, bandT);
        L = { W: W, H: H, cols: cols, rows: rows, gap: gap, grid: grid, E: E, cubeT: cubeT, bandCols: bandCols, bandRows: bandRows, dTh: dTh, bandR: bandR, bandT: bandT, base: base };
        tiles.concat(lids).forEach(function (t) { t.style.width = t.style.height = base + 'px'; t.style.margin = (-base / 2) + 'px 0 0 ' + (-base / 2) + 'px'; });
        lids.forEach(function (t) { t.style.width = t.style.height = (E - 2) + 'px'; t.style.margin = (-(E - 2) / 2) + 'px 0 0 ' + (-(E - 2) / 2) + 'px'; });
        // The track is long enough to play the whole sequence while the stage is held.
        track.style.height = still ? 'auto' : Math.round(stage.offsetHeight * 2.7) + 'px';
      }

      /* ---------- Poses ---------- */
      var FACES = [qAxis(0, 1, 0, 0), qAxis(0, 1, 0, 90), qAxis(0, 1, 0, 180), qAxis(0, 1, 0, -90)];
      function cubePose(k, qc) {
        var f = Math.floor(k / 4), c = k % 4, o = (L.cubeT + L.gap) / 2;
        var local = [(c % 2 ? 1 : -1) * o, (c < 2 ? -1 : 1) * o, L.E / 2];
        var qf = FACES[f];
        return { q: qMul(qc, qf), p: qRot(qc, qRot(qf, local)), s: L.cubeT / L.base };
      }
      function bandPose(k, off) {
        var row = Math.floor(k / L.bandCols), col = k % L.bandCols;
        var th = (col - (L.bandCols - 1) / 2) * L.dTh + off;
        var y = (row - (L.bandRows - 1) / 2) * (L.bandT + L.gap);
        return { q: qAxis(0, 1, 0, th * 180 / Math.PI), p: [L.bandR * Math.sin(th), y, L.bandR * Math.cos(th) - L.bandR], s: L.bandT / L.base };
      }
      function gridPose(k) {
        var c = k % L.cols, r = Math.floor(k / L.cols), step = L.grid + L.gap;
        return { q: ID, p: [(c - (L.cols - 1) / 2) * step, (r - (L.rows - 1) / 2) * step, 0], s: L.grid / L.base };
      }

      /* ---------- Draw one frame for scroll progress p ---------- */
      function draw() {
        if (!L) return;
        var qc = qMul(qAxis(1, 0, 0, -24), qAxis(0, 1, 0, spin + p * 200));
        var off = -1.2 * (1 - ease(clamp((p - .18) / .64)));
        tiles.forEach(function (t, k) {
          var j = jitter[k], pose;
          var tb = ease(clamp((p - .16 - j.d * .1) / .26));          // cube → band
          var tg = ease(clamp((p - .5 - (k % L.cols) * .02) / .26)); // band → wall
          var A = cubePose(k, qc), B = bandPose(k, off), F = gridPose(k);
          if (tg > 0) {
            var lift = Math.sin(tg * Math.PI) * 60;
            pose = { q: qSlerp(B.q, F.q, tg), p: lerp3(B.p, F.p, tg), s: lerp(B.s, F.s, tg) };
            pose.p[2] += lift;
          } else {
            // fly outwards on a curve, then into the band
            var mid = [A.p[0] * 2.1 + (j.r - .5) * 80, A.p[1] * 2.1 + (j.z - .5) * 60, A.p[2] * 1.6 + 120 + j.z * 160];
            var u = tb, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u;
            pose = { q: qSlerp(A.q, B.q, tb), p: [a * A.p[0] + b * mid[0] + c * B.p[0], a * A.p[1] + b * mid[1] + c * B.p[1], a * A.p[2] + b * mid[2] + c * B.p[2]], s: lerp(A.s, B.s, tb) };
          }
          t.style.transform = matrix(pose.q, pose.p, pose.s);
          t.style.opacity = tb > 0 && tg === 0 ? (.92 + .08 * Math.abs(Math.cos(tb * Math.PI))).toFixed(3) : '';
        });
        // the glass lid with the monogram, and its floor shadow, fade as the cube opens
        var lidFade = 1 - ease(clamp((p - .12) / .1));
        lids.forEach(function (t, i) {
          var ql = qMul(qc, qAxis(1, 0, 0, i ? -90 : 90)), pl = qRot(qc, [0, i ? L.E / 2 : -L.E / 2, 0]);
          t.style.transform = matrix(ql, pl, 1);
          t.style.opacity = lidFade.toFixed(3);
          t.style.visibility = lidFade > .01 ? '' : 'hidden';
        });
        shadow.style.transform = 'translate(-50%,' + (L.E * .78).toFixed(0) + 'px) scale(' + (1 + p).toFixed(3) + ')';
        shadow.style.opacity = lidFade.toFixed(3);
        hint.style.opacity = (1 - ease(clamp(p / .1))).toFixed(3);
        el.classList.toggle('is-wall', p >= .78);
      }

      function progress() {
        var r = track.getBoundingClientRect(), span = track.offsetHeight - stage.offsetHeight;
        return span > 0 ? clamp(-r.top / span) : 1;
      }

      function loop(now) {
        raf = 0;
        if (!visible) return;
        var dt = Math.min(64, now - (last || now)); last = now;
        var np = progress();
        // The cube turns slowly by itself while it is a cube.
        if (np < .16) spin = (spin + dt * .012) % 360;
        if (np !== p || np < .16) { p = np; draw(); }
        raf = requestAnimationFrame(loop);
      }

      layout();
      draw();
      if (!still && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          visible = en[0].isIntersecting;
          if (visible && !raf) { last = 0; raf = requestAnimationFrame(loop); }
        }).observe(track);
      } else {
        el.classList.add('gal--still');
      }
      var rt = 0;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { layout(); p = still ? 1 : progress(); draw(); }, 120); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layout(); draw(); });

      /* ---------- Opening a photo ---------- */
      var viewer = null, cur = 0;
      function show(i) {
        cur = (i + photos.length) % photos.length;
        var ph = photos[cur], img = viewer.querySelector('.gal-view__img');
        img.src = ph.src || ph.tile; img.alt = ph.alt || '';
        viewer.querySelector('.gal-view__count').textContent = (cur + 1) + ' / ' + photos.length;
      }
      function openViewer(i, opener) {
        if (!viewer) {
          viewer = AD.dialog.create({
            id: 'gallery-dialog', title: AD.esc(G.title || 'Moments Together'), className: 'dlg--photo',
            body: '<figure class="gal-view"><img class="gal-view__img" alt="" decoding="async"></figure>' +
              '<div class="gal-view__nav"><button class="btn btn--secondary btn--sm" type="button" data-prev aria-label="Previous photo">‹ Previous</button>' +
              '<span class="gal-view__count" aria-live="polite"></span>' +
              '<button class="btn btn--secondary btn--sm" type="button" data-next aria-label="Next photo">Next ›</button></div>'
          });
          viewer.querySelector('[data-prev]').addEventListener('click', function () { show(cur - 1); });
          viewer.querySelector('[data-next]').addEventListener('click', function () { show(cur + 1); });
          viewer.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') show(cur - 1);
            if (e.key === 'ArrowRight') show(cur + 1);
          });
          var x0 = null;
          viewer.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
          viewer.addEventListener('touchend', function (e) {
            if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
            if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
          });
        }
        show(i);
        AD.dialog.open(viewer, opener);
      }
      function toWall() {
        var span = track.offsetHeight - stage.offsetHeight;
        var top = track.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + span * .86, behavior: still ? 'auto' : 'smooth' });
      }
      AD.$$('.gal-tile__btn', el).forEach(function (b) {
        b.addEventListener('click', function () {
          if (p < .78 && !still) { toWall(); return; }        // the cube: open into the wall first
          openViewer(Number(b.getAttribute('data-photo')), b);
        });
        // keyboard users land on the wall
        b.addEventListener('focus', function () { if (p < .78 && !still) toWall(); });
      });
    }
  });
})();
