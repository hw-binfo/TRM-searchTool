// auth-guard.js — loaded by every page instead of data/data.js
// Checks session auth, restores INGREDIENT_DATA and META_DATA from sessionStorage.
(function () {
  if (sessionStorage.getItem('trm_auth') !== '1') {
    // Remember where the user wanted to go so login can redirect back
    sessionStorage.setItem('trm_redirect', window.location.href);
    window.location.replace('login.html');
    return; // stop further script execution on this page
  }

  try {
    window.INGREDIENT_DATA = JSON.parse(sessionStorage.getItem('trm_ingredient_data'));
    window.META_DATA       = JSON.parse(sessionStorage.getItem('trm_meta_data'));

    if (!window.INGREDIENT_DATA || !window.META_DATA) throw new Error('missing data');
  } catch (e) {
    // Corrupted session — force re-login
    sessionStorage.clear();
    window.location.replace('login.html');
  }
})();
