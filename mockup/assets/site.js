(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      setDropdown(false);
    }
  });

  // Services dropdown: hover on desktop, click/tap everywhere, Esc and outside click close it
  var dd = document.getElementById('ddServices');
  var ddBtn = dd.querySelector('.dd-toggle');
  var hoverable = window.matchMedia('(hover: hover) and (min-width: 1021px)');
  var closeTimer;
  function setDropdown(open) {
    dd.classList.toggle('open', open);
    ddBtn.setAttribute('aria-expanded', String(open));
  }
  ddBtn.addEventListener('click', function () {
    // With a mouse the menu is already open on hover, so a click keeps it open
    setDropdown(hoverable.matches ? true : !dd.classList.contains('open'));
  });
  dd.addEventListener('mouseenter', function () {
    if (!hoverable.matches) return;
    clearTimeout(closeTimer);
    setDropdown(true);
  });
  dd.addEventListener('mouseleave', function () {
    if (!hoverable.matches) return;
    closeTimer = setTimeout(function () { setDropdown(false); }, 150);
  });
  document.addEventListener('click', function (e) {
    if (!dd.contains(e.target)) setDropdown(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dd.classList.contains('open')) {
      setDropdown(false);
      ddBtn.focus();
    }
  });
  var form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('formMsg').hidden = false;
    });
  }
})();
