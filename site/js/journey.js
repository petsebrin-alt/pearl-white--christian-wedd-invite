/* =============================================================================
   THE JOURNEY — after the opening, the couple's wedding car (seen from
   above) travels down the left edge of the invitation as guests scroll, so
   its position always matches how far down the page they are. In the last
   section it pulls into its parking place beside the monogram and stays
   there, as at the end of the reference video.
   Motion is tied to the scroll (linear: no speeding up or slowing down).
   Reduced motion: no travelling car; the parked car is simply shown.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var RATIO = 1219 / 720;   // wedding-car.webp height / width

  var car, spot, splash, header;
  var g = null, ticking = false, on = false, carW = 0;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }

  function measure() {
    if (!on) return;
    var sy = window.scrollY, vh = window.innerHeight;
    carW = car.offsetWidth || 32;
    var carH = carW * RATIO;
    var heroH = splash && splash.classList.contains('is-hero') ? splash.offsetHeight : 0;
    var r = spot.getBoundingClientRect();
    var spotY = r.top + sy;
    var maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
    var headerH = header ? header.offsetHeight : 60;
    var laneTop = headerH + 10, laneBottom = vh - carH - 18;
    // Fully parked once the parking place sits just above the bottom of the screen.
    var sPark = Math.min(maxScroll, Math.max(0, spotY + r.height - vh + 26));
    var sIn = heroH * 0.12, sLane = heroH * 0.42;
    var sTurn = Math.max(sLane + 1, sPark - vh * 0.55);
    g = {
      vh: vh, carH: carH, laneX: 4, laneTop: laneTop, laneBottom: laneBottom,
      sIn: sIn, sLane: sLane, sTurn: sTurn, sPark: sPark,
      spotX: r.left, spotY: spotY, spotW: r.width
    };
    update();
  }

  function update() {
    ticking = false;
    if (!g) return;
    var s = window.scrollY, x = g.laneX, y, w = carW, show = true, parked = false;
    if (s <= g.sIn) {
      show = false; y = -g.carH;
    } else if (s < g.sLane) {
      // Drive in from the top edge onto the lane.
      y = lerp(-g.carH, g.laneTop, clamp01((s - g.sIn) / (g.sLane - g.sIn)));
    } else if (s < g.sTurn) {
      // Down the lane, in step with the page.
      y = lerp(g.laneTop, g.laneBottom, clamp01((s - g.sLane) / (g.sTurn - g.sLane)));
    } else if (s < g.sPark) {
      // Pull into the parking place beside the monogram.
      var t = clamp01((s - g.sTurn) / (g.sPark - g.sTurn));
      x = lerp(g.laneX, g.spotX, t);
      w = lerp(carW, g.spotW, t);
      // Keep the whole car on screen while it grows into its place.
      y = Math.min(lerp(g.laneBottom, g.spotY - s, t), g.vh - 18 - w * RATIO);
    } else {
      parked = true; show = false;
    }
    car.classList.toggle('is-on', show);
    spot.classList.toggle('is-parked', parked);
    if (show) {
      car.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + (w / carW).toFixed(4) + ')';
    }
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  AD.journey = {
    init: function () {
      spot = document.querySelector('[data-parking-car]');
      if (!spot) return;
      splash = document.getElementById('splash');
      header = document.getElementById('site-header');
      if (AD.reducedMotion()) { spot.classList.add('is-parked'); return; }

      car = document.createElement('img');
      car.className = 'road-car';
      car.alt = '';
      car.setAttribute('aria-hidden', 'true');
      car.decoding = 'async';
      car.src = spot.getAttribute('src');
      car.addEventListener('error', function () { car.remove(); g = null; spot.classList.add('is-parked'); });
      document.body.appendChild(car);

      function start() {
        if (on) return;
        on = true;
        document.documentElement.classList.add('journey-on');
        measure();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', measure);
        window.addEventListener('load', measure);
        var main = document.getElementById('main'), t = 0;
        if (main && 'ResizeObserver' in window) {
          new ResizeObserver(function () { clearTimeout(t); t = setTimeout(measure, 120); }).observe(main);
        }
      }
      // The car joins once the opening has finished (or straight away if there is none).
      if (!splash || splash.classList.contains('is-hero')) start();
      else document.addEventListener('ad:opened', start, { once: true });
    }
  };
})();
