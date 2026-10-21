/**
 * Angel & David — RSVP + Wishing Wall backend (Google Sheets + Apps Script)
 * -------------------------------------------------------------------------
 * Optional. Connects the website's RSVP form and wishing wall to a Google
 * Sheet. Setup steps are in README.md ("Connect RSVP and wishes").
 *
 * Endpoints (deployed as a Web App):
 *   POST {type:"rsvp", ...}  → appends to the "RSVPs" sheet
 *   POST {type:"wish", ...}  → appends to the "Wishes" sheet (Approved = FALSE)
 *   GET  ?action=wishes      → returns only approved wishes
 *
 * The website shows success only when this script answers { ok: true }.
 */

// Email address that receives a note for every RSVP. Leave '' for none.
var NOTIFY_EMAIL = '';
// true = wishes appear on the site only after the Approved box is ticked.
var REQUIRE_APPROVAL = true;

var RSVP_SHEET = 'RSVPs';
var WISH_SHEET = 'Wishes';
var RSVP_HEADERS = ['Submitted at', 'Name', 'Attending', 'Guests', 'Events', 'Dietary', 'Message'];
var WISH_HEADERS = ['Submitted at', 'Name', 'Message', 'Approved', 'Relation', 'Photo'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var data = JSON.parse(e.postData.contents || '{}');

    // Honeypot: bots fill the hidden "website" field. Nothing is saved.
    if (data.website) return json_({ ok: false, error: 'Rejected.' });

    if (data.type === 'rsvp') return json_(saveRsvp_(data));
    if (data.type === 'wish') return json_(saveWish_(data));
    return json_({ ok: false, error: 'Unknown request type.' });
  } catch (err) {
    return json_({ ok: false, error: 'Server error: ' + err });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'wishes') {
    return json_({ ok: true, wishes: approvedWishes_() });
  }
  return json_({ ok: true });
}

function saveRsvp_(d) {
  var name = clean_(d.name, 80);
  var attending = d.attending === 'yes' ? 'yes' : (d.attending === 'no' ? 'no' : '');
  if (!name || !attending) return { ok: false, error: 'Name and attendance are required.' };
  var guests = attending === 'yes' ? Math.max(1, Math.min(50, parseInt(d.guests, 10) || 1)) : 0;
  var events = Array.isArray(d.events) ? d.events.map(function (x) { return clean_(x, 40); }).join(', ') : '';

  sheet_(RSVP_SHEET, RSVP_HEADERS).appendRow([
    new Date(), name, attending, guests, events, clean_(d.dietary, 200), clean_(d.message, 500)
  ]);

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New RSVP: ' + name + ' (' + attending + ')',
      'Name: ' + name + '\nAttending: ' + attending + '\nGuests: ' + guests +
      '\nEvents: ' + events + '\nDietary: ' + clean_(d.dietary, 200) + '\nMessage: ' + clean_(d.message, 500));
  }
  return { ok: true };
}

function saveWish_(d) {
  var name = clean_(d.name, 60);
  var message = clean_(d.message, 500);
  if (!name || !message) return { ok: false, error: 'Name and wish are required.' };
  var relation = clean_(d.relation, 60);
  // Optional small black-and-white photo (a JPEG data URL made by the site, ≤ 45 KB).
  var photo = String(d.photo || '');
  if (!/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(photo) || photo.length > 45000) photo = '';
  var sh = sheet_(WISH_SHEET, WISH_HEADERS);
  sh.appendRow([new Date(), name, message, !REQUIRE_APPROVAL, relation, photo]);
  sh.getRange(sh.getLastRow(), 4).insertCheckboxes();
  if (!REQUIRE_APPROVAL) sh.getRange(sh.getLastRow(), 4).check();
  return { ok: true, pending: REQUIRE_APPROVAL };
}

function approvedWishes_() {
  var sh = sheet_(WISH_SHEET, WISH_HEADERS);
  var rows = sh.getDataRange().getValues().slice(1);
  return rows
    .filter(function (r) { return r[3] === true; })
    .map(function (r) {
      return { submittedAt: new Date(r[0]).toISOString(), name: String(r[1]), message: String(r[2]), relation: String(r[4] || ''), photo: /^data:image\/jpeg;base64,/.test(String(r[5] || '')) ? String(r[5]) : '' };
    })
    .reverse(); // newest first
}

function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

// Trim, limit length, and neutralise spreadsheet formulas.
function clean_(v, max) {
  var s = String(v == null ? '' : v).trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
