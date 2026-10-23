/* =============================================================================
   11. RSVP — the dove brings the invitation (the couple's dove pictures).
   A white dove sits in the middle holding the envelope ("Please join us…
   Angel & David · Kindly RSVP"). Tapping RSVP on the envelope:
     · the same dove lets go of the envelope and flies away on a slanting
       line, up and out across the side of the screen — slow, full wing
       beats and a gentle wavy path, as in the couple's dove video — while a
       soft, slow harp melody plays (it fades as soon as the guest scrolls);
     · the envelope straightens, its top opens, a card slides out and it
       all dissolves in light;
     · satin, in the colour of the page, sweeps across the whole section
       from left to right and keeps waving; the couple's black-and-white
       photo develops on it and "Thank you for accepting our invitation"
       writes itself, with the day and the church and buttons to add it to
       the calendar or get directions.
   A personal link can carry the guest's name (…/?guest=Anu%20Thomas): it
   greets them and the acceptance is saved under that name. The acceptance
   is remembered on this device (a later visit shows the thank-you; "See
   the invitation again" brings the dove back). Saved by AD.store: in this
   browser until the Google Sheet is connected.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var KEY = 'ad-rsvp-accepted';
  var V = '?v=20261023d';
  var IMG = 'assets/images/dove/';
  // Inside dove-envelope.webp (fractions of its width / height)
  var BODY = { x: .64, y: .61 };       // the sitting dove's body
  var ENV = { cx: .2859, cy: .4398 };  // centre of the envelope (tilted 7.5°)
  // Inside the flying dove's box (dove-*.webp, facing left)
  var DOVE = { ratio: 408 / 418, bx: .55, by: .73 };
  var FLIGHT = 5400;                   // ms from the envelope to off the top of the screen
  var BEAT = 1000;                     // ms per wing beat: slow and full, as in the video

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

  /* ---------- A soft, slow melody while the dove flies (made in the browser, no file) ----------
     A harp-like arpeggio in F major — F, C/E, Dm, B♭, C, F — with a quiet
     bell melody on top, a faint pad underneath and a little echo for space.
     Gentle and low; it fades away as soon as the guest scrolls. */
  function melody() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    var ctx;
    try { ctx = new Ctx(); } catch (e) { return null; }
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
    function hz(n) { return 440 * Math.pow(2, (n - 69) / 12); }   // MIDI note number to frequency
    var out = ctx.createGain(), t0 = ctx.currentTime + .05;
    out.gain.value = .3;
    var tone = ctx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 3200;
    tone.connect(out); out.connect(ctx.destination);
    // a soft echo for space
    var dl = ctx.createDelay(1), fb = ctx.createGain(), dlp = ctx.createBiquadFilter(), wet = ctx.createGain();
    dl.delayTime.value = .27; fb.gain.value = .3; dlp.type = 'lowpass'; dlp.frequency.value = 1900; wet.gain.value = .32;
    tone.connect(dl); dl.connect(dlp); dlp.connect(fb); fb.connect(dl); dlp.connect(wet); wet.connect(out);
    function pluck(n, t, v, len) {           // a harp / music-box note
      [[1, 'sine', 1], [2, 'triangle', .16]].forEach(function (h) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = h[1]; o.frequency.value = hz(n) * h[0];
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(v * h[2], t + .012);
        g.gain.exponentialRampToValueAtTime(.0005, t + len);
        o.connect(g); g.connect(tone); o.start(t); o.stop(t + len + .05);
      });
    }
    function pad(notes, t, len) {            // a faint held chord underneath
      notes.forEach(function (n) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = hz(n);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.035, t + .45); g.gain.linearRampToValueAtTime(0, t + len);
        o.connect(g); g.connect(tone); o.start(t); o.stop(t + len + .05);
      });
    }
    // chord (arpeggio, low to high), melody note on top
    var song = [
      [[53, 60, 65, 69, 72], 81], [[52, 55, 60, 64, 67], 79], [[50, 57, 62, 65, 69], 77],
      [[46, 53, 58, 62, 65], 74], [[48, 55, 60, 64, 67], 76], [[53, 60, 65, 69, 72, 77], 77]
    ];
    var step = .95, t = t0;
    song.forEach(function (c, i) {
      var last = i === song.length - 1;
      c[0].forEach(function (n, k) { pluck(n, t + k * .11, .16 - k * .012, last ? 3.2 : 2.2); });
      pluck(c[1], t + .06, .1, last ? 3.6 : 2.4);
      pad([c[0][0] + 12, c[0][1] + 12], t, step + .5);
      t += step;
    });
    var end = t + 3.2;
    out.gain.setValueAtTime(.3, end - 1.4);
    out.gain.linearRampToValueAtTime(0, end);
    var done = false;
    function close() { if (done) return; done = true; setTimeout(function () { try { ctx.close(); } catch (e) {} }, 900); }
    setTimeout(close, (end - ctx.currentTime) * 1000 + 300);
    return {
      fade: function () {           // the guest scrolled: the music goes
        if (done) return;
        var now = ctx.currentTime;
        out.gain.cancelScheduledValues(now);
        out.gain.setValueAtTime(out.gain.value, now);
        out.gain.linearRampToValueAtTime(0, now + .8);
        close();
      }
    };
  }

  /* ---------- Satin across the whole section (WebGL; plain paper if unavailable) ----------
     Drawn, not a picture: long soft folds that travel and bend, with a
     satin sheen sliding over them, in the colour of the page. */
  function satin(canvas) {
    var gl;
    try { gl = canvas.getContext('webgl', { alpha: false, antialias: false }); } catch (e) { gl = null; }
    if (!gl) return null;
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
    var vs = sh(gl.VERTEX_SHADER, 'attribute vec2 p;varying vec2 uv;void main(){uv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}');
    var fs = sh(gl.FRAGMENT_SHADER, 'precision mediump float;varying vec2 uv;uniform vec2 res;uniform float t;' +
      'float H(vec2 p){' +
        'float h=sin(p.x*1.1+p.y*.5+t*1.15+sin(p.y*.85+t*.75)*1.7)*.62;' +
        'h+=sin(-p.x*.75+p.y*1.3-t*.95+sin(p.x*1.25-t*.6)*1.3)*.4;' +
        'h+=sin(p.x*2.2+p.y*1.6+t*1.7+sin(p.y*1.4+t*1.2)*.9)*.15;' +
        'return h;}' +
      'void main(){' +
        'vec2 p=uv*res/95.;float e=.04;' +
        'float hx=H(p+vec2(e,0.))-H(p-vec2(e,0.));float hy=H(p+vec2(0.,e))-H(p-vec2(0.,e));' +
        'vec3 n=normalize(vec3(-hx,-hy,e*2.6));' +
        'vec3 l=normalize(vec3(-.45,-.6,.68));' +
        'float d=clamp(dot(n,l),0.,1.);' +
        'float sp=pow(clamp(reflect(-l,n).z,0.,1.),16.);' +
        'vec3 c=mix(vec3(.865,.848,.815),vec3(.99,.984,.97),smoothstep(.2,.95,d));' +
        'c+=sp*.16;' +
        'gl_FragColor=vec4(min(c,vec3(1.)),1.);}');
    if (!vs || !fs) return null;
    var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var uT = gl.getUniformLocation(pr, 't'), uR = gl.getUniformLocation(pr, 'res');
    var raf = 0, on = false, t0 = performance.now();
    function draw(now) {
      var r = canvas.getBoundingClientRect();
      // the satin is soft, so it is drawn at a lower resolution and scaled up
      var q = Math.min(.7, 800 / Math.max(1, Math.max(r.width, r.height)));
      var w = Math.max(1, Math.round(r.width * q)), h = Math.max(1, Math.round(r.height * q));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uR, r.width, r.height);
      gl.uniform1f(uT, (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    function frame(now) { if (!on) return; draw(now); raf = requestAnimationFrame(frame); }
    return {
      start: function (moving) { if (on) return; if (!moving) { draw(performance.now()); return; } on = true; raf = requestAnimationFrame(frame); },
      stop: function () { on = false; cancelAnimationFrame(raf); }
    };
  }

  AD.register('rsvp', {
    render: function (C) {
      var date = AD.weddingDate();
      var cer = (C.events || []).filter(function (e) { return e.id === 'ceremony'; })[0];
      var church = cer && (C.venues || []).filter(function (v) { return v.id === cer.venueId; })[0];
      var photo = (C.couplePhotos || [])[0];
      var guest = guestName();
      return '' +
        // Satin over the whole section once the invitation is accepted
        '<div class="rv-satin" aria-hidden="true"><div class="rv-satin__sweep"><canvas></canvas></div></div>' +
        '<div class="container container--narrow">' +
        AD.sectionHead({
          id: 'rsvp', eyebrow: 'RSVP', title: 'Kindly Respond',
          intro: ''
        }) +
        '<div class="rv" data-rv>' +
          (guest ? '<p class="rv-dear">Dear ' + AD.esc(guest) + ',</p>' : '') +
          // The dove with the envelope
          '<div class="rv-scene reveal" data-scene>' +
            '<div class="rv-stage" data-stage>' +
              '<img class="rv-sit" src="' + IMG + 'dove-envelope.webp' + V + '" width="1000" height="693" decoding="async" ' +
                'alt="A white dove holding the invitation: Please join us… ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '. Kindly RSVP.">' +
              '<span class="rv-ring" aria-hidden="true"></span>' +
              AD.tapHand('rv-hand') +
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
            '<div class="hp-field" aria-hidden="true"><label for="rsvp-website">Website</label><input id="rsvp-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
            '<div data-status aria-live="polite"></div>' +
          '</div>' +
          // The thank-you, on the satin
          '<div class="rv-board" data-board tabindex="-1" hidden>' +
            (photo ? '<figure class="rv-photo"><img src="' + AD.esc(photo.src) + V + '" alt="' + AD.esc(photo.alt || (C.couple.bride + ' and ' + C.couple.groom)) + '" decoding="async"></figure>' : '') +
            (guest ? '<p class="rv-to">Dear ' + AD.esc(guest) + ',</p>' : '') +
            '<h3 class="rv-quote"><span class="rv-q" style="--i:0">Thank you for accepting</span> <span class="rv-q" style="--i:1">our invitation</span></h3>' +
            '<p class="rv-line">We can’t wait to celebrate with you.</p>' +
            '<p class="rv-sign script">' + AD.esc(C.couple.bride) + ' <span class="amp">&amp;</span> ' + AD.esc(C.couple.groom) + '</p>' +
            (AD.has(date) ? '<p class="rv-when">' + AD.esc(AD.formatDateShort(date)) + (cer && AD.has(cer.startTime) ? ' · ' + AD.esc(AD.formatTime(cer.startTime)) : '') + '</p>' : '') +
            (church ? '<p class="rv-where">' + AD.esc(church.name) + '</p>' : '') +
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
      var env = el.querySelector('[data-env]'), flap = el.querySelector('[data-flap]');
      var tap = el.querySelector('[data-tap]'), status = el.querySelector('[data-status]');
      var board = el.querySelector('[data-board]'), cloth = el.querySelector('.rv-satin canvas');
      var still = AD.reducedMotion() || !Element.prototype.animate;
      var busy = false, wave = null, inView = false;

      /* ---------- Satin and the thank-you ---------- */
      function startWave() {
        if (!wave) wave = satin(cloth);
        if (wave) wave.start(!still && inView);
      }
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          inView = en[0].isIntersecting;
          if (!el.classList.contains('is-satin')) return;
          if (inView) startWave(); else if (wave) wave.stop();
        }).observe(el);
      } else inView = true;
      function showBoard(play) {
        scene.hidden = true;
        board.hidden = false;
        rv.classList.add('is-accepted');
        el.classList.add('is-satin');
        el.classList.toggle('is-sweeping', !!play && !still);
        board.classList.toggle('is-playing', !!play && !still);
        startWave();
      }
      function showScene() {
        board.hidden = true;
        el.classList.remove('is-satin', 'is-sweeping');
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
      // The same dove lets go of the envelope and flies away on a slanting
      // line, up and out across the left side of the screen (the way it
      // faces): it lifts gently, glides along a soft wavy path and goes out,
      // tilting with the sway. The path is worked out in advance and played by
      // the browser's compositor, and the wings beat with CSS (slowly and
      // fully, the body rising on each downstroke), so it stays smooth even
      // while the envelope and the satin are moving.
      function flyUp(sky) {
        var r = stage.getBoundingClientRect(), dw = r.width * .7, dh = dw * DOVE.ratio;
        var x0 = r.left + BODY.x * r.width - DOVE.bx * dw, y0 = r.top + BODY.y * r.height - DOVE.by * dh;
        var d = dove('is-flying');
        d.style.setProperty('--dw', dw + 'px');
        d.style.setProperty('--beat', (BEAT / 2) + 'ms');
        sky.appendChild(d);
        // out through the left edge, about 40 % of the screen higher: a slanting line
        var x1 = -dw * 1.25, y1 = Math.max(-dh * 1.2, y0 - innerHeight * .4), sway = Math.min(24, innerHeight * .03);
        function at(u) {
          var p = (1 - Math.cos(u * Math.PI)) / 2;               // eases in and out
          var go = p * .7 + u * u * .3;                           // a gentle start, then away
          var wave = Math.sin(u * Math.PI * 2.2) * Math.min(1, u * 2.2);
          return { x: x0 + (x1 - x0) * go, y: y0 + (y1 - y0) * go + sway * wave, s: 1 + .1 * p };
        }
        var N = 90, frames = [];
        for (var k = 0; k <= N; k++) {
          var u = k / N, q = at(u), nx = at(Math.min(1, u + .02));
          var tilt = Math.max(-12, Math.min(12, Math.atan2(nx.x - q.x, q.y - nx.y + .001) * 57.3 * .6)) - 3 * Math.min(1, u * 4);
          frames.push({ transform: 'translate3d(' + q.x.toFixed(1) + 'px,' + q.y.toFixed(1) + 'px,0) rotate(' + tilt.toFixed(2) + 'deg) scale(' + q.s.toFixed(3) + ')', offset: u });
        }
        d.animate([{ opacity: 0 }, { opacity: 1, offset: .08 }, { opacity: 1 }], { duration: FLIGHT, fill: 'forwards' });
        return d.animate(frames, { duration: FLIGHT, easing: 'linear', fill: 'forwards' }).finished;
      }
      function openEnvelope() {
        // the envelope straightens and comes forward, opens, a card slides out, and it all turns to light
        var W = stage.clientWidth, H = stage.clientHeight, s = W < 520 ? 1.4 : 1.3;
        var dx = (.5 - ENV.cx) * W, dy = (.5 - ENV.cy) * H;
        rv.classList.add('is-opening');
        env.animate([
          { transform: 'translate(0,0) rotate(7.5deg) scale(1)' },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(0deg) scale(' + s + ')' }
        ], { duration: 800, delay: 450, easing: 'cubic-bezier(.3,.1,.3,1)', fill: 'forwards' });
        flap.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(180deg)' }], { duration: 750, delay: 1300, easing: 'cubic-bezier(.45,.05,.4,1)', fill: 'forwards' });
        setTimeout(function () { flap.style.zIndex = '1'; }, 1680);   // once it is up, the card passes in front of it
        env.querySelector('.rv-env__letter').animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-58%)' }],
          { duration: 750, delay: 1800, easing: 'cubic-bezier(.3,.1,.3,1)', fill: 'forwards' });
        stage.querySelector('.rv-flash').animate([{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1.1)', offset: .55 }, { opacity: 0, transform: 'scale(1.3)' }],
          { duration: 900, delay: 2450, easing: 'ease-out', fill: 'both' });
        env.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 2650, fill: 'forwards' });
        return wait(2850);
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
        var sound = melody(), y0 = window.scrollY;
        function onScroll() { if (Math.abs(window.scrollY - y0) > 40 && sound) { sound.fade(); sound = null; window.removeEventListener('scroll', onScroll); } }
        window.addEventListener('scroll', onScroll, { passive: true });
        setTimeout(function () { window.removeEventListener('scroll', onScroll); }, 10000);

        var sky = document.createElement('div');
        sky.className = 'dove-sky';
        sky.setAttribute('aria-hidden', 'true');
        document.body.appendChild(sky);
        rv.classList.add('is-off');                   // the sitting dove gives way to the one taking off
        flyUp(sky).then(function () { sky.remove(); });

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

      // A guest who has already accepted on this device sees the thank-you.
      if (remembered()) showBoard(false);
      else land();
    }
  });
})();
