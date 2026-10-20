/* =============================================================================
   3. SAVE THE DATE — 27 January 2027 is the focal point.
   Calendar: all-day entry until the ceremony time + timezone are confirmed.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function ceremonyCalendar(C) {
    var cer = AD.event('ceremony') || {};
    var venue = AD.venue(cer.venueId);
    var timed = AD.has(cer.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
    var desc = 'Together with their families, ' + C.couple.bride + ' & ' + C.couple.groom + ' invite you to celebrate their marriage.';
    if (!timed) desc += '\nCeremony time and venue to be announced.';
    else if (!AD.venueHasLocation(venue)) desc += '\nVenue to be announced.';
    return AD.calendar.build({
      uid: 'save-the-date',
      title: (timed ? '' : 'Save the Date — ') + C.couple.bride + ' & ' + C.couple.groom + "'s Wedding",
      description: desc,
      date: AD.weddingDate(),
      startTime: cer.startTime,
      endTime: cer.endTime,
      location: AD.venueLine(venue)
    });
  }

  AD.register('save-the-date', {
    render: function (C) {
      var date = AD.weddingDate();
      if (!AD.has(date)) {
        return '<div class="container">' + AD.sectionHead({ id: 'save-the-date', eyebrow: 'Save the Date', title: 'Save the Date' }) +
          '<p class="std-pending">' + AD.tbp('Wedding date') + '</p></div>';
      }
      var p = AD.dateParts(date);
      var cer = AD.event('ceremony') || {};
      var timed = AD.has(cer.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
      return '<div class="container std">' +
        '<p class="eyebrow reveal">Save the Date</p>' +
        '<h2 class="sr-only" id="save-the-date-title">Save the Date: ' + AD.esc(AD.formatDate(date)) + '</h2>' +
        '<div class="std-ring reveal" data-delay="1" aria-hidden="true">' +
          AD.orn.pearlRing() +
          '<div class="std-ring__date">' +
            '<span class="std-ring__weekday">' + p.weekday + '</span>' +
            '<span class="std-ring__day numerals">' + p.day + '</span>' +
            '<span class="std-ring__month script">' + p.month + '</span>' +
            '<span class="std-ring__year numerals">' + p.year + '</span>' +
          '</div>' +
        '</div>' +
        '<p class="std-line reveal" data-delay="2">The wedding of <span class="script">' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '</span></p>' +
        '<p class="std-note reveal" data-delay="2">' +
          (timed
            ? AD.esc(AD.formatTimeRange(cer.startTime, cer.endTime))
            : 'Ceremony time ' + AD.tbp('Ceremony time')) +
        '</p>' +
        '<div class="btn-row reveal" data-delay="3"><button class="btn btn--primary" type="button" data-std-cal>' + AD.icon('calendar') + 'Add to Calendar</button></div>' +
      '</div>';
    },
    init: function (el, C) {
      var b = el.querySelector('[data-std-cal]');
      if (!b) return;
      b.addEventListener('click', function () {
        var ev = ceremonyCalendar(C);
        if (ev) AD.calendar.open(ev, b);
      });
    }
  });
})();
