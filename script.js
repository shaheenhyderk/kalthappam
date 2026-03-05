(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".hero, .story p, .collage-wrap, .footer");

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => {
      el.style.opacity = "1";
      el.style.filter = "none";
      el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Split each story paragraph into words for staggered reveal.
  document.querySelectorAll(".story p").forEach((p) => {
    const parts = p.innerHTML.split(/(<br\s*\/?\s*>)/gi);
    let wordIndex = 0;

    const rebuilt = parts
      .map((part) => {
        if (/^<br\s*\/?\s*>$/i.test(part)) {
          return "<br />";
        }

        const words = part.trim().split(/\s+/).filter(Boolean);
        if (!words.length) {
          return "";
        }

        return words
          .map((word) => {
            const html = `<span class=\"word\" data-word-index=\"${wordIndex}\">${word}</span>`;
            wordIndex += 1;
            return html;
          })
          .join(" ");
      })
      .join(" ");

    p.innerHTML = rebuilt;
  });

  gsap.from(".hero", {
    opacity: 0,
    yPercent: 20,
    filter: "blur(10px)",
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top 88%",
      toggleActions: "play none none none"
    }
  });

  gsap.utils.toArray(".story p").forEach((p) => {
    const words = p.querySelectorAll(".word");
    gsap.from(words, {
      opacity: 0,
      yPercent: 20,
      filter: "blur(8px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: p,
        start: "top 88%",
        toggleActions: "play none none none"
      }
    });
  });

  gsap.from(".collage-wrap", {
    opacity: 0,
    yPercent: 15,
    filter: "blur(10px)",
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".collage-wrap",
      start: "top 88%",
      toggleActions: "play none none none"
    }
  });

  const footer = document.querySelector(".footer");
  if (footer) {
    gsap.set(footer, { opacity: 1 });
    gsap.from(footer, {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
      duration: 1,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: footer,
        start: "top bottom-=20",
        once: true
      }
    });
  }
})();
