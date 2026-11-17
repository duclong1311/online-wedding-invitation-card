/* ==========================================================================
   BUTTERFLY.JS — Bộ vẽ cánh bướm dùng chung (màn hình chờ + bảng lưu bút)
   - Cánh vẽ lại 2 thùy (cánh trước + cánh sau có đuôi), gradient xuyên tâm
     từ gốc cánh ra mép + lớp ánh xà cừ (iridescent) + gân cánh + đốm mắt.
   - Palette ánh kim: vàng champagne, xà cừ, ngọc lục bảo, hồng rose, kem, xanh sapphire.
   ========================================================================== */
(function () {
  "use strict";

  const PALETTES = {
    gold:      { c1: "#fff3c4", c2: "#f0b85a", c3: "#9a5a14", rim: "#3a1f06", irid: "#ff9ec0", vein: "#4a2a08", glow: "rgba(245, 202, 118, 0.9)",  badge: "linear-gradient(135deg, #fff3c4, #d79a3a)" },
    pearl:     { c1: "#ffffff", c2: "#e6dff0", c3: "#8c86ad", rim: "#2c2a45", irid: "#8fe3ff", vein: "#3a3858", glow: "rgba(225, 235, 255, 0.9)",  badge: "linear-gradient(135deg, #ffffff, #a9a3c9)" },
    emerald:   { c1: "#e4fff2", c2: "#4fd1a5", c3: "#0f6b57", rim: "#06261f", irid: "#ffe38a", vein: "#0b3d33", glow: "rgba(102, 230, 190, 0.88)", badge: "linear-gradient(135deg, #a8f5da, #1f8f73)" },
    amber:     { c1: "#ffe6ea", c2: "#f08aa3", c3: "#8f2a4a", rim: "#3a0f1d", irid: "#ffd27a", vein: "#4a1427", glow: "rgba(245, 150, 175, 0.88)", badge: "linear-gradient(135deg, #ffd0da, #cf5a7d)" },
    champagne: { c1: "#fffaf0", c2: "#ecd3a4", c3: "#9b7a46", rim: "#33250f", irid: "#ffc4d8", vein: "#4a3719", glow: "rgba(240, 215, 170, 0.9)",  badge: "linear-gradient(135deg, #fff6df, #c4a063)" },
    topaz:     { c1: "#dff2ff", c2: "#5aa7ff", c3: "#1b3f9a", rim: "#0a1640", irid: "#c9a6ff", vein: "#12296b", glow: "rgba(120, 175, 255, 0.9)",  badge: "linear-gradient(135deg, #cfe8ff, #3f6fd0)" }
  };

  const KEYS = Object.keys(PALETTES);

  const FORE = "M48,38 C47,20 34,3 17,3 C6,3 1,11 4,21 C7,30 22,37 48,40 Z";
  const HIND = "M48,40 C33,40 15,44 10,56 C6,66 13,76 23,74 C27,80 33,81 35,76 C43,70 48,58 48,42 Z";

  // Một cánh (viewBox 49x82, bản lề ở cạnh phải). mirrored = true cho cánh phải.
  function wingSvg(pal, uid, mirrored) {
    const g = `bfg-${uid}${mirrored ? "r" : "l"}`;
    const i = `bfi-${uid}${mirrored ? "r" : "l"}`;
    const inner = `
      <path d="${HIND}" fill="url(#${g})" stroke="${pal.rim}" stroke-width="0.9" stroke-linejoin="round" />
      <path d="${FORE}" fill="url(#${g})" stroke="${pal.rim}" stroke-width="1" stroke-linejoin="round" />
      <path d="${HIND}" fill="url(#${i})" />
      <path d="${FORE}" fill="url(#${i})" />
      <path d="M44,35 C40,21 28,10 14,8.5 C22,15 32,25 44,35 Z" fill="#fff" opacity="0.22" />
      <path d="M47,40 L6,12 M47,39 L3.5,21 M47,40 L12,5 M47,38 L25,4 M47,41 L11,57 M47,42 L15,69 M47,43 L27,75"
            fill="none" stroke="${pal.vein}" stroke-width="0.5" stroke-linecap="round" opacity="0.42" />
      <g fill="${pal.c1}" opacity="0.92">
        <circle cx="7" cy="14" r="1.1" /><circle cx="5.4" cy="20.5" r="1" /><circle cx="8.4" cy="26" r="0.95" />
        <circle cx="12.5" cy="7" r="1.1" /><circle cx="19.5" cy="5.4" r="1.05" /><circle cx="27" cy="6.4" r="0.95" />
        <circle cx="11.8" cy="59.5" r="1" /><circle cx="14.4" cy="68" r="1" /><circle cx="23" cy="71.6" r="1" />
      </g>
      <circle cx="21" cy="60" r="3.4" fill="${pal.rim}" opacity="0.55" />
      <circle cx="21" cy="60" r="2.3" fill="${pal.c1}" />
      <circle cx="21" cy="60" r="1.1" fill="${pal.c3}" />`;
    return `
      <svg viewBox="0 0 49 82" width="100%" height="100%" aria-hidden="true">
        <defs>
          <radialGradient id="${g}" cx="100%" cy="48%" r="108%">
            <stop offset="0%" stop-color="${pal.c3}" />
            <stop offset="42%" stop-color="${pal.c2}" />
            <stop offset="100%" stop-color="${pal.c1}" />
          </radialGradient>
          <linearGradient id="${i}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${pal.irid}" stop-opacity="0.5" />
            <stop offset="45%" stop-color="${pal.irid}" stop-opacity="0" />
            <stop offset="100%" stop-color="${pal.c1}" stop-opacity="0.28" />
          </linearGradient>
        </defs>
        ${mirrored ? `<g transform="translate(49,0) scale(-1,1)">${inner}</g>` : inner}
      </svg>`;
  }

  // Thân bướm: đầu, ngực, bụng có đốt, râu cong có chùy
  function bodySvg(pal, cls) {
    return `
      <svg class="${cls}" viewBox="0 0 16 56" aria-hidden="true">
        <path d="M7,14 C5.5,8 3,4 1.2,2.6 M9,14 C10.5,8 13,4 14.8,2.6" fill="none" stroke="${pal.c1}" stroke-width="0.8" stroke-linecap="round" />
        <circle cx="1.2" cy="2.6" r="1.05" fill="${pal.c1}" /><circle cx="14.8" cy="2.6" r="1.05" fill="${pal.c1}" />
        <ellipse cx="8" cy="15.5" rx="2.3" ry="3" fill="#2a170a" stroke="${pal.c1}" stroke-width="0.45" />
        <ellipse cx="8" cy="22" rx="2.1" ry="4" fill="#33200f" stroke="${pal.c1}" stroke-width="0.4" />
        <ellipse cx="8" cy="34" rx="1.7" ry="11" fill="#1e1006" stroke="${pal.c1}" stroke-width="0.4" />
        <path d="M6.5,28 H9.5 M6.4,32 H9.6 M6.4,36 H9.6 M6.6,40 H9.4" stroke="${pal.c2}" stroke-width="0.4" opacity="0.7" />
        <circle cx="7.2" cy="14.8" r="0.5" fill="${pal.c1}" />
      </svg>`;
  }

  window.WeddingButterfly = { PALETTES, KEYS, wingSvg, bodySvg };
})();
