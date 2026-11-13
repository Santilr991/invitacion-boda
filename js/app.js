(() => {
  "use strict";

  /* =========================================================
     CONFIGURACIÓN — EDITA AQUÍ TODOS LOS DATOS DE LA BODA
     ========================================================= */
  const CONFIG = {
    bride: "Bleidys",
    groom: "Miguel",
    lastNames: "Llanos & Rojas",
    fullNames: "Bleidys Llanos & Miguel Rojas",
    dateISO: "2026-12-12T16:00:00",
    timeLabel: "4:00 PM",
    quote: "“Dos vidas, un mismo camino”",

    ceremony: {
      name: "Parroquia [por confirmar]",
      time: "4:00 PM",
      address: "Dirección por confirmar",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parroquia",
    },

    reception: {
      name: "Salón [por confirmar]",
      time: "7:00 PM",
      address: "Dirección por confirmar",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n%20de%20eventos",
    },

    rsvpDeadline: "[fecha límite]",
    maxGuests: 10,
    storageKey: "rsvp-bleidys-miguel",
  };

  const MONTHS = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const WEEKDAYS = [
    "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado",
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const setText = (selector, value) => {
    $$(selector).forEach((el) => {
      el.textContent = value;
    });
  };

  const weddingDate = new Date(CONFIG.dateISO);

  /* =========================================================
     1. VOLCAR CONFIGURACIÓN EN LA PÁGINA
     ========================================================= */
  function applyConfig() {
    setText("[data-bride]", CONFIG.bride);
    setText("[data-groom]", CONFIG.groom);
    setText("[data-couple-last]", CONFIG.lastNames);
    setText("[data-couple-full]", CONFIG.fullNames);
    setText("[data-couple-short]", `${CONFIG.bride} & ${CONFIG.groom}`);
    setText("[data-signature]", `${CONFIG.bride} & ${CONFIG.groom}`);
    setText("[data-quote]", CONFIG.quote);

    const day = weddingDate.getDate();
    const month = MONTHS[weddingDate.getMonth()];
    const year = weddingDate.getFullYear();
    const weekday = WEEKDAYS[weddingDate.getDay()];
    const monthCap = month.charAt(0).toUpperCase() + month.slice(1);

    setText("[data-date-day]", String(day));
    setText("[data-date-month]", monthCap);
    setText("[data-date-year]", String(year));
    setText("[data-date-short]", `${String(day).padStart(2, "0")} · ${String(weddingDate.getMonth() + 1).padStart(2, "0")} · ${year}`);
    setText(
      "[data-date-long]",
      `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} de ${month} de ${year} · ${CONFIG.timeLabel}`
    );

    const ceremony = CONFIG.ceremony;
    const reception = CONFIG.reception;
    setText("[data-ceremony-name]", ceremony.name);
    setText("[data-ceremony-time]", ceremony.time);
    setText("[data-ceremony-address]", ceremony.address);
    setText("[data-reception-name]", reception.name);
    setText("[data-reception-time]", reception.time);
    setText("[data-reception-address]", reception.address);

    const ceremonyMaps = $("#ceremonyMaps");
    const receptionMaps = $("#receptionMaps");
    if (ceremonyMaps) ceremonyMaps.href = ceremony.mapsUrl;
    if (receptionMaps) receptionMaps.href = reception.mapsUrl;

    const deadline = $(".rsvp-note strong");
    if (deadline) deadline.textContent = CONFIG.rsvpDeadline;

    const guestsInput = $("#rsvpGuests");
    if (guestsInput) guestsInput.max = String(CONFIG.maxGuests);
    const guestsHint = $("#guestsHint");
    if (guestsHint) {
      guestsHint.textContent = `Cupo máximo: ${CONFIG.maxGuests} personas por invitación.`;
    }
  }

  /* =========================================================
     2. PÉTALOS
     ========================================================= */
  function createPetals() {
    const container = $("#petals");
    if (!container || prefersReducedMotion) return;

    const colors = ["#e9d3c6", "#b5644a", "#8fa085", "#d9c3b0", "#c9a98a", "#c0ae9a"];
    const count = window.innerWidth < 640 ? 12 : 22;

    for (let i = 0; i < count; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      const size = 8 + Math.random() * 14;
      petal.style.setProperty("--x", `${Math.random() * 100}%`);
      petal.style.setProperty("--size", `${size.toFixed(1)}px`);
      petal.style.setProperty("--drift", `${(Math.random() * 180 - 90).toFixed(0)}px`);
      petal.style.setProperty("--dur", `${(10 + Math.random() * 10).toFixed(1)}s`);
      petal.style.setProperty("--delay", `${(-Math.random() * 14).toFixed(1)}s`);
      petal.style.setProperty("--opacity", (0.3 + Math.random() * 0.35).toFixed(2));
      petal.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
      container.appendChild(petal);
    }
  }

  /* =========================================================
     3. APERTURA DEL SOBRE
     ========================================================= */
  function setupEnvelope() {
    const overlay = $("#envelopeScreen");
    const envelope = $("#envelope");
    const openBtn = $("#openBtn");
    const page = $("#page");
    if (!overlay || !envelope || !openBtn) return;

    let opened = false;
    if (page && "inert" in page) page.inert = true;

    const openInvitation = () => {
      if (opened) return;
      opened = true;
      openBtn.disabled = true;
      envelope.classList.add("is-opening");
      overlay.classList.add("is-opening");

      const fast = prefersReducedMotion;
      const t1 = fast ? 120 : 520;
      const t2 = fast ? 350 : 1650;
      const t3 = fast ? 650 : 2600;

      window.setTimeout(() => envelope.classList.add("is-letter-out"), t1);

      window.setTimeout(() => {
        overlay.classList.add("is-leaving");
      }, t2);

      window.setTimeout(() => {
        overlay.classList.add("is-done");
        document.body.classList.remove("is-locked");
        document.body.classList.add("is-entered");
        if (page && "inert" in page) page.inert = false;
        window.scrollTo(0, 0);

        const hero = $("#inicio");
        if (hero) {
          hero.setAttribute("tabindex", "-1");
          hero.focus({ preventScroll: true });
        }
      }, t3);
    };

    openBtn.addEventListener("click", openInvitation);

    /* Vista previa directa para desarrollo: index.html?autoopen=1&scroll=galeria */
    const params = new URLSearchParams(window.location.search);
    if (params.has("autoopen")) {
      window.setTimeout(openInvitation, 150);
      const target = params.get("scroll");
      if (target) {
        window.setTimeout(() => {
          const section = document.getElementById(target);
          if (section) section.scrollIntoView({ behavior: "auto", block: "start" });
        }, 3400);
      }
    }
  }

  /* =========================================================
     4. CUENTA REGRESIVA
     ========================================================= */
  function setupCountdown() {
    const target = weddingDate.getTime();
    const els = {
      days: $("#days"),
      hours: $("#hours"),
      minutes: $("#minutes"),
      seconds: $("#seconds"),
    };
    if (!els.days) return;

    const setNum = (el, value) => {
      if (!el) return;
      const next = String(value).padStart(2, "0");
      if (el.textContent !== next) {
        el.textContent = next;
        if (!prefersReducedMotion) {
          el.classList.remove("tick");
          void el.offsetWidth;
          el.classList.add("tick");
        }
      }
    };

    const render = () => {
      const diff = Math.max(0, target - Date.now());
      const totalSeconds = Math.floor(diff / 1000);

      setNum(els.days, Math.floor(totalSeconds / 86400));
      setNum(els.hours, Math.floor((totalSeconds % 86400) / 3600));
      setNum(els.minutes, Math.floor((totalSeconds % 3600) / 60));
      setNum(els.seconds, totalSeconds % 60);
    };

    render();
    window.setInterval(render, 1000);
  }

  /* =========================================================
     5. REVEAL AL HACER SCROLL
     ========================================================= */
  function setupReveal() {
    const elements = $$(".reveal");
    if (!elements.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -70px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* =========================================================
     6. PROGRESO + PARALLAX
     ========================================================= */
  function setupScrollEffects() {
    const bar = $("#progressBar");
    const heroBg = $(".hero-bg");
    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? (scrollTop / max) * 100 : 0;
        bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }

      if (heroBg && !prefersReducedMotion) {
        heroBg.style.transform = `translate3d(0, ${(scrollTop * 0.1).toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function setupTilt() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    $$("[data-tilt]").forEach((el) => {
      const area = el.closest(".hero") || el.parentElement;
      if (!area) return;

      const onMove = (event) => {
        const rect = area.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
      };

      const onLeave = () => {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      };

      area.addEventListener("pointermove", onMove);
      area.addEventListener("pointerleave", onLeave);
    });
  }

  /* =========================================================
     7. GALERÍA / LIGHTBOX
     ========================================================= */
  function setupLightbox() {
    const items = $$(".gallery-item");
    const lightbox = $("#lightbox");
    const image = $("#lbImage");
    const caption = $("#lbCaption");
    const closeBtn = $("#lbClose");
    const prevBtn = $("#lbPrev");
    const nextBtn = $("#lbNext");
    if (!items.length || !lightbox || !image) return;

    let index = 0;
    let lastFocus = null;

    const render = () => {
      const item = items[index];
      const img = item.querySelector("img");
      if (!img) return;
      image.src = img.currentSrc || img.src;
      image.alt = img.alt || "";
      if (caption) caption.textContent = item.dataset.caption || "";
    };

    const open = (i) => {
      index = i;
      lastFocus = document.activeElement;
      render();
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    const close = () => {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    };

    const go = (step) => {
      index = (index + step + items.length) % items.length;
      render();
    };

    items.forEach((item, i) => {
      item.addEventListener("click", () => open(i));
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => go(-1));
    nextBtn.addEventListener("click", () => go(1));

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) close();
    });

    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    });
  }

  function setupMaps() {
    const modal = $("#mapModal");
    const frame = $("#mapFrame");
    const title = $("#mapTitle");
    const address = $("#mapAddress");
    const external = $("#mapExternal");
    const closeBtn = $("#mapClose");
    const triggers = $$("[data-map]");
    if (!modal || !frame || !triggers.length) return;

    const places = {
      ceremony: CONFIG.ceremony,
      reception: CONFIG.reception,
    };
    let lastFocus = null;

    const getQuery = (place) => {
      try {
        const query = new URL(place.mapsUrl).searchParams.get("query");
        if (query) return query;
      } catch (err) {
        return place.address || place.name;
      }
      return place.address || place.name;
    };

    const getEmbedUrl = (place) => {
      const query = getQuery(place);
      return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
    };

    const open = (key, trigger) => {
      const place = places[key];
      if (!place) return;

      lastFocus = trigger || document.activeElement;
      if (title) title.textContent = place.name;
      if (address) address.textContent = place.address;
      if (external) external.href = place.mapsUrl;

      frame.title = `Mapa de ${place.name}`;
      frame.src = getEmbedUrl(place);
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    };

    const close = () => {
      modal.hidden = true;
      frame.src = "about:blank";
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        open(trigger.dataset.map, trigger);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", close);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });

    document.addEventListener("keydown", (event) => {
      if (modal.hidden) return;
      if (event.key === "Escape") close();
    });
  }

  /* =========================================================
     8. CONFETTI (canvas, sin librerías)
     ========================================================= */
  const confetti = (() => {
    const canvas = $("#confetti");
    const ctx = canvas ? canvas.getContext("2d") : null;
    let particles = [];
    let rafId = null;
    let endTime = 0;

    const colors = ["#b5644a", "#8fa085", "#c9a227", "#e9d3c6", "#6c7f63", "#f8f4ec", "#8f4a37"];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = (now) => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gravity = 0.26;
      let alive = now < endTime;

      particles.forEach((p) => {
        p.vy += gravity;
        p.vx *= 0.994;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;

        if (p.y < canvas.height + 60) alive = true;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.92;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.62);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (alive) {
        rafId = window.requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.remove("is-active");
        particles = [];
        rafId = null;
      }
    };

    const launch = (duration = 3400) => {
      if (!canvas || !ctx || prefersReducedMotion) return;

      resize();
      endTime = performance.now() + duration;
      canvas.classList.add("is-active");

      const originX = window.innerWidth / 2;
      const originY = window.innerHeight * 0.32;
      const total = window.innerWidth < 640 ? 90 : 150;

      particles = Array.from({ length: total }, () => ({
        x: originX + (Math.random() - 0.5) * window.innerWidth * 0.35,
        y: originY + (Math.random() - 0.5) * 120,
        vx: (Math.random() - 0.5) * 13,
        vy: -(Math.random() * 13) - 3,
        size: 5 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      }));

      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(draw);
    };

    window.addEventListener("resize", () => {
      if (canvas && canvas.classList.contains("is-active")) resize();
    });

    return { launch };
  })();

  /* =========================================================
     9. RSVP (formulario visual + localStorage)
     ========================================================= */
  function setupRsvp() {
    const form = $("#rsvpForm");
    const success = $("#rsvpSuccess");
    const error = $("#formError");
    const nameInput = $("#rsvpName");
    const guestsInput = $("#rsvpGuests");
    const messageInput = $("#rsvpMessage");
    const guestsField = $("#guestsField");
    const successName = $("#successName");
    const successMessage = $("#successMessage");
    const editBtn = $("#editRsvp");
    if (!form || !success) return;

    const radios = $$('input[name="attendance"]', form);
    const errorDefault = error ? error.textContent.trim() : "";
    const hint = $("#guestsHint");
    const hintDefault = `Cupo máximo: ${CONFIG.maxGuests} personas por invitación.`;

    const validateGuests = () => {
      if (!guestsInput) return true;
      const parsed = parseInt(guestsInput.value, 10);
      const tooMany = !Number.isNaN(parsed) && parsed > CONFIG.maxGuests;
      guestsInput.classList.toggle("is-invalid", tooMany);
      if (hint) {
        hint.textContent = tooMany
          ? `El cupo máximo es de ${CONFIG.maxGuests} personas por invitación.`
          : hintDefault;
        hint.classList.toggle("is-error", tooMany);
      }
      return !tooMany;
    };

    if (guestsInput) {
      guestsInput.addEventListener("input", validateGuests);
      guestsInput.addEventListener("change", validateGuests);
    }

    const toggleGuests = () => {
      const checked = radios.find((radio) => radio.checked);
      if (guestsField) guestsField.hidden = !checked || checked.value === "no";
    };

    radios.forEach((radio) => radio.addEventListener("change", toggleGuests));

    const readStored = () => {
      try {
        const raw = window.localStorage.getItem(CONFIG.storageKey);
        return raw ? JSON.parse(raw) : null;
      } catch (err) {
        return null;
      }
    };

    const stored = readStored();
    if (stored && stored.name) {
      if (nameInput) nameInput.value = stored.name;
      if (messageInput) messageInput.value = stored.message || "";
      if (guestsInput && stored.guests) guestsInput.value = stored.guests;
      const radio = radios.find((r) => r.value === stored.attendance);
      if (radio) radio.checked = true;
      toggleGuests();
    }

    const showSuccess = (payload) => {
      const firstName = payload.name.split(/\s+/)[0] || "invitado";
      if (successName) successName.textContent = firstName;

      if (successMessage) {
        if (payload.attendance === "si") {
          const extra = payload.guests > 1 ? ` Asistirán ${payload.guests} personas en total.` : "";
          successMessage.textContent = `Tu confirmación quedó registrada. Nos alegra muchísimo contar contigo.${extra}`;
        } else {
          successMessage.textContent =
            "Lamentamos que no puedas acompañarnos, pero agradecemos de corazón tu cariño y tus buenos deseos.";
        }
      }

      form.hidden = true;
      success.hidden = false;
      if (payload.attendance === "si") confetti.launch();
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const attendance = String(data.get("attendance") || "");

      if (!name || !attendance) {
        if (error) {
          error.textContent = errorDefault;
          error.hidden = false;
        }
        if (!name && nameInput) nameInput.focus();
        return;
      }

      if (error) error.hidden = true;

      let guests = 1;
      if (attendance === "si") {
        if (!validateGuests()) {
          if (error) {
            error.textContent = `El cupo máximo es de ${CONFIG.maxGuests} personas por invitación.`;
            error.hidden = false;
          }
          if (guestsInput) guestsInput.focus();
          return;
        }
        const parsed = parseInt(guestsInput ? guestsInput.value : "1", 10);
        guests = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
        if (guestsInput) guestsInput.value = guests;
      } else {
        guests = 0;
      }

      const payload = {
        name,
        attendance,
        guests,
        message: String(data.get("message") || "").trim(),
        timestamp: new Date().toISOString(),
      };

      try {
        window.localStorage.setItem(CONFIG.storageKey, JSON.stringify(payload));
      } catch (err) {
        /* localStorage no disponible: el formulario sigue funcionando visualmente */
      }

      showSuccess(payload);
    });

    if (editBtn) {
      editBtn.addEventListener("click", () => {
        success.hidden = true;
        form.hidden = false;
        if (nameInput) nameInput.focus();
      });
    }

    toggleGuests();
  }

  /* =========================================================
     INICIALIZACIÓN
     ========================================================= */
  const init = () => {
    applyConfig();
    createPetals();
    setupEnvelope();
    setupCountdown();
    setupReveal();
    setupScrollEffects();
    setupTilt();
    setupLightbox();
    setupMaps();
    setupRsvp();
    document.documentElement.setAttribute("data-app-ready", "1");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
