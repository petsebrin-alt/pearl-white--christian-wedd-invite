/* =============================================================================
   5. PARENTS AND FAMILY + family-tree overlays
   Tree: grandparents → parents → bride/groom with siblings.
   Missing relatives render as "To be provided" nodes.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function initial(name) { return AD.has(name) ? AD.esc(String(name).trim().charAt(0)) : ''; }

  function person(name, role, opts) {
    opts = opts || {};
    var known = AD.has(name);
    return '<li class="person' + (known ? '' : ' person--tbp') + (opts.focus ? ' person--focus' : '') + '">' +
      '<span class="person__avatar" aria-hidden="true">' + (known ? initial(name) : AD.icon('user')) + '</span>' +
      '<span class="person__name">' + (known ? AD.esc(name) : AD.tbp(role)) + '</span>' +
      '<span class="person__role">' + AD.esc(role) + '</span>' +
    '</li>';
  }

  function connector() {
    return '<div class="tree__connector" aria-hidden="true">' + AD.orn.branch() + '</div>';
  }

  function tree(f) {
    var gp = f.grandparents || {}, pat = gp.paternal || {}, mat = gp.maternal || {};
    var sibs = f.siblings || [];
    var childRole = f.relation === 'daughter' ? 'Bride' : 'Groom';

    return '<div class="tree">' +
      '<p class="tree__intro">' + AD.esc(f.person) + '’s family across three generations. Names marked “To be provided” will be added soon.</p>' +

      '<section class="tree__gen" aria-labelledby="' + f.key + '-gen-1">' +
        '<h3 class="tree__gen-title" id="' + f.key + '-gen-1">Grandparents</h3>' +
        '<div class="tree__row">' +
          '<div class="tree__couple"><p class="tree__side">Paternal · ' + AD.esc(f.father) + '’s parents</p><ul class="tree__people">' +
            person(pat.grandfather, 'Grandfather') + person(pat.grandmother, 'Grandmother') + '</ul></div>' +
          '<div class="tree__couple"><p class="tree__side">Maternal · ' + AD.esc(f.mother) + '’s parents</p><ul class="tree__people">' +
            person(mat.grandfather, 'Grandfather') + person(mat.grandmother, 'Grandmother') + '</ul></div>' +
        '</div>' +
      '</section>' +
      connector() +
      '<section class="tree__gen" aria-labelledby="' + f.key + '-gen-2">' +
        '<h3 class="tree__gen-title" id="' + f.key + '-gen-2">Parents</h3>' +
        '<div class="tree__row"><div class="tree__couple tree__couple--main"><ul class="tree__people">' +
          person(f.father, 'Father') + person(f.mother, 'Mother') + '</ul></div></div>' +
      '</section>' +
      connector() +
      '<section class="tree__gen" aria-labelledby="' + f.key + '-gen-3">' +
        '<h3 class="tree__gen-title" id="' + f.key + '-gen-3">' + AD.esc(f.person) + ' &amp; siblings</h3>' +
        '<div class="tree__row"><ul class="tree__people tree__people--children">' +
          person(f.person, childRole, { focus: true }) +
          (sibs.length
            ? sibs.map(function (s) { return person(s.name, s.relation || 'Sibling'); }).join('')
            : person(null, 'Siblings')) +
        '</ul></div>' +
      '</section>' +
    '</div>';
  }

  function card(f, side, delay) {
    var photo = AD.has(f.photo)
      ? '<div class="pearl-frame"><div class="media-frame" style="aspect-ratio:4/5"><img src="' + AD.esc(f.photo) + '" alt="' + AD.esc(f.photoAlt) + '" loading="lazy" decoding="async" width="1200" height="1500"></div></div>'
      : '<div class="pearl-frame">' + AD.mediaPlaceholder('Family photograph') + '</div>';
    return '<article class="family-card reveal" data-delay="' + delay + '">' +
      photo +
      '<div class="family-card__body">' +
        '<p class="eyebrow">' + AD.esc(f.heading) + '</p>' +
        '<p class="family-line">' +
          '<span class="family-line__person script">' + AD.esc(f.person) + '</span>' +
          '<span class="family-line__rel"><span class="sr-only">, </span>' + AD.esc(f.relation) + ' of </span>' +
          '<span class="family-line__parents">' + AD.esc(f.father) + ' <span class="amp">and</span> ' + AD.esc(f.mother) + '</span><span class="sr-only">.</span>' +
        '</p>' +
        '<button class="btn btn--secondary" type="button" data-tree="' + side + '" aria-haspopup="dialog">' + AD.icon('tree') + 'View Our Family Tree</button>' +
      '</div>' +
    '</article>';
  }

  AD.register('family', {
    render: function (C) {
      var F = C.families;
      return '<div class="container">' +
        AD.sectionHead({
          id: 'family', eyebrow: 'Parents & Family', title: 'Our Families',
          intro: 'With grateful hearts we honour the families who raised us in faith and love.'
        }) +
        '<div class="family-grid">' + card(F.bride, 'bride', 1) + card(F.groom, 'groom', 2) + '</div>' +
      '</div>';
    },
    init: function (el, C) {
      var dialogs = {};
      ['bride', 'groom'].forEach(function (side) {
        var f = Object.assign({ key: 'tree-' + side }, C.families[side]);
        var d = AD.dialog.create({
          id: 'tree-' + side,
          title: AD.esc(f.heading) + ' Tree',
          size: 'md',
          className: 'dlg--tree',
          body: tree(f)
        });
        d.addEventListener('dlg:open', function () {
          d.classList.remove('tree-play');
          void d.offsetWidth; // restart the floral reveal each time
          d.classList.add('tree-play');
        });
        dialogs[side] = d;
      });
      AD.$$('[data-tree]', el).forEach(function (b) {
        b.addEventListener('click', function () { AD.dialog.open(dialogs[b.getAttribute('data-tree')], b); });
      });
    }
  });
})();
