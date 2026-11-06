"use client";

import {
  useId,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
} from "react";

type GlassOptions = {
  appearance?: "light" | "dark";
  interactive?: boolean;
  refraction?: number;
  blur?: number;
};

export type LiquidGlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & GlassOptions;
export type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & GlassOptions;

const displacementMap = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="128" viewBox="0 0 256 128"><defs><linearGradient id="x"><stop stop-color="#000"/><stop offset=".35" stop-color="#800000"/><stop offset=".65" stop-color="#800000"/><stop offset="1" stop-color="#ff0000"/></linearGradient><linearGradient id="y" x2="0" y2="1"><stop stop-color="#000"/><stop offset=".35" stop-color="#008000"/><stop offset=".65" stop-color="#008000"/><stop offset="1" stop-color="#00ff00"/></linearGradient></defs><rect width="256" height="128" fill="url(#x)"/><rect width="256" height="128" fill="url(#y)" style="mix-blend-mode:screen"/></svg>',
)}`;

// Independent implementation inspired by the user's 21st.dev example.
// Only the background lens is filtered; the label remains crisp.
function GlassLayers({
  id,
  appearance,
  refraction,
  blur,
}: Required<Omit<GlassOptions, "interactive">> & { id: string }) {
  return (
    <>
      <svg className="pointer-events-none absolute size-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={id} x="-25%" y="-50%" width="150%" height="200%" colorInterpolationFilters="sRGB">
            <feImage href={displacementMap} width="100%" height="100%" preserveAspectRatio="none" result="lens" />
            <feDisplacementMap in="SourceGraphic" in2="lens" scale={refraction} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] backdrop-blur-[var(--glass-blur)] backdrop-saturate-150 supports-[backdrop-filter:blur(1px)]:bg-white/15 supports-[backdrop-filter:url('#filter')]:[backdrop-filter:blur(var(--glass-blur))_saturate(1.5)_var(--glass-filter)] ${appearance === "dark" ? "bg-black/70" : "bg-white/80"}`}
        style={{
          "--glass-filter": `url("#${id}")`,
          "--glass-blur": `${Math.max(0, blur)}px`,
        } as CSSProperties}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${appearance === "dark" ? "bg-black/15" : "bg-white/15"}`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_var(--glass-x,30%)_var(--glass-y,0%),rgb(255_255_255/0.6),transparent_65%)] opacity-70 transition-opacity duration-200 group-hover/glass:opacity-100 motion-reduce:transition-none"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgb(255_255_255/0.9),inset_1px_0_1px_rgb(255_255_255/0.35),inset_0_-1px_2px_rgb(255_255_255/0.25),inset_0_0_0_1px_rgb(255_255_255/0.3)]"
      />
    </>
  );
}

function moveHighlight(event: PointerEvent<HTMLElement>, interactive: boolean) {
  if (!interactive || event.pointerType === "touch"
    || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const x = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
  const y = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
  event.currentTarget.style.setProperty("--glass-x", `${x}%`);
  event.currentTarget.style.setProperty("--glass-y", `${y}%`);
}

function resetHighlight(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty("--glass-x");
  event.currentTarget.style.removeProperty("--glass-y");
}

const surfaceClasses = "group/glass relative shadow-[0_8px_32px_rgb(0_0_0/0.12)]";

export function LiquidGlassButton({
  children,
  appearance = "light",
  interactive = true,
  refraction = 16,
  blur = 2,
  className = "",
  disabled,
  type = "button",
  onPointerMove,
  onPointerLeave,
  ...props
}: LiquidGlassButtonProps) {
  const id = `glass-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`${surfaceClasses} inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent px-7 py-3 font-brand text-2xl leading-none font-light transition-[scale,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none ${appearance === "dark" ? "text-white" : "text-brand-ink"} ${interactive ? "enabled:hover:scale-[1.03] enabled:active:scale-[0.97] motion-reduce:transform-none motion-reduce:scale-100" : ""} ${className}`}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented && !disabled) moveHighlight(event, interactive);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        resetHighlight(event);
      }}
    >
      <GlassLayers id={id} appearance={appearance} refraction={refraction} blur={blur} />
      <span className="relative z-10 inline-flex items-center justify-center gap-3">{children}</span>
    </button>
  );
}

export function LiquidGlass({
  children,
  appearance = "light",
  interactive = false,
  refraction = 16,
  blur = 2,
  className = "",
  onPointerMove,
  onPointerLeave,
  ...props
}: LiquidGlassProps) {
  const id = `glass-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div
      {...props}
      className={`${surfaceClasses} rounded-3xl ${appearance === "dark" ? "text-white" : "text-brand-ink"} ${className}`}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented) moveHighlight(event, interactive);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        resetHighlight(event);
      }}
    >
      <GlassLayers id={id} appearance={appearance} refraction={refraction} blur={blur} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
