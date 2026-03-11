// auth-guard.js — loaded by every page instead of data/data.js
// Checks session auth, restores INGREDIENT_DATA and META_DATA from sessionStorage.
(function () {
  var auth = sessionStorage.getItem('trm_auth');
  var pw   = sessionStorage.getItem('trm_pw');
  var ing  = sessionStorage.getItem('trm_ingredient_data');
  var meta = sessionStorage.getItem('trm_meta_data');

  // All four keys must be present — if any are missing (e.g. from an old session
  // before trm_pw was introduced), clear everything and force a fresh login.
  if (auth !== '1' || !pw || !ing || !meta) {
    sessionStorage.clear();
    sessionStorage.setItem('trm_redirect', window.location.href);
    window.location.replace('login.html');
    return;
  }

  try {
    window.INGREDIENT_DATA = JSON.parse(ing);
    window.META_DATA       = JSON.parse(meta);
    if (!window.INGREDIENT_DATA || !window.META_DATA) throw new Error('missing data');
  } catch (e) {
    sessionStorage.clear();
    window.location.replace('login.html');
  }
})();
