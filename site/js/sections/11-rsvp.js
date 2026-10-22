/* =============================================================================
   11. RSVP — the dove brings the invitation (the couple's dove pictures).
   A white dove sits in the middle holding the envelope ("Please join us…
   Angel & David · Kindly RSVP"). Tapping RSVP on the envelope:
     · the same dove takes off, wings beating, and flies up over the page
       to the top, with a soft sound of wings (it fades as soon as the
       guest scrolls);
     · the envelope straightens, its top opens, a card slides out and it
       all dissolves in light;
     · in its place a satin-draped frame appears (the satin gently waving),
       the couple's black-and-white photo develops on it, and "Thank you for
       accepting our invitation" writes itself, with the day and the church
       and buttons to add it to the calendar or get directions.
   A personal link can carry the guest's name (…/?guest=Anu%20Thomas): it
   greets them and the acceptance is saved under that name. The acceptance
   is remembered on this device (a later visit shows the board; "See the
   invitation again" brings the dove back). Saved by AD.store: in this
   browser until the Google Sheet is connected.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var KEY = 'ad-rsvp-accepted';
  var V = '?v=20261022d';
  var IMG = 'assets/images/dove/';
  // Inside dove-envelope.webp (fractions of its width / height)
  var BODY = { x: .64, y: .61 };       // the sitting dove's body
  var ENV = { cx: .2859, cy: .4398 };  // centre of the envelope (tilted 7.5°)
  // Inside the flying dove's box (dove-*.webp, facing left)
  var DOVE = { ratio: 408 / 418, bx: .55, by: .73 };

  function guestName() {
    try {
      var n = new URLSearchParams(window.location.search).get('guest');
      return n ? n.replace(/\s+/g, ' ').trim().slice(0, 80) : '';
    } catch (e) { return ''; }
  }
  function remembered() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  function remember(v) {
    try { if (v) localStorage.setItem(KEY, JSON.stringify(v)); else localStorage.removeItem(KEY); } catch (e) {}
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  // A white dove whose wings really beat: body and two wings, one picture each.
  function dove(cls) {
    var el = document.createElement('span');
    el.className = 'dv ' + (cls || '');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<span class="dv__b">' +
      '<img class="dv__far" src="' + IMG + 'dove-far.webp' + V + '" alt="" draggable="false">' +
      '<img class="dv__body" src="' + IMG + 'dove-body.webp' + V + '" alt="" draggable="false">' +
      '<img class="dv__near" src="' + IMG + 'dove-near.webp' + V + '" alt="" draggable="false">' +
    '</span>';
    return el;
  }

  /* ---------- The sound of one dove's wings (made in the browser, no file) ----------
     Soft wing-claps (filtered noise bursts, about 8 a second, slowing a
     little) over a faint rush of air, quieter as the dove flies away.
     Kept low: a gentle, natural flutter. Starts on the guest's tap. */
  function wings(seconds) {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    var ctx;
    try { ctx = new Ctx(); } catch (e) { return null; }
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
    var LOUD = .22;
    var out = ctx.createGain(), t0 = ctx.currentTime + .03, end = t0 + seconds;
    out.connect(ctx.destination);
    out.gain.setValueAtTime(0, t0);
    out.gain.linearRampToValueAtTime(LOUD, t0 + .08);
    out.gain.setValueAtTime(LOUD, t0 + seconds * .45);
    out.gain.linearRampToValueAtTime(0, end);
    var sr = ctx.sampleRate, buf = ctx.createBuffer(1, sr, sr), d = buf.getChannelData(0);
    for (var i = 0; i < sr; i++) d[i] = Math.random() * 2 - 1;
    var air = ctx.createBufferSource(); air.buffer = buf; air.loop = true;
    var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 450;
    var ag = ctx.createGain(); ag.gain.setValueAtTime(0, t0); ag.gain.linearRampToValueAtTime(.08, t0 + .3); ag.gain.linearRampToValueAtTime(0, end);
    air.connect(lp); lp.connect(ag); ag.connect(out); air.start(t0); air.stop(end);
    var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 950; bp.Q.value = .9;
    bp.connect(out);
    for (var t = t0, k = 0; t < end - .1; k++) {
      var s = ctx.createBufferSource(), g = ctx.createGain(), away = 1 - (t - t0) / seconds * .8;
      s.buffer = buf;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(away, t + .008);
      g.gain.exponentialRampToValueAtTime(.001, t + rnd(.07, .1));
      s.connect(g); g.connect(bp);
      s.start(t, rnd(0, .8), .13);
      t += (1 / (8.5 - k * .06)) * rnd(.92, 1.08);     // the beats slow a little as it climbs
    }
    var done = false;
    function close() { if (done) return; done = true; setTimeout(function () { try { ctx.close(); } catch (e) {} }, 900); }
    setTimeout(close, seconds * 1000 + 200);
    return {
      fade: function () {           // the guest scrolled: the sound goes
        if (done) return;
        var now = ctx.currentTime;
        out.gain.cancelScheduledValues(now);
        out.gain.setValueAtTime(out.gain.value, now);
        out.gain.linearRampToValueAtTime(0, now + .6);
        close();
      }
    };
  }

  /* ---------- Satin that waves (WebGL; the still picture if unavailable) ----------
     A mask marks the satin (not the frame, the jewelled spray or the pen);
     only there the picture ripples gently and light moves over the folds. */
  function satin(canvas, srcs) {
    var gl;
    try { gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false }); } catch (e) { gl = null; }
    if (!gl) return null;
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
    var vs = sh(gl.VERTEX_SHADER, 'attribute vec2 p;varying vec2 uv;void main(){uv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}');
    var fs = sh(gl.FRAGMENT_SHADER, 'precision mediump float;varying vec2 uv;uniform sampler2D tex;uniform sampler2D msk;uniform float t;' +
      'void main(){float m=texture2D(msk,uv).r;' +
      'vec2 w=vec2(sin(uv.y*13.+t*1.25)*.0048+sin(uv.y*29.-t*1.7)*.0018,sin(uv.x*10.+uv.y*4.+t*1.05)*.0045);' +
      'vec3 c=texture2D(tex,uv+w*m).rgb;' +
      'float l=1.+m*(sin(uv.x*8.+uv.y*12.+t*1.5)*.035+sin(uv.y*21.-t*1.2)*.02);' +
      'gl_FragColor=vec4(c*l,1.);}');
    if (!vs || !fs) return null;
    var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    var bufr = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufr);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var uT = gl.getUniformLocation(pr, 't');
    function tex(unit, img, name) {
      var tx = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tx);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.uniform1i(gl.getUniformLocation(pr, name), unit);
    }
    var raf = 0, on = false, t0 = performance.now(), ready = false;
    function size() {
      var r = canvas.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
    }
    function frame(now) {
      if (!on) return;
      size();
      gl.uniform1f(uT, (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(frame);
    }
    var loaded = Promise.all(srcs.map(function (s) {
      return new Promise(function (res, rej) { var im = new Image(); im.onload = function () { res(im); }; im.onerror = rej; im.src = s; });
    })).then(function (ims) { tex(0, ims[0], 'tex'); tex(1, ims[1], 'msk'); ready = true; });
    return {
      start: function () { loaded.then(function () { if (on) return; on = true; canvas.parentNode.classList.add('has-gl'); raf = requestAnimationFrame(frame); }, function () {}); },
      stop: function () { on = false; cancelAnimationFrame(raf); },
      ready: function () { return ready; }
    };
  }

  AD.register('rsvp', {
    render: function (C) {
      var R = C.rsvp || {};
      var date = AD.weddingDate();
      var cer = (C.events || []).filter(function (e) { return e.id === 'ceremony'; })[0];
      var church = cer && (C.venues || []).filter(function (v) { return v.id === cer.venueId; })[0];
      var photo = (C.couplePhotos || [])[0];
      var guest = guestName();
      return '<div class="container container--narrow">' +
        AD.sectionHead({
          id: 'rsvp', eyebrow: 'RSVP', title: 'Kindly Respond',
          intro: 'Please let us know if you can join us.'
        }) +
        '<div class="rv" data-rv>' +
          (guest ? '<p class="rv-dear">Dear ' + AD.esc(guest) + ',</p>' : '') +
          // The dove with the envelope
          '<div class="rv-scene reveal" data-scene>' +
            '<div class="rv-stage" data-stage>' +
              '<img class="rv-sit" src="' + IMG + 'dove-envelope.webp' + V + '" width="1000" height="693" decoding="async" ' +
                'alt="A white dove holding the invitation: Please join us… ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '. Kindly RSVP.">' +
              '<span class="rv-ring" aria-hidden="true"></span>' +
              // the envelope, apart from the dove, for the opening
              '<div class="rv-env" data-env aria-hidden="true">' +
                '<span class="rv-env__inside"></span>' +
                '<span class="rv-env__letter"><span class="script">Accepted</span></span>' +
                '<img class="rv-env__bottom" src="' + IMG + 'env-bottom.webp' + V + '" alt="">' +
                '<span class="rv-env__flap" data-flap><img src="' + IMG + 'env-top.webp' + V + '" alt=""><span></span></span>' +
              '</div>' +
              '<span class="rv-flash" aria-hidden="true"></span>' +
              '<button class="rv-tap" type="button" data-tap>RSVP — accept the invitation</button>' +
            '</div>' +
            '<p class="rv-hint" aria-hidden="true">Tap <strong>RSVP</strong> to accept the invitation</p>' +
            '<p class="rsvp-by">Kindly respond by ' + (AD.has(R.deadline) ? '<strong>' + AD.esc(AD.formatDate(R.deadline)) + '</strong>' : AD.tbp('RSVP deadline')) + '</p>' +
            '<div class="hp-field" aria-hidden="true"><label for="rsvp-website">Website</label><input id="rsvp-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
            '<div data-status aria-live="polite"></div>' +
          '</div>' +
          // The thank-you board on satin
          '<div class="rv-board" data-board tabindex="-1" hidden>' +
            '<div class="rv-frame" data-frame>' +
              '<img class="rv-frame__img" src="' + IMG + 'satin-frame.webp' + V + '" width="736" height="1318" alt="" decoding="async">' +
              '<canvas class="rv-frame__gl" aria-hidden="true"></canvas>' +
              '<div class="rv-in">' +
                (photo ? '<figure class="rv-photo"><img src="' + AD.esc(photo.src) + V + '" alt="' + AD.esc(photo.alt || (C.couple.bride + ' and ' + C.couple.groom)) + '" decoding="async"></figure>' : '') +
                (guest ? '<p class="rv-to">Dear ' + AD.esc(guest) + ',</p>' : '') +
                '<h3 class="rv-quote script"><span class="rv-q" style="--i:0">Thank you for accepting</span> <span class="rv-q" style="--i:1">our invitation</span></h3>' +
                '<p class="rv-line">We can’t wait to celebrate with you.</p>' +
                '<p class="rv-sign script">' + AD.esc(C.couple.bride) + ' <span class="amp">&amp;</span> ' + AD.esc(C.couple.groom) + '</p>' +
                (AD.has(date) ? '<p class="rv-when">' + AD.esc(AD.formatDateShort(date)) + (cer && AD.has(cer.startTime) ? ' · ' + AD.esc(AD.formatTime(cer.startTime)) : '') + '</p>' : '') +
                (church ? '<p class="rv-where">' + AD.esc(church.name) + '</p>' : '') +
              '</div>' +
            '</div>' +
            '<div class="rv-actions">' +
              (cer && AD.has(cer.date) ? '<button class="btn btn--primary btn--sm" type="button" data-cal>' + AD.icon('calendar') + 'Add to Calendar</button>' : '') +
              (church && AD.mapUrl(church) ? '<a class="btn btn--secondary btn--sm" href="' + AD.esc(AD.mapUrl(church)) + '" target="_blank" rel="noopener">' + AD.icon('pin') + 'Get Directions</a>' : '') +
            '</div>' +
            '<button class="link-btn rv-again" type="button" data-again>See the invitation again</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    init: function (el, C) {
      var rv = el.querySelector('[data-rv]'), scene = el.querySelector('[data-scene]'), stage = el.querySelector('[data-stage]');
      var sit = stage.querySelector('.rv-sit'), env = el.querySelector('[data-env]'), flap = el.querySelector('[data-flap]');
      var tap = el.querySelector('[data-tap]'), status = el.querySelector('[data-status]');
      var board = el.querySelector('[data-board]'), frameEl = el.querySelector('[data-frame]');
      var still = AD.reducedMotion() || !Element.prototype.animate;
      var busy = false, wave = null;

      /* ---------- The board ---------- */
      function startWave() {
        if (still) return;
        if (!wave) wave = satin(frameEl.querySelector('canvas'), [IMG + 'satin-frame.webp' + V, IMG + 'satin-mask.webp' + V]);
        if (wave) wave.start();
      }
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          if (board.hidden) return;
          if (en[0].isIntersecting) startWave(); else if (wave) wave.stop();
        }).observe(frameEl);
      }
      function showBoard(play) {
        scene.hidden = true;
        board.hidden = false;
        rv.classList.add('is-accepted');
        board.classList.toggle('is-playing', !!play && !still);
        startWave();
      }
      function showScene() {
        board.hidden = true;
        if (wave) wave.stop();
        scene.hidden = false;
        rv.classList.remove('is-accepted', 'is-opening', 'is-off', 'is-landed');
        if (stage.getAnimations) stage.getAnimations({ subtree: true }).forEach(function (a) { a.cancel(); });
        flap.style.zIndex = '';
      }

      var cal = el.querySelector('[data-cal]');
      if (cal) cal.addEventListener('click', function () {
        var ev = AD.event('ceremony'), venue = AD.venue(ev.venueId);
        var c = AD.calendar.build({
          uid: 'event-' + ev.id, title: ev.name + ' — ' + C.couple.bride + ' & ' + C.couple.groom,
          description: ev.description, date: ev.date, startTime: ev.startTime, endTime: ev.endTime, location: AD.venueLine(venue)
        });
        if (c) AD.calendar.open(c, cal);
      });

      /* ---------- The dove sits holding the envelope ---------- */
      function land() { rv.classList.add('is-landed'); }
      // the flying dove's pictures, ready before the tap
      ['dove-body', 'dove-near', 'dove-far'].forEach(function (n) { var i = new Image(); i.src = IMG + n + '.webp' + V; });

      /* ---------- Tap RSVP ---------- */
      function takeOff(sky) {
        // the same dove leaves the envelope and flies up, off the top of the screen
        var r = stage.getBoundingClientRect(), dw = r.width * .7, dh = dw * DOVE.ratio;
        var x = r.left + BODY.x * r.width - DOVE.bx * dw, y = r.top + BODY.y * r.height - DOVE.by * dh;
        var d = dove('is-flying');
        d.style.setProperty('--dw', dw + 'px'); d.style.setProperty('--beat', '.12s');
        sky.appendChild(d);
        var a = d.animate([
          { transform: 'translate(' + x + 'px,' + y + 'px) rotate(0deg) scale(1)', opacity: 0 },
          { opacity: 1, offset: .06 },
          { transform: 'translate(' + (x - .06 * innerWidth) + 'px,' + (y - .2 * innerHeight) + 'px) rotate(-8deg) scale(1.04)', offset: .3 },
          { transform: 'translate(' + (x - .14 * innerWidth) + 'px,' + (-dh * 1.4) + 'px) rotate(-14deg) scale(1.12)', opacity: 1 }
        ], { duration: 2600, easing: 'cubic-bezier(.4,0,.7,1)', fill: 'forwards' });
        return a.finished;
      }
      function openEnvelope() {
        // the envelope straightens and comes forward, opens, a card slides out, and it all turns to light
        var W = stage.clientWidth, H = stage.clientHeight, s = W < 520 ? 1.4 : 1.3;
        var dx = (.5 - ENV.cx) * W, dy = (.5 - ENV.cy) * H;
        rv.classList.add('is-opening');
        env.animate([
          { transform: 'translate(0,0) rotate(7.5deg) scale(1)' },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(0deg) scale(' + s + ')' }
        ], { duration: 700, delay: 150, easing: 'cubic-bezier(.3,.1,.3,1)', fill: 'forwards' });
        flap.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(180deg)' }], { duration: 700, delay: 880, easing: 'cubic-bezier(.45,.05,.4,1)', fill: 'forwards' });
        setTimeout(function () { flap.style.zIndex = '1'; }, 1230);   // once it is up, the card passes in front of it
        env.querySelector('.rv-env__letter').animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-58%)' }],
          { duration: 700, delay: 1350, easing: 'cubic-bezier(.3,.1,.3,1)', fill: 'forwards' });
        stage.querySelector('.rv-flash').animate([{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1.1)', offset: .55 }, { opacity: 0, transform: 'scale(1.3)' }],
          { duration: 900, delay: 1950, easing: 'ease-out', fill: 'both' });
        env.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 2150, fill: 'forwards' });
        return wait(2350);
      }

      function accept() {
        if (busy) return;
        busy = true;
        status.innerHTML = '';
        var name = guestName(), prev = remembered();
        var save = prev ? Promise.resolve({ ok: true }) :   // already sent from this device: only the animation again
          AD.store.submit('rsvp', {
            name: name, attending: 'yes', guests: 1, events: [], dietary: '', message: '',
            website: el.querySelector('#rsvp-website').value
          });
        if (still) {
          save.then(function (r) { busy = false; if (!r.ok) return fail(r); if (!prev) remember({ name: name, at: new Date().toISOString() }); showBoard(false); board.focus({ preventScroll: true }); });
          return;
        }
        // Sound first, while the tap still counts as the guest's own action.
        var sound = wings(2.6), y0 = window.scrollY;
        function onScroll() { if (Math.abs(window.scrollY - y0) > 40 && sound) { sound.fade(); sound = null; window.removeEventListener('scroll', onScroll); } }
        window.addEventListener('scroll', onScroll, { passive: true });
        setTimeout(function () { window.removeEventListener('scroll', onScroll); }, 6000);

        var sky = document.createElement('div');
        sky.className = 'dove-sky';
        sky.setAttribute('aria-hidden', 'true');
        document.body.appendChild(sky);
        rv.classList.add('is-off');                   // the sitting dove gives way to the one taking off
        takeOff(sky).then(function () { sky.remove(); }, function () { sky.remove(); });

        Promise.all([openEnvelope(), save]).then(function (res) {
          var r = res[1];
          busy = false;
          if (!r.ok) { if (sound) sound.fade(); showScene(); land(); return fail(r); }
          if (!prev) remember({ name: name, at: new Date().toISOString() });
          var h0 = scene.offsetHeight;
          showBoard(true);
          var h1 = board.offsetHeight;
          board.animate([{ height: h0 + 'px', overflow: 'hidden' }, { height: h1 + 'px', overflow: 'hidden' }], { duration: 700, easing: 'cubic-bezier(.3,.1,.3,1)' });
          setTimeout(function () { board.focus({ preventScroll: true }); }, 900);
        });
      }
      function fail(r) {
        status.innerHTML = '<div class="status status--error" role="alert">' + AD.icon('alert') +
          '<div><p><strong>Your response was not sent.</strong> ' + AD.esc(r.error || '') + '</p><p>Please tap RSVP again. If the problem continues, contact the family through the Contact section.</p></div></div>';
      }
      tap.addEventListener('click', accept);

      el.querySelector('[data-again]').addEventListener('click', function (e) {
        showScene();
        land();
        if (!e.detail) tap.focus({ preventScroll: true });   // keyboard users land on RSVP
      });

      // A guest who has already accepted on this device sees the board.
      if (remembered()) showBoard(false);
      else land();
    }
  });
})();
