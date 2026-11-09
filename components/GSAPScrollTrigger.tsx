"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPScrollTrigger() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const animatedElements =
        document.querySelectorAll<HTMLElement>("[data-animate]");

      animatedElements.forEach((element) => {
        if (prefersReducedMotion) {
          gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 });
          return;
        }

        const animationType = element.getAttribute("data-animate");
        const delayAttr = element.getAttribute("data-delay");
        const durationAttr = element.getAttribute("data-duration");

        // Parse delay (support milliseconds or seconds)
        let delay = 0;
        if (delayAttr) {
          const parsed = parseFloat(delayAttr);
          if (!isNaN(parsed)) {
            delay = parsed >= 10 ? parsed / 1000 : parsed;
          }
        }

        // Parse duration (default 0.8s)
        let duration = 0.8;
        if (durationAttr) {
          const parsed = parseFloat(durationAttr);
          if (!isNaN(parsed)) {
            duration = parsed >= 10 ? parsed / 1000 : parsed;
          }
        }

        let fromProps: gsap.TweenVars = { opacity: 0 };
        const toProps: gsap.TweenVars = {
          opacity: 1,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        };

        switch (animationType) {
          case "fade-up":
            fromProps = { opacity: 0, y: 35 };
            toProps.y = 0;
            break;
          case "fade-down":
            fromProps = { opacity: 0, y: -35 };
            toProps.y = 0;
            break;
          case "fade-left":
            fromProps = { opacity: 0, x: 45 };
            toProps.x = 0;
            break;
          case "fade-right":
            fromProps = { opacity: 0, x: -45 };
            toProps.x = 0;
            break;
          case "zoom-in":
            fromProps = { opacity: 0, scale: 0.92 };
            toProps.scale = 1;
            break;
          default:
            fromProps = { opacity: 0 };
            break;
        }

        gsap.fromTo(element, fromProps, toProps);
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return null;
}
