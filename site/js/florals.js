/* =============================================================================
   PEARL FLOWERS — the couple's pearl-and-satin flower (THEME.md R2d), cut into
   five pieces with a soft shadow baked in, so pages need no CSS filters:
     bloom  the large open flower with its pearl centre
     bud    the smaller flower
     spray  the whole corner piece (flowers, leaves, pearl drops)
     drops  the hanging stem of pearl drops
     sprig  three pearl buds on a fine stem
   Used by the opening's flower columns, the section corners and the parking
   spot at the end of the page.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var V = '?v=20261022f';
  var PIECES = {
    bloom: [463, 509],
    bud: [210, 232],
    spray: [640, 890],
    drops: [164, 482],
    sprig: [256, 151]
  };

  AD.florals = {
    src: function (type) { return 'assets/images/pearl-' + type + '.webp' + V; },
    // An <img> for one piece. `cls` and `style` are trusted strings from our own layout tables.
    img: function (type, cls, style) {
      var s = PIECES[type] || PIECES.bloom;
      return '<img class="pf pf--' + type + (cls ? ' ' + cls : '') + '" src="' + AD.florals.src(type) + '" alt="" ' +
        'width="' + s[0] + '" height="' + s[1] + '" decoding="async" draggable="false"' + (style ? ' style="' + style + '"' : '') + '>';
    }
  };
})();
