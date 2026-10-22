(() => {
  const links = [
    { label: 'AO UNIVERSE', href: '/', className: 'ao-nav-brand' },
    { label: 'PLAY GAMES', href: '/games/' },
    { label: 'BEAT LAB', href: '/beatlab/' },
    { label: 'BUILD AO', href: '/build-ao-with-us/' },
    { label: 'ANOM ORIGINALS', href: 'https://anomoriginals.lol/' }
  ];

  const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
  const nav = document.createElement('nav');
  nav.className = 'ao-global-nav';
  nav.setAttribute('aria-label', 'AO Universe navigation');

  const brand = document.createElement('a');
  brand.className = 'ao-global-nav__brand';
  brand.href = links[0].href;
  brand.innerHTML = '<span class="ao-global-nav__mark" aria-hidden="true">A<span>O</span></span><span>AO UNIVERSE</span>';
  nav.appendChild(brand);

  const linkGroup = document.createElement('div');
  linkGroup.className = 'ao-global-nav__links';
  links.slice(1).forEach((item) => {
    const anchor = document.createElement('a');
    anchor.className = 'ao-global-nav__link' + (item.label === 'BUILD AO' ? ' ao-global-nav__link--campaign' : '');
    anchor.href = item.href;
    anchor.textContent = item.label;
    const itemPath = item.href.startsWith('/') ? item.href.replace(/\/$/, '') || '/' : '';
    if (itemPath && itemPath === currentPath) {
      anchor.setAttribute('aria-current', 'page');
    }
    if (!item.href.startsWith('/')) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }
    linkGroup.appendChild(anchor);
  });
  nav.appendChild(linkGroup);

  const style = document.createElement('style');
  style.textContent = `
    .ao-global-nav {
      position: fixed;
      top: 14px;
      left: 50%;
      z-index: 2147483000;
      transform: translateX(-50%);
      width: min(94%, 1180px);
      min-height: 52px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 7px 9px 7px 13px;
      border: 1px solid rgba(0, 234, 255, .28);
      border-radius: 999px;
      background: rgba(0, 0, 0, .9);
      box-shadow: 0 0 24px rgba(0, 234, 255, .12), 0 12px 34px rgba(0, 0, 0, .5);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      font-family: Inter, system-ui, sans-serif;
    }
    .ao-global-nav a { box-sizing: border-box; text-decoration: none; white-space: nowrap; }
    .ao-global-nav__brand { display: inline-flex; align-items: center; gap: 9px; color: #8af0ff; font: 800 12px/1 "Space Mono", ui-monospace, monospace; letter-spacing: .12em; }
    .ao-global-nav__mark { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid #00eaff; border-radius: 50%; color: #00eaff; box-shadow: 0 0 18px rgba(0, 234, 255, .3); font-size: 11px; }
    .ao-global-nav__mark span { color: #ff4bd8; }
    .ao-global-nav__links { display: flex; align-items: center; justify-content: flex-end; gap: 5px; flex-wrap: wrap; }
    .ao-global-nav__link { min-height: 36px; display: inline-flex; align-items: center; padding: 8px 10px; border: 1px solid rgba(0, 234, 255, .25); border-radius: 999px; color: #65b9c6; font: 700 10px/1 "JetBrains Mono", ui-monospace, monospace; letter-spacing: .08em; }
    .ao-global-nav__link:hover, .ao-global-nav__link:focus-visible, .ao-global-nav__link[aria-current="page"] { color: #000; background: #00eaff; border-color: #00eaff; outline: none; }
    .ao-global-nav__link--campaign { color: #8af0ff; border-color: rgba(0, 234, 255, .62); box-shadow: 0 0 12px rgba(0, 234, 255, .12); }
    @media (max-width: 760px) {
      .ao-global-nav { align-items: stretch; flex-direction: column; border-radius: 20px; padding: 9px; }
      .ao-global-nav__links { width: 100%; justify-content: stretch; }
      .ao-global-nav__link { flex: 1 1 auto; justify-content: center; font-size: 9px; }
    }
    @media (max-width: 480px) {
      .ao-global-nav__brand { justify-content: center; }
      .ao-global-nav__links { display: grid; grid-template-columns: repeat(2, 1fr); }
      .ao-global-nav__link { min-width: 0; }
      .ao-global-nav__link:last-child { grid-column: 1 / -1; }
    }
    @media (max-width: 560px) {
      .orbit-system-container { max-width: 100%; overflow: hidden; }
      .celestial-world-portal { width: 210px; height: 210px; padding: 14px; }
      .house-2 { right: 10px; }
      .house-3 { right: 15px; }
      .house-5, .house-6 { left: 10px; }
    }
    @media (prefers-reduced-motion: reduce) { .ao-global-nav *, .ao-global-nav *::before, .ao-global-nav *::after { transition: none !important; animation: none !important; } }
  `;

  document.head.appendChild(style);
  document.body.prepend(nav);
})();
