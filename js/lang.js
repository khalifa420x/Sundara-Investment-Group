(function() {
  var LANG_KEY = 'sundara-lang';

  function applyLang(lang) {
    if (lang === 'fr') {
      document.body.classList.add('fr');
    } else {
      document.body.classList.remove('fr');
    }
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    var langEN = document.getElementById('langEN');
    var langFR = document.getElementById('langFR');
    if (langEN) langEN.style.color = lang === 'en' ? 'var(--gold)' : '';
    if (langFR) langFR.style.color = lang === 'fr' ? 'var(--gold)' : '';
  }

  function init() {
    var saved = localStorage.getItem(LANG_KEY) || 'en';
    applyLang(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.setLang = applyLang;
  window.toggleLang = function() {
    var current = localStorage.getItem(LANG_KEY) || 'en';
    applyLang(current === 'en' ? 'fr' : 'en');
  };
})();
