/* =============================================================================
   7. DRESS CODE — black & white, with outfit photographs chosen by the couple
   (two for her, two for him) in pearl frames.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function outfits(list, label, delay) {
    var items = (list || []).filter(function (o) { return o && AD.has(o.src); });
    if (!items.length) return '';
    return '<figure class="dc-look reveal" data-delay="' + delay + '">' +
      '<div class="dc-look__photos">' + items.map(function (o, i) {
        return '<div class="pearl-frame dc-look__frame" style="--k:' + i + '"><div class="dc-look__img">' +
          '<img src="' + AD.esc(o.src) + '" alt="' + AD.esc(o.alt || '') + '" loading="lazy" decoding="async" width="720" height="900"></div></div>';
      }).join('') + '</div>' +
      '<figcaption class="dc-look__cap">' + label + '</figcaption>' +
    '</figure>';
  }

  AD.register('dress-code', {
    render: function (C) {
      var D = C.dressCode || {};
      var showProposal = D.isProposal && C.site.showProposalLabels;
      var O = D.outfits || {};
      var swatches = (D.swatches || []).map(function (s) {
        return '<li class="swatch"><span class="swatch__chip" style="--c:' + AD.esc(s.hex) + '"></span><span class="swatch__name">' + AD.esc(s.name) + '</span></li>';
      }).join('');

      return '<div class="container">' +
        AD.sectionHead({ id: 'dress-code', eyebrow: 'Attire', title: 'Dress Code' }) +
        '<div class="dc-direction reveal">' +
          (showProposal ? '<span class="proposal-tag">Proposal</span>' : '') +
          '<h3 class="dc-direction__title">' + AD.esc(D.direction) + '</h3>' +
          '<p class="dc-direction__text">' + AD.esc(D.summary) + '</p>' +
          '<ul class="swatches" aria-label="Colours">' + swatches + '</ul>' +
        '</div>' +
        '<div class="dc-looks">' + outfits(O.her, 'For her', 1) + outfits(O.him, 'For him', 2) + '</div>' +
      '</div>';
    }
  });
})();
