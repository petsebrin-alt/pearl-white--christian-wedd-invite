/* =============================================================================
   11. RSVP
   Success is shown ONLY after the server confirms it saved the response.
   Demo mode shows an information panel, never a success message.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var DEFAULT_MAX = 10;

  AD.register('rsvp', {
    render: function (C) {
      var R = C.rsvp || {};
      var max = R.maxGuestsPerInvite || DEFAULT_MAX;
      var events = C.events || [];
      var connected = AD.store.isConnected();

      return '<div class="container container--narrow">' +
        AD.sectionHead({
          id: 'rsvp', eyebrow: 'RSVP', title: 'Kindly Respond',
          intro: 'Please let us know if you can join us.'
        }) +
        '<p class="rsvp-deadline reveal">Kindly respond by ' + (AD.has(R.deadline) ? '<strong>' + AD.esc(AD.formatDate(R.deadline)) + '</strong>' : AD.tbp('RSVP deadline')) + '</p>' +
        (AD.has(R.guestRulesNote) ? '<p class="rsvp-rules reveal">' + AD.esc(R.guestRulesNote) + '</p>' : '') +
        '<div class="rsvp-card paper paper--embossed reveal" data-delay="1">' +
          '<form class="form" id="rsvp-form" novalidate>' +
            '<div data-errors hidden></div>' +
            '<div class="field">' +
              '<label class="field__label" for="rsvp-name">Guest name</label>' +
              '<input class="input" id="rsvp-name" name="name" type="text" autocomplete="name" maxlength="80" required aria-describedby="rsvp-name-hint rsvp-name-err">' +
              '<p class="field__hint" id="rsvp-name-hint">As written on your invitation.</p>' +
              '<p class="field__error" id="rsvp-name-err" hidden></p>' +
            '</div>' +
            '<fieldset class="field" id="rsvp-attending-group" aria-describedby="rsvp-attending-err">' +
              '<legend class="field__label">Will you attend?</legend>' +
              '<div class="choice-pills">' +
                '<label class="choice"><input type="radio" name="attending" value="yes" id="rsvp-attending"><span>Joyfully accepts</span></label>' +
                '<label class="choice"><input type="radio" name="attending" value="no"><span>Regretfully declines</span></label>' +
              '</div>' +
              '<p class="field__error" id="rsvp-attending-err" hidden></p>' +
            '</fieldset>' +
            '<div class="rsvp-attend" data-attend hidden>' +
              '<div class="field">' +
                '<label class="field__label" for="rsvp-guests">Number of attendees</label>' +
                '<p class="field__hint" id="rsvp-guests-hint">Including yourself. ' +
                  (R.maxGuestsPerInvite ? 'Up to ' + max + ' per invitation.' : 'Guest limit ' + AD.tbp('Guest limit')) + '</p>' +
                '<div class="stepper">' +
                  '<button type="button" data-step="-1" aria-label="Decrease number of attendees">−</button>' +
                  '<input id="rsvp-guests" name="guests" type="number" inputmode="numeric" min="1" max="' + max + '" value="1" aria-describedby="rsvp-guests-hint rsvp-guests-err">' +
                  '<button type="button" data-step="1" aria-label="Increase number of attendees">+</button>' +
                '</div>' +
                '<p class="field__error" id="rsvp-guests-err" hidden></p>' +
              '</div>' +
              '<fieldset class="field" aria-describedby="rsvp-events-err">' +
                '<legend class="field__label">Events you will attend</legend>' +
                '<div class="checks">' + events.map(function (ev, i) {
                  return '<label class="check"><input type="checkbox" name="events" value="' + AD.esc(ev.id) + '"' + (i === 0 ? ' id="rsvp-events"' : '') + '>' +
                    '<span>' + AD.esc(ev.name) + '</span></label>';
                }).join('') + '</div>' +
                '<p class="field__error" id="rsvp-events-err" hidden></p>' +
              '</fieldset>' +
              '<div class="field">' +
                '<label class="field__label" for="rsvp-diet">Dietary requirements <span class="opt">(optional)</span></label>' +
                '<input class="input" id="rsvp-diet" name="dietary" type="text" maxlength="200" placeholder="e.g. vegetarian, nut allergy">' +
              '</div>' +
            '</div>' +
            '<div class="field">' +
              '<label class="field__label" for="rsvp-message">Message for the couple <span class="opt">(optional)</span></label>' +
              '<textarea class="textarea" id="rsvp-message" name="message" rows="3" maxlength="500"></textarea>' +
            '</div>' +
            '<div class="hp-field" aria-hidden="true"><label for="rsvp-website">Website</label><input id="rsvp-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
            '<button class="btn btn--primary btn--block" type="submit">' + AD.icon('envelope') + '<span>Send RSVP</span></button>' +
            '<div data-status aria-live="polite"></div>' +
            (connected ? '' :
              '<p class="mode-note">' + AD.icon('info') + '<span><strong>Preview mode:</strong> this form is not yet connected, so responses are not sent to the couple.</span></p>') +
          '</form>' +
          '<div class="rsvp-done" data-done hidden tabindex="-1"></div>' +
        '</div>' +
      '</div>';
    },

    init: function (el, C) {
      var R = C.rsvp || {};
      var max = R.maxGuestsPerInvite || DEFAULT_MAX;
      var form = el.querySelector('#rsvp-form');
      var done = el.querySelector('[data-done]');
      var attendWrap = form.querySelector('[data-attend]');
      var guests = form.querySelector('#rsvp-guests');
      var nameI = form.querySelector('#rsvp-name');
      var errors = form.querySelector('[data-errors]');
      var status = form.querySelector('[data-status]');
      var submit = form.querySelector('button[type="submit"]');
      var tried = false;

      function attending() {
        var r = form.querySelector('input[name="attending"]:checked');
        return r ? r.value : '';
      }
      function setGroupError(id, msg) {
        var g = document.getElementById(id);
        var err = g.querySelector('.field__error');
        g.classList.toggle('is-invalid', !!msg);
        err.hidden = !msg;
        err.innerHTML = msg ? AD.icon('alert') + '<span>' + AD.esc(msg) + '</span>' : '';
      }

      form.addEventListener('change', function (e) {
        if (e.target.name === 'attending') {
          attendWrap.hidden = attending() !== 'yes';
        }
        if (tried) validate();
      });
      nameI.addEventListener('input', function () { if (tried) validate(); });

      AD.$$('[data-step]', form).forEach(function (b) {
        b.addEventListener('click', function () {
          var v = parseInt(guests.value, 10) || 1;
          v = Math.min(max, Math.max(1, v + Number(b.getAttribute('data-step'))));
          guests.value = v;
          AD.announce(v + (v === 1 ? ' attendee' : ' attendees'));
          if (tried) validate();
        });
      });

      function validate() {
        var errs = [];
        var n = nameI.value.trim();
        var ne = !n ? 'Please enter your name.' : (n.length < 2 ? 'Please enter your full name.' : '');
        AD.form.setError(nameI, ne);
        if (ne) errs.push({ id: 'rsvp-name', msg: ne });

        var a = attending();
        var ae = a ? '' : 'Please let us know whether you can attend.';
        var g = form.querySelector('#rsvp-attending-group');
        g.classList.toggle('is-invalid', !!ae);
        var aerr = g.querySelector('.field__error');
        aerr.hidden = !ae;
        aerr.innerHTML = ae ? AD.icon('alert') + '<span>' + ae + '</span>' : '';
        if (ae) errs.push({ id: 'rsvp-attending', msg: ae });

        if (a === 'yes') {
          var v = Number(guests.value);
          var ge = (!Number.isInteger(v) || v < 1) ? 'Please enter at least 1 attendee.' : (v > max ? 'Please enter no more than ' + max + ' attendees.' : '');
          AD.form.setError(guests, ge);
          if (ge) errs.push({ id: 'rsvp-guests', msg: ge });
          var picked = AD.$$('input[name="events"]:checked', form).length;
          var ee = picked ? '' : 'Please choose at least one event.';
          var evField = form.querySelector('#rsvp-events').closest('.field');
          evField.classList.toggle('is-invalid', !!ee);
          var eerr = evField.querySelector('.field__error');
          eerr.hidden = !ee;
          eerr.innerHTML = ee ? AD.icon('alert') + '<span>' + ee + '</span>' : '';
          if (ee) errs.push({ id: 'rsvp-events', msg: ee });
        } else {
          AD.form.setError(guests, '');
        }
        return errs;
      }

      function showDone(html) {
        done.innerHTML = html;
        form.hidden = true;
        done.hidden = false;
        done.focus({ preventScroll: true });
        done.scrollIntoView({ block: 'center', behavior: AD.reducedMotion() ? 'auto' : 'smooth' });
        var again = done.querySelector('[data-again]');
        if (again) again.addEventListener('click', function () {
          done.hidden = true;
          form.hidden = false;
          nameI.focus();
        });
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        tried = true;
        status.innerHTML = '';
        var errs = validate();
        AD.form.errorSummary(errors, errs);
        if (errs.length) { errors.querySelector('.status').focus(); return; }

        var a = attending();
        var payload = {
          name: nameI.value.trim(),
          attending: a,
          guests: a === 'yes' ? Number(guests.value) : 0,
          events: a === 'yes' ? AD.$$('input[name="events"]:checked', form).map(function (c) { return c.value; }) : [],
          dietary: a === 'yes' ? form.querySelector('#rsvp-diet').value.trim() : '',
          message: form.querySelector('#rsvp-message').value.trim(),
          website: form.querySelector('#rsvp-website').value
        };
        submit.classList.add('is-busy');
        submit.disabled = true;
        AD.store.submit('rsvp', payload).then(function (r) {
          submit.classList.remove('is-busy');
          submit.disabled = false;
          if (!r.ok) {
            status.innerHTML = '<div class="status status--error" role="alert">' + AD.icon('alert') +
              '<div><p><strong>Your RSVP was not sent.</strong> ' + AD.esc(r.error || '') + '</p><p>Please try again. If the problem continues, contact the family through the Contact section.</p></div></div>';
            return;
          }
          if (r.demo) {
            showDone('<div class="status status--demo">' + AD.icon('info') + '<div>' +
              '<p><strong>Preview only — this RSVP was not sent.</strong></p>' +
              '<p>RSVPs will be collected once the form is connected. Nothing has been shared with ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '.</p></div></div>' +
              '<div class="btn-row"><button class="btn btn--secondary" type="button" data-again>Back to the form</button></div>');
            return;
          }
          var who = AD.esc(payload.name);
          showDone('<div class="rsvp-thanks">' + AD.orn.divider() +
            '<p class="rsvp-thanks__title script">Thank you, ' + who + '</p>' +
            '<p>' + (a === 'yes'
              ? 'Your RSVP has been received. We look forward to celebrating with you.'
              : 'Your RSVP has been received. You will be missed — thank you for your blessings.') + '</p>' +
            '<div class="btn-row"><button class="btn btn--secondary" type="button" data-again>Update my response</button></div></div>');
        });
      });
    }
  });
})();
