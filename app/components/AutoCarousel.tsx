"use client";
import React, { useRef, useEffect } from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const DRAG_THRESHOLD = 8;

export default function AutoCarousel({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    let pos = 0;
    let paused = false;
    let rafId: number;
    let resumeTimer: number;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let isDragging = false;

    // ── Auto-scroll — solo desktop ─────────────────────
    if (!isTouch) {
      const tick = () => {
        if (!paused) {
          pos += 0.5;
          const half = el.scrollWidth / 2;
          if (half > 0 && pos >= half) pos -= half;
          el.scrollLeft = pos;
        }
        rafId = requestAnimationFrame(tick);
      };

      const waitForLayout = () => {
        if (el.scrollWidth <= el.clientWidth + 1) {
          rafId = requestAnimationFrame(waitForLayout);
          return;
        }
        rafId = requestAnimationFrame(tick);
      };

      const onEnter = () => { paused = true; };
      const onLeave = () => { paused = false; };
      const onPointerDown = () => { clearTimeout(resumeTimer); paused = true; };
      const onPointerUp = () => {
        resumeTimer = window.setTimeout(() => { paused = false; }, 800);
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("pointerdown", onPointerDown);
      el.addEventListener("pointerup", onPointerUp);
      el.addEventListener("pointercancel", onPointerUp);

      rafId = requestAnimationFrame(waitForLayout);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(resumeTimer);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("pointercancel", onPointerUp);
      };
    }

    // ── Swipe manual — solo mobile ─────────────────────
    const onPointerDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId); // captura todos los eventos aunque el dedo se mueva rápido
      dragStartX = e.clientX;
      dragStartScroll = pos;
      isDragging = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      const dx = dragStartX - e.clientX;
      if (!isDragging && Math.abs(dx) > DRAG_THRESHOLD) isDragging = true;
      if (isDragging) {
        const half = el.scrollWidth / 2;
        pos = half > 0
          ? (((dragStartScroll + dx) % half) + half) % half
          : dragStartScroll + dx;
        el.scrollLeft = pos;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      isDragging = false;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const childArray = React.Children.toArray(children);
  const duplicated = childArray.map((child, i) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          key: `dup-${i}`,
          "aria-hidden": true,
        })
      : child
  );

  return (
    <div ref={ref} className={className}>
      {children}
      {duplicated}
    </div>
  );
}
