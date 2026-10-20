/* =============================================================================
   10. WISHING WALL
   Demo mode (no backend.endpoint): wishes stay in this browser only and are
   labelled "Preview". Connected mode: saved by the server; with moderation
   they appear only after approval. Guest text is always rendered as text.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function shortDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return '';
    return d.getDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()] + ' ' + d.getFullYear();
  }

  // Builds a wish card with DOM text nodes (never innerHTML for guest text).
  function wishCard(w) {
    var li = document.createElement('li');
    li.className = 'wish-card';
    var msg = document.createElement('p');
    msg.className = 'wish-card__msg';
    msg.textContent = w.message;
    var by = document.createElement('p');
    by.className = 'wish-card__by';
    var name = document.createElement('span');
    name.className = 'wish-card__name';
    name.textContent = w.name;
    by.appendChild(name);
    var meta = shortDate(w.submittedAt);
    if (meta || w.demo) {
      var m = document.createElement('span');
      m.className = 'wish-card__meta';
      m.textContent = [meta, w.demo ? 'Preview · this device only' : ''].filter(Boolean).join(' · ');
      by.appendChild(m);
    }
    li.appendChild(msg);
    li.appendChild(by);
    return li;
  }

  function renderList(ul, wishes) {
    ul.innerHTML = '';
    wishes.forEach(function (w) { ul.appendChild(wishCard(w)); });
  }

  AD.register('wishes', {
    render: function (C) {
      var W = C.wishes || {};
      var connected = AD.store.isConnected();
      return '<div class="container">' +
        AD.sectionHead({
          id: 'wishes', eyebrow: 'Wishing Wall', title: 'Leave a Blessing',
          intro: 'Share a prayer, a memory or a word of love for ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '.'
        }) +
        '<div class="wishes-layout">' +
          '<form class="wish-form note reveal" id="wish-form" novalidate>' +
            '<div data-errors hidden></div>' +
            '<div class="field">' +
              '<label class="field__label" for="wish-name">Your name</label>' +
              '<input class="input" id="wish-name" name="name" type="text" autocomplete="name" maxlength="' + W.nameMax + '" required aria-describedby="wish-name-err">' +
              '<p class="field__error" id="wish-name-err" hidden></p>' +
            '</div>' +
            '<div class="field">' +
              '<label class="field__label" for="wish-msg">Your wish</label>' +
              '<textarea class="textarea" id="wish-msg" name="message" rows="4" maxlength="' + W.messageMax + '" required aria-describedby="wish-msg-count wish-msg-err"></textarea>' +
              '<p class="field__counter" id="wish-msg-count" aria-live="off"><span data-count>0</span> / ' + W.messageMax + '</p>' +
              '<p class="field__error" id="wish-msg-err" hidden></p>' +
            '</div>' +
            '<div class="hp-field" aria-hidden="true"><label for="wish-website">Website</label><input id="wish-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
            '<button class="btn btn--primary btn--block" type="submit">' + AD.icon('envelope') + '<span>Send Wish</span></button>' +
            '<div data-status aria-live="polite"></div>' +
            (connected
              ? (W.moderation ? '<p class="mode-note">' + AD.icon('info') + '<span>Wishes appear on the wall after the couple approves them.</span></p>' : '')
              : '<p class="mode-note">' + AD.icon('info') + '<span><strong>Preview mode:</strong> wishes are kept only in this browser and are not sent to ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + ' until the wall is connected.</span></p>') +
          '</form>' +
          '<div class="wish-preview reveal" data-delay="1">' +
            '<h3 class="wish-preview__title">Recent wishes</h3>' +
            '<ul class="wish-list wish-list--preview" data-preview></ul>' +
            '<p class="wish-empty" data-empty>No wishes yet — be the first to leave one.</p>' +
            '<button class="btn btn--secondary" type="button" data-view-all aria-haspopup="dialog">' + AD.icon('heart') + '<span>View All Wishes</span></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    init: function (el, C) {
      var W = C.wishes || {};
      var form = el.querySelector('#wish-form');
      var nameI = form.querySelector('#wish-name');
      var msgI = form.querySelector('#wish-msg');
      var count = form.querySelector('[data-count]');
      var status = form.querySelector('[data-status]');
      var errors = form.querySelector('[data-errors]');
      var submit = form.querySelector('button[type="submit"]');
      var preview = el.querySelector('[data-preview]');
      var empty = el.querySelector('[data-empty]');
      var viewAll = el.querySelector('[data-view-all]');
      var tried = false;

      var dlg = AD.dialog.create({
        id: 'wishes-dialog', title: 'Wishes for ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom), className: 'dlg--wishes',
        body: '<div data-dlg-status aria-live="polite"></div><ul class="wish-list wish-list--all" data-all></ul>'
      });
      var allList = dlg.querySelector('[data-all]');
      var dlgStatus = dlg.querySelector('[data-dlg-status]');

      function refresh() {
        return AD.store.listWishes().then(function (r) {
          var list = r.wishes || [];
          renderList(preview, list.slice(0, 3));
          empty.hidden = list.length > 0;
          viewAll.querySelector('span').textContent = 'View All Wishes' + (list.length ? ' (' + list.length + ')' : '');
          return r;
        });
      }
      refresh();

      viewAll.addEventListener('click', function () {
        dlgStatus.innerHTML = '<p class="wish-loading">Loading wishes…</p>';
        allList.innerHTML = '';
        AD.dialog.open(dlg, viewAll);
        AD.store.listWishes().then(function (r) {
          if (!r.ok) {
            dlgStatus.innerHTML = '<div class="status status--error">' + AD.icon('alert') + '<p>We could not load the wishes right now. Please try again later.</p></div>';
            return;
          }
          dlgStatus.innerHTML = r.demo
            ? '<p class="mode-note">' + AD.icon('info') + '<span>Preview mode — showing wishes saved in this browser only.</span></p>'
            : '';
          if (!r.wishes.length) {
            dlgStatus.innerHTML += '<p class="wish-empty">No wishes yet — be the first to leave one.</p>';
          }
          renderList(allList, r.wishes);
        });
      });

      msgI.addEventListener('input', function () { count.textContent = msgI.value.length; if (tried) validate(); });
      nameI.addEventListener('input', function () { if (tried) validate(); });

      function validate() {
        var errs = [];
        var n = nameI.value.trim(), m = msgI.value.trim();
        var ne = !n ? 'Please enter your name.' : (n.length > W.nameMax ? 'Please keep your name under ' + W.nameMax + ' characters.' : '');
        var me = !m ? 'Please write a wish.' : (m.length < 2 ? 'Your wish is a little short.' : '');
        AD.form.setError(nameI, ne);
        AD.form.setError(msgI, me);
        if (ne) errs.push({ id: 'wish-name', msg: ne });
        if (me) errs.push({ id: 'wish-msg', msg: me });
        return errs;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        tried = true;
        status.innerHTML = '';
        var errs = validate();
        AD.form.errorSummary(errors, errs);
        if (errs.length) { errors.querySelector('.status').focus(); return; }

        var payload = { name: nameI.value.trim(), message: msgI.value.trim(), website: form.querySelector('#wish-website').value };
        submit.classList.add('is-busy');
        submit.disabled = true;
        AD.store.submit('wish', payload).then(function (r) {
          submit.classList.remove('is-busy');
          submit.disabled = false;
          if (!r.ok) {
            status.innerHTML = '<div class="status status--error" role="alert">' + AD.icon('alert') +
              '<div><p><strong>Your wish was not sent.</strong> ' + AD.esc(r.error || '') + '</p><p>Please try again, or share it with the family through the Contact section.</p></div></div>';
            return;
          }
          form.reset();
          count.textContent = '0';
          tried = false;
          if (r.demo) {
            status.innerHTML = '<div class="status status--demo">' + AD.icon('info') +
              '<div><p><strong>Preview only.</strong> Your wish was kept on this device and has not been sent to ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '.</p></div></div>';
          } else if (r.pending || W.moderation) {
            status.innerHTML = '<div class="status status--success">' + AD.icon('check') +
              '<div><p><strong>Thank you!</strong> Your wish has been received and will appear once approved.</p></div></div>';
          } else {
            status.innerHTML = '<div class="status status--success">' + AD.icon('check') + '<div><p><strong>Thank you!</strong> Your wish has been added to the wall.</p></div></div>';
          }
          refresh().then(function () {
            var first = preview.firstElementChild;
            if (first && !AD.reducedMotion()) first.classList.add('is-new');
          });
        });
      });
    }
  });
})();
