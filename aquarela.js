// Unhas em aquarela desenhadas em SVG (sem foto): base nude + manchas de tinta com borda orgânica.
// shortcut: são ilustrações; quando houver fotos reais das unhas da Darlene, elas podem substituir o leque.
const PALETAS = [
  ["#e07a93", "#f2a9b8", "#c9963e"], // rosé com dourado
  ["#5fa8d6", "#9b7fd6", "#e0b5d0"], // céu e lilás
  ["#5cc4a0", "#2f8a6c", "#d9b25a"], // menta
  ["#ee9a6a", "#e07a93", "#f2c46b"], // pêssego
  ["#9b7fd6", "#e07a93", "#5fa8d6"], // lilás
  ["#2f8a6c", "#5fa8d6", "#9fd8c0"], // esmeralda
  ["#d9a24a", "#ee9a6a", "#e07a93"], // nude dourado
];
const UNHA = "M30 2C50 2 58 34 58 62V150H2V62C2 34 10 2 30 2Z";

// número aleatório repetível (a mesma unha sai sempre igual)
const sorte = (s) => () => ((s = (s * 16807) % 2147483647) / 2147483647);

let contaSvg = 0;
function unha(n) {
  const id = "u" + contaSvg++, r = sorte(n * 97 + 13), p = PALETAS[n % PALETAS.length];
  const manchas = Array.from({ length: 5 }, (_, k) =>
    `<circle cx="${(8 + r() * 44).toFixed(1)}" cy="${(14 + r() * 80).toFixed(1)}" r="${(11 + r() * 13).toFixed(1)}" fill="${p[k % p.length]}" opacity="${(0.7 + r() * 0.3).toFixed(2)}"/>`).join("");
  const folha = n % 3 === 0 ? `<path d="M10 ${40 + r() * 30} C 22 ${30 + r() * 20}, 34 ${70 + r() * 20}, 52 ${46 + r() * 20}" fill="none" stroke="#c9a45c" stroke-width="1.1" opacity=".9"/>` : "";
  return `<svg class="tip" viewBox="0 0 60 150" aria-hidden="true"><defs>
    <clipPath id="c${id}"><path d="${UNHA}"/></clipPath>
    <filter id="f${id}" x="-40%" y="-40%" width="180%" height="180%"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="3" seed="${n * 5 + 2}"/><feDisplacementMap in="SourceGraphic" scale="20"/><feGaussianBlur stdDeviation="2.6"/></filter>
    <linearGradient id="g${id}" x1="0" x2="1"><stop offset=".14" stop-color="#fff" stop-opacity="0"/><stop offset=".26" stop-color="#fff" stop-opacity=".6"/><stop offset=".36" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <g clip-path="url(#c${id})"><rect width="60" height="150" fill="#f3e7df"/><g filter="url(#f${id})" style="mix-blend-mode:multiply">${manchas}</g>${folha}<rect width="60" height="150" fill="url(#g${id})"/></g>
    <path d="${UNHA}" fill="none" stroke="#00000030" stroke-width=".6"/></svg>`;
}

// mancha redonda de tinta (amostra de cor dos módulos)
function mancha(n) {
  const id = "m" + contaSvg++, p = PALETAS[n % PALETAS.length];
  return `<svg class="amostra" viewBox="0 0 60 60" aria-hidden="true"><defs><filter id="f${id}" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="3" seed="${n * 11 + 1}"/><feDisplacementMap in="SourceGraphic" scale="14"/><feGaussianBlur stdDeviation="1.6"/></filter></defs>
    <g filter="url(#f${id})"><circle cx="27" cy="30" r="20" fill="${p[0]}" opacity=".85"/><circle cx="36" cy="26" r="13" fill="${p[1]}" opacity=".75" style="mix-blend-mode:multiply"/></g></svg>`;
}

// leque de unhas (cartela): começa fechado e abre uma vez ao aparecer na tela
function leque(el, qtd = 7, abertura = 64) {
  el.innerHTML = Array.from({ length: qtd }, (_, i) => {
    const rot = -abertura / 2 + (abertura / (qtd - 1)) * i;
    return `<span style="--r:${rot.toFixed(1)}deg;transition-delay:${i * 60}ms">${unha(i)}</span>`;
  }).join("");
  const abrir = () => el.classList.add("aberto");
  if (!("IntersectionObserver" in window)) return abrir();
  new IntersectionObserver((ents, o) => ents.forEach((e) => e.isIntersecting && (abrir(), o.disconnect())), { threshold: 0.3 }).observe(el);
}

// mancha grande de fundo (lavado de aquarela no verde)
const lavado = (cores) => `<svg class="lavado" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><filter id="lv${contaSvg++}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".006" numOctaves="4" seed="9"/><feDisplacementMap in="SourceGraphic" scale="160"/><feGaussianBlur stdDeviation="28"/></filter></defs>
  <g filter="url(#lv${contaSvg - 1})">${cores.map(([x, y, r, c, o]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}"/>`).join("")}</g></svg>`;
