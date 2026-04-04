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
    let didDrag = false; // flag para bloquear el click tras un drag real

    // ── Auto-scroll + drag — solo desktop ─────────────────────
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

      const onEnter = () => { if (!isDragging) paused = true; };
      const onLeave = () => { if (!isDragging) paused = false; };

      // pointermove y pointerup se registran en document para capturar el puntero
      // independientemente del elemento hijo sobre el que haya iniciado el drag
      const onDocMove = (e: PointerEvent) => {
        const dx = dragStartX - e.clientX;
        if (!isDragging && Math.abs(dx) > DRAG_THRESHOLD) {
          isDragging = true;
          didDrag = true;
        }
        if (isDragging) {
          const half = el.scrollWidth / 2;
          pos = half > 0
            ? (((dragStartScroll + dx) % half) + half) % half
            : dragStartScroll + dx;
          el.scrollLeft = pos;
        }
      };

      const onDocUp = () => {
        document.removeEventListener("pointermove", onDocMove);
        document.removeEventListener("pointerup", onDocUp);
        el.style.cursor = "";
        isDragging = false;
        resumeTimer = window.setTimeout(() => { paused = false; }, 800);
      };

      const onPointerDown = (e: PointerEvent) => {
        clearTimeout(resumeTimer);
        paused = true;
        isDragging = false;
        didDrag = false;
        dragStartX = e.clientX;
        dragStartScroll = pos;
        el.style.cursor = "grabbing";
        document.addEventListener("pointermove", onDocMove);
        document.addEventListener("pointerup", onDocUp);
      };

      // Bloquea el click si el usuario arrastró (capture phase, antes que los onClick de los hijos)
      const onClickCapture = (e: MouseEvent) => {
        if (didDrag) {
          e.stopPropagation();
          didDrag = false;
        }
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("pointerdown", onPointerDown);
      el.addEventListener("click", onClickCapture, true);

      rafId = requestAnimationFrame(waitForLayout);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(resumeTimer);
        document.removeEventListener("pointermove", onDocMove);
        document.removeEventListener("pointerup", onDocUp);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("click", onClickCapture, true);
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
