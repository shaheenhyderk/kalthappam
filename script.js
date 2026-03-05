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

  // GSAP micro-interactions for WhatsApp buttons.
  document.querySelectorAll(".whatsapp-btn").forEach((button) => {
    const icon = button.querySelector(".wa-icon-img");

    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        y: -2,
        boxShadow: "0 8px 18px rgba(75, 55, 47, 0.22)",
        filter: "saturate(1.03)",
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto"
      });
      if (icon) {
        gsap.to(icon, {
          x: 2,
          rotation: -7,
          scale: 1.04,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        y: 0,
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        filter: "saturate(1)",
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto"
      });
      if (icon) {
        gsap.to(icon, {
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });

    button.addEventListener("mousedown", () => {
      gsap.to(button, {
        y: 0,
        boxShadow: "0 3px 8px rgba(75, 55, 47, 0.2)",
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    button.addEventListener("mouseup", () => {
      gsap.to(button, {
        y: -2,
        boxShadow: "0 8px 18px rgba(75, 55, 47, 0.22)",
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });

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
