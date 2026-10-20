/* =============================================================================
   6. WEDDING EVENTS — pearl-strand timeline
   Missing details show placeholders. "View Location" links to the venue card
   (section 9) once that venue has an address; "Add to Calendar" needs a date
   (all-day until time + timezone are confirmed).
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function fact(icon, label, value) {
    return '<div class="event-fact"><dt>' + AD.icon(icon) + '<span>' + label + '</span></dt><dd>' + value + '</dd></div>';
  }

  function eventCard(ev, i, C) {
    var venue = AD.venue(ev.venueId);
    var hasLoc = AD.venueHasLocation(venue);
    var venueText = venue && (AD.has(venue.name) || AD.has(venue.address))
      ? [venue.name, venue.address].filter(AD.has).map(AD.esc).join('<br>')
      : AD.tbp('Venue');

    var locBtn = hasLoc
      ? '<a class="btn btn--secondary" href="#venue-' + AD.esc(venue.id) + '">' + AD.icon('pin') + 'View Location</a>'
      : '<button class="btn btn--secondary" type="button" aria-disabled="true" title="Location to be announced">' + AD.icon('pin') + 'Location to be announced</button>';
    var calBtn = AD.has(ev.date)
      ? '<button class="btn btn--primary" type="button" data-cal="' + AD.esc(ev.id) + '">' + AD.icon('calendar') + 'Add to Calendar</button>'
      : '<button class="btn btn--primary" type="button" aria-disabled="true">' + AD.icon('calendar') + 'Date to be announced</button>';

    return '<li class="event' + (ev.featured ? ' event--featured' : '') + ' reveal" id="event-' + AD.esc(ev.id) + '">' +
      '<span class="event__station" aria-hidden="true"><span class="pearl"></span></span>' +
      '<div class="event__art" aria-hidden="true">' + AD.orn.illustration(ev.illustration) + '</div>' +
      '<article class="event-card paper" aria-labelledby="event-' + AD.esc(ev.id) + '-title">' +
        '<p class="eyebrow"><span class="event-card__num numerals">' + String(i + 1).padStart(2, '0') + '</span> ' + AD.esc(ev.kicker) + '</p>' +
        '<h3 class="event-card__title" id="event-' + AD.esc(ev.id) + '-title">' + AD.esc(ev.name) + '</h3>' +
        '<p class="event-card__desc">' + AD.esc(ev.description) + '</p>' +
        '<dl class="event-facts">' +
          fact('calendar', 'Date', AD.has(ev.date) ? AD.esc(AD.formatDate(ev.date)) : AD.tbp('Date')) +
          fact('clock', 'Time', AD.has(ev.startTime) ? AD.esc(AD.formatTimeRange(ev.startTime, ev.endTime)) : AD.tbp('Time')) +
          fact('pin', 'Venue', venueText) +
        '</dl>' +
        '<div class="event-card__actions">' + locBtn + calBtn + '</div>' +
      '</article>' +
    '</li>';
  }

  AD.register('events', {
    render: function (C) {
      return '<div class="container">' +
        AD.sectionHead({
          id: 'events', eyebrow: 'Celebrations', title: 'Wedding Events',
          intro: 'Five gatherings, one joyful journey. Details marked “To be provided” will be added as soon as they are confirmed.'
        }) +
        '<ol class="timeline">' + (C.events || []).map(function (ev, i) { return eventCard(ev, i, C); }).join('') + '</ol>' +
      '</div>';
    },
    init: function (el, C) {
      AD.$$('[data-cal]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          var ev = AD.event(b.getAttribute('data-cal'));
          var venue = AD.venue(ev.venueId);
          var timed = AD.has(ev.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
          var desc = ev.description + (timed ? '' : '\nTime to be announced.') + (AD.venueHasLocation(venue) ? '' : '\nVenue to be announced.');
          var cal = AD.calendar.build({
            uid: 'event-' + ev.id,
            title: ev.name + ' — ' + C.couple.bride + ' & ' + C.couple.groom,
            description: desc,
            date: ev.date, startTime: ev.startTime, endTime: ev.endTime,
            location: AD.venueLine(venue)
          });
          if (cal) AD.calendar.open(cal, b);
        });
      });
      AD.$$('[aria-disabled="true"]', el).forEach(function (b) {
        b.addEventListener('click', function (e) { e.preventDefault(); AD.announce(b.textContent.trim() + '.'); });
      });
    }
  });
})();
