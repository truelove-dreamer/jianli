document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }

  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const currentYear = document.querySelector("#currentYear");
  const placeholders = document.querySelectorAll(".placeholder-card");
  const awardItems = document.querySelectorAll(".award-item");
  const certificateTitle = document.querySelector("[data-certificate-title]");
  const certificateMeta = document.querySelector("[data-certificate-meta]");
  const certificateLink = document.querySelector("[data-certificate-link]");
  const certificatePreview = document.querySelector("[data-certificate-preview]");
  const certificateImage = document.querySelector("[data-certificate-image]");
  const certificateObject = document.querySelector("[data-certificate-object]");
  const certificatePlaceholder = document.querySelector("[data-certificate-placeholder]");
  const grainientCanvas = document.querySelector("#grainientCanvas");
  const heroVideo = document.querySelector(".hero-video");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  navToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const sections = Array.from(document.querySelectorAll(".section-observe[id]"));
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", isActive);
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));

  placeholders.forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("is-touched"));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("is-touched");
      }
    });
  });

  if (nav) {
    nav.setAttribute("aria-live", "polite");
  }

  const updateCertificate = (item) => {
    awardItems.forEach((award) => award.classList.remove("is-active"));
    item.classList.add("is-active");

    const title = item.dataset.title || "";
    const meta = item.dataset.meta || "";
    const file = item.dataset.file || "";
    const extension = file.split(".").pop().toLowerCase();
    const isImage = Boolean(file) && ["jpg", "jpeg", "png", "webp"].includes(extension);
    const isPdf = Boolean(file) && extension === "pdf";

    if (certificateTitle) certificateTitle.textContent = title;
    if (certificateMeta) certificateMeta.textContent = meta;
    if (certificatePreview) {
      certificatePreview.classList.toggle("is-image", isImage);
      certificatePreview.classList.toggle("is-pdf", isPdf);
      certificatePreview.classList.toggle("is-empty", !file);
    }
    if (certificateImage) {
      if (isImage) {
        certificateImage.src = file;
        certificateImage.alt = title;
      } else {
        certificateImage.removeAttribute("src");
        certificateImage.alt = "";
      }
    }
    if (certificateObject) {
      if (isPdf) {
        certificateObject.data = file;
        certificateObject.setAttribute("aria-label", title);
      } else {
        certificateObject.removeAttribute("data");
        certificateObject.removeAttribute("aria-label");
      }
    }
    if (certificatePlaceholder) {
      certificatePlaceholder.textContent = file ? "证书已就绪" : "证书待补";
    }

    if (!certificateLink) return;
    certificateLink.textContent = file ? "下载证书" : "证书待补";
    certificateLink.classList.toggle("button-disabled", !file);
    certificateLink.toggleAttribute("aria-disabled", !file);
    if (file) {
      certificateLink.setAttribute("href", file);
      certificateLink.setAttribute("download", "");
    } else {
      certificateLink.removeAttribute("href");
      certificateLink.removeAttribute("download");
    }
  };

  awardItems.forEach((item) => {
    item.addEventListener("click", () => updateCertificate(item));
  });

  if (awardItems.length) {
    const activeAward = document.querySelector(".award-item.is-active") || awardItems[0];
    updateCertificate(activeAward);
  }

  if (grainientCanvas) {
    initGrainient(grainientCanvas);
  }

  waitForHeroVideo(heroVideo).then(() => initPortfolioMotion());
});

window.addEventListener("pageshow", () => {
  if (!window.location.hash) {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }
});

function waitForHeroVideo(video) {
  return new Promise((resolve) => {
    if (!video) {
      resolve();
      return;
    }

    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      video.classList.add("is-ready");
      resolve();
    };

    if (video.readyState >= 3) {
      reveal();
      return;
    }

    video.addEventListener("canplay", reveal, { once: true });
    video.addEventListener("loadeddata", reveal, { once: true });
    video.addEventListener("error", reveal, { once: true });
    video.load();
    video.play().catch(() => {});
  });
}

function initGrainient(canvas) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const palette = [
    [3, 7, 18],
    [7, 22, 38],
    [67, 244, 221],
  ];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let rafId = 0;
  let grainSeed = 0;
  const grainCanvas = document.createElement("canvas");
  const grainCtx = grainCanvas.getContext("2d");
  const grainSize = 180;
  grainCanvas.width = grainSize;
  grainCanvas.height = grainSize;

  const resize = () => {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const mix = (a, b, t) => a + (b - a) * t;
  const colorAt = (a, b, c, t, alpha) => {
    const firstHalf = t < 0.5;
    const local = firstHalf ? t * 2 : (t - 0.5) * 2;
    const from = firstHalf ? a : b;
    const to = firstHalf ? b : c;
    return `rgba(${Math.round(mix(from[0], to[0], local))}, ${Math.round(
      mix(from[1], to[1], local)
    )}, ${Math.round(mix(from[2], to[2], local))}, ${alpha})`;
  };

  const updateGrain = () => {
    if (!grainCtx) return;
    const image = grainCtx.createImageData(grainSize, grainSize);
    for (let i = 0; i < image.data.length; i += 4) {
      const index = i / 4;
      const x = index % grainSize;
      const y = Math.floor(index / grainSize);
      const v = Math.sin((x * 12.9898 + y * 78.233 + grainSeed * 37.719) * 0.12) * 43758.5453;
      const noise = v - Math.floor(v);
      const shade = noise > 0.5 ? 255 : 0;
      image.data[i] = shade;
      image.data[i + 1] = shade;
      image.data[i + 2] = shade;
      image.data[i + 3] = 18;
    }
    grainCtx.putImageData(image, 0, 0);
  };

  const drawGrain = () => {
    if (!grainCtx) return;
    ctx.save();
    ctx.globalCompositeOperation = "overlay";
    ctx.imageSmoothingEnabled = false;
    const pattern = ctx.createPattern(grainCanvas, "repeat");
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();
  };

  const render = (time) => {
    const t = time * 0.00025;
    const nextGrainSeed = Math.floor(time / 240);
    if (nextGrainSeed !== grainSeed) {
      grainSeed = nextGrainSeed;
      updateGrain();
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, width, height);

    const base = ctx.createLinearGradient(0, height * 0.08, width, height);
    base.addColorStop(0, "rgba(0, 0, 0, 0.94)");
    base.addColorStop(0.44, colorAt(palette[0], palette[1], palette[2], 0.18 + Math.sin(t) * 0.04, 0.7));
    base.addColorStop(1, colorAt(palette[1], palette[0], palette[2], 0.42 + Math.cos(t) * 0.05, 0.74));
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);

    const blobs = [
      [0.2 + Math.sin(t * 1.7) * 0.05, 0.36 + Math.cos(t * 1.2) * 0.08, 0.5, 0.22],
      [0.72 + Math.cos(t * 1.1) * 0.06, 0.2 + Math.sin(t * 1.4) * 0.05, 0.56, 0.18],
      [0.58 + Math.sin(t * 1.25) * 0.06, 0.74 + Math.cos(t * 1.8) * 0.06, 0.68, 0.16],
    ];

    blobs.forEach(([cx, cy, radius, alpha], index) => {
      const x = cx * width;
      const y = cy * height;
      const r = radius * Math.max(width, height);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
      gradient.addColorStop(0, colorAt(palette[index], palette[(index + 1) % 3], palette[(index + 2) % 3], 0.45, alpha));
      gradient.addColorStop(0.46, colorAt(palette[index], palette[(index + 2) % 3], palette[1], 0.78, alpha * 0.3));
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });

    ctx.globalCompositeOperation = "multiply";
    const shade = ctx.createLinearGradient(0, 0, 0, height);
    shade.addColorStop(0, "rgba(0, 0, 0, 0.96)");
    shade.addColorStop(0.18, "rgba(3, 7, 18, 0.54)");
    shade.addColorStop(1, "rgba(3, 7, 18, 0.52)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";

    drawGrain();
    rafId = window.requestAnimationFrame(render);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  rafId = window.requestAnimationFrame(render);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(rafId);
    } else {
      rafId = window.requestAnimationFrame(render);
    }
  });
}

function initPortfolioMotion() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  document.documentElement.classList.add("js-anim-ready");
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".hero-nameplate, .hero .eyebrow, .hero-dock-card", { clearProps: "opacity" });

  const slowEase = "power4.out";
  gsap.set(".site-header", { y: -34, opacity: 0, filter: "blur(10px)" });
  gsap.set(".hero-nameplate", {
    y: 76,
    scaleX: 0.8,
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
    filter: "blur(18px)",
    transformOrigin: "left center",
  });
  gsap.set(".hero .eyebrow", {
    y: 52,
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
    filter: "blur(14px)",
  });
  gsap.set(".hero-dock-card", {
    y: 72,
    opacity: 0,
    clipPath: "inset(38% 0 0 0)",
    filter: "blur(16px)",
  });

  const intro = gsap.timeline({ defaults: { ease: slowEase } });
  intro
    .to(".site-header", { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.45 }, 0.6)
    .to(
      ".hero-nameplate",
      {
        y: 0,
        scaleX: 1,
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        filter: "blur(0px)",
        duration: 2.35,
      },
      0.72
    )
    .to(
      ".hero .eyebrow",
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        filter: "blur(0px)",
        duration: 1.75,
      },
      1.65
    )
    .to(
      ".hero-dock-card",
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        filter: "blur(0px)",
        duration: 1.8,
        stagger: 0.16,
      },
      2.05
    );

  gsap.utils.toArray(".section-observe").forEach((section) => {
    if (section.id === "home") return;

    const eyebrow = section.querySelector(".section-heading .eyebrow, .site-footer .eyebrow, .profile-name .eyebrow");
    const heading = section.querySelector(".section-heading h2, .site-footer h2, .profile-name h2");
    const cards = section.querySelectorAll(
      ".profile-space, .education-card, .case-study, .work-card, .award-item, .award-panel, .skills-grid article, .profile-info > *"
    );
    const visuals = section.querySelectorAll(".work-visual, .certificate-preview");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
      defaults: { ease: slowEase },
    });

    if (eyebrow) {
      tl.from(
        eyebrow,
        {
          y: 38,
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
          duration: 1.0,
        },
        0
      );
    }

    if (heading) {
      tl.from(
        heading,
        {
          y: 84,
          scaleX: 0.82,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "left center",
          duration: 1.28,
        },
        0.08
      );
    }

    if (cards.length) {
      tl.from(
        cards,
        {
          y: 74,
          opacity: 0,
          clipPath: "inset(18% 0 0 0)",
          duration: 1.18,
          stagger: 0.09,
        },
        0.32
      );
    }

    if (visuals.length) {
      tl.from(
        visuals,
        {
          scale: 1.12,
          y: 34,
          clipPath: "inset(0 0 100% 0)",
          duration: 1.35,
          stagger: 0.08,
        },
        0.42
      );
    }
  });

  gsap.utils.toArray(".work-visual, .certificate-preview").forEach((visual) => {
    gsap.to(visual, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: visual,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
      },
    });
  });
}
