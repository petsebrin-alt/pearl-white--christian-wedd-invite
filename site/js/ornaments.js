/* =============================================================================
   ORNAMENTS — generated SVG decorations
   White blooms, olive sprigs, pearls, pearl strands, cross, dividers and the
   line-art illustrations for events and dress code.
   These are v1 stand-ins; realistic WebP artwork can replace them later
   (see THEME.md §6).
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var orn = (AD.orn = {});

  /* ---------- Shared gradients and filters (injected once) ---------- */
  var DEFS =
    '<defs>' +
    '<radialGradient id="g-pearl" cx="50%" cy="50%" r="50%" fx="34%" fy="30%">' +
      '<stop offset="0" stop-color="#ffffff"/><stop offset=".2" stop-color="#fcfaf7"/>' +
      '<stop offset=".55" stop-color="#ece6dc"/><stop offset=".82" stop-color="#d6cdbf"/><stop offset="1" stop-color="#c2b7a5"/>' +
    '</radialGradient>' +
    '<radialGradient id="g-pearl-blush" cx="62%" cy="70%" r="45%">' +
      '<stop offset="0" stop-color="#f2e6e2" stop-opacity=".55"/><stop offset="1" stop-color="#f2e6e2" stop-opacity="0"/>' +
    '</radialGradient>' +
    '<linearGradient id="g-petal" x1="0" y1="1" x2="0" y2="0">' +
      '<stop offset="0" stop-color="#e2dbcd"/><stop offset=".42" stop-color="#f5f2ec"/><stop offset="1" stop-color="#ffffff"/>' +
    '</linearGradient>' +
    '<linearGradient id="g-petal-in" x1="0" y1="1" x2="0" y2="0">' +
      '<stop offset="0" stop-color="#e9e3d8"/><stop offset=".55" stop-color="#fbfaf7"/><stop offset="1" stop-color="#ffffff"/>' +
    '</linearGradient>' +
    '<linearGradient id="g-petal-rose" x1="0" y1="1" x2="0" y2="0">' +
      '<stop offset="0" stop-color="#ddd5c6"/><stop offset=".5" stop-color="#f3efe8"/><stop offset=".85" stop-color="#ffffff"/><stop offset="1" stop-color="#f4f0e9"/>' +
    '</linearGradient>' +
    '<linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#4b5330"/><stop offset=".5" stop-color="#66703f"/><stop offset="1" stop-color="#8b935d"/>' +
    '</linearGradient>' +
    '<linearGradient id="g-leaf-2" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#58603a"/><stop offset=".55" stop-color="#7b8550"/><stop offset="1" stop-color="#a3aa7e"/>' +
    '</linearGradient>' +
    '<radialGradient id="g-center" cx="50%" cy="45%" r="55%">' +
      '<stop offset="0" stop-color="#e6e8c6"/><stop offset=".6" stop-color="#b6bc8d"/><stop offset="1" stop-color="#7d8650"/>' +
    '</radialGradient>' +
    '<filter id="f-soft" x="-20%" y="-20%" width="140%" height="140%">' +
      '<feDropShadow dx="0" dy="1.1" stdDeviation="1.3" flood-color="#3d3628" flood-opacity=".17"/>' +
    '</filter>' +
    '</defs>';

  orn.injectDefs = function () {
    var holder = document.getElementById('svg-defs');
    if (holder && !holder.childNodes.length) holder.innerHTML = DEFS;
  };

  /* ---------- Maths ---------- */
  function r2(n) { return Math.round(n * 100) / 100; }
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  }
  function bez(p0, c1, c2, p1, t) {
    var u = 1 - t;
    return {
      x: u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p1[0],
      y: u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p1[1]
    };
  }
  function bezTan(p0, c1, c2, p1, t) {
    var u = 1 - t;
    return {
      x: 3 * u * u * (c1[0] - p0[0]) + 6 * u * t * (c2[0] - c1[0]) + 3 * t * t * (p1[0] - c2[0]),
      y: 3 * u * u * (c1[1] - p0[1]) + 6 * u * t * (c2[1] - c1[1]) + 3 * t * t * (p1[1] - c2[1])
    };
  }

  /* ---------- Primitive shapes (base at 0,0, pointing up) ---------- */
  function petalD(L, W) {
    return 'M0 0C' + r2(-W * .75) + ' ' + r2(-L * .2) + ' ' + r2(-W * 1.05) + ' ' + r2(-L * .7) + ' ' + r2(-W * .42) + ' ' + r2(-L * .96) +
      'Q0 ' + r2(-L * 1.06) + ' ' + r2(W * .42) + ' ' + r2(-L * .96) +
      'C' + r2(W * 1.05) + ' ' + r2(-L * .7) + ' ' + r2(W * .75) + ' ' + r2(-L * .2) + ' 0 0Z';
  }
  function leafD(L, W) {
    return 'M0 0C' + r2(-W) + ' ' + r2(-L * .25) + ' ' + r2(-W * .9) + ' ' + r2(-L * .7) + ' 0 ' + r2(-L) +
      'C' + r2(W * .9) + ' ' + r2(-L * .7) + ' ' + r2(W) + ' ' + r2(-L * .25) + ' 0 0Z';
  }

  /* ---------- Pearls ---------- */
  orn.pearl = function (x, y, r) {
    return '<circle cx="' + r2(x) + '" cy="' + r2(y + r * .22) + '" r="' + r2(r) + '" fill="#3d3628" opacity=".1"/>' +
      '<circle cx="' + r2(x) + '" cy="' + r2(y) + '" r="' + r2(r) + '" fill="url(#g-pearl)"/>' +
      '<circle cx="' + r2(x) + '" cy="' + r2(y) + '" r="' + r2(r) + '" fill="url(#g-pearl-blush)"/>' +
      '<ellipse cx="' + r2(x - r * .32) + '" cy="' + r2(y - r * .36) + '" rx="' + r2(r * .26) + '" ry="' + r2(r * .17) + '" fill="#fff" opacity=".95" transform="rotate(-32 ' + r2(x - r * .32) + ' ' + r2(y - r * .36) + ')"/>';
  };

  // Pearls spaced evenly along a cubic Bézier.
  orn.strand = function (p0, c1, c2, p1, r, opts) {
    opts = opts || {};
    var gap = opts.gap == null ? r * 0.25 : opts.gap;
    var N = 240, pts = [], len = [0], i;
    for (i = 0; i <= N; i++) pts.push(bez(p0, c1, c2, p1, i / N));
    for (i = 1; i <= N; i++) len.push(len[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    var total = len[N], out = '', d = opts.offset || 0, k = 0, idx = 0;
    var thread = opts.thread === false ? '' :
      '<path d="M' + p0 + 'C' + c1 + ' ' + c2 + ' ' + p1 + '" fill="none" stroke="#cfc7b8" stroke-width=".5"/>';
    while (d <= total) {
      while (idx < N && len[idx + 1] < d) idx++;
      var rr = opts.graduate ? r * (0.72 + 0.28 * Math.sin(Math.PI * d / total)) : (opts.alternate && k % 2 ? r * .62 : r);
      out += orn.pearl(pts[idx].x, pts[idx].y, rr);
      d += rr * 2 + gap + (opts.alternate ? r * .25 : 0);
      k++;
    }
    return thread + out;
  };

  /* ---------- Flowers ---------- */
  // Five-petal white bloom (gardenia / jasmine character), two layers.
  orn.bloom = function (x, y, r, rot) {
    var s = '<g transform="translate(' + r2(x) + ' ' + r2(y) + ') rotate(' + r2(rot || 0) + ')">', i;
    var outer = petalD(r, r * .52);
    for (i = 0; i < 5; i++) s += '<path d="' + outer + '" transform="rotate(' + i * 72 + ')" fill="url(#g-petal)" stroke="#d2cbbd" stroke-width=".6"/>';
    for (i = 0; i < 5; i++) s += '<path d="M0 ' + r2(-r * .2) + 'Q' + r2(r * .04) + ' ' + r2(-r * .5) + ' 0 ' + r2(-r * .82) + '" transform="rotate(' + i * 72 + ')" fill="none" stroke="#e3ddd1" stroke-width=".6"/>';
    var inner = petalD(r * .66, r * .36);
    for (i = 0; i < 5; i++) s += '<path d="' + inner + '" transform="rotate(' + (36 + i * 72) + ')" fill="url(#g-petal-in)" stroke="#dcd5c8" stroke-width=".5"/>';
    s += '<circle r="' + r2(r * .17) + '" fill="url(#g-center)"/>';
    for (i = 0; i < 8; i++) {
      var a = i * Math.PI / 4 + .3;
      s += '<circle cx="' + r2(Math.cos(a) * r * .23) + '" cy="' + r2(Math.sin(a) * r * .23) + '" r="' + r2(Math.max(.5, r * .035)) + '" fill="#6b7445"/>';
    }
    return s + '</g>';
  };

  // Top-down white rose: layered rings + a soft spiral centre.
  orn.rose = function (x, y, r, rot) {
    var s = '<g transform="translate(' + r2(x) + ' ' + r2(y) + ') rotate(' + r2(rot || 0) + ')">', i;
    var p1 = petalD(r, r * .7), p2 = petalD(r * .78, r * .56), p3 = petalD(r * .56, r * .42);
    for (i = 0; i < 5; i++) s += '<path d="' + p1 + '" transform="rotate(' + i * 72 + ')" fill="url(#g-petal-rose)" stroke="#d1c9ba" stroke-width=".6"/>';
    for (i = 0; i < 5; i++) s += '<path d="' + p2 + '" transform="rotate(' + (36 + i * 72) + ')" fill="url(#g-petal)" stroke="#d6cfc1" stroke-width=".55"/>';
    for (i = 0; i < 4; i++) s += '<path d="' + p3 + '" transform="rotate(' + (18 + i * 90) + ')" fill="url(#g-petal-in)" stroke="#d8d1c4" stroke-width=".5"/>';
    var c = r * .3;
    s += '<circle r="' + r2(c) + '" fill="#f6f3ee" stroke="#d6cfc2" stroke-width=".5"/>' +
      '<path d="M' + r2(-c * .7) + ' ' + r2(c * .1) + 'A' + r2(c * .7) + ' ' + r2(c * .7) + ' 0 1 1 ' + r2(c * .45) + ' ' + r2(c * .55) + '" fill="none" stroke="#cfc7b7" stroke-width=".7"/>' +
      '<path d="M' + r2(-c * .3) + ' ' + r2(-c * .1) + 'A' + r2(c * .35) + ' ' + r2(c * .35) + ' 0 1 1 ' + r2(c * .2) + ' ' + r2(c * .25) + '" fill="none" stroke="#d4ccbd" stroke-width=".6"/>';
    return s + '</g>';
  };

  // Closed bud with olive calyx.
  orn.bud = function (x, y, r, rot) {
    var s = '<g transform="translate(' + r2(x) + ' ' + r2(y) + ') rotate(' + r2(rot || 0) + ')">';
    s += '<path d="M0 0C' + r2(-r * .55) + ' ' + r2(-r * .35) + ' ' + r2(-r * .5) + ' ' + r2(-r * 1.25) + ' 0 ' + r2(-r * 1.7) +
      'C' + r2(r * .5) + ' ' + r2(-r * 1.25) + ' ' + r2(r * .55) + ' ' + r2(-r * .35) + ' 0 0Z" fill="url(#g-petal)" stroke="#d2cbbd" stroke-width=".55"/>';
    s += '<path d="M0 ' + r2(-r * .2) + 'Q' + r2(r * .18) + ' ' + r2(-r * .9) + ' 0 ' + r2(-r * 1.55) + '" fill="none" stroke="#e1dbcf" stroke-width=".5"/>';
    var sep = leafD(r * .7, r * .2);
    s += '<path d="' + sep + '" transform="rotate(-32)" fill="url(#g-leaf-2)"/>' +
      '<path d="' + sep + '" transform="rotate(32)" fill="url(#g-leaf-2)"/>' +
      '<path d="' + leafD(r * .55, r * .18) + '" fill="url(#g-leaf)"/>';
    return s + '</g>';
  };

  orn.leaf = function (x, y, L, angle, alt) {
    return '<g transform="translate(' + r2(x) + ' ' + r2(y) + ') rotate(' + r2(angle) + ')">' +
      '<path d="' + leafD(L, L * .2) + '" fill="url(#g-leaf' + (alt ? '-2' : '') + ')"/>' +
      '<path d="M0 ' + r2(-L * .05) + 'Q' + r2(L * .03) + ' ' + r2(-L * .5) + ' 0 ' + r2(-L * .9) + '" fill="none" stroke="#c9cfa6" stroke-opacity=".55" stroke-width=".55"/>' +
      '</g>';
  };

  // Olive sprig: stem along a Bézier with alternating leaves.
  orn.sprig = function (p0, c1, c2, p1, o) {
    o = o || {};
    var R = rng(o.seed || 7), n = o.leaves || 8, L0 = o.leafLen || 22;
    var s = '<path d="M' + p0 + 'C' + c1 + ' ' + c2 + ' ' + p1 + '" fill="none" stroke="#4e5632" stroke-width="' + (o.stem || 1.3) + '" stroke-linecap="round"/>';
    for (var i = 0; i < n; i++) {
      var t = 0.1 + (i / n) * 0.84;
      var P = bez(p0, c1, c2, p1, t), T = bezTan(p0, c1, c2, p1, t);
      var ang = Math.atan2(T.y, T.x) * 180 / Math.PI;
      var side = i % 2 ? 1 : -1;
      var spread = 38 + R() * 16;
      var L = L0 * (1 - t * .35) * (.85 + R() * .3);
      s += orn.leaf(P.x, P.y, L, ang + 90 + side * spread, R() > .5);
    }
    if (o.endLeaf !== false) {
      var Te = bezTan(p0, c1, c2, p1, 1);
      s += orn.leaf(p1[0], p1[1], L0 * .62, Math.atan2(Te.y, Te.x) * 180 / Math.PI + 90, true);
    }
    return s;
  };

  function svg(viewBox, inner, cls, extra) {
    return '<svg class="' + (cls || '') + '" viewBox="' + viewBox + '" aria-hidden="true" focusable="false"' + (extra || '') + '>' + inner + '</svg>';
  }

  /* ---------- Compositions ---------- */
  // Floral corner (anchored top-left). Mirror with CSS for other corners.
  orn.corner = function (cls) {
    var g = '';
    g += orn.sprig([16, 40], [74, 14], [150, 8], [248, 24], { leaves: 11, leafLen: 25, seed: 3 });
    g += orn.sprig([40, 16], [14, 74], [8, 150], [24, 248], { leaves: 11, leafLen: 25, seed: 11 });
    g += orn.sprig([44, 44], [76, 62], [96, 92], [128, 118], { leaves: 5, leafLen: 17, seed: 5, stem: 1 });
    g += orn.strand([56, 62], [96, 124], [156, 108], [204, 44], 2.9, { graduate: true });
    g += orn.strand([62, 56], [124, 96], [108, 156], [44, 204], 2.9, { graduate: true });
    g += orn.bud(176, 22, 8, 76) + orn.bud(22, 176, 8, 164) + orn.bud(206, 30, 6, 84) + orn.bud(30, 206, 6, 156);
    g += orn.bloom(124, 36, 21, 14);
    g += orn.bloom(36, 124, 20, -10);
    g += orn.bloom(96, 92, 12, 30);
    g += orn.rose(54, 54, 34, 8);
    g += orn.pearl(92, 62, 4.6) + orn.pearl(62, 92, 4.2) + orn.pearl(102, 72, 3.2) + orn.pearl(72, 104, 3) + orn.pearl(150, 54, 3.4) + orn.pearl(54, 150, 3.2);
    return svg('0 0 260 260', '<g filter="url(#f-soft)">' + g + '</g>', 'floral-corner ' + (cls || ''));
  };

  // Horizontal garland for section breaks and the thank-you.
  orn.garland = function (cls) {
    var g = '';
    g += orn.sprig([160, 44], [120, 36], [70, 34], [14, 46], { leaves: 8, leafLen: 20, seed: 21 });
    g += orn.sprig([160, 44], [200, 36], [250, 34], [306, 46], { leaves: 8, leafLen: 20, seed: 29 });
    g += orn.strand([100, 46], [126, 70], [194, 70], [220, 46], 2.6, { graduate: true });
    g += orn.bud(52, 32, 6, -70) + orn.bud(268, 32, 6, 70);
    g += orn.bloom(118, 40, 13, 20) + orn.bloom(202, 40, 13, -10);
    g += orn.rose(160, 40, 21, 6);
    g += orn.pearl(138, 54, 3.4) + orn.pearl(182, 54, 3.4) + orn.pearl(146, 22, 2.6) + orn.pearl(176, 22, 2.6);
    return svg('0 0 320 84', '<g filter="url(#f-soft)">' + g + '</g>', 'garland ' + (cls || ''));
  };

  // Hairline + graduated pearls + small bloom.
  orn.divider = function (cls) {
    var g = '<path d="M8 14H86M154 14H232" stroke="#cfc7b8" stroke-width=".8"/>';
    var xs = [92, 101, 109], rs = [2, 2.6, 3.2], i;
    for (i = 0; i < 3; i++) { g += orn.pearl(xs[i], 14, rs[i]) + orn.pearl(240 - xs[i], 14, rs[i]); }
    g += orn.leaf(120, 14, 11, -62) + orn.leaf(120, 14, 11, 62, true);
    g += orn.bloom(120, 14, 8.5, 10);
    return svg('0 0 240 28', '<g filter="url(#f-soft)">' + g + '</g>', 'ornament-divider ' + (cls || ''));
  };

  // Ring of pearls with a floral cluster at the bottom (Save the Date).
  orn.pearlRing = function (cls) {
    var cx = 160, cy = 160, R = 136, g = '', n = 64, i;
    g += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="#d6cfc2" stroke-width=".5"/>';
    for (i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + Math.PI / 2;
      var deg = Math.abs(((a * 180 / Math.PI) % 360) - 90);
      if (deg < 26) continue; // leave room for the flowers at the bottom
      g += orn.pearl(cx + Math.cos(a) * R, cy + Math.sin(a) * R, i % 2 ? 3.4 : 5.2);
    }
    var by = cy + R;
    g += orn.sprig([cx, by], [cx - 30, by + 2], [cx - 62, by - 6], [cx - 96, by - 30], { leaves: 6, leafLen: 18, seed: 41 });
    g += orn.sprig([cx, by], [cx + 30, by + 2], [cx + 62, by - 6], [cx + 96, by - 30], { leaves: 6, leafLen: 18, seed: 47 });
    g += orn.bud(cx - 64, by - 6, 6, -110) + orn.bud(cx + 64, by - 6, 6, 110);
    g += orn.bloom(cx - 30, by - 2, 13, 12) + orn.bloom(cx + 30, by - 2, 13, -8);
    g += orn.rose(cx, by - 4, 21, 4);
    g += orn.pearl(cx - 15, by + 15, 3.2) + orn.pearl(cx + 15, by + 15, 3.2) + orn.pearl(cx, by + 21, 2.6);
    return svg('0 0 320 330', '<g filter="url(#f-soft)">' + g + '</g>', 'pearl-ring ' + (cls || ''));
  };

  // Fine Latin cross with a pearl at the crossing.
  orn.cross = function (cls) {
    return svg('0 0 24 36',
      '<path d="M12 2.5v31M5.5 11.5h13" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>' +
      orn.pearl(12, 11.5, 1.9), 'cross ' + (cls || ''));
  };

  /* ---------- Event illustrations (charcoal line art + bloom + olive) ---------- */
  var LINE = ' fill="none" stroke="#2b2a28" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"';
  var FILL = ' fill="#fff" stroke="#2b2a28" stroke-width="1.35" stroke-linejoin="round"';

  var ILLUSTRATIONS = {
    haldi: function () {
      return orn.sprig([20, 104], [36, 96], [52, 98], [64, 108], { leaves: 4, leafLen: 13, seed: 61, stem: 1 }) +
        orn.sprig([140, 104], [124, 96], [108, 98], [96, 108], { leaves: 4, leafLen: 13, seed: 67, stem: 1 }) +
        '<path d="M28 62C32 92 54 104 80 104S128 92 132 62"' + FILL + '/>' +
        '<ellipse cx="80" cy="62" rx="52" ry="10"' + FILL + '/>' +
        '<path d="M66 104l-4 8h36l-4-8"' + LINE + '/>' +
        '<path d="M28 62c-9-4-12 6-4 9M132 62c9-4 12 6 4 9"' + LINE + '/>' +
        '<path d="M44 76c10 8 62 8 72 0" fill="none" stroke="#9c958a" stroke-width=".8" stroke-dasharray="1 3.2" stroke-linecap="round"/>' +
        orn.bloom(62, 58, 10, 10) + orn.bloom(98, 57, 11, -14) + orn.bloom(80, 64, 7.5, 30) +
        orn.pearl(46, 62, 2.4) + orn.pearl(114, 62, 2.4);
    },
    mehendi: function () {
      return orn.sprig([118, 106], [128, 96], [140, 92], [150, 80], { leaves: 4, leafLen: 12, seed: 71, stem: 1 }) +
        '<path d="M40 102L66 34 86 42Z"' + FILL + '/>' +
        '<path d="M55 62l20 8M51 72l19 7" fill="none" stroke="#2b2a28" stroke-width="1"/>' +
        '<path d="M66 34c2-6 18-1 20 8"' + LINE + '/>' +
        '<path d="M40 102c18 10 46 8 58-6 12-14 0-30-12-24-10 5-4 18 6 14"' + LINE + '/>' +
        '<path d="M112 24c22-4 34 22 18 38-8 8-20 4-18-6 2-8 12-6 12 0"' + LINE + '/>' +
        '<path d="M118 34c10 0 16 10 12 18"' + ' fill="none" stroke="#2b2a28" stroke-width=".9"/>' +
        '<circle cx="104" cy="70" r="1.2" fill="#2b2a28"/><circle cx="110" cy="78" r="1.2" fill="#2b2a28"/><circle cx="104" cy="86" r="1.2" fill="#2b2a28"/>' +
        orn.bloom(120, 92, 9, 12) + orn.pearl(132, 44, 2.6);
    },
    sangeet: function () {
      return orn.sprig([30, 106], [50, 100], [70, 104], [80, 110], { leaves: 4, leafLen: 12, seed: 81, stem: 1 }) +
        '<path d="M42 48C36 62 36 80 42 94H118C124 80 124 62 118 48Z"' + FILL + '/>' +
        '<ellipse cx="42" cy="71" rx="7" ry="23"' + FILL + '/>' +
        '<ellipse cx="118" cy="71" rx="7" ry="23"' + FILL + '/>' +
        '<path d="M50 50L62 92 74 50 86 92 98 50 110 92" fill="none" stroke="#2b2a28" stroke-width=".9"/>' +
        '<path d="M126 34v-16l12-3v16"' + LINE + '/>' +
        '<ellipse cx="123" cy="35" rx="3.6" ry="2.6"' + FILL + '/><ellipse cx="135" cy="32" rx="3.6" ry="2.6"' + FILL + '/>' +
        orn.bloom(80, 44, 9, 18) + orn.pearl(66, 46, 2.4) + orn.pearl(94, 46, 2.4);
    },
    church: function () {
      return orn.sprig([16, 108], [30, 100], [46, 100], [58, 106], { leaves: 4, leafLen: 12, seed: 91, stem: 1 }) +
        '<path d="M48 108V62L80 38 112 62V108Z"' + FILL + '/>' +
        '<path d="M70 38V24H90V38"' + FILL + '/>' +
        '<path d="M80 6V20M74.5 11.5H85.5"' + LINE + '/>' +
        '<path d="M72 108V90a8 8 0 0 1 16 0V108"' + LINE + '/>' +
        '<circle cx="80" cy="66" r="6.5"' + FILL + '/>' +
        '<path d="M80 59.5v13M73.5 66h13" fill="none" stroke="#2b2a28" stroke-width=".7"/>' +
        '<path d="M40 108H120"' + LINE + '/>' +
        '<circle cx="128" cy="96" r="8"' + LINE + '/><circle cx="139" cy="96" r="8"' + LINE + '/>' +
        orn.pearl(133.5, 87, 2.4) +
        orn.bloom(52, 102, 8, 10) + orn.bloom(108, 104, 7, -20);
    },
    reception: function () {
      var dots = '', i;
      for (i = 0; i < 9; i++) dots += orn.pearl(48 + i * 8, 86, 1.7);
      for (i = 0; i < 6; i++) dots += orn.pearl(60 + i * 8, 64, 1.6);
      return orn.sprig([20, 108], [34, 100], [46, 102], [52, 108], { leaves: 4, leafLen: 12, seed: 101, stem: 1 }) +
        orn.sprig([140, 108], [126, 100], [114, 102], [108, 108], { leaves: 4, leafLen: 12, seed: 107, stem: 1 }) +
        '<rect x="42" y="86" width="76" height="22" rx="2"' + FILL + '/>' +
        '<rect x="54" y="64" width="52" height="22" rx="2"' + FILL + '/>' +
        '<rect x="66" y="44" width="28" height="20" rx="2"' + FILL + '/>' +
        '<path d="M36 108H124"' + LINE + '/>' +
        dots + orn.bloom(80, 40, 9, 8) + orn.leaf(72, 42, 10, -70) + orn.leaf(88, 42, 10, 70, true);
    }
  };

  orn.illustration = function (name, cls) {
    var fn = ILLUSTRATIONS[name];
    if (!fn) return '';
    return svg('0 0 160 120', '<g filter="url(#f-soft)">' + fn() + '</g>', 'illus ' + (cls || ''));
  };

  /* ---------- Dress-code illustrations ---------- */
  orn.attire = function (kind) {
    var g;
    if (kind === 'saree') {
      g = '<path d="M60 10v8"' + LINE + '/><circle cx="60" cy="8" r="3.2"' + FILL + '/>' +
        '<path d="M50 20C48 28 34 30 28 40C33 58 38 72 41 86H79C82 72 87 58 92 40C86 30 72 28 70 20Z"' + FILL + '/>' +
        '<path d="M41 86C35 118 29 152 24 184H96C91 152 85 118 79 86Z"' + FILL + '/>' +
        '<path d="M56 88L50 184M60 88V184M64 88L70 184" fill="none" stroke="#2b2a28" stroke-width=".8"/>' +
        '<path d="M41 96C56 72 74 52 90 40L96 44C82 60 64 84 50 108Z" fill="#f6f3ee" stroke="#2b2a28" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M92 42C100 72 104 110 100 150" fill="none" stroke="#2b2a28" stroke-width="1.1"/>' +
        '<path d="M24 184H96" fill="none" stroke="#2b2a28" stroke-width="1.6"/>' +
        '<path d="M27 176H93" fill="none" stroke="#9c958a" stroke-width=".7" stroke-dasharray="1 3" stroke-linecap="round"/>' +
        '<path d="M60 184v8M50 194h20"' + LINE + '/>';
      var p = '', i;
      for (i = 0; i < 9; i++) { var a = Math.PI * (.15 + i * .0875); p += orn.pearl(60 - Math.cos(a) * 10, 18 + Math.sin(a) * 7, 1.5); }
      g += p + orn.bloom(86, 46, 5, 10);
    } else {
      g = '<path d="M60 10v8"' + LINE + '/><circle cx="60" cy="8" r="3.2"' + FILL + '/>' +
        '<path d="M48 20C44 26 26 28 22 38V112H98V38C94 28 76 26 72 20Z"' + FILL + '/>' +
        '<path d="M50 20L60 68 70 20" fill="#f6f3ee" stroke="#2b2a28" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M50 20L42 42 54 52M70 20L78 42 66 52" fill="none" stroke="#2b2a28" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M60 68V112" fill="none" stroke="#2b2a28" stroke-width=".9"/>' +
        '<path d="M55 24l5 3 5-3v6l-5-3-5 3z" fill="#2b2a28"/>' +
        '<path d="M34 112L38 186H56L60 126 64 186H82L86 112" fill="#fff" stroke="#2b2a28" stroke-width="1.35" stroke-linejoin="round"/>' +
        '<path d="M80 56h10" fill="none" stroke="#2b2a28" stroke-width=".9"/>' +
        '<path d="M60 186v6M50 194h20"' + LINE + '/>';
      g += orn.pearl(60, 80, 1.6) + orn.pearl(60, 92, 1.6) + orn.bloom(85, 52, 4.5, 12);
    }
    return svg('0 0 120 200', '<g filter="url(#f-soft)">' + g + '</g>', 'attire');
  };

  /* ---------- Family-tree connector (olive branch segment) ---------- */
  orn.branch = function () {
    var g = '<path class="branch-stem" d="M24 2C20 18 28 30 24 46S22 62 24 70" fill="none" stroke="#4e5632" stroke-width="1.3" stroke-linecap="round"/>';
    g += '<g class="branch-leaves">' + orn.leaf(24, 22, 13, -58) + orn.leaf(25, 40, 13, 56, true) + orn.leaf(24, 56, 11, -50, true) + '</g>';
    return svg('0 0 48 72', g, 'tree-branch');
  };
})();
