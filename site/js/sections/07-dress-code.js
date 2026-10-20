/* =============================================================================
   7. DRESS CODE — black & white shown as a PROPOSAL for the couple's review.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  AD.register('dress-code', {
    render: function (C) {
      var D = C.dressCode || {};
      var showProposal = D.isProposal && C.site.showProposalLabels;
      var events = C.events || [];

      var proposal = showProposal
        ? '<div class="proposal reveal">' + AD.icon('leaf') +
            '<p><strong>Proposal for the couple’s review.</strong> Black &amp; white is a suggested direction, not yet a guest requirement. Final outfit guidance is to be provided.</p></div>'
        : '';

      var swatches = (D.swatches || []).map(function (s) {
        return '<li class="swatch"><span class="swatch__chip" style="--c:' + AD.esc(s.hex) + '"></span><span class="swatch__name">' + AD.esc(s.name) + '</span></li>';
      }).join('');

      var byEvent = events.map(function (ev) {
        var g = D.byEvent ? D.byEvent[ev.id] : null;
        return '<li class="dc-event"><h4 class="dc-event__name">' + AD.esc(ev.name) + '</h4>' +
          '<p class="dc-event__text">' + (AD.has(g) ? AD.esc(g) : AD.tbp(ev.name + ' guidance')) + '</p></li>';
      }).join('');

      var refs = (D.referenceImages || []).map(function (r) {
        return '<li class="dc-ref">' + (AD.has(r.src)
          ? '<div class="pearl-frame"><div class="media-frame" style="aspect-ratio:4/5"><img src="' + AD.esc(r.src) + '" alt="' + AD.esc(r.alt) + '" loading="lazy" decoding="async"></div></div>'
          : '<div class="pearl-frame">' + AD.mediaPlaceholder(r.alt.replace('Attire reference', 'Reference image')) + '</div>') + '</li>';
      }).join('');

      return '<div class="container">' +
        AD.sectionHead({ id: 'dress-code', eyebrow: 'Attire', title: 'Dress Code' }) +
        proposal +
        '<div class="dc-hero reveal" data-delay="1">' +
          '<div class="dc-figure">' + AD.orn.attire('saree') + '<p class="dc-figure__cap">For her</p></div>' +
          '<div class="dc-direction">' +
            (showProposal ? '<span class="proposal-tag">Proposal</span>' : '') +
            '<h3 class="dc-direction__title">' + AD.esc(D.direction) + '</h3>' +
            '<p class="dc-direction__text">' + AD.esc(D.summary) + '</p>' +
            '<ul class="swatches" aria-label="Suggested colours">' + swatches + '</ul>' +
          '</div>' +
          '<div class="dc-figure">' + AD.orn.attire('suit') + '<p class="dc-figure__cap">For him</p></div>' +
        '</div>' +
        '<h3 class="dc-subtitle reveal">Guidance by event</h3>' +
        '<ul class="dc-events reveal">' + byEvent + '</ul>' +
        '<h3 class="dc-subtitle reveal">Reference images</h3>' +
        '<ul class="dc-refs reveal">' + refs + '</ul>' +
      '</div>';
    }
  });
})();
