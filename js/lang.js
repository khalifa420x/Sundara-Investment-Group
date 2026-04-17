(function() {
  var LANG_KEY = 'sundara-lang';
  var HERO_TITLE = {
    en: 'Luxury villas in Bali.',
    fr: 'Villas de luxe à Bali.'
  };
  var HERO_DESCRIPTION = {
    en: 'Designed for investment and rental income.',
    fr: 'Conçues pour l’investissement et la location.'
  };

  function syncHeroCopy() {
    var heroTitle = document.querySelector('.hero-title');
    var heroDescription = document.querySelector('.hero-description');

    if (heroTitle) {
      var heroEN = heroTitle.querySelector('.lang-en-inline');
      var heroFR = heroTitle.querySelector('.lang-fr-inline');

      if (heroEN) heroEN.textContent = HERO_TITLE.en;
      if (heroFR) heroFR.textContent = HERO_TITLE.fr;
    }

    if (heroDescription) {
      var descriptionEN = heroDescription.querySelector('.lang-en-inline');
      var descriptionFR = heroDescription.querySelector('.lang-fr-inline');

      if (descriptionEN) descriptionEN.textContent = HERO_DESCRIPTION.en;
      if (descriptionFR) descriptionFR.textContent = HERO_DESCRIPTION.fr;
    }
  }

  function applyLang(lang) {
    syncHeroCopy();
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
    syncHeroCopy();
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
