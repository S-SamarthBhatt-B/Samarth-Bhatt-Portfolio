import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import Resume from './Resume';
import Skills from './Skills';
import Timeline from './Timeline';
import { useOSState } from '@/hooks/useOSState';

interface DesktopWindow {
  id: string;
  title: string;
  icon: string;
  content: ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
}

interface DesktopAppDef {
  id: string;
  title: string;
  icon: string;
  content: ReactNode;
}

const desktopApps: DesktopAppDef[] = [
  { id: 'about', title: 'About', icon: '◉', content: <About /> },
  { id: 'skills', title: 'Skills', icon: '⧉', content: <Skills /> },
  { id: 'timeline', title: 'Timeline', icon: '⟡', content: <Timeline /> },
  { id: 'projects', title: 'Projects', icon: '◫', content: <Projects /> },
  { id: 'resume', title: 'Resume', icon: '▤', content: <Resume /> },
  { id: 'contact', title: 'Contact', icon: '✉', content: <Contact /> },
];

/** Mobile breakpoint below which windows open near-fullscreen instead of floating. */
const MOBILE_BREAKPOINT = 640;

/**
 * Computes a window's width/height for the current viewport. On phones
 * (below MOBILE_BREAKPOINT) windows go near-fullscreen, since a fixed
 * 720x520 floating window would overflow and be unusable on a small screen.
 * On larger screens it keeps the original 720x520 but clamps to the
 * viewport so it never overflows on smaller laptops/tablets either.
 */
function getResponsiveWindowSize(viewportWidth: number, viewportHeight: number) {
  if (viewportWidth < MOBILE_BREAKPOINT) {
    return {
      width: viewportWidth - 16,
      height: viewportHeight - 152, // leaves room for the taskbar + margins
    };
  }
  return {
    width: Math.min(720, viewportWidth - 48),
    height: Math.min(520, viewportHeight - 160),
  };
}

function getCascadedPosition(
  index: number,
  viewportWidth: number,
  viewportHeight: number,
  windowWidth: number,
  windowHeight: number,
) {
  const baseX = (viewportWidth - windowWidth) / 2;
  const baseY = (viewportHeight - windowHeight) / 2;
  const stepX = 32;
  const stepY = 28;
  const offsetIndex = index % 8;
  const x = baseX + offsetIndex * stepX;
  const y = baseY + offsetIndex * stepY;
  const maxX = viewportWidth - windowWidth;
  const maxY = viewportHeight - windowHeight;
  return {
    x: Math.min(Math.max(x, 8), Math.max(8, maxX)),
    y: Math.min(Math.max(y, 8), Math.max(8, maxY)),
  };
}

export default function DesktopShell() {
  const enterTerminal = useOSState((s) => s.enterTerminal);
  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [clock, setClock] = useState(() => new Date());
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [focusPulse, setFocusPulse] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!draggingId) return;

    const onMove = (event: MouseEvent) => {
      setWindows((current) =>
        current.map((window) => (window.id === draggingId ? { ...window, x: event.clientX - dragOffset.x, y: event.clientY - dragOffset.y } : window)),
      );
    };

    const onUp = () => setDraggingId(null);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [draggingId, dragOffset]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const { width, height } = getResponsiveWindowSize(viewportWidth, viewportHeight);

      setWindows((current) =>
        current.map((win) => ({
          ...win,
          width,
          height,
          x: Math.min(Math.max(win.x, 8), Math.max(8, viewportWidth - width)),
          y: Math.min(Math.max(win.y, 8), Math.max(8, viewportHeight - height)),
        })),
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openApp = (app: DesktopAppDef) => {
    setWindows((current) => {
      const existing = current.find((entry) => entry.id === app.id);
      if (existing) {
        setActiveWindowId(app.id);
        setFocusPulse(app.id);
        window.setTimeout(() => setFocusPulse(null), 600);
        return current.map((entry) => (entry.id === app.id ? { ...entry, minimized: false } : entry));
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const { width, height } = getResponsiveWindowSize(viewportWidth, viewportHeight);
      const position = getCascadedPosition(current.length, viewportWidth, viewportHeight, width, height);
      const nextWindow: DesktopWindow = {
        id: app.id,
        title: app.title,
        icon: app.icon,
        content: app.content,
        x: position.x,
        y: position.y,
        width,
        height,
        minimized: false,
      };

      setActiveWindowId(app.id);
      setFocusPulse(app.id);
      window.setTimeout(() => setFocusPulse(null), 600);
      return [...current, nextWindow];
    });
  };

  const closeWindow = (id: string) => {
    setWindows((current) => current.filter((window) => window.id !== id));
    setActiveWindowId((current) => (current === id ? null : current));
  };

  const minimizeWindow = (id: string) => {
    setWindows((current) => current.map((window) => (window.id === id ? { ...window, minimized: true } : window)));
    setActiveWindowId((current) => (current === id ? null : current));
  };

  const taskbarApps = useMemo(() => windows.filter((window) => !window.minimized), [windows]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(0,255,136,0.18),transparent_55%),linear-gradient(135deg,#020403_0%,#07140d_55%,#030907_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 flex h-full flex-col px-4 py-4 sm:px-6">
        <div className="flex-1">
          <div className="grid max-w-xs gap-3 sm:max-w-sm">
            {desktopApps.map((app) => (
              <button
                key={app.id}
                onClick={() => openApp(app)}
                className="glass flex items-center gap-3 rounded-2xl border border-os-border/70 px-3 py-2 text-left transition-all hover:-translate-y-0.5 hover:border-os-accent/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-os-accent/10 text-lg text-os-accent">
                  {app.icon}
                </span>
                <span className="font-mono text-sm text-os-text">{app.title}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {windows
              .filter((window) => !window.minimized)
              .map((win) => {
                const isFullscreenWidth = win.width >= (typeof window !== 'undefined' ? window.innerWidth : win.width) - 32;
                return (
                <motion.div
                  key={win.id}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`absolute ${activeWindowId === win.id ? 'z-20' : 'z-10'} overflow-hidden rounded-2xl border border-os-border/70 bg-os-panel/90 shadow-2xl backdrop-blur-xl ${focusPulse === win.id ? 'ring-1 ring-os-accent/60' : ''}`}
                  style={{ left: win.x, top: win.y, width: win.width, height: win.height, transformOrigin: 'center center' }}
                  onMouseDown={() => {
                    setActiveWindowId(win.id);
                    setFocusPulse(win.id);
                    globalThis.setTimeout(() => setFocusPulse(null), 600);
                  }}
                >
                  <div
                    className={`flex items-center justify-between border-b border-os-border/70 bg-black/20 px-3 py-2 ${isFullscreenWidth ? '' : 'cursor-move'}`}
                    onMouseDown={(event) => {
                      setActiveWindowId(win.id);
                      if (isFullscreenWidth) return;
                      const rect = (event.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                      setDragOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top });
                      setDraggingId(win.id);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-os-accent">{win.icon}</span>
                      <span className="font-mono text-sm text-os-text">{win.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => minimizeWindow(win.id)} className="h-2.5 w-2.5 rounded-full bg-os-warn/90" aria-label={`Minimize ${win.title}`} />
                      <button onClick={() => closeWindow(win.id)} className="h-2.5 w-2.5 rounded-full bg-os-error/90" aria-label={`Close ${win.title}`} />
                    </div>
                  </div>
                  <div className="h-[calc(100%-44px)] overflow-y-auto bg-transparent p-3 sm:p-5">
                    {win.content}
                  </div>
                </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        <div className="glass mt-4 flex items-center justify-between rounded-full border border-os-border/70 px-3 py-2 shadow-glow">
          <div className="flex items-center gap-2">
            <button onClick={() => enterTerminal()} className="rounded-full bg-os-accent/10 px-3 py-1.5 font-mono text-xs text-os-accent">
              Terminal
            </button>
            {taskbarApps.map((window) => (
              <button
                key={window.id}
                onClick={() => setActiveWindowId(window.id)}
                className={`rounded-full px-3 py-1.5 font-mono text-xs ${activeWindowId === window.id ? 'bg-os-accent text-black' : 'text-os-muted hover:text-os-accent'}`}
              >
                {window.title}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm text-os-muted">
            <span className="rounded-full border border-os-border/60 px-2 py-1 font-mono text-xs">● Online</span>
            <span className="font-mono text-xs">{clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
