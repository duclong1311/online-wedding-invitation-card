/**
 * ============================================================================
 * APP.JS — 4 TRANG TẠP CHÍ BOTANICAL SCROLLYTELLING & EDITORIAL COVER
 * ============================================================================
 */

(function () {
  "use strict";

  const CFG = window.WEDDING_CONFIG;
  if (!CFG) return;

  // --------------------------------------------------------------------------
  // 1. GẮN DỮ LIỆU TỪ CONFIG.JS VÀO 4 TRANG
  // --------------------------------------------------------------------------
  function bindContent() {
    const { hero, couple, weddingEvent, ending } = CFG;
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined) el.textContent = val;
    };

    // Page 1: Editorial Magazine Cover
    if (hero) {
      setTxt("hero-topbar-left", hero.topBarLeft);
      setTxt("hero-topbar-right", hero.topBarRight);
      setTxt("hero-top-kicker", hero.topKicker);
      setTxt("hero-behind-masthead", hero.behindTitle);
      setTxt("hero-behind-sub", hero.behindSubtitle);

      setTxt("hero-left-kicker", hero.leftEditorialKicker);
      setTxt("hero-left-quote", hero.leftEditorialQuote);
      setTxt("hero-right-quote-en", hero.rightQuoteEn);
      setTxt("hero-right-quote-vi", hero.rightQuoteVi);

      setTxt("hero-bottom-label", hero.bottomLeftLabel);
      setTxt("hero-groom-display", hero.groomDisplay);
      setTxt("hero-bride-display", hero.brideDisplay);
      setTxt("hero-day-big", hero.heroDay);
      setTxt("hero-month-year", `${hero.heroMonthShortEn} — ${hero.heroYear}`);
      setTxt("hero-city-label", hero.cityLabel);
    }

    if (couple) {
      // Page 2: Gia đình hai bên & Lễ Thành Hôn
      setTxt("announcement-text", couple.announcementText);
      setTxt("groom-order", couple.groom.roleLabel);
      setTxt("groom-fullname", couple.groom.fullName);
      setTxt("bride-order", couple.bride.roleLabel);
      setTxt("bride-fullname", couple.bride.fullName);

      setTxt("groom-father", couple.groom.father);
      setTxt("groom-mother", couple.groom.mother);
      setTxt("groom-address", couple.groom.address);
      setTxt("bride-father", couple.bride.father);
      setTxt("bride-mother", couple.bride.mother);
      setTxt("bride-address", couple.bride.address);
      setTxt("ceremony-time-note", couple.ceremonyTime);
      setTxt("ceremony-lunar-note", couple.ceremonyLunar);
    }

    // Page 3: Bữa cơm thân mật (26.11.2026 - 17:30 tại Tư gia nhà trai)
    if (weddingEvent) {
      setTxt("event-header-left", weddingEvent.headerLeft);
      setTxt("event-header-right", weddingEvent.headerRight);
      setTxt("invitation-heading", weddingEvent.invitationHeading);
      setTxt("invitation-heading-em", weddingEvent.invitationHeadingEm);
      setTxt("invitation-subtext", weddingEvent.invitationSubtext);

      setTxt("event-day-num", weddingEvent.day);
      setTxt("event-month-num", weddingEvent.month);
      setTxt("event-day-of-week", `${weddingEvent.dayOfWeek} — VÀO HỒI ${weddingEvent.time}`);
      setTxt("event-lunar", weddingEvent.lunarDate);
      setTxt("event-reception-detail", weddingEvent.receptionDetail);
      setTxt("event-venue-name", weddingEvent.venueName);
      setTxt("event-venue-address", weddingEvent.address);

      const mapLink = document.getElementById("event-map-link");
      if (mapLink && weddingEvent.mapUrl) {
        mapLink.href = weddingEvent.mapUrl;
      }
    }

    // Page 4: Lưu Bút
    if (CFG.wishes) {
      const w = CFG.wishes;
      setTxt("wishes-header-title", w.headerTitle || "LƯU BÚT");
    }

    // Page 5: Bìa sau QA_06511 Đen Trắng
    if (ending) {
      setTxt("finale-top-title", ending.topTitle);
      setTxt("finale-message", ending.message);
    }
  }

  // --------------------------------------------------------------------------
  // 2. SCROLLYTELLING PARALLAX & REVEAL ENGINE
  // --------------------------------------------------------------------------
  function setupScrollytelling() {
    const docEl = document.documentElement;
    const page1 = document.getElementById("page-1");
    const page4 = document.getElementById("page-4");

    let ticking = false;

    function onScrollFrame() {
      if (page1) {
        const rect1 = page1.getBoundingClientRect();
        const prog1 = Math.min(1, Math.max(0, -rect1.top / Math.max(1, rect1.height)));
        docEl.style.setProperty("--hero-scroll", prog1.toFixed(4));
      }

      if (page4) {
        const rect4 = page4.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect4.top < viewH && rect4.bottom > 0) {
          const prog4 = Math.min(1, Math.max(0, (viewH - rect4.top) / (viewH + rect4.height)));
          docEl.style.setProperty("--finale-scroll", prog4.toFixed(4));
        }
      }

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(onScrollFrame);
          ticking = true;
        }
      },
      { passive: true }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      revealObserver.observe(el);
    });

    onScrollFrame();
  }

  // --------------------------------------------------------------------------
  // 3. HẠT NẮNG & LÁ BOTANICAL NHẸ NHÀNG TRÊN CANVAS
  // --------------------------------------------------------------------------
  function setupBotanicalCanvas() {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const count = window.innerWidth < 768 ? 14 : 22;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2 + Math.random() * 3.5,
      speedY: 0.2 + Math.random() * 0.35,
      speedX: (Math.random() - 0.5) * 0.25,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.01,
      alpha: 0.15 + Math.random() * 0.32
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.15;
        p.angle += p.spin;

        if (p.y > height + 15) {
          p.y = -15;
          p.x = Math.random() * width;
        }
        if (p.x > width + 15) p.x = -15;
        if (p.x < -15) p.x = width + 15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = `rgba(223, 192, 146, ${p.alpha})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.25, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  // --------------------------------------------------------------------------
  // 4. NHẠC NỀN THIỆP CƯỚI (CHẠY 1 LẦN TỪ 2:28 "DEAR LORD..." ĐẾN HẾT, KHÔNG LOOP)
  // --------------------------------------------------------------------------
  function setupBackgroundMusic() {
    const audio = document.getElementById("wedding-audio");
    if (!audio) return;

    const musicCfg = CFG.music || {};
    if (musicCfg.src && audio.getAttribute("src") !== musicCfg.src) {
      audio.src = musicCfg.src;
    }

    // Đảm bảo chỉ chạy đúng 1 lần, tuyệt đối không lặp lại
    audio.loop = false;
    const targetVolume = typeof musicCfg.volume === "number" ? musicCfg.volume : 0.9;
    const fadeInMs = typeof musicCfg.fadeInMs === "number" ? musicCfg.fadeInMs : 4000;
    audio.volume = 0; // bắt đầu từ im lặng, to dần để không giật mình

    let fadeTimer = null;
    function fadeIn() {
      if (fadeTimer) return;
      const t0 = performance.now();
      fadeTimer = setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / fadeInMs);
        audio.volume = targetVolume * p * p; // đường cong p² nghe mượt, nhẹ ở đầu
        if (p >= 1) { clearInterval(fadeTimer); }
      }, 50);
    }

    let hasStarted = false;
    let hasEnded = false;

    const interactionEvents = [
      "pointerup",
      "mouseup",
      "touchend",
      "click",
      "keydown"
    ];

    function removeInteractionListeners() {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, tryPlayOnce, true);
      });
    }

    function tryPlayOnce() {
      if (hasStarted || hasEnded || !audio.paused) return;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStarted = true;
            removeInteractionListeners();
          })
          .catch(() => {
            // Trình duyệt chặn autoplay khi chưa có tương tác, sẽ tự phát ngay khi khách chạm/cuộn trang
          });
      }
    }

    audio.addEventListener("playing", () => {
      hasStarted = true;
      fadeIn();
      removeInteractionListeners();
    });

    audio.addEventListener("ended", () => {
      hasEnded = true;
      hasStarted = true;
      audio.pause();
      removeInteractionListeners();
    });

    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, tryPlayOnce, { capture: true, passive: true });
    });

    // Thử phát ngay khi mở thiệp
    tryPlayOnce();
  }

  // --------------------------------------------------------------------------
  // 5. LƯU BÚT — CÁNH BƯỚM NGHỆ THUẬT BAY ĐẬU TRÊN BẢNG GỖ CỔ ĐIỂN
  // --------------------------------------------------------------------------
  function setupButterflyWishes() {
    const board = document.getElementById("wooden-wish-board");
    const stage = document.getElementById("butterfly-stage");
    const form = document.getElementById("butterfly-wish-form");
    const nameInput = document.getElementById("wish-sender-name");
    const msgInput = document.getElementById("wish-message-input");
    const charCount = document.getElementById("wish-char-count");
    const totalCountEl = document.getElementById("wish-total-count");

    const floatingCard = document.getElementById("wish-floating-card");
    const cardCloseBtn = document.getElementById("wish-card-close");
    const cardEmblem = document.getElementById("wish-card-emblem");
    const cardSender = document.getElementById("wish-card-sender");
    const cardTime = document.getElementById("wish-card-time");
    const cardBody = document.getElementById("wish-card-body");

    const openComposeBtn = document.getElementById("btn-open-compose-wish");
    const closeComposeBtn = document.getElementById("btn-close-compose-wish");
    const composeBackdrop = document.getElementById("wish-compose-backdrop");

    const openAllBtn = document.getElementById("btn-open-all-wishes");
    const closeAllBtn = document.getElementById("btn-close-all-wishes");
    const modalBackdrop = document.getElementById("wishes-modal-backdrop");
    const modalList = document.getElementById("wishes-modal-list");

    if (!board || !stage) return;

    const STORAGE_KEY = "wedding_butterfly_wishes_v2";
    const MAX_BOARD_BUTTERFLIES = 12;

    // 6 bảng màu ánh kim lấy từ butterfly.js (dùng chung với màn hình chờ)
    const SPECIES_KEYS = window.WeddingButterfly.KEYS;
    const SPECIES_PALETTES = window.WeddingButterfly.PALETTES;

    function pickRandomSpecies(seedIndex) {
      if (typeof seedIndex === "number") {
        return SPECIES_KEYS[seedIndex % SPECIES_KEYS.length];
      }
      return SPECIES_KEYS[Math.floor(Math.random() * SPECIES_KEYS.length)];
    }

    // 12 vị trí đậu tự nhiên phân bổ nghệ thuật trên mặt gỗ, kèm vector đường bay lượn từ ngoài vào
    const PERCH_SLOTS = [
      { x: 17, y: 22, angle: -16, fx: -260, fy: -170, frot: 32, scale: 1.04 },
      { x: 46, y: 18, angle: 12,  fx: 30,   fy: -230, frot: -22, scale: 0.96 },
      { x: 78, y: 22, angle: -19, fx: 260,  fy: -160, frot: -34, scale: 1.05 },
      { x: 31, y: 41, angle: 18,  fx: -270, fy: -45,  frot: 25, scale: 1.00 },
      { x: 64, y: 38, angle: -11, fx: 270,  fy: -70,  frot: -26, scale: 1.08 },
      { x: 16, y: 61, angle: 22,  fx: -250, fy: 110,  frot: 18, scale: 0.94 },
      { x: 48, y: 58, angle: -14, fx: -70,  fy: 250,  frot: 28, scale: 1.06 },
      { x: 82, y: 57, angle: 15,  fx: 260,  fy: 95,   frot: -22, scale: 0.98 },
      { x: 28, y: 78, angle: -13, fx: -220, fy: 220,  frot: 30, scale: 1.02 },
      { x: 61, y: 77, angle: 19,  fx: 140,  fy: 240,  frot: -18, scale: 0.95 },
      { x: 84, y: 81, angle: -21, fx: 250,  fy: 210,  frot: -29, scale: 0.92 },
      { x: 35, y: 23, angle: 9,   fx: -170, fy: -210, frot: 21, scale: 0.93 }
    ];

    function loadWishes() {
      const initial = (CFG.wishes && Array.isArray(CFG.wishes.initialWishes))
        ? CFG.wishes.initialWishes.map((item, idx) => ({
            ...item,
            species: item.species || pickRandomSpecies(idx)
          }))
        : [];
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const saved = raw ? JSON.parse(raw) : [];
        if (Array.isArray(saved) && saved.length > 0) {
          return [...saved, ...initial];
        }
      } catch (e) {
        // Bỏ qua nếu trình duyệt chặn localStorage
      }
      return [...initial];
    }

    function saveCustomWish(newWish) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const saved = raw ? JSON.parse(raw) : [];
        const updated = [newWish, ...(Array.isArray(saved) ? saved : [])];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        // Bỏ qua nếu localStorage bị khoá
      }
    }

    let allWishes = loadWishes();
    let flightTimer = null;

    // Thiết kế SVG Cánh Bướm Đuôi Én Nghệ Thuật (Ornate Swallowtail Botanical Engraving)
    function createButterflyInnerHtml(wish, uid) {
      const spKey = SPECIES_PALETTES[wish.species] ? wish.species : "gold";
      const pal = SPECIES_PALETTES[spKey];
      const WB = window.WeddingButterfly;

      return `
        <div class="butterfly-flight-carrier">
          <div class="bf-3d-wrap">
            <div class="bf-wood-shadow"></div>
            <span class="bf-pollen-spark bf-pollen-spark--1"></span>
            <span class="bf-pollen-spark bf-pollen-spark--2"></span>

            <div class="bf-wing bf-wing--left">${WB.wingSvg(pal, uid, false)}</div>
            <div class="bf-wing bf-wing--right">${WB.wingSvg(pal, uid, true)}</div>
            ${WB.bodySvg(pal, "bf-body-svg")}
          </div>

          <div class="bf-sender-tag"></div>
        </div>
      `;
    }

    // Hiển thị thẻ lưu bút nổi ngay cạnh chú bướm đang được hover/chạm
    function openWishCard(wish, butterflyEl) {
      if (!floatingCard || !wish) return;

      stage.querySelectorAll(".butterfly-item").forEach((el) => {
        el.classList.toggle("is-active", el.dataset.wishId === String(wish.id));
      });

      const spKey = SPECIES_PALETTES[wish.species] ? wish.species : "gold";
      const pal = SPECIES_PALETTES[spKey];

      if (cardEmblem) {
        cardEmblem.style.background = pal.badge;
        cardEmblem.style.boxShadow = `0 0 12px ${pal.glow}`;
      }
      if (cardSender) cardSender.textContent = wish.name;
      if (cardTime) cardTime.textContent = wish.time || "Vừa xong";
      if (cardBody) cardBody.textContent = `“${wish.message}”`;

      floatingCard.classList.add("is-open");
      floatingCard.setAttribute("aria-hidden", "false");

      const boardW = board.clientWidth;
      const boardH = board.clientHeight;
      const cardW = Math.min(305, boardW - 28);
      const cardH = floatingCard.offsetHeight || 140;

      const xPct = parseFloat(butterflyEl.dataset.xPct || "50");
      const yPct = parseFloat(butterflyEl.dataset.yPct || "50");

      const targetX = (xPct / 100) * boardW;
      const targetY = (yPct / 100) * boardH;

      let leftPx = targetX - cardW / 2;
      leftPx = Math.max(16, Math.min(boardW - cardW - 16, leftPx));

      let topPx;
      if (yPct < 48) {
        topPx = Math.min(boardH - cardH - 18, targetY + 46);
      } else {
        topPx = Math.max(18, targetY - cardH - 46);
      }

      floatingCard.style.left = `${leftPx}px`;
      floatingCard.style.top = `${topPx}px`;
    }

    function closeWishCard() {
      if (floatingCard) {
        floatingCard.classList.remove("is-open");
        floatingCard.setAttribute("aria-hidden", "true");
      }
      stage.querySelectorAll(".butterfly-item.is-active").forEach((el) => {
        el.classList.remove("is-active");
      });
    }

    // Vẽ đàn bướm lên tấm bảng gỗ
    function renderBoardButterflies(newlyAddedId) {
      stage.innerHTML = "";
      if (totalCountEl) {
        totalCountEl.textContent = String(allWishes.length);
      }

      const visibleWishes = allWishes.slice(0, MAX_BOARD_BUTTERFLIES);

      visibleWishes.forEach((wish, idx) => {
        const slot = PERCH_SLOTS[idx % PERCH_SLOTS.length];
        const spKey = SPECIES_PALETTES[wish.species] ? wish.species : pickRandomSpecies(idx);
        const pal = SPECIES_PALETTES[spKey];

        const item = document.createElement("div");
        item.className = "butterfly-item";
        if (newlyAddedId && wish.id === newlyAddedId) {
          item.classList.add("is-swooping-new");
        }
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `Lưu bút từ ${wish.name}`);
        item.dataset.wishId = String(wish.id);
        item.dataset.xPct = String(slot.x);
        item.dataset.yPct = String(slot.y);

        const delaySec = newlyAddedId ? "0.00" : (idx * 0.12).toFixed(2);

        item.style.setProperty("--x", `${slot.x}%`);
        item.style.setProperty("--y", `${slot.y}%`);
        item.style.setProperty("--perch-angle", `${slot.angle}deg`);
        item.style.setProperty("--bf-scale", String(slot.scale));
        item.style.setProperty("--fly-from-x", `${slot.fx}px`);
        item.style.setProperty("--fly-from-y", `${slot.fy}px`);
        item.style.setProperty("--fly-rot", `${slot.frot}deg`);
        item.style.setProperty("--fly-delay", `${delaySec}s`);
        item.style.setProperty("--breathe-dur", `${(3.1 + (idx % 4) * 0.45).toFixed(2)}s`);
        item.style.setProperty("--breathe-delay", `${((idx * 0.37) % 1.8).toFixed(2)}s`);
        item.style.setProperty("--bf-glow", pal.glow);

        item.innerHTML = createButterflyInnerHtml(wish, `${idx}-${Date.now()}`);
        const tagEl = item.querySelector(".bf-sender-tag");
        if (tagEl) {
          tagEl.textContent = wish.name;
        }

        // Hover trên PC: bướm lay động & mở thẻ lưu bút
        item.addEventListener("mouseenter", () => {
          openWishCard(wish, item);
        });

        item.addEventListener("focus", () => {
          openWishCard(wish, item);
        });

        // Chạm / Click (Mobile & PC)
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          openWishCard(wish, item);
        });

        stage.appendChild(item);
      });
    }

    // Kích hoạt hiệu ứng đàn bướm bay lượn vào đậu trên tấm gỗ
    function triggerFlightAnimation() {
      closeWishCard();
      board.classList.remove("is-flight-active", "is-flying-now");
      void board.offsetWidth;
      board.classList.add("is-flight-active", "is-flying-now");

      if (flightTimer) clearTimeout(flightTimer);
      flightTimer = setTimeout(() => {
        board.classList.remove("is-flying-now");
      }, 2600);
    }

    // Thả một chú bướm màu ngẫu nhiên bay vào đậu lên bảng gỗ ngay sau khi đóng Dialog
    function releaseNewButterflyToBoard(senderName, messageText) {
      const newWish = {
        id: `wish-${Date.now()}`,
        name: senderName,
        species: pickRandomSpecies(),
        message: messageText,
        time: "Vừa xong"
      };

      allWishes.unshift(newWish);
      saveCustomWish(newWish);

      board.classList.add("is-flight-active");
      renderBoardButterflies(newWish.id);

      const newButterflyEl = stage.querySelector(`[data-wish-id="${newWish.id}"]`);
      setTimeout(() => {
        if (newButterflyEl) {
          newButterflyEl.classList.remove("is-swooping-new");
          openWishCard(newWish, newButterflyEl);
        }
      }, 2150);
    }

    // Render danh sách đầy đủ trong Dialog Xem Danh Sách
    function renderModalList() {
      if (!modalList) return;
      modalList.innerHTML = "";
      allWishes.forEach((w) => {
        const box = document.createElement("article");
        box.className = "modal-wish-item";

        const top = document.createElement("div");
        top.className = "modal-wish-top";

        const sender = document.createElement("strong");
        sender.className = "modal-wish-sender";
        sender.textContent = w.name;

        const time = document.createElement("span");
        time.className = "modal-wish-time";
        time.textContent = w.time || "Hôm nay";

        const msg = document.createElement("p");
        msg.className = "modal-wish-msg";
        msg.textContent = w.message;

        top.appendChild(sender);
        top.appendChild(time);
        box.appendChild(top);
        box.appendChild(msg);
        modalList.appendChild(box);
      });
    }

    // Khởi tạo đàn bướm lần đầu
    renderBoardButterflies();

    // Quan sát khi người dùng scroll tới tấm bảng gỗ -> đàn bướm bay vào đậu
    let hasTriggeredScrollFlight = false;
    const boardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredScrollFlight) {
            hasTriggeredScrollFlight = true;
            triggerFlightAnimation();
          }
        });
      },
      { threshold: 0.22 }
    );
    boardObserver.observe(board);

    // Đóng thẻ lưu bút khi click ra khoảng trống trên mặt gỗ hoặc rời chuột khỏi bảng
    board.addEventListener("click", (e) => {
      if (floatingCard && !floatingCard.contains(e.target)) {
        closeWishCard();
      }
    });

    board.addEventListener("mouseleave", () => {
      closeWishCard();
    });

    if (cardCloseBtn) {
      cardCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeWishCard();
      });
    }

    // Mở / đóng Dialog Nhập Lưu Bút
    function openComposeDialog() {
      if (!composeBackdrop) return;
      composeBackdrop.hidden = false;
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 60);
    }

    function closeComposeDialog(shouldReleaseIfFilled) {
      if (!composeBackdrop) return;
      const senderName = (nameInput ? nameInput.value : "").trim();
      const messageText = (msgInput ? msgInput.value : "").trim();

      composeBackdrop.hidden = true;

      if (shouldReleaseIfFilled && senderName && messageText) {
        if (form) form.reset();
        if (charCount) charCount.textContent = "0 / 220";
        // Ngay sau khi đóng Dialog, chú bướm mới bay vào và đậu lên bảng gỗ
        setTimeout(() => {
          releaseNewButterflyToBoard(senderName, messageText);
        }, 160);
      }
    }

    if (openComposeBtn) {
      openComposeBtn.addEventListener("click", openComposeDialog);
    }

    if (closeComposeBtn) {
      closeComposeBtn.addEventListener("click", () => {
        closeComposeDialog(true);
      });
    }

    if (composeBackdrop) {
      composeBackdrop.addEventListener("click", (e) => {
        if (e.target === composeBackdrop) {
          closeComposeDialog(true);
        }
      });
    }

    if (msgInput && charCount) {
      msgInput.addEventListener("input", () => {
        charCount.textContent = `${msgInput.value.length} / 220`;
      });
    }

    document.querySelectorAll(".wish-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (!msgInput) return;
        msgInput.value = chip.getAttribute("data-wish") || "";
        if (charCount) {
          charCount.textContent = `${msgInput.value.length} / 220`;
        }
        msgInput.focus();
      });
    });

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        closeComposeDialog(true);
      });
    }

    // Mở / đóng Dialog Xem Danh Sách Lưu Bút
    if (openAllBtn && modalBackdrop) {
      openAllBtn.addEventListener("click", () => {
        renderModalList();
        modalBackdrop.hidden = false;
      });
    }

    if (closeAllBtn && modalBackdrop) {
      closeAllBtn.addEventListener("click", () => {
        modalBackdrop.hidden = true;
      });
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.hidden = true;
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // KHỞI CHẠY
  // --------------------------------------------------------------------------
  function init() {
    bindContent();
    setupScrollytelling();
    setupBotanicalCanvas();
    setupBackgroundMusic();
    setupButterflyWishes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
