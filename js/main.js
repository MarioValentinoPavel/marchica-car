/* Marchica Car · intro con mando y faros, flota filtrable (Flip), mapa + configurador de reserva, opiniones */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger, Flip);

  const PHONE = '212661381639';
  const CARS = [
    { id: 'hyundai-i10', name: 'Hyundai i10', year: '', cat: 'city', price: 50 },
    { id: 'clio-5', name: 'Renault Clio 5', year: '', cat: 'city', price: 55 },
    { id: 'hyundai-i20', name: 'Hyundai i20', year: '', cat: 'city', price: 65 },
    { id: 'seat-ibiza', name: 'Seat Ibiza', year: '', cat: 'city', price: 70 },
    { id: 'megane', name: 'Renault Mégane', year: '', cat: 'city', price: 75 },
    { id: 'hyundai-tucson', name: 'Hyundai Tucson', year: '', cat: 'suv', price: 80 },
    { id: 'hyundai-kona-2024', name: 'Hyundai Kona', year: '2024', cat: 'suv', price: 150 },
    { id: 'hyundai-santafe-2025', name: 'Hyundai Santa Fe', year: '2025', cat: 'suv', price: 200 },
    { id: 'touareg-2024', name: 'Volkswagen Touareg', year: '2024', cat: 'suv', price: 200 },
    { id: 'touareg-v6-r-line', name: 'Volkswagen Touareg V6 R-Line', year: '', cat: 'suv', price: 200 },
    { id: 'cupra-formentor-vz-2025', name: 'Cupra Formentor VZ', year: '2025', cat: 'suv', price: 250 },
    { id: 'golf-8-gtd', name: 'Volkswagen Golf 8 GTD', year: '', cat: 'premium', price: 150 },
    { id: 'mercedes-class-a-facelift', name: 'Mercedes Classe A', year: 'Facelift', cat: 'premium', price: 150 },
    { id: 'audi-a3', name: 'Audi A3', year: '', cat: 'premium', price: 180 },
    { id: 'mercedes-class-c', name: 'Mercedes Classe C', year: '', cat: 'premium', price: 200 },
    { id: 'mercedes-c220-2024', name: 'Mercedes C220', year: '2024', cat: 'premium', price: 250 },
    { id: 'mercedes-c220-2025', name: 'Mercedes C220', year: '2025', cat: 'premium', price: 250 },
    { id: 'porsche-macan-2024', name: 'Porsche Macan', year: '2024', cat: 'prestige', price: 250 },
    { id: 'audi-q8', name: 'Audi Q8', year: '', cat: 'prestige', price: 350 },
    { id: 'range-rover-sport-2025', name: 'Range Rover Sport', year: '2025', cat: 'prestige', price: 400 },
    { id: 'porsche-cayenne-coupe-2024', name: 'Porsche Cayenne Coupé', year: '2024', cat: 'prestige', price: 600 },
    { id: 'mercedes-g-class', name: 'Mercedes Classe G', year: '', cat: 'prestige', price: 1000 }
  ];
  const PLACES = [
    { id: 'nador-apt', city: 'Nador', kind: 'apt', lon: -3.03, lat: 34.99 },
    { id: 'alhoceima', city: 'Al Hoceima', kind: 'ctr', lon: -3.93, lat: 35.25 },
    { id: 'oujda-apt', city: 'Oujda', kind: 'apt', lon: -1.92, lat: 34.79 },
    { id: 'tanger-apt', city: 'Tanger', kind: 'apt', lon: -5.92, lat: 35.73 },
    { id: 'tanger-ctr', city: 'Tanger', kind: 'ctr', lon: -5.81, lat: 35.77 },
    { id: 'fes-apt', city: 'Fès', kind: 'apt', lon: -4.98, lat: 33.93 },
    { id: 'fes-ctr', city: 'Fès', kind: 'ctr', lon: -5.0, lat: 34.03 },
    { id: 'rabat-apt', city: 'Rabat', kind: 'apt', lon: -6.75, lat: 34.05 },
    { id: 'casa-apt', city: 'Casablanca', kind: 'apt', lon: -7.59, lat: 33.37 },
    { id: 'casa-ctr', city: 'Casablanca', kind: 'ctr', lon: -7.62, lat: 33.59 },
    { id: 'marrakech-apt', city: 'Marrakech', kind: 'apt', lon: -8.04, lat: 31.61 },
    { id: 'marrakech-ctr', city: 'Marrakech', kind: 'ctr', lon: -7.99, lat: 31.63 },
    { id: 'essaouira-apt', city: 'Essaouira', kind: 'apt', lon: -9.68, lat: 31.4 },
    { id: 'agadir-apt', city: 'Agadir', kind: 'apt', lon: -9.41, lat: 30.33 },
    { id: 'ouarzazate-apt', city: 'Ouarzazate', kind: 'apt', lon: -6.91, lat: 30.94 }
  ];
  // Costa atlántica y mediterránea (lon, lat); sin fronteras terrestres
  const COAST = [[-2.21, 35.09], [-2.42, 35.15], [-2.75, 35.12], [-2.9, 35.16], [-2.93, 35.28], [-2.97, 35.44], [-3.05, 35.35], [-3.35, 35.2], [-3.93, 35.24], [-4.3, 35.17], [-4.67, 35.21], [-5.1, 35.45], [-5.29, 35.62], [-5.31, 35.89], [-5.45, 35.92], [-5.8, 35.79], [-5.93, 35.78], [-6.03, 35.47], [-6.16, 35.19], [-6.35, 34.85], [-6.6, 34.4], [-6.68, 34.26], [-6.84, 34.03], [-7.1, 33.85], [-7.39, 33.7], [-7.62, 33.61], [-8.0, 33.45], [-8.5, 33.25], [-8.75, 33.0], [-9.03, 32.6], [-9.25, 32.3], [-9.4, 32.0], [-9.77, 31.51], [-9.82, 31.1], [-9.89, 30.64], [-9.62, 30.42], [-9.65, 30.1], [-9.8, 29.6]];

  /* ---------- idioma ---------- */
  const DOM = window.I18N.dom, JS = window.I18N.js;
  let LANG = 'fr';
  const t = (k) => (JS[LANG] && JS[LANG][k] !== undefined ? JS[LANG][k] : JS.fr[k]);
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  function pickInitialLang() {
    const q = new URLSearchParams(location.search).get('lang');
    const saved = store.get('mc-lang');
    const nav = (navigator.language || 'fr').slice(0, 2);
    return [q, saved, nav].find((l) => ['fr', 'es', 'en', 'nl'].includes(l)) || 'fr';
  }
  function applyLang(l) {
    LANG = l;
    document.documentElement.lang = l;
    $$('[data-i18n]').forEach((el) => {
      if (el.dataset.fr === undefined) el.dataset.fr = el.innerHTML;
      const v = l === 'fr' ? el.dataset.fr : DOM[l] && DOM[l][el.dataset.i18n];
      el.innerHTML = v || el.dataset.fr;
    });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    store.set('mc-lang', l);
    $('#sea1').textContent = t('sea1');
    $('#sea2').textContent = t('sea2');
    renderCarLabels();
    fillSelects();
    updateSummary();
    showQuote(qi, false);
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  /* ---------- intro ---------- */
  const intro = $('#intro');
  function heroIn() {
    if (!hasGsap || REDUCE) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero__title .ln > span', { yPercent: 105, duration: 1.1, stagger: 0.08 })
      .from('.hero__sub, .hero__cta', { y: 18, opacity: 0, duration: 0.9, stagger: 0.08 }, '-=0.8')
      .from('.hero__img', { scale: 1.08, filter: 'saturate(.3) contrast(1.1) brightness(.35)', duration: 1.8, ease: 'power3.out' }, 0)
      .to('.hero__sweep', { xPercent: 560, duration: 1.4, ease: 'power2.inOut' }, 0.3);
  }
  function endIntro() {
    document.body.classList.remove('is-locked');
    intro.remove();
    heroIn();
  }
  function chirp() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ac = new AC();
      [0, 0.16].forEach((d) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = 'square'; o.frequency.value = 2400;
        g.gain.setValueAtTime(0.0001, ac.currentTime + d);
        g.gain.exponentialRampToValueAtTime(0.05, ac.currentTime + d + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + d + 0.09);
        o.connect(g).connect(ac.destination); o.start(ac.currentTime + d); o.stop(ac.currentTime + d + 0.1);
      });
    } catch (e) { }
  }
  let unlocked = false;
  function unlock(withSound) {
    if (unlocked) return; unlocked = true;
    if (withSound) chirp();
    $('#fob').classList.add('is-on');
    const tl = gsap.timeline({ onComplete: endIntro });
    tl.to('.intro__hazard', { opacity: 1, duration: 0.12, ease: 'none' })
      .to('.intro__hazard', { opacity: 0, duration: 0.2, ease: 'power2.out' })
      .to('.intro__hazard', { opacity: 1, duration: 0.12, ease: 'none' }, '+=0.06')
      .to('.intro__hazard', { opacity: 0, duration: 0.25, ease: 'power2.out' })
      .to('.fob, .intro__hint', { opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' }, '-=0.1')
      .to('.intro__beam', { opacity: 1, scale: 1.7, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, '-=0.15')
      .to(intro, { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');
  }
  let seen = false;
  try { seen = sessionStorage.getItem('mc-intro') === '1'; sessionStorage.setItem('mc-intro', '1'); } catch (e) { }
  if (!hasGsap || REDUCE || seen) {
    intro.remove();
  } else {
    document.body.classList.add('is-locked');
    gsap.from('.fob', { y: 30, opacity: 0, scale: 0.94, duration: 0.8, ease: 'expo.out' });
    gsap.from('.intro__hint', { opacity: 0, duration: 0.6, delay: 0.4 });
    intro.addEventListener('click', () => unlock(true));
    addEventListener('keydown', () => unlock(false), { once: true });
    setTimeout(() => unlock(false), 2600);
  }

  /* ---------- flota ---------- */
  const grid = $('#grid');
  const fmt = (n) => new Intl.NumberFormat(t('locale')).format(n);
  grid.innerHTML = CARS.map((c, i) => `
    <li class="car" data-cat="${c.cat}" data-id="${c.id}" data-order="${i}">
      <figure class="car__media"><img src="assets/img/${c.id}.jpg" alt="${c.name} ${c.year}" loading="lazy" width="1200" height="1021"></figure>
      <div class="car__info">
        <h3 class="car__name">${c.name}</h3>
        <p class="car__year">${c.year || '&nbsp;'}</p>
        <p class="car__price">${c.price}&nbsp;€<small class="js-perday"></small></p>
        <button class="car__pick" type="button"></button>
      </div>
    </li>`).join('');
  const cards = $$('.car', grid);
  let picked = null;
  function renderCarLabels() {
    $$('.js-perday').forEach((s) => (s.textContent = t('perDay')));
    cards.forEach((c) => ($('.car__pick', c).textContent = c.dataset.id === picked ? t('chosen') : t('choose')));
  }

  let cat = 'all', sorted = false;
  function layoutFleet() {
    const state = hasGsap ? Flip.getState(cards) : null;
    const order = [...cards].sort((a, b) => sorted
      ? CARS[a.dataset.order].price - CARS[b.dataset.order].price || a.dataset.order - b.dataset.order
      : a.dataset.order - b.dataset.order);
    order.forEach((c) => grid.appendChild(c));
    cards.forEach((c) => (c.style.display = cat === 'all' || c.dataset.cat === cat ? '' : 'none'));
    if (state && !REDUCE) {
      Flip.from(state, {
        duration: 0.6, ease: 'power3.inOut', absolute: true, scale: false,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'expo.out' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' }),
        onComplete: () => ScrollTrigger.refresh()
      });
    }
  }
  $$('.tabs button').forEach((b) => b.addEventListener('click', () => {
    cat = b.dataset.cat;
    $$('.tabs button').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    layoutFleet();
  }));
  $('#sort').addEventListener('click', (e) => {
    sorted = !sorted;
    e.currentTarget.setAttribute('aria-pressed', String(sorted));
    layoutFleet();
  });
  // foco de luz que sigue al puntero sobre la foto
  grid.addEventListener('pointermove', (e) => {
    const m = e.target.closest('.car__media');
    if (!m) return;
    const r = m.getBoundingClientRect();
    m.style.setProperty('--x', `${e.clientX - r.left}px`);
    m.style.setProperty('--y', `${e.clientY - r.top}px`);
  });
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('.car__pick');
    if (!b) return;
    setCar(b.closest('.car').dataset.id, true);
  });
  function setCar(id, scroll) {
    picked = id;
    cards.forEach((c) => c.classList.toggle('is-picked', c.dataset.id === id));
    $('#carSel').value = id;
    renderCarLabels();
    updateSummary();
    if (scroll) $('#reserver').scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- mapa ---------- */
  const LON0 = -10.4, LAT1 = 36.2, KX = Math.cos((33 * Math.PI) / 180) * 100, KY = 100;
  const proj = (lon, lat) => [(lon - LON0) * KX, (LAT1 - lat) * KY];
  const coastD = COAST.map((p, i) => (i ? 'L' : 'M') + proj(p[0], p[1]).map((v) => v.toFixed(1)).join(' ')).join('');
  $('#coast').setAttribute('d', coastD);
  $('#coastGlow').setAttribute('d', coastD);
  const cities = [];
  PLACES.forEach((p) => {
    let c = cities.find((x) => x.name === p.city);
    if (!c) { c = { name: p.city, lon: p.lon, lat: p.lat, places: [] }; cities.push(c); }
    c.places.push(p);
  });
  const LABEL_LEFT = ['Tanger', 'Rabat', 'Casablanca', 'Essaouira', 'Agadir', 'Marrakech'];
  $('#cities').innerHTML = cities.map((c) => {
    const [x, y] = proj(c.lon, c.lat);
    const left = LABEL_LEFT.includes(c.name);
    return `<g class="city${c.name === 'Nador' ? ' is-hq' : ''}" data-city="${c.name}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" tabindex="0" role="button" aria-label="${c.name}">
      <circle class="city__hit" r="18"/><circle class="city__ring" r="6"/><circle class="city__dot" r="5"/>
      <text class="city__lbl" x="${left ? -12 : 12}" y="4" text-anchor="${left ? 'end' : 'start'}">${c.name}</text></g>`;
  }).join('');
  const hq = proj(-3.03, 34.99);
  function drawRoute(cityName) {
    const c = cities.find((x) => x.name === cityName);
    const route = $('#route');
    if (!c || c.name === 'Nador') { route.setAttribute('d', ''); return; }
    const [x, y] = proj(c.lon, c.lat);
    const mx = (hq[0] + x) / 2, my = (hq[1] + y) / 2 - Math.hypot(x - hq[0], y - hq[1]) * 0.28;
    route.setAttribute('d', `M${hq[0].toFixed(1)} ${hq[1].toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`);
    route.style.strokeDasharray = 'none';
    if (hasGsap && !REDUCE) {
      const len = route.getTotalLength();
      gsap.fromTo(route, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: 'expo.out' });
    }
  }
  function markCity(cityName) {
    $$('.city').forEach((g) => g.classList.toggle('is-on', g.dataset.city === cityName));
    drawRoute(cityName);
  }
  $('#cities').addEventListener('click', (e) => {
    const g = e.target.closest('.city');
    if (!g) return;
    const c = cities.find((x) => x.name === g.dataset.city);
    $('#pickup').value = c.places[0].id;
    markCity(c.name);
    updateSummary();
  });
  $('#cities').addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.city')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  });

  /* ---------- configurador ---------- */
  const placeName = (p) => `${p.city}, ${p.kind === 'apt' ? t('apt') : t('ctr')}`;
  function fillSelects() {
    const pu = $('#pickup'), dr = $('#dropoff'), cs = $('#carSel');
    const v1 = pu.value || 'nador-apt', v2 = dr.value || 'same', v3 = cs.value;
    pu.innerHTML = PLACES.map((p) => `<option value="${p.id}">${placeName(p)}</option>`).join('');
    dr.innerHTML = `<option value="same">${t('same')}</option>` + PLACES.map((p) => `<option value="${p.id}">${placeName(p)}</option>`).join('');
    cs.innerHTML = `<option value="">${t('pickCar')}</option>` + CARS.map((c) => `<option value="${c.id}">${c.name}${c.year ? ' ' + c.year : ''} · ${c.price} €${t('perDay')}</option>`).join('');
    pu.value = v1; dr.value = v2; cs.value = v3 || '';
  }
  const iso = (d) => d.toISOString().slice(0, 10);
  const today = new Date(); today.setHours(12, 0, 0, 0);
  const d1 = $('#d1'), d2 = $('#d2');
  d1.min = d2.min = iso(today);
  d1.value = iso(new Date(today.getTime() + 864e5));
  d2.value = iso(new Date(today.getTime() + 4 * 864e5));
  const dateTxt = (v) => new Date(v + 'T12:00').toLocaleDateString(t('locale'), { day: 'numeric', month: 'short' });

  function updateSummary() {
    const sum = $('#sum'), err = $('#err'), wa = $('#wa');
    const car = CARS.find((c) => c.id === $('#carSel').value);
    const a = new Date(d1.value + 'T12:00'), b = new Date(d2.value + 'T12:00');
    const n = Math.round((b - a) / 864e5);
    err.textContent = '';
    const pu = PLACES.find((p) => p.id === $('#pickup').value) || PLACES[0];
    const drv = $('#dropoff').value;
    const dr = drv === 'same' ? pu : PLACES.find((p) => p.id === drv);
    if (!d1.value || !d2.value || isNaN(n) || n <= 0) {
      if (d1.value && d2.value) err.textContent = t('errDates');
      sum.innerHTML = `<span class="sum__empty">${t('empty')}</span>`;
      wa.href = `https://wa.me/${PHONE}`;
      return;
    }
    const nTxt = `${n} ${n === 1 ? t('day') : t('days')}`;
    if (!car) {
      sum.innerHTML = `<span class="sum__empty">${t('empty')}</span>`;
      wa.href = `https://wa.me/${PHONE}`;
      return;
    }
    const total = car.price * n;
    const totalTxt = `${fmt(total)} €`;
    sum.innerHTML = `
      <span class="sum__car">${car.name}${car.year ? ' ' + car.year : ''}</span>
      <span class="sum__meta">${nTxt}, ${dateTxt(d1.value)} → ${dateTxt(d2.value)} · ${pu.city}</span>
      <span class="sum__total">${totalTxt} <small>${t('estimate')}</small></span>
      ${n > 7 ? `<span class="sum__meta">${t('long')}</span>` : ''}`;
    const msg = t('wa').replace('{car}', `${car.name}${car.year ? ' ' + car.year : ''}`).replace('{d1}', dateTxt(d1.value)).replace('{d2}', dateTxt(d2.value))
      .replace('{n}', nTxt).replace('{p}', placeName(pu)).replace('{r}', placeName(dr)).replace('{t}', totalTxt);
    wa.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  }
  $('#pickup').addEventListener('change', (e) => { markCity(PLACES.find((p) => p.id === e.target.value).city); updateSummary(); });
  $('#dropoff').addEventListener('change', updateSummary);
  $('#carSel').addEventListener('change', (e) => setCar(e.target.value, false));
  d1.addEventListener('change', () => { if (d2.value <= d1.value) d2.value = iso(new Date(new Date(d1.value + 'T12:00').getTime() + 3 * 864e5)); updateSummary(); });
  d2.addEventListener('change', updateSummary);

  /* ---------- opiniones ---------- */
  let qi = 0, qTimer = null, qUser = false;
  function showQuote(i, animate = true) {
    const list = t('reviews');
    qi = (i + list.length) % list.length;
    const txt = $('#quoteTxt'), who = $('#quoteWho');
    const put = () => {
      const s = list[qi][0];
      txt.textContent = LANG === 'fr' ? `« ${s} »` : `“${s}”`;
      who.textContent = list[qi][1];
      $('#qCount').textContent = `${qi + 1} / ${list.length}`;
    };
    if (!animate || !hasGsap || REDUCE) { put(); return; }
    gsap.to([txt, who], { opacity: 0, filter: 'blur(4px)', duration: 0.2, ease: 'power2.in', onComplete: () => { put(); gsap.to([txt, who], { opacity: 1, filter: 'blur(0px)', duration: 0.35, ease: 'power2.out' }); } });
  }
  $('#qPrev').addEventListener('click', () => { qUser = true; showQuote(qi - 1); });
  $('#qNext').addEventListener('click', () => { qUser = true; showQuote(qi + 1); });
  function autoQuote() { clearInterval(qTimer); qTimer = setInterval(() => { if (!qUser && !document.hidden) showQuote(qi + 1); }, 7000); }

  /* ---------- scroll ---------- */
  function scrollFx() {
    if (!hasGsap || REDUCE) return;
    const nav = $('#nav');
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => {
        const y = s.scroll();
        nav.classList.toggle('is-solid', y > 40);
        nav.classList.toggle('is-hidden', s.direction === 1 && y > 500);
      }
    });
    $$('.reveal').forEach((el) => gsap.from(el, {
      clipPath: 'inset(0 0 100% 0)', y: 24, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    }));
    ScrollTrigger.batch('.car', {
      start: 'top 92%', once: true,
      onEnter: (els) => gsap.from(els, { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, clearProps: 'transform,opacity' })
    });
    gsap.from('.book', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: '.book', start: 'top 80%' }, clearProps: 'clipPath' });
    gsap.from('.agency__fig', { clipPath: 'inset(0 0 0 100%)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: '.agency', start: 'top 75%' } });
    gsap.from('.agency__fig img', { scale: 1.15, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.agency', start: 'top 75%' } });
    const mm = gsap.matchMedia();
    mm.add('(min-width: 641px)', () => {
      gsap.to('#roadCar', { x: () => $('#roadTrack').clientWidth - $('#roadCar').offsetWidth, ease: 'none', scrollTrigger: { trigger: '#roadTrack', start: 'top 80%', end: 'bottom 50%', scrub: 0.6, invalidateOnRefresh: true } });
    });
    mm.add('(max-width: 640px)', () => {
      gsap.to('#roadCar', { y: () => $('#roadTrack').clientHeight - $('#roadCar').offsetHeight, ease: 'none', scrollTrigger: { trigger: '#roadTrack', start: 'top 70%', end: 'bottom 60%', scrub: 0.6, invalidateOnRefresh: true } });
    });
    gsap.from('.road__stop', { opacity: 0, y: 20, duration: 0.8, ease: 'expo.out', stagger: 0.15, scrollTrigger: { trigger: '#roadTrack', start: 'top 80%' } });
    gsap.from('.reviews__big', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: '.reviews', start: 'top 75%' } });
    const brandsTrack = $('.brands__track');
    ScrollTrigger.create({ trigger: '.brands', start: 'top bottom', end: 'bottom top', onToggle: (s) => (brandsTrack.style.animationPlayState = s.isActive ? 'running' : 'paused') });
  }

  /* ---------- arranque ---------- */
  fillSelects();
  applyLang(pickInitialLang());
  markCity('Nador');
  autoQuote();
  scrollFx();
  addEventListener('load', () => hasGsap && ScrollTrigger.refresh());
})();
